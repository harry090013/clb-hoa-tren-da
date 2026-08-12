import { TeamMember } from '../types';

export const teamMembers: TeamMember[] = [
  {
    id: 't1',
    fullName: 'Lê Minh Triết',
    role: 'Trưởng Ban Điều Hành',
    department: 'Ban Điều Hành',
    bio: 'Người sáng lập và định hướng các hoạt động thiện nguyện bền vững của CLB Hoa Trên Đá.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    displayOrder: 1,
    active: true,
  },
  {
    id: 't2',
    fullName: 'Hoàng Thu Trang',
    role: 'Trưởng Ban Truyền Thông',
    department: 'Ban Truyền Thông',
    bio: 'Phụ trách truyền tải hình ảnh, câu chuyện nhân văn của dự án đến với cộng đồng.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
    displayOrder: 2,
    active: true,
  },
  {
    id: 't3',
    fullName: 'Phạm Minh Đức',
    role: 'Trưởng Ban Đối Ngoại',
    department: 'Ban Đối Ngoại',
    bio: 'Kết nối các nhà hảo tâm, đối tác đồng hành để hiện thực hóa các dự án hỗ trợ cộng đồng.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    displayOrder: 3,
    active: true,
  }
];
