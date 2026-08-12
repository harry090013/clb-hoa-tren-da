import { getFinancialReports } from "@/lib/data";
import { ShieldCheck, AlertCircle, FileText, ArrowDownRight, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Báo cáo minh bạch",
  description: "Trang công khai thu chi tài chính chi tiết của các dự án thuộc CLB Hoa Trên Đá.",
};

export default async function Transparency() {
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

        {/* Financial reports section */}
        <div className="space-y-12">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-surface rounded-3xl border border-gray-100 p-6 sm:p-10 space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/60 pb-6">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-accent uppercase tracking-wider">
                    Dự án: {report.projectTitle || "Dự án chung"} (Năm {report.reportYear})
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {report.title}
                  </h2>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-200">
                  DỮ LIỆU ĐƯỢC TẢI TỪ SUPABASE
                </div>
              </div>

              {/* Stats overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase">Tổng tiếp nhận</p>
                    <p className="text-2xl font-extrabold text-primary mt-1">
                      {report.totalReceived.toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-primary">
                    <ArrowDownRight className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase">Tổng chi tiêu</p>
                    <p className="text-2xl font-extrabold text-accent mt-1">
                      {report.totalSpent.toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-accent">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase">Số dư hiện tại</p>
                    <p className="text-2xl font-extrabold text-gray-900 mt-1">
                      {report.remainingBalance.toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {report.publicNote && (
                <p className="text-sm font-semibold text-gray-600 italic bg-white p-4 rounded-xl border border-gray-100">
                  * Lưu ý: {report.publicNote}
                </p>
              )}

              {/* Transactions table */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-primary">Danh sách giao dịch chi tiết</h3>
                <div className="overflow-x-auto border border-gray-100 rounded-2xl shadow-sm bg-white">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Ngày
                        </th>
                        <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Loại
                        </th>
                        <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Danh mục
                        </th>
                        <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Số tiền
                        </th>
                        <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Nội dung diễn giải
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100 text-sm">
                      {report.transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-gray-50/50">
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-medium">
                            {tx.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-bold ${
                              tx.type === "income"
                                ? "bg-green-50 text-green-700"
                                : "bg-pink-50 text-pink-700"
                            }`}>
                              {tx.type === "income" ? "Thu" : "Chi"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">
                            {tx.category}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap font-bold ${
                            tx.type === "income" ? "text-primary" : "text-accent"
                          }`}>
                            {tx.type === "income" ? "+" : "-"}
                            {tx.amount.toLocaleString("vi-VN")}đ
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {tx.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
