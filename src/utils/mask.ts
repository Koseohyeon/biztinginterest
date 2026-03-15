export function maskName(name: string) {
  return name[0] + "*".repeat(name.length - 1);
}

export function maskPhone(phone: string) {
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-****-$3");
}

export function maskEmail(email: string) {
  const [id, domain] = email.split("@");
  return id.slice(0, 2) + "***@" + domain;
}

