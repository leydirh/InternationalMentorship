"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap, AlertTriangle, ArrowRight } from "lucide-react";
import { usePlatform } from "@/context/PlatformContext";

export default function CoursesPage() {
  const { courses } = usePlatform();

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Instagram Announcement Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white shadow-xl space-y-4 border border-amber-400">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider">
                System Announcement
              </span>
              <h2 className="text-2xl font-semibold text-white mt-1">
                Asynchronous Courses Currently Not Available
              </h2>
            </div>
          </div>
          <p className="text-sm font-light text-amber-50 max-w-3xl leading-relaxed">
            Our self-paced asynchronous video course library is currently under construction. Please follow our official Instagram page for competition tips, updates, and course launch announcements!
          </p>
          <div className="pt-2">
            <a
              href="https://www.instagram.com/international.mentorship/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-950 text-white text-xs font-medium hover:bg-slate-900 transition-colors shadow-md"
            >
              Visit Our Instagram (@international.mentorship) <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <h1 className="text-4xl font-light text-slate-900 tracking-tight">Asynchronous Courses Catalog</h1>
          <p className="text-sm font-extralight text-slate-600">Self-paced modules will appear here once published.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((c) => (
            <div key={c.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-sm">
              <img src={c.thumbnail || "/assets/Homepage_Intro.png"} className="h-44 w-full object-cover" alt={c.title} />
              <div className="p-6 space-y-3">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-xs text-slate-700">{c.category}</span>
                <h3 className="text-lg font-normal text-slate-900">{c.title}</h3>
                <p className="text-xs text-slate-500 font-extralight">Mentor: {c.mentorName || "Peer Tutor"}</p>
              </div>
              <div className="p-6 pt-0">
                <a
                  href="https://www.instagram.com/international.mentorship/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-3 rounded-full bg-slate-900 text-white text-xs font-normal opacity-90 hover:opacity-100"
                >
                  Visit Instagram for Course Updates
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
