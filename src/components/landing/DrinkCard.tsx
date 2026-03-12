import { bestSellers, dairyFree } from "@/data/landing";

interface DrinkCardProps {
  name: string;
  variant?: "default" | "blue";
}

const DrinkCard = ({ name, variant = "default" }: DrinkCardProps) => {
  const isBestSeller = bestSellers.includes(name);
  const isDairyFree = dairyFree.includes(name);

  return (
    <div
      className={`group rounded-2xl p-4 flex flex-col items-center text-center transition-all hover:shadow-lg hover:-translate-y-1 ${
        variant === "blue"
          ? "bg-primary text-primary-foreground shadow-md shadow-primary/10"
          : "bg-card border border-foreground/5 hover:border-foreground/10"
      }`}
    >
      {/* Image placeholder with brand dot */}
      <div
        className={`w-full aspect-[4/5] rounded-xl mb-3 relative overflow-hidden flex items-center justify-center ${
          variant === "blue" ? "bg-primary-foreground/10" : "bg-muted/60"
        }`}
      >
        <span
          className={`font-display text-2xl font-bold ${
            variant === "blue" ? "text-primary-foreground/20" : "text-primary/15"
          }`}
        >
          dot
        </span>
      </div>
      <p className="font-display font-bold text-sm capitalize tracking-tight leading-tight">{name}</p>
      <div className="flex gap-1.5 mt-2 flex-wrap justify-center">
        {isBestSeller && (
          <span className="bg-primary text-primary-foreground text-[10px] px-2.5 py-0.5 rounded-full font-bold font-body uppercase tracking-wider">
            best seller
          </span>
        )}
        {isDairyFree && (
          <span className="bg-secondary text-secondary-foreground text-[10px] px-2.5 py-0.5 rounded-full font-bold font-body uppercase tracking-wider">
            dairy free
          </span>
        )}
      </div>
    </div>
  );
};

export default DrinkCard;
