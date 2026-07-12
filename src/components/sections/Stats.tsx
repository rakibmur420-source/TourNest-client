"use client";

import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";

const stats = [
  { label: "Happy Travelers", value: "8,400+" },
  { label: "Travel Packages", value: "120+" },
  { label: "Destinations Covered", value: "35+" },
  { label: "Average Rating", value: "4.7 / 5" },
];

const monthlyTravelers = [
  { month: "Jan", travelers: 420 },
  { month: "Feb", travelers: 380 },
  { month: "Mar", travelers: 510 },
  { month: "Apr", travelers: 600 },
  { month: "May", travelers: 540 },
  { month: "Jun", travelers: 710 },
];

export default function Stats() {
  return (
    <section className="bg-lagoon-dark py-16 text-sand">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber">By the numbers</span>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Trusted by travelers nationwide</h2>
            <div className="mt-8 grid grid-cols-2 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl font-semibold text-amber">{s.value}</p>
                  <p className="mt-1 text-sm text-sand/70">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 p-5">
            <p className="mb-3 text-sm text-sand/70">Monthly travelers booked via TourNest</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyTravelers}>
                <XAxis dataKey="month" stroke="#fbf7f0" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: "#1e2a28", border: "none", borderRadius: 8, color: "#fbf7f0" }}
                  cursor={{ fill: "rgba(232,150,60,0.1)" }}
                />
                <Bar dataKey="travelers" fill="#e8963c" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
