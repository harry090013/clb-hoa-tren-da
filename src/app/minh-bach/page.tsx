import { getFinancialReports } from "@/lib/data";
import { ShieldCheck, AlertCircle } from "lucide-react";
import TransparencyClientList from "./TransparencyClientList";

export const revalidate = 60;

export const metadata = {
  title: "Báo cáo minh bạch",
  description: "Trang công khai thu chi tài chính chi tiết của các dự án thuộc CLB Hoa Trên Đá.",
};

export default async function Transparency() {
  // Fetch data on server
  const reports = await getFinancialReports();

  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-primary bg-primary/10">
            <ShieldCheck className="w-4 h-4 text-accent" />
            Minh bạch tài chính 100%
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
            Cổng Thông Tin Minh Bạch
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            Mọi đóng góp, chi tiêu cho các hoạt động thiện nguyện đều được cập nhật công khai tại đây. Chúng tôi nói KHÔNG với sự mập mờ tài chính.
          </p>
        </div>

        {/* Bank donation disclaimer block */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-6 sm:p-8 flex items-start space-x-4">
          <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h3 className="font-bold text-yellow-900 text-base">Lưu ý quan trọng về thông tin tài khoản</h3>
            <p className="text-sm text-yellow-800 leading-relaxed">
              Cổng quyên góp chính thức hiện đang trong quá trình hoàn thiện các thủ tục pháp lý và thiết lập đối soát tự động. CLB Hoa Trên Đá hiện chưa mở cổng nhận quyên góp tài chính chính thức trực tuyến. Mọi thông tin tài khoản chuyển khoản hiển thị dưới đây là dữ liệu thử nghiệm để kiểm duyệt giao diện.
            </p>
          </div>
        </div>

        {/* Client-side interactive list of reports */}
        <TransparencyClientList initialReports={reports} />
      </div>
    </div>
  );
}
