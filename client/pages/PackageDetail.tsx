import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { packages, type Package } from "@/lib/packages";
import { Star, Plane, Map, Truck, Coffee, Bed, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatINRValue } from "@/lib/currency";
import ImageWithFallback from "@/components/ui/image-with-fallback";

export default function PackageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pkg: Package | undefined = packages.find((p) => p.id === id);

  if (!pkg) {
    return (
      <main>
        <Header />
        <div className="container py-24 text-center">
          <h2 className="text-2xl font-semibold">Package not found</h2>
          <p className="mt-4 text-foreground/70">
            We couldn't find the package you're looking for.
          </p>
          <div className="mt-6">
            <Button onClick={() => navigate(-1)}>Back</Button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const [mainIndex, setMainIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"Overview"|"Itinerary"|"Hotel"|"Inclusion"|"Departure"|"Cancellation">("Overview");

  // build thumbnails array: include main image and few placeholders (or duplicates)
  const thumbs = Array.isArray(pkg.img) ? pkg.img : [pkg.img];
  

  return (
    <main>
      <Header />

      <section className="container py-8">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: gallery and tabs */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <ImageWithFallback src={thumbs[mainIndex]} alt={pkg.title} className="w-full h-[420px] object-cover" />
            </div>
            <div className="mt-3 flex items-center gap-3">
              {thumbs.map((t, i) => (
                <button key={i} onClick={() => setMainIndex(i)} className={`w-20 h-14 overflow-hidden rounded-md border ${i===mainIndex?"ring-2 ring-primary":"border-gray-200"}`}>
                  <ImageWithFallback src={t} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="mt-6 bg-white rounded-md shadow-sm p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-secondary uppercase">{pkg.title}</h1>
                  <div className="mt-2 text-sm text-foreground/70">{pkg.location}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-foreground/70">Tour code: {pkg.id.toUpperCase()}</div>
                  <div className="mt-2 text-2xl font-extrabold text-secondary">{typeof pkg.price === 'number' ? formatINRValue(pkg.price) : pkg.price}</div>
                </div>
              </div>

              {/* Tabs */}
              <nav className="mt-6 flex gap-2 flex-wrap border-b pb-2">
                {[
                  "Overview",
                  "Itinerary",
                  "Hotel",
                  "Inclusion",
                  "Departure",
                  "Cancellation",
                ].map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t as any)}
                    className={`px-3 py-2 text-sm font-medium ${activeTab===t?"text-primary border-b-2 border-primary":"text-foreground/70"}`}
                  >
                    {t}
                  </button>
                ))}
              </nav>

              <div className="mt-4">
                {activeTab === "Overview" && (
                  <div className="text-foreground/70">
                    <p>{pkg.title} includes accommodations, guided tours, and selected meals. Perfect for travelers seeking an immersive experience.</p>
                    <h3 className="mt-4 font-semibold">What's included</h3>
                    <ul className="list-disc list-inside mt-2 text-foreground/70">
                      <li>Accommodation for {pkg.nights ?? 3} nights</li>
                      <li>Guided local tours</li>
                      <li>Airport transfers</li>
                      <li>Selected meals and activities</li>
                    </ul>
                  </div>
                )}

                {activeTab === "Itinerary" && (
                  <div>
                    <h3 className="font-semibold">Itinerary</h3>
                    <ol className="list-decimal list-inside mt-2 text-foreground/70">
                      <li>Arrival and welcome dinner</li>
                      <li>City tour and local attractions</li>
                      <li>Free day to explore</li>
                      <li>Departure</li>
                    </ol>
                  </div>
                )}

                {activeTab === "Hotel" && (
                  <div>
                    <h3 className="font-semibold">Hotel Info</h3>
                    <p className="text-foreground/70 mt-2">Selected comfortable hotels with breakfast included. Exact properties may vary based on availability.</p>
                  </div>
                )}

                {activeTab === "Inclusion" && (
                  <div>
                    <h3 className="font-semibold">Inclusion & Exclusions</h3>
                    <ul className="list-disc list-inside mt-2 text-foreground/70">
                      <li>Inclusions: Accommodation, transfers, some meals</li>
                      <li>Exclusions: International flights, visa fees, personal expenses</li>
                    </ul>
                  </div>
                )}

                {activeTab === "Departure" && (
                  <div>
                    <h3 className="font-semibold">Departure & Cost</h3>
                    <p className="text-foreground/70 mt-2">Multiple departure dates available. Contact us for group departures and custom schedules.</p>
                  </div>
                )}

                {activeTab === "Cancellation" && (
                  <div>
                    <h3 className="font-semibold">Cancellation</h3>
                    <p className="text-foreground/70 mt-2">Cancellation policies vary by package; contact us for specifics.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="lg:col-span-4">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-foreground/70">Price</div>
                  <div className="mt-1 text-2xl font-extrabold text-rose-600">{typeof pkg.price === 'number' ? formatINRValue(pkg.price) : pkg.price}</div>
                  <div className="text-xs text-foreground/70">/ PP (On Twin Sharing)</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-foreground/70">With Flight</div>
                  <Info className="text-primary" />
                </div>
              </div>

              <hr className="my-4 border-border" />


              <div className="grid grid-cols-2 gap-4 text-sm text-foreground/70">
                <div className="flex items-center gap-2">
                  <Check className="text-emerald-600" />
                  <div>Kuta</div>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-emerald-600" />
                  <div>Ubud</div>
                </div>
              </div>

              <hr className="my-4 border-border" />

              <div className="grid grid-cols-3 gap-4 text-sm text-foreground/70">
                <div className="flex flex-col items-center gap-1">
                  <Plane className="text-emerald-600" />
                  <div>Flights</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Bed className="text-emerald-600" />
                  <div>Hotel Stay</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Truck className="text-emerald-600" />
                  <div>Transfer</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Coffee className="text-emerald-600" />
                  <div>Meals</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Map className="text-emerald-600" />
                  <div>Sightseeing</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Star className="text-emerald-600" />
                  <div>Guide</div>
                </div>
              </div>

              <hr className="my-4 border-border" />

              <div>
                <h4 className="font-semibold">Package Highlights</h4>
                <ul className="mt-2 text-foreground/70">
                  {pkg.categories?.map((c)=> (
                    <li key={c} className="flex items-center gap-2 mt-2"><Check className="text-emerald-600" />{c}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <div className="flex">
                  <Link to="/contact" className="flex-1">
                    <button className="flex-1 rounded-full bg-emerald-600 text-white py-3 px-7 font-semibold">BOOK NOW</button>
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
