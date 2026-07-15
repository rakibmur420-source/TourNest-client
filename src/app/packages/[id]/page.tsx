"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { FiMapPin, FiClock, FiStar, FiCheck, FiX } from "react-icons/fi";
import api from "@/lib/api";
import { TravelPackage, Review } from "@/types";
import PackageCard from "@/components/PackageCard";
import { useAuth } from "@/context/AuthContext";

export default function PackageDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const [pkg, setPkg] = useState<TravelPackage | null>(null);
  const [related, setRelated] = useState<TravelPackage[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      const res = await api.get(`/packages/${id}`);
      setPkg(res.data.data);
      setRelated(res.data.related || []);
      setReviews(res.data.reviews || []);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setSubmitting(true);
    try {
      await api.post(`/packages/${id}/reviews`, { rating, comment, userName: user?.name });
      toast.success("Thanks for your review!");
      setComment("");
      setRating(5);
      fetchData();
    } catch {
      toast.error("Could not submit your review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="py-24 text-center text-charcoal/50">Loading package details...</div>;
  }

  if (notFound || !pkg) {
    return (
      <div className="py-24 text-center">
        <p className="font-display text-2xl font-semibold text-charcoal">Package not found</p>
        <p className="mt-2 text-sm text-charcoal/60">It may have been removed or the link is incorrect.</p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
      {/* Gallery */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <div className="relative h-72 overflow-hidden rounded-2xl md:col-span-3 md:h-[420px]">
          <Image src={pkg.images[activeImage]} alt={pkg.title} fill className="object-cover" priority />
        </div>
        <div className="flex gap-3 overflow-x-auto md:flex-col md:overflow-visible">
          {pkg.images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActiveImage(i)}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl md:h-24 md:w-full ${
                activeImage === i ? "ring-2 ring-amber" : ""
              }`}
            >
              <Image src={img} alt={`${pkg.title} ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <span className="rounded-full bg-lagoon-light px-3 py-1 text-xs font-semibold text-lagoon">
            {pkg.category}
          </span>
          <h1 className="mt-3 font-display text-3xl font-semibold text-charcoal">{pkg.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-charcoal/60">
            <span className="flex items-center gap-1"><FiMapPin className="text-amber" /> {pkg.destination}</span>
            <span className="flex items-center gap-1"><FiClock className="text-amber" /> {pkg.duration} days</span>
            <span className="flex items-center gap-1">
              <FiStar className="fill-amber text-amber" /> {pkg.rating || "New"} ({pkg.reviewCount} reviews)
            </span>
          </div>
        </div>
        <div className="rounded-2xl border border-lagoon/10 bg-surface px-6 py-4 text-center shadow-sm">
          <p className="text-xs text-charcoal/50">Starting from</p>
          <p className="font-display text-2xl font-semibold text-lagoon">৳{pkg.price.toLocaleString()}</p>
          <button className="mt-3 w-full rounded-full bg-amber px-6 py-2.5 text-sm font-semibold text-white hover:bg-amber-dark">
            Book This Trip
          </button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Overview */}
          <div>
            <h2 className="font-display text-xl font-semibold text-charcoal">Overview</h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{pkg.fullDescription}</p>
          </div>

          {/* Itinerary */}
          {pkg.itinerary.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-xl font-semibold text-charcoal">Day-by-Day Itinerary</h2>
              <div className="mt-4 space-y-4">
                {pkg.itinerary.map((day) => (
                  <div key={day.day} className="flex gap-4 rounded-xl border border-lagoon/10 bg-surface p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lagoon text-sm font-semibold text-sand">
                      {day.day}
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal">{day.title}</p>
                      <p className="mt-1 text-sm text-charcoal/60">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inclusions/Exclusions */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-display text-lg font-semibold text-charcoal">Inclusions</h3>
              <ul className="mt-3 space-y-2">
                {pkg.inclusions.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-charcoal/70">
                    <FiCheck className="text-green-600" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-charcoal">Exclusions</h3>
              <ul className="mt-3 space-y-2">
                {pkg.exclusions.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-charcoal/70">
                    <FiX className="text-red-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-10">
            <h2 className="font-display text-xl font-semibold text-charcoal">
              Reviews ({reviews.length})
            </h2>

            {user ? (
              <form onSubmit={handleReviewSubmit} className="mt-4 rounded-xl border border-lagoon/10 bg-surface p-4">
                <div className="mb-3 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button type="button" key={n} onClick={() => setRating(n)}>
                      <FiStar size={20} className={n <= rating ? "fill-amber text-amber" : "text-charcoal/20"} />
                    </button>
                  ))}
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with this trip..."
                  rows={3}
                  className="w-full rounded-lg border border-lagoon/20 bg-surface p-3 text-sm text-charcoal outline-none placeholder:text-charcoal/40"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-3 rounded-full bg-lagoon px-5 py-2 text-sm font-semibold text-sand hover:bg-lagoon-dark disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            ) : (
              <p className="mt-3 text-sm text-charcoal/60">
                Please log in to leave a review.
              </p>
            )}

            <div className="mt-5 space-y-4">
              {reviews.length === 0 ? (
                <p className="text-sm text-charcoal/50">No reviews yet. Be the first to share your experience!</p>
              ) : (
                reviews.map((r) => (
                  <div key={r._id} className="rounded-xl border border-lagoon/10 bg-surface p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-charcoal">{r.userName}</p>
                      <div className="flex gap-0.5 text-amber">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <FiStar key={i} size={13} className="fill-amber" />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-charcoal/70">{r.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Key Info */}
        <aside className="h-fit rounded-2xl border border-lagoon/10 bg-surface p-5">
          <h3 className="font-display text-base font-semibold text-charcoal">Key Information</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-charcoal/50">Destination</dt>
              <dd className="font-medium text-charcoal">{pkg.destination}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-charcoal/50">Duration</dt>
              <dd className="font-medium text-charcoal">{pkg.duration} days</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-charcoal/50">Category</dt>
              <dd className="font-medium text-charcoal">{pkg.category}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-charcoal/50">Rating</dt>
              <dd className="font-medium text-charcoal">{pkg.rating || "New"} / 5</dd>
            </div>
          </dl>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-charcoal">You may also like</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <PackageCard key={r._id} pkg={r} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
