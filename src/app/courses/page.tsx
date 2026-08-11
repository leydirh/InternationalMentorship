"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePlatform } from "@/context/PlatformContext";
import { useAuth } from "@/context/AuthContext";
import { GraduationCap, Clock, BookOpen, Search, Plus, PlayCircle, X } from "lucide-react";

export default function CoursesPage() {
  const { user } = useAuth();
  const { courses, userProgress, addCourse } = usePlatform();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState(false);

  // New course form
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<any>("Coding & CS");
  const [description, setDescription] = useState("");
  const [mentorName, setMentorName] = useState(user?.name || "Peer Tutors");
  const [mentorTitle, setMentorTitle] = useState("Competition Winner");
  const [duration, setDuration] = useState("4.0 Hours");

  const categories = ["All", "Coding & CS", "Business & Pitching", "Debate", "Math Olympiad", "Science Fair"];

  const filteredCourses = courses.filter((course) => {
    const matchesCat = selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.mentorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    addCourse({
      title,
      category,
      description,
      mentorName,
      mentorTitle,
      level: "Intermediate",
      totalDuration: duration,
      price: 0,
      thumbnail: "/assets/Homepage_Intro.png",
      lessons: [
        {
          id: `les-${Date.now()}`,
          title: "01. Introduction & Overview",
          duration: "45 mins",
          content: "Welcome to this asynchronous competition course!",
        },
      ],
    });
    setTitle("");
    setDescription("");
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple-100 text-brand-purple-900 text-xs font-normal border border-brand-purple-200">
            <GraduationCap className="w-3.5 h-3.5 text-brand-purple-700" />
            100% Free Asynchronous Library
          </div>
          <h1 className="text-4xl font-light text-slate-900 tracking-tight">
            Asynchronous Courses
          </h1>
          <p className="text-sm font-extralight text-slate-600 leading-relaxed">
            Self-paced courses created by peer mentors. Use the plus box to add new courses to the platform.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-light shrink-0 transition-all ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white font-normal shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses or mentors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-purple-500 bg-slate-50/50"
            />
          </div>
        </div>

        {/* Course Grid with "+" Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Requirement 2: Clean Plus Box to add Async Course */}
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-white rounded-3xl border-2 border-dashed border-slate-300 hover:border-brand-purple-500 p-8 min-h-[360px] flex flex-col items-center justify-center space-y-4 hover:shadow-lg transition-all group cursor-pointer text-center"
          >
            <div className="w-16 h-16 rounded-full bg-brand-purple-50 text-brand-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-normal text-slate-900">Add New Async Course</h3>
              <p className="text-xs text-slate-400 font-extralight mt-1">
                Click here to publish a new self-paced competition course
              </p>
            </div>
          </button>

          {/* User-created Courses */}
          {filteredCourses.map((course) => {
            const completedIds = userProgress[course.id] || [];
            const percent = course.lessons.length > 0 ? Math.round((completedIds.length / course.lessons.length) * 100) : 0;

            return (
              <div
                key={course.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={course.thumbnail || "/assets/Homepage_Intro.png"}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-light">
                        {course.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-extralight text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-brand-purple-600" />
                      <span>{course.totalDuration}</span>
                      <span>•</span>
                      <BookOpen className="w-3.5 h-3.5 text-brand-purple-600" />
                      <span>{course.lessons.length} Lessons</span>
                    </div>

                    <h3 className="text-lg font-normal text-slate-900 line-clamp-2 leading-snug">
                      {course.title}
                    </h3>

                    <p className="text-xs font-extralight text-slate-600 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100 text-xs">
                      <span className="font-medium text-slate-800">{course.mentorName}</span>
                      <span className="block text-[11px] font-extralight text-slate-500">{course.mentorTitle}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/courses/${course.id}`}
                    className="w-full py-3 rounded-full bg-slate-900 text-white font-normal text-xs hover:bg-brand-purple-900 transition-colors flex items-center justify-center gap-2"
                  >
                    <PlayCircle className="w-4 h-4 text-brand-yellow-300" />
                    {percent > 0 ? "Continue Course" : "Start Course"}
                  </Link>
                </div>
              </div>
            );
          })}

        </div>

        {/* Add Course Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-8 relative shadow-2xl border border-slate-100">
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-normal text-slate-900 mb-4">Add Asynchronous Course</h3>

              <form onSubmit={handleCreateCourse} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Course Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DECA International Roleplay Strategy"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-purple-500"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white"
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Overview of what students will learn..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Mentor Name</label>
                    <input
                      type="text"
                      value={mentorName}
                      onChange={(e) => setMentorName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Total Duration</label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
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
