export interface AdminUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  createdAt: string;
}

export const AdminUsers: AdminUser[] = [
  {
    id: "U1",
    name: "김민수",
    phone: "010-1234-1234",
    email: "minsu@naver.com",
    company: "ABC쇼핑몰",
    createdAt: "2026-03-01",
  },
  {
    id: "U2",
    name: "이서연",
    phone: "010-2222-3333",
    email: "seoyeon@naver.com",
    company: "벤츠 딜러",
    createdAt: "2026-03-02",
  },
];