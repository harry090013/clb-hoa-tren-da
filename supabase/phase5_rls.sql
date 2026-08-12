-- 1. TẠO CÁC BẢNG NẾU CHƯA TỒN TẠI TRÊN DATABASE
CREATE TABLE IF NOT EXISTS public.volunteer_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  birth_year INTEGER,
  location TEXT,
  skills TEXT[],
  motivation TEXT,
  availability TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  internal_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.partnership_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  partnership_type TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  internal_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. BẬT RLS CHO CÁC BẢNG LƯU ĐƠN ĐĂNG KÝ
ALTER TABLE volunteer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnership_requests ENABLE ROW LEVEL SECURITY;

-- 3. CHO PHÉP MỌI NGƯỜI ĐƯỢC PHÉP NỘP ĐƠN (INSERT) KHÔNG CẦN ĐĂNG NHẬP
DROP POLICY IF EXISTS "Cho phép nộp đơn công khai" ON volunteer_applications;
CREATE POLICY "Cho phép nộp đơn công khai" ON volunteer_applications FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Cho phép nộp đơn công khai" ON partnership_requests;
CREATE POLICY "Cho phép nộp đơn công khai" ON partnership_requests FOR INSERT WITH CHECK (true);

-- 4. CHỈ CHO PHÉP ADMIN (ĐÃ ĐĂNG NHẬP) TRUY XUẤT, SỬA, XÓA ĐƠN ĐĂNG KÝ (ALL)
DROP POLICY IF EXISTS "Chỉ admin được phép quản lý" ON volunteer_applications;
CREATE POLICY "Chỉ admin được phép quản lý" ON volunteer_applications FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Chỉ admin được phép quản lý" ON partnership_requests;
CREATE POLICY "Chỉ admin được phép quản lý" ON partnership_requests FOR ALL TO authenticated USING (true) WITH CHECK (true);
