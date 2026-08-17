"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, GraduationCap, Calendar, MessageSquare, UserCheck, ShieldAlert, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user, signOut, openProfileModal } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with User IM Image */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl border border-slate-900 overflow-hidden bg-slate-950 p-1 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform">
              <img
                src="/assets/Website_Logo.png"
                alt="IM Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-semibold text-lg text-slate-900 tracking-tight block leading-tight">
                International Mentorship
              </span>
              <span className="text-[11px] font-normal text-slate-400 block tracking-wide">
                app.internationalmentorship.net
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-full text-sm font-light flex items-center gap-2 transition-colors ${
                pathname === "/"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <BookOpen className="w-4 h-4" /> Home
            </Link>
            
            <Link
              href="/courses"
              className={`px-4 py-2 rounded-full text-sm font-light flex items-center gap-2 transition-colors ${
                pathname.startsWith("/courses")
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <GraduationCap className="w-4 h-4" /> Async Courses
            </Link>

            <Link
              href="/mentors"
              className={`px-4 py-2 rounded-full text-sm font-light flex items-center gap-2 transition-colors ${
                pathname.startsWith("/mentors")
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Calendar className="w-4 h-4" /> Peer Mentors
            </Link>

            <Link
              href="/forum"
              className={`px-4 py-2 rounded-full text-sm font-light flex items-center gap-2 transition-colors ${
                pathname.startsWith("/forum")
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Forum & Tips
            </Link>

            <Link
              href="/dashboard"
              className={`px-4 py-2 rounded-full text-sm font-light flex items-center gap-2 transition-colors ${
                pathname.startsWith("/dashboard")
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <UserCheck className="w-4 h-4" /> Dashboard
            </Link>
          </nav>

          {/* Right Profile & Spacing Section */}
          <div className="flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-yellow-200 text-slate-900 border border-yellow-300 shadow-sm shrink-0">
                  <ShieldAlert className="w-3.5 h-3.5 text-purple-700" />
                  <span>{user.isAdmin ? "Creator / Admin" : user.role}</span>
                </span>

                <button
                  onClick={openProfileModal}
                  className="flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full border border-slate-200 hover:border-purple-300 hover:bg-slate-50 transition-all shadow-sm"
                >
                  <img
                    src={user.avatar || "/assets/Website_Logo.png"}
                    alt="User Avatar"
                    className="w-7 h-7 rounded-full object-cover border border-slate-200 bg-slate-950 p-0.5"
                  />
                  <span className="text-xs font-medium text-slate-800 max-w-[150px] truncate">
                    {user.name}
                  </span>
                </button>

                <button
                  onClick={signOut}
                  className="p-2 text-slate-400 hover:text-red-500 rounded-full hover:bg-red-50"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth"
                  className="px-4 py-2 text-sm font-light text-slate-700 hover:text-slate-900"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth"
                  className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-normal hover:bg-brand-purple-900 transition-colors shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
