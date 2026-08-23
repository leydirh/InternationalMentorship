import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const env = (process as any).env;
    if (env && env.DB) {
      const { results } = await env.DB.prepare("SELECT * FROM bookings ORDER BY created_at DESC").all();
      return NextResponse.json({ success: true, bookings: results });
    }
    return NextResponse.json({ success: true, bookings: [] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentName, studentEmail, mentorId, mentorName, subject, date, timeSlot, type, notes } = body;

    if (!studentName || !studentEmail) {
      return NextResponse.json({ success: false, error: "Name and email are required" }, { status: 400 });
    }

    const bookingId = `book-${Date.now()}`;
    const meetingLink = `https://meet.jit.si/IM-Session-${bookingId}`;

    const env = (process as any).env;
    if (env && env.DB) {
      await env.DB.prepare(
        `INSERT INTO bookings (id, student_name, student_email, mentor_id, mentor_name, subject, booking_date, time_slot, session_type, meeting_link, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        bookingId,
        studentName,
        studentEmail,
        mentorId || "teacher-1",
        mentorName || "Verified Peer Mentor",
        subject || "Extracurricular Strategy",
        date || "2026-08-25",
        timeSlot || "16:00 EST",
        type || "1-on-1 Mentoring Session",
        meetingLink,
        notes || ""
      ).run();
    }

    return NextResponse.json({
      success: true,
      booking: {
        id: bookingId,
        studentName,
        studentEmail,
        mentorName: mentorName || "Verified Peer Mentor",
        subject: subject || "Extracurricular Strategy",
        date,
        timeSlot,
        type,
        meetingLink,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
