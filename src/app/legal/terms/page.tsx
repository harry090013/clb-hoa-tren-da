export const metadata = {
  title: "Điều khoản hoạt động",
  description: "Điều khoản hoạt động và quy chế tham gia Câu lạc bộ Hoa Trên Đá.",
};

export default function TermsOfService() {
  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 prose max-w-none text-gray-700 leading-relaxed font-sans text-justify">
        <h1 className="text-3xl font-extrabold text-primary">Điều Khoản Hoạt Động</h1>
        <p className="text-xs text-gray-400 font-semibold">Cập nhật lần cuối: 12 tháng 08, 2026</p>
        
        <p>
          Quy chế hoạt động này quy định quyền lợi và trách nhiệm của tình nguyện viên, đối tác và người sử dụng website chính thức của <strong>Câu lạc bộ Thiện nguyện Hoa Trên Đá</strong>.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-6">1. Nguyên tắc hoạt động thiện nguyện</h2>
        <p>
          Mọi hoạt động thiện nguyện do Hoa Trên Đá tổ chức đều dựa trên tinh thần tự nguyện, minh bạch, yêu thương và trách nhiệm xã hội. Các thành viên cam kết không lợi dụng danh nghĩa CLB để trục lợi cá nhân dưới bất kỳ hình thức nào.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-6">2. Sử dụng thông tin trên website</h2>
        <p>
          Hình ảnh, nội dung bài viết và báo cáo minh bạch trên website thuộc bản quyền của CLB Hoa Trên Đá. Nghiêm cấm sao chép, chỉnh sửa hoặc sử dụng sai lệch thông tin nhằm mục đích xuyên tạc hoặc bôi nhọ uy tín của CLB và các đối tác đồng hành.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-6">3. Giải quyết khiếu nại và phản hồi</h2>
        <p>
          Chúng tôi luôn sẵn sàng lắng nghe mọi góp ý mang tính xây dựng của cộng đồng. Mọi thắc mắc về tính minh bạch của các số liệu thu chi xin vui lòng gửi trực tiếp đến Ban điều hành thông qua trang Liên hệ để được phản hồi chính thức bằng văn bản.
        </p>
      </div>
    </div>
  );
}
