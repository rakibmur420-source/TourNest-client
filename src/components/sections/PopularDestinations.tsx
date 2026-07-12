import Link from "next/link";
import Image from "next/image";

const destinations = [
  { name: "Cox's Bazar", tag: "Beach", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700" },
  { name: "Sajek Valley", tag: "Mountain", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700" },
  { name: "Sundarbans", tag: "Wildlife", img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700" },
  { name: "Saint Martin", tag: "Beach", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=700" },
];

export default function PopularDestinations() {
  return (
    <section className="bg-lagoon-light/40 py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber">Where to next</span>
          <h2 className="mt-2 font-display text-3xl font-semibold text-charcoal sm:text-4xl">
            Popular Destinations
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {destinations.map((d) => (
            <Link
              key={d.name}
              href={`/packages?search=${encodeURIComponent(d.name)}`}
              className="group relative h-56 overflow-hidden rounded-2xl"
            >
              <Image
                src={d.img}
                alt={d.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-sand">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-amber">{d.tag}</span>
                <p className="font-display text-lg font-semibold">{d.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
