const categories = ["All", "Music", "Math", "Coding", "Art", "Fitness", "Languages"];

interface FilterBarProps {
  active: string;
  onSelect: (category: string) => void;
}

const FilterBar = ({ active, onSelect }: FilterBarProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            active === cat
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-secondary text-secondary-foreground hover:bg-muted"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
