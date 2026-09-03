import { Sparkles, Utensils, Sun, GraduationCap, HeartPulse, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Mảng hoạt động cốt lõi",
  description: "4 chương trình hoạt động thiện nguyện trọng điểm của Câu lạc bộ Hoa Trên Đá.",
};

export const revalidate = 60;

export default function Activities() {
  const activityFields = [
    {
      title: "Phát cháo tình nguyện tại các bệnh viện",
      tag: "Bệnh viện Duy Xuyên & Quế Sơn",
      description: "Tổ chức nấu và phát cháo dinh dưỡng ấm nóng miễn phí định kỳ tại các bệnh viện / Trung tâm Y tế huyện Duy Xuyên và Quế Sơn, sẻ chia gánh nặng bữa ăn cùng các bệnh nhân nghèo và người nhà; định hướng mở rộng thêm các cơ sở y tế lân cận.",
      highlights: [
        "Nấu và trao tặng các nồi cháo dinh dưỡng nóng sốt định kỳ",
        "Tiếp sức cho bệnh nhân nghèo và thân nhân đang điều trị",
        "Mục tiêu nhân rộng sang nhiều bệnh viện trong khu vực",
      ],
      icon: Utensils,
    },
    {
      title: "Chương trình hành trình vùng cao",
      tag: "Thôn bản & Điểm trường vùng cao",
      description: "Thực hiện các chuyến đi thực địa mang lại giá trị thiết thực: lắp đặt hệ thống bóng đèn năng lượng mặt trời thắp sáng đường thôn bản, nấu những bữa ăn ấm no cho học sinh và bà con dân bản, kết hợp trao tặng áo ấm, quà tặng và đồ dùng học tập.",
      highlights: [
        "Lắp đặt bóng đèn năng lượng mặt trời thắp sáng đường bản",
        "Nấu ăn đủ chất cho học sinh và người dân vùng cao",
        "Trao quà tặng, áo ấm và đồ dùng học tập thiết yếu",
      ],
      icon: Sun,
    },
    {
      title: "Hỗ trợ học sinh nghèo vượt khó hằng tháng",
      tag: "Đồng hành bền bỉ dài hạn",
      description: "Xây dựng quỹ học bổng đồng hành thường xuyên, trao chi phí hỗ trợ học tập định kỳ hằng tháng cho các em học sinh có hoàn cảnh gia đình đặc biệt khó khăn nhưng luôn nỗ lực vươn lên, giúp các em vững bước tới trường và không phải bỏ học giữa chừng.",
      highlights: [
        "Hỗ trợ kinh phí và học bổng học tập đều đặn mỗi tháng",
        "Thăm hỏi, động viên tinh thần và theo sát quá trình học",
        "Tạo điểm tựa giúp các em yên tâm nuôi dưỡng ước mơ",
      ],
      icon: GraduationCap,
    },
    {
      title: "Hỗ trợ các trường hợp khẩn cấp & tai nạn",
      tag: "Cứu trợ & Ứng phó kịp thời",
      description: "Chủ động xác minh và kịp thời phát động kêu gọi, kết nối các nguồn lực để hỗ trợ viện phí, sinh hoạt phí cho các ca tai nạn bất ngờ, bệnh nhân mắc bệnh hiểm nghèo cần kinh phí phẫu thuật gấp, hoặc các gia đình gặp hoạn nạn, thiên tai đột xuất.",
      highlights: [
        "Xác minh thông tin thực tế nhanh chóng, chuẩn xác",
        "Kêu gọi minh bạch và trực tiếp trao gửi tận tay hoàn cảnh",
        "Hỗ trợ viện phí khẩn cấp cho các ca tai nạn và hiểm nghèo",
      ],
      icon: HeartPulse,
    },
  ];

  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header section */}
        <div className="max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-primary bg-primary/10">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            Lĩnh vực hành động
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-primary leading-snug sm:leading-[1.25]">
            Mảng Hoạt Động Cốt Lõi
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-medium text-justify">
            Chúng tôi tập trung toàn bộ nguồn lực vào 4 chương trình trọng điểm, thiết thực và bền bỉ — giải quyết trực tiếp các nhu cầu cấp bách của bệnh nhân khó khăn, trẻ em hiếu học và đồng bào vùng cao.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activityFields.map((field, idx) => {
            const Icon = field.icon;
            return (
              <div
                key={idx}
                className="bg-surface border border-gray-100 p-8 sm:p-10 rounded-3xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-6"
              >
                <div className="flex items-start space-x-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 shadow-inner">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold text-primary bg-primary/5 border border-primary/15">
                      {field.tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                      {field.title}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed font-medium text-justify">
                  {field.description}
                </p>

                <div className="border-t border-gray-100/80 pt-4 space-y-2">
                  {field.highlights.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center space-x-2 text-xs font-semibold text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA to volunteer */}
        <div className="bg-gradient-to-r from-primary to-green-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-md">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Hãy cùng chúng tôi viết tiếp hành trình nhân ái</h2>
          <p className="max-w-2xl mx-auto text-gray-200 text-sm leading-relaxed font-medium text-justify">
            Chúng tôi luôn trân trọng mọi sự chung tay từ các nhà hảo tâm, mạnh thường quân và các bạn tình nguyện viên để cùng duy trì những nồi cháo ấm lòng, thắp sáng những ngọn đèn vùng cao và tiếp sức cho các em nhỏ vững bước đến trường.
          </p>
          <div className="pt-2">
            <Link
              href="/dong-hanh"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-bold text-primary bg-white hover:bg-gray-100 shadow-md hover:shadow-lg transition-all"
            >
              Đăng ký đồng hành cùng CLB
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
