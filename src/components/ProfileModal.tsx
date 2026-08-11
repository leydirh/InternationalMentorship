"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { X, User, Mail, ShieldAlert, Award, FileText, Check, Camera } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, updateUserProfile } = useAuth();

  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [achievements, setAchievements] = useState("");
  const [avatar, setAvatar] = useState("");
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setHeadline(user.headline || (user.isAdmin ? "Creator & Administrator" : user.role === "teacher" ? "Verified Mentor" : "Student Learner"));
      setBio(user.bio || "");
      setAchievements(user.achievements || "");
      setAvatar(user.avatar || "/assets/Website_Logo.png");
    }
  }, [user, isOpen]);

  if (!isOpen || !user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      headline,
      bio,
      achievements,
      avatar,
    });
    setSavedMsg(true);
    setTimeout(() => {
      setSavedMsg(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 relative shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          
          {/* Header */}
          <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
            <div className="relative">
              <img
                src={avatar || "/assets/Website_Logo.png"}
                alt={name}
                className="w-16 h-16 rounded-2xl object-cover border border-slate-200 bg-white"
              />
              <div className="absolute -bottom-1 -right-1 bg-slate-900 text-white p-1 rounded-lg">
                <Camera className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-normal text-slate-900">{user.name}</h3>
              <p className="text-xs text-slate-500 font-extralight flex items-center gap-2 mt-0.5">
                <span>{user.email}</span>
                {user.isAdmin && (
                  <span className="px-2 py-0.5 rounded-full bg-brand-yellow-200 text-slate-900 text-[10px] font-semibold">
                    Creator / Admin
                  </span>
                )}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-purple-500"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Headline / Title</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. USACO Gold Finalist & MIT CS '27"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-purple-500"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Bio / Overview</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell students or mentors about your background and competition goals..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-purple-500"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Competition Achievements & Awards</label>
              <textarea
                rows={2}
                value={achievements}
                onChange={(e) => setAchievements(e.target.value)}
                placeholder="e.g. DECA ICDC Top 10, USAMO Qualifier 2024..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-purple-500"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Avatar Image URL</label>
              <input
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="/assets/Website_Logo.png or image URL"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-mono text-[11px]"
              />
            </div>

            {savedMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 font-medium flex items-center justify-center gap-1.5 text-xs">
                <Check className="w-4 h-4" /> Profile Updated Successfully!
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-3 rounded-full border border-slate-200 text-slate-700 font-normal hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 py-3 rounded-full bg-slate-900 text-white font-normal hover:bg-brand-purple-900 shadow-md"
              >
                Save Profile
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};
