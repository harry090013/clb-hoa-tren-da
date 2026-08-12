"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import AdminGuard from "@/components/admin/AdminGuard";
import { supabase } from "@/lib/supabase";
import { Folder, BookOpen, Users, HelpCircle, LogOut, Home, Sparkles, ShieldCheck, UserCheck, Handshake, Tags } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  const menuItems = [
    { name: "Tổng quan", href: "/admin", icon: Home },
    { name: "Dự án", href: "/admin/projects", icon: Folder },
    { name: "Danh mục bài viết", href: "/admin/categories", icon: Tags },
    { name: "Hành trình", href: "/admin/stories", icon: BookOpen },
    { name: "Thành viên", href: "/admin/team", icon: Users },
    { name: "Đối tác hiển thị", href: "/admin/partners", icon: HelpCircle },
    { name: "Minh bạch tài chính", href: "/admin/transparency", icon: ShieldCheck },
    { name: "Đăng ký tình nguyện", href: "/admin/volunteers", icon: UserCheck },
    { name: "Đăng ký đối tác", href: "/admin/partnerships", icon: Handshake },
  ];

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-primary text-white flex flex-col flex-shrink-0">
          <div className="h-20 flex items-center px-6 border-b border-primary-dark shadow-sm">
            <Link href="/" className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary shadow">
                <Sparkles className="w-4.5 h-4.5 text-accent animate-pulse" />
              </span>
              <span className="font-extrabold text-sm tracking-wider uppercase">
                Admin Panel
              </span>
            </Link>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-bold transition-colors duration-150 ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "text-gray-200 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3 text-accent" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-primary-dark">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-sm font-bold text-gray-200 hover:bg-white/10 hover:text-white rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3 text-accent" />
              Đăng xuất
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
