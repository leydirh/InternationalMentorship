import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "Name, email, and message are required" }, { status: 400 });
    }

    const messageId = `msg-${Date.now()}`;
    const subjectVal = subject || "General Inquiry";
    const createdAtStr = new Date().toISOString();

    // 1. Save to Cloudflare D1 SQL database
    const env = (process as any).env;
    if (env && env.DB) {
      await env.DB.prepare(
        `INSERT INTO contact_messages (id, name, email, subject, message, created_at)
         VALUES (?, ?, ?, ?, ?, ?)`
      ).bind(
        messageId,
        name,
        email,
        subjectVal,
        message,
        createdAtStr
      ).run();
    }

    return NextResponse.json({
      success: true,
      messageId,
      forwardToEmail: "xy3mmzx@gmail.com",
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const env = (process as any).env;
    if (env && env.DB) {
      const { results } = await env.DB.prepare("SELECT * FROM contact_messages ORDER BY created_at DESC").all();
      return NextResponse.json({ success: true, messages: results });
    }
    return NextResponse.json({ success: true, messages: [] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
