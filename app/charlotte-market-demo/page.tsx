"use client";

/* eslint-disable @next/next/no-img-element */

import { FormEvent, useState } from "react";

type Product = {
  id: string;
  name: string;
  category: string;
  badge: string;
  price: number;
  rating: number;
  reviews: number;
  image:
    | "rice"
    | "oil"
    | "flour"
    | "egusi"
    | "goat"
    | "plantain"
    | "fish"
    | "spices"
    | "noodles"
    | "malta"
    | "stockfish"
    | "yam";
  accent: string;
  photoUrl: string;
  description: string;
};

type CartItem = Product & {
  quantity: number;
};

type Category = {
  name: string;
  image: "staples" | "produce" | "frozen" | "spices" | "drinks" | "beauty" | "bulk";
};

const products: Product[] = [
  {
    id: "rice",
    name: "Golden Sella Basmati Rice 50lb",
    category: "African Staples",
    badge: "Best Seller",
    price: 24.99,
    rating: 4.8,
    reviews: 124,
    image: "rice",
    accent: "from-[#fff8dc] via-[#f8d675] to-[#c8841a]",
    photoUrl: "/product-images/basmati-rice.png",
    description: "Long-grain rice for jollof, fried rice, and family pantry restocks.",
  },
  {
    id: "palm-oil",
    name: "Red Palm Oil 1gal",
    category: "Oils & Sauces",
    badge: "Most Ordered",
    price: 13.49,
    rating: 4.9,
    reviews: 98,
    image: "oil",
    accent: "from-[#fff1e5] via-[#f36b1d] to-[#9e1b16]",
    photoUrl: "/product-images/red-palm-oil.png",
    description: "Deep red cooking oil for egusi, okra soup, beans, and stews.",
  },
  {
    id: "yam-flour",
    name: "Pounded Yam Flour 4.4lb",
    category: "Flours & Swallows",
    badge: "Family Size",
    price: 10.99,
    rating: 4.7,
    reviews: 86,
    image: "flour",
    accent: "from-[#fff8dc] via-[#f2cf71] to-[#0c6b39]",
    photoUrl: "/product-images/pounded-yam-flour.png",
    description: "Smooth swallow flour for soups, stews, and weekend family meals.",
  },
  {
    id: "egusi",
    name: "Egusi Seeds 2lb",
    category: "Seeds & Seasonings",
    badge: "Fresh Stock",
    price: 8.99,
    rating: 4.8,
    reviews: 76,
    image: "egusi",
    accent: "from-[#fff7d6] via-[#e7a93b] to-[#7b4519]",
    photoUrl: "/product-images/egusi-seeds.png",
    description: "Creamy melon seed staple for traditional Nigerian soups.",
  },
  {
    id: "goat",
    name: "Goat Meat Bone-In per lb",
    category: "Frozen Foods & Meats",
    badge: "Top Rated",
    price: 16.99,
    rating: 4.6,
    reviews: 65,
    image: "goat",
    accent: "from-[#ffe8df] via-[#c96a58] to-[#7b1e20]",
    photoUrl: "/product-images/goat-meat.png",
    description: "Bone-in cuts for pepper soup, stews, and restaurant prep.",
  },
  {
    id: "plantains",
    name: "Fresh Green Plantains",
    category: "Fresh Produce",
    badge: "Pickup Today",
    price: 1.29,
    rating: 4.7,
    reviews: 58,
    image: "plantain",
    accent: "from-[#f5f7b2] via-[#a3c936] to-[#0d6838]",
    photoUrl: "/product-images/plantains.png",
    description: "Fresh plantains for frying, boiling, roasting, or family dinners.",
  },
  {
    id: "frozen-fish",
    name: "Frozen Whole Fish",
    category: "Frozen Foods & Meats",
    badge: "Fresh Stock",
    price: 11.99,
    rating: 4.6,
    reviews: 42,
    image: "fish",
    accent: "from-[#e0f2fe] via-[#80c4e8] to-[#0f766e]",
    photoUrl: "/product-images/frozen-fish.png",
    description: "Freezer-ready fish for soups, grilling, and stews.",
  },
  {
    id: "suya-spice",
    name: "Suya Spice Blend",
    category: "Spices & Seasonings",
    badge: "Best Seller",
    price: 5.99,
    rating: 4.9,
    reviews: 71,
    image: "spices",
    accent: "from-[#fff1d7] via-[#e26d2b] to-[#7c2d12]",
    photoUrl: "/product-images/spices.png",
    description: "Bold spice blend for grilling, suya, marinades, and roasted meat.",
  },
  {
    id: "indomie",
    name: "Indomie Chicken Noodles",
    category: "Noodles",
    badge: "Bulk Available",
    price: 0.99,
    rating: 4.9,
    reviews: 112,
    image: "noodles",
    accent: "from-[#fff5c4] via-[#f59e0b] to-[#b91c1c]",
    photoUrl: "/product-images/indomie-noodles.png",
    description: "Fast pantry favorite for quick meals, cases, and snack runs.",
  },
  {
    id: "malta",
    name: "Malta Guinness",
    category: "Drinks & Snacks",
    badge: "Chilled",
    price: 2.49,
    rating: 4.8,
    reviews: 54,
    image: "malta",
    accent: "from-[#fff5c4] via-[#92400e] to-[#451a03]",
    photoUrl: "/product-images/malta-drink.png",
    description: "Classic malt drink for pickup orders, parties, and weekly shops.",
  },
  {
    id: "stockfish",
    name: "Stockfish Cuts",
    category: "Dried Seafood",
    badge: "Soup Essential",
    price: 18.99,
    rating: 4.7,
    reviews: 49,
    image: "stockfish",
    accent: "from-[#f4e6c1] via-[#c9944c] to-[#6b4a2b]",
    photoUrl: "/product-images/stockfish.png",
    description: "Deep savory flavor for egusi, pepper soup, okra, and stews.",
  },
  {
    id: "yam",
    name: "Fresh Yam Tubers",
    category: "Fresh Produce",
    badge: "Fresh Stock",
    price: 6.99,
    rating: 4.6,
    reviews: 37,
    image: "yam",
    accent: "from-[#f5efe0] via-[#d9bd7d] to-[#8a5f25]",
    photoUrl: "/product-images/yam.png",
    description: "Fresh tubers for boiling, frying, porridge, or holiday meals.",
  },
];

const categories: Category[] = [
  { name: "African Staples", image: "staples" },
  { name: "Fresh Produce", image: "produce" },
  { name: "Frozen Foods & Meats", image: "frozen" },
  { name: "Spices & Seasonings", image: "spices" },
  { name: "Drinks & Snacks", image: "drinks" },
  { name: "Beauty & Household", image: "beauty" },
  { name: "Wholesale Bulk Items", image: "bulk" },
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

const featureItems = [
  ["Pickup", "Ready Today"],
  ["Local Delivery", "In Charlotte"],
  ["Fresh Stock", "Updated Weekly"],
  ["Secure Checkout", "Safe & Easy"],
];

const whyShopItems = [
  ["Authentic Products", "Sourced from trusted suppliers"],
  ["Fresh & Quality Guaranteed", "Updated weekly for freshness"],
  ["Pickup Today", "Order online, pick up in-store"],
  ["Local Delivery", "Fast & reliable in Charlotte"],
  ["Wholesale Pricing", "Special rates for businesses"],
];

const wholesaleCards = [
  ["Bulk Rice & Flour", "staples"],
  ["Frozen Meats & Fish", "frozen"],
  ["Drinks & Snacks", "drinks"],
  ["Spices & Seasonings", "spices"],
  ["Weekly Supply Orders", "bulk"],
] satisfies Array<[string, Category["image"]]>;

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function ProductImage({
  product,
  className,
}: {
  product: Pick<Product, "image" | "accent" | "name" | "photoUrl">;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-[#fffaf3] bg-gradient-to-br shadow-[inset_0_-24px_45px_rgba(58,39,8,0.08)]",
        product.accent,
        className,
      )}
      aria-label={`${product.name} image placeholder`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.85),transparent_25%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.35),transparent_28%)]" />
      {product.image === "rice" && <RiceVisual />}
      {product.image === "oil" && <OilVisual />}
      {product.image === "flour" && <FlourVisual />}
      {product.image === "egusi" && <EgusiVisual />}
      {product.image === "goat" && <GoatVisual />}
      <img
        src={product.photoUrl}
        alt={product.name}
        className="absolute inset-0 h-full w-full object-contain p-3 transition duration-500 hover:scale-105"
        loading="lazy"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/10" />
      <div className="absolute inset-x-8 bottom-3 h-4 rounded-full bg-black/10 blur-md" />
    </div>
  );
}

function RiceVisual() {
  return (
    <>
      <div className="absolute bottom-5 left-1/2 h-[72%] w-[48%] -translate-x-1/2 rounded-t-[28px] rounded-b-xl border border-[#b58c2a]/30 bg-[#fff7dc] shadow-xl">
        <div className="mx-auto mt-5 h-8 w-24 rounded bg-[#07522d]" />
        <div className="mx-auto mt-4 w-28 text-center font-serif text-2xl font-black leading-6 text-[#b91c1c]">
          ROYAL
        </div>
        <div className="mx-auto mt-2 h-14 w-24 rounded-full bg-[#f7c948]/70" />
        <div className="mx-auto mt-3 h-3 w-24 rounded-full bg-[#0b5b34]/25" />
      </div>
      <div className="absolute bottom-10 left-8 h-8 w-24 rotate-[-10deg] rounded-full bg-[#e5c681]" />
    </>
  );
}

function OilVisual() {
  return (
    <>
      <div className="absolute bottom-7 left-1/2 h-[70%] w-[38%] -translate-x-1/2 rounded-b-[30px] rounded-t-lg bg-[#a31e12] shadow-xl">
        <div className="absolute -top-9 left-1/2 h-12 w-12 -translate-x-1/2 rounded-t-lg bg-[#2f8f38]" />
        <div className="mx-auto mt-16 h-24 w-28 rounded-xl bg-[#fff4c7] p-3 text-center shadow">
          <div className="text-xs font-black uppercase text-[#0a522f]">Palm</div>
          <div className="font-serif text-xl font-black text-[#b91c1c]">Oil</div>
          <div className="mx-auto mt-2 h-6 w-14 rounded-full bg-[#f59e0b]" />
        </div>
      </div>
      <div className="absolute bottom-5 left-10 h-12 w-32 rounded-full bg-[#7c2d12]/20" />
    </>
  );
}

function FlourVisual() {
  return (
    <>
      <div className="absolute bottom-5 left-1/2 h-[72%] w-[52%] -translate-x-1/2 rounded-2xl bg-[#f8f0cf] shadow-xl">
        <div className="h-16 rounded-t-2xl bg-[#0b5b34]" />
        <div className="mx-auto mt-5 w-28 text-center font-serif text-2xl font-black leading-6 text-[#0b5b34]">
          Yam Flour
        </div>
        <div className="mx-auto mt-4 h-16 w-20 rounded-full bg-[#f4dfa2]" />
      </div>
      <div className="absolute bottom-7 right-9 h-14 w-24 rotate-[-12deg] rounded-full bg-[#d9b564]" />
    </>
  );
}

function EgusiVisual() {
  return (
    <>
      <div className="absolute bottom-6 left-1/2 h-20 w-40 -translate-x-1/2 rounded-[50%] bg-[#8f4a1a] shadow-xl" />
      <div className="absolute bottom-12 left-1/2 h-16 w-44 -translate-x-1/2 rounded-[50%] bg-[#f2d196] shadow-lg">
        {Array.from({ length: 18 }).map((_, index) => (
          <span
            key={index}
            className="absolute h-3 w-5 rounded-full bg-[#fff5cb] shadow-sm"
            style={{
              left: `${8 + ((index * 19) % 78)}%`,
              top: `${12 + ((index * 31) % 62)}%`,
              transform: `rotate(${index * 21}deg)`,
            }}
          />
        ))}
      </div>
    </>
  );
}

function GoatVisual() {
  return (
    <>
      <div className="absolute bottom-12 left-[18%] h-28 w-32 rotate-[-12deg] rounded-[45%] bg-[#b84f3f] shadow-xl">
        <div className="absolute left-5 top-4 h-8 w-16 rounded-full bg-white/45" />
        <div className="absolute bottom-6 right-4 h-8 w-12 rounded-full bg-[#7b1e20]/35" />
      </div>
      <div className="absolute bottom-10 right-[16%] h-32 w-36 rotate-[10deg] rounded-[45%] bg-[#d17863] shadow-xl">
        <div className="absolute right-5 top-6 h-8 w-20 rounded-full bg-white/50" />
        <div className="absolute bottom-7 left-5 h-8 w-14 rounded-full bg-[#7b1e20]/30" />
      </div>
      <div className="absolute right-10 top-8 h-9 w-16 rounded-full bg-[#0b5b34]" />
    </>
  );
}

function CategoryImage({ type }: { type: Category["image"] }) {
  const palette: Record<Category["image"], string> = {
    staples: "from-[#fff8dc] via-[#e7ba56] to-[#9c6417]",
    produce: "from-[#e7f7c8] via-[#8fcf3d] to-[#0d6838]",
    frozen: "from-[#e0f2fe] via-[#80c4e8] to-[#0f766e]",
    spices: "from-[#fff1d7] via-[#e26d2b] to-[#7c2d12]",
    drinks: "from-[#fff5c4] via-[#f59e0b] to-[#b91c1c]",
    beauty: "from-[#fdf4ff] via-[#d8b4fe] to-[#0f766e]",
    bulk: "from-[#f5efe0] via-[#d9bd7d] to-[#8a5f25]",
  };

  return (
    <div className={cn("relative h-24 overflow-hidden rounded-xl bg-gradient-to-br", palette[type])}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.9),transparent_22%)]" />
      {type === "produce" && (
        <>
          <div className="absolute bottom-5 left-7 h-12 w-24 rotate-[-12deg] rounded-full bg-[#f6d942]" />
          <div className="absolute bottom-7 right-8 h-10 w-16 rotate-[14deg] rounded-full bg-[#d9ed44]" />
        </>
      )}
      {type === "spices" && (
        <>
          <div className="absolute bottom-6 left-8 h-14 w-14 rounded-full bg-[#b91c1c]" />
          <div className="absolute bottom-5 left-20 h-12 w-12 rounded-full bg-[#f59e0b]" />
          <div className="absolute bottom-8 right-10 h-10 w-10 rounded-full bg-[#7c2d12]" />
        </>
      )}
      {type === "drinks" && (
        <>
          <div className="absolute bottom-5 left-8 h-16 w-7 rounded-t-lg bg-[#0b5b34]" />
          <div className="absolute bottom-5 left-20 h-20 w-8 rounded-t-lg bg-[#b91c1c]" />
          <div className="absolute bottom-5 right-10 h-14 w-7 rounded-t-lg bg-[#f8c33a]" />
        </>
      )}
      {type !== "produce" && type !== "spices" && type !== "drinks" && (
        <div className="absolute bottom-5 left-1/2 h-16 w-28 -translate-x-1/2 rounded-xl bg-white/65 shadow-xl" />
      )}
    </div>
  );
}

function QuantityControl({
  value,
  onDecrease,
  onIncrease,
  label,
}: {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
  label: string;
}) {
  return (
    <div className="flex items-center rounded-full border border-[#e6d4b8] bg-white px-1 py-1 shadow-sm">
      <button
        type="button"
        onClick={onDecrease}
        className="grid h-7 w-7 place-items-center rounded-full text-sm font-black text-[#0b4b2b] transition hover:bg-[#f8ecd7]"
        aria-label={`Decrease ${label} quantity`}
      >
        -
      </button>
      <span className="w-8 text-center text-sm font-black">{value}</span>
      <button
        type="button"
        onClick={onIncrease}
        className="grid h-7 w-7 place-items-center rounded-full text-sm font-black text-[#0b4b2b] transition hover:bg-[#f8ecd7]"
        aria-label={`Increase ${label} quantity`}
      >
        +
      </button>
    </div>
  );
}

export default function CharlotteMarketDemoPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>(
    () => Object.fromEntries(products.map((product) => [product.id, 1])),
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [fulfillment, setFulfillment] = useState("Pickup");
  const [searchValue, setSearchValue] = useState("");
  const [checkoutSubmitted, setCheckoutSubmitted] = useState(false);
  const [wholesaleSubmitted, setWholesaleSubmitted] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  function updateQuantity(productId: string, delta: number) {
    setQuantities((current) => ({
      ...current,
      [productId]: Math.max(1, (current[productId] ?? 1) + delta),
    }));
  }

  function addToCart(product: Product) {
    const quantity = quantities[product.id] ?? 1;

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
    setCheckoutSubmitted(true);
  }

  function handleWholesaleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setWholesaleSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#fff9ec] text-[#061f14]">
      {cartOpen && (
        <button
          type="button"
          aria-label="Close cart drawer"
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 z-40 bg-[#061f14]/45 backdrop-blur-sm"
        />
      )}

      <aside
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md transform flex-col border-l border-[#eadac0] bg-[#fff9ec] shadow-2xl transition-transform duration-300",
          cartOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-label="Shopping cart"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#eadac0] bg-white px-6 py-5">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#a64216]">
              Order summary
            </p>
            <h2 className="mt-1 text-2xl font-black">Your cart</h2>
            <p className="mt-1 text-sm font-bold text-[#52685d]">
              Ready Today &bull; 45&ndash;60 mins
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-full border border-[#e0c39d] bg-[#fff6e8] text-xl font-black transition hover:bg-white"
            aria-label="Close cart"
          >
            x
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {cart.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#d8b372] bg-white p-6 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-xl bg-[#00552b] text-xl font-black text-[#f8c33a]">
                CM
              </div>
              <h3 className="mt-5 text-xl font-black">Your cart is empty.</h3>
              <p className="mt-2 text-sm leading-6 text-[#52685d]">
                Add rice, palm oil, plantains, goat meat, or snacks to preview a real pickup order.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCartOpen(false);
                  document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-5 rounded-lg bg-[#006533] px-5 py-3 text-sm font-black text-white transition hover:bg-[#004c27]"
              >
                Browse products
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <article
                  key={item.id}
                  className="grid grid-cols-[72px_1fr] gap-4 rounded-2xl border border-[#eadac0] bg-white p-3 shadow-sm"
                >
                  <ProductImage product={item} className="h-20 w-[72px]" />
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-black leading-5">{item.name}</h3>
                        <p className="mt-1 text-xs font-bold text-[#52685d]">
                          {formatter.format(item.price)} each
                        </p>
                      </div>
                      <p className="text-sm font-black text-[#00552b]">
                        {formatter.format(item.price * item.quantity)}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <QuantityControl
                        value={item.quantity}
                        label={item.name}
                        onDecrease={() => updateCartItem(item.id, item.quantity - 1)}
                        onIncrease={() => updateCartItem(item.id, item.quantity + 1)}
                      />
                      <button
                        type="button"
                        onClick={() => updateCartItem(item.id, 0)}
                        className="text-xs font-black text-[#a64216] transition hover:text-[#7c2d12]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-[#eadac0] bg-[#fff4de] px-5 py-5">
          <label className="text-sm font-black" htmlFor="fulfillment">
            Pickup or delivery
          </label>
          <select
            id="fulfillment"
            value={fulfillment}
            onChange={(event) => setFulfillment(event.target.value)}
            className="mt-2 w-full rounded-xl border border-[#d8b372] bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[#006533] focus:ring-4 focus:ring-[#006533]/10"
          >
            <option>Pickup</option>
            <option>Local delivery</option>
          </select>
          <div className="mt-4 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#52685d]">
            Estimated pickup: <span className="text-[#00552b]">Ready Today &bull; 45&ndash;60 mins</span>
          </div>
          <div className="mt-4 flex items-center justify-between text-xl font-black">
            <span>Subtotal</span>
            <span>{formatter.format(subtotal)}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setCartOpen(false);
              document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-5 w-full rounded-lg bg-[#006533] px-5 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#004c27]"
          >
            Checkout
          </button>
        </div>
      </aside>

      <div className="bg-[#013f1e] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-9 gap-y-2 px-5 py-3 text-xs font-black sm:justify-between">
          <span className="text-[#f8c33a]">4.6&#9733; Google Rating</span>
          <span>217+ Reviews</span>
          <span>Retail & Wholesale</span>
          <span>Pickup Today in Charlotte</span>
          <span>Call Us (704) 555-0196</span>
        </div>
      </div>

      <header className="sticky top-0 z-30 border-b border-[#eadac0] bg-[#fff9ec]/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5">
          <a href="#" className="flex items-center gap-3" aria-label="Charlotte Market home">
            <span className="relative grid h-14 w-14 place-items-center overflow-hidden rounded-2xl bg-[#00552b] text-lg font-black text-[#f8c33a] shadow-[0_10px_28px_rgba(0,85,43,0.22)]">
              <span className="absolute -right-2 -top-2 h-9 w-9 rounded-full border-4 border-[#f8c33a]/45" />
              <span className="absolute bottom-2 left-2 h-2 w-8 rounded-full bg-[#f8c33a]/35" />
              <span className="relative tracking-tight">CMI</span>
            </span>
            <span className="leading-none">
              <span className="block text-xl font-black">Charlotte Market</span>
              <span className="block pt-1 text-[11px] font-black uppercase tracking-[0.42em] text-[#a11b1c]">
                International
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-9 text-sm font-bold text-[#061f14] lg:flex">
            {["Shop", "Categories", "Wholesale", "About Us", "Contact"].map((item) => (
              <a
                key={item}
                href={item === "Wholesale" ? "/charlotte-market-demo/wholesale" : "#products"}
                className="transition hover:text-[#0b6b38]"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              className="inline-flex items-center gap-2 rounded-full border border-[#e0c39d] bg-white px-4 py-2 text-sm font-black text-[#061f14] shadow-sm transition hover:bg-[#fff4de] lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className="grid gap-1">
                <span className="block h-0.5 w-4 rounded-full bg-[#061f14]" />
                <span className="block h-0.5 w-4 rounded-full bg-[#061f14]" />
                <span className="block h-0.5 w-4 rounded-full bg-[#061f14]" />
              </span>
              Menu
            </button>
            <button type="button" className="hidden h-10 w-10 place-items-center rounded-full transition hover:bg-[#f4ead9] sm:grid" aria-label="Search">
              <span className="h-4 w-4 rounded-full border-2 border-[#061f14] after:ml-3 after:mt-3 after:block after:h-2 after:w-0.5 after:rotate-[-45deg] after:bg-[#061f14]" />
            </button>
            <button type="button" className="hidden h-10 w-10 place-items-center rounded-full transition hover:bg-[#f4ead9] sm:grid" aria-label="Account">
              <span className="relative h-5 w-5 rounded-full border-2 border-[#061f14] after:absolute after:-bottom-3 after:left-1/2 after:h-4 after:w-7 after:-translate-x-1/2 after:rounded-t-full after:border-2 after:border-[#061f14] after:border-b-0" />
            </button>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative grid h-10 w-10 place-items-center rounded-full transition hover:bg-[#f4ead9]"
              aria-label="Open cart"
            >
              <span className="h-5 w-6 rounded-b-md border-2 border-[#061f14] before:absolute before:left-[15px] before:top-[9px] before:h-2 before:w-3 before:rounded-t-full before:border-2 before:border-b-0 before:border-[#061f14]" />
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#00552b] px-1 text-[10px] font-black text-white">
                {cartCount}
              </span>
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div id="mobile-menu" className="border-t border-[#eadac0] bg-[#fff9ec] px-5 py-4 shadow-[0_18px_40px_rgba(55,34,12,0.08)] lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-2">
              {["Shop", "Categories", "Wholesale", "About Us", "Contact"].map((item) => (
                <a
                  key={item}
                  href={item === "Wholesale" ? "/charlotte-market-demo/wholesale" : "#products"}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl border border-[#eadac0] bg-white px-4 py-3 text-sm font-black text-[#061f14] transition hover:bg-[#fff4de]"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <section className="border-b border-[#eadac0] bg-[#fff4de] px-5 py-3">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 text-sm sm:flex-row sm:items-center sm:gap-3">
          <span className="w-fit rounded-full bg-[#00552b] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#f8c33a]">
            Prototype Preview
          </span>
          <span className="font-bold text-[#31483b]">
            Built specifically for Charlotte Market International to demonstrate online ordering.
          </span>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-[#eadac0] bg-[radial-gradient(circle_at_62%_28%,rgba(232,170,58,0.22),transparent_30%),linear-gradient(90deg,#fff9ec_0%,#fff5e5_45%,#f3ddba_100%)]">
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(45deg,#00552b_25%,transparent_25%,transparent_50%,#00552b_50%,#00552b_75%,transparent_75%,transparent)] [background-size:34px_34px]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 lg:grid-cols-[0.43fr_0.57fr] lg:py-20">
          <div className="relative z-10">
            <p className="inline-flex rounded-full border border-[#d8b372] bg-[#fff7e6] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#00552b]">
              African &bull; Caribbean &bull; International
            </p>
            <h1 className="mt-8 max-w-2xl font-serif text-5xl font-black leading-[1.08] tracking-tight text-[#063d25] sm:text-6xl xl:text-[72px]">
              Shop African, Caribbean & International Groceries Online
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#273f32]">
              Order your favorite essentials for pickup, local delivery, or wholesale supply.
            </p>

            <div className="mt-9 flex max-w-xl rounded-xl border border-[#d49b55] bg-white p-2 shadow-[0_18px_50px_rgba(92,55,16,0.13)]">
              <input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search egusi, yam, palm oil, goat meat..."
                className="min-h-12 flex-1 rounded-lg px-4 text-sm font-semibold outline-none placeholder:text-[#95856e]"
              />
              <button type="button" className="grid h-12 w-14 place-items-center rounded-lg bg-[#006533] text-white transition hover:bg-[#004c27]" aria-label="Search products">
                <span className="h-4 w-4 rounded-full border-2 border-white after:ml-3 after:mt-3 after:block after:h-2 after:w-0.5 after:rotate-[-45deg] after:bg-white" />
              </button>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a href="#products" className="rounded-lg bg-[#006533] px-6 py-4 text-center text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#004c27]">
                Start Shopping
              </a>
              <a href="#wholesale" className="rounded-lg bg-[#f8c33a] px-6 py-4 text-center text-sm font-black text-[#102116] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#eaae20]">
                Request Wholesale Pricing
              </a>
            </div>

            <div className="mt-9 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {featureItems.map(([title, detail]) => (
                <div key={title} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-[#d8b372] bg-[#fff7e6] text-xs font-black text-[#00552b]">
                    CM
                  </span>
                  <span>
                    <span className="block text-xs font-black">{title}</span>
                    <span className="block text-xs text-[#41584b]">{detail}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[430px] lg:min-h-[560px]">
            <div className="absolute -left-5 bottom-3 right-0 top-3 rounded-[36px] bg-[#00552b]/10 blur-2xl" />
            <div className="absolute inset-0 overflow-hidden rounded-[36px] bg-white p-3 shadow-[0_34px_90px_rgba(84,48,12,0.22)]">
              <img
                src="/product-images/charlotte-market-hero.png"
                alt="Premium arrangement of African and Caribbean grocery essentials"
                className="h-full w-full rounded-[28px] object-cover"
              />
              <div className="absolute inset-3 rounded-[28px] bg-gradient-to-r from-white/28 via-transparent to-black/5" />
            </div>
            <div className="absolute right-4 top-8 grid h-32 w-32 place-items-center rounded-full border-[6px] border-white bg-[#fff7e6] text-center shadow-2xl sm:h-40 sm:w-40">
              <p className="px-3 text-xs font-black uppercase text-[#684313]">
                Trusted by <span className="block text-4xl text-[#c46517]">217+</span> Local Families
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#eadac0] bg-[#fff9ec]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 md:flex-row md:items-center">
          <p className="text-xs font-black uppercase tracking-wide text-[#a64216]">Popular Searches</p>
          <div className="flex gap-3 overflow-x-auto md:flex-wrap">
            {popularSearches.map((search) => (
              <button
                key={search}
                type="button"
                onClick={() => setSearchValue(search)}
                className="shrink-0 rounded-full border border-[#e0c39d] bg-[#fff6e8] px-5 py-2 text-xs font-black transition hover:-translate-y-0.5 hover:bg-white"
              >
                {search}
              </button>
            ))}
          </div>
          <a href="#products" className="ml-auto hidden text-sm font-black text-[#0b4b2b] md:block">
            View all products
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-7">
        <div className="grid gap-3 rounded-2xl border border-[#eadac0] bg-white px-5 py-5 shadow-[0_18px_45px_rgba(55,34,12,0.08)] sm:grid-cols-2 lg:grid-cols-5">
          {[
            "Imported Weekly",
            "Authentic Brands",
            "Local Pickup",
            "Fresh Produce",
            "Wholesale Available",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm font-black text-[#063d25]">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#edf9e6] text-[#006533]">
                ✓
              </span>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="products" className="mx-auto max-w-7xl px-5 py-8">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#a64216]">Customers Love</p>
            <h2 className="mt-1 font-serif text-3xl font-black tracking-tight">Charlotte&apos;s Favorite Picks</h2>
            <p className="mt-1 text-sm text-[#52685d]">Hand-picked bestsellers, loved by our community.</p>
          </div>
          <a href="#products" className="hidden text-sm font-black text-[#0b4b2b] sm:block">
            View all bestsellers
          </a>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {products.slice(0, 5).map((product) => (
            <article key={product.id} className="rounded-2xl border border-[#e7d0ad] bg-white p-4 shadow-[0_14px_34px_rgba(55,34,12,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(55,34,12,0.14)]">
              <div className="relative">
                <ProductImage product={product} className="h-52" />
                <span className="absolute left-3 top-3 rounded-md bg-[#006533] px-3 py-1 text-[10px] font-black uppercase text-white">
                  {product.badge}
                </span>
              </div>
              <h3 className="mt-5 min-h-12 text-base font-black leading-6">{product.name}</h3>
              <p className="mt-2 text-xs font-semibold text-[#52685d]">{product.category}</p>
              <p className="mt-4 text-xs font-black text-[#d97706]">
                ⭐⭐⭐⭐⭐ <span className="font-bold text-[#687b70]">{product.reviews} Reviews</span>
              </p>
              <p className="mt-2 text-xs font-black text-[#006533]">Pickup Today</p>
              <div className="mt-5 flex items-center justify-between gap-3">
                <p className="text-xl font-black">{formatter.format(product.price)}</p>
                <QuantityControl
                  value={quantities[product.id] ?? 1}
                  label={product.name}
                  onDecrease={() => updateQuantity(product.id, -1)}
                  onIncrease={() => updateQuantity(product.id, 1)}
                />
              </div>
              <button
                type="button"
                onClick={() => addToCart(product)}
                className="mt-5 w-full rounded-lg bg-[#006533] px-4 py-3 text-sm font-black text-white transition hover:bg-[#004c27]"
              >
                Add to Cart
              </button>
            </article>
          ))}
        </div>

        <div className="mt-10 flex items-end justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#a64216]">Market Essentials</p>
            <h2 className="mt-1 font-serif text-2xl font-black tracking-tight">More items customers can order online</h2>
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(5).map((product) => (
            <article key={product.id} className="rounded-2xl border border-[#e7d0ad] bg-white p-4 shadow-[0_14px_34px_rgba(55,34,12,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(55,34,12,0.14)]">
              <div className="relative">
                <ProductImage product={product} className="h-48" />
                <span className="absolute left-3 top-3 rounded-md bg-[#006533] px-3 py-1 text-[10px] font-black uppercase text-white">
                  {product.badge}
                </span>
              </div>
              <h3 className="mt-5 text-base font-black leading-6">{product.name}</h3>
              <p className="mt-3 min-h-10 text-xs leading-5 text-[#52685d]">{product.description}</p>
              <p className="mt-4 text-xs font-black text-[#d97706]">
                ⭐⭐⭐⭐⭐ <span className="font-bold text-[#687b70]">{product.reviews} Reviews</span>
              </p>
              <p className="mt-2 text-xs font-black text-[#006533]">Pickup Today</p>
              <div className="mt-5 flex items-center justify-between gap-3">
                <p className="text-xl font-black">{formatter.format(product.price)}</p>
                <QuantityControl
                  value={quantities[product.id] ?? 1}
                  label={product.name}
                  onDecrease={() => updateQuantity(product.id, -1)}
                  onIncrease={() => updateQuantity(product.id, 1)}
                />
              </div>
              <button
                type="button"
                onClick={() => addToCart(product)}
                className="mt-5 w-full rounded-lg bg-[#006533] px-4 py-3 text-sm font-black text-white transition hover:bg-[#004c27]"
              >
                Add to Cart
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="checkout" className="mx-auto grid max-w-7xl gap-5 px-5 py-8 lg:grid-cols-[0.84fr_1.16fr]">
        <article className="rounded-2xl bg-[#003f20] p-6 text-white shadow-lg">
          <p className="text-xs font-black uppercase tracking-wide text-[#f8c33a]">
            Checkout preview
          </p>
          <h2 className="mt-3 font-serif text-3xl font-black leading-tight">
            See how a customer would place a pickup order.
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/80">
            This frontend-only flow shows the owner how shoppers can add groceries, choose pickup
            or local delivery, and submit order notes before arriving at the store.
          </p>
          <div className="mt-6 rounded-xl bg-white/10 p-4">
            <div className="flex items-center justify-between text-sm font-black">
              <span>Items in cart</span>
              <span>{cartCount}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm font-black">
              <span>Cart subtotal</span>
              <span>{formatter.format(subtotal)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm font-black">
              <span>Estimated pickup</span>
              <span>Ready Today &bull; 45&ndash;60 mins</span>
            </div>
          </div>
        </article>

        <form
          onSubmit={handleCheckoutSubmit}
          className="rounded-2xl border border-[#e7d0ad] bg-white p-6 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-black">
              Full name
              <input className="mt-2 w-full rounded-xl border border-[#e0c39d] px-4 py-3 text-sm outline-none focus:border-[#006533] focus:ring-4 focus:ring-[#006533]/10" required />
            </label>
            <label className="text-sm font-black">
              Phone number
              <input className="mt-2 w-full rounded-xl border border-[#e0c39d] px-4 py-3 text-sm outline-none focus:border-[#006533] focus:ring-4 focus:ring-[#006533]/10" required />
            </label>
            <label className="text-sm font-black sm:col-span-2">
              Email
              <input type="email" className="mt-2 w-full rounded-xl border border-[#e0c39d] px-4 py-3 text-sm outline-none focus:border-[#006533] focus:ring-4 focus:ring-[#006533]/10" required />
            </label>
            <label className="text-sm font-black">
              Pickup or local delivery
              <select
                value={fulfillment}
                onChange={(event) => setFulfillment(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[#e0c39d] bg-white px-4 py-3 text-sm outline-none focus:border-[#006533] focus:ring-4 focus:ring-[#006533]/10"
              >
                <option>Pickup</option>
                <option>Local delivery</option>
              </select>
            </label>
            <label className="text-sm font-black">
              Preferred pickup time
              <input type="datetime-local" className="mt-2 w-full rounded-xl border border-[#e0c39d] px-4 py-3 text-sm outline-none focus:border-[#006533] focus:ring-4 focus:ring-[#006533]/10" required />
            </label>
          </div>

          <fieldset className="mt-5">
            <legend className="text-sm font-black">Payment method</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {["Pay online", "Pay at pickup"].map((method) => (
                <label
                  key={method}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#e7d0ad] bg-[#fff9ec] px-4 py-3 text-sm font-black"
                >
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked={method === "Pay at pickup"}
                  />
                  {method}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="mt-5 block text-sm font-black">
            Order notes
            <textarea
              className="mt-2 min-h-28 w-full rounded-xl border border-[#e0c39d] px-4 py-3 text-sm outline-none focus:border-[#006533] focus:ring-4 focus:ring-[#006533]/10"
              placeholder="Cut goat meat small, call when ready, substitute if needed..."
            />
          </label>

          <button className="mt-6 w-full rounded-lg bg-[#006533] px-5 py-4 text-sm font-black text-white transition hover:bg-[#004c27]">
            Place Order
          </button>

          {checkoutSubmitted && (
            <p className="mt-5 rounded-xl bg-[#edf9e6] p-4 text-sm font-black text-[#00552b]">
              Demo order received &mdash; this is how customers could place pickup orders online.
            </p>
          )}
        </form>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
          {categories.map((category) => (
            <article key={category.name} className="rounded-xl border border-[#e7d0ad] bg-white p-3 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <CategoryImage type={category.image} />
              <h3 className="mt-3 text-xs font-black">{category.name}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-8 lg:grid-cols-[1.25fr_0.72fr_0.72fr]">
        <article className="grid gap-5 rounded-xl bg-[#003f20] p-6 text-white shadow-lg md:grid-cols-[0.82fr_1fr]">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#f8c33a]">
                Bring the in-store experience online
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight">Your favorite aisles. Now online.</h2>
              <p className="mt-4 text-sm leading-6 text-white/85">
                Browse thousands of authentic African, Caribbean & International products. Check
                availability, place pickup orders, and shop wholesale anytime, anywhere.
              </p>
            </div>
            <a href="#products" className="mt-6 w-fit rounded-lg bg-[#f8c33a] px-6 py-3 text-sm font-black text-[#102116] transition hover:bg-[#eaae20]">
              Shop the Demo
            </a>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              ["Fresh produce", "produce"],
              ["Frozen section", "frozen"],
              ["Rice aisle", "staples"],
              ["Spice wall", "spices"],
            ].map(([label, image]) => (
              <div key={label} className="relative overflow-hidden rounded-xl">
                <CategoryImage type={image as Category["image"]} />
                <span className="absolute bottom-2 left-2 rounded-md bg-white/90 px-2 py-1 text-[10px] font-black text-[#0b4b2b]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl bg-[#fff4de] p-6 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-[#a64216]">Why shop with us?</p>
          <div className="mt-5 space-y-5">
            {whyShopItems.map(([title, detail]) => (
              <div key={title} className="flex gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#d8b372] text-xs font-black text-[#0b4b2b]">
                  CM
                </span>
                <span>
                  <span className="block text-sm font-black">{title}</span>
                  <span className="block text-xs leading-5 text-[#52685d]">{detail}</span>
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-[#d8e8c7] bg-[#f1fae9] p-6 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-[#0b4b2b]">Need ingredients?</p>
          <h2 className="mt-4 text-2xl font-black">Let AI Help You Shop</h2>
          <p className="mt-3 text-sm leading-6 text-[#40584a]">
            Tell our AI assistant what you want to cook and get a list of ingredients instantly.
          </p>
          <div className="mt-5 space-y-2">
            {[
              "What do I need for egusi soup?",
              "Show me jollof rice ingredients",
              "Do you have goat meat and stockfish?",
            ].map((prompt) => (
              <button key={prompt} type="button" className="w-full rounded-lg bg-white px-4 py-3 text-left text-xs font-bold shadow-sm transition hover:-translate-y-0.5">
                {prompt}
              </button>
            ))}
          </div>
          <button className="mt-4 w-full rounded-lg bg-[#006533] px-4 py-3 text-sm font-black text-white transition hover:bg-[#004c27]">
            Try AI Shopping Demo
          </button>
        </article>
      </section>

      <section id="wholesale" className="mx-auto grid max-w-7xl gap-5 px-5 py-8 lg:grid-cols-[0.92fr_1.22fr_0.86fr]">
        <article className="rounded-xl border border-[#e7d0ad] bg-[#fff4de] p-6">
          <p className="text-xs font-black uppercase tracking-wide text-[#a64216]">
            Wholesale & Bulk Supply
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight">Grow your business with reliable supply.</h2>
          <p className="mt-4 text-sm leading-6 text-[#40584a]">
            We support restaurants, caterers, churches, events, food trucks, and small businesses
            with quality products and competitive wholesale pricing.
          </p>
          <a href="#wholesale-form" className="mt-6 inline-flex rounded-lg bg-[#006533] px-6 py-3 text-sm font-black text-white transition hover:bg-[#004c27]">
            Request Wholesale Quote
          </a>
        </article>

        <article className="rounded-xl border border-[#e7d0ad] bg-white p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {wholesaleCards.map(([title, image]) => (
              <div key={title} className="rounded-xl border border-[#eadac0] bg-[#fffaf0] p-3 text-center">
                <CategoryImage type={image} />
                <h3 className="mt-3 text-xs font-black">{title}</h3>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-3 rounded-xl bg-[#fff8ea] p-4 text-xs sm:grid-cols-4">
            {[
              ["Competitive Pricing", "Better rates for bulk orders"],
              ["Consistent Quality", "Trusted products"],
              ["Flexible Quantities", "Small to large orders"],
              ["Dedicated Support", "We're here to help"],
            ].map(([title, detail]) => (
              <div key={title}>
                <p className="font-black">{title}</p>
                <p className="mt-1 text-[#52685d]">{detail}</p>
              </div>
            ))}
          </div>
        </article>

        <form
          id="wholesale-form"
          onSubmit={handleWholesaleSubmit}
          className="rounded-xl bg-[#003f20] p-5 text-white shadow-lg"
        >
          <p className="text-xs font-black uppercase tracking-wide text-[#f8c33a]">
            Request Wholesale Pricing
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <input className="rounded-lg border border-white/15 bg-white px-4 py-3 text-sm font-semibold text-[#061f14] outline-none" placeholder="Business Name" required />
            <input className="rounded-lg border border-white/15 bg-white px-4 py-3 text-sm font-semibold text-[#061f14] outline-none" placeholder="Your Name" required />
            <input className="rounded-lg border border-white/15 bg-white px-4 py-3 text-sm font-semibold text-[#061f14] outline-none" placeholder="Phone Number" required />
            <input type="email" className="rounded-lg border border-white/15 bg-white px-4 py-3 text-sm font-semibold text-[#061f14] outline-none" placeholder="Email Address" required />
            <select className="rounded-lg border border-white/15 bg-white px-4 py-3 text-sm font-semibold text-[#061f14] outline-none" required defaultValue="">
              <option value="" disabled>
                Business Type
              </option>
              <option>Restaurant</option>
              <option>Caterer</option>
              <option>Church or Event</option>
              <option>Food Truck</option>
              <option>Small Grocery Store</option>
            </select>
          </div>
          <button className="mt-4 w-full rounded-lg bg-[#f8c33a] px-5 py-3 text-sm font-black text-[#102116] transition hover:bg-[#eaae20]">
            Send Request
          </button>
          {wholesaleSubmitted && (
            <p className="mt-4 rounded-lg bg-white/10 p-3 text-center text-xs font-bold text-[#f8c33a]">
              Request received. We will contact you within 24 hours.
            </p>
          )}
        </form>
      </section>

      <footer className="mt-8 border-t border-[#eadac0] bg-[#003f20] px-5 py-10 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-[#f8c33a] text-base font-black text-[#003f20]">
                <span className="absolute -right-2 -top-2 h-8 w-8 rounded-full border-4 border-[#003f20]/20" />
                CMI
              </span>
              <div>
                <p className="text-lg font-black">Charlotte Market</p>
                <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#f8c33a]">
                  International
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/75">
              Premium ecommerce ordering concept for African, Caribbean, and international grocery
              pickup, delivery, and wholesale supply.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-wide text-[#f8c33a]">About</h3>
            <div className="mt-4 space-y-2 text-sm text-white/75">
              <p>Local Charlotte market</p>
              <p>Authentic groceries</p>
              <p>Fresh produce</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-wide text-[#f8c33a]">Wholesale</h3>
            <div className="mt-4 space-y-2 text-sm text-white/75">
              <p>Restaurants</p>
              <p>Caterers</p>
              <p>Events & churches</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-wide text-[#f8c33a]">Contact</h3>
            <div className="mt-4 space-y-2 text-sm text-white/75">
              <p>Charlotte, NC</p>
              <p>(704) 555-0196</p>
              <p>Mon-Sat, 9am-8pm</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-wide text-[#f8c33a]">Newsletter</h3>
            <p className="mt-4 text-sm leading-6 text-white/75">
              Weekly specials, fresh arrivals, and wholesale supply updates.
            </p>
            <div className="mt-4 flex rounded-xl bg-white p-1">
              <input
                className="min-w-0 flex-1 rounded-lg px-3 text-sm font-semibold text-[#061f14] outline-none"
                placeholder="Email address"
              />
              <button
                type="button"
                className="rounded-lg bg-[#f8c33a] px-4 py-2 text-xs font-black text-[#003f20]"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-7xl flex-col justify-between gap-3 border-t border-white/15 pt-5 text-xs leading-6 text-white/65 md:flex-row">
          <p>
            Prototype concept for Charlotte Market International. Final design, catalog, pricing,
            payments, pickup/delivery, and inventory would be customized for the business.
          </p>
          <p>
            Developed by{" "}
            <a className="font-black text-[#f8c33a]" href="https://opzix.io">
              Opzix Solutions
            </a>{" "}
            · opzix.io
          </p>
        </div>
      </footer>
    </main>
  );
}
