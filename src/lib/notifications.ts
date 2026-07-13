export async function sendAdminAlert(form: { name: string; phone: string; service: string; location: string }) {
  const message = `📢 New BlinkUp Lead\n👤 Name: ${form.name}\n📞 Phone: ${form.phone}\n🔧 Service: ${form.service}\n📍 Location: ${form.location}`;

  try {
    await fetch('/api/sendMail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: `New BlinkUp Lead - ${form.service}`,
        text: message,
      }),
    });
  } catch (err) {
    console.error('Email API error:', err);
  }
}
