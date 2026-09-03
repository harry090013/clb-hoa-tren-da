"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Folder,
  BookOpen,
  Users,
  HelpCircle,
  ArrowUpRight,
  Plus,
  UserCheck,
  Handshake,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    stories: 3, // default 3 official stories
    team: 4,    // default 4 leadership members
    partners: 0,
    volunteers: 0,
    partnerships: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isDbOnline, setIsDbOnline] = useState<boolean | null>(null);

  useEffect(() => {
    async function fetchCounts() {
      let dbOnline = false;
      let pCount = 0;
      let sCount = 3;
      let tCount = 4;
      let partCount = 0;
      let vCount = 0;
      let prCount = 0;

      try {
        const [
          { count: projectsCount, error: pErr },
          { count: storiesCount, error: sErr },
          { count: teamCount, error: tErr },
          { count: partnersCount, error: partErr },
          { count: volCount, error: vErr },
          { count: partnerReqCount, error: prErr },
        ] = await Promise.all([
          supabase.from("projects").select("*", { count: "exact", head: true }),
          supabase.from("stories").select("*", { count: "exact", head: true }),
          supabase.from("team_members").select("*", { count: "exact", head: true }),
          supabase.from("partners").select("*", { count: "exact", head: true }),
          supabase.from("volunteer_applications").select("*", { count: "exact", head: true }),
          supabase.from("partnership_requests").select("*", { count: "exact", head: true }),
        ]);

        if (!pErr && !sErr && !tErr) {
          dbOnline = true;
          pCount = projectsCount || 0;
          sCount = storiesCount || 3;
          tCount = teamCount || 4;
          partCount = partnersCount || 0;
          vCount = volCount || 0;
          prCount = partnerReqCount || 0;
        }
      } catch (err) {
        console.warn("Supabase fetch failed:", err);
        dbOnline = false;
      }

      // Merge local offline submissions
      try {
        const localV = JSON.parse(localStorage.getItem("offline_volunteers") || "[]");
        const localP = JSON.parse(localStorage.getItem("offline_partners") || "[]");
        vCount += localV.length;
        prCount += localP.length;
      } catch {}

      setStats({
        projects: pCount,
        stories: sCount,
        team: tCount,
        partners: partCount,
        volunteers: vCount,
        partnerships: prCount,
      });
      setIsDbOnline(dbOnline);
      setLoading(false);
    }

    fetchCounts();
  }, []);

  const statCards = [
    {
      name: "Dự án thiện nguyện",
      count: stats.projects,
      href: "/admin/projects",
      icon: Folder,
      color: "bg-blue-500",
      note: stats.projects === 0 ? "Chưa có dự án (Sẵn sàng tạo mới)" : "Đang quản lý",
    },
    {
      name: "Bài viết hành trình",
      count: stats.stories,
      href: "/admin/stories",
      icon: BookOpen,
      color: "bg-pink-500",
      note: "3 bài viết chính thức đã hiển thị",
    },
    {
      name: "Ban Điều Hành",
      count: stats.team,
      href: "/admin/team",
      icon: Users,
      color: "bg-green-600",
      note: "4 nhân sự nòng cốt đã cập nhật",
    },
    {
      name: "Đơn tình nguyện viên",
      count: stats.volunteers,
      href: "/admin/volunteers",
      icon: UserCheck,
      color: "bg-amber-500",
      note: "Hồ sơ ứng tuyển qua website",
    },
    {
      name: "Đề xuất đối tác",
      count: stats.partnerships,
      href: "/admin/partnerships",
      icon: Handshake,
      color: "bg-indigo-600",
      note: "Doanh nghiệp / nhà tài trợ",
    },
    {
      name: "Minh bạch tài chính",
      count: 0,
      href: "/admin/transparency",
      icon: ShieldCheck,
      color: "bg-emerald-600",
      note: "Bảo mật bằng mã PIN 1309",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Chào mừng quay trở lại, Admin
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Hệ thống quản trị thông tin chính thức CLB Thiện nguyện Hoa Trên Đá.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 hover:text-primary hover:border-primary/40 shadow-xs"
        >
          Xem trang chủ công khai
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Database Connection Notice */}
      {!loading && (
        <div
          className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm ${
            isDbOnline
              ? "bg-emerald-50/70 border-emerald-200 text-emerald-900"
              : "bg-amber-50 border-amber-200 text-amber-900"
          }`}
        >
          <div className="flex items-start gap-3">
            {isDbOnline ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <h3 className="font-bold text-sm">
                {isDbOnline
                  ? "Cơ sở dữ liệu Supabase: Đang hoạt động bình thường"
                  : "Cơ sở dữ liệu Supabase: Tạm dừng kết nối (Chế độ dự phòng đang chạy)"}
              </h3>
              <p className="text-xs leading-relaxed opacity-90">
                {isDbOnline
                  ? "Mọi thay đổi bài viết, dự án và đơn đăng ký sẽ được đồng bộ ngay lập tức lên đám mây."
                  : "Dự án Supabase đang trong trạng thái ngủ đông do gói miễn phí. Toàn bộ website vẫn hoạt động mượt mà nhờ bộ nhớ đệm dự phòng. Để bật lại đầy đủ quyền ghi mới trên Admin, bạn chỉ cần bấm 'Restore project' trên Supabase Dashboard."}
              </p>
            </div>
          </div>

          {!isDbOnline && (
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 shadow-sm shrink-0 self-start sm:self-center"
            >
              Mở Supabase Dashboard
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      )}

      {/* Grid count cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.name}
              href={card.href}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md hover:border-primary/30 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className={`w-12 h-12 rounded-xl ${card.color} text-white flex items-center justify-center shadow-sm`}>
                  <Icon className="w-6 h-6" />
                </span>
                <span className="text-2xl sm:text-3xl font-black text-gray-900">
                  {card.count}
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors flex items-center justify-between">
                  {card.name}
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  {card.note}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick shortcuts */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-gray-900">Thao tác nhanh cho Ban Quản trị</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/stories/form"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark shadow-xs"
          >
            <Plus className="w-4 h-4" />
            Viết bài hành trình mới
          </Link>
          <Link
            href="/admin/projects/form"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 text-xs font-bold hover:border-primary/40 hover:text-primary shadow-xs"
          >
            <Plus className="w-4 h-4" />
            Tạo dự án gây quỹ mới
          </Link>
          <Link
            href="/admin/volunteers"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 text-xs font-bold hover:border-primary/40 hover:text-primary shadow-xs"
          >
            <UserCheck className="w-4 h-4" />
            Duyệt đơn tình nguyện viên
          </Link>
          <Link
            href="/admin/partnerships"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 text-xs font-bold hover:border-primary/40 hover:text-primary shadow-xs"
          >
            <Handshake className="w-4 h-4" />
            Xem đề xuất hợp tác
          </Link>
        </div>
      </div>
    </div>
  );
}
