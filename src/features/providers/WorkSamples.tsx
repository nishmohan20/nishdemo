import { Calendar, Clock, User, Award, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { RecentProject } from "@/data/types";

interface WorkSamplesProps {
  projects: RecentProject[];
  providerName: string;
  onBack: () => void;
}

const WorkSamples = ({ projects, providerName, onBack }: WorkSamplesProps) => {
  return (
    <div className="flex flex-col gap-4 p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors self-start"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to profile
      </button>

      <div>
        <h3 className="font-serif text-xl font-bold text-card-foreground">
          Recent Projects
        </h3>
        <p className="text-sm text-muted-foreground mt-0.5">
          {projects.length} completed project{projects.length !== 1 ? "s" : ""} by {providerName}
        </p>
      </div>

      <div className="space-y-4">
        {projects.map((project, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-[21/9] bg-secondary relative overflow-hidden">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="h-full w-full object-cover"
              />
              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground font-bold">
                {project.category}
              </Badge>
            </div>

            <div className="p-4 space-y-3">
              <h4 className="font-bold text-card-foreground">{project.title}</h4>
              <p className="text-sm text-muted-foreground">{project.description}</p>

              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  {project.studentName}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {project.completedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {project.duration}
                </span>
              </div>

              <div className="flex items-start gap-2 rounded-lg bg-guarantee/5 border border-guarantee/20 p-3">
                <Award className="h-4 w-4 text-guarantee shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  <span className="font-bold text-guarantee">Outcome:</span>{" "}
                  {project.outcome}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkSamples;
