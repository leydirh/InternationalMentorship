"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  content: string;
  quizQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
  };
}

export interface Course {
  id: string;
  title: string;
  category: "Debate" | "Coding & CS" | "Business & Pitching" | "Math Olympiad" | "Science Fair";
  description: string;
  mentorName: string;
  mentorTitle: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  totalDuration: string;
  thumbnail: string;
  price: number;
  lessons: CourseLesson[];
}

export interface Booking {
  id: string;
  studentName: string;
  studentEmail: string;
  mentorId: string;
  mentorName: string;
  subject: string;
  date: string;
  timeSlot: string;
  type: "Free Peer Consult" | "1-on-1 Mentoring Session ($75/hr)";
  status: "Confirmed" | "Completed" | "Cancelled";
  meetingLink: string;
  notes?: string;
}

export interface ForumPost {
  id: string;
  authorName: string;
  authorRole: "Student" | "Mentor" | "Admin";
  authorAvatar?: string;
  authorEmail?: string;
  title: string;
  content: string;
  tag: string;
  likes: number;
  commentsCount: number;
  createdAt: string;
  replies: {
    id: string;
    authorName: string;
    authorRole: string;
    content: string;
    createdAt: string;
  }[];
}

export interface DirectMessage {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  recipientName: string;
  text: string;
  timestamp: string;
}

interface PlatformContextType {
  courses: Course[];
  userProgress: Record<string, string[]>;
  markLessonComplete: (courseId: string, lessonId: string) => void;
  addCourse: (course: Omit<Course, "id">) => void;
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id" | "status" | "meetingLink">) => Booking;
  forumPosts: ForumPost[];
  addForumPost: (title: string, content: string, tag: string, authorName: string, authorRole: "Student" | "Mentor" | "Admin", authorEmail?: string) => void;
  addForumReply: (postId: string, content: string, authorName: string, authorRole: string) => void;
  toggleLikePost: (postId: string) => void;
  deleteForumPost: (postId: string) => void;
  directMessages: DirectMessage[];
  sendDirectMessage: (senderId: string, senderName: string, recipientId: string, recipientName: string, text: string) => void;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [userProgress, setUserProgress] = useState<Record<string, string[]>>({});
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [directMessages, setDirectMessages] = useState<DirectMessage[]>([]);

  useEffect(() => {
    const savedCourses = localStorage.getItem("im_courses");
    const savedProgress = localStorage.getItem("im_user_progress");
    const savedBookings = localStorage.getItem("im_bookings");
    const savedForum = localStorage.getItem("im_forum");
    const savedDms = localStorage.getItem("im_dms");

    if (savedCourses) try { setCourses(JSON.parse(savedCourses)); } catch (e) { console.error(e); }
    if (savedProgress) try { setUserProgress(JSON.parse(savedProgress)); } catch (e) { console.error(e); }
    if (savedBookings) try { setBookings(JSON.parse(savedBookings)); } catch (e) { console.error(e); }
    if (savedForum) try { setForumPosts(JSON.parse(savedForum)); } catch (e) { console.error(e); }
    if (savedDms) try { setDirectMessages(JSON.parse(savedDms)); } catch (e) { console.error(e); }
  }, []);

  const markLessonComplete = (courseId: string, lessonId: string) => {
    setUserProgress((prev) => {
      const current = prev[courseId] || [];
      if (current.includes(lessonId)) return prev;
      const updated = { ...prev, [courseId]: [...current, lessonId] };
      localStorage.setItem("im_user_progress", JSON.stringify(updated));
      return updated;
    });
  };

  const addCourse = (newCourseData: Omit<Course, "id">) => {
    const newCourse: Course = {
      ...newCourseData,
      id: `course-${Date.now()}`,
    };
    const updated = [newCourse, ...courses];
    setCourses(updated);
    localStorage.setItem("im_courses", JSON.stringify(updated));
  };

  const addBooking = (bookingData: Omit<Booking, "id" | "status" | "meetingLink">): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: `book-${Date.now()}`,
      status: "Confirmed",
      meetingLink: `https://meet.internationalmentorship.net/room-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem("im_bookings", JSON.stringify(updated));
    return newBooking;
  };

  const addForumPost = (
    title: string,
    content: string,
    tag: string,
    authorName: string,
    authorRole: "Student" | "Mentor" | "Admin",
    authorEmail?: string
  ) => {
    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      title,
      content,
      tag,
      authorName,
      authorRole,
      authorEmail,
      likes: 0,
      commentsCount: 0,
      createdAt: "Just now",
      replies: [],
    };
    const updated = [newPost, ...forumPosts];
    setForumPosts(updated);
    localStorage.setItem("im_forum", JSON.stringify(updated));
  };

  const addForumReply = (postId: string, content: string, authorName: string, authorRole: string) => {
    const updated = forumPosts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          commentsCount: post.commentsCount + 1,
          replies: [
            ...post.replies,
            {
              id: `rep-${Date.now()}`,
              authorName,
              authorRole,
              content,
              createdAt: "Just now",
            },
          ],
        };
      }
      return post;
    });
    setForumPosts(updated);
    localStorage.setItem("im_forum", JSON.stringify(updated));
  };

  const toggleLikePost = (postId: string) => {
    const updated = forumPosts.map((post) => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setForumPosts(updated);
    localStorage.setItem("im_forum", JSON.stringify(updated));
  };

  const deleteForumPost = (postId: string) => {
    const updated = forumPosts.filter((p) => p.id !== postId);
    setForumPosts(updated);
    localStorage.setItem("im_forum", JSON.stringify(updated));
  };

  const sendDirectMessage = (senderId: string, senderName: string, recipientId: string, recipientName: string, text: string) => {
    const newDm: DirectMessage = {
      id: `dm-${Date.now()}`,
      senderId,
      senderName,
      recipientId,
      recipientName,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updated = [...directMessages, newDm];
    setDirectMessages(updated);
    localStorage.setItem("im_dms", JSON.stringify(updated));
  };

  return (
    <PlatformContext.Provider
      value={{
        courses,
        userProgress,
        markLessonComplete,
        addCourse,
        bookings,
        addBooking,
        forumPosts,
        addForumPost,
        addForumReply,
        toggleLikePost,
        deleteForumPost,
        directMessages,
        sendDirectMessage,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) throw new Error("usePlatform must be used within a PlatformProvider");
  return context;
};
