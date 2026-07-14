"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    q: "How do I book a travel package?",
    a: "Browse the Packages page, open a package's details, and use the booking contact on that page. After logging in you can also save packages you're interested in.",
  },
  {
    q: "Can I customize an itinerary?",
    a: "Yes. Reach out through our Contact page with your preferred dates and group size, and our team will tailor the itinerary for you.",
  },
  {
    q: "What is included in the listed price?",
    a: "Each package page lists exact inclusions and exclusions, such as accommodation, meals, guides, and permits, so there are no hidden costs.",
  },
  {
    q: "Do you offer refunds for cancellations?",
    a: "Cancellation terms vary by package and season. Contact our support team at least 7 days before departure to discuss your options.",
  },
  {
    q: "Is it safe to travel with TourNest during monsoon season?",
    a: "We adjust hill and forest itineraries seasonally and will flag any weather-related risk directly on the package listing.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
      <div className="mb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber">Good to know</span>
        <h2 className="mt-2 font-display text-3xl font-semibold text-charcoal sm:text-4xl">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={faq.q} className="overflow-hidden rounded-2xl border border-lagoon/10 bg-surface">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <span className="text-sm font-semibold text-charcoal">{faq.q}</span>
              <FiChevronDown
                size={18}
                className={`shrink-0 text-lagoon transition-transform ${openIndex === i ? "rotate-180" : ""}`}
              />
            </button>
            {openIndex === i && (
              <p className="px-5 pb-4 text-sm text-charcoal/60">{faq.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
