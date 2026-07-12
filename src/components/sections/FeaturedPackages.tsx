"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { TravelPackage } from "@/types";
import PackageCard from "@/components/PackageCard";
import SkeletonCard from "@/components/SkeletonCard";

export default function FeaturedPackages() {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get("/packages/featured");
        setPackages(res.data.data);
      } catch {
        setError("Could not load featured packages right now.");
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber">Handpicked for you</span>
          <h2 className="mt-2 font-display text-3xl font-semibold text-charcoal sm:text-4xl">
            Featured Packages
          </h2>
        </div>
        <Link href="/packages" className="text-sm font-semibold text-lagoon hover:text-amber">
          View all packages →
        </Link>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : packages.length === 0 && !error
          ? (
            <p className="col-span-full text-center text-charcoal/60">
              No packages available yet. Check back soon!
            </p>
          )
          : packages.map((pkg) => <PackageCard key={pkg._id} pkg={pkg} />)}
      </div>
    </section>
  );
}
