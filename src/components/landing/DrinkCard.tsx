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
      className={`rounded-xl p-4 flex flex-col items-center text-center transition-transform hover:scale-[1.02] ${
        variant === "blue"
          ? "bg-primary text-primary-foreground"
          : "bg-card border border-foreground/5"
      }`}
    >
      {/* Placeholder image block */}
      <div
        className={`w-full aspect-square rounded-lg mb-3 ${
          variant === "blue" ? "bg-primary-foreground/20" : "bg-muted"
        }`}
      />
      <p className="font-body font-semibold text-sm capitalize">{name}</p>
      <div className="flex gap-1.5 mt-2 flex-wrap justify-center">
        {isBestSeller && (
          <span className="bg-accent text-accent-foreground text-[10px] px-2 py-0.5 rounded-full font-bold font-body uppercase">
            best seller
          </span>
        )}
        {isDairyFree && (
          <span className="bg-secondary text-secondary-foreground text-[10px] px-2 py-0.5 rounded-full font-bold font-body uppercase">
            dairy free
          </span>
        )}
      </div>
    </div>
  );
};

export default DrinkCard;
