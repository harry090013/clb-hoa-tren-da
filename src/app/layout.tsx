import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import MaintenanceGate from "@/components/layout/MaintenanceGate";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["vietnamese", "latin"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | CLB Thiện nguyện Hoa Trên Đá",
    default: "CLB Thiện nguyện Hoa Trên Đá — Từ đá nở hoa, Từ tâm lan tỏa",
  },
  description: "Trang thông tin chính thức của Câu lạc bộ Thiện nguyện Hoa Trên Đá. Hồ sơ năng lực, hoạt động hỗ trợ trẻ em và các hoàn cảnh khó khăn tại vùng cao.",
  keywords: ["Hoa Trên Đá", "Thiện nguyện", "Từ thiện", "Hà Giang", "Vùng cao", "Tình nguyện viên"],
  openGraph: {
    title: "CLB Thiện nguyện Hoa Trên Đá",
    description: "Từ đá nở hoa, Từ tâm lan tỏa - Kết nối yêu thương đến mọi miền.",
    url: "https://hoatrenda.org",
    siteName: "Hoa Trên Đá",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans antialiased bg-surface text-foreground selection:bg-accent/25 selection:text-accent-dark">
        <MaintenanceGate>{children}</MaintenanceGate>
      </body>
    </html>
  );
}
