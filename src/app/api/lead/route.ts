import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, service, location, message } = body;

    // ✅ Step 1: Save to Firestore with defaults (avoid undefined values)
    const docRef = await addDoc(collection(db, 'leads'), {
      name: name || '',
      phone: phone || '',
      service: service || '',
      location: location || '',
      message: message || '',
      status: 'Pending',
      createdAt: serverTimestamp(),
    });

    console.log('✅ Lead saved with ID:', docRef.id);

    // ✅ Step 2: Send Email Notification
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"BlinkUp Lead" <${process.env.ADMIN_EMAIL}>`,
      to: [
        'info@blinkuphome.com',
        'support@blinkuphome.com',
        'admin_fahad@blinkuphome.com',
      ],
      subject: `📩 New Lead from ${name}`,
      text: `
A new BlinkUp lead has been submitted!

🧍 Name: ${name || 'N/A'}
📞 Phone: ${phone || 'N/A'}
🛠️ Service: ${service || 'N/A'}
📍 Location: ${location || 'N/A'}
💬 Message: ${message || '—'}

🕒 Submitted at: ${new Date().toLocaleString()}

Status: Pending
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Lead submission error:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}




