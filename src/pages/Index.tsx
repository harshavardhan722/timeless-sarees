import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";
import { useSarees } from "@/hooks/useSarees";
import SareeCard from "@/components/SareeCard";

const Index = () => {
  const { data: sarees, isLoading } = useSarees();
  const featured = (sarees || []).slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <img
          src={heroBanner}
          alt="Exquisite Indian Sarees Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative container h-full flex flex-col justify-center">
          <div className="max-w-xl animate-fade-in">
            <p className="text-gold-light font-body text-sm tracking-[0.3em] uppercase mb-4">
              Handcrafted Elegance
            </p>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary-foreground leading-tight mb-6">
              Timeless Sarees
              <br />
              <span className="text-gradient-gold">for Every Occasion</span>
            </h1>
            <p className="text-primary-foreground/80 font-body text-sm md:text-base mb-8 max-w-md">
              Discover our curated collection of handloom and designer sarees
              from the finest weavers across India.
            </p>
            <Link to="/sarees">
              <Button size="lg" className="bg-gradient-gold text-accent-foreground hover:opacity-90 font-body font-medium tracking-wide gap-2 rounded-full px-8">
                Explore Collection <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="text-accent font-body text-xs tracking-[0.3em] uppercase mb-2">Curated for You</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Featured Sarees
          </h2>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featured.map((saree) => (
              <SareeCard key={saree.id} saree={saree} />
            ))}
          </div>
        )}
        <div className="text-center mt-10">
          <Link to="/sarees">
            <Button variant="outline" className="rounded-full px-8 gap-2 font-body">
              View All Sarees <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-cream py-16">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-10">
            Shop by Occasion
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["Wedding", "Festival", "Party", "Bridal", "Casual", "Office"].map(
              (occasion) => (
                <Link
                  key={occasion}
                  to={`/sarees?occasion=${occasion}`}
                  className="relative group rounded-lg overflow-hidden bg-primary/5 p-8 md:p-12 text-center hover:bg-primary/10 transition-colors border border-border"
                >
                  <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {occasion}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">Explore →</p>
                </Link>
              )
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
