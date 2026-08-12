"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Mail, Phone, Calendar, User, Clipboard, Save, X, Loader2, Edit } from "lucide-react";

interface VolunteerApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  motivation: string;
  status: "new" | "contacted" | "accepted" | "rejected" | "inactive";
  internal_note: string;
  created_at: string;
}

export default function AdminVolunteers() {
  const [apps, setApps] = useState<VolunteerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Filter state
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Modal Review states
  const [selectedApp, setSelectedApp] = useState<VolunteerApplication | null>(null);
  const [status, setStatus] = useState<string>("new");
  const [internalNote, setInternalNote] = useState<string>("");

  const fetchApps = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("volunteer_applications")
      .select("*")
      .order("created_at", { ascending: false });
    setApps(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleOpenReview = (app: VolunteerApplication) => {
    setSelectedApp(app);
    setStatus(app.status);
    setInternalNote(app.internal_note || "");
  };

  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("volunteer_applications")
        .update({
          status,
          internal_note: internalNote,
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedApp.id);

      if (error) throw error;

      setSelectedApp(null);
      fetchApps();
    } catch (err: any) {
      alert("Lỗi khi lưu phản hồi: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredApps = apps.filter((app) => statusFilter === "all" || app.status === statusFilter);

  const statusColors = {
    new: "bg-blue-50 text-blue-700",
    contacted: "bg-yellow-50 text-yellow-700",
    accepted: "bg-green-50 text-green-700",
    rejected: "bg-red-50 text-red-700",
    inactive: "bg-gray-100 text-gray-500",
  };

  const statusLabels = {
    new: "Mới nộp",
    contacted: "Đã liên hệ",
    accepted: "Đã duyệt",
    rejected: "Từ chối",
    inactive: "Không hoạt động",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Đơn Đăng Ký Tình Nguyện Viên
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Xem hồ sơ, động lực và duyệt danh sách tình nguyện viên gia nhập CLB.
          </p>
        </div>

        {/* Filter dropdown */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm font-bold text-gray-700 bg-white"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="new">Mới nộp</option>
          <option value="contacted">Đã liên hệ</option>
          <option value="accepted">Đã duyệt</option>
          <option value="rejected">Từ chối</option>
          <option value="inactive">Không hoạt động</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      ) : filteredApps.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-500 font-medium shadow-sm">
          Không tìm thấy đơn đăng ký nào.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${statusColors[app.status]}`}>
                    {statusLabels[app.status]}
                  </span>
                  <button
                    onClick={() => handleOpenReview(app)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
                  >
                    <Edit className="w-3.5 h-3.5" /> Xem chi tiết & Duyệt
                  </button>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-1.5">
                    <User className="w-4.5 h-4.5 text-primary" /> {app.full_name}
                  </h3>
                  <div className="flex flex-col text-xs text-gray-500 space-y-1 font-medium">
                    <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {app.phone}</span>
                    <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {app.email}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Nộp ngày: {new Date(app.created_at).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs text-gray-600 leading-relaxed line-clamp-3">
                  <strong className="text-gray-700 block mb-1">Động lực:</strong>
                  {app.motivation}
                </div>
              </div>

              {app.internal_note && (
                <div className="border-t border-gray-100 pt-3 text-xs text-gray-500 italic">
                  <strong>Ghi chú nội bộ:</strong> {app.internal_note}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Clipboard className="w-5.5 h-5.5 text-primary" /> Duyệt hồ sơ tình nguyện viên
            </h2>

            <div className="space-y-4 text-sm text-gray-700 border-b border-gray-100 pb-4">
              <p><strong>Họ tên:</strong> {selectedApp.full_name}</p>
              <p><strong>Điện thoại:</strong> {selectedApp.phone}</p>
              <p><strong>Email:</strong> {selectedApp.email}</p>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs leading-relaxed max-h-40 overflow-y-auto">
                <strong className="block text-gray-700 mb-1">Động lực đăng ký:</strong>
                {selectedApp.motivation}
              </div>
            </div>

            <form onSubmit={handleSaveReview} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Cập nhật trạng thái duyệt</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm font-bold text-gray-700 bg-white"
                >
                  <option value="new">Mới nộp</option>
                  <option value="contacted">Đã liên hệ phỏng vấn</option>
                  <option value="accepted">Đồng ý phê duyệt</option>
                  <option value="rejected">Từ chối hồ sơ</option>
                  <option value="inactive">Không hoạt động</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Ghi chú nội bộ (không công khai)</label>
                <textarea
                  rows={3}
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                  placeholder="Ghi chú đánh giá phỏng vấn, liên hệ hoặc phân bổ công việc..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm font-medium resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm font-bold text-white bg-accent hover:bg-accent-dark shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Cập nhật phê duyệt
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
