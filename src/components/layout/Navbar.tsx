import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ashramaLogo from "@/assets/ashrama-logo.png";

const navLinks = [
  { name: "Home", nameKn: "ಮುಖಪುಟ", path: "/" },
  { name: "About", nameKn: "ನಮ್ಮ ಬಗ್ಗೆ", path: "/about" },
  { name: "Swamiji", nameKn: "ಸ್ವಾಮೀಜಿ", path: "/swamiji" },
  { name: "Seva", nameKn: "ಸೇವೆ", path: "/seva" },
  { name: "Events", nameKn: "ಕಾರ್ಯಕ್ರಮಗಳು", path: "/events" },
  { name: "Gallery", nameKn: "ಗ್ಯಾಲರಿ", path: "/gallery" },
  { name: "Trust", nameKn: "ಟ್ರಸ್ಟ್", path: "/trust" },
  { name: "Contact", nameKn: "ಸಂಪರ್ಕ", path: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-cream/95 backdrop-blur-md sticky top-0 z-50 border-b border-primary/10">
      <div className="container-custom">
        <div className="flex items-center justify-between h-24 md:h-32">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={ashramaLogo}
              alt="ಶ್ರೀ ಆರೂಢ ತಪೋಭೂಮಿ Logo"
              className="h-28 w-auto"
            />
            <div className="flex flex-col">
              <span className="font-kannada text-lg md:text-xl font-bold text-primary leading-tight">
                ಶ್ರೀ ಆರೂಢ ತಪೋಭೂಮಿ
              </span>
              <span className="font-kannada text-xs md:text-sm text-muted-foreground">
                ಸುಕ್ಷೇತ್ರ ಖಂಡೇರಾಯನಹಳ್ಳಿ
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === link.path
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/donate">
              <Button variant="saffron" size="sm" className="ml-2">
                Donate
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-foreground hover:bg-primary/10"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${location.pathname === link.path
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                    }`}
                >
                  <span>{link.name}</span>
                  <span className="font-kannada text-xs text-muted-foreground ml-2">
                    {link.nameKn}
                  </span>
                </Link>
              ))}
              <Link to="/donate" onClick={() => setIsOpen(false)} className="mt-2">
                <Button variant="saffron" className="w-full">
                  Donate Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
