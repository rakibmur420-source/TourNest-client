"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiMapPin } from "react-icons/fi";

const destinations = ["Cox's Bazar", "Sajek Valley", "Sundarbans", "Bandarban", "Srimangal", "Saint Martin"];

export default function Hero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(query ? `/packages?search=${encodeURIComponent(query)}` : "/packages");
  };

  return (
    <section className="relative flex min-h-[62vh] items-center overflow-hidden bg-lagoon-dark md:min-h-[65vh]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-lagoon-dark via-lagoon-dark/70 to-lagoon-dark/30" />

      <div className="relative mx-auto max-w-4xl px-5 py-16 text-center text-sand">
        <span className="animate-fade-up inline-block rounded-full border border-amber/40 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-amber">
          Bangladesh&apos;s Journeys, Curated
        </span>
        <h1 className="animate-fade-up mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl" style={{ animationDelay: "0.1s" }}>
          Find the trail your <span className="text-amber">next story</span> begins on
        </h1>
        <p className="animate-fade-up mx-auto mt-5 max-w-xl text-sm text-sand/80 sm:text-base" style={{ animationDelay: "0.2s" }}>
          From misty hill valleys to coral shorelines — explore handpicked travel packages, mapped
          day by day, ready when you are.
        </p>

        <form
          onSubmit={handleSearch}
          className="animate-fade-up mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-full bg-white p-2 shadow-xl"
          style={{ animationDelay: "0.3s" }}
        >
          <FiSearch className="ml-2 shrink-0 text-charcoal/40" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a destination, e.g. Sajek Valley..."
            className="w-full bg-transparent px-1 py-2 text-sm text-charcoal outline-none placeholder:text-charcoal/40"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-dark"
          >
            Search
          </button>
        </form>

        <div className="animate-fade-up mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-sand/70" style={{ animationDelay: "0.4s" }}>
          <FiMapPin size={14} className="text-amber" />
          {destinations.map((d, i) => (
            <button
              key={d}
              onClick={() => router.push(`/packages?search=${encodeURIComponent(d)}`)}
              className="hover:text-amber"
            >
              {d}
              {i !== destinations.length - 1 && <span className="ml-2 text-sand/30">•</span>}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
