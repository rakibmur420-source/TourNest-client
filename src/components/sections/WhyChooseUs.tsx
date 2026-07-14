import { FiShield, FiMap, FiHeadphones, FiTag } from "react-icons/fi";

const features = [
  {
    icon: FiMap,
    title: "Curated Itineraries",
    desc: "Each package is planned day-by-day by travelers who've actually walked the trail.",
  },
  {
    icon: FiTag,
    title: "Transparent Pricing",
    desc: "No hidden fees. What you see on the package is exactly what you pay.",
  },
  {
    icon: FiShield,
    title: "Verified Partners",
    desc: "We work only with licensed local guides and vetted accommodations.",
  },
  {
    icon: FiHeadphones,
    title: "24/7 Trip Support",
    desc: "Real help, day or night, before and during your journey.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="mb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber">Why TourNest</span>
        <h2 className="mt-2 font-display text-3xl font-semibold text-charcoal sm:text-4xl">
          Travel Planned With Care
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl border border-lagoon/10 bg-surface p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-lagoon-light text-lagoon">
              <f.icon size={22} />
            </div>
            <h3 className="font-display text-base font-semibold text-charcoal">{f.title}</h3>
            <p className="mt-2 text-sm text-charcoal/60">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
