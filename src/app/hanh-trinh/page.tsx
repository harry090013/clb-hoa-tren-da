import { getStories } from "@/lib/data";
import StoriesListClient from "@/components/stories/StoriesListClient";

export const revalidate = 60;

export const metadata = {
  title: "Hành trình yêu thương",
  description: "Các câu chuyện hành trình, nhật ký tình nguyện của CLB Hoa Trên Đá.",
};

export default async function StoriesPage() {
  const storiesList = await getStories();

  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StoriesListClient stories={storiesList} />
      </div>
    </div>
  );
}
