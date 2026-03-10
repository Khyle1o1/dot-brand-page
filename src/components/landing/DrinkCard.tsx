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
      className={`rounded-2xl p-5 flex flex-col items-center text-center transition-all hover:scale-[1.03] hover:shadow-md ${
        variant === "blue"
          ? "bg-primary text-primary-foreground"
          : "bg-card border border-foreground/5"
      }`}
    >
      {/* Placeholder image block */}
      <div
        className={`w-full aspect-square rounded-xl mb-4 ${
          variant === "blue" ? "bg-primary-foreground/15" : "bg-muted"
        }`}
      />
      <p className="font-display font-bold text-sm capitalize tracking-tight">{name}</p>
      <div className="flex gap-1.5 mt-2.5 flex-wrap justify-center">
        {isBestSeller && (
          <span className="bg-accent text-accent-foreground text-[10px] px-2.5 py-0.5 rounded-full font-bold font-body uppercase tracking-wider">
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
