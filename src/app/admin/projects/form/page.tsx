"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Save, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";

function ProjectFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectStatus, setProjectStatus] = useState("fundraising");
  const [status, setStatus] = useState("draft");
  const [targetAmount, setTargetAmount] = useState<number | "">("");
  const [receivedAmount, setReceivedAmount] = useState<number | "">("");
  const [spentAmount, setSpentAmount] = useState<number | "">("");
  const [beneficiaryCount, setBeneficiaryCount] = useState<number | "">("");
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    if (!projectId) return;

    async function loadProject() {
      setFetching(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

      if (error) {
        alert("Không thể tải thông tin dự án: " + error.message);
        router.push("/admin/projects");
      } else if (data) {
        setTitle(data.title);
        setSlug(data.slug);
        setExcerpt(data.excerpt || "");
        setContent(data.content || "");
        setCoverImage(data.cover_image || "");
        setLocation(data.location || "");
        setStartDate(data.start_date || "");
        setEndDate(data.end_date || "");
        setProjectStatus(data.project_status || "upcoming");
        setStatus(data.status || "draft");
        setTargetAmount(data.target_amount ?? "");
        setReceivedAmount(data.received_amount ?? "");
        setSpentAmount(data.spent_amount ?? "");
        setBeneficiaryCount(data.beneficiary_count ?? "");
        setFeatured(data.featured || false);
      }
      setFetching(false);
    }
    loadProject();
  }, [projectId, router]);

  // Helper to slugify title
  const generateSlug = (text: string) => {
    const from = "àáäâèéëêìíïîòóöôùúüûñçđýỳỹỷỵăâđêôơư";
    const to = "aaaaeeeeiiiioooouuuuncdyyyyyaadさまざまなu"; // simplify mapping
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
    setLoading(true);

    const payload = {
      title,
      slug,
      excerpt,
      content,
      cover_image: coverImage,
      location,
      start_date: startDate || null,
      end_date: endDate || null,
      project_status: projectStatus,
      status,
      target_amount: targetAmount === "" ? null : Number(targetAmount),
      received_amount: receivedAmount === "" ? null : Number(receivedAmount),
      spent_amount: spentAmount === "" ? null : Number(spentAmount),
      beneficiary_count: beneficiaryCount === "" ? null : Number(beneficiaryCount),
      featured,
      updated_at: new Date().toISOString(),
    };

    try {
      if (projectId) {
        // Edit mode
        const { error } = await supabase
          .from("projects")
          .update(payload)
          .eq("id", projectId);
        if (error) throw error;
      } else {
        // Create mode
        const { error } = await supabase
          .from("projects")
          .insert([payload]);
        if (error) throw error;
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err: any) {
      alert("Lỗi khi lưu dữ án: " + err.message);
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
          href="/admin/projects"
          className="p-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-xl text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {projectId ? "Chỉnh sửa dự án" : "Tạo dự án mới"}
          </h1>
          <p className="text-xs text-gray-500 mt-1">Cập nhật thông tin chiến dịch gây quỹ vùng cao.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700">Tên dự án</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!projectId) generateSlug(e.target.value);
              }}
              placeholder="Nhập tên dự án..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium"
            />
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700">Đường dẫn thân thiện (Slug)</label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="ten-du-an-ha-giang"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium"
            />
          </div>

          {/* Excerpt */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700">Tóm tắt ngắn</label>
            <textarea
              rows={2}
              required
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Tóm tắt ngắn gọn mục đích chiến dịch..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium resize-none"
            />
          </div>

          {/* Content */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700">Nội dung chi tiết</label>
            <textarea
              rows={8}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Mô tả đầy đủ chi tiết mục đích, ý nghĩa, kế hoạch thực hiện..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium"
            />
          </div>
        </div>

        {/* Sidebar inputs */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            {/* Status & Options */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Trạng thái xuất bản</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-bold text-gray-700 bg-white"
                >
                  <option value="draft">Bản nháp</option>
                  <option value="published">Xuất bản</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Trạng thái dự án</label>
                <select
                  value={projectStatus}
                  onChange={(e) => setProjectStatus(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-bold text-gray-700 bg-white"
                >
                  <option value="upcoming">Sắp diễn ra</option>
                  <option value="fundraising">Đang gây quỹ</option>
                  <option value="completed">Đã hoàn thành</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4.5 h-4.5 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="featured" className="text-sm font-bold text-gray-700">
                  Đặt làm dự án tiêu biểu
                </label>
              </div>
            </div>

            {/* Cover image upload */}
            <ImageUpload value={coverImage} onChange={setCoverImage} />

            {/* Location & Dates */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Địa điểm</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Huyện Đồng Văn, Hà Giang"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-600">Ngày bắt đầu</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-xs font-medium bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-600">Ngày kết thúc</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-xs font-medium bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Finance target */}
            <div className="space-y-4 pt-2 border-t border-gray-100">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Mục tiêu (VNĐ)</label>
                <input
                  type="number"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="50000000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Đã nhận (VNĐ)</label>
                <input
                  type="number"
                  value={receivedAmount}
                  onChange={(e) => setReceivedAmount(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="1000000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Đã chi (VNĐ)</label>
                <input
                  type="number"
                  value={spentAmount}
                  onChange={(e) => setSpentAmount(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="0"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Số lượng người thụ hưởng</label>
                <input
                  type="number"
                  value={beneficiaryCount}
                  onChange={(e) => setBeneficiaryCount(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="300"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none text-sm font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm font-bold text-white bg-accent hover:bg-accent-dark shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Đang lưu dự án...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Lưu dự án
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function ProjectForm() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    }>
      <ProjectFormContent />
    </Suspense>
  );
}
