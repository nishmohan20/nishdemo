import { useState } from "react";
import { Star, MessageSquare, Sparkles, BadgeCheck, Clock, ShieldCheck, Briefcase, Fingerprint, Eye, Users, Quote, FolderOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import WorkSamples from "./WorkSamples";
import type { Provider } from "@/data/types";

interface ProviderProfileProps {
  provider: Provider | null;
  open: boolean;
  onClose: () => void;
  onBook: (provider: Provider) => void;
}

const ProviderProfile = ({ provider, open, onClose, onBook }: ProviderProfileProps) => {
  const [showProjects, setShowProjects] = useState(false);

  if (!provider) return null;

  const handleClose = () => {
    setShowProjects(false);
    onClose();
  };

  if (showProjects) {
    return (
      <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
        <DialogContent className="max-w-lg p-0 overflow-hidden gap-0 max-h-[90vh] overflow-y-auto">
          <WorkSamples
            projects={provider.recentProjects}
            providerName={provider.name}
            onBack={() => setShowProjects(false)}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-lg p-0 overflow-hidden gap-0 max-h-[90vh] overflow-y-auto">
        <div className="relative aspect-video overflow-hidden">
          <img src={provider.photo} alt={provider.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
          {provider.isNew && (
            <span className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-badge-new px-3 py-1 text-xs font-bold text-badge-new-foreground shadow">
              <Sparkles className="h-3 w-3" />
              New · Platform Vetted
            </span>
          )}
          {provider.verified && (
            <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-verified px-3 py-1 text-xs font-bold text-verified-foreground shadow">
              <BadgeCheck className="h-3 w-3" />
              Verified
            </span>
          )}
          <div className="absolute bottom-4 left-4">
            <h2 className="font-serif text-2xl font-bold text-primary-foreground drop-shadow-lg">{provider.name}</h2>
            <div className="mt-1 flex items-center gap-2 flex-wrap">
              {!provider.isNew && (
                <>
                  <Star className="h-4 w-4 fill-star text-star" />
                  <span className="text-sm font-bold text-primary-foreground">{provider.score}</span>
                  <span className="text-sm text-primary-foreground/80">·</span>
                  <span className="text-sm text-primary-foreground/80">{provider.reviewCount} reviews</span>
                  <span className="text-sm text-primary-foreground/80">·</span>
                </>
              )}
              {provider.discountRate ? (
                <>
                  <span className="text-sm text-primary-foreground/60 line-through">${provider.hourlyRate}/hr</span>
                  <span className="text-sm font-bold text-primary-foreground">${provider.discountRate}/hr</span>
                </>
              ) : (
                <span className="text-sm font-bold text-primary-foreground">${provider.hourlyRate}/hr</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 p-6">
          <div className="flex flex-wrap gap-2">
            {provider.verified && (
              <div className="flex items-center gap-1.5 rounded-full bg-verified/10 px-3 py-1.5">
                <BadgeCheck className="h-4 w-4 text-verified" />
                <span className="text-xs font-bold text-verified">ID Verified</span>
              </div>
            )}
            {provider.backgroundCheck && (
              <div className="flex items-center gap-1.5 rounded-full bg-verified/10 px-3 py-1.5">
                <Fingerprint className="h-4 w-4 text-verified" />
                <span className="text-xs font-bold text-verified">Background Check</span>
              </div>
            )}
            {provider.responseTime && (
              <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-secondary-foreground">Responds {provider.responseTime}</span>
              </div>
            )}
            {provider.satisfactionGuarantee && (
              <div className="flex items-center gap-1.5 rounded-full bg-guarantee/10 px-3 py-1.5">
                <ShieldCheck className="h-4 w-4 text-guarantee" />
                <span className="text-xs font-bold text-guarantee">100% Satisfaction Guarantee</span>
              </div>
            )}
          </div>

          <div className="flex gap-4 rounded-lg bg-secondary/50 p-3">
            <div className="flex items-center gap-1.5">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-secondary-foreground">{provider.profileViews.toLocaleString()} profile views</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-secondary-foreground">{provider.totalBookings} sessions booked</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-card-foreground mb-1">About</h4>
            <p className="text-sm text-muted-foreground">{provider.bio}</p>
          </div>

          {provider.whyChooseMe && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <h4 className="text-sm font-bold text-card-foreground mb-2 flex items-center gap-1.5">
                <Quote className="h-4 w-4 text-primary" /> Why Choose Me
              </h4>
              <p className="text-sm text-muted-foreground italic">"{provider.whyChooseMe}"</p>
            </div>
          )}

          <div>
            <h4 className="text-sm font-bold text-card-foreground mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {provider.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="font-medium">{skill}</Badge>
              ))}
            </div>
          </div>

          {provider.recentProjects.length > 0 && (
            <button
              onClick={() => setShowProjects(true)}
              className="flex items-center justify-between rounded-xl border border-border bg-secondary/30 p-4 transition-colors hover:bg-secondary/60 group"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <FolderOpen className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-card-foreground">Recent Projects</p>
                  <p className="text-xs text-muted-foreground">
                    {provider.recentProjects.length} completed project{provider.recentProjects.length !== 1 ? "s" : ""} with outcomes
                  </p>
                </div>
              </div>
              <span className="text-xs font-medium text-primary group-hover:underline">View →</span>
            </button>
          )}

          {provider.workSamples.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-card-foreground mb-3 flex items-center gap-1.5">
                <Briefcase className="h-4 w-4" /> Work Samples
              </h4>
              <div className="space-y-2">
                {provider.workSamples.map((sample, i) => (
                  <div key={i} className="rounded-lg border border-border bg-secondary/50 p-3">
                    <p className="text-sm font-bold text-secondary-foreground">{sample.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{sample.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {provider.reviews.length > 0 ? (
            <div>
              <h4 className="text-sm font-bold text-card-foreground mb-3 flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4" /> Reviews
              </h4>
              <div className="space-y-3">
                {provider.reviews.map((review, i) => (
                  <div key={i} className="rounded-lg bg-secondary p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-secondary-foreground">{review.author}</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: review.rating }).map((_, j) => (
                          <Star key={j} className="h-3 w-3 fill-star text-star" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-lg bg-guarantee/5 border border-guarantee/20 p-4 text-center space-y-1.5">
              <p className="text-sm font-bold text-card-foreground">New to the platform</p>
              <p className="text-xs text-muted-foreground">Book with our satisfaction guarantee — if you're not happy, get a full refund.</p>
            </div>
          )}

          {provider.isNew && provider.satisfactionGuarantee && (
            <div className="rounded-xl border-2 border-guarantee/30 bg-gradient-to-r from-guarantee/5 to-guarantee/10 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-guarantee" />
                <h4 className="text-sm font-bold text-guarantee">New Provider Guarantee</h4>
              </div>
              <p className="text-xs text-muted-foreground">
                Not satisfied? Get a <span className="font-bold text-guarantee">full refund</span> or we'll match you with another instructor at no extra cost. Zero risk for you.
              </p>
            </div>
          )}

          <div className="sticky bottom-0 bg-card pt-2 pb-1 -mx-6 px-6 border-t border-border">
            <button
              onClick={() => onBook(provider)}
              className="w-full rounded-lg bg-primary py-3 text-sm font-bold text-primary-foreground transition-colors hover:opacity-90"
            >
              Book with Confidence — ${provider.discountRate ?? provider.hourlyRate}/hr
            </button>
            <div className="flex items-center justify-center gap-3 mt-2 mb-1">
              {provider.satisfactionGuarantee && (
                <span className="text-xs text-guarantee font-medium flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> Money-back guarantee
                </span>
              )}
              {provider.verified && (
                <span className="text-xs text-verified font-medium flex items-center gap-1">
                  <BadgeCheck className="h-3 w-3" /> Verified
                </span>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProviderProfile;
