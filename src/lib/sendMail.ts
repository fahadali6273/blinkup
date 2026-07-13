import nodemailer from 'nodemailer';

export default async function sendEmail(subject: string, message: string) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminEmailPass = process.env.ADMIN_EMAIL_PASS;

    const notifyEmails =
      process.env.ADMIN_NOTIFY_EMAILS?.split(',')
        .map((item) => item.trim())
        .filter(Boolean) || [];

    const finalNotifyEmails =
      notifyEmails.length > 0 ? notifyEmails : adminEmail ? [adminEmail] : [];

    if (!adminEmail || !adminEmailPass || finalNotifyEmails.length === 0) {
      console.log(
        '⚠️ Email skipped: ADMIN_EMAIL / ADMIN_EMAIL_PASS / ADMIN_NOTIFY_EMAILS missing'
      );
      return;
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: adminEmail,
        pass: adminEmailPass,
      },
    });

    await transporter.sendMail({
      from: `"BlinkUp Alerts" <${adminEmail}>`,
      to: finalNotifyEmails,
      subject,
      text: message,
    });

    console.log('✅ Email sent successfully');
  } catch (err) {
    console.error('⚠️ Email failed:', err);
  }
}