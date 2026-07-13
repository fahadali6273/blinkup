import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name = '',
      phone = '',
      service = '',
      location = '',
      message = '',
      email = '',
      subService = '',
      address = '',
      mapLink = '',
      date = '',
      time = '',
      source = 'website',
    } = body;

    const docRef = await addDoc(collection(db, 'leads'), {
      name: name || '',
      phone: phone || '',
      email: email || '',
      service: service || '',
      subService: subService || '',
      location: location || '',
      address: address || '',
      mapLink: mapLink || '',
      date: date || '',
      time: time || '',
      message: message || '',
      status: 'Pending',
      source: source || 'website',
      createdAt: serverTimestamp(),
    });

    console.log('✅ Lead saved with ID:', docRef.id);

    try {
      if (process.env.ADMIN_EMAIL && process.env.ADMIN_EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_EMAIL_PASS,
          },
        });

        const notifyEmails =
          process.env.ADMIN_NOTIFY_EMAILS?.split(',')
            .map((item) => item.trim())
            .filter(Boolean) || [
            'info@blinkuphome.com',
            'support@blinkuphome.com',
            'admin_fahad@blinkuphome.com',
          ];

        const mailOptions = {
          from: `"BlinkUp Lead" <${process.env.ADMIN_EMAIL}>`,
          to: notifyEmails,
          subject: `📩 New ${source || 'Website'} Lead from ${
            name || 'Customer'
          }`,
          text: `
A new BlinkUp lead has been submitted!

🧍 Name: ${name || 'N/A'}
📞 Phone: ${phone || 'N/A'}
📧 Email: ${email || 'N/A'}
🛠️ Service: ${service || 'N/A'}
🔧 Sub-service: ${subService || 'N/A'}
📍 Area / Location: ${location || 'N/A'}
🏠 Full Address: ${address || 'N/A'}
🗺️ Google Maps: ${mapLink || 'N/A'}
📅 Preferred Date: ${date || 'N/A'}
⏰ Preferred Time: ${time || 'N/A'}
💬 Message: ${message || '—'}
📌 Source: ${source || 'website'}

🕒 Submitted at: ${new Date().toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
          })}

Status: Pending
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully');
      } else {
        console.log(
          '⚠️ Email skipped: ADMIN_EMAIL or ADMIN_EMAIL_PASS is missing'
        );
      }
    } catch (emailError) {
      console.error('⚠️ Email failed, but lead was saved:', emailError);
    }

    return NextResponse.json({
      success: true,
      leadId: docRef.id,
      message: 'Lead submitted successfully',
    });
  } catch (error) {
    console.error('❌ Lead submission error:', error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}