"use client";

import { FormEvent, useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  accent: string;
  note: string;
  emoji: string;
};

type CartItem = Product & {
  quantity: number;
};

const categories = [
  {
    name: "African Staples",
    icon: "rice",
    description: "Rice, gari, fufu flours, yam, beans, and everyday pantry essentials.",
    gradient: "from-[#f5c542] to-[#f97316]",
  },
  {
    name: "Fresh Produce",
    icon: "plantain",
    description: "Plantains, peppers, ginger, garlic, onions, fresh yams, and seasonal finds.",
    gradient: "from-[#2f855a] to-[#84cc16]",
  },
  {
    name: "Frozen Foods & Meats",
    icon: "meat",
    description: "Goat meat, fish, cassava, seafood, and freezer staples ready for family meals.",
    gradient: "from-[#b91c1c] to-[#fb923c]",
  },
  {
    name: "Spices & Seasonings",
    icon: "spice",
    description: "Suya, curry, jerk, bouillon, peppers, shito, and traditional soup seasonings.",
    gradient: "from-[#7c2d12] to-[#f59e0b]",
  },
  {
    name: "Drinks & Snacks",
    icon: "malt",
    description: "Malta, Vimto, Ribena, plantain chips, biscuits, chin chin, and sweet treats.",
    gradient: "from-[#be123c] to-[#f59e0b]",
  },
  {
    name: "Beauty & Household",
    icon: "care",
    description: "Trusted beauty, kitchen, and household products for repeat weekly shoppers.",
    gradient: "from-[#0f766e] to-[#eab308]",
  },
  {
    name: "Wholesale Bulk Items",
    icon: "bulk",
    description: "Bulk rice, beans, corn, oils, drinks, and supply support for local businesses.",
    gradient: "from-[#14532d] to-[#ca8a04]",
  },
];

const products: Product[] = [
  {
    id: "basmati-rice",
    name: "Golden Sella Basmati Rice",
    category: "African Staples",
    price: 24.99,
    accent: "from-[#facc15] to-[#f97316]",
    note: "Premium bag",
    emoji: "rice",
  },
  {
    id: "red-palm-oil",
    name: "Red Palm Oil",
    category: "Oils & Sauces",
    price: 13.49,
    accent: "from-[#dc2626] to-[#f59e0b]",
    note: "Stews & soups",
    emoji: "oil",
  },
  {
    id: "pounded-yam-flour",
    name: "Pounded Yam Flour",
    category: "African Staples",
    price: 10.99,
    accent: "from-[#fde68a] to-[#f59e0b]",
    note: "Family size",
    emoji: "yam",
  },
  {
    id: "egusi-seeds",
    name: "Egusi Seeds",
    category: "Seeds & Thickeners",
    price: 8.99,
    accent: "from-[#84cc16] to-[#facc15]",
    note: "Whole melon seed",
    emoji: "seeds",
  },
  {
    id: "stockfish",
    name: "Stockfish",
    category: "Dried Seafood",
    price: 18.99,
    accent: "from-[#0f766e] to-[#fbbf24]",
    note: "Soup-ready cuts",
    emoji: "fish",
  },
  {
    id: "plantain-chips",
    name: "Plantain Chips",
    category: "Drinks & Snacks",
    price: 3.99,
    accent: "from-[#eab308] to-[#22c55e]",
    note: "Crunchy snack",
    emoji: "chips",
  },
  {
    id: "indomie-noodles",
    name: "Indomie Noodles",
    category: "Noodles",
    price: 0.99,
    accent: "from-[#ef4444] to-[#facc15]",
    note: "Quick meal",
    emoji: "noodles",
  },
  {
    id: "malta-guinness",
    name: "Malta Guinness",
    category: "Drinks & Snacks",
    price: 2.49,
    accent: "from-[#78350f] to-[#f59e0b]",
    note: "Chilled malt",
    emoji: "malt",
  },
  {
    id: "goat-meat",
    name: "Goat Meat",
    category: "Frozen Foods & Meats",
    price: 16.99,
    accent: "from-[#991b1b] to-[#fb923c]",
    note: "Frozen pack",
    emoji: "meat",
  },
  {
    id: "suya-spice",
    name: "Suya Spice",
    category: "Spices & Seasonings",
    price: 5.99,
    accent: "from-[#b45309] to-[#ef4444]",
    note: "Bold pepper blend",
    emoji: "spice",
  },
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

function ProductArtwork({
  accent,
  emoji,
  compact = false,
}: {
  accent: string;
  emoji: string;
  compact?: boolean;
}) {
  const motif: Record<string, string> = {
    rice: "RICE",
    oil: "PALM",
    yam: "YAM",
    seeds: "EGUSI",
    fish: "FISH",
    chips: "CHIPS",
    noodles: "NOODLES",
    malt: "MALTA",
    meat: "GOAT",
    spice: "SUYA",
  };

  if (compact) {
    return (
      <div
        className={`relative h-16 w-16 overflow-hidden rounded-lg bg-gradient-to-br ${accent} shadow-inner`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_10px_10px,#fff_2px,transparent_2px)] [background-size:16px_16px]" />
        <div className="absolute bottom-2 left-2 right-2 rounded-md bg-white/80 px-2 py-1 text-center text-[10px] font-black text-[#123527] shadow-sm">
          {motif[emoji]}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative h-44 overflow-hidden rounded-lg bg-gradient-to-br ${accent} shadow-inner`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_24px_24px,#fff_2px,transparent_2px)] [background-size:28px_28px]" />
      <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/35" />
      <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-[#14532d]/20" />
      <div className="absolute inset-x-5 bottom-5 rounded-lg border border-white/45 bg-white/80 p-4 text-[#123527] shadow-lg backdrop-blur">
        <div className="h-3 w-12 rounded-full bg-[#14532d]/20" />
        <div className="mt-3 text-2xl font-black">{motif[emoji]}</div>
        <div className="mt-1 h-2 w-20 rounded-full bg-[#f59e0b]/45" />
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
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [wholesaleSuccess, setWholesaleSuccess] = useState(false);

  const subtotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart],
  );

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

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
      <div className="fixed bottom-4 right-4 z-40 md:hidden">
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="rounded-full bg-[#14532d] px-5 py-3 text-sm font-bold text-white shadow-2xl"
        >
          Cart {cartCount ? `(${cartCount})` : ""}
        </button>
      </div>

      {cartOpen && (
        <button
          type="button"
          aria-label="Close cart backdrop"
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 z-40 bg-[#123527]/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md transform flex-col border-l border-[#d9c99b] bg-[#fffdf7] shadow-2xl transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        } lg:w-[420px]`}
        aria-label="Order summary"
      >
        <div className="flex items-center justify-between border-b border-[#eadfbd] px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase text-[#b45309]">Order Summary</p>
            <h2 className="text-2xl font-black">Your market cart</h2>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-full border border-[#d9c99b] text-xl"
            aria-label="Close cart"
          >
            x
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cart.length === 0 ? (
            <div className="rounded-lg border border-dashed border-[#d9c99b] bg-[#fff8e7] p-6 text-center">
              <p className="font-bold">Your cart is ready.</p>
              <p className="mt-2 text-sm text-[#5d7567]">
                Add grocery favorites to preview an online pickup order.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[64px_1fr] gap-4 rounded-lg border border-[#eadfbd] bg-white p-3 shadow-sm"
                >
                  <ProductArtwork accent={item.accent} emoji={item.emoji} compact />
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold">{item.name}</p>
                        <p className="text-xs text-[#6b7f72]">{item.category}</p>
                      </div>
                      <p className="font-bold text-[#14532d]">
                        {formatter.format(item.price * item.quantity)}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateCartItem(item.id, item.quantity - 1)}
                        className="grid h-8 w-8 place-items-center rounded-full bg-[#f5ead0] font-bold"
                        aria-label={`Decrease ${item.name}`}
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-bold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartItem(item.id, item.quantity + 1)}
                        className="grid h-8 w-8 place-items-center rounded-full bg-[#14532d] font-bold text-white"
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
          <label className="text-sm font-bold text-[#123527]" htmlFor="cart-fulfillment">
            Pickup or delivery
          </label>
          <select
            id="cart-fulfillment"
            value={fulfillment}
            onChange={(event) => setFulfillment(event.target.value)}
            className="mt-2 w-full rounded-lg border border-[#d9c99b] bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#14532d]"
          >
            <option>Pickup</option>
            <option>Local delivery</option>
            <option>Wholesale supply</option>
          </select>
          <div className="mt-5 flex items-center justify-between text-lg font-black">
            <span>Subtotal</span>
            <span>{formatter.format(subtotal)}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setCartOpen(false);
              document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-5 w-full rounded-full bg-[#14532d] px-6 py-4 text-sm font-black text-white shadow-market"
          >
            Continue to checkout
          </button>
        </div>
      </aside>

      <header className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#fffaf0_0%,#fff4d8_46%,#fef2c7_100%)]" />
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="#" className="flex items-center gap-3" aria-label="Charlotte Market demo home">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#14532d] text-lg font-black text-[#f5c542]">
              CM
            </span>
            <span>
              <span className="block text-sm font-black">Charlotte Market</span>
              <span className="block text-xs font-bold text-[#b45309]">International Grocery</span>
            </span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-bold text-[#365647] md:flex">
            <a href="#categories">Categories</a>
            <a href="#products">Products</a>
            <a href="#wholesale">Wholesale</a>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="rounded-full border border-[#d9c99b] bg-white px-5 py-3 text-sm font-black shadow-sm"
          >
            Cart {cartCount ? `(${cartCount})` : ""}
          </button>
        </nav>

        <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pb-24 lg:pt-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#eadfbd] bg-white/80 px-4 py-2 text-sm font-bold text-[#14532d] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#f97316]" />
              4.6★ rating from 217+ local customers
            </div>
            <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[1.04] text-[#123527] sm:text-6xl lg:text-7xl">
              Shop African, Caribbean & International Groceries Online
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#496454] sm:text-xl">
              Order your favorite essentials for pickup, local delivery, or wholesale supply.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#products"
                className="rounded-full bg-[#14532d] px-7 py-4 text-center text-sm font-black text-white shadow-market"
              >
                Start Shopping
              </a>
              <a
                href="#wholesale"
                className="rounded-full border border-[#d9c99b] bg-white px-7 py-4 text-center text-sm font-black text-[#14532d] shadow-sm"
              >
                Request Wholesale Pricing
              </a>
            </div>
            <div className="mt-9 grid gap-3 text-sm text-[#496454] sm:grid-cols-3">
              {["Pickup in Charlotte", "Delivery-ready flow", "Wholesale-friendly cart"].map(
                (item) => (
                  <div key={item} className="rounded-lg bg-white/75 px-4 py-3 font-bold shadow-sm">
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[28px] bg-[#14532d] p-3 shadow-market">
              <div className="relative min-h-[520px] overflow-hidden rounded-[22px] bg-[linear-gradient(145deg,#fff7db,#f8d97b_48%,#f97316)] p-5">
                <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(45deg,#14532d_25%,transparent_25%,transparent_50%,#14532d_50%,#14532d_75%,transparent_75%,transparent)] [background-size:36px_36px]" />
                <div className="relative flex justify-between">
                  <div className="rounded-lg bg-white/85 px-4 py-3 shadow-lg">
                    <p className="text-xs font-black uppercase text-[#b45309]">Fresh pickup</p>
                    <p className="text-2xl font-black">Today</p>
                  </div>
                  <div className="rounded-full bg-[#14532d] px-4 py-3 text-sm font-black text-white shadow-lg">
                    Wholesale ready
                  </div>
                </div>

                <div className="relative mt-12 grid grid-cols-2 gap-4">
                  {[
                    ["Grocery bags", "Weekly essentials", "from-[#fffaf0] to-[#facc15]"],
                    ["Rice", "Bulk pantry sacks", "from-[#fde68a] to-[#d97706]"],
                    ["Plantains", "Fresh produce", "from-[#84cc16] to-[#facc15]"],
                    ["Spices", "Jollof, suya, jerk", "from-[#dc2626] to-[#f59e0b]"],
                    ["Palm oil", "Soups & stews", "from-[#b91c1c] to-[#f97316]"],
                    ["Frozen foods", "Meats & seafood", "from-[#0f766e] to-[#60a5fa]"],
                  ].map(([name, detail, gradient]) => (
                    <div
                      key={name}
                      className={`min-h-32 rounded-lg bg-gradient-to-br ${gradient} p-4 text-[#123527] shadow-xl`}
                    >
                      <div className="h-10 w-14 rounded-lg bg-white/70 shadow-inner" />
                      <p className="mt-5 text-lg font-black">{name}</p>
                      <p className="mt-1 text-xs font-bold text-[#254636]">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>

      <section id="categories" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase text-[#b45309]">Shop by aisle</p>
            <h2 className="mt-3 text-4xl font-black">Everything customers already come in for.</h2>
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
              className="group rounded-lg border border-[#eadfbd] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-market"
            >
              <div
                className={`h-24 rounded-lg bg-gradient-to-br ${category.gradient} p-4 shadow-inner`}
              >
                <div className="h-10 w-16 rounded-lg bg-white/75" />
              </div>
              <h3 className="mt-5 text-xl font-black">{category.name}</h3>
              <p className="mt-3 text-sm leading-6 text-[#5c7668]">{category.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="products" className="bg-[#123527] py-16 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase text-[#f5c542]">Featured products</p>
              <h2 className="mt-3 text-4xl font-black">Build a pickup order in seconds.</h2>
            </div>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="w-fit rounded-full bg-white px-6 py-3 text-sm font-black text-[#14532d]"
            >
              View Cart {cartCount ? `(${cartCount})` : ""}
            </button>
          </div>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {products.map((product) => (
              <article
                key={product.id}
                className="rounded-lg bg-[#fffdf7] p-3 text-[#123527] shadow-xl"
              >
                <ProductArtwork accent={product.accent} emoji={product.emoji} />
                <div className="px-2 pb-2 pt-4">
                  <p className="text-xs font-black uppercase text-[#b45309]">{product.category}</p>
                  <h3 className="mt-2 min-h-14 text-lg font-black leading-7">{product.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-[#60776b]">{product.note}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-2xl font-black text-[#14532d]">
                      {formatter.format(product.price)}
                    </p>
                    <div className="flex items-center rounded-full border border-[#eadfbd] bg-[#fff8e7] p-1">
                      <button
                        type="button"
                        className="grid h-8 w-8 place-items-center rounded-full font-black"
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
                        className="grid h-8 w-8 place-items-center rounded-full bg-[#14532d] font-black text-white"
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
                    className="mt-4 w-full rounded-full bg-[#f5c542] px-4 py-3 text-sm font-black text-[#123527] shadow-sm transition hover:bg-[#f97316] hover:text-white"
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="checkout" className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg bg-[#f5c542] p-8 shadow-market">
          <p className="text-sm font-black uppercase text-[#14532d]">Checkout preview</p>
          <h2 className="mt-3 text-4xl font-black">A simple flow for pickup orders.</h2>
          <p className="mt-5 leading-7 text-[#355445]">
            This prototype shows how a customer could choose products, confirm pickup or delivery,
            and send the store a clean order request without needing a full account system.
          </p>
          <div className="mt-8 rounded-lg bg-white/80 p-5">
            <div className="flex items-center justify-between text-sm font-bold">
              <span>Cart subtotal</span>
              <span>{formatter.format(subtotal)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm font-bold">
              <span>Items selected</span>
              <span>{cartCount}</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleCheckoutSubmit}
          className="rounded-lg border border-[#eadfbd] bg-white p-6 shadow-market"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-bold">
              Customer name
              <input className="mt-2 w-full rounded-lg border border-[#d9c99b] px-4 py-3 outline-none focus:border-[#14532d]" required />
            </label>
            <label className="text-sm font-bold">
              Phone number
              <input className="mt-2 w-full rounded-lg border border-[#d9c99b] px-4 py-3 outline-none focus:border-[#14532d]" required />
            </label>
            <label className="text-sm font-bold sm:col-span-2">
              Email
              <input type="email" className="mt-2 w-full rounded-lg border border-[#d9c99b] px-4 py-3 outline-none focus:border-[#14532d]" required />
            </label>
            <label className="text-sm font-bold">
              Pickup or delivery
              <select
                value={fulfillment}
                onChange={(event) => setFulfillment(event.target.value)}
                className="mt-2 w-full rounded-lg border border-[#d9c99b] bg-white px-4 py-3 outline-none focus:border-[#14532d]"
              >
                <option>Pickup</option>
                <option>Local delivery</option>
              </select>
            </label>
            <label className="text-sm font-bold">
              Preferred pickup time
              <input type="datetime-local" className="mt-2 w-full rounded-lg border border-[#d9c99b] px-4 py-3 outline-none focus:border-[#14532d]" required />
            </label>
          </div>
          <fieldset className="mt-5">
            <legend className="text-sm font-bold">Payment option</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {["Pay online", "Pay at pickup"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 rounded-lg border border-[#eadfbd] bg-[#fff8e7] px-4 py-3 text-sm font-bold"
                >
                  <input type="radio" name="payment" defaultChecked={option === "Pay at pickup"} />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-[#14532d] px-6 py-4 text-sm font-black text-white shadow-market"
          >
            Place Order
          </button>
          {checkoutSuccess && (
            <p className="mt-5 rounded-lg bg-[#ecfdf3] p-4 text-sm font-bold text-[#14532d]">
              Demo order received — this is how customers could place pickup orders online.
            </p>
          )}
        </form>
      </section>

      <section id="wholesale" className="bg-[#fff4d8] py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase text-[#b45309]">Wholesale supply</p>
            <h2 className="mt-3 text-4xl font-black">Need Bulk Grocery Supply?</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#557063]">
              Built for restaurants, caterers, churches, events, and small shops that need reliable
              access to staple groceries, drinks, oils, meats, and bulk dry goods.
            </p>
            <a
              href="#wholesale-form"
              className="mt-8 inline-flex rounded-full bg-[#14532d] px-7 py-4 text-sm font-black text-white shadow-market"
            >
              Request Wholesale Pricing
            </a>
          </div>

          <form
            id="wholesale-form"
            onSubmit={handleWholesaleSubmit}
            className="rounded-lg border border-[#eadfbd] bg-white p-6 shadow-market"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-bold">
                Business name
                <input className="mt-2 w-full rounded-lg border border-[#d9c99b] px-4 py-3 outline-none focus:border-[#14532d]" required />
              </label>
              <label className="text-sm font-bold">
                Contact name
                <input className="mt-2 w-full rounded-lg border border-[#d9c99b] px-4 py-3 outline-none focus:border-[#14532d]" required />
              </label>
              <label className="text-sm font-bold">
                Phone
                <input className="mt-2 w-full rounded-lg border border-[#d9c99b] px-4 py-3 outline-none focus:border-[#14532d]" required />
              </label>
              <label className="text-sm font-bold">
                Estimated quantity
                <input className="mt-2 w-full rounded-lg border border-[#d9c99b] px-4 py-3 outline-none focus:border-[#14532d]" placeholder="Cases, bags, pallets" required />
              </label>
              <label className="text-sm font-bold sm:col-span-2">
                Products needed
                <textarea className="mt-2 min-h-28 w-full rounded-lg border border-[#d9c99b] px-4 py-3 outline-none focus:border-[#14532d]" placeholder="Rice, palm oil, drinks, goat meat..." required />
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-[#f5c542] px-6 py-4 text-sm font-black text-[#123527] shadow-sm"
            >
              Send Wholesale Request
            </button>
            {wholesaleSuccess && (
              <p className="mt-5 rounded-lg bg-[#ecfdf3] p-4 text-sm font-bold text-[#14532d]">
                Wholesale request captured for the demo.
              </p>
            )}
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {trustCards.map((card) => (
            <div key={card} className="rounded-lg border border-[#eadfbd] bg-white p-5 shadow-sm">
              <div className="h-10 w-10 rounded-full bg-[#14532d]" />
              <p className="mt-5 font-black">{card}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[#14532d] p-8 text-white shadow-market sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase text-[#f5c542]">Sales demo close</p>
              <h2 className="mt-3 max-w-3xl text-4xl font-black sm:text-5xl">
                Turn local foot traffic into online grocery orders.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a
                href="#products"
                className="rounded-full bg-[#f5c542] px-7 py-4 text-center text-sm font-black text-[#123527]"
              >
                Start Shopping Demo
              </a>
              <a
                href="#wholesale"
                className="rounded-full border border-white/30 bg-white/10 px-7 py-4 text-center text-sm font-black text-white"
              >
                Request Wholesale Quote
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
