import { Star, MessageSquare, Sparkles, BadgeCheck, Clock, ShieldCheck, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Instructor } from "@/data/instructors";

interface InstructorModalProps {
  instructor: Instructor | null;
  open: boolean;
  onClose: () => void;
}

const InstructorModal = ({ instructor, open, onClose }: InstructorModalProps) => {
  if (!instructor) return null;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg p-0 overflow-hidden gap-0">
        <div className="relative aspect-video overflow-hidden">
          <img src={instructor.photo} alt={instructor.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
          {instructor.isNew && (
            <span className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-badge-new px-3 py-1 text-xs font-bold text-badge-new-foreground shadow">
              <Sparkles className="h-3 w-3" />
              New Instructor
            </span>
          )}
          {instructor.verified && (
            <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-verified px-3 py-1 text-xs font-bold text-verified-foreground shadow">
              <BadgeCheck className="h-3 w-3" />
              Verified
            </span>
          )}
          <div className="absolute bottom-4 left-4">
            <h2 className="font-serif text-2xl font-bold text-primary-foreground drop-shadow-lg">{instructor.name}</h2>
            <div className="mt-1 flex items-center gap-2 flex-wrap">
              {!instructor.isNew && (
                <>
                  <Star className="h-4 w-4 fill-star text-star" />
                  <span className="text-sm font-bold text-primary-foreground">{instructor.score}</span>
                  <span className="text-sm text-primary-foreground/80">·</span>
                  <span className="text-sm text-primary-foreground/80">{instructor.reviewCount} reviews</span>
                  <span className="text-sm text-primary-foreground/80">·</span>
                </>
              )}
              {instructor.discountRate ? (
                <>
                  <span className="text-sm text-primary-foreground/60 line-through">${instructor.hourlyRate}/hr</span>
                  <span className="text-sm font-bold text-primary-foreground">${instructor.discountRate}/hr</span>
                </>
              ) : (
                <span className="text-sm font-bold text-primary-foreground">${instructor.hourlyRate}/hr</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 p-6">
          {/* Trust signals bar */}
          <div className="flex flex-wrap gap-3">
            {instructor.verified && (
              <div className="flex items-center gap-1.5 rounded-full bg-verified/10 px-3 py-1.5">
                <BadgeCheck className="h-4 w-4 text-verified" />
                <span className="text-xs font-bold text-verified">ID Verified</span>
              </div>
            )}
            {instructor.responseTime && (
              <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-secondary-foreground">Responds {instructor.responseTime}</span>
              </div>
            )}
            {instructor.satisfactionGuarantee && (
              <div className="flex items-center gap-1.5 rounded-full bg-guarantee/10 px-3 py-1.5">
                <ShieldCheck className="h-4 w-4 text-guarantee" />
                <span className="text-xs font-bold text-guarantee">100% Satisfaction Guarantee</span>
              </div>
            )}
          </div>

          <div>
            <h4 className="text-sm font-bold text-card-foreground mb-1">About</h4>
            <p className="text-sm text-muted-foreground">{instructor.bio}</p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-card-foreground mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {instructor.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="font-medium">{skill}</Badge>
              ))}
            </div>
          </div>

          {/* Work Samples */}
          {instructor.workSamples.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-card-foreground mb-3 flex items-center gap-1.5">
                <Briefcase className="h-4 w-4" /> Work Samples
              </h4>
              <div className="space-y-2">
                {instructor.workSamples.map((sample, i) => (
                  <div key={i} className="rounded-lg border border-border bg-secondary/50 p-3">
                    <p className="text-sm font-bold text-secondary-foreground">{sample.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{sample.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {instructor.reviews.length > 0 ? (
            <div>
              <h4 className="text-sm font-bold text-card-foreground mb-3 flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4" /> Reviews
              </h4>
              <div className="space-y-3">
                {instructor.reviews.map((review, i) => (
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
            <div className="rounded-lg bg-accent/10 border border-accent/20 p-4 text-center">
              <p className="text-sm font-medium text-accent">🌟 New instructor — no reviews yet</p>
              <p className="text-xs text-muted-foreground mt-1">Book a session and be the first to leave a review!</p>
            </div>
          )}

          <button className="mt-1 w-full rounded-lg bg-primary py-3 text-sm font-bold text-primary-foreground transition-colors hover:opacity-90">
            Book a Session
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InstructorModal;
