import { Facebook, Instagram, Linkedin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold mb-3">BlinkUp</h2>
          <p className="text-gray-200 text-sm leading-relaxed">
            Your one-stop solution for all home services including Painting,
            Interior Design, Cleaning, and Repairs — delivered right to your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 border-b border-white/30 pb-1">
            Useful Links
          </h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li><a href="/" className="hover:text-yellow-300 transition">Home</a></li>
            <li><a href="/services" className="hover:text-yellow-300 transition">Services</a></li>
            <li><a href="/gallery" className="hover:text-yellow-300 transition">Gallery</a></li>
            <li><a href="/contact" className="hover:text-yellow-300 transition">Contact</a></li>
            <li><a href="/terms" className="hover:text-yellow-300 transition">Terms & Conditions</a></li>
            <li><a href="/privacy" className="hover:text-yellow-300 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 border-b border-white/30 pb-1">
            Contact Us
          </h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} /> +91 74896 73372
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> info@blinkuphome.com
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@blinkuphome.com
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 border-b border-white/30 pb-1">
            Follow Us
          </h3>
          <div className="flex gap-4 mt-2">
            <a
              href="https://www.facebook.com/profile.php?id=61576752742431"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition"
            >
              <Facebook size={22} />
            </a>
            <a
              href="https://www.instagram.com/blinkup.home"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition"
            >
              <Instagram size={22} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition"
            >
              <Linkedin size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm text-gray-300 mt-10 border-t border-white/20 pt-4">
        © {new Date().getFullYear()} BlinkUp. All Rights Reserved.
      </div>
    </footer>
  );
}
