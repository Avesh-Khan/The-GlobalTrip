import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/package", label: "Package" },
  { to: "/visa", label: "Visa" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow border-b ${
        scrolled ? "shadow-md bg-white/90 backdrop-blur" : "bg-white"
      }`}
    >
      <div className="container mx-auto relative flex items-center justify-between py-4">
        <Link
          to="/"
          className="font-extrabold tracking-tight text-2xl text-secondary"
        >
          The<span className="text-primary">Global</span>Trip
        </Link>

        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-foreground/80"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link to="/contact">
            <Button variant="outline" className="uppercase tracking-wide">
              <Phone className="mr-2" /> Contact
            </Button>
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-md border border-input"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="container py-3 flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-2 text-base ${isActive ? "text-primary" : "text-foreground/80"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/contact">
              <Button className="uppercase tracking-wide bg-primary hover:bg-primary/90 text-white w-full">
                <Phone className="mr-2" /> Contact
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
