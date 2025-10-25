import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type BannerProps = {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaTo?: string;
};

export default function Banner({ title, subtitle, ctaLabel, ctaTo }: BannerProps) {
  return (
    <div className="rounded-2xl bg-primary text-white p-6 sm:p-10 shadow-lg">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide">{title}</h2>
        {subtitle && (
          <p className="mt-3 text-sm md:text-base text-white/90 max-w-xl mx-auto">{subtitle}</p>
        )}
        {ctaLabel && ctaTo && (
          <div className="mt-6">
            <Link to={ctaTo}>
              <Button className="rounded-full bg-white text-primary px-5 py-2">{ctaLabel}</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
