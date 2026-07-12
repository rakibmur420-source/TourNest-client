import Image from "next/image";

const tips = [
  {
    title: "Packing Smart for Hill Treks",
    excerpt: "What to bring (and skip) for a comfortable climb through Bandarban and Sajek.",
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=700",
    tag: "Guide",
  },
  {
    title: "Best Time to Visit Cox's Bazar",
    excerpt: "Season-by-season breakdown so you catch clear skies and calm tides.",
    img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=700",
    tag: "Planning",
  },
  {
    title: "Sundarbans Safari Etiquette",
    excerpt: "How to stay quiet, safe, and respectful of the forest's wildlife.",
    img: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=700",
    tag: "Wildlife",
  },
];

export default function TravelTips() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="mb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber">From the journal</span>
        <h2 className="mt-2 font-display text-3xl font-semibold text-charcoal sm:text-4xl">Travel Tips & Stories</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tips.map((tip) => (
          <article key={tip.title} className="overflow-hidden rounded-2xl border border-lagoon/10 bg-white shadow-sm">
            <div className="relative h-44 w-full">
              <Image src={tip.img} alt={tip.title} fill className="object-cover" />
              <span className="absolute left-3 top-3 rounded-full bg-amber px-3 py-1 text-xs font-semibold text-white">
                {tip.tag}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-base font-semibold text-charcoal">{tip.title}</h3>
              <p className="mt-2 text-sm text-charcoal/60">{tip.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
