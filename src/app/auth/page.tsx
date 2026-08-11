"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth, Role } from "@/context/AuthContext";
import { GraduationCap, ShieldAlert, Award, FileText, CheckCircle, ArrowRight, Lock, Mail, User, Sparkles } from "lucide-react";

// Separate component that uses searchParams
function AuthFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "register" ? "register" : "signin";

  const { login, registerStudent, submitTeacherApplication } = useAuth();

  const [authMode, setAuthMode] = useState<"signin" | "register">(initialTab);
  const [selectedRole, setSelectedRole] = useState<Role>("student");

  // Sign In Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Teacher Registration Wizard State
  const [teacherStep, setTeacherStep] = useState<1 | 2 | 3>(1);
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherSubject, setTeacherSubject] = useState("USACO & Computer Science");
  const [resumeFileName, setResumeFileName] = useState("");
  const [achievements, setAchievements] = useState("");
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const sampleQuiz = [
    {
      q: "In competitive programming, what is the maximum recommended time complexity for N = 10^5 within 2 seconds?",
      opts: ["O(N^2)", "O(N log N) or O(N)", "O(N^3)", "O(2^N)"],
      correct: 1,
    },
    {
      q: "In DECA or business pitch competitions, what is the primary function of performance indicators (PIs)?",
      opts: [
        "To confuse the judges",
        "To outline core standards judged during roleplays",
        "To calculate profit margin only",
        "None of the above",
      ],
      correct: 1,
    },
  ];

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const success = login(email, password, selectedRole);
    if (success) {
      router.push("/dashboard");
    } else {
      setErrorMsg("Invalid credentials. Please try again.");
    }
  };

  const handleStudentRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherName || !email) return;
    registerStudent(teacherName, email, password);
    router.push("/dashboard");
  };

  const handleTeacherQuizSubmit = () => {
    let score = 0;
    sampleQuiz.forEach((item, index) => {
      if (quizAnswers[index] === item.correct) {
        score += 50;
      }
    });
    setQuizScore(score);
    submitTeacherApplication({
      name: teacherName,
      email: teacherEmail,
      subject: teacherSubject,
      resumeUrl: resumeFileName || "submitted_resume.pdf",
      achievements: achievements,
      testScore: score,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-purple-600 to-brand-yellow-300 flex items-center justify-center mx-auto shadow-md">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-light text-slate-900 tracking-tight">
            International Mentorship Portal
          </h2>
          <p className="text-xs font-extralight text-slate-500">
            Sign in to access your asynchronous courses, peer bookings, and mentor dashboard.
          </p>
        </div>

        <div className="bg-white p-1.5 rounded-full border border-slate-200 shadow-sm flex items-center">
          <button
            onClick={() => setAuthMode("signin")}
            className={`w-1/2 py-2.5 rounded-full text-xs font-light transition-all ${
              authMode === "signin"
                ? "bg-slate-900 text-white font-normal shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthMode("register")}
            className={`w-1/2 py-2.5 rounded-full text-xs font-light transition-all ${
              authMode === "register"
                ? "bg-slate-900 text-white font-normal shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Create Account / Teacher Verification
          </button>
        </div>

        {authMode === "signin" ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6 shadow-sm">
            <div className="p-4 rounded-2xl bg-brand-yellow-50 border border-brand-yellow-200 text-xs font-extralight text-slate-800 space-y-2">
              <div className="flex items-center justify-between font-normal text-slate-900">
                <span className="flex items-center gap-1.5 text-brand-purple-800 font-semibold">
                  <ShieldAlert className="w-4 h-4" /> Creator/Admin Account
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("rayqin864@gmail.com");
                    setPassword("Woshitiancai10");
                    setSelectedRole("creator");
                  }}
                  className="px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-normal hover:bg-brand-purple-900"
                >
                  Autofill Creator
                </button>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Email: <code className="font-mono text-slate-900 font-medium">rayqin864@gmail.com</code> | Password: <code className="font-mono text-slate-900 font-medium">Woshitiancai10</code>
              </p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com or rayqin864@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Role Type</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as Role)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-purple-500 bg-white"
                >
                  <option value="student">Student (Browse courses & book lessons)</option>
                  <option value="teacher">Teacher / Tutors (Teach & manage calendar)</option>
                  <option value="creator">Creator / Admin (Full platform management)</option>
                </select>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs">{errorMsg}</div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-slate-900 text-white font-normal text-xs hover:bg-brand-purple-900 transition-colors shadow-md"
              >
                Sign In to Platform
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6 shadow-sm">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">I am registering as a:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole("student")}
                  className={`p-3.5 rounded-2xl border text-left text-xs transition-all ${
                    selectedRole === "student"
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className="block font-medium">Student</span>
                  <span className="block text-[10px] font-extralight opacity-80">Instant free access</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole("teacher")}
                  className={`p-3.5 rounded-2xl border text-left text-xs transition-all ${
                    selectedRole === "teacher"
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className="block font-medium">Teacher / Mentor</span>
                  <span className="block text-[10px] font-extralight opacity-80">Resume + Subject Quiz</span>
                </button>
              </div>
            </div>

            {selectedRole === "student" ? (
              <form onSubmit={handleStudentRegister} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    placeholder="Jordan Lee"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-slate-900 text-white font-normal text-xs hover:bg-brand-purple-900 transition-colors shadow-md"
                >
                  Create Free Student Account
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-brand-purple-50 border border-brand-purple-200 text-xs font-extralight text-slate-800 space-y-1">
                  <span className="font-semibold text-brand-purple-900 block">Rigorous Teacher Verification:</span>
                  <p>1. Submission of professional resume</p>
                  <p>2. Evidence of competition achievements</p>
                  <p>3. Mandatory subject-specific test</p>
                </div>

                {teacherStep === 1 && (
                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={teacherName}
                        onChange={(e) => setTeacherName(e.target.value)}
                        placeholder="Alex Zhang"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Teacher Email</label>
                      <input
                        type="email"
                        required
                        value={teacherEmail}
                        onChange={(e) => setTeacherEmail(e.target.value)}
                        placeholder="alex.zhang@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Subject Expertise</label>
                      <select
                        value={teacherSubject}
                        onChange={(e) => setTeacherSubject(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white"
                      >
                        <option value="USACO & Computer Science">USACO & Computer Science</option>
                        <option value="DECA & Business Pitching">DECA & Business Pitching</option>
                        <option value="Lincoln-Douglas & PF Debate">Lincoln-Douglas & PF Debate</option>
                        <option value="Math Olympiad (USAMO)">Math Olympiad (USAMO)</option>
                        <option value="ISEF Science Fair">ISEF Science Fair</option>
                      </select>
                    </div>

                    <button
                      onClick={() => setTeacherStep(2)}
                      disabled={!teacherName || !teacherEmail}
                      className="w-full py-3.5 rounded-full bg-slate-900 text-white font-normal text-xs hover:bg-brand-purple-900 transition-colors shadow-md disabled:opacity-50"
                    >
                      Next Step: Resume & Awards →
                    </button>
                  </div>
                )}

                {teacherStep === 2 && (
                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Professional Resume PDF</label>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setResumeFileName(e.target.files?.[0]?.name || "resume.pdf")}
                        className="w-full p-2 rounded-xl border border-slate-200 text-slate-600 bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Competition Achievements & Evidence</label>
                      <textarea
                        rows={3}
                        required
                        value={achievements}
                        onChange={(e) => setAchievements(e.target.value)}
                        placeholder="List award titles, years, links to official scoreboards..."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setTeacherStep(1)}
                        className="w-1/2 py-3 rounded-full border border-slate-200 text-slate-700 font-normal"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setTeacherStep(3)}
                        disabled={!achievements}
                        className="w-1/2 py-3 rounded-full bg-slate-900 text-white font-normal hover:bg-brand-purple-900 shadow-md disabled:opacity-50"
                      >
                        Next Step: Subject Test →
                      </button>
                    </div>
                  </div>
                )}

                {teacherStep === 3 && (
                  <div className="space-y-6 text-xs">
                    <h4 className="font-normal text-slate-900 text-sm">Mandatory Subject Verification Quiz</h4>

                    {quizScore !== null ? (
                      <div className="p-6 rounded-2xl bg-slate-900 text-white text-center space-y-3">
                        <CheckCircle className="w-10 h-10 text-brand-yellow-300 mx-auto" />
                        <h4 className="text-lg font-normal">Test Completed! Score: {quizScore}%</h4>
                        <p className="text-xs text-slate-300 font-extralight">
                          Your application has been submitted for final approval.
                        </p>
                        <button
                          onClick={() => {
                            login(teacherEmail, "password", "teacher");
                            router.push("/dashboard");
                          }}
                          className="px-6 py-2.5 rounded-full bg-brand-yellow-300 text-slate-900 font-normal"
                        >
                          Go to Dashboard
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {sampleQuiz.map((q, qIdx) => (
                          <div key={qIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                            <p className="font-normal text-slate-900">{qIdx + 1}. {q.q}</p>
                            <div className="space-y-1.5">
                              {q.opts.map((o, oIdx) => (
                                <label
                                  key={oIdx}
                                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer ${
                                    quizAnswers[qIdx] === oIdx
                                      ? "bg-white border-brand-purple-600 font-medium text-slate-900"
                                      : "bg-white/60 border-slate-200 text-slate-700"
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={`quiz-${qIdx}`}
                                    checked={quizAnswers[qIdx] === oIdx}
                                    onChange={() => setQuizAnswers({ ...quizAnswers, [qIdx]: oIdx })}
                                  />
                                  <span>{o}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}

                        <button
                          onClick={handleTeacherQuizSubmit}
                          className="w-full py-3.5 rounded-full bg-slate-900 text-white font-normal text-xs hover:bg-brand-purple-900 transition-colors shadow-md"
                        >
                          Submit Verification Test & Complete Application
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Main Page Component wrapped in Suspense
export default function AuthPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading portal authentication...</div>}>
      <AuthFormContent />
    </Suspense>
  );
}