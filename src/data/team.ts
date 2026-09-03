import { TeamMember } from '../types';

export const teamMembers: TeamMember[] = [
  {
    id: 'bdh-1',
    fullName: 'Đoàn Xuân Lộc',
    role: 'Trưởng Ban Điều Hành',
    department: 'Ban Điều Hành',
    bio: 'Người đứng đầu câu lạc bộ, chịu trách nhiệm định hướng, điều hành và điều phối các hoạt động chung của Hoa Trên Đá.',
    avatarUrl: '/images/bdh_xuanloc.webp',
    displayOrder: 1,
    active: true,
  },
  {
    id: 'bdh-2',
    fullName: 'Phạm Minh Đức',
    role: 'Phó Ban Điều Hành',
    department: 'Ban Điều Hành',
    bio: 'Phó Ban điều hành, chịu trách nhiệm dẫn chương trình, tổ chức nhân sự và hỗ trợ điều phối các hoạt động thực địa.',
    avatarUrl: '/images/bdh_minhduc.webp',
    displayOrder: 2,
    active: true,
  },
  {
    id: 'bdh-3',
    fullName: 'Nguyễn Khánh Tuấn',
    role: 'Trưởng Ban Hậu Cần',
    department: 'Ban Điều Hành',
    bio: 'Trưởng Ban Hậu cần, phụ trách quản lý trang thiết bị, phân phối quà tặng và chuẩn bị hậu cần thực tế cho các dự án thiện nguyện.',
    avatarUrl: '/images/bdh_khanhtuan.webp',
    displayOrder: 3,
    active: true,
  },
  {
    id: 'bdh-4',
    fullName: 'Nguyễn Quang Hiếu',
    role: 'Trưởng Ban Truyền Thông',
    department: 'Ban Điều Hành',
    bio: 'Trưởng Ban Truyền thông, chịu trách nhiệm sản xuất nội dung hình ảnh, video hoạt động và lan tỏa thông điệp của Hoa Trên Đá.',
    avatarUrl: '/images/bdh_quanghieu.webp',
    displayOrder: 4,
    active: true,
  }
];
