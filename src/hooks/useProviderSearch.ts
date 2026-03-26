import { useState, useMemo, useEffect } from "react";
import { providers } from "@/data/providers";
import type { Provider } from "@/data/types";

const categoryMap: Record<string, string[]> = {
  Music: ["Piano", "Music Theory", "Vocals"],
  Math: ["Calculus", "Linear Algebra", "Statistics"],
  Coding: ["Python", "React", "Data Science"],
  Art: ["Watercolor", "Oil Painting", "Sketching"],
  Fitness: ["Yoga", "HIIT", "Nutrition"],
  Languages: ["French", "Spanish", "ESL"],
};

export function useProviderSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    let list = providers;

    if (activeCategory !== "All") {
      const skills = categoryMap[activeCategory] || [];
      list = list.filter((p) => p.skills.some((s) => skills.includes(s)));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.skills.some((s) => s.toLowerCase().includes(q)) ||
          p.bio.toLowerCase().includes(q)
      );
    }

    return [...list].sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
  }, [searchQuery, activeCategory]);

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
  };

  return {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    isLoading,
    filtered,
    clearFilters,
  };
}
