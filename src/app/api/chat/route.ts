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
      email = '',
      service = 'Chatbot Lead',
      subService = '',
      location = '',
      address = '',
      mapLink = '',
      message = '',
      source = 'chatbot',
    } = body;

    const docRef = await addDoc(collection(db, 'leads'), {
      name: name || '',
      phone: phone || '',
      email: email || '',
      service: service || 'Chatbot Lead',
      subService: subService || '',
      location: location || '',
      address: address || '',
      mapLink: mapLink || '',
      message: message || '',
      status: 'Pending',
      source: source || 'chatbot',
      createdAt: serverTimestamp(),
    });

    console.log('✅ Chat lead saved to leads collection:', docRef.id);

    try {
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminEmailPass = process.env.ADMIN_EMAIL_PASS;
      const notifyEmails =
        process.env.ADMIN_NOTIFY_EMAILS || process.env.ADMIN_EMAIL || '';

      if (adminEmail && adminEmailPass && notifyEmails) {
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
          from: `"BlinkUp Chat Lead" <${adminEmail}>`,
          to: notifyEmails,
          subject: `💬 New Chatbot Lead from ${name || 'Customer'}`,
          text: `
New BlinkUp Chatbot Lead

Name: ${name || 'N/A'}
Phone: ${phone || 'N/A'}
Email: ${email || 'N/A'}
Service: ${service || 'Chatbot Lead'}
Sub-service: ${subService || 'N/A'}
Location: ${location || 'N/A'}
Full Address: ${address || 'N/A'}
Google Maps: ${mapLink || 'N/A'}
Message: ${message || '—'}
Source: ${source || 'chatbot'}

Submitted at: ${new Date().toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
          })}

Status: Pending
          `,
        });

        console.log('✅ Chat lead email sent successfully');
      } else {
        console.log(
          '⚠️ Chat lead email skipped: ADMIN_EMAIL / ADMIN_EMAIL_PASS missing'
        );
      }
    } catch (emailError) {
      console.error('⚠️ Chat lead saved, but email failed:', emailError);
    }

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: 'Chat lead submitted successfully',
    });
  } catch (err) {
    console.error('❌ Chat Lead Error:', err);

    return NextResponse.json(
      {
        success: false,
        error: String(err),
      },
      { status: 500 }
    );
  }
}


