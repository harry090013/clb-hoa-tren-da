import { FinancialReport } from '../types';

export const financialReports: FinancialReport[] = [
  {
    id: 'fr1',
    projectId: 'p2',
    projectTitle: 'Tủ Sách Ươm Mầm Trí Tuệ',
    title: 'Báo cáo quyết toán dự án Tủ Sách Ươm Mầm Trí Tuệ',
    reportYear: 2026,
    totalReceived: 31200000, // DEMO
    totalSpent: 30850000, // DEMO
    remainingBalance: 350000,
    publicNote: 'Số dư 350,000đ được chuyển vào quỹ chung để thực hiện các dự án nước sạch tiếp theo.',
    transactions: [
      {
        id: 't_f1',
        date: '2026-03-05',
        type: 'income',
        category: 'Quyên góp cộng đồng',
        amount: 15200000,
        description: 'Tiếp nhận quyên góp qua cổng đợt 1',
      },
      {
        id: 't_f2',
        date: '2026-03-12',
        type: 'income',
        category: 'Quyên góp cộng đồng',
        amount: 16000000,
        description: 'Tiếp nhận quyên góp qua cổng đợt 2',
      },
      {
        id: 't_f3',
        date: '2026-04-15',
        type: 'expense',
        category: 'Mua sách vở',
        amount: 18500000,
        description: 'Thanh toán hóa đơn sách từ NXB Kim Đồng',
        receiptUrl: '#',
      },
      {
        id: 't_f4',
        date: '2026-04-20',
        type: 'expense',
        category: 'Thi công kệ sách',
        amount: 8000000,
        description: 'Chi phí mua gỗ và công lắp ráp tủ sách tại chỗ',
        receiptUrl: '#',
      },
      {
        id: 't_f5',
        date: '2026-04-25',
        type: 'expense',
        category: 'Vận chuyển',
        amount: 4350000,
        description: 'Chi phí thuê xe vận chuyển hàng lên Yên Bái',
        receiptUrl: '#',
      }
    ]
  }
];
