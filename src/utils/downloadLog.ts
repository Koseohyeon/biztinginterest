export function saveDownloadLog(reason: string) {

  const logs =
    JSON.parse(localStorage.getItem("downloadLogs") || "[]");

  const log = {
    reason,
    date: new Date().toISOString(),
  };

  logs.push(log);

  localStorage.setItem(
    "downloadLogs",
    JSON.stringify(logs)
  );
}