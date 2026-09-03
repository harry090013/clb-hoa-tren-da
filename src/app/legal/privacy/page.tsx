export const metadata = {
  title: "Chính sách bảo mật",
  description: "Chính sách bảo mật thông tin cá nhân và dữ liệu tại Câu lạc bộ Hoa Trên Đá.",
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 prose max-w-none text-gray-700 leading-relaxed font-sans text-justify">
        <h1 className="text-3xl font-extrabold text-primary">Chính Sách Bảo Mật</h1>
        <p className="text-xs text-gray-400 font-semibold">Cập nhật lần cuối: 12 tháng 08, 2026</p>
        
        <p>
          Chào mừng bạn đến với trang thông tin chính thức của <strong>Câu lạc bộ Thiện nguyện Hoa Trên Đá</strong>. Chúng tôi tôn trọng quyền riêng tư của bạn và cam kết bảo vệ thông tin cá nhân của bạn theo chính sách bảo mật này.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-6">1. Thu thập thông tin</h2>
        <p>
          Chúng tôi thu thập thông tin khi bạn điền vào các biểu mẫu đăng ký tình nguyện viên, đăng ký đối tác hoặc gửi lời nhắn liên hệ. Các thông tin thu thập bao gồm: Họ tên, Số điện thoại, Địa chỉ Email, Động lực tham gia hoặc Đề xuất hợp tác.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-6">2. Sử dụng thông tin</h2>
        <p>
          Các thông tin thu thập được chỉ sử dụng nội bộ nhằm mục đích liên hệ phản hồi, sắp xếp nhân sự cho các hoạt động thiện nguyện, hoặc xác thực thông tin đối tác đồng hành. Chúng tôi tuyệt đối không bán hoặc cung cấp thông tin này cho bên thứ ba vì mục đích thương mại.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-6">3. Bảo mật thông tin</h2>
        <p>
          Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật số cơ bản để đảm bảo an toàn cho dữ liệu cá nhân của bạn khỏi sự truy cập trái phép. Mọi thông tin nhạy cảm của nhà hảo tâm và người thụ hưởng (nếu có) luôn được che giấu hoặc ẩn danh theo quy định minh bạch của CLB.
        </p>
      </div>
    </div>
  );
}
