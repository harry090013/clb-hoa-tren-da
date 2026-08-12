-- 1. DROP EXISTING TABLES (IF ANY)
DROP TABLE IF EXISTS volunteer_applications CASCADE;
DROP TABLE IF EXISTS partnership_requests CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS media CASCADE;
DROP TABLE IF EXISTS financial_transactions CASCADE;
DROP TABLE IF EXISTS financial_reports CASCADE;
DROP TABLE IF EXISTS impact_stats CASCADE;
DROP TABLE IF EXISTS partners CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS stories CASCADE;
DROP TABLE IF EXISTS projects CASCADE;

-- 2. CREATE TABLES

-- Projects Table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  location TEXT,
  start_date DATE,
  end_date DATE,
  status TEXT NOT NULL DEFAULT 'draft',
  project_status TEXT,
  target_amount NUMERIC,
  received_amount NUMERIC,
  spent_amount NUMERIC,
  beneficiary_count INTEGER,
  featured BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Stories Table
CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  author_name TEXT,
  story_type TEXT,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  featured BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Team Members Table
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  role TEXT,
  department TEXT,
  bio TEXT,
  avatar_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Partners Table
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  description TEXT,
  partner_type TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Impact Statistics Table
CREATE TABLE impact_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  value NUMERIC NOT NULL DEFAULT 0,
  suffix TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_public BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Financial Reports Table
CREATE TABLE financial_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  report_year INTEGER,
  total_received NUMERIC NOT NULL DEFAULT 0,
  total_spent NUMERIC NOT NULL DEFAULT 0,
  public_note TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Financial Transactions Table
CREATE TABLE financial_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES financial_reports(id) ON DELETE CASCADE,
  transaction_date DATE NOT NULL,
  transaction_type TEXT NOT NULL,
  category TEXT,
  amount NUMERIC NOT NULL CHECK (amount >= 0),
  description TEXT,
  receipt_url TEXT,
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- 3. SEED INITIAL MOCK DATA

-- Projects
INSERT INTO projects (id, title, slug, excerpt, content, cover_image, location, start_date, end_date, status, project_status, target_amount, received_amount, spent_amount, beneficiary_count, featured, published_at) VALUES
('b3017a02-2321-4ea6-89d8-9646452ee245', 'Áo Ấm Cho Em — Hà Giang 2026', 'ao-am-cho-em-ha-giang-2026', 'Quyên góp áo ấm, chăn phao và đồ dùng học tập cho học sinh tiểu học tại vùng cao Hà Giang.', 'Dự án "Áo Ấm Cho Em" nhằm mang lại mùa đông ấm áp cho các em nhỏ tại điểm trường khó khăn ở Hà Giang. Chúng tôi kêu gọi sự chung tay ủng hộ áo ấm mới, chăn bông, ủng nhựa và đồ dùng học tập. Mọi hoạt động thu gom, phân loại và trao tặng sẽ được thực hiện trực tiếp bởi tình nguyện viên CLB Hoa Trên Đá.

Đây là chương trình thường niên mang nhiều ý nghĩa nhân văn, trực tiếp giúp đỡ hàng trăm học sinh vững bước tới trường trong những ngày đông giá rét.', 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800', 'Huyện Đồng Văn, Tỉnh Hà Giang', '2026-10-01', '2026-12-15', 'published', 'fundraising', 50000000, 18500000, 0, 350, true, now()),

('91e3e5bc-30a2-4a0b-85ad-290029b35b62', 'Tủ Sách Ươm Mầm Trí Tuệ', 'tu-sach-uom-mam-tri-tue', 'Xây dựng không gian đọc sách thân thiện và trao tặng tủ sách tại các trường học vùng cao khó khăn.', 'Dự án thiết lập các tủ sách thân thiện với nhiều đầu sách đa dạng như truyện tranh giáo dục, sách khoa học thường thức, văn học thiếu nhi tại các trường tiểu học và THCS khó khăn. 

Bên cạnh trao tặng sách, CLB còn tổ chức các buổi giao lưu kể chuyện, hướng dẫn đọc sách và các hoạt động vẽ tranh định kỳ để nuôi dưỡng thói quen đọc sách cho các em.', 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=800', 'Huyện Trạm Tấu, Tỉnh Yên Bái', '2026-03-01', '2026-06-30', 'published', 'completed', 30000000, 31200000, 30850000, 500, false, now()),

('c9b3a0fe-45a8-4bb9-ba54-b6cd78a9c3d4', 'Nước Sạch Học Đường', 'nuoc-sach-hoc-duong', 'Lắp đặt hệ thống lọc nước sạch công nghiệp tinh khiết cho các điểm trường chưa có nguồn nước hợp vệ sinh.', 'Hỗ trợ lắp đặt máy lọc nước RO công suất lớn cho học sinh và giáo viên tại vùng sâu vùng xa, bảo vệ sức khỏe học đường, giảm thiểu các bệnh lây truyền qua nguồn nước bị ô nhiễm.', 'https://images.unsplash.com/photo-1518364538800-6bcb3f25da49?auto=format&fit=crop&q=80&w=800', 'Huyện Mường Nhé, Tỉnh Điện Biên', '2026-11-01', '2026-12-30', 'published', 'upcoming', 40000000, 0, 0, 400, true, now());

-- Stories
INSERT INTO stories (title, slug, excerpt, content, cover_image, author_name, story_type, project_id, featured, status, published_at) VALUES
('Hành Trình Vượt Đèo Trao Áo Ấm', 'hanh-trinh-vuot-deo-trao-ao-am', 'Những câu chuyện cảm xúc và bài học của các bạn tình nguyện viên trẻ khi lần đầu đặt chân đến bản cao.', 'Đó là một buổi sáng đầy sương mù tại Hà Giang. Đoàn xe của Hoa Trên Đá chất đầy những kiện hàng nặng trĩu. Quãng đường đèo dốc hiểm trở không làm vơi đi ngọn lửa nhiệt huyết trong tim chúng tôi.

Khi nhìn thấy nụ cười rạng rỡ của các em nhỏ khi đón nhận chiếc áo ấm mới tinh, mọi mệt mỏi dọc đường đi dường như tan biến hết. Với chúng tôi, thiện nguyện không chỉ là cho đi, mà còn là hành trình đi để thấu hiểu và trưởng thành hơn.', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800', 'Nguyễn Văn Nam (TN viên)', 'Nhật ký hành trình', 'b3017a02-2321-4ea6-89d8-9646452ee245', true, 'published', now()),

('Khi Con Chữ Nở Hoa Giữa Đá Núi', 'khi-con-chu-no-hoa-giua-da-nui', 'Lắp đặt tủ sách Ươm Mầm Trí Tuệ tại điểm trường Trạm Tấu - Nơi bắt đầu những ước mơ nhỏ bé.', 'Tủ sách đã được bàn giao trong sự háo hức của hàng trăm học sinh nghèo. Những cuốn truyện tranh, những quyển sách khoa học đã mở ra trước mắt các em một chân trời tri thức mới, thắp sáng lên hy vọng về một tương lai tươi sáng hơn.', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800', 'Trần Thị Mai', 'Góc nhìn thành viên', '91e3e5bc-30a2-4a0b-85ad-290029b35b62', false, 'published', now());

-- Team Members
INSERT INTO team_members (full_name, role, department, bio, avatar_url, display_order, active) VALUES
('Lê Minh Triết', 'Trưởng Ban Điều Hành', 'Ban Điều Hành', 'Người sáng lập và định hướng các hoạt động thiện nguyện bền vững của CLB Hoa Trên Đá.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300', 1, true),
('Hoàng Thu Trang', 'Trưởng Ban Truyền Thông', 'Ban Truyền Thông', 'Phụ trách truyền tải hình ảnh, câu chuyện nhân văn của dự án đến với cộng đồng.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300', 2, true),
('Phạm Minh Đức', 'Trưởng Ban Đối Ngoại', 'Ban Đối Ngoại', 'Kết nối các nhà hảo tâm, đối tác đồng hành để hiện thực hóa các dự án hỗ trợ cộng đồng.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300', 3, true);

-- Partners
INSERT INTO partners (name, logo_url, partner_type, display_order, active) VALUES
('Quỹ Từ Thiện Sen Xanh', 'https://images.unsplash.com/photo-1599305445671-ac291c95aba9?auto=format&fit=crop&q=80&w=150', 'Quỹ đầu tư cộng đồng', 1, true),
('Nhà xuất bản Kim Đồng', 'https://images.unsplash.com/photo-1599305445671-ac291c95aba9?auto=format&fit=crop&q=80&w=150', 'Nhà tài trợ hiện vật', 2, true);

-- Impact Stats
INSERT INTO impact_stats (key, label, value, suffix, display_order) VALUES
('projects_completed', 'Dự án hoàn thành', 12, '+', 1),
('volunteers', 'Tình nguyện viên', 150, '+', 2),
('beneficiaries', 'Trẻ em & Người thụ hưởng', 2500, '+', 3),
('locations', 'Tỉnh thành hoạt động', 5, '', 4);

-- Financial Reports
INSERT INTO financial_reports (id, project_id, title, report_year, total_received, total_spent, public_note, status, published_at) VALUES
('73c2a0fe-aa58-4bb9-ba54-b6cd78a9c3d4', '91e3e5bc-30a2-4a0b-85ad-290029b35b62', 'Báo cáo quyết toán dự án Tủ Sách Ươm Mầm Trí Tuệ', 2026, 31200000, 30850000, 'Số dư 350,000đ được chuyển vào quỹ chung để thực hiện các dự án nước sạch tiếp theo.', 'published', now());

-- Financial Transactions
INSERT INTO financial_transactions (report_id, transaction_date, transaction_type, category, amount, description, receipt_url) VALUES
('73c2a0fe-aa58-4bb9-ba54-b6cd78a9c3d4', '2026-03-05', 'income', 'Quyên góp cộng đồng', 15200000, 'Tiếp nhận quyên góp qua cổng đợt 1', '#'),
('73c2a0fe-aa58-4bb9-ba54-b6cd78a9c3d4', '2026-03-12', 'income', 'Quyên góp cộng đồng', 16000000, 'Tiếp nhận quyên góp qua cổng đợt 2', '#'),
('73c2a0fe-aa58-4bb9-ba54-b6cd78a9c3d4', '2026-04-15', 'expense', 'Mua sách vở', 18500000, 'Thanh toán hóa đơn sách từ NXB Kim Đồng', '#'),
('73c2a0fe-aa58-4bb9-ba54-b6cd78a9c3d4', '2026-04-20', 'expense', 'Thi công kệ sách', 8000000, 'Chi phí mua gỗ và công lắp ráp tủ sách tại chỗ', '#'),
('73c2a0fe-aa58-4bb9-ba54-b6cd78a9c3d4', '2026-04-25', 'expense', 'Vận chuyển', 4350000, 'Chi phí thuê xe vận chuyển hàng lên Yên Bái', '#');

-- Profiles Table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'editor',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger to automatically create a profile record when a new user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, active)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'admin', true);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
