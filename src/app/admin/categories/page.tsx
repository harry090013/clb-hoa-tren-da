"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Save, Loader2, X } from "lucide-react";

interface StoryCategory {
  id: string;
  name: string;
  slug: string;
  display_order: number;
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<StoryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Modal editor states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [displayOrder, setDisplayOrder] = useState<number>(0);

  const fetchCategories = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("story_categories")
      .select("*")
      .order("display_order", { ascending: true });
    setCategories(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setName("");
    setSlug("");
    setDisplayOrder(categories.length + 1);
    setShowModal(true);
  };

  const handleOpenEdit = (cat: StoryCategory) => {
    setEditingId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setDisplayOrder(cat.display_order);
    setShowModal(true);
  };

  // Helper to slugify name
  const generateSlug = (text: string) => {
    let slugified = text.toLowerCase();
    
    // Map Vietnamese characters
    slugified = slugified
      .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
      .replace(/[èéẹẻẽêềếệểễ]/g, "e")
      .replace(/[ìíịỉĩ]/g, "i")
      .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
      .replace(/[ùúụủũưừứựửữ]/g, "u")
      .replace(/[ỳýỵỷỹ]/g, "y")
      .replace(/đ/g, "d");

    slugified = slugified
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    setSlug(slugified);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      name,
      slug,
      display_order: Number(displayOrder),
    };

    try {
      if (editingId) {
        // Edit mode
        const { error } = await supabase
          .from("story_categories")
          .update(payload)
          .eq("id", editingId);
        if (error) throw error;
      } else {
        // Add mode
        const { error } = await supabase
          .from("story_categories")
          .insert([payload]);
        if (error) throw error;
      }

      setShowModal(false);
      fetchCategories();
    } catch (err: any) {
      alert("Lỗi khi lưu danh mục: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa danh mục này? Các bài viết liên kết sẽ bị hủy phân loại. Thao tác này không thể hoàn tác.")) return;

    const { error } = await supabase.from("story_categories").delete().eq("id", id);
    if (error) {
      alert("Xóa thất bại: " + error.message);
    } else {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Quản Lý Danh Mục Bài Viết
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Thiết lập danh mục phân loại cho các câu chuyện hành trình và tin tức hoạt động.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-bold text-white bg-accent hover:bg-accent-dark shadow transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm danh mục mới
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-500 font-medium shadow-sm">
          Chưa có danh mục nào được lập. Nhấp vào nút "Thêm danh mục mới" để bắt đầu.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Tên danh mục
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Đường dẫn (Slug)
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Thứ tự hiển thị
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100 text-sm">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {cat.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium">
                      {cat.slug}
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-semibold">
                      Thứ tự: {cat.display_order}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(cat)}
                          className="p-2 text-gray-500 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
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

      {/* Editor Modal */}
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
              {editingId ? "Sửa danh mục" : "Thêm danh mục mới"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Tên danh mục</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!editingId) generateSlug(e.target.value);
                  }}
                  placeholder="Ví dụ: Kêu gọi khẩn cấp..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Đường dẫn (Slug)</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="keu-goi-khan-cap"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm font-medium"
                />
              </div>

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
                    Lưu danh mục
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
