export default function WholesalePage() {
  return (
    <main className="min-h-screen bg-[#fff9ec] text-[#061f14]">
      <header className="border-b border-[#eadac0] bg-[#fff9ec]/95">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <a href="/charlotte-market-demo" className="flex items-center gap-3">
            <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-[#00552b] text-base font-black text-[#f8c33a] shadow-[0_10px_28px_rgba(0,85,43,0.22)]">
              CMI
            </span>
            <span>
              <span className="block text-lg font-black">Charlotte Market</span>
              <span className="block text-[11px] font-black uppercase tracking-[0.35em] text-[#a11b1c]">
                International
              </span>
            </span>
          </a>
          <a
            href="/charlotte-market-demo"
            className="rounded-lg border border-[#e0c39d] bg-white px-4 py-2 text-sm font-black text-[#00552b] shadow-sm transition hover:bg-[#fff4de]"
          >
            Back to Demo
          </a>
        </nav>
      </header>

      <section className="relative overflow-hidden border-b border-[#eadac0] bg-[radial-gradient(circle_at_76%_25%,rgba(248,195,58,0.28),transparent_30%),linear-gradient(135deg,#fff9ec_0%,#fff4de_52%,#eed1a5_100%)] px-5 py-16">
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(45deg,#00552b_25%,transparent_25%,transparent_50%,#00552b_50%,#00552b_75%,transparent_75%,transparent)] [background-size:34px_34px]" />
        <div className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-[#d8b372] bg-[#fff7e6] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#00552b]">
              Wholesale Supply
            </p>
            <h1 className="mt-6 font-serif text-5xl font-black leading-tight text-[#063d25] sm:text-6xl">
              Reliable bulk grocery supply for Charlotte businesses.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#31483b]">
              Restaurants, caterers, churches, food trucks, and small grocery stores can request
              weekly supply pricing for staples, frozen foods, drinks, snacks, and seasonings.
            </p>
            <a
              href="#request"
              className="mt-8 inline-flex rounded-lg bg-[#006533] px-6 py-4 text-sm font-black text-white shadow-[0_18px_45px_rgba(0,85,43,0.22)] transition hover:-translate-y-0.5 hover:bg-[#004c27]"
            >
              Request Wholesale Pricing
            </a>
          </div>

          <div className="rounded-[28px] bg-white p-6 shadow-[0_28px_70px_rgba(84,48,12,0.16)]">
            <div className="grid gap-4 sm:grid-cols-2">
              {["Restaurants", "Caterers", "Churches", "Food Trucks", "Small Grocery Stores"].map(
                (item) => (
                  <div key={item} className="rounded-2xl border border-[#eadac0] bg-[#fff9ec] p-5">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#edf9e6] text-[#006533]">
                      ✓
                    </span>
                    <p className="mt-4 font-black">{item}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-12 lg:grid-cols-2">
        <article className="rounded-2xl border border-[#eadac0] bg-white p-7 shadow-[0_18px_45px_rgba(55,34,12,0.08)]">
          <h2 className="font-serif text-3xl font-black text-[#063d25]">We supply</h2>
          <div className="mt-6 grid gap-3">
            {["Restaurants", "Caterers", "Churches", "Food Trucks", "Small Grocery Stores"].map(
              (item) => (
                <p key={item} className="flex items-center gap-3 text-lg font-black">
                  <span className="text-[#006533]">✓</span>
                  {item}
                </p>
              ),
            )}
          </div>
        </article>

        <article className="rounded-2xl border border-[#eadac0] bg-white p-7 shadow-[0_18px_45px_rgba(55,34,12,0.08)]">
          <h2 className="font-serif text-3xl font-black text-[#063d25]">Benefits</h2>
          <div className="mt-6 grid gap-3">
            {[
              "Competitive pricing",
              "Weekly supply",
              "Bulk ordering",
              "Dedicated account manager",
            ].map((item) => (
              <p key={item} className="text-lg font-bold text-[#31483b]">
                • {item}
              </p>
            ))}
          </div>
        </article>
      </section>

      <section id="request" className="px-5 pb-16">
        <div className="mx-auto max-w-6xl rounded-[28px] bg-[#003f20] p-8 text-white shadow-[0_28px_70px_rgba(0,63,32,0.2)] sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#f8c33a]">
                Ready for bulk supply?
              </p>
              <h2 className="mt-3 font-serif text-4xl font-black">
                Request wholesale pricing for your business.
              </h2>
            </div>
            <a
              href="mailto:wholesale@example.com?subject=Wholesale%20Pricing%20Request"
              className="rounded-lg bg-[#f8c33a] px-6 py-4 text-center text-sm font-black text-[#003f20] transition hover:bg-[#eaae20]"
            >
              Request Wholesale Pricing
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
