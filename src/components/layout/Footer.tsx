import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ashramaLogo from "@/assets/ashrama-logo.png";

export const Footer = () => {
  return (
    <footer className="bg-earth-brown text-cream">
      {/* Main Footer */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Section - Logo & Identity */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-center mb-4">
              {/* Logo - Larger */}
              <img
                src={ashramaLogo}
                alt="Sri Aaroodha Tapobhumi – Jagadguru Sri Siddaroodha Swami Mahasamsthana"
                className="h-32 w-auto mb-4" // Larger logo (h-28 = 112px)
              />

              {/* Title and Subtitle - Below logo */}
              <div className="text-center">
                {/* Main Title - Same size */}
                <h3 className="font-kn-heading text-lg font-bold leading-tight mb-2">
                  ಶ್ರೀ ಆರೂಢ ತಪೋಭೂಮಿ,
                </h3>

                {/* Full Title - Smaller, Bold */}
                <h4 className="font-kn-heading text-sm font-bold leading-tight mb-1">
                  ಜಗದ್ಗುರು ಶ್ರೀ ಸಿದ್ದಾರೂಢ ಸ್ವಾಮಿ ಮಹಾಸಂಸ್ಥಾನ
                </h4>

                {/* Subtitle - Smaller, Regular */}
                <p className="font-kn-body text-sm text-cream/80 leading-tight">
                  ಸುಕ್ಷೇತ್ರ ಖಂಡೇರಾಯನಹಳ್ಳಿ
                </p>
              </div>
            </div>

            {/* Kannada Description Only - Smaller */}

            <div>
              <div className="text-center">
                <p className="font-kn-body text-xs text-cream/70 leading-relaxed">
                  ಆಧ್ಯಾತ್ಮಿಕ ಬೆಳವಣಿಗೆ, ಸೇವಾಭಾವ ಮತ್ತು ಸನಾತನ ವೇದಿಕ ಪರಂಪರೆಯ ಸಂರಕ್ಷಣೆಗೆ ಅರ್ಪಿತವಾದ ಪವಿತ್ರ ತಪೋಭೂಮಿ.
                </p>
              </div>
            </div>
          </div>


          {/* Quick Links */}
          <div>
            <h4 className="font-en-heading text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "About Ashrama", path: "/about" },
                { name: "Sri Siddaroodha Swamiji", path: "/swamiji" },
                { name: "Seva & Activities", path: "/seva" },
                { name: "Events & Programs", path: "/events" },
                { name: "Gallery", path: "/gallery" },
                { name: "Donate", path: "/donate" },
                { name: "Quotes", path: "/quotes" },
                { name: "Mangalarati", path: "/mangalarati" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-en-body text-sm text-cream/70 hover:text-saffron-light transition-colors hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-en-heading text-lg font-semibold mb-4">Contact Us</h4>
            <address className="not-italic">
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-cream/70">
                  <MapPin size={18} className="text-saffron-light flex-shrink-0 mt-0.5" />
                  <span className="font-en-body">
                    Sri Aaroodha Tapobhumi<br />
                    Sukshetra Khanderayanahalli<br />
                    Ranebennur Taluk, Haveri District<br />
                    Karnataka – 581145<br />
                    India
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm text-cream/70">
                  <Phone size={18} className="text-saffron-light flex-shrink-0" />
                  <span className="font-en-body">+91 98808 83852, +91 96639 46581</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-cream/70">
                  <Mail size={18} className="text-saffron-light flex-shrink-0 mt-0.5" />
                  <div className="font-en-body">
                    <a href="mailto:info@sriaaroodhatapobhomi.com" className="hover:text-saffron-light transition-colors">
                      info@sriaaroodhatapobhomi.com
                    </a>
                    <br />
                    <a href="mailto:sriaaroodhatapobhomi@gmail.com" className="hover:text-saffron-light transition-colors">
                      sriaaroodhatapobhomi@gmail.com
                    </a>
                  </div>
                </li>
              </ul>
            </address>
          </div>

          {/* Visiting Hours */}
          <div>
            <h4 className="font-en-heading text-lg font-semibold mb-4">Visiting Hours</h4>
            <div className="flex items-start gap-3 text-sm text-cream/70">
              <Clock size={18} className="text-saffron-light flex-shrink-0 mt-0.5" />
              <div className="font-en-body">
                <p className="mb-3">
                  <strong className="text-cream">Morning:</strong><br />
                  5:00 AM – 12:00 PM
                </p>
                <p>
                  <strong className="text-cream">Evening:</strong><br />
                  4:00 PM – 8:30 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Three Part Layout */}
      <div className="border-t border-cream/10">
        <div className="container-custom py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-sm">
            {/* Left - Copyright */}
            <div className="text-center md:text-left">
              <p className="font-en-body text-cream/70 leading-relaxed">
                © 2026 Sri Aaroodha Tapobhumi
              </p>
              <p className="font-en-body text-cream/60 text-xs leading-relaxed">
                Jagadguru Sri Siddaroodha Swami Mahasamsthana. All rights reserved.
              </p>
            </div>

            {/* Center - Devotional Line */}
            <div className="text-center">
              <p className="font-kn-body text-saffron-light font-semibold">
                ಓಂ ನಮಃ ಶಿವಾಯ <span className="font-en-body">| Om Namah Shivaya</span>
              </p>
            </div>

            {/* Right - Design Credit */}
            <div className="text-center md:text-right">
              <p className="font-en-body text-cream/60 text-xs">
                Designed By
              </p>
              <a
                href="https://jnanakashitechnologies.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-en-body text-cream/70 hover:text-saffron-light transition-colors hover:underline text-sm font-medium"
              >
                Jnanakashi Technologies Pvt. Ltd.
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
