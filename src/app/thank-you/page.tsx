import Link from 'next/link'

export const metadata = {
  title: 'Thank You – BlinkUp',
  description: 'Confirmation page after submitting a service request.',
}

export default function ThankYouPage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
      <p className="mb-6 text-gray-700">
        Your request has been received. Our team will get back to you shortly.
      </p>
      <Link
        href="https://wa.me/910000000000"
        target="_blank"
        rel="noreferrer"
        className="inline-block bg-secondary text-white px-6 py-3 rounded hover:bg-secondary-dark"
      >
        Chat on WhatsApp
      </Link>
    </div>
  )
}