import Link from "next/link";
import Image from "next/image";
import { FiMapPin, FiClock, FiStar } from "react-icons/fi";
import { TravelPackage } from "@/types";

export default function PackageCard({ pkg }: { pkg: TravelPackage }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-lagoon/10 bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 w-full shrink-0 overflow-hidden">
        <Image
          src={pkg.images[0]}
          alt={pkg.title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition duration-500 hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-lagoon px-3 py-1 text-xs font-semibold text-sand">
          {pkg.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-charcoal line-clamp-2">{pkg.title}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-charcoal/60">
          <FiMapPin size={14} className="text-amber" /> {pkg.destination}
        </p>
        <p className="mt-2 flex-1 text-sm text-charcoal/70 line-clamp-2">{pkg.shortDescription}</p>

        <div className="mt-4 flex items-center justify-between text-sm text-charcoal/70">
          <span className="flex items-center gap-1">
            <FiClock size={14} className="text-amber" /> {pkg.duration} days
          </span>
          <span className="flex items-center gap-1">
            <FiStar size={14} className="fill-amber text-amber" /> {pkg.rating || "New"}
            {pkg.reviewCount > 0 && <span className="text-charcoal/40">({pkg.reviewCount})</span>}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-lagoon/10 pt-4">
          <span className="font-display text-lg font-semibold text-lagoon">
            ৳{pkg.price.toLocaleString()}
          </span>
          <Link
            href={`/packages/${pkg._id}`}
            className="rounded-full bg-amber px-4 py-2 text-xs font-semibold text-white transition hover:bg-amber-dark"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
