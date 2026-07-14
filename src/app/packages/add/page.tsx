"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiPlus, FiTrash2, FiImage, FiX, FiLoader } from "react-icons/fi";
import api from "@/lib/api";
import { uploadImageToImgBB } from "@/lib/uploadImage";
import { getErrorMessage } from "@/lib/getErrorMessage";
import ProtectedRoute from "@/components/ProtectedRoute";

const categories = ["Beach", "Mountain", "Wildlife", "Adventure", "Nature"];

function AddPackageForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const [form, setForm] = useState({
    title: "",
    destination: "",
    category: "Beach",
    shortDescription: "",
    fullDescription: "",
    price: "",
    duration: "",
  });

  const [inclusions, setInclusions] = useState<string[]>([""]);
  const [exclusions, setExclusions] = useState<string[]>([""]);

  const updateList = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    const copy = [...list];
    copy[index] = value;
    setList(copy);
  };

  const handleImageBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    // Local preview immediately
    const localPreview = URL.createObjectURL(file);
    setImagePreview(localPreview);

    setUploadingImage(true);
    try {
      const uploadedUrl = await uploadImageToImgBB(file);
      setImageUrl(uploadedUrl);
      toast.success("Image uploaded!");
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Image upload failed."));
      setImagePreview("");
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = () => {
    setImagePreview("");
    setImageUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.destination || !form.shortDescription || !form.fullDescription || !form.price || !form.duration) {
      setError("Please fill in all required fields.");
      return;
    }

    if (uploadingImage) {
      setError("Please wait for the image to finish uploading.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/packages", {
        title: form.title,
        destination: form.destination,
        category: form.category,
        shortDescription: form.shortDescription,
        fullDescription: form.fullDescription,
        price: Number(form.price),
        duration: Number(form.duration),
        images: imageUrl ? [imageUrl] : [],
        inclusions: inclusions.filter((i) => i.trim()),
        exclusions: exclusions.filter((i) => i.trim()),
      });
      toast.success("Package added successfully!");
      router.push("/packages/manage");
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to add package. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Add a Travel Package</h1>
      <p className="mt-2 text-sm text-charcoal/60">Fill in the details below to publish a new package.</p>

      {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5 rounded-2xl border border-lagoon/10 bg-surface p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-charcoal">Title *</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Enchanting Cox's Bazar Escape"
              className="w-full rounded-lg border border-lagoon/20 px-3 py-2.5 text-sm outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-charcoal">Destination *</label>
            <input
              value={form.destination}
              onChange={(e) => setForm({ ...form, destination: e.target.value })}
              placeholder="Cox's Bazar, Bangladesh"
              className="w-full rounded-lg border border-lagoon/20 px-3 py-2.5 text-sm outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-charcoal">Category *</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-lg border border-lagoon/20 px-3 py-2.5 text-sm outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-charcoal">Price (৳) *</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="12500"
              className="w-full rounded-lg border border-lagoon/20 px-3 py-2.5 text-sm outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-charcoal">Duration (days) *</label>
            <input
              type="number"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              placeholder="4"
              className="w-full rounded-lg border border-lagoon/20 px-3 py-2.5 text-sm outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-charcoal">Short Description *</label>
          <input
            value={form.shortDescription}
            onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
            placeholder="One-line summary shown on the package card"
            className="w-full rounded-lg border border-lagoon/20 px-3 py-2.5 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-charcoal">Full Description *</label>
          <textarea
            value={form.fullDescription}
            onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
            rows={4}
            placeholder="Detailed overview shown on the package details page"
            className="w-full rounded-lg border border-lagoon/20 px-3 py-2.5 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-charcoal">Package Image</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {imagePreview ? (
            <div className="relative h-48 w-full overflow-hidden rounded-xl border border-lagoon/20">
              <Image src={imagePreview} alt="Preview" fill className="object-cover" unoptimized />
              {uploadingImage && (
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 text-sm font-medium text-white">
                  <FiLoader className="animate-spin" /> Uploading...
                </div>
              )}
              {!uploadingImage && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-red-500"
                >
                  <FiX size={16} />
                </button>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={handleImageBoxClick}
              className="flex h-48 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-lagoon/25 text-charcoal/50 transition hover:border-amber hover:text-amber"
            >
              <FiImage size={28} />
              <span className="text-sm font-medium">Click to choose an image from your device</span>
              <span className="text-xs text-charcoal/40">PNG, JPG up to a few MB</span>
            </button>
          )}
          <p className="mt-1 text-xs text-charcoal/40">
            Optional — if skipped, a default travel photo will be used.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-charcoal">Inclusions</label>
            {inclusions.map((val, i) => (
              <div key={i} className="mb-2 flex gap-2">
                <input
                  value={val}
                  onChange={(e) => updateList(inclusions, setInclusions, i, e.target.value)}
                  placeholder="Hotel accommodation"
                  className="w-full rounded-lg border border-lagoon/20 px-3 py-2 text-sm outline-none"
                />
                {inclusions.length > 1 && (
                  <button type="button" onClick={() => setInclusions(inclusions.filter((_, idx) => idx !== i))}>
                    <FiTrash2 className="text-red-400" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => setInclusions([...inclusions, ""])}
              className="flex items-center gap-1 text-xs font-semibold text-lagoon"
            >
              <FiPlus size={14} /> Add inclusion
            </button>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-charcoal">Exclusions</label>
            {exclusions.map((val, i) => (
              <div key={i} className="mb-2 flex gap-2">
                <input
                  value={val}
                  onChange={(e) => updateList(exclusions, setExclusions, i, e.target.value)}
                  placeholder="Airfare"
                  className="w-full rounded-lg border border-lagoon/20 px-3 py-2 text-sm outline-none"
                />
                {exclusions.length > 1 && (
                  <button type="button" onClick={() => setExclusions(exclusions.filter((_, idx) => idx !== i))}>
                    <FiTrash2 className="text-red-400" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => setExclusions([...exclusions, ""])}
              className="flex items-center gap-1 text-xs font-semibold text-lagoon"
            >
              <FiPlus size={14} /> Add exclusion
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-amber py-3 text-sm font-semibold text-white transition hover:bg-amber-dark disabled:opacity-60"
        >
          {loading ? "Publishing..." : "Publish Package"}
        </button>
      </form>
    </section>
  );
}

export default function AddPackagePage() {
  return (
    <ProtectedRoute adminOnly>
      <AddPackageForm />
    </ProtectedRoute>
  );
}
