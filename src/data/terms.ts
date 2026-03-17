export interface Terms {
  id: string;
  name: string;
  version: string;
  status: "active" | "inactive";
  author: string;
  createdAt: Date;
}

// 날짜 유틸 (n일 전 날짜 생성)
const daysAgo = (days: number): Date => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
};

export const termsList: Terms[] = [
  {
    id: "T1",
    version: "v1.0",
    name: "서비스 이용약관",
    status: "active",
    author: "admin",
    createdAt: new Date(), // ✅ 오늘
  },
  {
    id: "T2",
    version: "v0.9",
    name: "서비스 이용약관2",
    status: "inactive",
    author: "admin",
    createdAt: daysAgo(7), // ✅ 7일 전
  },
];