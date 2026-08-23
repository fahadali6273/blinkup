import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";
import { amcPlans, formatAmcPrice } from "../../../data/amc";
import { db } from "../../../lib/firebase";
import sendEmail from "../../../lib/sendMail";

export const runtime = "nodejs";

function cleanText(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function GET() {
  return NextResponse.json({
    ready: true,
    service: "BlinkUp AMC enquiry",
    backend: "Website Firestore leads",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (cleanText(body.website, 120)) {
      return NextResponse.json({ success: true, requestId: "received" });
    }

    const name = cleanText(body.name, 100);
    const phoneDigits = cleanText(body.phone, 20).replace(/\D/g, "");
    const phone = phoneDigits.length === 10 ? `+91${phoneDigits}` : `+${phoneDigits}`;
    const email = cleanText(body.email, 160).toLowerCase();
    const area = cleanText(body.area, 220);
    const message = cleanText(body.message, 500);
    const planCode = cleanText(body.planCode, 32);
    const plan = amcPlans.find((item) => item.code === planCode);

    if (name.length < 2) {
      return NextResponse.json({ error: "Please valid name enter karein." }, { status: 400 });
    }
    if (!/^[6-9]\d{9}$/.test(phoneDigits)) {
      return NextResponse.json({ error: "Valid 10-digit Indian mobile number enter karein." }, { status: 400 });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email address enter karein." }, { status: 400 });
    }
    if (area.length < 5 || !area.toLowerCase().includes("bhopal")) {
      return NextResponse.json({ error: "AMC abhi Bhopal service areas ke liye available hai." }, { status: 400 });
    }
    if (!plan) {
      return NextResponse.json({ error: "Valid AMC plan select karein." }, { status: 400 });
    }

    const reference = await addDoc(collection(db, "leads"), {
      name,
      phone,
      email,
      service: "BlinkUp Home AMC",
      subService: plan.name,
      location: area,
      address: area,
      mapLink: "",
      date: "",
      time: "",
      message,
      status: "new",
      source: "websiteAmcPage",
      planCode: plan.code,
      planSnapshot: {
        code: plan.code,
        name: plan.name,
        durationMonths: plan.durationMonths,
        listPricePaise: plan.listPricePaise,
        offerPricePaise: plan.offerPricePaise,
        discountPercent: plan.discountPercent,
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    await sendEmail(
      `New AMC enquiry - ${name}`,
      [
        "New BlinkUp Home AMC enquiry",
        `Request: ${reference.id}`,
        `Customer: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email || "Not shared"}`,
        `Plan: ${plan.name}`,
        `Launch offer: ${formatAmcPrice(plan.offerPricePaise)}`,
        `Area: ${area}`,
        `Customer note: ${message || "Not shared"}`,
        "Open BlinkUp Website Admin > AMC enquiries to follow up.",
      ].join("\n")
    );

    return NextResponse.json({ success: true, requestId: reference.id });
  } catch (error) {
    console.error("AMC enquiry submission failed:", error);
    return NextResponse.json(
      { error: "AMC request submit nahi ho saki. Please dobara try karein." },
      { status: 500 }
    );
  }
}
