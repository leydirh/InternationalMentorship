"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { GraduationCap, Calendar, BookOpen, MessageSquare, UserCheck, LogOut, Menu, X, ShieldAlert, User as UserIcon } from "lucide-react";
import { ProfileModal } from "@/components/ProfileModal";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: BookOpen },
    { href: "/courses", label: "Async Courses", icon: GraduationCap },
    { href: "/mentors", label: "Peer Mentors", icon: Calendar },
    { href: "/forum", label: "Forum & Tips", icon: MessageSquare },
    { href: "/dashboard", label: "Dashboard", icon: UserCheck },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo with User Asset Website_Logo.png */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-slate-100 flex items-center justify-center bg-white group-hover:scale-105 transition-transform">
                <img
                  src="/assets/Website_Logo.png"
                  alt="International Mentorship Logo"
                  className="w-full h-full object-contain p-1"
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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-light transition-all duration-200 ${
                      active
                        ? "bg-slate-900 text-white font-normal shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? "text-brand-yellow-300" : "text-slate-400"}`} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Auth State & Profile Section (With Generous Spacing as requested in screenshot) */}
            <div className="hidden md:flex items-center gap-6">
              {user ? (
                <div className="flex items-center gap-5">
                  
                  {/* Role Badge (Creator / Admin or Teacher or Student) */}
                  {user.isAdmin ? (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-brand-yellow-200 text-slate-900 border border-brand-yellow-300 shadow-sm shrink-0">
                      <ShieldAlert className="w-3.5 h-3.5 text-brand-purple-700" />
                      Creator / Admin
                    </span>
                  ) : user.role === "teacher" ? (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-brand-purple-100 text-brand-purple-900 border border-brand-purple-200 shrink-0">
                      <GraduationCap className="w-3.5 h-3.5 text-brand-purple-700" />
                      Teacher / Mentor
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200 shrink-0">
                      <UserIcon className="w-3.5 h-3.5 text-slate-500" />
                      Student
                    </span>
                  )}

                  {/* User Profile Button / Pill */}
                  <button
                    onClick={() => setProfileModalOpen(true)}
                    className="flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full border border-slate-200 hover:border-brand-purple-300 hover:bg-slate-50/80 transition-all shadow-sm"
                    title="Click to view & edit Profile"
                  >
                    <img
                      src={user.avatar || "/assets/Website_Logo.png"}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200 bg-white"
                    />
                    <span className="text-xs font-medium text-slate-800 max-w-[150px] truncate">
                      {user.name}
                    </span>
                  </button>

                  {/* Sign Out Button */}
                  <button
                    onClick={logout}
                    className="p-2 text-slate-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>

                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/auth"
                    className="px-4 py-2 text-sm font-light text-slate-700 hover:text-slate-900 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth?tab=register"
                    className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-normal hover:bg-brand-purple-900 shadow-sm transition-all"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 font-light"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              {user ? (
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setProfileModalOpen(true);
                    }}
                    className="text-xs text-brand-purple-700 font-medium underline"
                  >
                    Edit Profile ({user.name})
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs text-red-600 font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-slate-900 text-white font-normal"
                >
                  Sign In / Join
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Profile Section Modal */}
      <ProfileModal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} />
    </>
  );
};
