import Link from "next/link";
import { MapPin, Sparkles } from "lucide-react";
import { getProjects } from "@/lib/data";

export const revalidate = 60;

export const metadata = {
  title: "Dự án thiện nguyện",
  description: "Danh sách các dự án thiện nguyện đang và đã được triển khai bởi Hoa Trên Đá.",
};

export default async function Projects() {
  const projectsList = await getProjects();

  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-primary bg-primary/10">
            <Sparkles className="w-3 h-3 text-accent" />
            Chiến dịch vì cộng đồng
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
            Các Dự Án Thiện Nguyện
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            Thông tin đầy đủ về các dự án kêu gọi quyên góp và các chương trình hỗ trợ cộng đồng của câu lạc bộ Hoa Trên Đá.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsList.map((project) => (
            <div
              key={project.id}
              className="bg-surface rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full"
            >
              <div className="relative h-48 w-full bg-gray-200">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="object-cover w-full h-full"
                />
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider ${
                  project.projectStatus === "fundraising"
                    ? "bg-accent"
                    : project.projectStatus === "completed"
                    ? "bg-primary"
                    : "bg-gray-500"
                }`}>
                  {project.projectStatus === "fundraising"
                    ? "Gây quỹ"
                    : project.projectStatus === "completed"
                    ? "Hoàn thành"
                    : "Chuẩn bị"}
                </span>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-xs font-bold text-gray-500 gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {project.location}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {project.excerpt}
                  </p>
                </div>

                {project.targetAmount && (
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs font-bold text-gray-600">
                      <span>Tiến độ:</span>
                      <span>
                        {((project.receivedAmount || 0) / project.targetAmount * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-accent h-2 rounded-full"
                        style={{ width: `${((project.receivedAmount || 0) / project.targetAmount * 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 font-medium">
                      <span>Mục tiêu: {project.targetAmount.toLocaleString("vi-VN")}đ</span>
                      <span className="font-bold text-accent">Supabase Data</span>
                    </div>
                  </div>
                )}

                <Link
                  href={`/du-an/${project.slug}`}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-bold text-primary border border-primary/20 bg-white hover:bg-primary hover:text-white transition-colors duration-150 mt-4"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
