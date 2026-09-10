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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://clb-hoa-tren-da.vercel.app";
  const jpgImage = story.coverImage.endsWith(".webp")
    ? story.coverImage.replace(/\.webp$/, ".jpg")
    : story.coverImage;
  const fullImageUrl = jpgImage.startsWith("http") ? jpgImage : `${siteUrl}${jpgImage}`;

  return {
    title: story.title,
    description: story.excerpt || "Câu chuyện hành trình thiện nguyện của CLB Hoa Trên Đá.",
    alternates: {
      canonical: `${siteUrl}/hanh-trinh/${story.slug}`,
    },
    openGraph: {
      title: story.title,
      description: story.excerpt,
      url: `${siteUrl}/hanh-trinh/${story.slug}`,
      siteName: "CLB Thiện nguyện Hoa Trên Đá",
      locale: "vi_VN",
      type: "article",
      publishedTime: story.publishedAt,
      authors: [story.authorName || "CLB Hoa Trên Đá"],
      images: [
        {
          url: `${fullImageUrl}?v=2`,
          secureUrl: `${fullImageUrl}?v=2`,
          width: 1200,
          height: 630,
          alt: story.title,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.excerpt,
      images: [`${fullImageUrl}?v=2`],
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
