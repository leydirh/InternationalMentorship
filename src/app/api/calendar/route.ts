import { NextResponse } from "next/server";

export async function GET() {
  const availableSlots = [
    { id: "slot-1", date: "2026-08-12", time: "14:00 - 15:00 EST", mentor: "Alex Zhang", subject: "USACO CS" },
    { id: "slot-2", date: "2026-08-12", time: "16:00 - 17:00 EST", mentor: "Alex Zhang", subject: "USACO CS" },
    { id: "slot-3", date: "2026-08-13", time: "11:00 - 12:00 EST", mentor: "Sophia Chen", subject: "DECA Pitching" },
    { id: "slot-4", date: "2026-08-13", time: "15:00 - 16:00 EST", mentor: "Marcus Vance", subject: "Debate Masterclass" },
  ];

  return NextResponse.json({
    success: true,
    slots: availableSlots,
  });
}
