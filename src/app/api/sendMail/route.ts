import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name = '',
      email = '',
      phone = '',
      service = 'Contact Form',
      subService = '',
      location = '',
      address = '',
      mapLink = '',
      date = '',
      time = '',
      message = '',
      subject = '',
      text = '',
      source = 'contact',
    } = body;

    // ✅ Step 1: Save contact/homepage inquiry to Firestore leads collection
    const docRef = await addDoc(collection(db, 'leads'), {
      name: name || '',
      phone: phone || '',
      email: email || '',
      service: service || 'Contact Form',
      subService: subService || '',
      location: location || '',
      address: address || '',
      mapLink: mapLink || '',
      date: date || '',
      time: time || '',
      message: message || text || '',
      status: 'Pending',
      source: source || 'contact',
      createdAt: serverTimestamp(),
    });

    console.log('✅ Contact/Homepage lead saved with ID:', docRef.id);

    // ✅ Step 2: Send email notification safely
    // Email fail hone par lead save fail nahi hoga.
    try {
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminEmailPass = process.env.ADMIN_EMAIL_PASS;

      const notifyEmails =
        process.env.ADMIN_NOTIFY_EMAILS?.split(',')
          .map((item) => item.trim())
          .filter(Boolean) || [];

      const finalNotifyEmails =
        notifyEmails.length > 0 ? notifyEmails : adminEmail ? [adminEmail] : [];

      if (adminEmail && adminEmailPass && finalNotifyEmails.length > 0) {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: adminEmail,
            pass: adminEmailPass,
          },
        });

        const mailSubject =
          subject ||
          `📩 New ${source || 'Contact'} Lead from ${name || 'Customer'}`;

        const mailText =
          text ||
          `
A new BlinkUp inquiry has been submitted!

🧍 Name: ${name || 'N/A'}
📞 Phone: ${phone || 'N/A'}
📧 Email: ${email || 'N/A'}
🛠️ Service: ${service || 'Contact Form'}
🔧 Sub-service: ${subService || 'N/A'}
📍 Area / Location: ${location || 'N/A'}
🏠 Full Address: ${address || 'N/A'}
🗺️ Google Maps: ${mapLink || 'N/A'}
📅 Preferred Date: ${date || 'N/A'}
⏰ Preferred Time: ${time || 'N/A'}
💬 Message: ${message || text || '—'}
📌 Source: ${source || 'contact'}

🕒 Submitted at: ${new Date().toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
          })}

Status: Pending
          `;

        await transporter.sendMail({
          from: `"BlinkUp Alerts" <${adminEmail}>`,
          to: finalNotifyEmails,
          subject: mailSubject,
          text: mailText,
        });

        console.log('✅ Contact/Homepage email sent successfully');
      } else {
        console.log(
          '⚠️ Email skipped: ADMIN_EMAIL / ADMIN_EMAIL_PASS / ADMIN_NOTIFY_EMAILS missing'
        );
      }
    } catch (emailError) {
      console.error(
        '⚠️ Email failed, but contact/homepage lead was saved:',
        emailError
      );
    }

    return NextResponse.json({
      success: true,
      leadId: docRef.id,
      message: 'Inquiry submitted successfully',
    });
  } catch (err: any) {
    console.error('❌ Contact/Homepage form error:', err);

    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Something went wrong',
      },
      { status: 500 }
    );
  }
}
