"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Save, Loader2, X, Link as LinkIcon } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
  description?: string;
  partner_type: string;
  display_order: number;
  active: boolean;
}

export default function AdminPartners() {
  const [partnersList, setPartnersList] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Editor Modal states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [description, setDescription] = useState("");
  const [partnerType, setPartnerType] = useState("");
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [active, setActive] = useState(true);

  const fetchPartners = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("partners")
      .select("*")
      .order("display_order", { ascending: true });
    setPartnersList(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setName("");
    setLogoUrl("");
    setWebsiteUrl("");
    setDescription("");
    setPartnerType("Quỹ đầu tư cộng đồng");
    setDisplayOrder(partnersList.length + 1);
    setActive(true);
    setShowModal(true);
  };

  const handleOpenEdit = (p: Partner) => {
    setEditingId(p.id);
    setName(p.name);
    setLogoUrl(p.logo_url || "");
    setWebsiteUrl(p.website_url || "");
    setDescription(p.description || "");
    setPartnerType(p.partner_type || "");
    setDisplayOrder(p.display_order);
    setActive(p.active);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      name,
      logo_url: logoUrl,
      website_url: websiteUrl || null,
      description: description || null,
      partner_type: partnerType,
      display_order: Number(displayOrder),
      active,
      updated_at: new Date().toISOString(),
    };

    try {
      if (editingId) {
        // Edit mode
        const { error } = await supabase
          .from("partners")
          .update(payload)
          .eq("id", editingId);
        if (error) throw error;
      } else {
        // Add mode
        const { error } = await supabase
          .from("partners")
          .insert([payload]);
        if (error) throw error;
      }

      setShowModal(false);
      fetchPartners();
    } catch (err: any) {
      alert("Lỗi khi lưu đối tác: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa đối tác này? Thao tác này không thể hoàn tác.")) return;

    const { error } = await supabase.from("partners").delete().eq("id", id);
    if (error) {
      alert("Xóa thất bại: " + error.message);
    } else {
      setPartnersList(partnersList.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Quản Lý Đối Tác Liên Kết
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Danh sách đối tác đồng hành hiển thị ở cuối Trang chủ.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-bold text-white bg-accent hover:bg-accent-dark shadow transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm đối tác mới
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      ) : partnersList.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-500 font-medium shadow-sm">
          Chưa có đối tác nào được thêm. Nhấp vào nút "Thêm đối tác mới" để bắt đầu.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partnersList.map((partner) => (
            <div
              key={partner.id}
              className={`bg-white border rounded-2xl p-6 text-center space-y-4 shadow-sm flex flex-col items-center justify-between relative ${
                !partner.active ? "opacity-60 border-dashed border-gray-300" : "border-gray-100"
              }`}
            >
              <div className="absolute top-4 right-4 flex gap-1">
                <button
                  onClick={() => handleOpenEdit(partner)}
                  className="p-1.5 text-gray-400 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(partner.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="w-24 h-16 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center border border-gray-200 p-2">
                {partner.logo_url ? (
                  <img src={partner.logo_url} alt={partner.name} className="max-h-full max-w-full object-contain" />
                ) : (
                  <div className="text-gray-400 font-bold text-xs uppercase text-center">No Logo</div>
                )}
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-gray-900">{partner.name}</h3>
                <p className="text-xs font-bold text-accent uppercase tracking-wider">{partner.partner_type}</p>
                <p className="text-xs text-gray-500">Thứ tự hiển thị: {partner.display_order}</p>
              </div>

              {partner.website_url && (
                <a
                  href={partner.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-bold text-primary hover:underline gap-1 pt-1"
                >
                  <LinkIcon className="w-3.5 h-3.5" /> Trang web liên kết
                </a>
              )}
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
              {editingId ? "Sửa đối tác" : "Thêm đối tác mới"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Tên đối tác</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Công ty Cổ phần..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Phân loại đối tác</label>
                <input
                  type="text"
                  required
                  value={partnerType}
                  onChange={(e) => setPartnerType(e.target.value)}
                  placeholder="Nhà tài trợ hiện vật, Quỹ từ thiện..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Liên kết website (tùy chọn)</label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-sm font-medium"
                />
              </div>

              <ImageUpload value={logoUrl} onChange={setLogoUrl} label="Logo đối tác" />

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
                    Lưu đối tác
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
