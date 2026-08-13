"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ShieldAlert, KeyRound, Sparkles, LogIn } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

interface MaintenanceGateProps {
  children: React.ReactNode;
}

export default function MaintenanceGate({ children }: MaintenanceGateProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isAdminRoute, setIsAdminRoute] = useState(true);
  const [bypass, setBypass] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if it is admin route (starts with /admin)
    const isadmin = pathname.startsWith("/admin");
    setIsAdminRoute(isadmin);
    
    // Check if bypass exists in storage
    const isBypassed = localStorage.getItem("bypass_maintenance") === "true";
    if (isBypassed) {
      setBypass(true);
    }
    setChecking(false);
  }, [pathname]);

  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (password === "130920") {
      localStorage.setItem("bypass_maintenance", "true");
      setBypass(true);
      setShowPrompt(false);
    } else {
      setErrorMsg("Mật khẩu truy cập không đúng.");
      setPassword("");
    }
  };

  // If loading/checking, render empty to avoid flash
  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Admin pages are never blocked
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // If bypassed, render public page normally
  if (bypass) {
    return (
      <>
        <Header />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
      </>
    );
  }

  // Render maintenance screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-pink-50/20 flex flex-col justify-between p-6 relative overflow-hidden font-sans">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] aspect-square rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] aspect-square rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      {/* Header logo area */}
      <header className="max-w-7xl mx-auto w-full flex justify-between items-center z-10">
        <div className="flex items-center space-x-2">
          <span className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-extrabold shadow shadow-primary/20">
            H
          </span>
          <span className="font-extrabold text-sm text-primary uppercase tracking-wider">
            Hoa Trên Đá
          </span>
        </div>
        <button
          onClick={() => setShowPrompt(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 bg-white/80 backdrop-blur text-xs font-bold text-gray-700 hover:text-primary hover:border-primary transition-all shadow-sm"
        >
          <KeyRound className="w-3.5 h-3.5" />
          Bypass
        </button>
      </header>

      {/* Content center */}
      <main className="max-w-md w-full mx-auto text-center py-12 space-y-8 z-10">
        <div className="w-20 h-20 bg-primary/10 text-primary border border-primary/20 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
          <Sparkles className="w-10 h-10 animate-pulse text-accent" />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">
            Website Đang <br />
            <span className="text-primary">Cập Nhật Thông Tin</span>
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed font-semibold max-w-sm mx-auto">
            Chúng tôi đang cập nhật hình ảnh hoạt động thực tế và kiểm thử cơ sở dữ liệu. Vui lòng quay lại sau ít phút.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-center">
          <button
            onClick={() => router.push("/admin/login")}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-bold text-white bg-accent hover:bg-accent-dark shadow-md hover:shadow-lg transition-all"
          >
            <LogIn className="w-4 h-4 mr-1.5" />
            Đăng nhập Admin CMS
          </button>
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="text-center text-[10px] text-gray-400 font-bold z-10">
        © {new Date().getFullYear()} CLB Thiện nguyện Hoa Trên Đá. All rights reserved.
      </footer>

      {/* Password Prompt Modal */}
      {showPrompt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-8 space-y-6 relative shadow-2xl border border-gray-100 text-center animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowPrompt(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900"
            >
              <XIcon className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-extrabold text-gray-900">Nhập mã truy cập</h3>
            <p className="text-xs text-gray-500 font-medium">Vui lòng nhập mật mã để mở khóa xem trước website công khai.</p>

            <form onSubmit={handleVerifyPassword} className="space-y-4">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật mã..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-center text-sm font-bold tracking-widest"
              />
              {errorMsg && (
                <p className="text-xs text-red-600 font-bold">{errorMsg}</p>
              )}
              <button
                type="submit"
                className="w-full py-2.5 rounded-full text-xs font-bold text-white bg-primary hover:bg-primary-dark shadow transition-all"
              >
                Mở khóa website
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline fallback X icon
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
