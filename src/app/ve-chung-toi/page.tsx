import { teamMembers } from "@/data/team";
import { Sparkles, CheckCircle, Shield } from "lucide-react";

export const metadata = {
  title: "Về chúng tôi",
  description: "Tìm hiểu về Câu lạc bộ Thiện nguyện Hoa Trên Đá - Sứ mệnh, giá trị cốt lõi và đội ngũ điều hành.",
};

export default function About() {
  const values = [
    {
      title: "Yêu thương",
      description: "Sống tử tế, lan tỏa lòng nhân ái đến với những hoàn cảnh khó khăn.",
    },
    {
      title: "Trách nhiệm",
      description: "Có trách nhiệm cao với bản thân, với tổ chức, nhà hảo tâm và cộng đồng.",
    },
    {
      title: "Đoàn kết",
      description: "Cùng nhau kết nối những trái tim nhiệt huyết để lan tỏa giá trị lớn hơn.",
    },
    {
      title: "Sáng tạo",
      description: "Không ngừng đổi mới cách thức tổ chức để mang lại hiệu quả tốt nhất.",
    },
    {
      title: "Bền bỉ",
      description: "Kiên trì theo đuổi những giá trị tốt đẹp mặc cho những khó khăn, thử thách.",
    },
  ];

  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Intro */}
        <div className="max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-primary bg-primary/10">
            <Sparkles className="w-3 h-3 text-accent" />
            Giới thiệu CLB
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
            Câu lạc bộ Thiện nguyện Hoa Trên Đá
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            CLB được thành lập với mong muốn kết nối những trái tim nhiệt huyết, cùng nhau thực hiện các hoạt động ý nghĩa, đồng hành với trẻ em, người dân và những hoàn cảnh khó khăn; đồng thời tạo môi trường để thành viên rèn luyện, trưởng thành và sống có trách nhiệm hơn với cộng đồng.
          </p>
        </div>

        {/* Core Values */}
        <div className="space-y-8 bg-surface p-8 sm:p-12 rounded-3xl border border-gray-100">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary">Giá Trị Cốt Lõi</h2>
            <p className="text-gray-500 text-sm">Nền tảng cho mọi hành động và tôn chỉ hoạt động của chúng tôi.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-50 shadow-sm space-y-2 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-primary">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <h3 className="font-bold text-gray-900">{value.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div className="space-y-10">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary">Ban Điều Hành</h2>
            <p className="text-gray-500 text-sm">Những con người nhiệt huyết điều hành hoạt động của Hoa Trên Đá.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-surface border border-gray-100 rounded-2xl overflow-hidden shadow-sm flex flex-col items-center p-6 text-center space-y-4"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-2 border-primary">
                  <img
                    src={member.avatarUrl}
                    alt={member.fullName}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-gray-900">{member.fullName}</h3>
                  <p className="text-xs font-bold text-accent uppercase tracking-wider">{member.role}</p>
                  <p className="text-xs text-gray-500">{member.department}</p>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  "{member.bio}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
