import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ashramaLogo from "@/assets/ashrama-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { name: "Home", nameKn: "ಮುಖಪುಟ", path: "/" },
  { name: "About", nameKn: "ನಮ್ಮ ಬಗ್ಗೆ", path: "/about" },
  {
    name: "Swamiji",
    nameKn: "ಸ್ವಾಮೀಜಿ",
    path: "/swamiji",
    children: [
      { name: "Life & Biography", nameKn: "ಜೀವನ ಚರಿತ್ರೆ", path: "/swamiji" },
      { name: "Mangalarati", nameKn: "ಮಂಗಳಾರತಿ", path: "/mangalarati" }
    ]
  },
  { name: "Seva", nameKn: "ಸೇವೆ", path: "/seva" },
  { name: "Events", nameKn: "ಕಾರ್ಯಕ್ರಮಗಳು", path: "/events" },
  { name: "Gallery", nameKn: "ಗ್ಯಾಲರಿ", path: "/gallery" },
  { name: "Trust", nameKn: "ಟ್ರಸ್ಟ್", path: "/trust" },
  { name: "Quotes", nameKn: "ಉಲ್ಲೇಖಗಳು", path: "/quotes" },
  { name: "Contact", nameKn: "ಸಂಪರ್ಕ", path: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleSubmenu = (name: string) => {
    if (expandedMenu === name) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(name);
    }
  };

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
            {navLinks.map((link) => {
              if (link.children) {
                return (
                  <DropdownMenu key={link.name}>
                    <DropdownMenuTrigger className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition-colors outline-none focus:outline-none ${location.pathname.startsWith(link.path)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                      }`}>
                      {link.name} <ChevronDown size={14} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="bg-white/95 backdrop-blur-md border-primary/10 rounded-xl p-2 animate-in fade-in zoom-in-95 duration-200">
                      {link.children.map((child) => (
                        <DropdownMenuItem key={child.path} asChild>
                          <Link
                            to={child.path}
                            className="w-full cursor-pointer rounded-lg px-2 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 focus:bg-primary/10 focus:text-primary"
                          >
                            <span className="block">{child.name}</span>
                            <span className="font-kannada text-xs text-muted-foreground lg:hidden">{child.nameKn}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${location.pathname === link.path
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link to="/donate">
              <Button variant="saffron" size="sm" className="ml-2">
                Donate
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-full text-foreground hover:bg-primary/10"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.children ? (
                    <div className="flex flex-col">
                      <button
                        onClick={() => toggleSubmenu(link.name)}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-full text-sm font-medium transition-colors ${location.pathname.startsWith(link.path)
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{link.name}</span>
                          <span className="font-kannada text-xs text-muted-foreground">{link.nameKn}</span>
                        </div>
                        <ChevronDown size={16} className={`transition-transform duration-200 ${expandedMenu === link.name ? 'rotate-180' : ''}`} />
                      </button>

                      {expandedMenu === link.name && (
                        <div className="pl-4 pr-4 pb-2 space-y-1 bg-primary/5 rounded-2xl mx-2 mb-2">
                          {link.children.map(child => (
                            <Link
                              key={child.path}
                              to={child.path}
                              onClick={() => setIsOpen(false)}
                              className="block px-4 py-2 rounded-full text-sm text-foreground/70 hover:text-primary hover:bg-primary/5"
                            >
                              <span>{child.name}</span>
                              <span className="font-kannada text-xs text-muted-foreground ml-2">{child.nameKn}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 rounded-full text-sm font-medium transition-colors ${location.pathname === link.path
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                        }`}
                    >
                      <span>{link.name}</span>
                      <span className="font-kannada text-xs text-muted-foreground ml-2">
                        {link.nameKn}
                      </span>
                    </Link>
                  )}
                </div>
              ))}
              <Link to="/donate" onClick={() => setIsOpen(false)} className="mt-2 text-center">
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
