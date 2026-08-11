export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function formatNaira(amount) {
  return `₦${Number(amount).toLocaleString('en-NG')}`;
}

export function getWhatsAppLink(number, message = '') {
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${number}${text}`;
}
