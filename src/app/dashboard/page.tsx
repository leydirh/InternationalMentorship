"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePlatform } from "@/context/PlatformContext";
import { UserCheck, ShieldAlert, GraduationCap, Calendar, CheckCircle, XCircle, Plus, BookOpen, Clock, FileText, UserPlus, Award, Video, ShieldCheck, Mail } from "lucide-react";

export default function DashboardPage() {
  const {
    user,
    role,
    teacherApplications,
    approveTeacher,
    rejectTeacher,
    toggleAdminRole,
    allUsers,
  } = useAuth();
  const { bookings, courses, addCourse, userProgress } = usePlatform();

  // New Course Modal State for Admin/Creator
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<any>("Coding & CS");
  const [newDescription, setNewDescription] = useState("");
  const [newMentorName, setNewMentorName] = useState("Alex Zhang");
  const [newMentorTitle, setNewMentorTitle] = useState("USACO Winner");
  const [newDuration, setNewDuration] = useState("4.0 Hours");

  // New Deadline State for Teacher
  const [deadlines, setDeadlines] = useState([
    { id: "d1", title: "USACO 2026 February Contest", date: "2026-02-20", student: "Jordan Miller" },
    { id: "d2", title: "DECA ICDC State Proposal Submission", date: "2026-03-05", student: "Samantha K." },
  ]);
  const [newDeadlineTitle, setNewDeadlineTitle] = useState("");
  const [newDeadlineDate, setNewDeadlineDate] = useState("");
  const [newDeadlineStudent, setNewDeadlineStudent] = useState("Jordan Miller");

  const handleAddCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDescription) return;
    addCourse({
      title: newTitle,
      category: newCategory,
      description: newDescription,
      mentorName: newMentorName,
      mentorTitle: newMentorTitle,
      level: "Intermediate",
      totalDuration: newDuration,
      price: 0,
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
      lessons: [
        {
          id: `les-${Date.now()}`,
          title: "01. Foundations & Overview",
          duration: "45 mins",
          content: "Welcome to this new asynchronous course added by Creator/Admin.",
        },
      ],
    });
    setNewTitle("");
    setNewDescription("");
    setShowAddCourseModal(false);
  };

  const handleAddDeadline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeadlineTitle || !newDeadlineDate) return;
    setDeadlines([
      ...deadlines,
      {
        id: `d-${Date.now()}`,
        title: newDeadlineTitle,
        date: newDeadlineDate,
        student: newDeadlineStudent,
      },
    ]);
    setNewDeadlineTitle("");
    setNewDeadlineDate("");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Profile Bar */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"}
              alt={user?.name || "User"}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-normal text-slate-900">{user?.name || "Student Learner"}</h1>
                {user?.isAdmin && (
                  <span className="px-3 py-1 rounded-full bg-brand-yellow-100 text-slate-900 text-xs font-semibold border border-brand-yellow-300">
                    Creator / Admin
                  </span>
                )}
              </div>
              <p className="text-xs font-extralight text-slate-500 mt-1">
                {user?.email || "Guest"} • Active Role: <span className="font-medium text-slate-800 uppercase">{user?.role || "Student"}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!user ? (
              <Link href="/auth" className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-normal">
                Sign In to Platform
              </Link>
            ) : (
              <span className="text-xs text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 font-light flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Account Verified
              </span>
            )}
          </div>
        </div>

        {/* ROLE 1: CREATOR / ADMIN PORTAL */}
        {(user?.isAdmin || user?.role === "creator") && (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-2xl font-light text-slate-900 flex items-center gap-2">
                  <ShieldAlert className="w-6 h-6 text-brand-purple-700" />
                  Creator & Admin Control Center
                </h2>
                <p className="text-xs font-extralight text-slate-500">
                  Logged in as PRD Creator (<code className="text-brand-purple-700 font-mono">rayqin864@gmail.com</code>). Manage mentor verification, user roles, and courses.
                </p>
              </div>

              <button
                onClick={() => setShowAddCourseModal(true)}
                className="px-5 py-2.5 rounded-full bg-slate-900 text-white font-normal text-xs hover:bg-brand-purple-900 transition-colors shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-brand-yellow-300" />
                Add New Async Course
              </button>
            </div>

            {/* Pending Teacher Verification Requests */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-normal text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-brand-purple-600" />
                  Pending Teacher Applications ({teacherApplications.filter((a) => a.status === "pending").length})
                </h3>
              </div>

              <div className="space-y-4">
                {teacherApplications.map((app) => (
                  <div
                    key={app.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900 text-sm">{app.name}</span>
                        <span className="text-xs font-extralight text-slate-500">({app.email})</span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-semibold ${
                            app.status === "approved"
                              ? "bg-emerald-100 text-emerald-800"
                              : app.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-amber-100 text-amber-900"
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>

                      <p className="text-xs font-extralight text-slate-600">
                        Subject: <span className="font-normal text-slate-800">{app.subject}</span> • Achievements: {app.achievements}
                      </p>

                      <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1 font-mono">
                        <span>Submitted: {app.submittedAt}</span>
                        <span>Subject Quiz Score: <strong className="text-brand-purple-700">{app.testScore}%</strong></span>
                        <span className="text-slate-500 underline cursor-pointer">View Resume PDF</span>
                      </div>
                    </div>

                    {app.status === "pending" && (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => approveTeacher(app.id)}
                          className="px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-normal hover:bg-emerald-700 transition-colors flex items-center gap-1"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Approve Teacher
                        </button>
                        <button
                          onClick={() => rejectTeacher(app.id)}
                          className="px-4 py-2 rounded-full border border-red-200 text-red-600 hover:bg-red-50 text-xs font-normal transition-colors flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Admin Privilege & User Permissions Manager */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6 shadow-sm">
              <h3 className="text-base font-normal text-slate-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-brand-purple-600" />
                Manage User Admin Roles & Permissions
              </h3>

              <div className="divide-y divide-slate-100">
                {allUsers.map((u) => (
                  <div key={u.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-medium text-slate-900">{u.name}</span>
                      <span className="text-slate-400 font-extralight ml-2">({u.email})</span>
                      <span className="ml-2 text-[10px] text-slate-500 uppercase px-2 py-0.5 rounded-full bg-slate-100">
                        Role: {u.role}
                      </span>
                    </div>

                    <div>
                      <button
                        onClick={() => toggleAdminRole(u.email)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-light transition-colors ${
                          u.isAdmin
                            ? "bg-brand-purple-900 text-white font-normal"
                            : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {u.isAdmin ? "Is Admin (Click to Revoke)" : "Grant Admin Privileges"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ROLE 2: TEACHER / MENTOR DASHBOARD */}
        {(role === "teacher" || user?.isVerifiedTeacher) && (
          <div className="space-y-8">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-light text-slate-900 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-brand-purple-700" />
                Teacher & Tutors Command Center
              </h2>
              <p className="text-xs font-extralight text-slate-500">
                Manage competition deadlines for students, view calendar lesson bookings, and host 1-on-1 calls.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Assigned Student Lessons */}
              <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6 shadow-sm">
                <h3 className="text-base font-normal text-slate-900">Booked Lessons</h3>
                <div className="space-y-3">
                  {bookings.map((b) => (
                    <div key={b.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-slate-900">{b.studentName}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">
                          {b.status}
                        </span>
                      </div>
                      <p className="text-slate-500 font-extralight">Subject: {b.subject} • Date: {b.date} ({b.timeSlot})</p>
                      <div className="pt-1 flex items-center justify-between text-brand-purple-700 font-mono text-[11px]">
                        <a href={b.meetingLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 underline">
                          <Video className="w-3.5 h-3.5" /> Start Meeting Room
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Competition Deadlines Manager */}
              <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6 shadow-sm">
                <h3 className="text-base font-normal text-slate-900">Manage Competition Deadlines</h3>
                
                <form onSubmit={handleAddDeadline} className="space-y-3 text-xs">
                  <input
                    type="text"
                    required
                    placeholder="Deadline Title (e.g. USACO Feb Contest)"
                    value={newDeadlineTitle}
                    onChange={(e) => setNewDeadlineTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      required
                      value={newDeadlineDate}
                      onChange={(e) => setNewDeadlineDate(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                    />
                    <button
                      type="submit"
                      className="w-full py-2 rounded-full bg-slate-900 text-white text-xs font-normal"
                    >
                      Add Deadline
                    </button>
                  </div>
                </form>

                <div className="space-y-2 pt-2">
                  {deadlines.map((dl) => (
                    <div key={dl.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-normal text-slate-800 block">{dl.title}</span>
                        <span className="text-[11px] text-slate-400 font-extralight">For: {dl.student}</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-brand-yellow-100 text-slate-800 text-[11px]">
                        Due: {dl.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ROLE 3: STUDENT DASHBOARD */}
        <div className="space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-light text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-brand-purple-700" />
              Student Learning Journey & Bookings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Booked Sessions */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-normal text-slate-900">Your Booked Mentorship Sessions</h3>
                <Link href="/mentors" className="text-xs text-brand-purple-700 hover:underline">
                  Book New Session →
                </Link>
              </div>

              <div className="space-y-4">
                {bookings.map((b) => (
                  <div key={b.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-medium text-slate-900 text-sm block">{b.subject}</span>
                        <span className="text-slate-500 font-extralight">Mentor: {b.mentorName}</span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-brand-purple-100 text-brand-purple-800 text-[11px]">
                        {b.type}
                      </span>
                    </div>

                    <div className="text-slate-600 font-extralight">
                      📅 {b.date} ({b.timeSlot})
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                      <a
                        href={b.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-normal hover:bg-brand-purple-900 transition-colors flex items-center gap-1.5"
                      >
                        <Video className="w-3.5 h-3.5 text-brand-yellow-300" /> Join Video Room
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Progress Summary */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-normal text-slate-900">Enrolled Free Courses</h3>
                <Link href="/courses" className="text-xs text-brand-purple-700 hover:underline">
                  Explore Catalog →
                </Link>
              </div>

              <div className="space-y-4">
                {courses.map((c) => {
                  const done = userProgress[c.id] || [];
                  const pct = c.lessons.length > 0 ? Math.round((done.length / c.lessons.length) * 100) : 0;
                  return (
                    <div key={c.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50 space-y-2 text-xs">
                      <div className="flex justify-between font-normal text-slate-900">
                        <span>{c.title}</span>
                        <span className="text-brand-purple-700">{pct}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-brand-purple-600 h-full transition-all duration-300" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Add Course Modal for Admin */}
        {showAddCourseModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-8 space-y-4 shadow-2xl border border-slate-100">
              <h3 className="text-xl font-normal text-slate-900">Add New Asynchronous Course</h3>

              <form onSubmit={handleAddCourseSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Course Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Science Olympiad Astronomy Prep"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-purple-500"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-purple-500 bg-white"
                  >
                    <option value="Coding & CS">Coding & CS</option>
                    <option value="Business & Pitching">Business & Pitching</option>
                    <option value="Debate">Debate</option>
                    <option value="Math Olympiad">Math Olympiad</option>
                    <option value="Science Fair">Science Fair</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Mentor Name</label>
                    <input
                      type="text"
                      value={newMentorName}
                      onChange={(e) => setNewMentorName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Total Duration</label>
                    <input
                      type="text"
                      value={newDuration}
                      onChange={(e) => setNewDuration(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddCourseModal(false)}
                    className="w-1/2 py-3 rounded-full border border-slate-200 text-slate-700 font-normal hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-3 rounded-full bg-slate-900 text-white font-normal hover:bg-brand-purple-900 shadow-md"
                  >
                    Publish Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
