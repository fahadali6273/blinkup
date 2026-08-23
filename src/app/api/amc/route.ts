import { NextResponse } from "next/server";

export const runtime = "nodejs";

const membershipEndpoint =
  process.env.FIREBASE_WEBSITE_MEMBERSHIP_URL ||
  "https://us-central1-blinkup-b42bd.cloudfunctions.net/requestWebsiteMembership";

function cleanText(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function callableErrorMessage(payload: unknown) {
  if (!payload || typeof payload !== "object") return "";
  const error = (payload as { error?: { message?: unknown } }).error;
  return typeof error?.message === "string" ? error.message : "";
}

export async function GET() {
  return NextResponse.json({
    ready: true,
    service: "BlinkUp AMC enquiry",
    backend: "Firebase callable",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = {
      name: cleanText(body.name, 100),
      phone: cleanText(body.phone, 20),
      email: cleanText(body.email, 160).toLowerCase(),
      area: cleanText(body.area, 220),
      message: cleanText(body.message, 500),
      planCode: cleanText(body.planCode, 32),
      website: cleanText(body.website, 120),
    };

    const response = await fetch(membershipEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
      cache: "no-store",
      signal: AbortSignal.timeout(25_000),
    });
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = callableErrorMessage(payload);
      return NextResponse.json(
        {
          error:
            message ||
            (response.status === 404
              ? "AMC backend abhi active nahi hai."
              : "AMC request submit nahi ho saki. Please dobara try karein."),
        },
        { status: response.status >= 400 && response.status < 500 ? 400 : 503 }
      );
    }

    const result =
      payload && typeof payload === "object"
        ? (payload as { result?: unknown; data?: unknown }).result ||
          (payload as { data?: unknown }).data
        : null;

    if (!result || typeof result !== "object") {
      throw new Error("Firebase callable returned an invalid response.");
    }

    const requestId = (result as { requestId?: unknown }).requestId;
    return NextResponse.json({
      success: true,
      requestId: typeof requestId === "string" ? requestId : "received",
    });
  } catch (error) {
    console.error("AMC enquiry submission failed:", error);
    return NextResponse.json(
      { error: "AMC request submit nahi ho saki. Please dobara try karein." },
      { status: 503 }
    );
  }
}
