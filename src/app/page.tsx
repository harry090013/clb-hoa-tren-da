import Link from "next/link";
import { Sparkles, Heart, Users, MapPin, ChevronRight, Calendar, ArrowRight, ShieldCheck } from "lucide-react";
import { getProjects, getStories, getImpactStats, getPartners } from "@/lib/data";
import HeroSlideshow from "@/components/home/HeroSlideshow";

export const revalidate = 60;

export default async function Home() {
  const projectsList = await getProjects();
  const storiesList = await getStories();
  const stats = await getImpactStats();
  const partnersList = await getPartners();

  const featuredProjects = projectsList.filter(p => p.featured);
  const recentStories = storiesList.slice(0, 2);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50/80 via-white to-pink-50/30 py-16 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left text column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider text-primary bg-primary/10 border border-primary/20">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                CÂU LẠC BỘ THIỆN NGUYỆN HOA TRÊN ĐÁ
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Từ đá nở hoa <br />
                <span className="text-accent">Từ tâm lan tỏa</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed font-medium text-justify">
                Kết nối những trái tim nhiệt huyết, cùng sẻ chia yêu thương và đồng hành với trẻ em, người dân cùng những hoàn cảnh còn nhiều khó khăn.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/dong-hanh"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-base font-bold text-white bg-accent hover:bg-accent-dark shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Heart className="w-5 h-5 mr-2 fill-current" />
                  Đồng hành cùng chúng tôi
                </Link>
                <Link
                  href="/hanh-trinh"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-base font-bold text-primary bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow transition-all duration-200"
                >
                  Khám phá hành trình
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
            
            {/* Right slideshow column */}
            <div className="lg:col-span-5 w-full">
              <HeroSlideshow />
            </div>
          </div>
        </div>
        {/* Background shapes */}
        <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-10 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/50 via-primary to-transparent pointer-events-none rounded-full" />
      </section>

      {/* 2. Story Quote Section */}
      <section className="bg-primary text-white py-16 text-center relative px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-2xl sm:text-3xl font-bold italic leading-relaxed text-balance">
            "Có những bông hoa không lớn lên trong khu vườn màu mỡ mà vẫn mạnh mẽ nở giữa những vách đá khô cằn."
          </p>
          <div className="w-16 h-1 bg-accent mx-auto my-6 rounded-full" />
          <p className="text-sm uppercase tracking-widest text-gray-200 font-bold">
            Tinh thần Hoa Trên Đá
          </p>
        </div>
      </section>

      {/* 3. Mission & Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary">Sứ Mệnh Của Chúng Tôi</h2>
            <p className="text-gray-600 font-medium text-center">
              Kiến tạo những thay đổi thiết thực và lâu dài cho cộng đồng thông qua hành động tử tế và sự kết nối bền vững.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Chung tay vì cộng đồng</h3>
              <p className="text-gray-600 text-sm leading-relaxed text-justify">
                Đồng hành cùng bệnh nhân nghèo, học sinh hiếu học và bà con vùng cao qua các chương trình phát cháo bệnh viện, thắp sáng bản làng và hỗ trợ khẩn cấp.
              </p>
            </div>
            <div className="bg-surface p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Phát triển con người</h3>
              <p className="text-gray-600 text-sm leading-relaxed text-justify">
                Tạo dựng môi trường rèn luyện thực tế cho các bạn trẻ nâng cao kỹ năng mềm, tinh thần trách nhiệm và lòng nhân ái.
              </p>
            </div>
            <div className="bg-surface p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Kết nối & Lan tỏa</h3>
              <p className="text-gray-600 text-sm leading-relaxed text-justify">
                Là cầu nối đáng tin cậy giữa các nhà hảo tâm và các hoàn cảnh khó khăn cần giúp đỡ trên khắp đất nước.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Impact Metrics Section */}
      <section className="bg-surface py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary mb-3">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              Dấu ấn hành trình
            </span>
            <h2 className="text-3xl font-extrabold text-primary">Những Con Số Ấn Tượng</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-4xl sm:text-5xl font-extrabold text-accent">
                  {stat.value.toLocaleString("vi-VN")}
                  {stat.suffix}
                </p>
                <p className="mt-2 text-sm font-semibold text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-primary">Dự Án Thiện Nguyện</h2>
              <p className="text-gray-600 text-sm max-w-xl text-justify">
                Cùng góp sức mang lại nụ cười và tương lai tốt đẹp hơn cho các em nhỏ và đồng bào vùng cao.
              </p>
            </div>
            <Link
              href="/du-an"
              className="inline-flex items-center text-sm font-bold text-accent hover:text-accent-dark group"
            >
              Xem tất cả dự án
              <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {featuredProjects.length === 0 ? (
            <div className="bg-surface rounded-3xl border border-dashed border-gray-200/80 p-12 text-center max-w-2xl mx-auto space-y-3">
              <Sparkles className="w-8 h-8 text-accent mx-auto" />
              <h3 className="text-lg font-bold text-gray-900">Các chiến dịch mới đang được lên kế hoạch</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed text-center">
                CLB Hoa Trên Đá đang tiến hành khảo sát thực địa để chuẩn bị phát động các dự án thiện nguyện tiếp theo. Thông tin và mục tiêu gây quỹ minh bạch sẽ được cập nhật tại đây và trên Fanpage chính thức.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
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
                      project.projectStatus === "fundraising" ? "bg-accent" : "bg-primary"
                    }`}>
                      {project.projectStatus === "fundraising" ? "Gây quỹ" : "Chuẩn bị"}
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
                      <p className="text-gray-600 text-sm line-clamp-3 text-justify">
                        {project.excerpt}
                      </p>
                    </div>

                    {project.targetAmount && (
                      <div className="space-y-2 pt-2">
                        <div className="flex justify-between text-xs font-bold text-gray-600">
                          <span>Đã quyên góp:</span>
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
          )}
        </div>
      </section>

      {/* 6. Stories Section */}
      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-primary">Nhật Ký Hành Trình</h2>
              <p className="text-gray-600 text-sm max-w-xl text-justify">
                Những chia sẻ đầy cảm xúc của các tình nguyện viên trên mọi miền đất nước.
              </p>
            </div>
            <Link
              href="/hanh-trinh"
              className="inline-flex items-center text-sm font-bold text-accent hover:text-accent-dark group"
            >
              Đọc thêm câu chuyện
              <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentStories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row"
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
                    <p className="text-gray-600 text-xs line-clamp-3 text-justify">
                      {story.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-600">Tác giả: {story.authorName}</span>
                    <Link
                      href={`/hanh-trinh/${story.slug}`}
                      className="font-bold text-accent hover:underline flex items-center gap-1"
                    >
                      Đọc tiếp
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Transparency Overview Section */}
      <section className="bg-white py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-green-900 to-primary text-white p-8 md:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-accent">
                <ShieldCheck className="w-3.5 h-3.5" />
                Minh bạch 100%
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Hoạt Động Tài Chính Minh Bạch
              </h2>
              <p className="text-gray-200 text-sm leading-relaxed text-justify">
                Tại Hoa Trên Đá, chúng tôi cam kết công khai 100% dòng tiền tiếp nhận và sử dụng. Mọi đóng góp của bạn đều được ghi nhận cụ thể bằng biên lai, chứng từ thu chi rõ ràng cho từng chiến dịch.
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-col gap-4 w-full md:w-auto">
              <Link
                href="/minh-bach"
                className="w-full md:w-auto text-center inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm font-bold text-primary bg-white hover:bg-gray-100 shadow transform hover:-translate-y-0.5 transition-all"
              >
                Tra cứu thu chi dự án
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Partners */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-center text-sm font-extrabold uppercase tracking-widest text-gray-500">
            Đồng hành cùng dự án
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-75">
            {partnersList.map((partner) => (
              <div key={partner.id} className="flex flex-col items-center justify-center text-center max-w-xs">
                <span className="text-sm font-bold text-primary">{partner.name}</span>
                <span className="text-xs text-gray-500">{partner.partnerType}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="bg-white py-20 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary">
            Bạn Sẵn Sàng Đồng Hành Cùng Chúng Tôi?
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto text-justify">
            Mọi đóng góp về sức lực, thời gian hay hiện vật đều là những viên gạch quý báu xây dựng nên tương lai rực rỡ hơn cho trẻ em nghèo vùng cao. Hãy gia nhập đội ngũ tình nguyện viên ngay hôm nay!
          </p>
          <div className="pt-4">
            <Link
              href="/dong-hanh"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold text-white bg-accent hover:bg-accent-dark shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Đăng ký tham gia ngay
              <Heart className="w-5 h-5 ml-2 fill-current" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
