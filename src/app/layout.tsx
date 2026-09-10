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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://clb-hoa-tren-da.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | CLB Thiện nguyện Hoa Trên Đá",
    default: "CLB Thiện nguyện Hoa Trên Đá — Từ đá nở hoa, Từ tâm lan tỏa",
  },
  description: "Trang thông tin chính thức của Câu lạc bộ Thiện nguyện Hoa Trên Đá. Hồ sơ năng lực, hoạt động hỗ trợ trẻ em và các hoàn cảnh khó khăn tại vùng cao.",
  keywords: ["Hoa Trên Đá", "Thiện nguyện", "Từ thiện", "Hà Giang", "Vùng cao", "Tình nguyện viên"],
  openGraph: {
    title: "CLB Thiện nguyện Hoa Trên Đá",
    description: "Từ đá nở hoa, Từ tâm lan tỏa - Kết nối yêu thương đến mọi miền.",
    url: siteUrl,
    siteName: "CLB Thiện nguyện Hoa Trên Đá",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/images/og-share.jpg",
        width: 1200,
        height: 630,
        alt: "CLB Thiện nguyện Hoa Trên Đá",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CLB Thiện nguyện Hoa Trên Đá",
    description: "Từ đá nở hoa, Từ tâm lan tỏa - Kết nối yêu thương đến mọi miền.",
    images: ["/images/og-share.jpg"],
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
