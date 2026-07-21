import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type WhatsAppWebhookPayload = {
  object?: string;
  entry?: Array<{
    id?: string;
    changes?: Array<{
      field?: string;
      value?: {
        messaging_product?: string;
        metadata?: {
          display_phone_number?: string;
          phone_number_id?: string;
        };
        contacts?: Array<{
          profile?: { name?: string };
          wa_id?: string;
        }>;
        messages?: Array<{
          from?: string;
          id?: string;
          timestamp?: string;
          type?: string;
          text?: { body?: string };
        }>;
        statuses?: Array<{
          id?: string;
          status?: string;
          timestamp?: string;
          recipient_id?: string;
        }>;
      };
    }>;
  }>;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');
  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

  if (!verifyToken) {
    console.error('WHATSAPP_VERIFY_TOKEN is not configured');
    return new NextResponse('Webhook is not configured', { status: 500 });
  }

  if (mode === 'subscribe' && token === verifyToken && challenge) {
    return new NextResponse(challenge, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  return new NextResponse('Forbidden', { status: 403 });
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as WhatsAppWebhookPayload;

    if (payload.object !== 'whatsapp_business_account') {
      return NextResponse.json({ received: true });
    }

    for (const entry of payload.entry ?? []) {
      for (const change of entry.changes ?? []) {
        if (change.field !== 'messages') continue;

        const value = change.value;

        for (const message of value?.messages ?? []) {
          console.log('WhatsApp message received', {
            messageId: message.id,
            from: message.from,
            type: message.type,
            text: message.text?.body,
            phoneNumberId: value?.metadata?.phone_number_id,
          });
        }

        for (const status of value?.statuses ?? []) {
          console.log('WhatsApp message status updated', {
            messageId: status.id,
            status: status.status,
            recipientId: status.recipient_id,
          });
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('WhatsApp webhook error', error);
    return NextResponse.json(
      { received: false, error: 'Invalid webhook payload' },
      { status: 400 }
    );
  }
}
