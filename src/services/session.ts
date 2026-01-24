let currentPhone: string | null = null;

export function setUserPhone(phone: string) {
  currentPhone = phone;
}

export function getUserPhone(): string | null {
  return currentPhone;
}

export function clearSession() {
  currentPhone = null;
}

