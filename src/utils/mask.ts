export function maskName(name: string) {
  return name[0] + "*".repeat(name.length - 1);
}

export function maskPhone(phone: string) {
  const onlyNum = phone.replace(/[^0-9]/g, ""); // 숫자만 추출

  return onlyNum.replace(
    /(\d{3})(\d{4})(\d{4})/,
    "$1-****-$3"
  );
}

export function maskEmail(email: string) {
  const [id, domain] = email.split("@");
  return id.slice(0, 2) + "***@" + domain;
}

