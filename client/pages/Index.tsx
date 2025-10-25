import { Star, Plane, Map, Settings2 } from "lucide-react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { packages } from "@/lib/packages";
import ImageWithFallback from "@/components/ui/image-with-fallback";

const heroImage =
  "https://cdn.builder.io/api/v1/image/assets%2F686d4cd813444250b5fa9039981a4fca%2Fd6ea90afc994492d8809491772dcbb6d";
const tripImage =
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2069&auto=format&fit=crop";
const visaLeft =
  "https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=2070&auto=format&fit=crop";
const visaRight =
  "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2071&auto=format&fit=crop";

const destinations = [
  {
    id: "banaroke",
    name: "Banaroke Castle",
    price: 167,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070&auto=format&fit=crop",
    categories: ["Best Destination", "Historical Park", "World", "Temple"],
  },
  {
    id: "cape-ranges",
    name: "Cape Ranges",
    price: 154,
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2069&auto=format&fit=crop",
    categories: ["Best Destination", "Beach", "Hill", "World"],
  },
  {
    id: "osaka",
    name: "Osaka Castle",
    price: 163,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2070&auto=format&fit=crop",
    categories: ["Best Destination", "Historical Park", "Temple", "World"],
  },
  {
    id: "amalfi",
    name: "Amalfi Coast",
    price: 145,
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=2069&auto=format&fit=crop",
    categories: ["Best Destination", "Beach", "World"],
  },
  {
    id: "tanah",
    name: "Tanah Gajah",
    price: 138,
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1543248939-ff40856f65d4?q=80&w=2070&auto=format&fit=crop",
    categories: ["Best Destination", "Temple", "World"],
  },
  {
    id: "taj",
    name: "Taj Mahal",
    price: 120,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2069&auto=format&fit=crop",
    categories: ["Best Destination", "Historical Park", "World", "Temple"],
  },
] as const;

const tabs = [
  "Best Destination",
  "Beach",
  "Historical Park",
  "Hill",
  "World",
  "Temple",
] as const;

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

import { formatINRValue } from "@/lib/currency";

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
          Starting from {typeof price === 'number' ? formatINRValue(price) : price}
        </p>
      </div>
    </div>
  );
}

export default function Index() {
  const [active, setActive] =
    useState<(typeof tabs)[number]>("Best Destination");
  const filtered = useMemo(
    () => packages.filter((p) => (p.categories ?? []).includes(active)).slice(0, 6),
    [active],
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Header />

      {/* Hero */}
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
              journeys, happy memories, and trusted service every step of
              the way.
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

      {/* Stats */}
      <section className="container -mt-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24">
          <StatCard
            value="88%"
            label="Happy Clients"
            colorClass="border-teal-200"
          />
          <StatCard
            value="1.2K+"
            label="Tours Completed"
            colorClass="border-sky-200"
          />
          <StatCard
            value="1K+"
            label="Destination Packages"
            colorClass="border-pink-200"
          />
          <StatCard
            value="1.5K+"
            label="Awesome Reviews"
            colorClass="border-emerald-200"
          />
        </div>
      </section>

      {/* Trip Planning */}
      <section className="container mt-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-secondary">
            PLAN YOUR TRIP <br />
            WITH US
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

      {/* Popular Destinations */}
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

        {/* Category pills removed per design update */}

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((d) => (
            <DestinationCard
              key={(d as any).id ?? (d as any).title}
              name={(d as any).title ?? (d as any).name}
              price={(d as any).price}
              rating={(d as any).rating}
              img={(d as any).img}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/package">
            <Button className="px-6 py-3">Show More</Button>
          </Link>
        </div>
      </section>

      {/* Visa Services */}
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

      {/* Testimonials */}
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

          {/* Additional testimonials */}
          <TestimonialCard
            quote="Everything was well-organized, from flights to hotels. Their visa service was quick and hassle-free. Truly made my Dubai vacation unforgettable!"
            name="Sarah Mehta"
            avatar="https://cdn.builder.io/api/v1/image/assets%2F686d4cd813444250b5fa9039981a4fca%2F80d336b2098344d29f755fa9db50a4a2"
            subtitle="Dubai Tour"
          />
          <TestimonialCard
            quote="Fantastic experience from start to finish! They handled my Schengen visa smoothly. Highly recommend for stress-free travel."
            name="Rahul Kumar"
            avatar="https://cdn.builder.io/api/v1/image/assets%2F686d4cd813444250b5fa9039981a4fca%2F822d4bbfc9aa42fcb052f60f3a64018b"
            subtitle="Europe Tour"
          />
          <TestimonialCard
            quote="Our honeymoon was perfectly planned. Beautiful resort, smooth bookings, zero stress. They turned our dream trip into reality!"
            name="Priya Nair"
            avatar="https://cdn.builder.io/api/v1/image/assets%2F686d4cd813444250b5fa9039981a4fca%2F91014ca335cc4490b432efd0af5ee78e"
            subtitle="Bali Honeymoon"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

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
