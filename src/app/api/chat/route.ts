import { NextResponse } from "next/server";
import { db } from "../../../lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import sendEmail from "../../../lib/sendMail";

export async function POST(req: Request) {
  try {
    const { name, service, location } = await req.json();

    const docRef = await addDoc(collection(db, "chatLeads"), {
      name,
      service,
      location,
      timestamp: Timestamp.now(),
    });

    const message = `New Chat Lead Received 🚀
Name: ${name}
Service: ${service}
Location: ${location}`;

    await sendEmail("New BlinkUp Chat Lead", message);

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (err) {
    console.error("Chat Lead Error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}


