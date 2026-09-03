import { getStories, getStoryBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import StoryDetailClient from "@/components/stories/StoryDetailClient";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const storiesList = await getStories();
  return storiesList.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    return {
      title: "Không tìm thấy bài viết | Hoa Trên Đá",
    };
  }

  return {
    title: `${story.title} | CLB Thiện nguyện Hoa Trên Đá`,
    description: story.excerpt || "Câu chuyện hành trình thiện nguyện của CLB Hoa Trên Đá.",
    openGraph: {
      title: story.title,
      description: story.excerpt,
      images: [story.coverImage],
      type: "article",
    },
  };
}

export const revalidate = 60;

export default async function StoryDetail({ params }: PageProps) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const allStories = await getStories();
  const relatedStories = allStories
    .filter((s) => s.slug !== slug)
    .slice(0, 3);

  return (
    <div className="bg-white min-h-screen">
      <StoryDetailClient story={story} relatedStories={relatedStories} />
    </div>
  );
}
