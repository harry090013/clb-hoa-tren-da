"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setSubmitted(false);
  };

  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Intro */}
        <div className="max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-primary bg-primary/10">
            <Sparkles className="w-3 h-3 text-accent" />
            Kết nối với chúng tôi
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
            Liên Hệ Với Hoa Trên Đá
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed font-medium text-justify">
            Mọi thắc mắc, phản hồi hoặc đề xuất hỗ trợ thiện nguyện, xin vui lòng gửi tin nhắn hoặc liên hệ trực tiếp với chúng tôi qua các kênh thông tin dưới đây.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact details */}
          <div className="space-y-8 bg-surface rounded-3xl p-8 sm:p-12 border border-gray-100 flex flex-col justify-between">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Thông tin liên lạc</h2>
              <p className="text-sm text-gray-500 leading-relaxed text-justify">
                Ban truyền thông và đối ngoại sẽ tiếp nhận thông tin và phản hồi nhanh chóng nhất.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3.5 text-gray-700">
                  <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Điện thoại</p>
                    <p className="font-semibold text-base">0379 163 913</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3.5 text-gray-700">
                  <Mail className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Email</p>
                    <p className="font-semibold text-base break-all">hoatrendaclb@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3.5 text-gray-700">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Địa chỉ</p>
                    <p className="font-semibold text-base text-gray-900">Xóm Trại, Thôn Quế Xuân, Xã Xuân Phú, TP Đà Nẵng</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Map Placeholder */}
            <div className="bg-gray-100 h-48 rounded-2xl border border-gray-200 flex items-center justify-center text-xs text-gray-400 font-semibold p-4 text-center mt-6">
              Bản đồ định vị (Placeholder)
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-surface rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm flex flex-col justify-center">
            {submitted ? (
              <div className="text-center space-y-6 py-6">
                <div className="w-16 h-16 bg-green-50 text-primary border border-primary/20 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-primary">Tin nhắn đã được gửi!</h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                    Cảm ơn bạn đã để lại tin nhắn. Chúng tôi sẽ phản hồi lại bạn sớm nhất có thể.
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold text-white bg-accent hover:bg-accent-dark shadow transition-all duration-150"
                >
                  Gửi tin nhắn khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center space-y-1 mb-2">
                  <h2 className="text-xl font-bold text-gray-900 font-sans">Gửi lời nhắn</h2>
                  <p className="text-xs text-gray-500">Chúng tôi luôn sẵn lòng lắng nghe bạn.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700">Tên của bạn</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Văn A"
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

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700">Nội dung tin nhắn</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Nhập lời nhắn của bạn gửi đến ban điều hành Hoa Trên Đá..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm font-bold text-white bg-accent hover:bg-accent-dark shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Gửi tin nhắn đi
                  <Send className="w-4 h-4 ml-2" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
