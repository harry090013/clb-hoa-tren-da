import Link from "next/link";
import { Calendar, Sparkles } from "lucide-react";
import { getStories } from "@/lib/data";

export const revalidate = 60;

export const metadata = {
  title: "Hành trình yêu thương",
  description: "Các câu chuyện hành trình, nhật ký tình nguyện của CLB Hoa Trên Đá.",
};

export default async function Stories() {
  const storiesList = await getStories();

  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-primary bg-primary/10">
            <Sparkles className="w-3 h-3 text-accent" />
            Nhật ký thực tế
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
            Câu Chuyện Hành Trình
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            Đi để trải nghiệm, đi để sẻ chia. Cùng đọc lại những ghi chép đầy chân thực của các thành viên Hoa Trên Đá trên nẻo đường thiện nguyện.
          </p>
        </div>

        {/* Stories list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {storiesList.map((story) => (
            <div
              key={story.id}
              className="bg-surface rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row"
            >
              <div className="sm:w-1/3 relative h-48 sm:h-auto bg-gray-200">
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="sm:w-2/3 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-xs font-bold text-gray-500 gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>05/08/2026</span>
                    <span>•</span>
                    <span className="text-primary">{story.storyType}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 leading-snug">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 text-xs line-clamp-3">
                    {story.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs pt-2">
                  <span className="font-semibold text-gray-600">Bởi: {story.authorName}</span>
                  <Link
                    href={`/hanh-trinh/${story.slug}`}
                    className="font-bold text-accent hover:underline flex items-center gap-1"
                  >
                    Đọc tiếp →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
