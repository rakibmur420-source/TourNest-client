"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await register(name, email, password);
      toast.success("Account created! Welcome to TourNest.");
      router.push("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto flex min-h-[75vh] max-w-md flex-col justify-center px-5 py-12">
      <div className="rounded-3xl border border-lagoon/10 bg-white p-8 shadow-sm">
        <h1 className="font-display text-2xl font-semibold text-charcoal">Create your account</h1>
        <p className="mt-1 text-sm text-charcoal/60">Join TourNest to add and manage travel packages.</p>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-charcoal">Full Name</label>
            <div className="flex items-center gap-2 rounded-xl border border-lagoon/20 px-3 py-2.5">
              <FiUser className="text-charcoal/40" size={18} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rakib Hasan"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-charcoal">Email</label>
            <div className="flex items-center gap-2 rounded-xl border border-lagoon/20 px-3 py-2.5">
              <FiMail className="text-charcoal/40" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-charcoal">Password</label>
            <div className="flex items-center gap-2 rounded-xl border border-lagoon/20 px-3 py-2.5">
              <FiLock className="text-charcoal/40" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-lagoon py-3 text-sm font-semibold text-sand transition hover:bg-lagoon-dark disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-charcoal/60">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-lagoon hover:text-amber">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
