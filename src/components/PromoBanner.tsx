import { Sparkles, BadgeCheck, ShieldCheck, ArrowRight } from "lucide-react";
import { instructors } from "@/data/instructors";

interface PromoBannerProps {
  onInstructorClick: (instructor: typeof instructors[0]) => void;
}

const PromoBanner = ({ onInstructorClick }: PromoBannerProps) => {
  const newInstructors = instructors.filter((i) => i.isNew);

  if (newInstructors.length === 0) return null;

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
        {newInstructors.map((instructor) => (
          <button
            key={instructor.id}
            onClick={() => onInstructorClick(instructor)}
            className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-all hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <img
              src={instructor.photo}
              alt={instructor.name}
              className="h-14 w-14 rounded-full object-cover ring-2 ring-badge-new/50"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-sm font-bold text-card-foreground truncate">{instructor.name}</span>
                {instructor.verified && (
                  <BadgeCheck className="h-4 w-4 text-verified shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-2 mb-1">
                {instructor.discountRate && (
                  <>
                    <span className="text-xs text-muted-foreground line-through">${instructor.hourlyRate}/hr</span>
                    <span className="text-sm font-bold text-primary">${instructor.discountRate}/hr</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {instructor.satisfactionGuarantee && (
                  <span className="inline-flex items-center gap-1 text-xs text-guarantee font-medium">
                    <ShieldCheck className="h-3 w-3" />
                    Guaranteed
                  </span>
                )}
                <span className="text-xs text-muted-foreground">
                  {instructor.skills.slice(0, 2).join(" · ")}
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
