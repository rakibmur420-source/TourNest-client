import Image from "next/image";
import { FiTarget, FiHeart, FiUsers } from "react-icons/fi";

const values = [
  { icon: FiTarget, title: "Purposeful Trips", desc: "Every itinerary is built around a real reason to go, not just a list of stops." },
  { icon: FiHeart, title: "Local Care", desc: "We partner with local guides and hosts who know the land and its stories." },
  { icon: FiUsers, title: "For Every Traveler", desc: "Solo trips, family getaways, or group adventures — planned to fit how you travel." },
];

export default function AboutPage() {
  return (
    <section>
      <div className="relative h-64 w-full overflow-hidden sm:h-80">
        <Image
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600"
          alt="Mountains at sunrise"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-lagoon-dark/60" />
        <div className="relative flex h-full items-center justify-center text-center text-sand">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber">Our story</span>
            <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">About TourNest</h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 py-14 lg:px-8">
        <p className="text-center text-base leading-relaxed text-charcoal/70">
          TourNest began with a simple frustration: too many trip listings in Bangladesh looked
          the same, promised everything, and delivered vague plans. We set out to build a platform
          where every package is honest about what a trip actually includes, day by day, so
          travelers can decide with confidence and hosts can showcase the journeys they know best.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-lagoon/10 bg-surface p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-lagoon-light text-lagoon">
                <v.icon size={22} />
              </div>
              <h3 className="font-display text-base font-semibold text-charcoal">{v.title}</h3>
              <p className="mt-2 text-sm text-charcoal/60">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-lagoon-light/50 p-8 text-center">
          <h2 className="font-display text-xl font-semibold text-charcoal">A small team, a big map</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-charcoal/70">
            We&apos;re a small team based in Dhaka, working directly with guides and hosts across
            Bangladesh&apos;s beaches, hill tracts, and forests to keep every listing accurate and current.
          </p>
        </div>
      </div>
    </section>
  );
}
