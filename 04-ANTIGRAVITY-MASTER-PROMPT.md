# ANTIGRAVITY MASTER PROMPT — HOA TRÊN ĐÁ WEBSITE

## SYSTEM GOAL

Bạn đang phát triển website chính thức cho:

**Câu lạc bộ Thiện nguyện Hoa Trên Đá**

Slogan:
**Từ đá nở hoa – Từ tâm lan tỏa**

Website phải trở thành:
- Website giới thiệu
- Hồ sơ năng lực
- Nền tảng công khai hoạt động
- Nền tảng minh bạch
- Kênh kết nối tình nguyện viên
- Kênh kết nối đối tác
- Nền tảng có thể mở rộng trong tương lai

---

# PHẦN A — CÁCH LÀM VIỆC BẮT BUỘC

## 1. Trước khi code

Đọc toàn bộ:
1. `README.md`
2. `02-WEBSITE-ROADMAP.md`
3. `03-DATABASE-SUPABASE.md`
4. File này

Sau đó:
- Tóm tắt hiểu biết
- Liệt kê assumptions
- Liệt kê dữ liệu còn thiếu
- Liệt kê rủi ro
- Lập TODO theo phase

Không code ngay nếu cấu trúc project hiện tại mâu thuẫn với tài liệu.

## 2. Không tự bịa dữ liệu

Không tự tạo số liệu production cho:
- thành viên
- dự án
- người thụ hưởng
- số tiền
- địa phương
- đối tác
- lịch sử thành lập

Nếu cần để test:
- dùng placeholder rõ ràng
- prefix `DEMO`
- hoặc giữ số 0

## 3. Không bật donation hoàn chỉnh

Thông tin ngân hàng hiện chưa đủ.

Chỉ được tạo UI skeleton/disabled state.

Không hiển thị thông tin chuyển khoản chính thức cho đến khi user xác nhận đủ:
- số tài khoản
- tên chủ tài khoản
- ngân hàng
- QR
- cơ chế minh bạch

## 4. Không over-engineer

Phase 1 phải static-first.

Không tự thêm:
- Prisma
- Redux
- Zustand
- GraphQL
- CMS
- auth
- payment
- Docker
- monorepo

trừ khi có lý do rõ ràng hoặc user yêu cầu.

---

# PHẦN B — TECH STACK

Bắt đầu với:

- Next.js
- TypeScript
- Tailwind CSS
- App Router
- Be Vietnam Pro
- Lucide Icons
- Local content/data
- Git-ready
- Vercel-ready

Supabase chỉ kết nối khi được yêu cầu.

---

# PHẦN C — DESIGN SYSTEM

## Brand

### Primary
Green:
`#2F6B2F`

### Accent
Pink:
`#E91E63`

### Base
White

### Surface
Warm off-white / very light green

Có thể tinh chỉnh màu nếu cần accessibility, nhưng phải giữ nhận diện xanh + hồng.

## Style

Keyword:
**Humanitarian × Youth × Vietnamese**

UI:
- clean
- emotional
- trustworthy
- mobile-first
- editorial nhẹ
- nhiều ảnh thật
- khoảng trắng rõ
- card mềm
- animation nhẹ

Không:
- cyberpunk
- neon
- SaaS dashboard look
- stock-photo generic
- excessive gradients
- glowing UI
- quá nhiều glassmorphism

## Typography
Primary:
Be Vietnam Pro

---

# PHẦN D — WEBSITE STRUCTURE

## Navbar
- Logo
- Về chúng tôi
- Hoạt động
- Dự án
- Hành trình
- Minh bạch
- CTA: Đồng hành

## Homepage sections
1. Hero
2. Story
3. Mission
4. Impact
5. Activities
6. Featured projects
7. Stories
8. Transparency
9. Team
10. Partners
11. CTA
12. Footer

## Main routes
- `/`
- `/ve-chung-toi`
- `/hoat-dong`
- `/du-an`
- `/du-an/[slug]`
- `/hanh-trinh`
- `/hanh-trinh/[slug]`
- `/minh-bach`
- `/dong-hanh`
- `/lien-he`

---

# PHẦN E — CONTENT

## Hero

Eyebrow:
**CÂU LẠC BỘ THIỆN NGUYỆN HOA TRÊN ĐÁ**

Main:
**Từ đá nở hoa**
**Từ tâm lan tỏa**

Description:
"Kết nối những trái tim nhiệt huyết, cùng sẻ chia yêu thương và đồng hành với trẻ em, người dân cùng những hoàn cảnh còn nhiều khó khăn."

CTA:
- Khám phá hành trình
- Đồng hành cùng chúng tôi

## Story opening

"Có những bông hoa không lớn lên trong khu vườn màu mỡ mà vẫn mạnh mẽ nở giữa những vách đá khô cằn."

## Mission
- Chung tay vì cộng đồng
- Phát triển con người
- Kết nối và lan tỏa

## Values
- Yêu thương
- Trách nhiệm
- Đoàn kết
- Sáng tạo
- Bền bỉ

## Contact
Phone:
0379 163 913

Email:
hoatrendaclb@gmail.com

---

# PHẦN F — CODE QUALITY

Mỗi phase phải:
- `npm run lint`
- `npm run build`
- fix lỗi
- không bỏ warning nghiêm trọng
- kiểm tra responsive
- kiểm tra keyboard navigation cơ bản

Component:
- nhỏ
- có trách nhiệm rõ
- reusable khi hợp lý
- không abstract quá sớm

TypeScript:
- tránh `any`
- định nghĩa types cho project/story/team/report

---

# PHẦN G — SEO

Bắt buộc:
- metadata
- title template
- description
- canonical strategy
- OpenGraph
- Twitter metadata
- sitemap
- robots
- Organization structured data nếu dữ liệu đủ

Không bịa:
- address
- social profiles
- founding date

---

# PHẦN H — IMAGE POLICY

Ưu tiên ảnh hoạt động thật.

Logo:
- dùng asset gốc do user cung cấp
- không redraw bằng AI
- không thay đổi logo nếu không được yêu cầu

Poster:
- dùng làm tài liệu tham chiếu
- không biến poster thành layout website
- có thể để trong gallery/about

---

# PHẦN I — SUPABASE

Không kết nối trong Phase 1 nếu chưa được user yêu cầu.

Khi cần:
- đọc `03-DATABASE-SUPABASE.md`
- tạo migrations
- tạo types
- tạo Supabase client
- RLS
- Storage
- env
- Vercel env

Không expose service role key.

---

# PHẦN J — GITHUB / VERCEL

GitHub:
- user sẽ cung cấp repo sau

Vercel:
- user sẽ cung cấp project sau

Trước khi có:
- đảm bảo project build-ready
- không hardcode deployment URL
- không tạo git remote giả

---

# PHẦN K — WORKFLOW TỪ ĐẦU ĐẾN CUỐI

## Step 1 — Audit
- Đọc docs
- Audit repository
- Check package manager
- Check current state

## Step 2 — Plan
Xuất:
- Current state
- TODO
- Files to create
- Files to modify
- Risks

## Step 3 — Foundation
- Project structure
- Theme
- Typography
- Layout
- Header/Footer
- SEO base

## Step 4 — Homepage
Làm từng section.

## Step 5 — Core pages
Làm các page route.

## Step 6 — Local content system
Types + demo content.

## Step 7 — QA
- desktop
- tablet
- mobile
- empty state
- long content
- missing images

## Step 8 — Build
- lint
- build
- fix

## Step 9 — Report
Tạo báo cáo cuối task.

## Step 10 — Memory
Cập nhật `PROJECT-MEMORY.md`.

---

# PHẦN L — BÁO CÁO SAU MỖI TASK

Sau mỗi task lớn, trả về:

```md
## Completed
- ...

## Changed Files
- ...

## Decisions
- ...

## Known Issues
- ...

## Missing Data
- ...

## Next Recommended Step
- ...
```

Không chỉ nói "done".

---

# PHẦN M — PROJECT MEMORY

Tạo file:

`PROJECT-MEMORY.md`

Nếu chưa có.

Sau mỗi thay đổi lớn, append hoặc cập nhật:

```md
# Project Memory

## Current Status
...

## Architecture Decisions
...

## Brand Decisions
...

## Data Model Decisions
...

## Completed Features
...

## Pending Features
...

## Known Bugs
...

## Missing User Data
...

## Deployment
GitHub: NOT PROVIDED
Vercel: NOT PROVIDED
Supabase: NOT CONNECTED

## Last Updated
YYYY-MM-DD HH:mm
```

Memory phải đủ để một AI/code agent khác đọc và tiếp tục project mà không cần đoán.

Không lưu:
- password
- API key
- service role key
- token
- secret

---

# PHẦN N — CÁC DỮ LIỆU ĐANG THIẾU

Hiện chưa có:
- Ngày thành lập chính xác
- Phạm vi hoạt động
- Danh sách ban chủ nhiệm
- Facebook
- TikTok
- Zalo
- Ảnh hoạt động thật
- Dự án thật
- Số liệu impact
- Số tài khoản đầy đủ
- Tên chủ tài khoản
- QR ngân hàng
- Tình trạng pháp lý
- Đối tác

Hãy dùng empty state hoặc placeholder rõ ràng.

---

# PHẦN O — LỆNH KHỞI ĐỘNG CHO ANTIGRAVITY

Khi bắt đầu một repository mới, thực hiện theo trình tự:

1. Đọc 4 file tài liệu.
2. Xác nhận project requirements.
3. Tạo kế hoạch Phase 0 + Phase 1.
4. Khởi tạo Next.js TypeScript.
5. Cài Tailwind nếu template chưa có.
6. Thiết lập Be Vietnam Pro.
7. Tạo design tokens.
8. Tạo base layout.
9. Tạo header/footer.
10. Tạo homepage skeleton.
11. Tạo local types/data.
12. Implement toàn bộ homepage.
13. Implement các route chính.
14. SEO.
15. Responsive.
16. QA.
17. Lint/build.
18. Tạo `PROJECT-MEMORY.md`.
19. Báo cáo kết quả.
20. Dừng và hỏi user trước khi kết nối Supabase.

---

# FINAL PRINCIPLE

Đừng cố làm một website "nhiều tính năng".

Hãy làm một website:
- có cảm xúc
- có bằng chứng
- có cấu trúc
- minh bạch
- dễ bảo trì
- dễ mở rộng
- không bịa dữ liệu

Mục tiêu cuối:
**biến Hoa Trên Đá thành một tổ chức có hiện diện số đáng tin cậy và có thể phát triển lâu dài.**
