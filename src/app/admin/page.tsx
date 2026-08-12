"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Folder, BookOpen, Users, HelpCircle, ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    stories: 0,
    team: 0,
    partners: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [
          { count: projectsCount },
          { count: storiesCount },
          { count: teamCount },
          { count: partnersCount },
        ] = await Promise.all([
          supabase.from("projects").select("*", { count: "exact", head: true }),
          supabase.from("stories").select("*", { count: "exact", head: true }),
          supabase.from("team_members").select("*", { count: "exact", head: true }),
          supabase.from("partners").select("*", { count: "exact", head: true }),
        ]);

        setStats({
          projects: projectsCount || 0,
          stories: storiesCount || 0,
          team: teamCount || 0,
          partners: partnersCount || 0,
        });
      } catch (err) {
        console.error("Error loading dashboard counts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCounts();
  }, []);

  const statCards = [
    { name: "Dự án", count: stats.projects, href: "/admin/projects", icon: Folder, color: "bg-blue-500" },
    { name: "Nhật ký hành trình", count: stats.stories, href: "/admin/stories", icon: BookOpen, color: "bg-pink-500" },
    { name: "Thành viên", count: stats.team, href: "/admin/team", icon: Users, color: "bg-green-500" },
    { name: "Đối tác liên kết", count: stats.partners, href: "/admin/partners", icon: HelpCircle, color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Chào mừng quay trở lại, Admin
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Hệ thống quản lý thông tin chính thức Hoa Trên Đá.
          </p>
        </div>
      </div>

      {/* Grid count cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.name}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className={`w-10 h-10 rounded-xl ${card.color} text-white flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </span>
                <Link
                  href={card.href}
                  className="text-xs font-bold text-accent hover:underline flex items-center gap-0.5"
                >
                  Chi tiết <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{card.name}</p>
                <p className="text-3xl font-extrabold text-gray-900 mt-1">
                  {loading ? "..." : card.count}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Panels */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Lối tắt tác vụ nhanh</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/admin/projects/form"
            className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm font-bold text-gray-700">Tạo dự án mới</span>
            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </span>
          </Link>
          <Link
            href="/admin/stories/form"
            className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm font-bold text-gray-700">Viết bài hành trình mới</span>
            <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
