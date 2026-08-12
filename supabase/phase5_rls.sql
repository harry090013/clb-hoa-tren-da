-- 1. BẬT RLS CHO CÁC BẢNG LƯU ĐƠN ĐĂNG KÝ
ALTER TABLE volunteer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnership_requests ENABLE ROW LEVEL SECURITY;

-- 2. CHO PHÉP MỌI NGƯỜI ĐƯỢC PHÉP NỘP ĐƠN (INSERT) KHÔNG CẦN ĐĂNG NHẬP
DROP POLICY IF EXISTS "Cho phép nộp đơn công khai" ON volunteer_applications;
CREATE POLICY "Cho phép nộp đơn công khai" ON volunteer_applications FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Cho phép nộp đơn công khai" ON partnership_requests;
CREATE POLICY "Cho phép nộp đơn công khai" ON partnership_requests FOR INSERT WITH CHECK (true);

-- 3. CHỈ CHO PHÉP ADMIN (ĐÃ ĐĂNG NHẬP) TRUY XUẤT, SỬA, XÓA ĐƠN ĐĂNG KÝ (ALL)
DROP POLICY IF EXISTS "Chỉ admin được phép quản lý" ON volunteer_applications;
CREATE POLICY "Chỉ admin được phép quản lý" ON volunteer_applications FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Chỉ admin được phép quản lý" ON partnership_requests;
CREATE POLICY "Chỉ admin được phép quản lý" ON partnership_requests FOR ALL TO authenticated USING (true) WITH CHECK (true);
