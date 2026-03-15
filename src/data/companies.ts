export interface Company {
  id: string;
  name: string;
  lastLogin: string;
  lastDownload: string;
  status: "active" | "deleted";
}

export const companies: Company[] = [
  {
    id: "C1",
    name: "ABC 쇼핑몰",
    lastLogin: "2026-03-14",
    lastDownload: "2026-03-13",
    status: "active",
  },
  {
    id: "C2",
    name: "벤츠 딜러사",
    lastLogin: "2026-03-15",
    lastDownload: "2026-03-15",
    status: "active",
  },
];