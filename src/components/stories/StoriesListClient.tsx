"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Calendar, Clock, ArrowRight, Sparkles, X } from "lucide-react";
import { Story } from "@/types";

interface StoriesListClientProps {
  stories: Story[];
  initialCategory?: string;
}

export default function StoriesListClient({
  stories,
  initialCategory,
}: StoriesListClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || "all"
  );

  // Extract unique categories from stories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    stories.forEach((s) => {
      if (s.storyType) cats.add(s.storyType.trim());
    });
    return Array.from(cats);
  }, [stories]);

  // Calculate approximate reading time
  const getReadingTime = (content: string) => {
    if (!content) return 3;
    const words = content.trim().split(/\s+/).length;
    return Math.max(3, Math.ceil(words / 180));
  };

  // Format date helper
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "05 thg 8, 2026";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "05 thg 8, 2026";
      return `${d.getDate()} thg ${d.getMonth() + 1}, ${d.getFullYear()}`;
    } catch {
      return "05 thg 8, 2026";
    }
  };

  // Filter stories based on search term & category
  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const matchesCategory =
        selectedCategory === "all" ||
        story.storyType?.toLowerCase() === selectedCategory.toLowerCase();

      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        story.title.toLowerCase().includes(term) ||
        story.excerpt.toLowerCase().includes(term) ||
        story.authorName.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [stories, selectedCategory, searchTerm]);

  return (
    <div className="flex flex-col gap-10">
      {/* Header Intro Area */}
      <div className="text-left max-w-3xl flex flex-col gap-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3.5 py-1.5 rounded-full w-fit">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          Góc chia sẻ & cảm xúc
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Hành Trình Hoa Trên Đá
        </h1>
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-medium">
          Nơi lưu giữ những câu chuyện chân thực, nhật ký thực địa và bài học sâu sắc từ các chuyến thiện nguyện trên nẻo đường vùng cao của các thành viên Hoa Trên Đá.
        </p>
      </div>

      {/* Search & Filter Control Box */}
      <div className="flex flex-col gap-5 bg-surface p-5 sm:p-6 rounded-2xl border border-gray-200/70 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Tìm kiếm chia sẻ, tác giả..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-gray-400 font-medium"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider hidden md:block">
            Sắp xếp theo mới nhất ({filteredStories.length} bài viết)
          </span>
        </div>

        {/* Category Pills */}
        <div className="flex flex-col gap-2.5 border-t border-gray-200/60 pt-4">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
            Lọc theo chủ đề:
          </span>
          <div className="flex flex-wrap gap-2.5 w-full">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`text-xs font-semibold py-2 px-4 rounded-xl transition-all cursor-pointer text-center ${
                selectedCategory === "all"
                  ? "bg-primary text-white shadow-sm font-bold"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-primary/40 hover:text-primary"
              }`}
            >
              Tất cả
            </button>
            {categories.map((cat) => {
              const isSelected =
                selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-semibold py-2 px-4 rounded-xl transition-all cursor-pointer text-center ${
                    isSelected
                      ? "bg-primary text-white shadow-sm font-bold"
                      : "bg-white border border-gray-200 text-gray-700 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      {filteredStories.length === 0 ? (
        <div className="text-center py-16 bg-surface rounded-3xl border border-dashed border-gray-200 space-y-4">
          <p className="text-gray-500 font-medium">
            Không tìm thấy bài viết nào phù hợp với từ khóa &quot;{searchTerm}&quot;
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
            className="text-xs font-bold text-primary underline cursor-pointer"
          >
            Xóa bộ lọc & xem tất cả
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => {
            const readTime = getReadingTime(story.content);
            const dateDisplay = formatDate(story.publishedAt || story.createdAt);

            return (
              <article
                key={story.id}
                className="flex flex-col rounded-2xl overflow-hidden border border-gray-200/70 bg-white hover:border-primary/40 hover:shadow-lg transition-all duration-300 group"
              >
                {/* Image container */}
                <Link
                  href={`/hanh-trinh/${story.slug}`}
                  className="relative h-52 w-full overflow-hidden block cursor-pointer bg-gray-100"
                >
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  {story.storyType && (
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-primary border border-primary/10 shadow-xs uppercase tracking-wider">
                      {story.storyType}
                    </div>
                  )}
                </Link>

                {/* Content body */}
                <div className="flex flex-col gap-3 p-5 flex-1 justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3.5 text-gray-400 text-[11px] font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {dateDisplay}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {readTime} phút đọc
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      <Link href={`/hanh-trinh/${story.slug}`}>
                        {story.title}
                      </Link>
                    </h3>

                    <p className="text-gray-600 text-xs leading-relaxed line-clamp-3 text-justify">
                      {story.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-gray-500">
                      Bởi: {story.authorName}
                    </span>
                    <Link
                      href={`/hanh-trinh/${story.slug}`}
                      className="text-xs font-bold text-primary tracking-wider uppercase flex items-center gap-1 cursor-pointer group-hover:text-primary-dark"
                    >
                      Đọc bài viết
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
