-- 1. TẠO BẢNG DANH MỤC BÀI VIẾT
CREATE TABLE IF NOT EXISTS public.story_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. BẬT BẢO MẬT RLS CHO BẢNG DANH MỤC
ALTER TABLE story_categories ENABLE ROW LEVEL SECURITY;

-- 3. THIẾT LẬP CHÍNH SÁCH TRUY CẬP RLS
DROP POLICY IF EXISTS "Cho phép đọc công khai" ON story_categories;
CREATE POLICY "Cho phép đọc công khai" ON story_categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Chỉ cho phép Admin ghi dữ liệu" ON story_categories;
CREATE POLICY "Chỉ cho phép Admin ghi dữ liệu" ON story_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. THÊM CÁC DANH MỤC MẶC ĐỊNH SẴN CÓ
INSERT INTO story_categories (id, name, slug, display_order) VALUES
('a1111111-1111-1111-1111-111111111111', 'Nhật ký hành trình', 'nhat-ky-hanh-trinh', 1),
('a2222222-2222-2222-2222-222222222222', 'Góc nhìn thành viên', 'goc-nhin-thanh-vien', 2),
('a3333333-3333-3333-3333-333333333333', 'Tin tức hoạt động', 'tin-tuc-hoat-dong', 3)
ON CONFLICT (slug) DO NOTHING;

-- 5. THÊM KHÓA NGOẠI LIÊN KẾT DANH MỤC CHO BẢNG STORIES
ALTER TABLE stories ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES story_categories(id) ON DELETE SET NULL;

-- 6. ĐỒNG BỘ DỮ LIỆU CŨ SANG KHÓA NGOẠI MỚI
UPDATE stories SET category_id = 'a1111111-1111-1111-1111-111111111111' WHERE story_type = 'Nhật ký hành trình' AND category_id IS NULL;
UPDATE stories SET category_id = 'a2222222-2222-2222-2222-222222222222' WHERE story_type = 'Góc nhìn thành viên' AND category_id IS NULL;
UPDATE stories SET category_id = 'a3333333-3333-3333-3333-333333333333' WHERE story_type = 'Tin tức hoạt động' AND category_id IS NULL;
