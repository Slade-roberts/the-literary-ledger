import { Link } from "react-router-dom";
import { Mail, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-lg font-semibold mb-3 text-foreground">Daria</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
              Literary translator, writer, and editor — bridging languages and cultures through careful, attentive work with words.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold mb-3 text-foreground uppercase tracking-wider">Navigate</h4>
            <ul className="space-y-2">
              {[
                { label: "About", path: "/about" },
                { label: "Portfolio", path: "/portfolio" },
                { label: "Services", path: "/services" },
                { label: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold mb-3 text-foreground uppercase tracking-wider">Connect</h4>
            <div className="flex items-center gap-4">
              <a href="mailto:daria@example.com" className="text-muted-foreground hover:text-primary transition-colors duration-200" aria-label="Email">
                <Mail size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200" aria-label="Instagram">
                <Instagram size={18} />
              </a>
            </div>
            <p className="font-body text-sm text-muted-foreground mt-3">daria@example.com</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} Daria. All rights reserved.
          </p>
          <Link
            to="/login"
            className="font-body text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors duration-200"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
