import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import type { User } from "../data/users";

export function downloadExcel(users: User[]) {

  const ws = XLSX.utils.json_to_sheet(users);

  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, ws, "users");

  const buffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([buffer]);

  const today = new Date();

  const date =
    today.getFullYear() +
    String(today.getMonth() + 1).padStart(2, "0") +
    String(today.getDate()).padStart(2, "0");

  saveAs(blob, `회원목록_${date}.xlsx`);
}