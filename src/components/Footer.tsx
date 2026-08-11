import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          
          {/* Logo & Platform Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 p-1 flex items-center justify-center shadow-md">
                <img
                  src="/assets/Website_Logo.png"
                  alt="IM Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span class="text-xl font-medium text-white tracking-tight">
                International Mentorship
              </span>
            </div>
            <p className="text-sm font-extralight text-slate-400 max-w-md leading-relaxed">
              Bridging the educational opportunity gap with competition guidance and 1-on-1 peer mentoring from national & international winners.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-extralight">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">Async Courses</Link></li>
              <li><Link href="/mentors" className="hover:text-white transition-colors">Peer Tutors</Link></li>
              <li><Link href="/forum" className="hover:text-white transition-colors">Community Forum</Link></li>
            </ul>
          </div>

          {/* Requirement 3: DEPLOYMENT AND ISOLATION DROPDOWN MENU */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              System Architecture
            </h4>
            
            <details className="group p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-xs font-light text-slate-300">
              <summary className="cursor-pointer font-medium text-slate-200 flex items-center justify-between select-none group-open:mb-3">
                <span className="flex items-center gap-2 text-yellow-300 font-normal">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Deployment & Isolation
                </span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              
              <div className="space-y-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                <p>
                  Operating independently on subdomain <code className="text-purple-300 font-mono">app.internationalmentorship.net</code> isolated from the live Bluehost WordPress server.
                </p>
                <div className="flex items-center gap-1.5 text-slate-300 font-mono pt-1">
                  <span>CORS Allowed Origins:</span>
                </div>
                <p className="font-mono text-[10px] text-slate-400">
                  • internationalmentorship.net<br/>
                  • app.internationalmentorship.net
                </p>
              </div>
            </details>

          </div>

        </div>

        <div className="text-center text-xs font-extralight text-slate-500">
          <p>© 2026 International Mentorship (app.internationalmentorship.net). All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
