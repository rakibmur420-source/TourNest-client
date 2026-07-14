"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { FiEye, FiTrash2, FiPlus } from "react-icons/fi";
import api from "@/lib/api";
import { TravelPackage } from "@/types";
import ProtectedRoute from "@/components/ProtectedRoute";

function ManagePackagesContent() {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchMyPackages = async () => {
    setLoading(true);
    try {
      const res = await api.get("/packages/manage/my");
      setPackages(res.data.data);
    } catch {
      toast.error("Could not load your packages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMyPackages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this package? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await api.delete(`/packages/${id}`);
      setPackages((prev) => prev.filter((p) => p._id !== id));
      toast.success("Package deleted.");
    } catch {
      toast.error("Failed to delete package.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-charcoal">Manage Packages</h1>
          <p className="mt-1 text-sm text-charcoal/60">Packages you&apos;ve published on TourNest.</p>
        </div>
        <Link
          href="/packages/add"
          className="flex items-center gap-2 rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-dark"
        >
          <FiPlus size={16} /> Add New
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-charcoal/50">Loading your packages...</p>
      ) : packages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-lagoon/30 bg-surface py-16 text-center">
          <p className="font-display text-lg font-semibold text-charcoal">No packages yet</p>
          <p className="mt-2 text-sm text-charcoal/60">You haven&apos;t published any travel packages.</p>
          <Link
            href="/packages/add"
            className="mt-5 inline-block rounded-full bg-lagoon px-5 py-2.5 text-sm font-semibold text-sand hover:bg-lagoon-dark"
          >
            Add Your First Package
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-lagoon/10 bg-surface">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-lagoon/10 text-xs uppercase tracking-wide text-charcoal/50">
                <th className="px-5 py-4">Package</th>
                <th className="px-5 py-4">Destination</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4">Rating</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg._id} className="border-b border-lagoon/5 last:border-0">
                  <td className="flex items-center gap-3 px-5 py-4">
                    <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg">
                      <Image src={pkg.images[0]} alt={pkg.title} fill className="object-cover" />
                    </div>
                    <span className="font-medium text-charcoal line-clamp-1">{pkg.title}</span>
                  </td>
                  <td className="px-5 py-4 text-charcoal/70">{pkg.destination}</td>
                  <td className="px-5 py-4 font-medium text-lagoon">৳{pkg.price.toLocaleString()}</td>
                  <td className="px-5 py-4 text-charcoal/70">{pkg.rating || "New"}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/packages/${pkg._id}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-lagoon-light text-lagoon hover:bg-lagoon hover:text-sand"
                        title="View"
                      >
                        <FiEye size={15} />
                      </Link>
                      <button
                        onClick={() => handleDelete(pkg._id)}
                        disabled={deletingId === pkg._id}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white disabled:opacity-50"
                        title="Delete"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default function ManagePackagesPage() {
  return (
    <ProtectedRoute adminOnly>
      <ManagePackagesContent />
    </ProtectedRoute>
  );
}
