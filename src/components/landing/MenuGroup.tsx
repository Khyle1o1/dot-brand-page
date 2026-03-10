import DrinkCard from "./DrinkCard";

interface MenuGroupProps {
  title: string;
  items: string[];
  variant?: "default" | "blue";
}

const MenuGroup = ({ title, items, variant = "default" }: MenuGroupProps) => {
  return (
    <div className="mb-14">
      <h3 className="font-display text-2xl md:text-3xl font-bold text-accent mb-8 capitalize tracking-tight">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((item) => (
          <DrinkCard key={item} name={item} variant={variant} />
        ))}
      </div>
    </div>
  );
};

export default MenuGroup;
