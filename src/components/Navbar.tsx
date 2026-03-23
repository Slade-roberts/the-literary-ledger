import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAdmin, isEditor } = useAuth();
  const isAuthenticated = !!user && (isAdmin || isEditor);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6 lg:px-8">
        <Link to="/" className="font-heading text-xl font-semibold tracking-wide text-foreground">
          Daria
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`font-body text-sm tracking-wide transition-colors duration-200 hover:text-primary ${
                  location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to={isAuthenticated ? "/admin" : "/login"}
              className="font-body text-sm tracking-wide border border-border rounded-md px-3 py-1.5 transition-colors duration-200 hover:bg-accent hover:text-accent-foreground text-muted-foreground"
            >
              {isAuthenticated ? "Edit" : "Login"}
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`font-body text-sm tracking-wide transition-colors duration-200 hover:text-primary ${
                      location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={isAuthenticated ? "/admin" : "/login"}
                  onClick={() => setMobileOpen(false)}
                  className="font-body text-sm tracking-wide transition-colors duration-200 hover:text-primary text-muted-foreground"
                >
                  {isAuthenticated ? "Edit" : "Login"}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
