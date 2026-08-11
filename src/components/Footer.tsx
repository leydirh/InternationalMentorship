"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Heart, Globe, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-purple-500 to-brand-yellow-300 flex items-center justify-center text-slate-900">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-medium text-white tracking-tight">
                International Mentorship
              </span>
            </div>
            <p className="text-sm font-light text-slate-400 max-w-md leading-relaxed">
              Bridging the educational opportunity gap with free self-paced competition courses and 1-on-1 peer mentoring from national & international winners.
            </p>
            <div className="flex items-center gap-4 pt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" /> app.internationalmentorship.net
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> support@internationalmentorship.net
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Platform Features
            </h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">
                  Asynchronous Courses
                </Link>
              </li>
              <li>
                <Link href="/mentors" className="hover:text-white transition-colors">
                  Peer to Peer Mentors
                </Link>
              </li>
              <li>
                <Link href="/forum" className="hover:text-white transition-colors">
                  Competition Tips Forum
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Student & Teacher Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Deployment & Isolation
            </h4>
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-xs font-light space-y-2">
              <div className="flex items-center gap-2 text-brand-yellow-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Isolated Deployment
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Operating independently on subdomain <code className="text-brand-purple-300">app.internationalmentorship.net</code> from live Bluehost WordPress server.
              </p>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-light text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} International Mentorship. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-brand-purple-400 fill-brand-purple-400" /> for equal opportunity education worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};
