"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FiSend } from "react-icons/fi";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Subscribed! Watch your inbox for new trip drops.");
    setEmail("");
  };

  return (
    <section className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
      <div className="rounded-3xl bg-lagoon px-6 py-12 text-center text-sand sm:px-12">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Get new routes in your inbox</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-sand/70">
          One email a month: new packages, seasonal picks, and honest travel tips. No spam, ever.
        </p>
        <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full rounded-full border-none bg-white px-5 py-3 text-sm text-[#1e2a28] outline-none placeholder:text-[#1e2a28]/40"
          />
          <button
            type="submit"
            className="flex shrink-0 items-center gap-2 rounded-full bg-amber px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-dark"
          >
            <FiSend size={16} /> Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
