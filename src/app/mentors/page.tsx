"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePlatform, Booking } from "@/context/PlatformContext";
import { Calendar as CalendarIcon, Clock, Award, Star, CheckCircle, CreditCard, ShieldCheck, X, Plus, User, Video } from "lucide-react";

export default function MentorsPage() {
  const { allUsers } = useAuth();
  const { addBooking } = usePlatform();

  const teachers = allUsers.filter((u) => u.role === "teacher" || u.isVerifiedTeacher);

  const [selectedMentor, setSelectedMentor] = useState<typeof teachers[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState("2026-08-14");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("16:00 - 17:00 EST");
  const [sessionType, setSessionType] = useState<"Free Peer Consult" | "1-on-1 Mentoring Session ($75/hr)">("1-on-1 Mentoring Session ($75/hr)");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [notes, setNotes] = useState("");

  // Payment State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor) return;

    if (sessionType.includes("$75")) {
      setShowPaymentModal(true);
    } else {
      executeBooking();
    }
  };

  const executeBooking = () => {
    if (!selectedMentor) return;
    setIsProcessing(true);
    setTimeout(() => {
      const b = addBooking({
        studentName: studentName || "Student Learner",
        studentEmail: studentEmail || "student@example.com",
        mentorId: selectedMentor.id,
        mentorName: selectedMentor.name,
        subject: selectedMentor.subject || "Competition Mentorship",
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        type: sessionType,
        notes,
      });
      setIsProcessing(false);
      setShowPaymentModal(false);
      setConfirmedBooking(b);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-yellow-100 text-slate-900 text-xs font-normal border border-brand-yellow-300">
            <Award className="w-3.5 h-3.5 text-brand-purple-700" />
            Verified Tutors & Competition Champions
          </div>
          <h1 className="text-4xl font-light text-slate-900 tracking-tight">
            Peer Tutors & Mentors
          </h1>
          <p className="text-sm font-extralight text-slate-600 leading-relaxed">
            Connect directly with verified competition mentors for 1-on-1 strategy sessions. Use the plus box to register as a new mentor.
          </p>
        </div>

        {/* Mentors Grid with Plus Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Requirement 2: Plus Box to Add / Register Peer Mentor */}
          <Link
            href="/auth?tab=register"
            className="bg-white rounded-3xl border-2 border-dashed border-slate-300 hover:border-brand-purple-500 p-8 min-h-[360px] flex flex-col items-center justify-center space-y-4 hover:shadow-lg transition-all group text-center"
          >
            <div className="w-16 h-16 rounded-full bg-brand-yellow-100 text-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8 text-brand-purple-700" />
            </div>
            <div>
              <h3 className="text-base font-normal text-slate-900">Register as Peer Mentor</h3>
              <p className="text-xs text-slate-400 font-extralight mt-1">
                Submit achievements, resume & verification test to join as tutor
              </p>
            </div>
          </Link>

          {/* Real Registered Tutors */}
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
            >
              <div className="p-8 space-y-6">
                
                <div className="flex items-center gap-4">
                  <img
                    src={teacher.avatar || "/assets/Website_Logo.png"}
                    alt={teacher.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm bg-white"
                  />
                  <div>
                    <h3 className="text-lg font-normal text-slate-900 flex items-center gap-1.5">
                      {teacher.name}
                      <CheckCircle className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                    </h3>
                    <span className="text-xs font-extralight text-brand-purple-700 block">
                      {teacher.subject || "Verified Mentor"}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs font-extralight text-slate-600">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-brand-purple-600 shrink-0" />
                    <span>{teacher.headline || "Verified Competition Educator"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-brand-yellow-500 fill-brand-yellow-400 shrink-0" />
                    <span>5.0 Rating • Verified Credentials</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-purple-600 shrink-0" />
                    <span>Available for 1-on-1 Sessions</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block font-extralight">Rate</span>
                    <span className="text-slate-900 font-medium">$75 / hour</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block font-extralight">Peer Consult</span>
                    <span className="text-emerald-700 font-medium">Free 15-min</span>
                  </div>
                </div>

              </div>

              <div className="p-8 pt-0">
                <button
                  onClick={() => setSelectedMentor(teacher)}
                  className="w-full py-3.5 rounded-full bg-slate-900 text-white font-normal text-xs hover:bg-brand-purple-900 transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <CalendarIcon className="w-4 h-4 text-brand-yellow-300" />
                  View Schedule & Book
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Booking Drawer / Modal */}
        {selectedMentor && !confirmedBooking && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full p-8 relative shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedMentor(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-purple-100 flex items-center justify-center text-brand-purple-700 font-semibold">
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-normal text-slate-900">
                      Book Session with {selectedMentor.name}
                    </h3>
                    <p className="text-xs font-extralight text-slate-500">
                      {selectedMentor.subject}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-medium text-slate-700 mb-2">Session Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setSessionType("Free Peer Consult")}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          sessionType === "Free Peer Consult"
                            ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <span className="block font-medium">Free Peer Consult</span>
                        <span className="block text-[11px] font-extralight opacity-80">$0 • 15 minutes</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSessionType("1-on-1 Mentoring Session ($75/hr)")}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          sessionType.includes("$75")
                            ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <span className="block font-medium">1-on-1 Lesson</span>
                        <span className="block text-[11px] font-extralight opacity-80">$75 / hour</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Select Date</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Available Time Slot</label>
                      <select
                        value={selectedTimeSlot}
                        onChange={(e) => setSelectedTimeSlot(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
                      >
                        <option value="14:00 - 15:00 EST">14:00 - 15:00 EST</option>
                        <option value="16:00 - 17:00 EST">16:00 - 17:00 EST</option>
                        <option value="18:00 - 19:00 EST">18:00 - 19:00 EST</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Jordan Miller"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Your Email</label>
                      <input
                        type="email"
                        required
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        placeholder="jordan@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Goals for Mentor</label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Please review my competition code or proposal..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-slate-900 text-white font-normal text-xs hover:bg-brand-purple-900 transition-colors shadow-md mt-2"
                  >
                    {sessionType.includes("$75") ? "Proceed to Payment ($75.00)" : "Confirm Free Booking"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-8 relative shadow-2xl border border-slate-100">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-brand-yellow-300 flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-normal text-slate-900">Secure Checkout</h3>
                    <p className="text-xs font-extralight text-slate-500">Visa & Credit Card</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between text-xs">
                  <div>
                    <span className="block font-medium text-slate-800">1-on-1 Mentor Session</span>
                    <span className="block text-slate-400 font-extralight">Mentor: {selectedMentor?.name}</span>
                  </div>
                  <div className="text-right font-semibold text-slate-900 text-sm">
                    $75.00 USD
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      defaultValue={studentName || "Jordan Miller"}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="4532 •••• •••• 8892"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        placeholder="08/28"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">CVV</label>
                      <input
                        type="text"
                        placeholder="312"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={executeBooking}
                  disabled={isProcessing}
                  className="w-full py-3.5 rounded-full bg-slate-900 text-white font-normal text-xs hover:bg-brand-purple-900 transition-colors shadow-md disabled:opacity-50"
                >
                  {isProcessing ? "Processing Payment..." : "Pay $75.00 & Confirm Booking"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {confirmedBooking && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center space-y-6 shadow-2xl border border-slate-100">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-normal text-slate-900">Booking Confirmed!</h3>
                <p className="text-xs font-extralight text-slate-500">
                  Your lesson with <span className="font-medium text-slate-800">{confirmedBooking.mentorName}</span> is scheduled.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-extralight">Date & Time:</span>
                  <span className="font-medium text-slate-800">{confirmedBooking.date} ({confirmedBooking.timeSlot})</span>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <span className="block text-[11px] text-slate-400 mb-1">Direct Room:</span>
                  <div className="p-2 rounded-xl bg-white border border-slate-200 font-mono text-[11px] text-brand-purple-700 select-all">
                    {confirmedBooking.meetingLink}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setConfirmedBooking(null);
                  setSelectedMentor(null);
                }}
                className="w-full py-3 rounded-full bg-slate-900 text-white font-normal text-xs hover:bg-brand-purple-900 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
