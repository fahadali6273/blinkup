export async function sendWhatsAppMessage(message: string) {
  const phoneNumber = '+917489673372'; // your business number
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}
