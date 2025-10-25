import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function PreFooterCTA() {
  return (
    <div className="w-full bg-primary text-white">
      <div className="container py-8">
        <div className="rounded-md py-8 px-0 bg-transparent">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-extrabold">
                Ready to Explore World ?
              </h3>
              <p className="mt-2 text-sm md:text-base text-white/95 max-w-xl">
                Start your journey today with expert planning, seamless booking,
                and unforgettable experiences.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/about">
                <Button className="rounded-full bg-black text-white hover:bg-gray-800">
                  About Us
                </Button>
              </Link>
              <Link to="/contact">
                <Button className="rounded-full bg-white text-primary hover:bg-white/90">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
