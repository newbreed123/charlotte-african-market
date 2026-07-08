"use client";

import { FormEvent, useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  badge: string;
  stock: string;
  rating: string;
  accent: string;
  label: string;
  keywords: string[];
};

type CartItem = Product & {
  quantity: number;
};

const categories = [
  {
    name: "African Staples",
    description: "Rice, gari, fufu flour, pounded yam, beans, and everyday pantry essentials.",
    gradient: "from-[#f8c33a] via-[#f97316] to-[#b45309]",
    label: "Rice",
  },
  {
    name: "Fresh Produce",
    description: "Plantains, peppers, ginger, garlic, onions, fresh yams, and seasonal finds.",
    gradient: "from-[#166534] via-[#65a30d] to-[#f8c33a]",
    label: "Fresh",
  },
  {
    name: "Frozen Foods & Meats",
    description: "Goat meat, frozen fish, seafood, cassava, and family freezer staples.",
    gradient: "from-[#991b1b] via-[#dc2626] to-[#fb923c]",
    label: "Frozen",
  },
  {
    name: "Spices & Seasonings",
    description: "Suya spice, curry, jerk, peppers, bouillon, shito, and soup seasonings.",
    gradient: "from-[#7c2d12] via-[#b45309] to-[#f59e0b]",
    label: "Spice",
  },
  {
    name: "Drinks & Snacks",
    description: "Malta, Vimto, Ribena, plantain chips, chin chin, biscuits, and treats.",
    gradient: "from-[#be123c] via-[#f97316] to-[#f8c33a]",
    label: "Snack",
  },
  {
    name: "Beauty & Household",
    description: "Trusted beauty, kitchen, and household products for repeat weekly shoppers.",
    gradient: "from-[#0f766e] via-[#14532d] to-[#eab308]",
    label: "Care",
  },
  {
    name: "Wholesale Bulk Items",
    description: "Bulk rice, oils, drinks, meats, spices, and dry goods for local supply orders.",
    gradient: "from-[#052e16] via-[#14532d] to-[#ca8a04]",
    label: "Bulk",
  },
];

const products: Product[] = [
  {
    id: "basmati-rice",
    name: "Golden Sella Basmati Rice",
    category: "African Staples",
    description: "Long-grain family bag for jollof, fried rice, and weekly meal prep.",
    price: 24.99,
    badge: "Most Ordered",
    stock: "In stock - pickup today",
    rating: "4.9",
    accent: "from-[#fef3c7] via-[#f8c33a] to-[#d97706]",
    label: "Rice",
    keywords: ["rice", "basmati", "jollof", "bulk", "family"],
  },
  {
    id: "red-palm-oil",
    name: "Red Palm Oil",
    category: "Oils & Sauces",
    description: "Rich red palm oil for egusi, ogbono, okra soup, and stews.",
    price: 13.49,
    badge: "Pickup Today",
    stock: "Limited bottles available",
    rating: "4.8",
    accent: "from-[#fee2e2] via-[#ef4444] to-[#f59e0b]",
    label: "Palm",
    keywords: ["palm oil", "oil", "egusi", "soup", "stew"],
  },
  {
    id: "pounded-yam-flour",
    name: "Pounded Yam Flour",
    category: "African Staples",
    description: "Smooth swallow staple for soups, family dinners, and weekend cooking.",
    price: 10.99,
    badge: "Family Size",
    stock: "In stock - aisle 2",
    rating: "4.7",
    accent: "from-[#fff7ed] via-[#fde68a] to-[#f59e0b]",
    label: "Yam",
    keywords: ["yam", "pounded yam", "fufu", "flour", "swallow"],
  },
  {
    id: "egusi-seeds",
    name: "Egusi Seeds",
    category: "Seeds & Thickeners",
    description: "Whole melon seeds ready for grinding into rich traditional soup.",
    price: 8.99,
    badge: "Best Seller",
    stock: "Fresh batch available",
    rating: "4.9",
    accent: "from-[#ecfccb] via-[#84cc16] to-[#f8c33a]",
    label: "Egusi",
    keywords: ["egusi", "seeds", "melon", "soup"],
  },
  {
    id: "stockfish",
    name: "Stockfish",
    category: "Dried Seafood",
    description: "Soup-ready dried fish flavor for egusi, pepper soup, and stews.",
    price: 18.99,
    badge: "Soup Essential",
    stock: "In stock - ask for cuts",
    rating: "4.6",
    accent: "from-[#d1fae5] via-[#0f766e] to-[#fbbf24]",
    label: "Fish",
    keywords: ["stockfish", "fish", "dried fish", "egusi", "pepper soup"],
  },
  {
    id: "plantain-chips",
    name: "Plantain Chips",
    category: "Drinks & Snacks",
    description: "Crisp snack packs for lunch boxes, parties, and quick cravings.",
    price: 3.99,
    badge: "Fresh",
    stock: "Ready near checkout",
    rating: "4.8",
    accent: "from-[#fef9c3] via-[#eab308] to-[#22c55e]",
    label: "Chips",
    keywords: ["plantain", "chips", "snack", "plantain chips"],
  },
  {
    id: "indomie-noodles",
    name: "Indomie Noodles",
    category: "Noodles",
    description: "Fast favorite for college meals, family snacks, and bulk pantry restocks.",
    price: 0.99,
    badge: "Bulk Available",
    stock: "Cases available",
    rating: "4.9",
    accent: "from-[#fee2e2] via-[#ef4444] to-[#f8c33a]",
    label: "Indomie",
    keywords: ["indomie", "noodles", "bulk", "case"],
  },
  {
    id: "malta-guinness",
    name: "Malta Guinness",
    category: "Drinks & Snacks",
    description: "Classic malt drink, chilled singles or party-ready packs.",
    price: 2.49,
    badge: "Chilled",
    stock: "Cold drinks ready",
    rating: "4.7",
    accent: "from-[#451a03] via-[#92400e] to-[#f59e0b]",
    label: "Malta",
    keywords: ["malta", "guinness", "drink", "malt", "snack"],
  },
  {
    id: "goat-meat",
    name: "Goat Meat",
    category: "Frozen Foods & Meats",
    description: "Frozen goat meat packs for pepper soup, stews, and restaurant prep.",
    price: 16.99,
    badge: "Pickup Today",
    stock: "Frozen section",
    rating: "4.8",
    accent: "from-[#fee2e2] via-[#991b1b] to-[#fb923c]",
    label: "Goat",
    keywords: ["goat", "goat meat", "meat", "frozen", "pepper soup"],
  },
  {
    id: "suya-spice",
    name: "Suya Spice",
    category: "Spices & Seasonings",
    description: "Bold pepper and peanut-style spice blend for grilling and marinades.",
    price: 5.99,
    badge: "Best Seller",
    stock: "In stock - spice aisle",
    rating: "4.9",
    accent: "from-[#ffedd5] via-[#b45309] to-[#ef4444]",
    label: "Suya",
    keywords: ["suya", "suya spice", "spice", "seasoning", "pepper"],
  },
];

const popularSearches = [
  "Egusi",
  "Fufu",
  "Palm Oil",
  "Goat Meat",
  "Plantain",
  "Indomie",
  "Stockfish",
  "Suya Spice",
];

const favoriteIds = [
  "basmati-rice",
  "red-palm-oil",
  "egusi-seeds",
  "goat-meat",
  "indomie-noodles",
];

const marketScenes = [
  {
    title: "Fresh produce aisle",
    detail: "Plantains, yams, peppers, ginger, and weekly fresh essentials.",
    gradient: "from-[#166534] via-[#84cc16] to-[#f8c33a]",
  },
  {
    title: "Frozen foods section",
    detail: "Goat meat, fish, seafood, cassava, and ready-to-cook packs.",
    gradient: "from-[#0f766e] via-[#2563eb] to-[#bae6fd]",
  },
  {
    title: "Rice and flour aisle",
    detail: "Basmati rice, fufu flour, pounded yam, gari, and bulk staples.",
    gradient: "from-[#fef3c7] via-[#f8c33a] to-[#b45309]",
  },
  {
    title: "Spices and seasonings",
    detail: "Suya, curry, jerk seasoning, bouillon, peppers, and soup blends.",
    gradient: "from-[#7c2d12] via-[#dc2626] to-[#f59e0b]",
  },
  {
    title: "Checkout counter",
    detail: "Fast pickup handoff, order notes, and friendly local service.",
    gradient: "from-[#14532d] via-[#0f766e] to-[#f8c33a]",
  },
];

const wholesaleCards = [
  "Bulk rice & flour",
  "Frozen meats & fish",
  "Drinks & snacks",
  "Spices & seasonings",
  "Weekly supply orders",
];

const wholesaleAudiences = [
  "Restaurants",
  "Caterers",
  "Churches",
  "Event planners",
  "Food trucks",
  "Small grocery stores",
];

const trustCards = [
  "Local Charlotte grocery market",
  "Retail + wholesale",
  "Pickup ordering",
  "Local delivery ready",
  "Built for repeat customers",
];

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function ProductPhoto({
  product,
  compact = false,
  hero = false,
}: {
  product: Pick<Product, "accent" | "label" | "name">;
  compact?: boolean;
  hero?: boolean;
}) {
  if (compact) {
    return (
      <div
        className={cn(
          "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br shadow-inner",
          product.accent,
        )}
        aria-hidden="true"
      >
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_9px_9px,#fff_2px,transparent_2px)] [background-size:16px_16px]" />
        <div className="absolute -right-3 -top-3 h-10 w-10 rounded-full bg-white/40" />
        <div className="absolute bottom-2 left-2 right-2 rounded-md bg-white/85 px-2 py-1 text-center text-[10px] font-black uppercase text-[#123527] shadow-sm">
          {product.label}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-gradient-to-br shadow-inner",
        hero ? "h-full min-h-36" : "h-48",
        product.accent,
      )}
      aria-label={`${product.name} image placeholder`}
    >
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_24px_24px,#fff_2px,transparent_2px)] [background-size:28px_28px]" />
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/35 blur-[1px]" />
      <div className="absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-[#14532d]/20" />
      <div className="absolute left-4 top-4 rounded-full border border-white/50 bg-white/70 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-[#14532d] backdrop-blur">
        Photo style
      </div>
      <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/50 bg-white/85 p-4 text-[#123527] shadow-xl backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="h-3 w-12 rounded-full bg-[#14532d]/20" />
          <span className="h-3 w-8 rounded-full bg-[#f97316]/35" />
        </div>
        <div className="mt-3 text-2xl font-black uppercase">{product.label}</div>
        <div className="mt-2 h-2 w-24 rounded-full bg-[#f8c33a]/60" />
      </div>
    </div>
  );
}

function HeroMarketVisual() {
  const heroItems = [
    {
      name: "Plantains",
      label: "Plantain",
      accent: "from-[#ecfccb] via-[#84cc16] to-[#f8c33a]",
      size: "md:col-span-2 md:row-span-2",
    },
    {
      name: "Rice",
      label: "Rice",
      accent: "from-[#fff7ed] via-[#f8c33a] to-[#d97706]",
      size: "",
    },
    {
      name: "Palm oil",
      label: "Palm Oil",
      accent: "from-[#fee2e2] via-[#dc2626] to-[#f59e0b]",
      size: "",
    },
    {
      name: "Peppers",
      label: "Peppers",
      accent: "from-[#dc2626] via-[#f97316] to-[#f8c33a]",
      size: "",
    },
    {
      name: "Frozen fish",
      label: "Fish",
      accent: "from-[#d1fae5] via-[#0f766e] to-[#60a5fa]",
      size: "",
    },
    {
      name: "Yam",
      label: "Yam",
      accent: "from-[#fefce8] via-[#fde68a] to-[#ca8a04]",
      size: "",
    },
    {
      name: "Egusi",
      label: "Egusi",
      accent: "from-[#ecfccb] via-[#a3e635] to-[#eab308]",
      size: "",
    },
    {
      name: "Fufu flour",
      label: "Fufu",
      accent: "from-[#fffaf0] via-[#fed7aa] to-[#f59e0b]",
      size: "md:col-span-2",
    },
  ];

  return (
    <div className="relative rounded-[30px] bg-[#123527] p-3 shadow-[0_30px_90px_rgba(20,83,45,0.28)]">
      <div className="absolute -left-6 top-16 h-24 w-24 rounded-full bg-[#f8c33a]/35 blur-2xl" />
      <div className="absolute -bottom-7 right-10 h-28 w-28 rounded-full bg-[#ef4444]/25 blur-2xl" />
      <div className="relative overflow-hidden rounded-[24px] bg-[#fff8e7] p-4">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(135deg,#14532d_10%,transparent_10%,transparent_50%,#14532d_50%,#14532d_60%,transparent_60%,transparent)] [background-size:34px_34px]" />
        <div className="relative mb-4 flex items-center justify-between gap-3">
          <div className="rounded-xl bg-white/90 px-4 py-3 shadow-lg">
            <p className="text-xs font-black uppercase text-[#b45309]">Online order</p>
            <p className="text-xl font-black text-[#123527]">Ready today</p>
          </div>
          <div className="rounded-full bg-[#14532d] px-4 py-3 text-xs font-black uppercase text-white shadow-lg">
            Retail + wholesale
          </div>
        </div>
        <div className="relative grid min-h-[520px] grid-cols-2 gap-3 md:grid-cols-4">
          {heroItems.map((item) => (
            <div key={item.name} className={cn("min-h-32", item.size)}>
              <ProductPhoto product={item} hero />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CharlotteMarketDemoPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>(
    () => Object.fromEntries(products.map((product) => [product.id, 1])),
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [fulfillment, setFulfillment] = useState("Pickup");
  const [searchTerm, setSearchTerm] = useState("");
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [wholesaleSuccess, setWholesaleSuccess] = useState(false);

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const featuredProducts = products.filter((product) => favoriteIds.includes(product.id));

  const filteredProducts = useMemo(() => {
    if (!normalizedSearch) {
      return products;
    }

    return products.filter((product) => {
      const haystack = [
        product.name,
        product.category,
        product.description,
        product.badge,
        product.stock,
        ...product.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedSearch);
    });
  }, [normalizedSearch]);

  const subtotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart],
  );

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  function choosePopularSearch(term: string) {
    setSearchTerm(term);
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  }

  function setProductQuantity(productId: string, quantity: number) {
    setSelectedQuantities((current) => ({
      ...current,
      [productId]: Math.max(1, quantity),
    }));
  }

  function addToCart(product: Product) {
    const quantity = selectedQuantities[product.id] ?? 1;
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...current, { ...product, quantity }];
    });
    setCartOpen(true);
  }

  function updateCartItem(productId: string, quantity: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function handleCheckoutSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCheckoutSuccess(true);
  }

  function handleWholesaleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setWholesaleSuccess(true);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf0] text-[#123527]">
      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="flex w-full items-center justify-between rounded-full bg-[#14532d] px-5 py-4 text-sm font-black text-white shadow-2xl transition hover:bg-[#0f3f24] active:scale-[0.98]"
        >
          <span>View cart</span>
          <span className="rounded-full bg-[#f8c33a] px-3 py-1 text-[#123527]">
            {cartCount ? `${cartCount} items` : "Empty"}
          </span>
        </button>
      </div>

      {cartOpen && (
        <button
          type="button"
          aria-label="Close cart backdrop"
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 z-40 bg-[#123527]/45 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md transform flex-col border-l border-[#eadfbd] bg-[#fffdf7] shadow-2xl transition-transform duration-300",
          cartOpen ? "translate-x-0" : "translate-x-full",
          "lg:w-[430px]",
        )}
        aria-label="Order summary"
      >
        <div className="border-b border-[#eadfbd] bg-white px-6 py-5">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#b45309]">
                Order Summary
              </p>
              <h2 className="mt-1 text-2xl font-black">Your market cart</h2>
              <p className="mt-2 text-sm font-bold text-[#557063]">
                Ready Today - 45-60 mins
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCartOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-full border border-[#d9c99b] text-xl font-bold transition hover:bg-[#fff4d8]"
              aria-label="Close cart"
            >
              x
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cart.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#d9c99b] bg-[#fff8e7] p-6 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#14532d] text-sm font-black text-[#f8c33a]">
                CM
              </div>
              <p className="mt-5 text-lg font-black">Your cart is waiting.</p>
              <p className="mt-2 text-sm leading-6 text-[#5d7567]">
                Add rice, palm oil, egusi, goat meat, or snacks to preview a real pickup order.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCartOpen(false);
                  document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-5 rounded-full bg-[#14532d] px-5 py-3 text-sm font-black text-white transition hover:bg-[#0f3f24]"
              >
                Browse products
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[64px_1fr] gap-4 rounded-2xl border border-[#eadfbd] bg-white p-3 shadow-sm"
                >
                  <ProductPhoto product={item} compact />
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-black leading-5">{item.name}</p>
                        <p className="mt-1 text-xs font-bold text-[#6b7f72]">{item.category}</p>
                      </div>
                      <p className="font-black text-[#14532d]">
                        {formatter.format(item.price * item.quantity)}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateCartItem(item.id, item.quantity - 1)}
                        className="grid h-8 w-8 place-items-center rounded-full bg-[#f5ead0] font-black transition hover:bg-[#eadfbd]"
                        aria-label={`Decrease ${item.name}`}
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-black">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateCartItem(item.id, item.quantity + 1)}
                        className="grid h-8 w-8 place-items-center rounded-full bg-[#14532d] font-black text-white transition hover:bg-[#0f3f24]"
                        aria-label={`Increase ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-[#eadfbd] bg-[#fff8e7] px-6 py-5">
          <label className="text-sm font-black text-[#123527]" htmlFor="cart-fulfillment">
            Pickup or delivery
          </label>
          <select
            id="cart-fulfillment"
            value={fulfillment}
            onChange={(event) => setFulfillment(event.target.value)}
            className="mt-2 w-full rounded-xl border border-[#d9c99b] bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-[#14532d] focus:ring-4 focus:ring-[#14532d]/10"
          >
            <option>Pickup</option>
            <option>Local delivery</option>
            <option>Wholesale supply</option>
          </select>
          <div className="mt-4 rounded-xl bg-white p-4 text-sm font-bold text-[#557063]">
            Estimated pickup: <span className="text-[#14532d]">Ready Today - 45-60 mins</span>
          </div>
          <div className="mt-5 flex items-center justify-between text-xl font-black">
            <span>Subtotal</span>
            <span>{formatter.format(subtotal)}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setCartOpen(false);
              document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-5 w-full rounded-full bg-[#14532d] px-6 py-4 text-sm font-black text-white shadow-market transition hover:-translate-y-0.5 hover:bg-[#0f3f24] active:translate-y-0"
          >
            Continue to checkout
          </button>
        </div>
      </aside>

      <header className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#f8c33a55,transparent_32%),linear-gradient(135deg,#fffaf0_0%,#fff4d8_45%,#fef2c7_100%)]" />
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="#" className="flex items-center gap-3" aria-label="Charlotte Market demo home">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#14532d] text-lg font-black text-[#f8c33a] shadow-lg">
              CM
            </span>
            <span>
              <span className="block text-sm font-black">Charlotte Market</span>
              <span className="block text-xs font-bold uppercase tracking-wide text-[#b45309]">
                International Grocery
              </span>
            </span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-black text-[#365647] md:flex">
            <a className="transition hover:text-[#b45309]" href="#categories">
              Categories
            </a>
            <a className="transition hover:text-[#b45309]" href="#products">
              Products
            </a>
            <a className="transition hover:text-[#b45309]" href="#wholesale">
              Wholesale
            </a>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="rounded-full border border-[#d9c99b] bg-white px-5 py-3 text-sm font-black shadow-sm transition hover:-translate-y-0.5 hover:shadow-market"
          >
            Cart {cartCount ? `(${cartCount})` : ""}
          </button>
        </nav>

        <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-7 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:pb-20 lg:pt-12">
          <div>
            <div className="grid grid-cols-2 gap-3 text-xs font-black uppercase tracking-wide text-[#14532d] sm:grid-cols-4">
              {["4.6 Google Rating", "217+ Reviews", "Retail + Wholesale", "Pickup Ready"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-full border border-[#eadfbd] bg-white/85 px-3 py-2 text-center shadow-sm backdrop-blur"
                  >
                    {item}
                  </div>
                ),
              )}
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[1.02] text-[#123527] sm:text-6xl lg:text-7xl">
              Shop African, Caribbean & International Groceries Online
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#496454] sm:text-xl">
              Order your favorite essentials for pickup, local delivery, or wholesale supply.
            </p>

            <div className="mt-7 rounded-2xl border border-[#eadfbd] bg-white p-2 shadow-market">
              <label className="sr-only" htmlFor="market-search">
                Search products
              </label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  id="market-search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search egusi, yam, palm oil, goat meat..."
                  className="min-h-14 flex-1 rounded-xl border border-transparent bg-[#fff8e7] px-5 text-base font-bold outline-none transition placeholder:text-[#8a7a56] focus:border-[#14532d] focus:bg-white focus:ring-4 focus:ring-[#14532d]/10"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                  className="rounded-xl bg-[#14532d] px-6 py-4 text-sm font-black text-white transition hover:bg-[#0f3f24]"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#products"
                className="rounded-full bg-[#14532d] px-7 py-4 text-center text-sm font-black text-white shadow-market transition hover:-translate-y-0.5 hover:bg-[#0f3f24]"
              >
                Start Shopping
              </a>
              <a
                href="#wholesale"
                className="rounded-full border border-[#d9c99b] bg-white px-7 py-4 text-center text-sm font-black text-[#14532d] shadow-sm transition hover:-translate-y-0.5 hover:shadow-market"
              >
                Request Wholesale Pricing
              </a>
            </div>
          </div>

          <HeroMarketVisual />
        </section>
      </header>

      <section className="border-y border-[#eadfbd] bg-white/70 py-6 backdrop-blur">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <p className="shrink-0 text-sm font-black uppercase tracking-wide text-[#b45309]">
              Popular searches
            </p>
            <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-wrap lg:overflow-visible lg:pb-0">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => choosePopularSearch(term)}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-sm font-black transition hover:-translate-y-0.5",
                    searchTerm.toLowerCase() === term.toLowerCase()
                      ? "border-[#14532d] bg-[#14532d] text-white shadow-market"
                      : "border-[#eadfbd] bg-[#fff8e7] text-[#14532d] hover:bg-white",
                  )}
                >
                  {term}
                </button>
              ))}
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="shrink-0 rounded-full border border-[#eadfbd] bg-white px-4 py-2 text-sm font-black text-[#b45309] transition hover:bg-[#fff8e7]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#b45309]">
              Shop by aisle
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Everything customers already come in for.
            </h2>
          </div>
          <p className="max-w-xl text-[#557063]">
            Organized like a real online grocery storefront, with quick paths for family shoppers,
            restaurant owners, and repeat pantry orders.
          </p>
        </div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <article
              key={category.name}
              className="group rounded-2xl border border-[#eadfbd] bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-market"
            >
              <div
                className={cn(
                  "relative h-28 overflow-hidden rounded-xl bg-gradient-to-br p-4 shadow-inner",
                  category.gradient,
                )}
              >
                <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_18px_18px,#fff_2px,transparent_2px)] [background-size:24px_24px]" />
                <div className="absolute bottom-4 left-4 rounded-lg bg-white/85 px-3 py-2 text-sm font-black uppercase text-[#123527] shadow">
                  {category.label}
                </div>
              </div>
              <h3 className="mt-5 text-xl font-black">{category.name}</h3>
              <p className="mt-3 text-sm leading-6 text-[#5c7668]">{category.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#123527] py-16 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-[#f8c33a]">
                Charlotte's Favorites
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight">
                Charlotte's Favorite African Grocery Picks
              </h2>
            </div>
            <p className="max-w-xl text-white/75">
              Larger product moments for the items customers are most likely to order again and
              again.
            </p>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {featuredProducts.map((product) => (
              <article
                key={product.id}
                className="group rounded-2xl bg-[#fffdf7] p-3 text-[#123527] shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.25)]"
              >
                <ProductPhoto product={product} />
                <div className="p-3">
                  <div className="flex flex-wrap gap-2">
                    {[product.badge, "Pickup Today"].map((badge) => (
                      <span
                        key={badge}
                        className="rounded-full bg-[#fff4d8] px-3 py-1 text-[11px] font-black uppercase text-[#b45309]"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-4 text-xl font-black leading-7">{product.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5c7668]">{product.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xl font-black text-[#14532d]">
                      {formatter.format(product.price)}
                    </span>
                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="rounded-full bg-[#14532d] px-4 py-3 text-sm font-black text-white transition hover:bg-[#0f3f24]"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="bg-[#fffaf0] py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-[#b45309]">
                Featured products
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight">
                Build a pickup order in seconds.
              </h2>
              {searchTerm && (
                <p className="mt-3 text-sm font-bold text-[#557063]">
                  Showing {filteredProducts.length} match
                  {filteredProducts.length === 1 ? "" : "es"} for "{searchTerm}".
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="w-fit rounded-full bg-[#14532d] px-6 py-3 text-sm font-black text-white shadow-market transition hover:-translate-y-0.5 hover:bg-[#0f3f24]"
            >
              View Cart {cartCount ? `(${cartCount})` : ""}
            </button>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="mt-9 rounded-2xl border border-dashed border-[#d9c99b] bg-white p-8 text-center">
              <p className="text-xl font-black">No products matched that search.</p>
              <p className="mt-2 text-[#557063]">Try egusi, fufu, palm oil, goat meat, or rice.</p>
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="mt-5 rounded-full bg-[#14532d] px-6 py-3 text-sm font-black text-white"
              >
                Show all products
              </button>
            </div>
          ) : (
            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className={cn(
                    "group rounded-2xl border bg-white p-3 text-[#123527] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-market",
                    normalizedSearch ? "border-[#f8c33a] ring-4 ring-[#f8c33a]/20" : "border-[#eadfbd]",
                  )}
                >
                  <ProductPhoto product={product} />
                  <div className="px-2 pb-2 pt-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#14532d] px-3 py-1 text-[11px] font-black uppercase text-white">
                        {product.badge}
                      </span>
                      <span className="rounded-full bg-[#fff4d8] px-3 py-1 text-[11px] font-black uppercase text-[#b45309]">
                        {product.stock}
                      </span>
                    </div>
                    <p className="mt-4 text-xs font-black uppercase tracking-wide text-[#b45309]">
                      {product.category}
                    </p>
                    <h3 className="mt-2 min-h-14 text-lg font-black leading-7">{product.name}</h3>
                    <p className="mt-2 min-h-16 text-sm leading-6 text-[#60776b]">
                      {product.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-black text-[#b45309]">
                        {product.rating} star rating
                      </span>
                      <span className="text-sm font-bold text-[#14532d]">Available</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <p className="text-2xl font-black text-[#14532d]">
                        {formatter.format(product.price)}
                      </p>
                      <div className="flex items-center rounded-full border border-[#eadfbd] bg-[#fff8e7] p-1">
                        <button
                          type="button"
                          className="grid h-8 w-8 place-items-center rounded-full font-black transition hover:bg-[#eadfbd]"
                          onClick={() =>
                            setProductQuantity(product.id, selectedQuantities[product.id] - 1)
                          }
                          aria-label={`Decrease ${product.name} quantity`}
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-sm font-black">
                          {selectedQuantities[product.id]}
                        </span>
                        <button
                          type="button"
                          className="grid h-8 w-8 place-items-center rounded-full bg-[#14532d] font-black text-white transition hover:bg-[#0f3f24]"
                          onClick={() =>
                            setProductQuantity(product.id, selectedQuantities[product.id] + 1)
                          }
                          aria-label={`Increase ${product.name} quantity`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="mt-4 w-full rounded-full bg-[#f8c33a] px-4 py-3 text-sm font-black text-[#123527] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f97316] hover:text-white active:translate-y-0"
                    >
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#fff4d8] py-16">
        <div className="mx-auto grid max-w-7xl gap-9 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#b45309]">
              Inside the market
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Bring the in-store experience online.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#557063]">
              Customers can browse familiar aisles, check availability, place pickup orders, and
              request wholesale pricing before they ever walk through the door.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {marketScenes.map((scene, index) => (
              <article
                key={scene.title}
                className={cn(
                  "group rounded-2xl bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-market",
                  index === 0 ? "sm:row-span-2" : "",
                )}
              >
                <div
                  className={cn(
                    "relative overflow-hidden rounded-xl bg-gradient-to-br shadow-inner",
                    index === 0 ? "min-h-72" : "min-h-36",
                    scene.gradient,
                  )}
                >
                  <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(45deg,#fff_25%,transparent_25%,transparent_50%,#fff_50%,#fff_75%,transparent_75%,transparent)] [background-size:28px_28px]" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/85 p-4 shadow-lg backdrop-blur">
                    <h3 className="font-black">{scene.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#557063]">{scene.detail}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="rounded-[28px] bg-[#14532d] p-8 text-white shadow-market sm:p-10">
          <p className="text-sm font-black uppercase tracking-wide text-[#f8c33a]">
            AI shopping assistant teaser
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">
            Need ingredients for jollof, egusi, or pepper soup?
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
            Customers could ask an AI shopping assistant what ingredients they need and add
            everything to cart in seconds.
          </p>
        </div>
        <div className="rounded-[28px] border border-[#eadfbd] bg-white p-5 shadow-market">
          {[
            "What do I need for egusi soup?",
            "Show me jollof rice ingredients",
            "Do you have goat meat and stockfish?",
          ].map((prompt) => (
            <button
              key={prompt}
              type="button"
              className="mb-3 block w-full rounded-2xl bg-[#fff8e7] px-5 py-4 text-left text-sm font-black text-[#14532d] transition hover:-translate-y-0.5 hover:bg-[#fff4d8]"
            >
              {prompt}
            </button>
          ))}
          <div className="rounded-2xl bg-[#14532d] p-5 text-white">
            <p className="text-sm font-bold leading-6">
              Demo response: Egusi soup basket could include egusi seeds, palm oil, stockfish,
              pepper, spinach, bouillon, and your choice of goat meat or fish.
            </p>
          </div>
        </div>
      </section>

      <section id="checkout" className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="rounded-[28px] bg-[#f8c33a] p-8 shadow-market">
          <p className="text-sm font-black uppercase tracking-wide text-[#14532d]">
            Checkout preview
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">
            A real order flow without backend complexity.
          </h2>
          <p className="mt-5 leading-7 text-[#355445]">
            Customers review their cart, choose pickup or local delivery, add order notes, and send
            a clear request the store can fulfill.
          </p>
          <div className="mt-8 rounded-2xl bg-white/85 p-5">
            <div className="flex items-center justify-between text-sm font-black">
              <span>Cart subtotal</span>
              <span>{formatter.format(subtotal)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm font-black">
              <span>Items selected</span>
              <span>{cartCount}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm font-black">
              <span>Fulfillment</span>
              <span>{fulfillment}</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleCheckoutSubmit}
          className="rounded-[28px] border border-[#eadfbd] bg-white p-6 shadow-market"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-black">
              Full name
              <input className="mt-2 w-full rounded-xl border border-[#d9c99b] px-4 py-3 outline-none transition focus:border-[#14532d] focus:ring-4 focus:ring-[#14532d]/10" required />
            </label>
            <label className="text-sm font-black">
              Phone number
              <input className="mt-2 w-full rounded-xl border border-[#d9c99b] px-4 py-3 outline-none transition focus:border-[#14532d] focus:ring-4 focus:ring-[#14532d]/10" required />
            </label>
            <label className="text-sm font-black sm:col-span-2">
              Email
              <input type="email" className="mt-2 w-full rounded-xl border border-[#d9c99b] px-4 py-3 outline-none transition focus:border-[#14532d] focus:ring-4 focus:ring-[#14532d]/10" required />
            </label>
            <label className="text-sm font-black">
              Pickup or local delivery
              <select
                value={fulfillment}
                onChange={(event) => setFulfillment(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[#d9c99b] bg-white px-4 py-3 outline-none transition focus:border-[#14532d] focus:ring-4 focus:ring-[#14532d]/10"
              >
                <option>Pickup</option>
                <option>Local delivery</option>
              </select>
            </label>
            <label className="text-sm font-black">
              Preferred pickup time
              <input type="datetime-local" className="mt-2 w-full rounded-xl border border-[#d9c99b] px-4 py-3 outline-none transition focus:border-[#14532d] focus:ring-4 focus:ring-[#14532d]/10" required />
            </label>
          </div>
          <fieldset className="mt-5">
            <legend className="text-sm font-black">Payment option</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {["Pay online", "Pay at pickup"].map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#eadfbd] bg-[#fff8e7] px-4 py-3 text-sm font-black transition hover:bg-[#fff4d8]"
                >
                  <input type="radio" name="payment" defaultChecked={option === "Pay at pickup"} />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="mt-5 block text-sm font-black">
            Order notes
            <textarea
              className="mt-2 min-h-28 w-full rounded-xl border border-[#d9c99b] px-4 py-3 outline-none transition focus:border-[#14532d] focus:ring-4 focus:ring-[#14532d]/10"
              placeholder="Cut goat meat small, call when ready, substitute if needed..."
            />
          </label>
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-[#14532d] px-6 py-4 text-sm font-black text-white shadow-market transition hover:-translate-y-0.5 hover:bg-[#0f3f24] active:translate-y-0"
          >
            Place Order
          </button>
          {checkoutSuccess && (
            <div className="mt-5 rounded-2xl border border-[#bbf7d0] bg-[#ecfdf3] p-5 text-[#14532d]">
              <p className="font-black">
                Demo order received. This is how customers could place pickup orders online.
              </p>
              <p className="mt-2 text-sm font-bold text-[#3f6b54]">
                The real version could connect to payments, inventory, notifications, and staff
                fulfillment.
              </p>
            </div>
          )}
        </form>
      </section>

      <section id="wholesale" className="bg-[#fff4d8] py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#b45309]">
              Wholesale revenue channel
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">Need Bulk Grocery Supply?</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#557063]">
              Built for restaurants, caterers, churches, event planners, food trucks, and small
              grocery stores that need reliable weekly supply.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {wholesaleAudiences.map((audience) => (
                <span
                  key={audience}
                  className="rounded-full border border-[#eadfbd] bg-white px-4 py-2 text-sm font-black text-[#14532d]"
                >
                  {audience}
                </span>
              ))}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {wholesaleCards.map((card) => (
                <div key={card} className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="h-10 w-10 rounded-xl bg-[#14532d]" />
                  <p className="mt-4 font-black">{card}</p>
                </div>
              ))}
            </div>
          </div>

          <form
            id="wholesale-form"
            onSubmit={handleWholesaleSubmit}
            className="rounded-[28px] border border-[#eadfbd] bg-white p-6 shadow-market"
          >
            <div className="mb-5">
              <p className="text-sm font-black uppercase tracking-wide text-[#b45309]">
                Request wholesale pricing
              </p>
              <h3 className="mt-2 text-2xl font-black">Send a bulk supply request</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-black">
                Business name
                <input className="mt-2 w-full rounded-xl border border-[#d9c99b] px-4 py-3 outline-none transition focus:border-[#14532d] focus:ring-4 focus:ring-[#14532d]/10" required />
              </label>
              <label className="text-sm font-black">
                Contact name
                <input className="mt-2 w-full rounded-xl border border-[#d9c99b] px-4 py-3 outline-none transition focus:border-[#14532d] focus:ring-4 focus:ring-[#14532d]/10" required />
              </label>
              <label className="text-sm font-black">
                Phone
                <input className="mt-2 w-full rounded-xl border border-[#d9c99b] px-4 py-3 outline-none transition focus:border-[#14532d] focus:ring-4 focus:ring-[#14532d]/10" required />
              </label>
              <label className="text-sm font-black">
                Estimated quantity
                <input className="mt-2 w-full rounded-xl border border-[#d9c99b] px-4 py-3 outline-none transition focus:border-[#14532d] focus:ring-4 focus:ring-[#14532d]/10" placeholder="Cases, bags, pallets" required />
              </label>
              <label className="text-sm font-black sm:col-span-2">
                Products needed
                <textarea className="mt-2 min-h-28 w-full rounded-xl border border-[#d9c99b] px-4 py-3 outline-none transition focus:border-[#14532d] focus:ring-4 focus:ring-[#14532d]/10" placeholder="Rice, palm oil, drinks, goat meat..." required />
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-[#f8c33a] px-6 py-4 text-sm font-black text-[#123527] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f97316] hover:text-white active:translate-y-0"
            >
              Send Wholesale Request
            </button>
            {wholesaleSuccess && (
              <p className="mt-5 rounded-2xl bg-[#ecfdf3] p-4 text-sm font-black text-[#14532d]">
                Wholesale request captured for the demo.
              </p>
            )}
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {trustCards.map((card) => (
            <div
              key={card}
              className="rounded-2xl border border-[#eadfbd] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-market"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#14532d] text-xs font-black text-[#f8c33a]">
                CM
              </div>
              <p className="mt-5 font-black">{card}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] bg-[#14532d] p-8 text-white shadow-market sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-[#f8c33a]">
                Ready for the next step
              </p>
              <h2 className="mt-3 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
                Your customers already trust your store. Now let them shop anytime, anywhere.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">
                A custom online ordering system can turn local foot traffic, repeat customers, and
                wholesale demand into digital revenue.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a
                href="#products"
                className="rounded-full bg-[#f8c33a] px-7 py-4 text-center text-sm font-black text-[#123527] transition hover:-translate-y-0.5 hover:bg-[#f97316] hover:text-white"
              >
                Shop the Demo
              </a>
              <a
                href="#wholesale"
                className="rounded-full border border-white/30 bg-white/10 px-7 py-4 text-center text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-[#14532d]"
              >
                Request Wholesale Quote
              </a>
            </div>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-5xl text-center text-xs font-bold leading-6 text-[#6b7f72]">
          Prototype concept for Charlotte Market International. Final design, product catalog,
          pricing, payments, pickup/delivery, and inventory would be customized for the business.
        </p>
      </section>
    </main>
  );
}
