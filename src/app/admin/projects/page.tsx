"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, MapPin, Loader2 } from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  slug: string;
  location: string;
  project_status: string;
  status: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("id, title, slug, location, project_status, status")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading projects:", error);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa dự án này? Thao tác này không thể hoàn tác.")) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      alert("Xóa thất bại: " + error.message);
    } else {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Quản Lý Dự Án
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Danh sách toàn bộ các chiến dịch và dự án thiện nguyện.
          </p>
        </div>
        <Link
          href="/admin/projects/form"
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-bold text-white bg-accent hover:bg-accent-dark shadow transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm dự án mới
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-500 font-medium shadow-sm">
          Chưa có dự án nào được tạo. Nhấp vào nút "Thêm dự án mới" để bắt đầu.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Tên dự án
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Địa điểm
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Trạng thái hoạt động
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
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {project.title}
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        {project.location}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                        project.project_status === "fundraising"
                          ? "bg-accent/10 text-accent-dark"
                          : project.project_status === "completed"
                          ? "bg-green-50 text-primary"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {project.project_status === "fundraising"
                          ? "Đang gây quỹ"
                          : project.project_status === "completed"
                          ? "Đã hoàn thành"
                          : "Sắp triển khai"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                        project.status === "published"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}>
                        {project.status === "published" ? "Xuất bản" : "Bản nháp"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/projects/form?id=${project.id}`}
                          className="p-2 text-gray-500 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(project.id)}
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
