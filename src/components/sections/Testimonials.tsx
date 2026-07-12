import Image from "next/image";
import { FiStar } from "react-icons/fi";

const testimonials = [
  {
    name: "Nusrat Jahan",
    trip: "Sajek Valley Cloud Adventure",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    quote:
      "Every detail from the cottage to the guide felt personally planned. Watching the clouds roll below the valley was unforgettable.",
    rating: 5,
  },
  {
    name: "Tanvir Ahmed",
    trip: "Sundarbans Mangrove Safari",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    quote:
      "The boat crew knew the forest like family. Spotted deer, eagles, and even fresh tiger tracks on the second day.",
    rating: 5,
  },
  {
    name: "Farzana Rahman",
    trip: "Saint Martin Island Getaway",
    photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200",
    quote:
      "Snorkeling in water that clear was worth the whole trip. Booking through TourNest was simple from start to finish.",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-lagoon-light/40 py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber">Traveler stories</span>
          <h2 className="mt-2 font-display text-3xl font-semibold text-charcoal sm:text-4xl">What Travelers Say</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-lagoon/10 bg-white p-6 shadow-sm">
              <div className="mb-3 flex gap-1 text-amber">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FiStar key={i} size={14} className="fill-amber" />
                ))}
              </div>
              <p className="text-sm text-charcoal/70">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src={t.photo} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-charcoal">{t.name}</p>
                  <p className="text-xs text-charcoal/50">{t.trip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
