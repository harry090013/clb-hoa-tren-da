# Project Memory

## Current Status
- **Trạng thái hiện tại**: Website đã **MỞ CỬA CÔNG KHAI** (Maintenance Mode: OFF). Khách truy cập từ Fanpage và các nguồn bên ngoài có thể truy cập thẳng vào trang web mà không cần mật khẩu hay màn hình chờ.
- **Quyền truy cập**:
  - Người dùng công chúng: Duyệt toàn bộ website công khai trực tiếp.
  - Quản trị viên: Truy cập trực tiếp qua `/admin/login` (hoặc `/admin`).
  - Lớp bảo mật tài chính phụ: Nhập mã PIN `1309` (hoặc mã cấu hình trên Vercel `NEXT_PUBLIC_FINANCIAL_PIN`) để xem/sửa mục Minh bạch tài chính.
- **Build & Mã nguồn**: Nhánh `main` sạch (Clean tree), đã đẩy lên GitHub `harry090013/clb-hoa-tren-da`.
- **Dữ liệu Supabase**: Đã dọn dẹp sạch toàn bộ mock data cũ, nạp 3 bài viết chính thức từ Fanpage và cập nhật 4 thành viên Ban Điều Hành thực tế.

## Architecture Decisions
- **Framework**: Next.js 16 (Turbopack) với React 19, TypeScript và Tailwind CSS v4.
- **Rendering & Cache**: Incremental Static Regeneration (ISR) với `revalidate = 60s` cho tất cả các trang public.
- **Rich Content Parser**: Tự xây dựng [`RichTextRenderer.tsx`](file:///f:/Dev/Hoa-Tren-Da-Antigravity-Project-Pack/src/components/layout/RichTextRenderer.tsx) tối ưu, không phụ thuộc thư viện ngoài, hỗ trợ tiêu đề `##`/`###`, in đậm, in nghiêng, danh sách, emoji và nhúng ảnh responsive kèm chú thích.
- **Favicon**: Sử dụng icon chuẩn App Router `src/app/icon.png` tạo từ logo gốc CLB.

## Data & Content Overview
1. **Ban Điều Hành**:
   - Đoàn Xuân Lộc (Trưởng Ban Điều Hành / Người đứng đầu CLB)
   - Phạm Minh Đức (Phó Ban Điều Hành / Dẫn chương trình, đối ngoại)
   - Nguyễn Khánh Tuấn (Trưởng Ban Hậu Cần)
   - Nguyễn Quang Hiếu (Trưởng Ban Truyền Thông)
   - Ảnh đại diện: Đã crop vuông 400x400 WebP tại `/images/bdh_*.webp`.
2. **Bài viết / Câu chuyện (3 bài chính thức)**:
   - *Vì sao chúng mình mang tên “Hoa Trên Đá”?* (Tác giả: Đoàn Xuân Lộc)
   - *Trước khi có Hoa Trên Đá, chúng mình đã đi qua những hành trình nào?* (Tác giả: Ban Điều Hành)
   - *Hoa Trên Đá sẽ làm gì?* (Tác giả: Nguyễn Quang Hiếu)
   - Đã tối ưu hóa hình ảnh sang WebP và định dạng rich text đẹp mắt.
3. **Dự án & Minh bạch tài chính**:
   - Đã dọn sạch các dự án và báo cáo thu/chi test. Sẵn sàng nhập số liệu thực tế khi CLB phát động chiến dịch mới.
4. **Địa chỉ liên hệ**:
   - `Xóm Trại, Thôn Quế Xuân, Xã Xuân Phú, TP Đà Nẵng`
   - Hotline: `0379 163 913`
   - Email: `hoatrendaclb@gmail.com`

## Last Updated
2026-09-03
