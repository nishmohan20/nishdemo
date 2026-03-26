import { Search } from "lucide-react";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const HeroSection = ({ searchQuery, onSearchChange }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-secondary py-16 sm:py-24">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(var(--accent) / 0.15) 0%, transparent 50%)'
      }} />
      <div className="container relative mx-auto px-4 text-center">
        <h1 className="font-serif text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Find Your Perfect<br />
          <span className="text-primary">Instructor</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
          Browse top-rated instructors across music, coding, art, fitness, languages and more.
        </p>

        <div className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-sm transition-shadow focus-within:shadow-md focus-within:ring-2 focus-within:ring-ring">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, skill, or subject..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
