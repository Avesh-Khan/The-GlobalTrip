import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { packages } from "@/lib/packages";
import { formatINRValue } from "@/lib/currency";
import ScrollToTop from "@/components/site/ScrollToTop";
import ImageWithFallback from "@/components/ui/image-with-fallback";

const hero =
  "https://cdn.builder.io/api/v1/image/assets%2F686d4cd813444250b5fa9039981a4fca%2Fd05628fdeb0d482588eaf3736dbcb08f?format=webp&width=1600";

export default function Package() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Filter UI state
  const [showFilters, setShowFilters] = useState(false);
  // Applied filters
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [country, setCountry] = useState<string>("Any");
  const [minRating, setMinRating] = useState<number | "">("");

  // Temporary (panel) states — changes here only apply when user clicks Apply
  const [tempMinPrice, setTempMinPrice] = useState<number | "">("");
  const [tempMaxPrice, setTempMaxPrice] = useState<number | "">("");
  const [tempCountry, setTempCountry] = useState<string>("Any");
  const [tempMinRating, setTempMinRating] = useState<number | "">("");

  // Sorting: 'default' | 'asc' | 'desc'
  const [sortOrder, setSortOrder] = useState<"default" | "asc" | "desc">("default");

  const tags = [
    "Start Your Adventure",
    "Beach",
    "National Parks",
    "Lake",
    "Island",
    "Tracking",
    "Best Destination",
  ];

  // derive a list of countries from packages for the select control (use last segment after comma)
  const countries = Array.from(
    new Set(
      packages
        .map((p) => (p.location ?? "").split(",").pop()?.trim() || "")
        .filter(Boolean),
    ),
  );

  const filtered = useMemo(() => {
    const base = packages.filter((p) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.location && p.location.toLowerCase().includes(q));
      const matchesTag =
        !activeTag ||
        activeTag === "Start Your Adventure" ||
        p.categories?.includes(activeTag);

      const matchesPrice = (() => {
        if (minPrice === "" && maxPrice === "") return true;
        const low = minPrice === "" ? -Infinity : Number(minPrice);
        const high = maxPrice === "" ? Infinity : Number(maxPrice);
        const priceNum = typeof p.price === "number" ? p.price : null;
        if (priceNum == null) return false;
        return priceNum >= low && priceNum <= high;
      })();

      const pkgCountry = (p.location ?? "").split(",").pop()?.trim() || "";
      const matchesCountry =
        country === "Any" || !country ? true : pkgCountry === country;

      const matchesRating =
        minRating === "" ? true : p.rating >= Number(minRating);

      return (
        matchesQuery &&
        matchesTag &&
        matchesPrice &&
        matchesCountry &&
        matchesRating
      );
    });

    // Apply sorting
    const sorted = base.slice();
    if (sortOrder === "asc") {
      sorted.sort((a, b) => {
        const aNum = typeof a.price === "number" ? a.price : null;
        const bNum = typeof b.price === "number" ? b.price : null;
        if (aNum != null && bNum != null) return aNum - bNum;
        if (aNum != null && bNum == null) return -1; // numbers first
        if (aNum == null && bNum != null) return 1;
        return 0;
      });
    } else if (sortOrder === "desc") {
      sorted.sort((a, b) => {
        const aNum = typeof a.price === "number" ? a.price : null;
        const bNum = typeof b.price === "number" ? b.price : null;
        if (aNum != null && bNum != null) return bNum - aNum;
        if (aNum != null && bNum == null) return -1; // numbers first
        if (aNum == null && bNum != null) return 1;
        return 0;
      });
    }

    return sorted;
  }, [query, activeTag, minPrice, maxPrice, country, minRating, sortOrder]);

  return (
    <main>
      <Header />

      <section className="container pt-12 px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-primary text-white p-6 sm:p-10 shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide">
              PLAN YOUR TRIP WITH US
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/90 max-w-xl mx-auto">
              Set your travel goals, optimize your itinerary, and explore with
              ease. Our smart technology helps you plan the perfect adventure.
            </p>
            <div className="mt-6">
              <form
                className="mt-4 flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
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

                <Button
                  type="button"
                  className="w-full sm:w-auto ml-0 sm:ml-3 rounded-full bg-white text-primary px-5 py-2"
                  onClick={() => {
                    /* query is already bound to input */
                  }}
                >
                  Search
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="container flex flex-col items-center justify-center pt-0 pb-8">
        {/* Packages listing (full width) */}
        <div className="w-full max-w-6xl mt-8 relative">
          <div className="md:flex md:items-center md:justify-between">
            <h1 className="text-2xl md:text-3xl font-extrabold text-secondary uppercase">
              OUR PACKAGES
            </h1>

            <div className="flex items-center my-6 md:my-0 gap-3">
              <label className="text-sm text-foreground/70">Sort</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="rounded-md border border-input px-3 py-2 bg-white"
              >
                <option value="default">Default</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>

              <Button
                className="px-3 py-2 rounded-md border border-border"
                onClick={() =>
                  setShowFilters((s) => {
                    const next = !s;
                    if (next) {
                      setTempMinPrice(minPrice);
                      setTempMaxPrice(maxPrice);
                      setTempCountry(country);
                      setTempMinRating(minRating);
                    }
                    return next;
                  })
                }
              >
                Filters
              </Button>
            </div>

            {showFilters && (
              <div className="absolute right-6 mt-3 w-80 bg-white rounded-lg shadow-lg ring-1 ring-border p-4 z-50">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Filters</h4>
                  <button
                    className="text-sm text-foreground/70"
                    onClick={() => setShowFilters(false)}
                  >
                    Close
                  </button>
                </div>

                <div className="mt-3 space-y-3">
                  <div>
                    <label className="text-sm font-medium">
                      Price (min) (USD)
                    </label>
                    <input
                      type="number"
                      value={tempMinPrice}
                      onChange={(e) =>
                        setTempMinPrice(
                          e.target.value === "" ? "" : Number(e.target.value),
                        )
                      }
                      className="mt-1 w-full rounded-md border border-input px-3 py-2"
                      placeholder="No min"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Price (max) (USD)
                    </label>
                    <input
                      type="number"
                      value={tempMaxPrice}
                      onChange={(e) =>
                        setTempMaxPrice(
                          e.target.value === "" ? "" : Number(e.target.value),
                        )
                      }
                      className="mt-1 w-full rounded-md border border-input px-3 py-2"
                      placeholder="No max"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Country</label>
                    <select
                      value={tempCountry}
                      onChange={(e) => setTempCountry(e.target.value)}
                      className="mt-1 w-full rounded-md border border-input px-3 py-2 bg-white"
                    >
                      <option value="Any">Any</option>
                      {countries.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Minimum rating
                    </label>
                    <select
                      value={tempMinRating}
                      onChange={(e) =>
                        setTempMinRating(
                          e.target.value === "" ? "" : Number(e.target.value),
                        )
                      }
                      className="mt-1 w-full rounded-md border border-input px-3 py-2 bg-white"
                    >
                      <option value="">Any</option>
                      <option value={5}>5.0</option>
                      <option value={4.5}>4.5</option>
                      <option value={4}>4.0</option>
                      <option value={3.5}>3.5</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      className="bg-primary text-white"
                      onClick={() => {
                        setMinPrice(tempMinPrice);
                        setMaxPrice(tempMaxPrice);
                        setCountry(tempCountry);
                        setMinRating(tempMinRating);
                        setShowFilters(false);
                      }}
                    >
                      Apply
                    </Button>
                    <button
                      className="px-3 py-2 rounded-md border border-border"
                      onClick={() => {
                        setTempMinPrice("");
                        setTempMaxPrice("");
                        setTempCountry("Any");
                        setTempMinRating("");
                        // also clear applied filters
                        setMinPrice("");
                        setMaxPrice("");
                        setCountry("Any");
                        setMinRating("");
                      }}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <p className="mt-3 text-foreground/70">
            Explore curated travel packages with transparent pricing and trusted
            guides. Choose a package and book instantly or customize it with our
            team.
          </p>

          <div className="mt-6" />

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filtered.map((p) => {
              return (
                <article
                  key={p.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/package/${p.id}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") navigate(`/package/${p.id}`);
                  }}
                  className="h-full flex flex-col rounded-2xl bg-white shadow-sm overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-transform cursor-pointer"
                >
                  <div className="relative">
                    <div className="aspect-[16/9] overflow-hidden rounded-t-2xl">
                      <ImageWithFallback
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    </div>

                    <div className="absolute top-3 right-3 bg-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span className="text-sm text-gray-800">{p.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-[16px] md:text-lg mb-1">{p.title}</h3>
                        <p className="text-sm text-foreground/70 mt-1 flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-primary"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              d="M21 10c0 6-9 13-9 13S3 16 3 10A9 9 0 1 1 21 10z"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>{p.location ?? "Various"}</span>
                        </p>
                      </div>

                      <div className="text-right">
                        <div className=" text-xl md:text-2xl font-extrabold text-secondary">{typeof p.price === 'number' ? formatINRValue(p.price) : p.price}</div>
                        <div className="text-sm text-foreground/70">/Pax</div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/package/${p.id}`);
                        }}
                        className="flex-1 rounded-full border border-gray-300 py-2 text-sm font-semibold"
                      >
                        TOUR DETAILS
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // go to contact for booking
                          navigate('/contact');
                        }}
                        className="flex-1 rounded-full bg-primary text-white py-2 text-sm font-semibold"
                      >
                        BOOK NOW
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
}
