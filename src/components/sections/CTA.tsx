import Link from "next/link";

export default function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
      <div className="route-divider mb-12" />
      <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-amber/30 bg-surface px-6 py-10 text-center sm:flex-row sm:text-left sm:px-12">
        <div>
          <h2 className="font-display text-2xl font-semibold text-charcoal sm:text-3xl">
            Ready to plan your next journey?
          </h2>
          <p className="mt-2 text-sm text-charcoal/60">
            Browse packages, compare itineraries, and book the route that fits your story.
          </p>
        </div>
        <Link
          href="/packages"
          className="shrink-0 rounded-full bg-amber px-7 py-3 text-sm font-semibold text-white transition hover:bg-amber-dark"
        >
          Explore Packages
        </Link>
      </div>
    </section>
  );
}
