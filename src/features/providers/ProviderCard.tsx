import { Star, MessageSquare, Sparkles, BadgeCheck, Clock, ShieldCheck, Eye, Fingerprint, Percent } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Provider } from "@/data/types";

interface ProviderCardProps {
  provider: Provider;
  onClick: (provider: Provider) => void;
}

const ProviderCard = ({ provider, onClick }: ProviderCardProps) => {
  const discountPercent = provider.discountRate
    ? Math.round((1 - provider.discountRate / provider.hourlyRate) * 100)
    : 0;

  return (
    <button
      onClick={() => onClick(provider)}
      className={`group relative flex flex-col overflow-hidden rounded-xl bg-card text-left shadow-sm border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-ring ${
        provider.isNew
          ? "border-accent/40 ring-1 ring-accent/20 shadow-accent/10"
          : "border-border"
      }`}
    >
      {/* "First Session X% Off" diagonal banner for new instructors */}
      {provider.isNew && discountPercent > 0 && (
        <div className="absolute top-5 -left-8 z-20 w-40 rotate-[-35deg] bg-accent py-1.5 text-center shadow-md">
          <span className="text-[11px] font-bold uppercase tracking-wider text-accent-foreground">
            First Session {discountPercent}% Off
          </span>
        </div>
      )}

      {provider.isNew && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 rounded-full bg-badge-new px-2.5 py-1 text-xs font-bold text-badge-new-foreground shadow-sm">
            <Sparkles className="h-3 w-3" />
            New · Vetted
          </span>
        </div>
      )}

      {provider.verified && (
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 rounded-full bg-verified px-2 py-1 text-xs font-bold text-verified-foreground shadow-sm">
            <BadgeCheck className="h-3 w-3" />
            Verified
          </span>
        </div>
      )}

      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={provider.photo}
          alt={provider.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <h3 className="font-serif text-lg font-bold text-primary-foreground drop-shadow-md">
            {provider.name}
          </h3>
          {/* Larger, more prominent pricing for new instructors */}
          {provider.isNew && provider.discountRate ? (
            <span className="rounded-lg bg-accent px-3 py-1.5 text-accent-foreground backdrop-blur-sm shadow-md">
              <span className="flex items-center gap-1.5">
                <span className="text-accent-foreground/70 line-through text-xs">${provider.hourlyRate}</span>
                <span className="text-lg font-extrabold">${provider.discountRate}/hr</span>
              </span>
            </span>
          ) : (
            <span className="rounded-lg bg-card/90 px-2 py-1 text-sm font-bold text-card-foreground backdrop-blur-sm">
              {provider.discountRate ? (
                <span className="flex items-center gap-1.5">
                  <span className="text-muted-foreground line-through text-xs">${provider.hourlyRate}</span>
                  <span className="text-primary">${provider.discountRate}/hr</span>
                </span>
              ) : (
                `$${provider.hourlyRate}/hr`
              )}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center gap-3 flex-wrap">
          {provider.isNew ? (
            /* Bold "Platform Guaranteed" badge instead of empty ratings */
            <div className="flex items-center gap-1.5 rounded-full bg-guarantee/15 px-3 py-1">
              <ShieldCheck className="h-4 w-4 text-guarantee" />
              <span className="text-xs font-bold text-guarantee">Platform Guaranteed</span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-star text-star" />
                <span className="text-sm font-bold text-card-foreground">{provider.score}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MessageSquare className="h-3.5 w-3.5" />
                <span className="text-xs">{provider.reviewCount} reviews</span>
              </div>
            </>
          )}
          {provider.responseTime && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span className="text-xs">Responds {provider.responseTime}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {provider.backgroundCheck && (
            <div className="flex items-center gap-1 rounded-md bg-verified/10 px-2 py-0.5 w-fit">
              <Fingerprint className="h-3 w-3 text-verified" />
              <span className="text-xs font-medium text-verified">BG Check</span>
            </div>
          )}
          {!provider.isNew && provider.satisfactionGuarantee && (
            <div className="flex items-center gap-1 rounded-md bg-guarantee/10 px-2 py-0.5 w-fit">
              <ShieldCheck className="h-3.5 w-3.5 text-guarantee" />
              <span className="text-xs font-medium text-guarantee">Guaranteed</span>
            </div>
          )}
          {provider.profileViews > 0 && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Eye className="h-3 w-3" />
              <span className="text-xs">{provider.profileViews.toLocaleString()} views</span>
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2">{provider.bio}</p>

        <div className="mt-auto flex flex-wrap gap-1.5">
          {provider.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs font-medium">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </button>
  );
};

export default ProviderCard;
