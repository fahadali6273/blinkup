import { NextResponse } from 'next/server';
import {
  sendWhatsAppMessage,
  type WhatsAppMessage,
} from '@/lib/whatsapp';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isAuthorized(request: Request) {
  const configuredKey = process.env.WHATSAPP_INTERNAL_API_KEY;
  const providedKey = request.headers.get('x-api-key');

  return Boolean(configuredKey && providedKey === configuredKey);
}

function isValidMessage(value: unknown): value is WhatsAppMessage {
  if (!value || typeof value !== 'object') return false;

  const message = value as Record<string, unknown>;
  const type = message.type;

  if (typeof message.to !== 'string') return false;

  if (type === 'text') {
    return typeof message.text === 'string' && message.text.trim().length > 0;
  }

  if (type === 'template') {
    return (
      typeof message.templateName === 'string' &&
      message.templateName.trim().length > 0
    );
  }

  if (
    type === 'image' ||
    type === 'document' ||
    type === 'video' ||
    type === 'audio'
  ) {
    return typeof message.link === 'string' && message.link.startsWith('https://');
  }

  return false;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!isValidMessage(body)) {
      return NextResponse.json(
        { error: 'Invalid WhatsApp message payload' },
        { status: 400 }
      );
    }

    const result = await sendWhatsAppMessage(body);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('WhatsApp send API error', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unable to send message',
      },
      { status: 500 }
    );
  }
}
