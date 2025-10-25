import React, { useMemo, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { useNavigate } from "react-router-dom";

import { COUNTRIES, REGIONS, FLAG_CDN, type Country } from "@/lib/countries";

export default function Visa() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COUNTRIES.filter((c) => {
      const matchesRegion = region === "All" || c.region === region;
      const matchesQuery = !q || c.name.toLowerCase().includes(q);
      return matchesRegion && matchesQuery;
    });
  }, [query, region]);


  return (
    <div className="min-h-screen">
      <Header />

      <section className="container pt-12 px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-primary text-white p-6 sm:p-10 shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide">
              VISA REQUIREMENTS
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/90 max-w-xl mx-auto">
              Find your Visa requirements below, including necessary documents, processing times, and application fees.
            </p>

            <div className="mt-6">
              <form
                className="mt-4 flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-3 flex items-center text-white/80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </span>
                  <input
                    aria-label="Search destination"
                    placeholder="Search destination"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-full bg-primary/20 placeholder:text-white/80 text-white border border-white/20"
                  />
                </div>

                <button
                  type="button"
                  className="w-full sm:w-auto ml-0 sm:ml-3 rounded-full bg-white text-primary px-5 py-2"
                >
                  Search
                </button>
              </form>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {REGIONS.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRegion(r)}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-150 uppercase font-semibold ${
                      region === r
                        ? "bg-white text-primary border-transparent shadow"
                        : "bg-white/10 text-white border-white/30"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {filtered.map((c) => (
              <div key={c.name} className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => navigate(`/visa/${c.iso}`)}
                  className="w-full flex flex-col items-center bg-transparent"
                >
                  <div className="w-24 h-16 rounded-xl bg-white shadow-inner flex items-center justify-center border border-gray-200 overflow-hidden">
                    <img
                      src={`${FLAG_CDN}/${c.iso}.png`}
                      alt={`${c.name} flag`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          const span = document.createElement("span");
                          span.textContent = c.emoji;
                          span.className = "text-3xl";
                          parent.appendChild(span);
                        }
                      }}
                    />
                  </div>
                  <div className="mt-2 text-xs font-semibold tracking-wide text-center uppercase">
                    {c.name}
                  </div>
                </button>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-8 text-center text-muted-foreground">No destinations found.</div>
          )}
        </div>
      </section>


      <Footer />
    </div>
  );
}
