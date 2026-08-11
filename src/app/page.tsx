"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, BookOpen, MessageSquare, Lightbulb, Calendar, X, Sparkles } from "lucide-react";
import { usePlatform } from "@/context/PlatformContext";

export default function HomePage() {
  const { addBooking } = usePlatform();
  const [quickBookOpen, setQuickBookOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("Debate & Pitching");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [bookedSuccess, setBookedSuccess] = useState<string | null>(null);

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentEmail) return;
    const newBook = addBooking({
      studentName,
      studentEmail,
      mentorId: "teacher-1",
      mentorName: "Verified Near-Peer Mentor",
      subject: selectedTopic,
      date: "2026-08-14",
      timeSlot: "15:00 EST",
      type: "Free Peer Consult",
      notes: "Direct booking from homepage consultation modal",
    });
    setBookedSuccess(newBook.meetingLink);
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. Header & Hero Title */}
      <section className="pt-16 pb-12 text-center max-w-5xl mx-auto px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-yellow-100 text-slate-800 text-xs font-normal mb-6 border border-brand-yellow-300">
          <Sparkles className="w-3.5 h-3.5 text-brand-purple-600" />
          <span>Extracurricular & Competition Mentorship</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-light text-slate-900 tracking-tight leading-tight mb-4">
          Peer to Peer Mentorship
        </h1>
        <p className="text-xl sm:text-2xl font-extralight text-slate-500 mb-8">
          Providing quality education to all.
        </p>
        
        <div className="w-full h-px bg-slate-200 my-8" />
      </section>

      {/* 2. Top Banner (About Us Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative rounded-3xl overflow-hidden bg-black text-white p-8 sm:p-16 shadow-2xl min-h-[460px] flex flex-col justify-end border border-slate-800">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/assets/Homepage_Intro.png')`,
            }}
          />
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />

          <div className="relative z-10 max-w-5xl">
            <div className="inline-block px-4 py-1.5 rounded-xl border border-white/30 bg-white/10 backdrop-blur-md text-sm font-light text-white mb-6 shadow-sm">
              About Us
            </div>
            <p className="text-xl sm:text-3xl font-light leading-relaxed text-slate-100 tracking-wide">
              The criteria for university admission moves beyond grades to showcase practical competence such as debating skills, building applications, launching startups, and pitching. Our organization addresses this challenge with a free, self-paced library of courses tailored to competitions, coupled with affordable real-time mentoring by verified near-peer winners of competitions.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Feature Callout Cards (With Exact Matching Shape Placement & White Frames) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-6">
        
        {/* Yellow Card (Top): Yellow Torus Ring on Right side in white box */}
        <div className="relative rounded-3xl bg-[#FEF08A] text-slate-900 p-8 sm:p-12 overflow-hidden border border-amber-200/60 shadow-sm transition-transform hover:-translate-y-1 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <p className="text-xl sm:text-2xl font-light leading-relaxed text-slate-900">
                Existing tutoring centers and platforms focus primarily on traditional academic topics (e.g., AP and IB), leaving a gap for affordable, globally accessible, and comprehensive extracurricular training.
              </p>
            </div>
            <div className="flex justify-end items-center">
              <div className="bg-white p-3 rounded-2xl border border-white/80 shadow-md flex items-center justify-center">
                <img
                  src="/assets/Homepage_Yellow.png"
                  alt="Yellow Torus Shape"
                  className="w-40 sm:w-44 h-auto object-contain rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Purple Card (Bottom): Pink/Purple Steps on Left side in white box */}
        <div className="relative rounded-3xl bg-[#DDD6FE] text-slate-900 p-8 sm:p-12 overflow-hidden border border-purple-200/60 shadow-sm transition-transform hover:-translate-y-1 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex justify-start items-center order-2 md:order-1">
              <div className="bg-white p-3 rounded-2xl border border-white/80 shadow-md flex items-center justify-center">
                <img
                  src="/assets/Homepage_Purple.png"
                  alt="Purple Steps Shape"
                  className="w-36 sm:w-40 h-auto object-contain rounded-xl"
                />
              </div>
            </div>
            <div className="md:col-span-2 order-1 md:order-2">
              <p className="text-xl sm:text-2xl font-light leading-relaxed text-slate-900">
                Our platform bridges this gap by offering free, self-paced asynchronous courses taught by award-winning students and teachers to anyone with internet access.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* 4. Our Process Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <h2 className="text-4xl font-light text-slate-900 mb-14 text-left">
          Our Process
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-900 border border-slate-200 bg-slate-50">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-normal text-slate-900">Lessons</h3>
            <p className="text-base font-extralight text-slate-600 leading-relaxed">
              Students are able to learn from lessons or book sessions with tutors.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-900 border border-slate-200 bg-slate-50">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-normal text-slate-900">Feedback</h3>
            <p className="text-base font-extralight text-slate-600 leading-relaxed">
              Through these lessons, students receive feedback about their work.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-900 border border-slate-200 bg-slate-50">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-normal text-slate-900">Experience</h3>
            <p className="text-base font-extralight text-slate-600 leading-relaxed">
              Student mentors are able to offer advice and experience, from a familiar perspective of another student.
            </p>
          </div>

        </div>

        <div className="w-full h-px bg-slate-200 mt-20" />
      </section>

      {/* 5. Quote Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 bg-slate-950 text-white min-h-[520px]">
          
          <div className="p-8 sm:p-16 flex flex-col justify-center space-y-8">
            <div className="inline-block self-start px-4 py-1.5 rounded-full border border-white/30 text-xs font-extralight text-slate-300">
              What people are saying
            </div>

            <blockquote className="text-3xl sm:text-4xl font-light leading-snug tracking-tight text-white">
              “Those who do not have tuition pay for it by getting poorer grades/future prospects.”
            </blockquote>

            <div className="space-y-1 text-xs text-slate-400 font-extralight">
              <p className="text-slate-300 font-normal">– r/ApplyingToCollege</p>
              <p className="bg-white/10 inline-block px-3.5 py-1 rounded-full border border-white/10 mt-1">
                Discussion on Private Counselors
              </p>
            </div>
          </div>

          <div
            className="relative min-h-[350px] md:min-h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('/assets/Homepage_Quote.avif')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent hidden md:block" />
          </div>

        </div>
      </section>

      {/* 6. Core Offering Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 text-center">
        <h2 className="text-4xl font-light text-slate-900 mb-3">Our Core Offering</h2>
        <p className="text-base font-extralight text-slate-500 mb-16">
          Two Ways to Learn. Zero Barriers to Entry.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
          
          <div className="rounded-3xl border border-slate-200 bg-white p-10 sm:p-12 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group">
            <div className="space-y-6">
              <h3 className="text-2xl font-normal text-slate-900">Asynchronous Learning</h3>
              <div className="text-5xl font-light text-slate-900 tracking-tight">$0</div>
              
              <ul className="space-y-4 text-base font-extralight text-slate-600 pt-2">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Courses on different subjects and extracurriculars</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Learn at your own pace, anywhere.</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Discussion with the community</span>
                </li>
              </ul>
            </div>

            <div className="pt-12">
              <Link
                href="/courses"
                className="w-full block text-center py-4 px-6 rounded-full bg-slate-900 text-white font-normal text-base hover:bg-brand-purple-900 transition-colors shadow-md"
              >
                Explore
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-10 sm:p-12 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group relative">
            <div className="absolute top-8 right-8">
              <span className="px-3.5 py-1.5 rounded-full bg-brand-yellow-100 text-slate-900 text-xs font-normal border border-brand-yellow-300">
                1-on-1 Mentorship
              </span>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-normal text-slate-900">Lessons</h3>
              <div className="text-5xl font-light text-slate-900 tracking-tight">$75/hour</div>
              
              <ul className="space-y-4 text-base font-extralight text-slate-600 pt-2">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Peer to peer lessons</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Get personalized feedback</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Advice and experience</span>
                </li>
              </ul>
            </div>

            <div className="pt-12">
              <Link
                href="/mentors"
                className="w-full block text-center py-4 px-6 rounded-full bg-slate-900 text-white font-normal text-base hover:bg-brand-purple-900 transition-colors shadow-md"
              >
                Explore
              </Link>
            </div>
          </div>

        </div>

        <div className="mt-14 p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-brand-purple-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 text-left shadow-lg">
          <div>
            <h3 className="text-2xl font-light text-white mb-1">
              Want a Free Peer Consultation First?
            </h3>
            <p className="text-sm font-extralight text-slate-300">
              Book a 15-minute 1-on-1 strategy call with an award-winning peer mentor completely free.
            </p>
          </div>
          <button
            onClick={() => setQuickBookOpen(true)}
            className="shrink-0 px-8 py-3.5 rounded-full bg-brand-yellow-300 text-slate-900 font-normal text-base hover:bg-brand-yellow-400 transition-colors shadow-glow-yellow"
          >
            Book Free Consult Now
          </button>
        </div>
      </section>

      {/* Quick Booking Modal */}
      {quickBookOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 relative shadow-2xl border border-slate-100">
            <button
              onClick={() => {
                setQuickBookOpen(false);
                setBookedSuccess(null);
              }}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            {bookedSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-normal text-slate-900">Consultation Booked!</h3>
                <p className="text-xs text-slate-500">
                  Your free peer consultation meeting room has been generated:
                </p>
                <div className="p-3 bg-slate-50 rounded-xl text-xs font-mono text-brand-purple-700 select-all border border-slate-200">
                  {bookedSuccess}
                </div>
                <button
                  onClick={() => {
                    setQuickBookOpen(false);
                    setBookedSuccess(null);
                  }}
                  className="w-full py-2.5 rounded-full bg-slate-900 text-white text-sm"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickBook} className="space-y-4">
                <h3 className="text-xl font-normal text-slate-900">Book Free Peer Consult</h3>
                <p className="text-xs font-light text-slate-500">
                  Get personalized advice on competition roadmaps and extracurricular building.
                </p>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Jordan Lee"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Topic / Interest</label>
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple-500 bg-white"
                  >
                    <option value="USACO & CS Competitions">USACO & CS Competitions</option>
                    <option value="DECA & Business Pitching">DECA & Business Pitching</option>
                    <option value="Debate (Lincoln Douglas / PF)">Debate (Lincoln Douglas / PF)</option>
                    <option value="Science Fair & Research">Science Fair & Research</option>
                    <option value="General Extracurricular Strategy">General Extracurricular Strategy</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-slate-900 text-white font-normal text-sm hover:bg-brand-purple-900 transition-colors shadow-md mt-2"
                >
                  Confirm Free Booking
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
