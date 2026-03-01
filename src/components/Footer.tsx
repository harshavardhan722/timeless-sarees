import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground mt-16">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-heading font-bold mb-3">Vastra</h3>
          <p className="text-primary-foreground/70 text-sm font-body leading-relaxed">
            Curating the finest handloom and designer sarees from across India.
            Every weave tells a story.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
            <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
            <Link to="/sarees" className="hover:text-primary-foreground transition-colors">Shop Sarees</Link>
            <Link to="/cart" className="hover:text-primary-foreground transition-colors">Cart</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3">Contact</h4>
          <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
            <p>info@vastrasarees.com</p>
            <p>+91 98765 43210</p>
            <p>Mumbai, India</p>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-xs text-primary-foreground/50">
        © 2026 Vastra Sarees. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
