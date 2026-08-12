import { Partner } from '../types';

export const partners: Partner[] = [
  {
    id: 'pt1',
    name: 'Quỹ Từ Thiện Sen Xanh',
    logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aba9?auto=format&fit=crop&q=80&w=150',
    description: 'Đối tác chiến lược tài trợ các trang thiết bị lọc nước sạch.',
    partnerType: 'Quỹ đầu tư cộng đồng',
    displayOrder: 1,
    active: true,
  },
  {
    id: 'pt2',
    name: 'Nhà xuất bản Kim Đồng',
    logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aba9?auto=format&fit=crop&q=80&w=150',
    description: 'Đồng hành cung cấp hàng nghìn tựa sách thiếu nhi giảm giá cho dự án tủ sách.',
    partnerType: 'Nhà tài trợ hiện vật',
    displayOrder: 2,
    active: true,
  }
];
