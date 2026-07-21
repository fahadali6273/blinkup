type WhatsAppTextMessage = {
  type: 'text';
  to: string;
  text: string;
  previewUrl?: boolean;
};

type WhatsAppTemplateMessage = {
  type: 'template';
  to: string;
  templateName: string;
  languageCode?: string;
  components?: unknown[];
};

type WhatsAppMediaMessage = {
  type: 'image' | 'document' | 'video' | 'audio';
  to: string;
  link: string;
  caption?: string;
  filename?: string;
};

export type WhatsAppMessage =
  | WhatsAppTextMessage
  | WhatsAppTemplateMessage
  | WhatsAppMediaMessage;

function getWhatsAppConfig() {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const graphApiVersion = process.env.WHATSAPP_GRAPH_API_VERSION;

  if (!accessToken || !phoneNumberId || !graphApiVersion) {
    throw new Error(
      'Missing WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID, or WHATSAPP_GRAPH_API_VERSION'
    );
  }

  return { accessToken, phoneNumberId, graphApiVersion };
}

function normalizePhoneNumber(value: string) {
  return value.replace(/\D/g, '');
}

function buildPayload(message: WhatsAppMessage) {
  const to = normalizePhoneNumber(message.to);

  if (!to) {
    throw new Error('Recipient phone number is required');
  }

  if (message.type === 'text') {
    return {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'text',
      text: {
        preview_url: message.previewUrl ?? false,
        body: message.text,
      },
    };
  }

  if (message.type === 'template') {
    return {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'template',
      template: {
        name: message.templateName,
        language: { code: message.languageCode ?? 'en_US' },
        ...(message.components?.length
          ? { components: message.components }
          : {}),
      },
    };
  }

  return {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: message.type,
    [message.type]: {
      link: message.link,
      ...(message.caption ? { caption: message.caption } : {}),
      ...(message.type === 'document' && message.filename
        ? { filename: message.filename }
        : {}),
    },
  };
}

export async function sendWhatsAppMessage(message: WhatsAppMessage) {
  const { accessToken, phoneNumberId, graphApiVersion } = getWhatsAppConfig();
  const response = await fetch(
    `https://graph.facebook.com/${graphApiVersion}/${phoneNumberId}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buildPayload(message)),
      cache: 'no-store',
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    console.error('WhatsApp Cloud API error', {
      status: response.status,
      data,
    });
    throw new Error(
      data?.error?.message ?? `WhatsApp API request failed (${response.status})`
    );
  }

  return data;
}
