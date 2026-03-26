import { Sparkles, BadgeCheck, ShieldCheck, ArrowRight } from "lucide-react";
import { providers } from "@/data/providers";
import type { Provider } from "@/data/types";

interface PromoBannerProps {
  onProviderClick: (provider: Provider) => void;
}

const PromoBanner = ({ onProviderClick }: PromoBannerProps) => {
  const newProviders = providers.filter((p) => p.isNew);

  if (newProviders.length === 0) return null;

  return (
    <section className="mb-10 rounded-2xl border border-badge-new/30 bg-gradient-to-r from-badge-new/10 via-background to-primary/5 p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          New Instructors — Introductory Pricing
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Book verified instructors at discounted rates. Every session backed by our satisfaction guarantee.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {newProviders.map((provider) => (
          <button
            key={provider.id}
            onClick={() => onProviderClick(provider)}
            className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-all hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <img
              src={provider.photo}
              alt={provider.name}
              className="h-14 w-14 rounded-full object-cover ring-2 ring-badge-new/50"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-sm font-bold text-card-foreground truncate">{provider.name}</span>
                {provider.verified && (
                  <BadgeCheck className="h-4 w-4 text-verified shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-2 mb-1">
                {provider.discountRate && (
                  <>
                    <span className="text-xs text-muted-foreground line-through">${provider.hourlyRate}/hr</span>
                    <span className="text-sm font-bold text-primary">${provider.discountRate}/hr</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {provider.satisfactionGuarantee && (
                  <span className="inline-flex items-center gap-1 text-xs text-guarantee font-medium">
                    <ShieldCheck className="h-3 w-3" />
                    Guaranteed
                  </span>
                )}
                <span className="text-xs text-muted-foreground">
                  {provider.skills.slice(0, 2).join(" · ")}
                </span>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
          </button>
        ))}
      </div>
    </section>
  );
};

export default PromoBanner;
