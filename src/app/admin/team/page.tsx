"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Save, Loader2, X } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

interface TeamMember {
  id: string;
  full_name: string;
  role: string;
  department: string;
  bio: string;
  avatar_url: string;
  display_order: number;
  active: boolean;
}

export default function AdminTeam() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Editor Modal states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [active, setActive] = useState(true);

  const fetchMembers = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("team_members")
      .select("*")
      .order("display_order", { ascending: true });
    setMembers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFullName("");
    setRole("");
    setDepartment("Ban Điều Hành");
    setBio("");
    setAvatarUrl("");
    setDisplayOrder(members.length + 1);
    setActive(true);
    setShowModal(true);
  };

  const handleOpenEdit = (m: TeamMember) => {
    setEditingId(m.id);
    setFullName(m.full_name);
    setRole(m.role || "");
    setDepartment(m.department || "");
    setBio(m.bio || "");
    setAvatarUrl(m.avatar_url || "");
    setDisplayOrder(m.display_order);
    setActive(m.active);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      full_name: fullName,
      role,
      department,
      bio,
      avatar_url: avatarUrl,
      display_order: Number(displayOrder),
      active,
      updated_at: new Date().toISOString(),
    };

    try {
      if (editingId) {
        // Edit mode
        const { error } = await supabase
          .from("team_members")
          .update(payload)
          .eq("id", editingId);
        if (error) throw error;
      } else {
        // Add mode
        const { error } = await supabase
          .from("team_members")
          .insert([payload]);
        if (error) throw error;
      }

      setShowModal(false);
      fetchMembers();
    } catch (err: any) {
      alert("Lỗi khi lưu: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa thành viên này? Thao tác này không thể hoàn tác.")) return;

    const { error } = await supabase.from("team_members").delete().eq("id", id);
    if (error) {
      alert("Xóa thất bại: " + error.message);
    } else {
      setMembers(members.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Quản Lý Nhân Sự / Ban Điều Hành
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Danh sách nhân sự hiển thị trên trang Giới thiệu.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-bold text-white bg-accent hover:bg-accent-dark shadow transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm thành viên mới
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      ) : members.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-500 font-medium shadow-sm">
          Chưa có thành viên nào được thêm. Nhấp vào nút "Thêm thành viên mới" để bắt đầu.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className={`bg-white border rounded-2xl p-6 text-center space-y-4 shadow-sm flex flex-col items-center justify-between relative ${
                !member.active ? "opacity-60 border-dashed border-gray-300" : "border-gray-100"
              }`}
            >
              <div className="absolute top-4 right-4 flex gap-1">
                <button
                  onClick={() => handleOpenEdit(member)}
                  className="p-1.5 text-gray-400 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 border-2 border-primary">
                {member.avatar_url ? (
                  <img src={member.avatar_url} alt={member.full_name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                    {member.full_name[0]}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-gray-900">{member.full_name}</h3>
                <p className="text-xs font-bold text-accent uppercase tracking-wider">{member.role}</p>
                <p className="text-xs text-gray-500">{member.department} • Thứ tự: {member.display_order}</p>
              </div>
              <p className="text-gray-600 text-xs italic leading-relaxed max-w-xs px-2 line-clamp-3">
                "{member.bio || "Không có tiểu sử..."}"
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 relative shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-gray-900">
              {editingId ? "Sửa thành viên" : "Thêm thành viên mới"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Họ và tên</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Lê Văn A"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Chức vụ</label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Trưởng Ban..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Phòng ban</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm font-bold text-gray-700 bg-white"
                  >
                    <option value="Ban Điều Hành">Ban Điều Hành</option>
                    <option value="Ban Truyền Thông">Ban Truyền Thông</option>
                    <option value="Ban Đối Ngoại">Ban Đối Ngoại</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Tiểu sử tóm tắt</label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tiểu sử tóm tắt cảm nghĩ/kinh nghiệm..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm font-medium resize-none"
                />
              </div>

              <ImageUpload value={avatarUrl} onChange={setAvatarUrl} label="Ảnh đại diện" />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Thứ tự hiển thị</label>
                  <input
                    type="number"
                    required
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                    placeholder="1"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm font-medium"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="active"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="active" className="text-xs font-bold text-gray-700">
                    Hiển thị trên web
                  </label>
                </div>
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
                    Lưu thành viên
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
