"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Role = "student" | "teacher" | "creator";

export interface TeacherApplication {
  id: string;
  name: string;
  email: string;
  subject: string;
  resumeUrl: string;
  achievements: string;
  testScore: number;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string;
  subject?: string;
  isVerifiedTeacher?: boolean;
  isAdmin?: boolean;
  headline?: string;
  bio?: string;
  achievements?: string;
}

interface AuthContextType {
  user: User | null;
  role: Role;
  login: (email: string, pass: string, targetRole?: Role) => boolean;
  logout: () => void;
  registerStudent: (name: string, email: string, pass: string) => boolean;
  submitTeacherApplication: (data: Omit<TeacherApplication, "id" | "status" | "submittedAt">) => void;
  teacherApplications: TeacherApplication[];
  approveTeacher: (id: string) => void;
  rejectTeacher: (id: string) => void;
  toggleAdminRole: (email: string) => void;
  allUsers: User[];
  updateUserProfile: (data: Partial<User>) => void;
}

const DEFAULT_CREATOR: User = {
  id: "creator-001",
  email: "rayqin864@gmail.com",
  name: "Ray Qin (Creator & Admin)",
  role: "creator",
  isAdmin: true,
  avatar: "/assets/Website_Logo.png",
  headline: "Creator & Platform Administrator",
  bio: "Managing competition mentorship, user roles, and course publication.",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [teacherApplications, setTeacherApplications] = useState<TeacherApplication[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([DEFAULT_CREATOR]);

  useEffect(() => {
    const savedUser = localStorage.getItem("im_user");
    const savedApps = localStorage.getItem("im_teacher_apps");
    const savedUsers = localStorage.getItem("im_all_users");

    if (savedUser) {
      try { setUser(JSON.parse(savedUser)); } catch (e) { console.error(e); }
    }
    if (savedApps) {
      try { setTeacherApplications(JSON.parse(savedApps)); } catch (e) { console.error(e); }
    }
    if (savedUsers) {
      try { setAllUsers(JSON.parse(savedUsers)); } catch (e) { console.error(e); }
    }
  }, []);

  const login = (email: string, pass: string, targetRole?: Role): boolean => {
    // PRD 4.2 Creator Credentials
    if (email === "rayqin864@gmail.com" && pass === "Woshitiancai10") {
      const creatorUser: User = DEFAULT_CREATOR;
      setUser(creatorUser);
      localStorage.setItem("im_user", JSON.stringify(creatorUser));
      return true;
    }

    const existing = allUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setUser(existing);
      localStorage.setItem("im_user", JSON.stringify(existing));
      return true;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name: email.split("@")[0].replace(".", " "),
      role: targetRole || "student",
      isVerifiedTeacher: targetRole === "teacher",
      isAdmin: targetRole === "creator",
    };
    setUser(newUser);
    const updatedUsers = [...allUsers, newUser];
    setAllUsers(updatedUsers);
    localStorage.setItem("im_user", JSON.stringify(newUser));
    localStorage.setItem("im_all_users", JSON.stringify(updatedUsers));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("im_user");
  };

  const registerStudent = (name: string, email: string, pass: string): boolean => {
    const studentUser: User = {
      id: `student-${Date.now()}`,
      email,
      name,
      role: "student",
    };
    setUser(studentUser);
    const updatedUsers = [...allUsers, studentUser];
    setAllUsers(updatedUsers);
    localStorage.setItem("im_user", JSON.stringify(studentUser));
    localStorage.setItem("im_all_users", JSON.stringify(updatedUsers));
    return true;
  };

  const submitTeacherApplication = (data: Omit<TeacherApplication, "id" | "status" | "submittedAt">) => {
    const newApp: TeacherApplication = {
      ...data,
      id: `app-${Date.now()}`,
      status: "pending",
      submittedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
    };
    const updated = [newApp, ...teacherApplications];
    setTeacherApplications(updated);
    localStorage.setItem("im_teacher_apps", JSON.stringify(updated));
  };

  const approveTeacher = (id: string) => {
    const app = teacherApplications.find((a) => a.id === id);
    const updated = teacherApplications.map((a) => (a.id === id ? { ...a, status: "approved" as const } : a));
    setTeacherApplications(updated);
    localStorage.setItem("im_teacher_apps", JSON.stringify(updated));

    if (app) {
      const newTeacherUser: User = {
        id: `teacher-${Date.now()}`,
        email: app.email,
        name: app.name,
        role: "teacher",
        subject: app.subject,
        isVerifiedTeacher: true,
        achievements: app.achievements,
      };
      const updatedUsers = [...allUsers, newTeacherUser];
      setAllUsers(updatedUsers);
      localStorage.setItem("im_all_users", JSON.stringify(updatedUsers));
    }
  };

  const rejectTeacher = (id: string) => {
    const updated = teacherApplications.map((a) => (a.id === id ? { ...a, status: "rejected" as const } : a));
    setTeacherApplications(updated);
    localStorage.setItem("im_teacher_apps", JSON.stringify(updated));
  };

  const toggleAdminRole = (targetEmail: string) => {
    const updatedUsers = allUsers.map((u) => {
      if (u.email.toLowerCase() === targetEmail.toLowerCase()) {
        const nextIsAdmin = !u.isAdmin;
        return {
          ...u,
          isAdmin: nextIsAdmin,
          role: nextIsAdmin ? ("creator" as Role) : u.role === "creator" ? ("student" as Role) : u.role,
        };
      }
      return u;
    });
    setAllUsers(updatedUsers);
    localStorage.setItem("im_all_users", JSON.stringify(updatedUsers));
    if (user && user.email.toLowerCase() === targetEmail.toLowerCase()) {
      const updatedCurrentUser = updatedUsers.find((u) => u.email.toLowerCase() === targetEmail.toLowerCase()) || null;
      setUser(updatedCurrentUser);
      localStorage.setItem("im_user", JSON.stringify(updatedCurrentUser));
    }
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem("im_user", JSON.stringify(updatedUser));

    const updatedAll = allUsers.map((u) => (u.id === user.id ? updatedUser : u));
    setAllUsers(updatedAll);
    localStorage.setItem("im_all_users", JSON.stringify(updatedAll));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || "student",
        login,
        logout,
        registerStudent,
        submitTeacherApplication,
        teacherApplications,
        approveTeacher,
        rejectTeacher,
        toggleAdminRole,
        allUsers,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
