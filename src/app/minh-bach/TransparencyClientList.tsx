"use client";

import { useState } from "react";
import { FinancialReport, FinancialTransaction } from "@/types";
import { Search, FileText, ArrowDownRight, ArrowUpRight, X, Image as ImageIcon } from "lucide-react";

interface TransparencyClientListProps {
  initialReports: FinancialReport[];
}

export default function TransparencyClientList({ initialReports }: TransparencyClientListProps) {
  const [reports] = useState<FinancialReport[]>(initialReports);
  
  // Search and Filter states per report ID
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({});
  const [filterTabs, setFilterTabs] = useState<Record<string, "all" | "income" | "expense">>({});
  
  // Modal state for receipt preview
  const [activeReceiptUrl, setActiveReceiptUrl] = useState<string | null>(null);
  const [activeReceiptDesc, setActiveReceiptDesc] = useState<string>("");

  const handleSearchChange = (reportId: string, value: string) => {
    setSearchQueries((prev) => ({ ...prev, [reportId]: value }));
  };

  const handleTabChange = (reportId: string, tab: "all" | "income" | "expense") => {
    setFilterTabs((prev) => ({ ...prev, [reportId]: tab }));
  };

  return (
    <div className="space-y-12">
      {reports.length === 0 ? (
        <div className="bg-surface rounded-3xl border border-gray-100 p-12 text-center text-gray-500 font-semibold shadow-inner">
          Hiện tại chưa có báo cáo tài chính công khai nào.
        </div>
      ) : (
        reports.map((report) => {
          const searchQuery = searchQueries[report.id] || "";
          const activeTab = filterTabs[report.id] || "all";

          // Filter transactions client-side
          const filteredTransactions = report.transactions.filter((tx) => {
            const matchesTab =
              activeTab === "all" ||
              (activeTab === "income" && tx.type === "income") ||
              (activeTab === "expense" && tx.type === "expense");
            
            const matchesSearch =
              searchQuery === "" ||
              tx.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
              tx.description.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesTab && matchesSearch;
          });

          return (
            <div
              key={report.id}
              className="bg-surface rounded-3xl border border-gray-100 p-6 sm:p-10 space-y-8"
            >
              {/* Report Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/60 pb-6">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-accent uppercase tracking-wider">
                    Dự án: {report.projectTitle || "Dự án chung"} (Năm {report.reportYear})
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {report.title}
                  </h2>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary">
                  DỮ LIỆU ĐƯỢC TẢI TỪ SUPABASE
                </div>
              </div>

              {/* Stats overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Tổng tiếp nhận</p>
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
                    <p className="text-xs font-bold text-gray-400 uppercase">Tổng chi tiêu</p>
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
                    <p className="text-xs font-bold text-gray-400 uppercase">Số dư hiện tại</p>
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

              {/* Interactive Search & Filters */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-bold text-primary">Danh sách giao dịch chi tiết</h3>
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  {/* Tabs Filter */}
                  <div className="flex p-0.5 bg-gray-100 rounded-full w-full sm:w-auto">
                    {(["all", "income", "expense"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => handleTabChange(report.id, tab)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                          activeTab === tab
                            ? "bg-primary text-white shadow-sm"
                            : "text-gray-500 hover:text-primary"
                        }`}
                      >
                        {tab === "all" ? "Tất cả" : tab === "income" ? "Khoản thu" : "Khoản chi"}
                      </button>
                    ))}
                  </div>

                  {/* Search Bar */}
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(report.id, e.target.value)}
                      placeholder="Tìm danh mục, nội dung..."
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                {/* Transactions table */}
                <div className="overflow-x-auto border border-gray-100 rounded-2xl shadow-sm bg-white">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Ngày</th>
                        <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Loại</th>
                        <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Danh mục</th>
                        <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Số tiền</th>
                        <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Nội dung diễn giải</th>
                        <th className="px-6 py-3.5 text-center text-xs font-bold text-gray-500 uppercase tracking-wider w-36">Chứng từ</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100 text-sm">
                      {filteredTransactions.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-10 text-center text-gray-400 font-semibold italic">
                            Không tìm thấy giao dịch phù hợp
                          </td>
                        </tr>
                      ) : (
                        filteredTransactions.map((tx) => (
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
                            <td className="px-6 py-4 text-gray-600 font-medium">
                              {tx.description}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {tx.receiptUrl ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveReceiptUrl(tx.receiptUrl || null);
                                    setActiveReceiptDesc(tx.description);
                                  }}
                                  className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-primary hover:text-white text-gray-600 text-xs font-bold transition-all"
                                >
                                  <ImageIcon className="w-3.5 h-3.5" /> Xem ảnh
                                </button>
                              ) : (
                                <span className="text-gray-400 text-xs italic font-medium">Chưa cập nhật</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* Modal image preview overlay */}
      {activeReceiptUrl && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 relative shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setActiveReceiptUrl(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-sm font-bold text-gray-900 font-sans tracking-wide pr-8">
              Biên lai chứng từ: {activeReceiptDesc}
            </h3>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden aspect-video flex items-center justify-center max-h-[60vh]">
              <img
                src={activeReceiptUrl}
                alt="Receipt detail"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
