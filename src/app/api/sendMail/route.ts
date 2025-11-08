import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { subject, text } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS,
      },
    });

    // ✅ Test connection before sending
    await transporter.verify();
    console.log('SMTP connection verified ✅');

    const info = await transporter.sendMail({
      from: `"BlinkUp Alerts" <${process.env.ADMIN_EMAIL}>`,
      to: ['info@blinkuphome.com', 'support@blinkuphome.com', 'admin_fahad@blinkuphome.com'],
      subject,
      text,
    });

    console.log('Email sent successfully ✅', info);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Email send error ❌', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

