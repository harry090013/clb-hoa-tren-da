import { getStories, getStoryBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const storiesList = await getStories();
  return storiesList.map((s) => ({
  }));
}

export const revalidate = 60;

export default async function StoryDetail({ params }: PageProps) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/hanh-trinh"
          className="inline-flex items-center text-sm font-bold text-accent hover:underline gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại nhật ký hành trình
        </Link>

        <div className="space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-primary bg-primary/10">
            {story.storyType}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary leading-tight">
            {story.title}
          </h1>

          <div className="flex items-center space-x-6 text-sm text-gray-500 font-semibold border-y border-gray-100 py-4">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-primary" />
              <span>{story.authorName}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              <span>05/08/2026</span>
            </div>
          </div>
        </div>

        {/* Cover */}
        <div className="relative h-64 sm:h-96 rounded-3xl overflow-hidden bg-gray-200">
          <img
            src={story.coverImage}
            alt={story.title}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-sans space-y-6">
          {story.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
