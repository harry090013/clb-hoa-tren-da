# Câu lạc bộ Thiện nguyện Hoa Trên Đá — Project README

## 1. Tổng quan dự án

Đây là website chính thức của **Câu lạc bộ Thiện nguyện Hoa Trên Đá**.

Mục tiêu của website không chỉ là giới thiệu CLB, mà phải trở thành một **hồ sơ năng lực sống** của tổ chức theo luồng:

**Câu chuyện → Con người → Hành động → Kết quả → Minh bạch → Đồng hành**

Website cần tạo cảm giác:
- Đáng tin cậy
- Ấm áp
- Nhân văn
- Trẻ trung nhưng chuyên nghiệp
- Dễ sử dụng trên mobile
- Dễ mở rộng trong tương lai

## 2. Thông tin thương hiệu hiện có

### Tên
**Câu lạc bộ Thiện nguyện Hoa Trên Đá**

### Slogan
**Từ đá nở hoa – Từ tâm lan tỏa**

### Thông điệp cốt lõi
Có những bông hoa không nở trong khu vườn màu mỡ, mà vẫn vươn mình mạnh mẽ giữa những vách đá khô cằn.

Hoa Trên Đá là hình ảnh tượng trưng cho:
- Nghị lực
- Hy vọng
- Lòng nhân ái
- Tinh thần sẻ chia
- Hành động thiết thực vì cộng đồng

### Giới thiệu
CLB được thành lập với mong muốn kết nối những trái tim nhiệt huyết, cùng nhau thực hiện các hoạt động ý nghĩa, đồng hành với trẻ em, người dân và những hoàn cảnh khó khăn; đồng thời tạo môi trường để thành viên rèn luyện, trưởng thành và sống có trách nhiệm hơn với cộng đồng.

### Giá trị cốt lõi
1. **Yêu thương** — Sống tử tế, lan tỏa yêu thương.
2. **Trách nhiệm** — Có trách nhiệm với bản thân, cộng đồng và xã hội.
3. **Đoàn kết** — Cùng nhau kết nối để lan tỏa.
4. **Sáng tạo** — Không ngừng đổi mới để hành động hiệu quả hơn.
5. **Bền bỉ** — Kiên trì theo đuổi những giá trị tốt đẹp.

## 3. Thông tin liên hệ hiện có

- Điện thoại: **0379 163 913**
- Email: **hoatrendaclb@gmail.com**
- Ngân hàng: **MB**
- Thông tin tài khoản hiện chỉ mới có: **4661**

> Lưu ý: Không được hiển thị chức năng quyên góp chính thức cho đến khi có đầy đủ:
> - Số tài khoản đầy đủ
> - Tên chủ tài khoản
> - Xác nhận loại tài khoản
> - QR thanh toán
> - Cơ chế quản lý và công khai nguồn tiền

## 4. Định hướng thiết kế

### Visual direction
**Humanitarian × Youth × Vietnamese**

Website cần cân bằng:
- Tính cảm xúc của hoạt động thiện nguyện
- Sự trẻ trung của cộng đồng tình nguyện viên
- Sự chuyên nghiệp và minh bạch của một tổ chức đáng tin cậy

### Màu sắc
Ưu tiên:
- Xanh lá đậm: khoảng `#2F6B2F`
- Hồng hoa: khoảng `#E91E63`
- Trắng
- Kem nhạt / xanh rất nhạt cho section background

Không sử dụng xanh dương đậm làm màu chủ đạo dù poster hiện tại có dùng nhiều xanh.

### Font
Khuyến nghị:
- **Be Vietnam Pro**
- Fallback: Inter, system-ui, sans-serif

### Nguyên tắc UI
- Mobile-first
- Khoảng trắng rõ
- Card bo góc nhẹ
- Hình ảnh thật là nhân vật chính
- Logo dùng cho nhận diện, không lạm dụng illustration trong logo
- Animation nhẹ khi scroll
- Không cyberpunk
- Không quá nhiều gradient
- Không glow
- Không UI kiểu startup SaaS
- Không dùng chữ script ngoài logo nếu không cần

## 5. Tech stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- MDX hoặc content layer cho các nội dung tĩnh giai đoạn đầu
- Lucide Icons

### Hosting / Source control
- GitHub: dùng để lưu mã nguồn
- Vercel: dùng để public website

User sẽ cung cấp repository và Vercel project sau.

### Backend / Data
- Supabase

Sử dụng Supabase khi bắt đầu cần dữ liệu online.

Supabase dự kiến chịu trách nhiệm:
- PostgreSQL database
- Storage cho ảnh
- Auth nếu sau này có admin
- API thông qua Supabase SDK
- Row Level Security

Không kết nối Supabase cho đến khi user yêu cầu hoặc giai đoạn phát triển cần đến.

## 6. Những thứ chưa được tự suy diễn

Không tự tạo số liệu thật cho:
- Số thành viên
- Số chương trình
- Số người thụ hưởng
- Số tiền tiếp nhận
- Số tiền đã chi
- Số địa phương hoạt động

Có thể tạo placeholder trong development nhưng phải ghi rõ `DEMO` hoặc `PLACEHOLDER`.

Không tự tạo:
- Địa chỉ CLB
- Người đại diện
- Ban chủ nhiệm
- Link Facebook / TikTok / Zalo
- QR ngân hàng
- Thông tin pháp lý

## 7. Mục tiêu chất lượng

Website cần đạt:
- Responsive tốt
- Lighthouse tốt
- SEO cơ bản đầy đủ
- Metadata chuẩn
- OpenGraph
- Sitemap
- robots.txt
- Structured Data phù hợp
- Image optimization
- Accessibility cơ bản
- Không có lỗi TypeScript
- Không có warning nghiêm trọng
- Không commit secret

## 8. Nguyên tắc phát triển

1. Không over-engineer.
2. Ưu tiên static-first.
3. Database chỉ dùng khi thực sự cần.
4. Không thêm CMS phức tạp quá sớm.
5. Mọi tính năng phải phục vụ mục tiêu: uy tín, thông tin, minh bạch, chuyển đổi.
6. Mỗi phase phải chạy ổn trước khi sang phase kế tiếp.
7. Mỗi thay đổi lớn phải được ghi vào memory/project log.
