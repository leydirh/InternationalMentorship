import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    appUrl: process.env.NEXT_PUBLIC_APP_URL || "https://app.internationalmentorship.net",
    allowedOrigins: process.env.ALLOWED_ORIGIN || "https://internationalmentorship.net, https://app.internationalmentorship.net",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
}
