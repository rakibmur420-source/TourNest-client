"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FiSearch, FiFilter } from "react-icons/fi";
import api from "@/lib/api";
import { TravelPackage, Pagination } from "@/types";
import PackageCard from "@/components/PackageCard";
import SkeletonCard from "@/components/SkeletonCard";

const categories = ["All", "Beach", "Mountain", "Wildlife", "Adventure", "Nature"];

function PackagesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const params: Record<string, string> = { page: String(page), limit: "8" };
        if (search) params.search = search;
        if (category && category !== "All") params.category = category;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;
        if (sort && sort !== "newest") params.sort = sort;

        const res = await api.get("/packages", { params });
        setPackages(res.data.data);
        setPagination(res.data.pagination);
      } catch {
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, [search, category, minPrice, maxPrice, sort, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <div className="mb-8 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber">Explore</span>
        <h1 className="mt-2 font-display text-3xl font-semibold text-charcoal sm:text-4xl">
          All Travel Packages
        </h1>
      </div>

      <form onSubmit={handleSearchSubmit} className="mx-auto mb-6 flex max-w-xl gap-2">
        <div className="flex w-full items-center gap-2 rounded-full border border-lagoon/20 bg-white px-4 py-2.5">
          <FiSearch className="text-charcoal/40" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or destination..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
        <button
          type="submit"
          className="shrink-0 rounded-full bg-lagoon px-5 py-2.5 text-sm font-semibold text-sand hover:bg-lagoon-dark"
        >
          Search
        </button>
      </form>

      <div className="mb-10 flex flex-col gap-4 rounded-2xl border border-lagoon/10 bg-white p-5 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="flex items-center gap-2 text-sm font-semibold text-charcoal">
          <FiFilter size={16} className="text-amber" /> Filters:
        </div>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="rounded-full border border-lagoon/20 px-4 py-2 text-sm outline-none"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={minPrice}
          onChange={(e) => {
            setMinPrice(e.target.value);
            setPage(1);
          }}
          placeholder="Min price ৳"
          className="w-32 rounded-full border border-lagoon/20 px-4 py-2 text-sm outline-none"
        />
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
            setPage(1);
          }}
          placeholder="Max price ৳"
          className="w-32 rounded-full border border-lagoon/20 px-4 py-2 text-sm outline-none"
        />

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          className="ml-auto rounded-full border border-lagoon/20 px-4 py-2 text-sm outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
        ) : packages.length === 0 ? (
          <div className="col-span-full py-16 text-center">
            <p className="font-display text-xl font-semibold text-charcoal">No packages found</p>
            <p className="mt-2 text-sm text-charcoal/60">Try adjusting your search or filters.</p>
          </div>
        ) : (
          packages.map((pkg) => <PackageCard key={pkg._id} pkg={pkg} />)
        )}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          {Array.from({ length: pagination.totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`h-9 w-9 rounded-full text-sm font-semibold transition ${
                page === i + 1 ? "bg-lagoon text-sand" : "bg-white text-charcoal hover:bg-lagoon-light"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default function PackagesPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-charcoal/50">Loading packages...</div>}>
      <PackagesContent />
    </Suspense>
  );
}
