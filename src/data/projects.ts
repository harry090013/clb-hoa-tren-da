import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Áo Ấm Cho Em — Hà Giang 2026',
    slug: 'ao-am-cho-em-ha-giang-2026',
    excerpt: 'Quyên góp áo ấm, chăn phao và đồ dùng học tập cho học sinh tiểu học tại vùng cao Hà Giang.',
    content: `Dự án "Áo Ấm Cho Em" nhằm mang lại mùa đông ấm áp cho các em nhỏ tại điểm trường khó khăn ở Hà Giang. Chúng tôi kêu gọi sự chung tay ủng hộ áo ấm mới, chăn bông, ủng nhựa và đồ dùng học tập. Mọi hoạt động thu gom, phân loại và trao tặng sẽ được thực hiện trực tiếp bởi tình nguyện viên CLB Hoa Trên Đá.

Đây là chương trình thường niên mang nhiều ý nghĩa nhân văn, trực tiếp giúp đỡ hàng trăm học sinh vững bước tới trường trong những ngày đông giá rét.`,
    coverImage: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800',
    location: 'Huyện Đồng Văn, Tỉnh Hà Giang',
    startDate: '2026-10-01',
    endDate: '2026-12-15',
    status: 'published',
    projectStatus: 'fundraising',
    targetAmount: 50000000,
    receivedAmount: 18500000, // DEMO / PLACEHOLDER
    spentAmount: 0,
    beneficiaryCount: 350,
    featured: true,
    publishedAt: '2026-08-01T00:00:00Z',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: 'p2',
    title: 'Tủ Sách Ươm Mầm Trí Tuệ',
    slug: 'tu-sach-uom-mam-tri-tue',
    excerpt: 'Xây dựng không gian đọc sách thân thiện và trao tặng tủ sách tại các trường học vùng cao khó khăn.',
    content: `Dự án thiết lập các tủ sách thân thiện với nhiều đầu sách đa dạng như truyện tranh giáo dục, sách khoa học thường thức, văn học thiếu nhi tại các trường tiểu học và THCS khó khăn. 

Bên cạnh trao tặng sách, CLB còn tổ chức các buổi giao lưu kể chuyện, hướng dẫn đọc sách và các hoạt động vẽ tranh định kỳ để nuôi dưỡng thói quen đọc sách cho các em.`,
    coverImage: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=800',
    location: 'Huyện Trạm Tấu, Tỉnh Yên Bái',
    startDate: '2026-03-01',
    endDate: '2026-06-30',
    status: 'published',
    projectStatus: 'completed',
    targetAmount: 30000000,
    receivedAmount: 31200000, // DEMO / PLACEHOLDER
    spentAmount: 30850000, // DEMO / PLACEHOLDER
    beneficiaryCount: 500,
    featured: false,
    publishedAt: '2026-03-01T00:00:00Z',
    createdAt: '2026-03-01T00:00:00Z',
    updatedAt: '2026-06-30T00:00:00Z',
  },
  {
    id: 'p3',
    title: 'Nước Sạch Học Đường',
    slug: 'nuoc-sach-hoc-duong',
    excerpt: 'Lắp đặt hệ thống lọc nước sạch công nghiệp tinh khiết cho các điểm trường chưa có nguồn nước hợp vệ sinh.',
    content: `Hỗ trợ lắp đặt máy lọc nước RO công suất lớn cho học sinh và giáo viên tại vùng sâu vùng xa, bảo vệ sức khỏe học đường, giảm thiểu các bệnh lây truyền qua nguồn nước bị ô nhiễm.`,
    coverImage: 'https://images.unsplash.com/photo-1518364538800-6bcb3f25da49?auto=format&fit=crop&q=80&w=800',
    location: 'Huyện Mường Nhé, Tỉnh Điện Biên',
    startDate: '2026-11-01',
    endDate: '2026-12-30',
    status: 'published',
    projectStatus: 'upcoming',
    targetAmount: 40000000,
    receivedAmount: 0,
    spentAmount: 0,
    beneficiaryCount: 400,
    featured: true,
    publishedAt: '2026-08-10T00:00:00Z',
    createdAt: '2026-08-10T00:00:00Z',
    updatedAt: '2026-08-10T00:00:00Z',
  }
];
