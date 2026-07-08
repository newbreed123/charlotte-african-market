import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffaf0] px-6 py-12 text-[#123527]">
      <div className="mx-auto flex max-w-3xl flex-col gap-5">
        <p className="text-sm font-bold uppercase text-[#b45309]">
          Charlotte Market International
        </p>
        <h1 className="text-4xl font-bold">
          Premium grocery ordering demo
        </h1>
        <p className="text-lg text-[#355445]">
          Preview the ecommerce prototype built for pickup, delivery, and
          wholesale grocery supply.
        </p>
        <Link
          href="/charlotte-market-demo"
          className="w-fit rounded-full bg-[#14532d] px-6 py-3 text-sm font-bold text-white shadow-market"
        >
          Open demo
        </Link>
      </div>
    </main>
  );
}
