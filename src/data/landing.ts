export interface EventPackage {
  id: string;
  label: string;
  title: string;
  price: string;
  badges: string[];
  details: string[];
  addOns: string[];
}

export const eventPackages: EventPackage[] = [
  {
    id: "package-a",
    label: "package a",
    title: "coffee cart",
    price: "PHP 14,500",
    badges: ["8oz hot", "12oz iced"],
    details: [
      "100 cups",
      "5 classic drinks",
      "4 hours of service",
      "2 on-site baristas",
    ],
    addOns: [
      "special espresso-based drinks +2,000",
      "special espresso-free drinks +1,500",
      "dairy alternatives +3,000",
      "custom packaging starts 1,000",
      "custom drinks starts 1,000",
    ],
  },
  {
    id: "package-b",
    label: "package b",
    title: "coffee cart",
    price: "PHP 21,000",
    badges: ["8oz hot", "12oz iced"],
    details: [
      "150 cups",
      "5 classic drinks",
      "4 hours of service",
      "2 on-site baristas",
    ],
    addOns: [
      "special espresso-based drinks +3,000",
      "special espresso-free drinks +2,500",
      "dairy alternatives +4,000",
      "custom packaging starts 1,000",
      "custom drinks starts 1,000",
    ],
  },
  {
    id: "package-c",
    label: "package c",
    title: "the dot fridge",
    price: "PHP 20,000",
    badges: ["cold brew", "espresso"],
    details: [
      "100 cans",
      "5 flavors in can",
      "6 hours fridge rental",
    ],
    addOns: [],
  },
];

export const coffeeCartMenu = {
  classics: [
    "americano",
    "latte",
    "salted caramel",
    "signature mocha",
    "spanish latte",
    "cold brew",
    "burnt vanilla",
    "butterscotch",
    "white chocolate mocha",
  ],
  specialsCoffee: [
    "dirty horchata",
    "dirty matcha",
    "salted honey oat latte",
    "cookie butter oat latte",
    "dirty cereal milk",
  ],
  specialsNonCoffee: [
    "matcha",
    "horchata",
    "salted caramel matcha",
  ],
  kids: [
    "cereal milk",
    "strawberry milk",
    "banana milk",
    "iced chocolate",
    "hot chocolate",
  ],
};

export const fridgeMenu = {
  cannedColdBrew: [
    "cold brew",
    "cold brew latte",
    "salted caramel cold brew",
    "white chocolate mocha cold brew",
    "spanish latte cold brew",
    "dirty matcha cold brew",
  ],
  cannedEspresso: [
    "canned americano",
    "canned latte",
    "canned burnt vanilla",
    "canned spanish latte",
    "canned salted caramel",
    "canned signature mocha",
    "canned white chocolate mocha",
    "canned horchata",
    "canned dirty horchata",
    "canned matcha",
    "canned dirty matcha",
  ],
};

export const landingNotes = {
  packageFootnote1:
    "manpower and logistics within metro manila start at PHP 2,000. fees for outside of metro manila start at PHP 4,000.",
  packageFootnote2:
    "a maximum of 8 flavor combinations is allowed for packages that include add-on drinks.",
  kidsNote: "for your kids' birthday parties, and school events",
};

export const bestSellers = ["latte", "dirty horchata", "dirty matcha"];
export const dairyFree = ["horchata"];
