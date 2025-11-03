import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import naushinImg from "../images/naushin.jpg";
import karanImg from "../images/karan.jpg";
import danishImg from "../images/danish.jpg";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Global Trip International | Redefining Global Luxury Travel</title>
        <meta name="description" content="Global Trip International is a premier luxury travel agency offering world tours with flexible travel loan options. Creating unforgettable experiences for couples and families." />
        <meta name="keywords" content="about Global Trip International, world travel agency, luxury tours, global vacations, travel loans, premium holiday planner" />
      </Helmet>

      <main>
        <Header />

        <section className="container pt-12 px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-primary text-white p-6 sm:p-10 shadow-lg">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide">
                PLAN YOUR TRIP WITH US
              </h2>
              <p className="mt-3 text-sm md:text-base text-white/90 max-w-xl mx-auto">
                Tailored itineraries and expert support to make travel simple.
              </p>
              <div className="mt-6">
                <form className="mt-4" />
              </div>
            </div>
          </div>
        </section>

        <section className="container py-16 pb-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-secondary">
                About TheGlobalTrip
              </h1>
              <p className="mt-6 text-foreground/70 max-w-prose">
                We design personalized trips with trusted partners and 24/7
                support — travel made effortless.
              </p>

              <div className="mt-8 flex gap-4">
                <Link to="/package">
                  <Button className="bg-primary text-white uppercase tracking-wide">
                    Explore Packages
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="px-6">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000&auto=format&fit=crop"
                alt="Travel team helping customers"
                className="w-full h-80 object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-lg">Our Mission</h3>
              <p className="mt-2 text-foreground/70">
                To make travel accessible, effortless, and deeply memorable — one
                itinerary at a time.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-lg">Our Approach</h3>
              <p className="mt-2 text-foreground/70">
                Personalized planning, vetted partners, and transparent pricing
                crafted around your needs.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-lg">Why Choose Us</h3>
              <p className="mt-2 text-foreground/70">
                Trusted reviews, local guides, and 24/7 support on every trip we
                deliver.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-extrabold text-secondary">
              Leadership & Team
            </h2>
            <p className="mt-3 text-foreground/70 max-w-prose">
              A small, experienced team of travelers and planners who love
              crafting exceptional trips.
            </p>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
             {[
  { name: "Naushin Sheikh", role: "Founder", img: naushinImg },
  { name: "Karan Yadav", role: "Founder", img:karanImg },
  { name: "Danish Sheikh", role: "Founder", img: danishImg },
].map((m) => (
  <div
    key={m.name}
    className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm"
  >
    <div className="h-12 w-12 rounded-full overflow-hidden bg-slate-200">
      <img src={m.img} className="h-full w-full object-cover" />
    </div>
    <div>
      <div className="font-semibold">{m.name}</div>
      <div className="text-sm text-foreground/60">{m.role}</div>
    </div>
  </div>
))}

            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
