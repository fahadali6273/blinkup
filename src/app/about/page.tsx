export const metadata = {
  title: 'About Us – BlinkUp',
  description: 'Learn more about BlinkUp, our mission and the areas we serve.',
}

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">About BlinkUp</h1>
      <p>
        BlinkUp was founded with a simple mission: to make home service
        bookings effortless and reliable. We believe everyone deserves
        access to skilled professionals who can help maintain and beautify
        their living spaces.
      </p>
      <h2 className="text-2xl font-semibold">Our Vision</h2>
      <p>
        We aspire to be the most trusted platform for home services across
        India, connecting homeowners with experienced technicians and
        craftsmen at the click of a button.
      </p>
      <h2 className="text-2xl font-semibold">Our Mission</h2>
      <p>
        To streamline the process of finding, booking and managing home
        services. We are committed to quality, transparency and customer
        satisfaction.
      </p>
      <h2 className="text-2xl font-semibold">Service Coverage</h2>
      <p>
        We currently serve major cities including Delhi, Mumbai, Bangalore,
        Hyderabad and Pune. Our network is growing rapidly—stay tuned as we
        expand to new cities.
      </p>
      <p>
        For any questions or business inquiries, feel free to{' '}
        <a href="https://wa.me/910000000000" className="text-primary underline">
          chat with us on WhatsApp
        </a>{' '}
        or email us at{' '}
        <a href="mailto:info@blinkuphome.com" className="text-primary underline">
          info@blinkuphome.com
        </a>.
      </p>
    </div>
  )
}