import { Star, MessageSquare, Sparkles, BadgeCheck, Clock, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Instructor } from "@/data/instructors";

interface InstructorCardProps {
  instructor: Instructor;
  onClick: (instructor: Instructor) => void;
}

const InstructorCard = ({ instructor, onClick }: InstructorCardProps) => {
  return (
    <button
      onClick={() => onClick(instructor)}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-card text-left shadow-sm border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-ring"
    >
      {instructor.isNew && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 rounded-full bg-badge-new px-2.5 py-1 text-xs font-bold text-badge-new-foreground shadow-sm">
            <Sparkles className="h-3 w-3" />
            New
          </span>
        </div>
      )}

      {instructor.verified && (
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 rounded-full bg-verified px-2 py-1 text-xs font-bold text-verified-foreground shadow-sm">
            <BadgeCheck className="h-3 w-3" />
            Verified
          </span>
        </div>
      )}

      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={instructor.photo}
          alt={instructor.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <h3 className="font-serif text-lg font-bold text-primary-foreground drop-shadow-md">
            {instructor.name}
          </h3>
          <span className="rounded-lg bg-card/90 px-2 py-1 text-sm font-bold text-card-foreground backdrop-blur-sm">
            {instructor.discountRate ? (
              <span className="flex items-center gap-1.5">
                <span className="text-muted-foreground line-through text-xs">${instructor.hourlyRate}</span>
                <span className="text-primary">${instructor.discountRate}/hr</span>
              </span>
            ) : (
              `$${instructor.hourlyRate}/hr`
            )}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center gap-3 flex-wrap">
          {instructor.isNew ? (
            <span className="text-xs font-medium text-accent">No reviews yet — be the first!</span>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-star text-star" />
                <span className="text-sm font-bold text-card-foreground">{instructor.score}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MessageSquare className="h-3.5 w-3.5" />
                <span className="text-xs">{instructor.reviewCount} reviews</span>
              </div>
            </>
          )}
          {instructor.responseTime && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span className="text-xs">Responds {instructor.responseTime}</span>
            </div>
          )}
        </div>

        {instructor.satisfactionGuarantee && (
          <div className="flex items-center gap-1.5 rounded-md bg-guarantee/10 px-2 py-1 w-fit">
            <ShieldCheck className="h-3.5 w-3.5 text-guarantee" />
            <span className="text-xs font-medium text-guarantee">Satisfaction Guaranteed</span>
          </div>
        )}

        <p className="text-xs text-muted-foreground line-clamp-2">{instructor.bio}</p>

        <div className="mt-auto flex flex-wrap gap-1.5">
          {instructor.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs font-medium">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </button>
  );
};

export default InstructorCard;
