"use client";

import { useState } from "react";
import { Sparkles, Heart, HelpCircle, Send, CheckCircle2 } from "lucide-react";

export default function PartnerVolunteer() {
  const [formType, setFormType] = useState<"volunteer" | "partner">("volunteer");
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [motivation, setMotivation] = useState("");
  const [orgName, setOrgName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
  };

  const handleReset = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setMotivation("");
    setOrgName("");
    setMessage("");
    setSubmitted(false);
  };

  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Intro */}
        <div className="max-w-2xl space-y-6 text-center mx-auto">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-primary bg-primary/10">
            <Sparkles className="w-3 h-3 text-accent" />
            Kiến tạo tương lai
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
            Đồng Hành Cùng Hoa Trên Đá
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            Hãy cùng chúng tôi chung tay vun đắp những giá trị tử tế. Dù là cá nhân hay tổ chức, sự hiện diện của bạn đều cực kỳ ý nghĩa.
          </p>
        </div>

        {/* Tab Selection */}
        {!submitted && (
          <div className="flex justify-center p-1 bg-surface border border-gray-100 rounded-full max-w-md mx-auto shadow-sm">
            <button
              onClick={() => setFormType("volunteer")}
              className={`flex-1 text-center py-3.5 rounded-full text-sm font-bold transition-all duration-200 ${
                formType === "volunteer"
                  ? "bg-primary text-white shadow"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Đăng ký Tình nguyện viên
            </button>
            <button
              onClick={() => setFormType("partner")}
              className={`flex-1 text-center py-3.5 rounded-full text-sm font-bold transition-all duration-200 ${
                formType === "partner"
                  ? "bg-primary text-white shadow"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Hợp tác Đối tác
            </button>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-surface rounded-3xl border border-gray-100 p-8 sm:p-12 shadow-sm max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center space-y-6 py-8">
              <div className="w-16 h-16 bg-green-50 text-primary border border-primary/20 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-primary">Gửi Đăng Ký Thành Công!</h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
                  Cảm ơn tấm lòng vàng của bạn đã quan tâm đến Hoa Trên Đá. Ban điều hành sẽ xem xét thông tin và liên hệ lại với bạn qua Email/Số điện thoại trong vòng 48h.
                </p>
              </div>
              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold text-white bg-accent hover:bg-accent-dark shadow transition-all duration-150"
              >
                Gửi phản hồi khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {formType === "volunteer" ? (
                <>
                  <div className="text-center space-y-1 mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Thông tin Tình nguyện viên</h2>
                    <p className="text-xs text-gray-500">Lưu ý: Dữ liệu này chỉ phục vụ mục đích kiểm tra giao diện (Demo).</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Họ và tên</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-700">Số điện thoại</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0987654321"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-700">Địa chỉ Email</label>
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
                    <label className="text-sm font-bold text-gray-700">Tại sao bạn muốn đồng hành cùng chúng tôi?</label>
                    <textarea
                      rows={4}
                      required
                      value={motivation}
                      onChange={(e) => setMotivation(e.target.value)}
                      placeholder="Chia sẻ ngắn gọn động lực, thế mạnh hoặc kỹ năng đặc biệt của bạn..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium resize-none"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center space-y-1 mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Thông tin Hợp tác Đối tác</h2>
                    <p className="text-xs text-gray-500">Lưu ý: Dữ liệu này chỉ phục vụ mục đích kiểm tra giao diện (Demo).</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Tên cơ quan / tổ chức / doanh nghiệp</label>
                    <input
                      type="text"
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="Công ty TNHH Sen Xanh"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-700">Người đại diện liên hệ</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Nguyễn Văn B"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-700">Số điện thoại liên hệ</label>
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
                    <label className="text-sm font-bold text-gray-700">Nội dung đề xuất hợp tác</label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Chi tiết đề xuất: tài trợ hiện vật, đồng hành truyền thông, tài trợ kinh phí nước sạch..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium resize-none"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm font-bold text-white bg-accent hover:bg-accent-dark shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Gửi thông tin đăng ký
                <Send className="w-4 h-4 ml-2" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
