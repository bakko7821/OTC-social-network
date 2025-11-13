export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, '');

  if (!cleaned.startsWith('+')) return phone;

  const digits = cleaned.slice(1);

  return (
    '+' +
    digits
      .replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')
      .trim()
  );
}
