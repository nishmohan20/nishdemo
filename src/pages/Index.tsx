import { useState } from "react";
import { HeroSection, FilterBar, EmptyState, ProviderGridSkeleton } from "@/features/search";
import { ProviderCard, ProviderProfile, PromoBanner } from "@/features/providers";
import { BookingModal } from "@/features/booking";
import { useProviderSearch } from "@/hooks/useProviderSearch";
import type { Provider } from "@/data/types";

const Index = () => {
  const { searchQuery, setSearchQuery, activeCategory, setActiveCategory, isLoading, filtered, clearFilters } = useProviderSearch();
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [bookingProvider, setBookingProvider] = useState<Provider | null>(null);

  const handleBook = (provider: Provider) => {
    setSelectedProvider(null);
    setBookingProvider(provider);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="container mx-auto px-4 py-10">
        <PromoBanner onProviderClick={setSelectedProvider} />

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <FilterBar active={activeCategory} onSelect={setActiveCategory} />
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Loading..." : `${filtered.length} instructor${filtered.length !== 1 ? "s" : ""} found`}
          </p>
        </div>

        {isLoading ? (
          <ProviderGridSkeleton count={6} />
        ) : filtered.length === 0 ? (
          <EmptyState variant="no-results" onAction={clearFilters} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} onClick={setSelectedProvider} />
            ))}
          </div>
        )}
      </main>

      <ProviderProfile
        provider={selectedProvider}
        open={!!selectedProvider}
        onClose={() => setSelectedProvider(null)}
        onBook={handleBook}
      />

      <BookingModal
        provider={bookingProvider}
        open={!!bookingProvider}
        onClose={() => setBookingProvider(null)}
      />
    </div>
  );
};

export default Index;
