"use client";

import { useEffect, useState } from "react";
import { ShieldAlert, KeyRound, Loader2 } from "lucide-react";

interface FinancialPinGateProps {
  children: React.ReactNode;
}

export default function FinancialPinGate({ children }: FinancialPinGateProps) {
  const [verified, setVerified] = useState(false);
  const [pin, setPin] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if already verified in this session
    const isVerified = sessionStorage.getItem("financial_auth_verified") === "true";
    if (isVerified) {
      setVerified(true);
    }
    setChecking(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Get the configured PIN from env, default to 1309
    const securePin = process.env.NEXT_PUBLIC_FINANCIAL_PIN || "1309";

    if (pin === securePin) {
      sessionStorage.setItem("financial_auth_verified", "true");
      setVerified(true);
    } else {
      setErrorMsg("Mã bảo mật tài chính không chính xác. Vui lòng thử lại.");
      setPin("");
    }
  };

  if (checking) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  if (verified) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-100 text-center animate-in fade-in zoom-in-95 duration-150">
        <div className="w-16 h-16 bg-red-50 text-accent rounded-full flex items-center justify-center mx-auto border border-red-100">
          <ShieldAlert className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Mã Xác Thực Tài Chính</h2>
          <p className="text-xs text-gray-500 leading-relaxed font-semibold max-w-xs mx-auto">
            Đây là khu vực bảo mật tài chính của câu lạc bộ. Vui lòng nhập mã PIN bảo mật tài chính để tiếp tục thao tác.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <KeyRound className="absolute left-4 top-3.5 w-4.5 h-4.5 text-gray-400" />
            <input
              type="password"
              required
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Nhập mã PIN bảo mật..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-center text-sm font-bold tracking-widest"
            />
          </div>

          {errorMsg && (
            <p className="text-xs font-bold text-red-600">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm font-bold text-white bg-accent hover:bg-accent-dark shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Xác thực truy cập
          </button>
        </form>
      </div>
    </div>
  );
}
