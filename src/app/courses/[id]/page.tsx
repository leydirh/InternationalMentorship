"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { usePlatform } from "@/context/PlatformContext";
import { Play, CheckCircle, ArrowLeft, Clock, BookOpen, Award, Check, ChevronRight } from "lucide-react";

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = (params?.id as string) || "";
  const { courses, userProgress, markLessonComplete } = usePlatform();

  const course = courses.find((c) => c.id === courseId);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  if (!course) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-light text-slate-800 mb-4">Course Not Found</h2>
        <Link href="/courses" className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm">
          Return to Courses Catalog
        </Link>
      </div>
    );
  }

  const currentLesson = course.lessons[activeLessonIndex] || course.lessons[0];
  const completedLessonIds = userProgress[course.id] || [];
  const isCurrentCompleted = completedLessonIds.includes(currentLesson?.id);

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    if (
      currentLesson.quizQuestion &&
      selectedQuizOption === currentLesson.quizQuestion.correctIndex
    ) {
      markLessonComplete(course.id, currentLesson.id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Back Link */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-xs font-light text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses Library
        </Link>

        {/* Course Header Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-brand-purple-900 text-brand-purple-200 text-xs font-light border border-brand-purple-700">
              {course.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-light tracking-tight leading-snug">
              {course.title}
            </h1>
            <p className="text-sm font-extralight text-slate-300">
              Taught by <span className="text-brand-yellow-300 font-normal">{course.mentorName}</span> ({course.mentorTitle})
            </p>
          </div>
        </div>

        {/* Player Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Lesson View Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              
              {/* Simulated Video Player */}
              <div className="relative bg-slate-950 aspect-video flex items-center justify-center text-white">
                <div className="text-center space-y-3 p-6">
                  <div className="w-16 h-16 rounded-full bg-brand-yellow-300 text-slate-900 flex items-center justify-center mx-auto shadow-glow-yellow cursor-pointer hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-slate-900 ml-1" />
                  </div>
                  <h3 className="text-base font-normal text-slate-100 max-w-md">
                    {currentLesson.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-extralight">
                    Interactive Video Module ({currentLesson.duration})
                  </p>
                </div>
              </div>

              {/* Lesson Text Content */}
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-normal text-slate-900">{currentLesson.title}</h2>
                  <button
                    onClick={() => markLessonComplete(course.id, currentLesson.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-normal transition-colors ${
                      isCurrentCompleted
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-slate-900 text-white hover:bg-brand-purple-900"
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    {isCurrentCompleted ? "Completed" : "Mark as Completed"}
                  </button>
                </div>

                <div className="text-sm font-extralight text-slate-700 leading-relaxed space-y-4">
                  <p>{currentLesson.content}</p>
                </div>

                {/* Optional Quiz Checkpoint */}
                {currentLesson.quizQuestion && (
                  <div className="p-6 rounded-2xl bg-brand-purple-50 border border-brand-purple-200 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-brand-purple-900 uppercase tracking-wider">
                      <Award className="w-4 h-4 text-brand-purple-700" />
                      Lesson Knowledge Check
                    </div>
                    <p className="text-sm font-normal text-slate-900">
                      {currentLesson.quizQuestion.question}
                    </p>

                    <div className="space-y-2">
                      {currentLesson.quizQuestion.options.map((opt, idx) => (
                        <label
                          key={idx}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                            selectedQuizOption === idx
                              ? "bg-white border-brand-purple-600 text-slate-900 font-medium"
                              : "bg-white/60 border-slate-200 text-slate-700 hover:bg-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name="quiz"
                            checked={selectedQuizOption === idx}
                            onChange={() => {
                              setSelectedQuizOption(idx);
                              setQuizSubmitted(false);
                            }}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>

                    <button
                      onClick={handleQuizSubmit}
                      disabled={selectedQuizOption === null}
                      className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-normal disabled:opacity-50 hover:bg-brand-purple-900 transition-colors"
                    >
                      Submit Answer
                    </button>

                    {quizSubmitted && (
                      <div className="text-xs pt-2">
                        {selectedQuizOption === currentLesson.quizQuestion.correctIndex ? (
                          <span className="text-emerald-700 font-medium flex items-center gap-1">
                            <Check className="w-4 h-4" /> Correct! Lesson progress saved.
                          </span>
                        ) : (
                          <span className="text-red-600 font-light">
                            Incorrect choice. Please try again.
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Modules List */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-normal text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-brand-purple-600" />
                Course Outline
              </h3>

              <div className="space-y-2">
                {course.lessons.map((les, index) => {
                  const isDone = completedLessonIds.includes(les.id);
                  const isCurrent = index === activeLessonIndex;
                  return (
                    <button
                      key={les.id}
                      onClick={() => {
                        setActiveLessonIndex(index);
                        setSelectedQuizOption(null);
                        setQuizSubmitted(false);
                      }}
                      className={`w-full text-left p-4 rounded-2xl border text-xs transition-all flex items-center justify-between ${
                        isCurrent
                          ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                          : "bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="font-normal line-clamp-1">{les.title}</div>
                        <div className={`text-[11px] font-extralight ${isCurrent ? "text-slate-300" : "text-slate-400"}`}>
                          {les.duration}
                        </div>
                      </div>

                      <div>
                        {isDone ? (
                          <CheckCircle className={`w-4 h-4 ${isCurrent ? "text-brand-yellow-300" : "text-emerald-600"}`} />
                        ) : (
                          <ChevronRight className={`w-4 h-4 ${isCurrent ? "text-slate-400" : "text-slate-300"}`} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mentor Booking Banner */}
            <div className="bg-gradient-to-br from-brand-purple-100 via-white to-brand-yellow-100 p-6 rounded-3xl border border-brand-purple-200 space-y-3">
              <h4 className="text-sm font-normal text-slate-900">Need 1-on-1 Guidance?</h4>
              <p className="text-xs font-extralight text-slate-600 leading-relaxed">
                Book a live session with {course.mentorName} to get direct feedback on your code, pitches, or debate arguments.
              </p>
              <Link
                href="/mentors"
                className="w-full block text-center py-2.5 rounded-full bg-slate-900 text-white text-xs font-normal hover:bg-brand-purple-900 transition-colors"
              >
                Book 1-on-1 Session ($75/hr)
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
