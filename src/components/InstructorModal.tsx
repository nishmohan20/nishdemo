import { Star, X, MessageSquare, Sparkles } from "lucide-react";
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
          <div className="absolute bottom-4 left-4">
            <h2 className="font-display text-2xl font-bold text-primary-foreground drop-shadow-lg">{instructor.name}</h2>
            <div className="mt-1 flex items-center gap-2">
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

          <button className="mt-1 w-full rounded-lg bg-primary py-3 text-sm font-bold text-primary-foreground transition-colors hover:opacity-90">
            Book a Session
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InstructorModal;
