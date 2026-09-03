"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Bookmark,
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Link as LinkIcon,
  MessageSquare,
  Send,
  User,
  Check,
  Eye,
} from "lucide-react";
import { Story } from "@/types";
import RichTextRenderer from "@/components/layout/RichTextRenderer";

interface StoryDetailClientProps {
  story: Story;
  relatedStories: Story[];
}

interface CommentItem {
  id: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export default function StoryDetailClient({
  story,
  relatedStories,
}: StoryDetailClientProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [likes, setLikes] = useState(24);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [views, setViews] = useState(128);
  const [copied, setCopied] = useState(false);

  // Comments state
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  // Reading progress listener
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const progress = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load local likes & views
  useEffect(() => {
    try {
      const storedLikes = localStorage.getItem(`story_likes_${story.id}`);
      const storedHasLiked = localStorage.getItem(`story_liked_${story.id}`);
      const storedViews = localStorage.getItem(`story_views_${story.id}`);

      if (storedLikes) setLikes(parseInt(storedLikes, 10));
      if (storedHasLiked === "true") setHasLiked(true);

      const nextViews = storedViews ? parseInt(storedViews, 10) + 1 : 128 + Math.floor(Math.random() * 50);
      setViews(nextViews);
      localStorage.setItem(`story_views_${story.id}`, nextViews.toString());

      // Load comments
      const storedComments = localStorage.getItem(`story_comments_${story.id}`);
      if (storedComments) {
        setComments(JSON.parse(storedComments));
      }
    } catch {
      // Ignore storage errors
    }
  }, [story.id]);

  // Handle like toggle
  const handleLike = () => {
    if (hasLiked) {
      const updated = likes - 1;
      setLikes(updated);
      setHasLiked(false);
      localStorage.setItem(`story_liked_${story.id}`, "false");
      localStorage.setItem(`story_likes_${story.id}`, updated.toString());
    } else {
      const updated = likes + 1;
      setLikes(updated);
      setHasLiked(true);
      if (hasDisliked) setHasDisliked(false);
      localStorage.setItem(`story_liked_${story.id}`, "true");
      localStorage.setItem(`story_likes_${story.id}`, updated.toString());
    }
  };

  const handleDislike = () => {
    setHasDisliked(!hasDisliked);
    if (!hasDisliked && hasLiked) {
      setHasLiked(false);
      setLikes((prev) => prev - 1);
    }
  };

  // Handle copy link
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Handle comment submit
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentContent.trim()) return;

    const newComment: CommentItem = {
      id: Date.now().toString(),
      authorName: commentName.trim(),
      content: commentContent.trim(),
      createdAt: new Date().toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    try {
      localStorage.setItem(
        `story_comments_${story.id}`,
        JSON.stringify(updated)
      );
    } catch {}

    setCommentContent("");
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 4000);
  };

  // Calculate approximate reading time
  const readingTime = useMemo(() => {
    if (!story.content) return 3;
    const words = story.content.trim().split(/\s+/).length;
    return Math.max(3, Math.ceil(words / 180));
  }, [story.content]);

  // Format date helper
  const dateFormatted = useMemo(() => {
    const raw = story.publishedAt || story.createdAt;
    if (!raw) return "05 tháng 8, 2026";
    try {
      const d = new Date(raw);
      return `${d.getDate()} tháng ${d.getMonth() + 1}, ${d.getFullYear()}`;
    } catch {
      return "05 tháng 8, 2026";
    }
  }, [story.publishedAt, story.createdAt]);

  // Author information mapping
  const authorInfo = useMemo(() => {
    const name = story.authorName || "Hoa Trên Đá";
    if (name.includes("Lộc")) {
      return {
        name: "Đoàn Xuân Lộc",
        role: "Trưởng Ban Điều Hành CLB Hoa Trên Đá",
        avatar: "/images/bdh_xuanloc.webp",
        bio: "Người sáng lập và định hướng các hoạt động thiện nguyện bền bỉ của CLB Hoa Trên Đá. Tin rằng từ những nơi cằn cỗi nhất, hoa vẫn sẽ nở nếu có đủ yêu thương và trách nhiệm.",
      };
    }
    if (name.includes("Đức")) {
      return {
        name: "Phạm Minh Đức",
        role: "Phó Ban Điều Hành CLB Hoa Trên Đá",
        avatar: "/images/bdh_minhduc.webp",
        bio: "Phụ trách đối ngoại, dẫn chương trình và kết nối các tấm lòng hảo tâm đồng hành cùng các chiến dịch của CLB.",
      };
    }
    if (name.includes("Tuấn")) {
      return {
        name: "Nguyễn Khánh Tuấn",
        role: "Trưởng Ban Hậu Cần CLB Hoa Trên Đá",
        avatar: "/images/bdh_khanhtuan.webp",
        bio: "Phụ trách quản lý trang thiết bị, hậu cần thực địa và đảm bảo từng phần quà đến đúng nơi, đúng đối tượng.",
      };
    }
    if (name.includes("Hiếu") || name.includes("Harry")) {
      return {
        name: "Nguyễn Quang Hiếu (Harry)",
        role: "Trưởng Ban Truyền Thông CLB Hoa Trên Đá",
        avatar: "/images/bdh_quanghieu.webp",
        bio: "Phụ trách ghi lại những hình ảnh chân thực, câu chuyện nhân văn trên từng cung đường và lan tỏa tinh thần 'Từ đá nở hoa, từ tâm lan tỏa'.",
      };
    }
    return {
      name: "Ban Điều Hành Hoa Trên Đá",
      role: "Tập thể Tình nguyện viên Hoa Trên Đá",
      avatar: "/images/bdh_xuanloc.webp",
      bio: "Đại diện tập thể những con người sẵn lòng đóng góp sức trẻ, thời gian và sự tử tế cho các dự án thiện nguyện vùng cao.",
    };
  }, [story.authorName]);

  return (
    <>
      {/* 1. Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-primary/15 z-50 pointer-events-none">
        <div
          className="h-full bg-primary rounded-r-full shadow-[0_0_8px_rgba(47,107,47,0.6)] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. Floating Action Bar (Sticky on Desktop) */}
      <div className="relative max-w-3xl mx-auto">
        <div className="relative w-full">
          <div className="hidden lg:block absolute -left-20 top-24 h-full">
            <div className="sticky top-28 flex flex-col items-center gap-4 p-2.5 bg-white/90 backdrop-blur-md rounded-full border border-gray-200/80 shadow-md z-30">
              {/* Like */}
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={handleLike}
                  className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all cursor-pointer active:scale-95 ${
                    hasLiked
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-gray-200 text-gray-600 hover:text-accent hover:border-accent/40 hover:bg-accent/5"
                  }`}
                  title="Thích bài viết"
                >
                  <ThumbsUp className="w-4.5 h-4.5" />
                </button>
                <span className="text-[10px] font-bold text-gray-500">
                  {likes}
                </span>
              </div>

              {/* Dislike */}
              <button
                onClick={handleDislike}
                className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all cursor-pointer active:scale-95 ${
                  hasDisliked
                    ? "border-gray-400 bg-gray-100 text-gray-800"
                    : "border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
                title="Không thích bài viết"
              >
                <ThumbsDown className="w-4.5 h-4.5" />
              </button>

              <hr className="w-6 border-gray-200 my-0.5" />

              {/* Share */}
              <button
                onClick={handleCopyLink}
                className="w-11 h-11 rounded-full flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-primary/10 hover:text-primary transition-all cursor-pointer active:scale-95"
                title="Sao chép liên kết"
              >
                {copied ? (
                  <Check className="w-4.5 h-4.5 text-primary" />
                ) : (
                  <Share2 className="w-4.5 h-4.5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Bottom Floating Bar */}
          <div className="lg:hidden fixed bottom-0 left-0 w-full z-40 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-xl px-6 py-3 flex justify-around items-center">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border transition-all active:scale-95 ${
                hasLiked
                  ? "border-accent bg-accent/10 text-accent font-bold"
                  : "border-gray-200 text-gray-600 bg-gray-50 hover:text-accent"
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span className="text-xs font-bold">{likes}</span>
            </button>
            <button
              onClick={handleDislike}
              className="p-2 rounded-xl border border-gray-200 text-gray-600 bg-gray-50 active:scale-95"
              title="Không thích"
            >
              <ThumbsDown className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 bg-gray-50 active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-primary">Đã chép</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span className="text-xs font-bold">Chia sẻ</span>
                </>
              )}
            </button>
          </div>

          {/* 3. Main Article Body */}
          <article className="px-4 sm:px-6 lg:px-8 py-10 md:py-16 flex flex-col gap-8">
            {/* Breadcrumb row */}
            <div className="flex justify-between items-center">
              <Link
                href="/hanh-trinh"
                className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-primary uppercase tracking-widest transition-colors cursor-pointer w-fit"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Góc chia sẻ
              </Link>
              {story.storyType && (
                <Link
                  href="/hanh-trinh"
                  className="text-xs font-bold text-primary bg-primary/10 border border-primary/15 rounded-lg px-3 py-1 cursor-pointer hover:bg-primary hover:text-white transition-all uppercase tracking-wider"
                >
                  {story.storyType}
                </Link>
              )}
            </div>

            {/* Article Title & Meta */}
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                {story.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-500 text-xs font-medium border-b border-gray-100 pb-6">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {dateFormatted}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {readingTime} phút đọc
                </span>
                <span className="flex items-center gap-1.5 text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded-md">
                  <Bookmark className="w-3.5 h-3.5" />
                  Tác giả: {authorInfo.name}
                </span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden border border-gray-100 shadow-lg bg-gray-100">
              <img
                src={story.coverImage}
                alt={story.title}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Rich Content */}
            <div className="mt-4">
              <RichTextRenderer content={story.content} />
            </div>

            {/* 4. Author Box */}
            <div className="flex flex-col sm:flex-row gap-5 p-6 rounded-2xl border border-gray-200/80 bg-surface items-center sm:items-start text-center sm:text-left mt-8 shadow-sm">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30 shrink-0 bg-gray-100 shadow-sm">
                <img
                  src={authorInfo.avatar}
                  alt={authorInfo.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 text-base">
                    {authorInfo.name}
                  </span>
                  <span className="text-[11px] text-accent font-bold uppercase tracking-widest">
                    {authorInfo.role}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  {authorInfo.bio}
                </p>
              </div>
            </div>

            {/* 5. Engagement Stats & Social Share Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-y border-gray-200/80 py-5 my-6 gap-4 bg-surface/50 px-5 rounded-2xl">
              <div className="flex items-center gap-6 text-gray-500 text-xs font-semibold">
                <span className="flex items-center gap-1.5" title="Lượt xem">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span>{views} lượt xem</span>
                </span>
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 transition-all outline-none cursor-pointer active:scale-90 ${
                    hasLiked ? "text-accent font-bold" : "text-gray-500 hover:text-accent"
                  }`}
                  title="Thích bài viết này"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{likes} thích</span>
                </button>
                <span className="flex items-center gap-1.5">
                  <Share2 className="w-4 h-4 text-gray-400" />
                  <span>{Math.floor(likes / 3)} chia sẻ</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                  Chia sẻ:
                </span>
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded-lg border border-gray-200 hover:border-primary/40 text-gray-600 hover:text-primary bg-white transition-all cursor-pointer shadow-xs active:scale-95 flex items-center justify-center"
                  title="Sao chép liên kết"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : (
                    <LinkIcon className="w-4 h-4" />
                  )}
                </button>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    typeof window !== "undefined" ? window.location.href : ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-gray-200 hover:border-primary/40 text-gray-600 hover:text-primary bg-white transition-all shadow-xs active:scale-95 flex items-center justify-center"
                  title="Chia sẻ lên Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* 6. Related Articles */}
            {relatedStories.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Bài viết liên quan
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {relatedStories.map((item) => (
                    <Link
                      key={item.id}
                      href={`/hanh-trinh/${item.slug}`}
                      className="flex flex-col rounded-2xl overflow-hidden border border-gray-200/70 bg-white hover:border-primary/40 hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 flex flex-col gap-1.5 flex-grow justify-between">
                        <div>
                          {item.storyType && (
                            <span className="text-[9px] font-bold text-primary uppercase tracking-wider">
                              {item.storyType}
                            </span>
                          )}
                          <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-primary transition-colors mt-1">
                            {item.title}
                          </h4>
                        </div>
                        <span className="text-[11px] font-bold text-accent uppercase tracking-wider mt-2">
                          Xem thêm →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 7. Comment Section */}
            <div className="flex flex-col gap-8 mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold text-gray-900">
                  Bình luận ({comments.length})
                </h3>
              </div>

              {/* Comment List */}
              {comments.length > 0 && (
                <div className="space-y-4">
                  {comments.map((cmt) => (
                    <div
                      key={cmt.id}
                      className="p-4 rounded-xl bg-surface border border-gray-200/70 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                            <User className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-bold text-gray-900">
                            {cmt.authorName}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-400">
                          {cmt.createdAt}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed pl-9">
                        {cmt.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Comment Form */}
              <div className="p-6 rounded-2xl border border-gray-200/80 bg-surface flex flex-col gap-4 shadow-sm">
                <h4 className="font-bold text-gray-900 text-base">
                  Viết bình luận của bạn
                </h4>

                {commentSubmitted && (
                  <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-xs font-bold rounded-xl">
                    Cảm ơn bạn đã gửi bình luận! Bình luận của bạn đã được ghi nhận.
                  </div>
                )}

                <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={commentName}
                        onChange={(e) => setCommentName(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-gray-400 font-medium"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                        Email (Không hiển thị công khai)
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={commentEmail}
                        onChange={(e) => setCommentEmail(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-gray-400 font-medium"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      Nội dung bình luận *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Chia sẻ cảm nghĩ của bạn về bài viết..."
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-gray-400 resize-y min-h-[90px] font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-dark transition-all cursor-pointer active:scale-95 self-start shadow-sm"
                  >
                    Gửi bình luận
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
