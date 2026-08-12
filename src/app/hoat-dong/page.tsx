import { Sparkles, Award, BookOpen, Coffee, Sun } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Hoạt động thiện nguyện",
  description: "Các mảng hoạt động thiện nguyện chính của Câu lạc bộ Hoa Trên Đá.",
};

export default function Activities() {
  const activityFields = [
    {
      title: "Hỗ trợ học đường & Áo ấm vùng cao",
      description: "Quyên góp quần áo ấm, giày dép, sách vở, bàn ghế học sinh tại các điểm trường mầm non và tiểu học đặc biệt khó khăn.",
      icon: BookOpen,
    },
    {
      title: "Nước sạch tinh khiết học đường",
      description: "Quyên góp kinh phí và trực tiếp thi công hệ thống giếng khoan, bồn lọc nước RO tinh khiết phục vụ nguồn nước uống an toàn.",
      icon: Award,
    },
    {
      title: "Kết nối tấm lòng vàng",
      description: "Tổ chức các sự kiện thiện nguyện, đêm nhạc quyên góp quỹ và kêu gọi tấm lòng hảo tâm để hỗ trợ các ca phẫu thuật hiểm nghèo hoặc hoàn cảnh khó khăn đột xuất.",
      icon: Coffee,
    },
    {
      title: "Phát triển kỹ năng tình nguyện",
      description: "Huấn luyện các kỹ năng sơ cấp cứu, kỹ năng tổ chức trò chơi, giảng dạy kỹ năng sống cho các trẻ em bản cao.",
      icon: Sun,
    },
  ];

  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-primary bg-primary/10">
            <Sparkles className="w-3 h-3 text-accent" />
            Lĩnh vực hành động
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
            Mảng Hoạt Động Cốt Lõi
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            Chúng tôi tập trung nguồn lực vào những dự án thực chất, thiết thực, giải quyết trực tiếp nhu cầu thiết yếu nhất của các nhóm yếu thế tại vùng sâu vùng xa Việt Nam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activityFields.map((field, idx) => {
            const Icon = field.icon;
            return (
              <div
                key={idx}
                className="bg-surface border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-200 flex items-start space-x-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">{field.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{field.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA to volunteer */}
        <div className="bg-gradient-to-r from-primary to-green-800 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Hãy cùng chúng tôi viết tiếp hành trình nhân ái</h2>
          <p className="max-w-xl mx-auto text-gray-200 text-sm leading-relaxed">
            Chúng tôi luôn cần thêm cánh tay nối dài từ các nhà tài trợ, các bạn trẻ đam mê tình nguyện để nhân rộng các tủ sách học đường và các điểm nước sạch.
          </p>
          <div className="pt-2">
            <Link
              href="/dong-hanh"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold text-primary bg-white hover:bg-gray-100 shadow"
            >
              Đăng ký đồng hành
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
