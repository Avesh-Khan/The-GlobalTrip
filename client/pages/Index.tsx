import { Star, Plane, Map, Settings2 } from "lucide-react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { packages } from "@/lib/packages";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import { formatINRValue } from "@/lib/currency";
import { Helmet } from "react-helmet-async";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

// Hero & Section Images
const heroImage =
  "https://cdn.builder.io/api/v1/image/assets%2F686d4cd813444250b5fa9039981a4fca%2Fd6ea90afc994492d8809491772dcbb6d";
const tripImage =
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2069&auto=format&fit=crop";
const visaLeft =
  "https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=2070&auto=format&fit=crop";
const visaRight =
  "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2071&auto=format&fit=crop";

// Small stat component
function StatCard({
  value,
  label,
  colorClass,
}: {
  value: string;
  label: string;
  colorClass?: string;
}) {
  return (
    <div
      className={`rounded-xl bg-white p-6 text-center border-2 ${colorClass ?? "border-border"}`}
    >
      <div className="text-3xl font-extrabold tracking-tight text-secondary">
        {value}
      </div>
      <p className="mt-1 text-sm text-foreground/70">{label}</p>
    </div>
  );
}

// Destination Card component
function DestinationCard({
  name,
  price,
  rating,
  img,
}: {
  name: string;
  price: number | string;
  rating: number;
  img: string;
}) {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
        <ImageWithFallback
          src={img}
          alt={`${name} destination photo`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-full flex items-center gap-2 text-emerald-600">
          <Star className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-700">
            {Number(rating).toFixed(1)}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-lg">{name}</h4>
        <p className="text-sm text-foreground/70 mt-1">
          Starting from{" "}
          {typeof price === "number" ? formatINRValue(price) : price}
        </p>
      </div>
    </div>
  );
}

// ✅ Main Home Page Component
export default function Index() {
  // ✅ Select only specific 6 packages to display
  const popularPackages = useMemo(() => {
    const popularIds = [
      "PHU-VIL-05",
      "DXB-SK-05",
      "SG-05", 
      "KL-04",
      "KASH-06", 
      "BKK-PTY-04",
    ];
    return packages.filter((pkg) => popularIds.includes(pkg.id));
  }, []);

  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>
          Global Trip International | Luxury World Tours with Easy Travel Loans
        </title>
        <meta
          name="description"
          content="Explore the world in luxury with Global Trip International. Enjoy exclusive international tours, easy travel loans, and premium services for couples and families."
        />
        <meta
          name="keywords"
          content="luxury world tours, Global Trip International, international travel, travel loans, honeymoon packages, family vacations, premium holidays, global tours"
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
        <Header />

        {/* 🌍 Hero Section */}
        <section className="container mt-8 flex flex-col gap-8">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h1 className="text-5xl md:text-7xl leading-tight font-extrabold tracking-tight">
                <span className="block text-4xl md:text-6xl">EXPLORE</span>
                <span className="block text-primary">THE WORLD</span>
              </h1>
            </div>
            <div className="space-y-6 max-w-[444px]">
              <p className="text-foreground/70 max-w-md">
                We handle everything from destination planning to visa
                processing, so you can travel stress-free. Experience smooth
                journeys, happy memories, and trusted service every step of the
                way.
              </p>
              <div className="flex items-center gap-4 max-w-[409px] justify-start">
                <Link to="/package">
                  <Button className="uppercase tracking-wide bg-secondary text-white px-6 py-3">
                    Book your Packages
                  </Button>
                </Link>
                <Button variant="outline" className="px-6 py-3">
                  Contact
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={heroImage}
                alt="Scenic mountain valley landscape"
                className="w-full h-[420px] object-cover rounded-2xl"
              />
            </div>
          </div>
        </section>

        {/* 📊 Stats Section */}
        <section className="container -mt-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24">
            <StatCard value="88%" label="Happy Clients" colorClass="border-teal-200" />
            <StatCard value="1.2K+" label="Tours Completed" colorClass="border-sky-200" />
            <StatCard value="1K+" label="Destination Packages" colorClass="border-pink-200" />
            <StatCard value="1.5K+" label="Awesome Reviews" colorClass="border-emerald-200" />
          </div>
        </section>

        {/* ✈️ Trip Planning Section */}
        <section className="container mt-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-secondary">
              PLAN YOUR TRIP <br /> WITH US
            </h2>
            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <Map className="text-primary" />
                <div>
                  <h3 className="font-semibold">Choose Your Destination</h3>
                  <p className="text-foreground/70">
                    Plan your route and choose your destination efficiently
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Settings2 className="text-primary" />
                <div>
                  <h3 className="font-semibold">Personalize Your Trip</h3>
                  <p className="text-foreground/70">
                    Your trip should match your needs and interests
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Plane className="text-primary" />
                <div>
                  <h3 className="font-semibold">Travel Effortlessly</h3>
                  <p className="text-foreground/70">
                    Optimize travel pace, optimize your itinerary
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-sm ring-1 ring-border">
            <img
              src={tripImage}
              alt="Serene lake and mountain landscape"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </section>

        <section className="container mt-20">
          <div className="max-w-full mx-auto bg-white p-8 rounded-2xl shadow-sm ring-1 ring-border">
  <h2 className="text-3xl font-extrabold tracking-tight text-secondary mb-6 text-center">
    Travel Insurance Policy
  </h2>
  <p className="text-center text-sm text-foreground/70 mb-8">
    We do <strong>USA Dropbox</strong> and provide insurance support for safe and worry-free travel.
  </p>

  <div>
  <form className="flex flex-wrap items-center justify-center gap-12">
    <div>
      <Label htmlFor="name">Name</Label>
      <Input id="name" type="text" placeholder="Enter your name"  required />
    </div>

    <div>
      <Label htmlFor="phone">Phone</Label>
      <Input id="phone" type="tel" placeholder="Enter phone number" required />
    </div>

    <div>
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="Enter email" required />
    </div>

    <div>
      <Label htmlFor="country">Country</Label>
      <Input id="country" type="text" placeholder="Enter country" required />
    </div>

    <div className="w-full flex justify-center pt-4">
      <Button type="submit" className="px-6 py-2 uppercase tracking-wide">
        Submit
      </Button>
    </div>
  </form>
</div>

</div>

        </section>

        {/* 🗺️ Popular Destinations Section */}
        <section className="container mt-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-secondary">
              POPULAR DESTINATION
            </h2>
            <p className="mt-3 text-foreground/70">
              Set your travel goals, optimize your budget, and travel through
              must-see destinations
            </p>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularPackages.map((pkg) => (
              <DestinationCard
                key={pkg.id}
                name={pkg.title}
                price={pkg.price}
                rating={pkg.rating}
                img={pkg.img}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/package">
              <Button className="px-6 py-3">Show More</Button>
            </Link>
          </div>
        </section>

        {/* 🛂 Visa Services Section */}
        <section className="container mt-20 grid md:grid-cols-2 gap-10 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img
              src={visaLeft}
              alt="Thousand Island scenic view"
              className="rounded-xl h-72 w-full object-cover"
              loading="lazy"
            />
            <img
              src={visaRight}
              alt="St. Maalomas cityscape"
              className="rounded-xl h-72 w-full object-cover mt-8"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-secondary">
              HASSLE-FREE VISA ASSISTANCE
            </h2>
            <p className="mt-4 text-foreground/70">
              Set your travel goals, optimize your budget, and obtain all
              necessary documentation to visit destinations.
            </p>
            <Button className="mt-6 bg-primary hover:bg-primary/90 text-white uppercase tracking-wide">
              Learn More
            </Button>
          </div>
        </section>

        {/* 💬 Testimonials Section */}
        <section className="container mt-20">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-secondary text-center">
            WHAT OUR TRAVELERS SAY
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <TestimonialCard
              quote="Loved every moment of my Thailand trip. The team managed everything with great care. Visa and travel were handled super smoothly!"
              name="Aman Verma"
              avatar="https://cdn.builder.io/api/v1/image/assets%2F686d4cd813444250b5fa9039981a4fca%2F816197772bd44c079da4039bf328105e"
              subtitle="Thailand Package"
            />
            <TestimonialCard
              quote="Very professional and responsive service. They made my visa approval quick and easy. A perfect vacation experience overall!"
              name="Sneha Patel"
              avatar="https://cdn.builder.io/api/v1/image/assets%2F686d4cd813444250b5fa9039981a4fca%2Fb313273002ff446ab0b5dac6addb0eaf"
              subtitle="Singapore Tour"
            />
            <TestimonialCard
              quote="Excellent planning and coordination throughout. Our resort was stunning and exactly as promised. Truly a relaxing, worry-free getaway!"
              name="Advit Thakur"
              avatar="https://cdn.builder.io/api/v1/image/assets%2F686d4cd813444250b5fa9039981a4fca%2Fba4e47245f5641169b998574d5356643"
              subtitle="Maldives Holiday"
            />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

// ⭐ Testimonial Component
function TestimonialCard({
  quote,
  name,
  avatar,
  subtitle,
}: {
  quote: string;
  name: string;
  avatar: string;
  subtitle?: string;
}) {
  return (
    <figure className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border">
      <blockquote className="text-foreground/90">“{quote}”</blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <img
          src={avatar}
          alt={`${name} profile image`}
          className="h-10 w-10 rounded-full object-cover"
          loading="lazy"
        />
        <div className="text-sm">
          <div className="font-semibold">{name}</div>
          <div className="text-foreground/60">{subtitle ?? "Traveler"}</div>
        </div>
      </figcaption>
    </figure>
  );
}
