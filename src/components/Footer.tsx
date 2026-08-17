import React from "react";
import Link from "next/link";
import { Globe, Mail, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand & Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 p-1 flex items-center justify-center shadow-md">
                <img
                  src="/assets/Website_Logo.png"
                  alt="IM Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-medium text-white tracking-tight">
                International Mentorship
              </span>
            </div>
            <p className="text-sm font-extralight text-slate-400 leading-relaxed">
              Bridging the educational opportunity gap with free self-paced competition courses and 1-on-1 peer mentoring from national & international winners.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-extralight pt-2">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-500" /> app.internationalmentorship.net
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" /> support@internationalmentorship.net
              </span>
            </div>
          </div>

          {/* Quick Links (Peer to Peer Mentors Link Removed) */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-extralight">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">Async Courses</Link></li>
              <li><Link href="/forum" className="hover:text-white transition-colors">Community Forum</Link></li>
            </ul>
          </div>

          {/* Social Media Placeholder (Replaces Deployment & Isolation) */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Connect With Us
            </h4>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs font-light text-slate-300 space-y-3">
              <div className="flex items-center gap-2 text-slate-200 font-medium">
                <Share2 className="w-4 h-4 text-purple-400" />
                <span>Visit Our Social Media</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Stay tuned for competition tips, updates, and announcements! Our official social media channels will be linked here soon.
              </p>
            </div>
          </div>

        </div>

        <div className="text-center text-xs font-extralight text-slate-500">
          <p>© 2026 International Mentorship (app.internationalmentorship.net). All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
