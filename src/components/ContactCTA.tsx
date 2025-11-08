import Link from 'next/link';

export default function ContactCTA() {
  return (
    <div className="text-center px-4">
      <h2 className="text-3xl font-bold mb-4">Need Help With a Home Service?</h2>
      <p className="mb-6 text-lg">Call us or chat on WhatsApp to get instant assistance!</p>
      <div className="flex justify-center gap-4">
        <a
          href="https://wa.me/917489673372"
          target="_blank"
          className="bg-green-600 px-6 py-3 rounded-lg text-white hover:bg-green-700"
        >
          Chat on WhatsApp
        </a>
        <Link
          href="/contact"
          className="bg-white text-primary px-6 py-3 rounded-lg border border-primary hover:bg-primary hover:text-white"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
