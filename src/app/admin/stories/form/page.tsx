"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";

interface Project {
  id: string;
  title: string;
}

function StoryFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storyId = searchParams.get("id");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [status, setStatus] = useState("draft");
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    async function loadProjects() {
      const { data } = await supabase.from("projects").select("id, title");
      setProjects(data || []);
    }
    async function loadCategories() {
      const { data } = await supabase
        .from("story_categories")
        .select("id, name")
        .order("display_order", { ascending: true });
      setCategories(data || []);
    }
    loadProjects();
    loadCategories();
  }, []);

  useEffect(() => {
    if (!storyId) return;

    async function loadStory() {
      setFetching(true);
      const { data, error } = await supabase
        .from("stories")
        .select("*")
        .eq("id", storyId)
        .single();

      if (error) {
        alert("Không thể tải thông tin câu chuyện: " + error.message);
        router.push("/admin/stories");
      } else if (data) {
        setTitle(data.title);
        setSlug(data.slug);
        setExcerpt(data.excerpt || "");
        setContent(data.content || "");
        setCoverImage(data.cover_image || "");
        setAuthorName(data.author_name || "");
        setCategoryId(data.category_id || "");
        setProjectId(data.project_id || "");
        setStatus(data.status || "draft");
        setFeatured(data.featured || false);
      }
      setFetching(false);
    }
    loadStory();
  }, [storyId, router]);

  // Helper to slugify title
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
    setLoading(true);

    const selectedCategoryName = categories.find((c) => c.id === categoryId)?.name || "";

    const payload = {
      title,
      slug,
      excerpt,
      content,
      cover_image: coverImage,
      author_name: authorName,
      story_type: selectedCategoryName,
      category_id: categoryId || null,
      project_id: projectId || null,
      status,
      featured,
      updated_at: new Date().toISOString(),
    };

    try {
      if (storyId) {
        // Edit mode
        const { error } = await supabase
          .from("stories")
          .update(payload)
          .eq("id", storyId);
        if (error) throw error;
      } else {
        // Create mode
        const { error } = await supabase
          .from("stories")
          .insert([payload]);
        if (error) throw error;
      }

      router.push("/admin/stories");
      router.refresh();
    } catch (err: any) {
      alert("Lỗi khi lưu bài viết: " + err.message);
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
          href="/admin/stories"
          className="p-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-xl text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {storyId ? "Chỉnh sửa câu chuyện" : "Viết bài viết mới"}
          </h1>
          <p className="text-xs text-gray-500 mt-1">Cập nhật chia sẻ, cảm nghĩ thực tế của thành viên.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700">Tiêu đề bài viết</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!storyId) generateSlug(e.target.value);
              }}
              placeholder="Nhập tiêu đề..."
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
              placeholder="nhat-ky-vuot-deo-ha-giang"
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
              placeholder="Tóm tắt ngắn gọn bài viết..."
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
              placeholder="Nội dung nhật ký..."
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
                <label className="text-sm font-bold text-gray-700">Phân loại bài viết</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-bold text-gray-700 bg-white"
                >
                  <option value="">Chọn danh mục...</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Liên kết tới dự án</label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-bold text-gray-700 bg-white"
                >
                  <option value="">Không liên kết</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
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
                  Đặt làm bài viết tiêu biểu
                </label>
              </div>
            </div>

            {/* Cover image upload */}
            <ImageUpload value={coverImage} onChange={setCoverImage} />

            {/* Author */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Tên tác giả</label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Nguyễn Văn A (TN viên)"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm font-bold text-white bg-accent hover:bg-accent-dark shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Đang lưu bài viết...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Lưu bài viết
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function StoryForm() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    }>
      <StoryFormContent />
    </Suspense>
  );
}
