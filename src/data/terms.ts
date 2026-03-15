export interface Terms {
  id: string;
  version: string;
  status: "active" | "inactive";
  author: string;
  createdAt: string;
}

export const termsList: Terms[] = [
  {
    id: "T1",
    version: "v1.0",
    status: "active",
    author: "admin",
    createdAt: "2026-03-01",
  },
  {
    id: "T2",
    version: "v0.9",
    status: "inactive",
    author: "admin",
    createdAt: "2026-02-01",
  },
];