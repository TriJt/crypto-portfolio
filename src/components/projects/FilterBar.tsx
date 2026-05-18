import data from "../../data/portfolioData.json";

interface FilterBarProps {
  categories: string[];
  active: string;
  onChange: (type: string) => void;
  item: any;
}

export default function FilterBar({categories,  active, onChange, item }: FilterBarProps) {

  return (
    <div className="flex gap-3 flex-wrap mt-6 mb-8">
      {categories.map((cat) => {
        const isActive = active === cat;
        const count = cat === "all" ? item.length : item.filter((p:any) => p.typeCategory === cat).length;

        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`font-display text-[.65rem] font-semibold tracking-[.12em] uppercase px-4 py-2 border transition-all duration-200 ${
              isActive
                ? "border-[rgba(0,184,212,.5)] text-[var(--cyan)] bg-[rgba(0,184,212,.07)]"
                : "border-[var(--border)] text-[var(--text-muted)] bg-transparent hover:border-[rgba(0,184,212,.4)] hover:text-[var(--cyan)]"
            }`}
          >
            {cat === "all" ? `All (${count})` : `${cat} (${count})`}
          </button>
        );
      })}
    </div>
  );
}
