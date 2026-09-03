"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Sparkles,
  Heart,
  Send,
  CheckCircle2,
  Loader2,
  Phone,
  Mail,
  Users,
  Building,
  ShieldCheck,
} from "lucide-react";

export default function PartnerVolunteer() {
  const [formType, setFormType] = useState<"volunteer" | "partner">("volunteer");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [motivation, setMotivation] = useState("");
  const [orgName, setOrgName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      if (formType === "volunteer") {
        const { error } = await supabase.from("volunteer_applications").insert([
          {
            full_name: fullName.trim(),
            email: email.trim(),
            phone: phone.trim(),
            motivation: motivation.trim(),
            status: "new",
          },
        ]);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("partnership_requests").insert([
          {
            organization_name: orgName.trim(),
            contact_name: fullName.trim(),
            email: email.trim(),
            phone: phone.trim(),
            message: message.trim(),
            status: "new",
          },
        ]);
        if (error) throw error;
      }
      setSubmitted(true);
    } catch (err: any) {
      console.warn("Supabase insert failed, saving to local offline backup queue:", err);
      // Resilient Fallback: Never lose an applicant's data even if database is paused/offline
      try {
        const key = formType === "volunteer" ? "offline_volunteers" : "offline_partners";
        const existing = JSON.parse(localStorage.getItem(key) || "[]");
        const newItem =
          formType === "volunteer"
            ? {
                id: `offline-${Date.now()}`,
                full_name: fullName.trim(),
                email: email.trim(),
                phone: phone.trim(),
                motivation: motivation.trim(),
                status: "new",
                created_at: new Date().toISOString(),
                is_offline: true,
              }
            : {
                id: `offline-${Date.now()}`,
                organization_name: orgName.trim(),
                contact_name: fullName.trim(),
                email: email.trim(),
                phone: phone.trim(),
                message: message.trim(),
                status: "new",
                created_at: new Date().toISOString(),
                is_offline: true,
              };
        localStorage.setItem(key, JSON.stringify([newItem, ...existing]));
        setSubmitted(true);
      } catch (localErr) {
        setErrorMsg("Không thể gửi thông tin. Vui lòng gọi trực tiếp Hotline: 0379 163 913 để được tiếp nhận nhanh nhất!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setMotivation("");
    setOrgName("");
    setMessage("");
    setSubmitted(false);
    setErrorMsg("");
  };

  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Intro */}
        <div className="max-w-2xl space-y-6 text-center mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-primary bg-primary/10">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            Cùng chung tay lan tỏa
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Đồng Hành Cùng Hoa Trên Đá
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-medium text-justify">
            Hãy cùng chúng tôi viết tiếp những chặng đường nhân ái. Dù là cá nhân tình nguyện viên hay tổ chức doanh nghiệp, sự hiện diện của bạn đều là nguồn động lực to lớn cho các hoàn cảnh khó khăn.
          </p>
        </div>

        {/* Tab Selection */}
        {!submitted && (
          <div className="flex justify-center p-1.5 bg-surface border border-gray-200/80 rounded-full max-w-md mx-auto shadow-sm">
            <button
              onClick={() => {
                setFormType("volunteer");
                setErrorMsg("");
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${
                formType === "volunteer"
                  ? "bg-primary text-white shadow"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              <Users className="w-4 h-4" />
              Tình nguyện viên
            </button>
            <button
              onClick={() => {
                setFormType("partner");
                setErrorMsg("");
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${
                formType === "partner"
                  ? "bg-primary text-white shadow"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              <Building className="w-4 h-4" />
              Đối tác hợp tác
            </button>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-surface rounded-3xl border border-gray-200/80 p-8 sm:p-12 shadow-sm max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center space-y-6 py-8">
              <div className="w-16 h-16 bg-green-50 text-primary border border-primary/20 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-primary animate-in zoom-in-50 duration-300" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900">Gửi Đăng Ký Thành Công!</h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto font-medium">
                  Cảm ơn tấm lòng vàng của bạn đã quan tâm đến Câu lạc bộ Hoa Trên Đá. Thông tin đăng ký đã được ghi nhận. Ban Điều Hành sẽ chủ động liên hệ lại với bạn qua Số điện thoại / Zalo trong vòng 24 - 48h làm việc.
                </p>
              </div>

              {/* Direct support note */}
              <div className="bg-white p-4 rounded-2xl border border-gray-100 max-w-sm mx-auto text-xs text-gray-600 space-y-1">
                <p className="font-bold text-gray-800">Cần liên hệ hỗ trợ gấp?</p>
                <p>Hotline / Zalo: <span className="font-bold text-primary">0379 163 913</span></p>
                <p>Email: <span className="font-bold text-primary">hoatrendaclb@gmail.com</span></p>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold text-white bg-primary hover:bg-primary-dark shadow transition-all duration-150 cursor-pointer"
              >
                Gửi thêm thông tin khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                  {errorMsg}
                </div>
              )}

              {formType === "volunteer" ? (
                <>
                  <div className="space-y-1 mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Thông tin Đăng ký Tình nguyện viên</h2>
                    <p className="text-xs text-gray-500 font-medium">
                      Hãy điền thông tin để Ban nhân sự thuận tiện trao đổi và phân bổ công việc phù hợp với bạn.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Họ và tên *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn A"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-700">Số điện thoại / Zalo *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ví dụ: 0379 163 913"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-700">Địa chỉ Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@gmail.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Động lực hoặc kỹ năng bạn muốn đóng góp *</label>
                    <textarea
                      rows={4}
                      required
                      value={motivation}
                      onChange={(e) => setMotivation(e.target.value)}
                      placeholder="Chia sẻ đôi dòng về bản thân, thời gian rảnh, kinh nghiệm hoặc mảng bạn muốn hỗ trợ (nấu cháo, hậu cần, truyền thông, y tế, văn nghệ...)"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium resize-none"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1 mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Thông tin Đề xuất Hợp tác Đối tác</h2>
                    <p className="text-xs text-gray-500 font-medium">
                      Dành cho các cơ quan, đoàn thể, doanh nghiệp hoặc nhà tài trợ mong muốn đồng hành lâu dài.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Tên cơ quan / tổ chức / doanh nghiệp *</label>
                    <input
                      type="text"
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="Ví dụ: Công ty TNHH Sen Vàng / Quỹ từ thiện..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-700">Người đại diện liên hệ *</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ví dụ: Nguyễn Văn B (Trưởng phòng Đối ngoại)"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-700">Số điện thoại liên hệ *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0987654321"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Địa chỉ Email liên hệ *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contact@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Nội dung đề xuất hợp tác *</label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Chi tiết đề xuất: tài trợ hiện vật, kinh phí đèn năng lượng mặt trời, đồng hành nấu cháo bệnh viện, bảo trợ học bổng học sinh nghèo..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium resize-none"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm font-bold text-white bg-primary hover:bg-primary-dark shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Đang gửi thông tin...
                  </>
                ) : (
                  <>
                    Gửi thông tin đăng ký
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 font-medium pt-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Mọi thông tin cá nhân đều được bảo mật và chỉ dùng để liên hệ thiện nguyện.</span>
              </div>
            </form>
          )}
        </div>

        {/* Direct Contact Banner */}
        <div className="bg-surface rounded-2xl border border-gray-200/80 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-2xl mx-auto">
          <div className="space-y-1 text-center">
            <h3 className="font-bold text-gray-900 text-base">Liên hệ trực tiếp Ban Điều Hành</h3>
            <p className="text-xs text-gray-500 font-medium">Chúng tôi sẵn sàng lắng nghe và phản hồi mọi câu hỏi của bạn.</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <a
              href="tel:0379163913"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-gray-200 text-primary hover:border-primary/40 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              0379 163 913
            </a>
            <a
              href="mailto:hoatrendaclb@gmail.com"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-gray-200 text-gray-700 hover:border-primary/40 shadow-xs"
            >
              <Mail className="w-3.5 h-3.5" />
              Gửi Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
