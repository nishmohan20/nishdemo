import { useState, useMemo } from "react";
import HeroSection from "@/components/HeroSection";
import FilterBar from "@/components/FilterBar";
import InstructorCard from "@/components/InstructorCard";
import InstructorModal from "@/components/InstructorModal";
import { instructors, type Instructor } from "@/data/instructors";

const categoryMap: Record<string, string[]> = {
  Music: ["Piano", "Music Theory", "Vocals"],
  Math: ["Calculus", "Linear Algebra", "Statistics"],
  Coding: ["Python", "React", "Data Science"],
  Art: ["Watercolor", "Oil Painting", "Sketching"],
  Fitness: ["Yoga", "HIIT", "Nutrition"],
  Languages: ["French", "Spanish", "ESL"],
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);

  const filtered = useMemo(() => {
    let list = instructors;

    if (activeCategory !== "All") {
      const skills = categoryMap[activeCategory] || [];
      list = list.filter((i) => i.skills.some((s) => skills.includes(s)));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.skills.some((s) => s.toLowerCase().includes(q)) ||
          i.bio.toLowerCase().includes(q)
      );
    }

    // Sort: new instructors first
    return [...list].sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="container mx-auto px-4 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <FilterBar active={activeCategory} onSelect={setActiveCategory} />
          <p className="text-sm text-muted-foreground">
            {filtered.length} instructor{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            <p className="text-lg font-medium">No instructors found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((instructor) => (
              <InstructorCard key={instructor.id} instructor={instructor} onClick={setSelectedInstructor} />
            ))}
          </div>
        )}
      </main>

      <InstructorModal
        instructor={selectedInstructor}
        open={!!selectedInstructor}
        onClose={() => setSelectedInstructor(null)}
      />
    </div>
  );
};

export default Index;
