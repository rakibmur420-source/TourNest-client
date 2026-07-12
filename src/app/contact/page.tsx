"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", message: "" });
      setSending(false);
    }, 800);
  };

  return (
    <section className="mx-auto max-w-5xl px-5 py-14 lg:px-8">
      <div className="mb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber">We&apos;d love to hear from you</span>
        <h1 className="mt-2 font-display text-3xl font-semibold text-charcoal sm:text-4xl">Get in Touch</h1>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="space-y-5 rounded-2xl border border-lagoon/10 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <FiMapPin className="mt-1 text-amber" size={18} />
              <div>
                <p className="text-sm font-semibold text-charcoal">Office</p>
                <p className="text-sm text-charcoal/60">Gulshan, Dhaka, Bangladesh</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiPhone className="mt-1 text-amber" size={18} />
              <div>
                <p className="text-sm font-semibold text-charcoal">Phone</p>
                <p className="text-sm text-charcoal/60">+880 1234-567890</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiMail className="mt-1 text-amber" size={18} />
              <div>
                <p className="text-sm font-semibold text-charcoal">Email</p>
                <p className="text-sm text-charcoal/60">hello@tournest.com</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-lagoon/10 bg-white p-6 shadow-sm lg:col-span-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-charcoal">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-lagoon/20 px-3 py-2.5 text-sm outline-none"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-charcoal">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-lagoon/20 px-3 py-2.5 text-sm outline-none"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-charcoal">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              className="w-full rounded-lg border border-lagoon/20 px-3 py-2.5 text-sm outline-none"
              placeholder="How can we help?"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="flex items-center gap-2 rounded-full bg-lagoon px-6 py-3 text-sm font-semibold text-sand hover:bg-lagoon-dark disabled:opacity-60"
          >
            <FiSend size={16} /> {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
