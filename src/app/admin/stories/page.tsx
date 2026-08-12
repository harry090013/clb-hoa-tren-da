"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Calendar, Loader2 } from "lucide-react";
import Link from "next/link";

interface Story {
  id: string;
  title: string;
  slug: string;
  author_name: string;
  story_type: string;
  status: string;
}

export default function AdminStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("stories")
      .select("id, title, slug, author_name, story_type, status")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading stories:", error);
    } else {
      setStories(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa câu chuyện này? Thao tác này không thể hoàn tác.")) return;

    const { error } = await supabase.from("stories").delete().eq("id", id);
    if (error) {
      alert("Xóa thất bại: " + error.message);
    } else {
      setStories(stories.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Quản Lý Câu Chuyện Hành Trình
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Danh sách các bài viết chia sẻ, nhật ký thực địa của tình nguyện viên.
          </p>
        </div>
        <Link
          href="/admin/stories/form"
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-bold text-white bg-accent hover:bg-accent-dark shadow transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Viết câu chuyện mới
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      ) : stories.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-500 font-medium shadow-sm">
          Chưa có bài viết nào được tạo. Nhấp vào nút "Viết câu chuyện mới" để bắt đầu.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Tiêu đề bài viết
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Tác giả
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Phân loại
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
                {stories.map((story) => (
                  <tr key={story.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {story.title}
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium">
                      {story.author_name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
                        {story.story_type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                        story.status === "published"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}>
                        {story.status === "published" ? "Xuất bản" : "Bản nháp"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/stories/form?id=${story.id}`}
                          className="p-2 text-gray-500 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(story.id)}
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
