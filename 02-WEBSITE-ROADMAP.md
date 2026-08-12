# Website Architecture & Development Roadmap

## 1. Kiến trúc thông tin mục tiêu

### Sitemap chính

```text
/
├── ve-chung-toi
├── hoat-dong
├── du-an
│   └── [slug]
├── hanh-trinh
│   └── [slug]
├── minh-bach
│   ├── bao-cao
│   ├── thu-chi
│   └── [year]
├── dong-hanh
├── lien-he
└── legal
    ├── privacy
    └── terms
```

## 2. Cấu trúc homepage

1. Navbar
2. Hero
3. Câu chuyện Hoa Trên Đá
4. Sứ mệnh
5. Impact numbers
6. Hoạt động nổi bật
7. Dự án đang triển khai
8. Những câu chuyện trên hành trình
9. Minh bạch
10. Con người Hoa Trên Đá
11. Đối tác
12. CTA đồng hành
13. Footer

## 3. Các giai đoạn phát triển

---

# Phase 0 — Foundation

## Mục tiêu
Khởi tạo codebase sạch, sẵn sàng GitHub và Vercel.

## Công việc
- Next.js + TypeScript
- Tailwind CSS
- ESLint
- Prettier nếu cần
- Cấu trúc thư mục
- Fonts
- Metadata base
- Global styles
- Theme tokens
- Asset structure
- Env template

## Deliverables
- Website chạy local
- Build thành công
- Không lỗi TypeScript
- Có README kỹ thuật
- Có `.env.example`
- Có `.gitignore`

---

# Phase 1 — Static MVP

## Mục tiêu
Public được website chính thức với đầy đủ thông tin cơ bản.

## Trang
- Home
- Về chúng tôi
- Hoạt động
- Dự án
- Hành trình
- Minh bạch
- Đồng hành
- Liên hệ

## Dữ liệu
Dùng local TypeScript/JSON/MDX.

## Tính năng
- Responsive
- SEO
- OpenGraph
- Sitemap
- Static content
- Project cards
- Stories
- Team placeholders
- Contact information
- Donation section chưa bật nếu thiếu dữ liệu hợp lệ

## Không làm
- Auth
- Admin
- Database writes
- Payment
- CRM

---

# Phase 2 — Supabase Read-only

## Mục tiêu
Chuyển dữ liệu nội dung từ local sang Supabase.

## Dữ liệu đưa online
- Projects
- Stories
- Reports
- Team
- Partners
- Impact statistics
- Gallery

## Supabase sử dụng
- PostgreSQL
- Storage

## Frontend
- Server-side fetch hoặc static generation
- Revalidation phù hợp
- Không cần auth admin ở phase đầu

---

# Phase 3 — Admin CMS nội bộ

## Mục tiêu
Người không biết code có thể cập nhật website.

## Tính năng
- Supabase Auth
- Admin dashboard
- CRUD:
  - Projects
  - Stories
  - Reports
  - Team
  - Partners
  - Gallery
  - Impact stats
- Upload ảnh
- Draft / Published
- Role-based access

## Security
- RLS bắt buộc
- Không dùng service role key ở browser
- Audit created_by / updated_by

---

# Phase 4 — Transparency Platform

## Mục tiêu
Biến phần minh bạch thành thế mạnh của CLB.

## Tính năng
- Báo cáo từng dự án
- Khoản thu
- Khoản chi
- Chứng từ
- Tổng tiếp nhận
- Tổng chi
- Số dư
- Phương án xử lý số dư
- Người thụ hưởng
- Timeline dự án

## Lưu ý
Không hiển thị thông tin nhạy cảm của người thụ hưởng.

---

# Phase 5 — Volunteer & Partnership Workflow

## Volunteer
- Form đăng ký
- Lưu Supabase
- Status:
  - new
  - contacted
  - accepted
  - rejected
  - inactive

## Partnership
- Form đối tác
- Loại hợp tác
- Contact person
- Ghi chú
- Trạng thái xử lý

## Có thể mở rộng
- Email notifications
- Automation
- Internal dashboard

---

# Phase 6 — Donation Module

Chỉ triển khai khi CLB có đầy đủ cơ sở vận hành.

## Có thể gồm
- QR
- Bank transfer instructions
- Campaign-specific donation page
- Donation receipt records
- Public anonymous donor feed nếu phù hợp
- Donation transparency

## Không mặc định làm payment gateway
Chỉ tích hợp khi có nhu cầu thực tế và pháp lý phù hợp.

---

# Phase 7 — Long-term Platform

Có thể mở rộng:
- Volunteer accounts
- Event registration
- Attendance
- Volunteer hours
- Certificates
- Internal document storage
- Chapter/region management
- CRM
- Newsletter
- Multi-language
- Annual report generator

Không triển khai nếu chưa có nhu cầu thật.

## 4. Cấu trúc thư mục đề xuất

```text
src/
├── app/
│   ├── (public)/
│   ├── admin/
│   ├── api/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── common/
│   ├── layout/
│   ├── home/
│   ├── projects/
│   ├── stories/
│   ├── transparency/
│   └── forms/
│
├── lib/
│   ├── supabase/
│   ├── utils/
│   ├── constants/
│   └── seo/
│
├── data/
│   ├── projects.ts
│   ├── stories.ts
│   ├── team.ts
│   └── site.ts
│
├── types/
├── hooks/
└── styles/

public/
├── images/
├── logo/
├── icons/
└── og/
```

## 5. Nguyên tắc mở rộng

- UI components không phụ thuộc chặt vào nguồn dữ liệu.
- Giai đoạn đầu lấy dữ liệu local.
- Khi chuyển Supabase chỉ thay data access layer.
- `types/` phải được định nghĩa ngay từ đầu.
- Mọi bảng DB có `id`, `created_at`, `updated_at`.
- Nội dung public có `status`.
- Slug phải unique.
- Ảnh lưu Supabase Storage khi phase online bắt đầu.

## 6. Route strategy

Ưu tiên:
- Static generation
- ISR/Revalidation nếu cần
- Dynamic server rendering chỉ khi thực sự cần

Vercel phải luôn build được mà không cần secret không bắt buộc trong Phase 1.
