import { getProjects, getProjectBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import { MapPin, Calendar, CheckCircle } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projectsList = await getProjects();
  return projectsList.map((p) => ({
  }));
}

export const revalidate = 60;

export default async function ProjectDetail({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Link
          href="/du-an"
          className="inline-flex items-center text-sm font-bold text-accent hover:underline"
        >
          ← Trở lại danh sách dự án
        </Link>

        {/* Cover */}
        <div className="relative h-64 sm:h-96 rounded-3xl overflow-hidden bg-gray-200">
          <img
            src={project.coverImage}
            alt={project.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute top-4 right-4 bg-accent text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase">
            {project.projectStatus}
          </div>
        </div>

        {/* Title & Info */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary leading-tight">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-semibold border-y border-gray-100 py-4">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              <span>
                {project.startDate} đến {project.endDate}
              </span>
            </div>
          </div>
        </div>

        {/* Donation Progress */}
        {project.targetAmount && (
          <div className="bg-surface border border-gray-100 p-8 rounded-3xl space-y-4">
            <div className="flex justify-between items-center text-sm font-bold text-gray-700">
              <span>Tiến độ quyên góp:</span>
              <span className="text-accent text-lg">
                {((project.receivedAmount || 0) / project.targetAmount * 100).toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-accent h-3 rounded-full"
                style={{ width: `${((project.receivedAmount || 0) / project.targetAmount * 100)}%` }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 text-center pt-2">
              <div className="bg-white p-4 rounded-xl border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase">Mục tiêu dự án</p>
                <p className="text-lg font-bold text-primary mt-1">
                  {project.targetAmount.toLocaleString("vi-VN")}đ
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase">Đã tiếp nhận (Supabase)</p>
                <p className="text-lg font-bold text-accent mt-1">
                  {(project.receivedAmount || 0).toLocaleString("vi-VN")}đ
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="prose max-w-none text-gray-700 leading-relaxed font-sans space-y-6">
          {project.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="text-justify leading-relaxed">{paragraph}</p>
          ))}
        </div>

        {/* Donation CTA placeholder */}
        <div className="bg-primary/5 border border-primary/20 p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-primary flex items-center gap-1.5">
              <CheckCircle className="w-5 h-5 text-accent" />
              Đăng ký tham gia tình nguyện viên
            </h3>
            <p className="text-xs text-gray-600 max-w-md text-justify">
              Dự án đang thu hút rất nhiều sự quan tâm từ cộng đồng. Hãy đăng ký tham gia đóng góp công sức trực tiếp tại địa bàn.
            </p>
          </div>
          <Link
            href="/dong-hanh"
            className="w-full sm:w-auto text-center inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold text-white bg-accent hover:bg-accent-dark shadow transform hover:-translate-y-0.5 transition-all duration-150"
          >
            Đăng ký đồng hành
          </Link>
        </div>
      </div>
    </div>
  );
}
