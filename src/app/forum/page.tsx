"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePlatform } from "@/context/PlatformContext";
import { MessageSquare, ThumbsUp, Send, MessageCircle, Plus, Trash2, ShieldCheck, X } from "lucide-react";

export default function ForumPage() {
  const { user } = useAuth();
  const {
    forumPosts,
    addForumPost,
    addForumReply,
    toggleLikePost,
    deleteForumPost,
    directMessages,
    sendDirectMessage,
  } = usePlatform();

  const [activeTab, setActiveTab] = useState<"forum" | "chat">("forum");
  const [selectedTag, setSelectedTag] = useState("All");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postTag, setPostTag] = useState("CS & USACO");
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  // Reply State
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  // Direct Messaging State
  const [activeChatRecipient, setActiveChatRecipient] = useState({ id: "creator-001", name: "Ray Qin (Creator & Admin)" });
  const [dmText, setDmText] = useState("");

  const tags = ["All", "CS & USACO", "Business & DECA", "Debate", "General Tips"];

  const filteredPosts = forumPosts.filter(
    (p) => selectedTag === "All" || p.tag.toLowerCase().includes(selectedTag.toLowerCase())
  );

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postContent) return;
    addForumPost(
      postTitle,
      postContent,
      postTag,
      user?.name || "Student Peer",
      user?.isAdmin ? "Admin" : user?.role === "teacher" ? "Mentor" : "Student",
      user?.email
    );
    setPostTitle("");
    setPostContent("");
    setShowNewPostModal(false);
  };

  const handleCreateReply = (postId: string) => {
    if (!replyText.trim()) return;
    addForumReply(
      postId,
      replyText,
      user?.name || "Student Peer",
      user?.isAdmin ? "Admin" : user?.role === "teacher" ? "Mentor" : "Student"
    );
    setReplyText("");
  };

  const handleSendDm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dmText.trim()) return;
    sendDirectMessage(
      user?.id || "guest-1",
      user?.name || "Student Peer",
      activeChatRecipient.id,
      activeChatRecipient.name,
      dmText
    );
    setDmText("");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header & Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-light text-slate-900 tracking-tight">
              Community Forum & Tips
            </h1>
            <p className="text-xs font-extralight text-slate-500 mt-1">
              Ask competition questions, exchange tips, and discuss strategy.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-200/60 p-1.5 rounded-full border border-slate-200">
            <button
              onClick={() => setActiveTab("forum")}
              className={`px-5 py-2 rounded-full text-xs font-light transition-all ${
                activeTab === "forum"
                  ? "bg-slate-900 text-white font-normal shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Public Forum
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-5 py-2 rounded-full text-xs font-light transition-all ${
                activeTab === "chat"
                  ? "bg-slate-900 text-white font-normal shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Direct Chat
            </button>
          </div>
        </div>

        {activeTab === "forum" ? (
          <div className="space-y-6">
            
            {/* Filter Tags */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                {tags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTag(t)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-light shrink-0 transition-all ${
                      selectedTag === t
                        ? "bg-brand-purple-900 text-white font-normal"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    #{t}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts Grid including Requirement 2 Plus Card */}
            <div className="space-y-4">
              
              {/* Plus Box to Create Thread */}
              <button
                onClick={() => setShowNewPostModal(true)}
                className="w-full bg-white rounded-3xl border-2 border-dashed border-slate-300 hover:border-brand-purple-500 p-6 flex items-center justify-center gap-3 hover:shadow-md transition-all group cursor-pointer text-slate-700"
              >
                <div className="w-10 h-10 rounded-full bg-brand-purple-50 text-brand-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="text-sm font-normal">Create New Forum Thread / Post Tip</span>
              </button>

              {/* Forum Post Cards */}
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.authorAvatar || "/assets/Website_Logo.png"}
                        alt={post.authorName}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200 bg-white"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-slate-900">{post.authorName}</span>
                          <span className="px-2 py-0.5 rounded-full bg-brand-purple-100 text-brand-purple-800 text-[10px] font-light">
                            {post.authorRole}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-extralight">{post.createdAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-light">
                        #{post.tag}
                      </span>
                      {(user?.isAdmin || user?.email === post.authorEmail) && (
                        <button
                          onClick={() => deleteForumPost(post.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-full hover:bg-red-50"
                          title="Delete Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base font-normal text-slate-900">{post.title}</h3>
                    <p className="text-xs font-extralight text-slate-700 leading-relaxed whitespace-pre-line">
                      {post.content}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-extralight text-slate-500">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleLikePost(post.id)}
                        className="flex items-center gap-1 hover:text-brand-purple-700 text-slate-700 font-normal"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" /> {post.likes} Likes
                      </button>
                      <button
                        onClick={() => setActivePostId(activePostId === post.id ? null : post.id)}
                        className="flex items-center gap-1 hover:text-slate-900 text-slate-600 font-normal"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> {post.commentsCount} Replies
                      </button>
                    </div>
                  </div>

                  {/* Expanded Replies */}
                  {activePostId === post.id && (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 pl-4 border-l-2 border-brand-purple-200">
                      {post.replies.map((rep) => (
                        <div key={rep.id} className="text-xs space-y-1 bg-slate-50 p-3 rounded-2xl">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-900">{rep.authorName}</span>
                            <span className="text-[10px] text-slate-400">({rep.authorRole})</span>
                            <span className="text-[10px] text-slate-400">• {rep.createdAt}</span>
                          </div>
                          <p className="text-slate-700 font-extralight">{rep.content}</p>
                        </div>
                      ))}

                      <div className="flex gap-2 pt-2">
                        <input
                          type="text"
                          placeholder="Write your reply..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="flex-grow px-4 py-2 rounded-full border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-purple-500 bg-white"
                        />
                        <button
                          onClick={() => handleCreateReply(post.id)}
                          className="px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-normal hover:bg-brand-purple-900"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>

          </div>
        ) : (
          /* Direct Chat Area */
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-3 min-h-[500px]">
            <div className="border-r border-slate-200 p-4 space-y-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
                Active Users & Mentors
              </h3>
              <div className="space-y-1">
                {[
                  { id: "creator-001", name: "Ray Qin (Creator & Admin)", role: "Platform Admin" },
                  { id: "t-1", name: "Verified Competition Mentor", role: "Tutor" },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setActiveChatRecipient({ id: m.id, name: m.name })}
                    className={`w-full text-left p-3 rounded-2xl text-xs transition-all flex items-center gap-3 ${
                      activeChatRecipient.id === m.id
                        ? "bg-brand-purple-50 border border-brand-purple-200 font-medium text-slate-900"
                        : "hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <span className="block font-medium text-slate-900">{m.name}</span>
                      <span className="block text-[10px] text-slate-400 font-extralight">{m.role}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col justify-between p-6 bg-slate-50/50">
              <div className="border-b border-slate-200 pb-4 mb-4">
                <h3 className="text-sm font-normal text-slate-900">{activeChatRecipient.name}</h3>
                <span className="text-[11px] text-emerald-600 flex items-center gap-1 font-light">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Direct Encrypted Session Active
                </span>
              </div>

              <div className="flex-grow space-y-3 overflow-y-auto max-h-[350px] pr-2">
                {directMessages
                  .filter(
                    (dm) =>
                      dm.recipientId === activeChatRecipient.id || dm.senderId === activeChatRecipient.id
                  )
                  .map((dm) => (
                    <div
                      key={dm.id}
                      className={`p-3 rounded-2xl text-xs max-w-md ${
                        dm.senderId === user?.id
                          ? "bg-slate-900 text-white ml-auto rounded-tr-none"
                          : "bg-white text-slate-800 border border-slate-200 rounded-tl-none"
                      }`}
                    >
                      <p className="font-extralight">{dm.text}</p>
                      <span className="text-[10px] opacity-60 block text-right mt-1">{dm.timestamp}</span>
                    </div>
                  ))}
              </div>

              <form onSubmit={handleSendDm} className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={dmText}
                  onChange={(e) => setDmText(e.target.value)}
                  className="flex-grow px-4 py-2.5 rounded-full border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-purple-500 bg-white"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-normal hover:bg-brand-purple-900 flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" /> Send
                </button>
              </form>
            </div>
          </div>
        )}

        {/* New Post Modal */}
        {showNewPostModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-8 space-y-4 shadow-2xl border border-slate-100">
              <button
                onClick={() => setShowNewPostModal(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-normal text-slate-900">Create Forum Thread</h3>

              <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Thread Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. How to prepare for DECA roleplay judging..."
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-purple-500"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Topic Tag</label>
                  <select
                    value={postTag}
                    onChange={(e) => setPostTag(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-purple-500 bg-white"
                  >
                    <option value="CS & USACO">CS & USACO</option>
                    <option value="Business & DECA">Business & DECA</option>
                    <option value="Debate">Debate</option>
                    <option value="General Tips">General Tips</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Content</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share your advice or ask your competition question..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-purple-500"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewPostModal(false)}
                    className="w-1/2 py-3 rounded-full border border-slate-200 text-slate-700 font-normal hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-3 rounded-full bg-slate-900 text-white font-normal hover:bg-brand-purple-900 shadow-md"
                  >
                    Publish Thread
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
