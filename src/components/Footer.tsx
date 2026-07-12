import Link from "next/link";
import { FiCompass, FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-lagoon-dark text-sand">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2 font-display text-xl font-semibold">
            <FiCompass className="text-amber" size={24} />
            TourNest
          </div>
          <p className="mt-3 text-sm text-sand/70">
            Handpicked journeys across Bangladesh&apos;s beaches, hills, and forests, planned with local care.
          </p>
          <div className="mt-4 flex gap-4 text-sand/80">
            <a href="#" aria-label="Facebook" className="hover:text-amber"><FiFacebook size={18} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-amber"><FiInstagram size={18} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-amber"><FiTwitter size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-display text-base font-semibold">Explore</h4>
          <ul className="space-y-2 text-sm text-sand/70">
            <li><Link href="/packages" className="hover:text-amber">All Packages</Link></li>
            <li><Link href="/packages?category=Beach" className="hover:text-amber">Beach Getaways</Link></li>
            <li><Link href="/packages?category=Mountain" className="hover:text-amber">Hill & Mountain</Link></li>
            <li><Link href="/packages?category=Adventure" className="hover:text-amber">Adventure Treks</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-base font-semibold">Company</h4>
          <ul className="space-y-2 text-sm text-sand/70">
            <li><Link href="/about" className="hover:text-amber">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-amber">Contact</Link></li>
            <li><Link href="/login" className="hover:text-amber">Log In</Link></li>
            <li><Link href="/register" className="hover:text-amber">Sign Up</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-base font-semibold">Get in Touch</h4>
          <ul className="space-y-3 text-sm text-sand/70">
            <li className="flex items-center gap-2"><FiMapPin size={16} className="text-amber" /> Gulshan, Dhaka, Bangladesh</li>
            <li className="flex items-center gap-2"><FiPhone size={16} className="text-amber" /> +880 1234-567890</li>
            <li className="flex items-center gap-2"><FiMail size={16} className="text-amber" /> hello@tournest.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sand/10 py-5 text-center text-xs text-sand/50">
        © {new Date().getFullYear()} TourNest. All rights reserved.
      </div>
    </footer>
  );
}
