import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground mt-16">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-heading font-bold mb-3">Amma</h3>
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
            <a href="mailto:punikotiharsha@gmail.com?subject=Buy%20Practical%20Sarees" className="hover:text-primary-foreground transition-colors">punikotiharsha@gmail.com</a>
            <a href="tel:+918919061722" className="hover:text-primary-foreground transition-colors">+91 89190 61722</a>
            <a href="https://www.google.com/maps/search/?api=1&query=CTM+Madanapalli+India" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">India, Near Madanapalli, C.T.M.</a>
          </div>
          <a
            href="https://wa.me/918910081722"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block"
          >
            <Button size="sm" className="bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-primary-foreground gap-2">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
          </a>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-xs text-primary-foreground/50">
        © 2026 Amma Sarees. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
