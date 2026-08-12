"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Save, Plus, Trash2, Loader2, Upload, FileText, CheckCircle } from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
}

interface Transaction {
  id?: string; // UUID from DB, or undefined for new client-side items
  date: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  description: string;
  receipt_url?: string;
  _isDeleted?: boolean; // tracking local deletions
}

function TransparencyFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reportId = searchParams.get("id");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  // Report fields
  const [title, setTitle] = useState("");
  const [reportYear, setReportYear] = useState<number>(new Date().getFullYear());
  const [projectId, setProjectId] = useState("");
  const [publicNote, setPublicNote] = useState("");
  const [status, setStatus] = useState("draft");

  // Transactions fields
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Local state for uploading inline receipts
  const [uploadingRowIdx, setUploadingRowIdx] = useState<number | null>(null);

  useEffect(() => {
    async function loadProjects() {
      const { data } = await supabase.from("projects").select("id, title");
      setProjects(data || []);
    }
    loadProjects();
  }, []);

  useEffect(() => {
    if (!reportId) return;

    async function loadReport() {
      setFetching(true);
      // Fetch report
      const { data: reportData, error: reportErr } = await supabase
        .from("financial_reports")
        .select("*")
        .eq("id", reportId)
        .single();

      if (reportErr) {
        alert("Không thể tải thông tin báo cáo: " + reportErr.message);
        router.push("/admin/transparency");
        return;
      }

      if (reportData) {
        setTitle(reportData.title);
        setReportYear(reportData.report_year || new Date().getFullYear());
        setProjectId(reportData.project_id || "");
        setPublicNote(reportData.public_note || "");
        setStatus(reportData.status || "draft");

        // Fetch itemized transactions
        const { data: txData, error: txErr } = await supabase
          .from("financial_transactions")
          .select("*")
          .eq("report_id", reportId)
          .order("transaction_date", { ascending: true });

        if (txErr) {
          console.error("Error loading transactions:", txErr);
        } else {
          setTransactions(
            (txData || []).map((t: any) => ({
              id: t.id,
              date: t.transaction_date,
              type: t.transaction_type,
              category: t.category || "",
              amount: Number(t.amount),
              description: t.description || "",
              receipt_url: t.receipt_url || "",
            }))
          );
        }
      }
      setFetching(false);
    }
    loadReport();
  }, [reportId, router]);

  // Recalculating summaries
  const activeTx = transactions.filter((t) => !t._isDeleted);
  const totalReceived = activeTx.filter((t) => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
  const totalSpent = activeTx.filter((t) => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);
  const balance = totalReceived - totalSpent;

  const handleAddTransactionRow = () => {
    setTransactions([
      ...transactions,
      {
        date: new Date().toISOString().split("T")[0],
        type: "income",
        category: "Quyên góp cộng đồng",
        amount: 0,
        description: "",
        receipt_url: "",
      },
    ]);
  };

  const handleUpdateRow = (index: number, key: keyof Transaction, val: any) => {
    const updated = [...transactions];
    updated[index] = { ...updated[index], [key]: val };
    setTransactions(updated);
  };

  const handleDeleteRow = (index: number) => {
    const updated = [...transactions];
    if (updated[index].id) {
      // Mark it as deleted to delete from DB on Save
      updated[index]._isDeleted = true;
    } else {
      // Remove entirely if it hasn't been saved to DB yet
      updated.splice(index, 1);
    }
    setTransactions(updated);
  };

  // Upload receipt attachment inline for a specific row index
  const handleUploadReceipt = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    try {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      setUploadingRowIdx(index);
      const file = files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `receipts/${fileName}`;

      // Upload to Supabase Storage 'receipts' bucket
      const { error: uploadError } = await supabase.storage
        .from("receipts")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("receipts")
        .getPublicUrl(filePath);

      handleUpdateRow(index, "receipt_url", publicUrl);
    } catch (err: any) {
      alert("Tải lên biên lai thất bại: " + err.message);
    } finally {
      setUploadingRowIdx(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const reportPayload = {
      title,
      report_year: Number(reportYear),
      project_id: projectId || null,
      total_received: totalReceived,
      total_spent: totalSpent,
      public_note: publicNote,
      status,
      updated_at: new Date().toISOString(),
    };

    try {
      let activeReportId = reportId;

      if (reportId) {
        // Edit report record
        const { error } = await supabase
          .from("financial_reports")
          .update(reportPayload)
          .eq("id", reportId);
        if (error) throw error;
      } else {
        // Create report record
        const { data, error } = await supabase
          .from("financial_reports")
          .insert([reportPayload])
          .select()
          .single();
        if (error) throw error;
        activeReportId = data.id;
      }

      // Upsert / Delete itemized transactions
      const dbTxToUpsert = [];
      const dbTxToIdDelete = [];

      for (const tx of transactions) {
        if (tx._isDeleted) {
          if (tx.id) dbTxToIdDelete.push(tx.id);
        } else {
          dbTxToUpsert.push({
            id: tx.id || undefined, // undefined let Supabase generate UUID
            report_id: activeReportId,
            transaction_date: tx.date,
            transaction_type: tx.type,
            category: tx.category,
            amount: tx.amount,
            description: tx.description,
            receipt_url: tx.receipt_url || null,
          });
        }
      }

      // 1. Delete deleted transactions
      if (dbTxToIdDelete.length > 0) {
        const { error: delErr } = await supabase
          .from("financial_transactions")
          .delete()
          .in("id", dbTxToIdDelete);
        if (delErr) throw delErr;
      }

      // 2. Upsert remaining transactions
      if (dbTxToUpsert.length > 0) {
        const { error: upsertErr } = await supabase
          .from("financial_transactions")
          .upsert(dbTxToUpsert);
        if (upsertErr) throw upsertErr;
      }

      router.push("/admin/transparency");
      router.refresh();
    } catch (err: any) {
      alert("Lỗi khi lưu báo cáo quyết toán: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          href="/admin/transparency"
          className="p-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-xl text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {reportId ? "Chỉnh sửa báo cáo quyết toán" : "Lập báo cáo tài chính mới"}
          </h1>
          <p className="text-xs text-gray-500 mt-1">Cập nhật bảng thu chi chi tiết của dự án.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Summary Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase">Tổng thu dự toán</p>
            <p className="text-xl font-extrabold text-primary mt-1">
              {totalReceived.toLocaleString("vi-VN")}đ
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase">Tổng chi dự toán</p>
            <p className="text-xl font-extrabold text-accent mt-1">
              {totalSpent.toLocaleString("vi-VN")}đ
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase">Số dư cân đối</p>
            <p className="text-xl font-extrabold text-gray-900 mt-1">
              {balance.toLocaleString("vi-VN")}đ
            </p>
          </div>
        </div>

        {/* Report main settings */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700">Tiêu đề báo cáo quyết toán</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Quyết toán chiến dịch..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700">Liên kết tới dự án</label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm font-bold text-gray-700 bg-white"
            >
              <option value="">Không liên kết</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Năm</label>
              <input
                type="number"
                required
                value={reportYear}
                onChange={(e) => setReportYear(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm font-semibold"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Hiển thị</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm font-bold text-gray-700 bg-white"
              >
                <option value="draft">Bản nháp</option>
                <option value="published">Công khai</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-3 space-y-1.5">
            <label className="text-sm font-bold text-gray-700">Ghi chú phương án xử lý số dư hoặc lưu ý tài chính</label>
            <textarea
              rows={2}
              value={publicNote}
              onChange={(e) => setPublicNote(e.target.value)}
              placeholder="Ví dụ: Số dư còn lại được chuyển tiếp vào quỹ của dự án nước sạch..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm font-medium resize-none"
            />
          </div>
        </div>

        {/* Transactions Table Ledger */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-primary">Danh mục giao dịch thu chi</h3>
            <button
              type="button"
              onClick={handleAddTransactionRow}
              className="inline-flex items-center text-xs font-bold text-accent hover:text-accent-dark px-3 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 transition-colors"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Thêm dòng giao dịch
            </button>
          </div>

          <div className="overflow-x-auto border border-gray-100 rounded-2xl shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-36">Ngày</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-28">Loại</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-40">Danh mục</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-44">Số tiền (đ)</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Mô tả chi tiết</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-44">Biên lai / Chứng từ</th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider w-16">Xóa</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100 text-sm">
                {transactions.map((tx, idx) => {
                  if (tx._isDeleted) return null;
                  return (
                    <tr key={idx} className="hover:bg-gray-50/50">
                      {/* Date */}
                      <td className="px-3 py-3 whitespace-nowrap">
                        <input
                          type="date"
                          required
                          value={tx.date}
                          onChange={(e) => handleUpdateRow(idx, "date", e.target.value)}
                          className="px-2 py-1.5 rounded-lg border border-gray-200 focus:outline-none text-xs font-medium w-full"
                        />
                      </td>

                      {/* Type */}
                      <td className="px-3 py-3 whitespace-nowrap">
                        <select
                          value={tx.type}
                          onChange={(e) => handleUpdateRow(idx, "type", e.target.value)}
                          className="px-2 py-1.5 rounded-lg border border-gray-200 focus:outline-none text-xs font-bold text-gray-700 bg-white w-full"
                        >
                          <option value="income">Thu (+)</option>
                          <option value="expense">Chi (-)</option>
                        </select>
                      </td>

                      {/* Category */}
                      <td className="px-3 py-3 whitespace-nowrap">
                        <input
                          type="text"
                          required
                          value={tx.category}
                          onChange={(e) => handleUpdateRow(idx, "category", e.target.value)}
                          placeholder="Danh mục..."
                          className="px-2 py-1.5 rounded-lg border border-gray-200 focus:outline-none text-xs font-semibold w-full"
                        />
                      </td>

                      {/* Amount */}
                      <td className="px-3 py-3 whitespace-nowrap">
                        <input
                          type="number"
                          required
                          value={tx.amount === 0 ? "" : tx.amount}
                          onChange={(e) => handleUpdateRow(idx, "amount", e.target.value === "" ? 0 : Number(e.target.value))}
                          placeholder="Số tiền..."
                          className="px-2 py-1.5 rounded-lg border border-gray-200 focus:outline-none text-xs font-bold w-full"
                        />
                      </td>

                      {/* Description */}
                      <td className="px-3 py-3">
                        <input
                          type="text"
                          required
                          value={tx.description}
                          onChange={(e) => handleUpdateRow(idx, "description", e.target.value)}
                          placeholder="Ghi chú nội dung..."
                          className="px-2 py-1.5 rounded-lg border border-gray-200 focus:outline-none text-xs font-medium w-full"
                        />
                      </td>

                      {/* Receipt upload inline */}
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <label className="inline-flex items-center justify-center p-2 rounded-lg border border-gray-300 shadow-sm bg-white hover:bg-gray-50 cursor-pointer">
                            {uploadingRowIdx === idx ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-accent" />
                            ) : (
                              <Upload className="w-3.5 h-3.5 text-gray-500" />
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              disabled={uploadingRowIdx !== null}
                              onChange={(e) => handleUploadReceipt(e, idx)}
                              className="hidden"
                            />
                          </label>
                          {tx.receipt_url ? (
                            <a
                              href={tx.receipt_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary font-bold hover:underline max-w-[100px] truncate block"
                            >
                              Xem ảnh
                            </a>
                          ) : (
                            <span className="text-[10px] text-gray-400 font-semibold italic">Không chứng từ</span>
                          )}
                        </div>
                      </td>

                      {/* Delete */}
                      <td className="px-3 py-3 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleDeleteRow(idx)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-base font-bold text-white bg-accent hover:bg-accent-dark shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Đang lưu báo cáo...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Lưu báo cáo & Giao dịch
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function TransparencyForm() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    }>
      <TransparencyFormContent />
    </Suspense>
  );
}
