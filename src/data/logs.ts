export interface AccessLog {
  id: string;
  userId: string;
  companyId: string;
  action: string;
  target: string;
  createdAt: string;
  result: "success" | "fail";
}

export interface DownloadLog {
  id: string;
  userId: string;
  fileName: string;
  count: number;
  reason: string;
  createdAt: string;
}

export const accessLogs: AccessLog[] = [
  {
    id: "L1",
    userId: "admin01",
    companyId: "C1",
    action: "조회",
    target: "USER123",
    createdAt: "2026-03-15",
    result: "success",
  },
];

export const downloadLogs: DownloadLog[] = [
  {
    id: "D1",
    userId: "corp01",
    fileName: "lead_list.xlsx",
    count: 120,
    reason: "상담 DB 확인",
    createdAt: "2026-03-15",
  },
];