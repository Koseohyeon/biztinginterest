import type{ ProvisionHistoryItem } from './../types/provision'

export const provisionHistoryMock: ProvisionHistoryItem[] = [
  {
    id: 1,
    companyName: 'ABC 마케팅',
    providedAt: '2024-01-12',
    purpose: '이벤트 안내',
    dataType: '이름, 연락처',
  },
  {
    id: 2,
    companyName: 'XYZ 보험',
    providedAt: '2024-02-03',
    purpose: '보험 상품 안내',
    dataType: '이름, 연락처, 생년월일',
  },
  {
    id: 3,
    companyName: '헬스케어랩',
    providedAt: '2024-03-18',
    purpose: '건강 정보 제공',
    dataType: '이름, 연락처',
  },
]