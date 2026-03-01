import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { mockSarees, FABRICS, COLORS, OCCASIONS } from "@/data/sarees";
import SareeCard from "@/components/SareeCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹5,000", min: 0, max: 5000 },
  { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
  { label: "Above ₹10,000", min: 10000, max: Infinity },
];

const SareeListing = () => {
  const [searchParams] = useSearchParams();
  const initialOccasion = searchParams.get("occasion") || "";

  const [fabric, setFabric] = useState("");
  const [color, setColor] = useState("");
  const [occasion, setOccasion] = useState(initialOccasion);
  const [priceRange, setPriceRange] = useState(0);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return mockSarees.filter((s) => {
      if (fabric && s.fabric !== fabric) return false;
      if (color && s.color !== color) return false;
      if (occasion && s.occasion !== occasion) return false;
      const range = PRICE_RANGES[priceRange];
      if (s.price < range.min || s.price >= range.max) return false;
      if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [fabric, color, occasion, priceRange, search]);

  const hasFilters = fabric || color || occasion || priceRange > 0 || search;

  const clearFilters = () => {
    setFabric("");
    setColor("");
    setOccasion("");
    setPriceRange(0);
    setSearch("");
  };

  const FilterControls = () => (
    <div className="space-y-5">
      <div>
        <Label className="text-xs font-body mb-1.5 block text-muted-foreground">Search</Label>
        <Input
          placeholder="Search sarees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="font-body"
        />
      </div>
      <div>
        <Label className="text-xs font-body mb-1.5 block text-muted-foreground">Fabric</Label>
        <Select value={fabric} onValueChange={setFabric}>
          <SelectTrigger className="font-body"><SelectValue placeholder="All Fabrics" /></SelectTrigger>
          <SelectContent>
            {FABRICS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs font-body mb-1.5 block text-muted-foreground">Color</Label>
        <Select value={color} onValueChange={setColor}>
          <SelectTrigger className="font-body"><SelectValue placeholder="All Colors" /></SelectTrigger>
          <SelectContent>
            {COLORS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs font-body mb-1.5 block text-muted-foreground">Occasion</Label>
        <Select value={occasion} onValueChange={setOccasion}>
          <SelectTrigger className="font-body"><SelectValue placeholder="All Occasions" /></SelectTrigger>
          <SelectContent>
            {OCCASIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs font-body mb-1.5 block text-muted-foreground">Price Range</Label>
        <Select value={String(priceRange)} onValueChange={(v) => setPriceRange(Number(v))}>
          <SelectTrigger className="font-body"><SelectValue /></SelectTrigger>
          <SelectContent>
            {PRICE_RANGES.map((r, i) => <SelectItem key={i} value={String(i)}>{r.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      {hasFilters && (
        <Button variant="ghost" onClick={clearFilters} className="w-full gap-2 text-sm font-body">
          <X className="h-4 w-4" /> Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <main className="container py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold">Our Sarees</h1>
          <p className="text-sm text-muted-foreground font-body mt-1">
            {filtered.length} saree{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
        {/* Mobile filter button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="md:hidden gap-2 font-body">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle className="font-heading">Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterControls />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar filters */}
        <aside className="hidden md:block w-56 shrink-0">
          <h3 className="font-heading font-semibold mb-4 text-sm text-muted-foreground uppercase tracking-wider">
            Filters
          </h3>
          <FilterControls />
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-body">No sarees found matching your filters.</p>
              <Button variant="ghost" onClick={clearFilters} className="mt-4 font-body">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((saree) => (
                <SareeCard key={saree.id} saree={saree} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default SareeListing;
