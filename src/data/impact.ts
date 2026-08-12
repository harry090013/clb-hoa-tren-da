import { ImpactStat } from '../types';

export const impactStats: ImpactStat[] = [
  {
    id: 'i1',
    key: 'projects_completed',
    label: 'Dự án hoàn thành',
    value: 12, // DEMO
    suffix: '+',
    displayOrder: 1,
  },
  {
    id: 'i2',
    key: 'volunteers',
    label: 'Tình nguyện viên',
    value: 150, // DEMO
    suffix: '+',
    displayOrder: 2,
  },
  {
    id: 'i3',
    key: 'beneficiaries',
    label: 'Trẻ em & Người thụ hưởng',
    value: 2500, // DEMO
    suffix: '+',
    displayOrder: 3,
  },
  {
    id: 'i4',
    key: 'locations',
    label: 'Tỉnh thành hoạt động',
    value: 5, // DEMO
    suffix: '',
    displayOrder: 4,
  }
];
