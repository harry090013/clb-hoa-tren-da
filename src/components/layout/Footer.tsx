import Link from "next/link";
import { Mail, Phone, Sparkles, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto border-t border-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and Slogan */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="/logo_clb_hoatrenda.jpg"
                alt="Hoa Trên Đá Logo"
                className="w-9 h-9 rounded-full object-cover shadow-inner"
              />
              <span className="text-lg font-bold tracking-wider">
                HOA TRÊN ĐÁ
              </span>
            </Link>
            <p className="text-sm text-gray-200 italic max-w-sm">
              "Từ đá nở hoa – Từ tâm lan tỏa"
            </p>
            <p className="text-xs text-gray-300 max-w-sm text-justify">
              Có những bông hoa không lớn lên trong khu vườn màu mỡ mà vẫn vươn mình mạnh mẽ giữa những vách đá khô cằn.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Đường dẫn chính
            </h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>
                <Link href="/ve-chung-toi" className="hover:text-accent transition-colors duration-150">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="/hoat-dong" className="hover:text-accent transition-colors duration-150">
                  Hoạt động
                </Link>
              </li>
              <li>
                <Link href="/du-an" className="hover:text-accent transition-colors duration-150">
                  Dự án thiện nguyện
                </Link>
              </li>
              <li>
                <Link href="/hanh-trinh" className="hover:text-accent transition-colors duration-150">
                  Nhật ký hành trình
                </Link>
              </li>
              <li>
                <Link href="/minh-bach" className="hover:text-accent transition-colors duration-150">
                  Báo cáo minh bạch
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Liên hệ
            </h3>
            <ul className="space-y-3 text-sm text-gray-200">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="font-semibold">0379 163 913</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="break-all font-semibold">hoatrendaclb@gmail.com</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                href="/dong-hanh"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-full text-xs font-bold text-primary bg-white hover:bg-gray-100 shadow-sm"
              >
                <Heart className="w-3.5 h-3.5 mr-1.5 text-accent fill-current" />
                Gia nhập tình nguyện viên
              </Link>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-12 pt-8 border-t border-primary-dark/65 flex flex-col md:flex-row justify-between items-center text-xs text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} Câu lạc bộ Thiện nguyện Hoa Trên Đá. Bảo lưu mọi quyền.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/legal/privacy" className="hover:text-white transition-colors">
              Chính sách bảo mật
            </Link>
            <Link href="/legal/terms" className="hover:text-white transition-colors">
              Điều khoản hoạt động
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
