"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, ShieldCheck, Loader2 } from "lucide-react";
import Link from "next/link";

interface FinancialReport {
  id: string;
  title: string;
  report_year: number;
  total_received: number;
  total_spent: number;
  status: string;
}

export default function AdminTransparency() {
  const [reports, setReports] = useState<FinancialReport[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("financial_reports")
      .select("id, title, report_year, total_received, total_spent, status")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading financial reports:", error);
    } else {
      setReports(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa báo cáo tài chính này? Các giao dịch liên đới cũng sẽ bị xóa. Thao tác này không thể hoàn tác.")) return;

    const { error } = await supabase.from("financial_reports").delete().eq("id", id);
    if (error) {
      alert("Xóa thất bại: " + error.message);
    } else {
      setReports(reports.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Quản Lý Minh Bạch Tài Chính
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Danh sách báo cáo quyết toán và lịch sử giao dịch thu chi của các chiến dịch.
          </p>
        </div>
        <Link
          href="/admin/transparency/form"
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-bold text-white bg-accent hover:bg-accent-dark shadow transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tạo báo cáo tài chính mới
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      ) : reports.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-500 font-medium shadow-sm">
          Chưa có báo cáo tài chính nào được lập. Nhấp vào nút "Tạo báo cáo tài chính mới" để bắt đầu.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Tiêu đề báo cáo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Năm báo cáo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Tổng thu / chi
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Trạng thái hiển thị
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100 text-sm">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {report.title}
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-semibold">
                      Năm {report.report_year}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col text-xs space-y-0.5">
                        <span className="text-primary font-bold">
                          Thu: {Number(report.total_received).toLocaleString("vi-VN")}đ
                        </span>
                        <span className="text-accent font-bold">
                          Chi: {Number(report.total_spent).toLocaleString("vi-VN")}đ
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                        report.status === "published"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}>
                        {report.status === "published" ? "Xuất bản" : "Bản nháp"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/transparency/form?id=${report.id}`}
                          className="p-2 text-gray-500 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(report.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50/50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
