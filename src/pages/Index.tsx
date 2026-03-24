import { useState, useMemo, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import FilterBar from "@/components/FilterBar";
import InstructorCard from "@/components/InstructorCard";
import InstructorModal from "@/components/InstructorModal";
import BookingModal from "@/components/BookingModal";
import PromoBanner from "@/components/PromoBanner";
import EmptyState from "@/components/EmptyState";
import { InstructorGridSkeleton } from "@/components/InstructorGridSkeleton";
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
  const [bookingInstructor, setBookingInstructor] = useState<Instructor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

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

    return [...list].sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
  }, [searchQuery, activeCategory]);

  const handleBook = (instructor: Instructor) => {
    setSelectedInstructor(null);
    setBookingInstructor(instructor);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="container mx-auto px-4 py-10">
        <PromoBanner onInstructorClick={setSelectedInstructor} />

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <FilterBar active={activeCategory} onSelect={setActiveCategory} />
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Loading..." : `${filtered.length} instructor${filtered.length !== 1 ? "s" : ""} found`}
          </p>
        </div>

        {isLoading ? (
          <InstructorGridSkeleton count={6} />
        ) : filtered.length === 0 ? (
          <EmptyState variant="no-results" onAction={handleClearFilters} />
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
        onBook={handleBook}
      />

      <BookingModal
        instructor={bookingInstructor}
        open={!!bookingInstructor}
        onClose={() => setBookingInstructor(null)}
      />
    </div>
  );
};

export default Index;
