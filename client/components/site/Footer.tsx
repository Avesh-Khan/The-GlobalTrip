import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

import PreFooterCTA from "@/components/site/PreFooterCTA";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-20">
      <PreFooterCTA />

      <div className="container py-12 grid gap-8 grid-cols-1 md:grid-cols-2 items-start">
        <div>
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="h-8 w-8 rounded-full border border-white/20 grid place-items-center">
              ✺
            </div>
            <div className="text-lg font-semibold">TheGlobalTrek</div>
          </div>

          <p className="mt-4 text-gray-300 max-w-md text-center md:text-left">
            We handle everything from destination planning to visa
            processing, so you can travel stress-free.
          </p>

          <nav className="mt-6 flex gap-4 flex-wrap text-sm text-gray-400 justify-center md:justify-start">
            <a href="#" className="hover:text-gray-100">
              Home
            </a>
            <a href="#" className="hover:text-gray-100">
              About Us
            </a>
            <a href="#" className="hover:text-gray-100">
              Package
            </a>
            <a href="#" className="hover:text-gray-100">
              Contact
            </a>
          </nav>

          <div className="mt-6 flex gap-3 justify-center md:justify-start">
            <a
              aria-label="Facebook"
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-200"
            >
              <Facebook />
            </a>
            <a
              aria-label="Twitter"
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-200"
            >
              <Twitter />
            </a>
            <a
              aria-label="Instagram"
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-200"
            >
              <Instagram />
            </a>
            <a
              aria-label="LinkedIn"
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-200"
            >
              <Linkedin />
            </a>
            <a
              aria-label="YouTube"
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-200"
            >
              <Youtube />
            </a>
          </div>
        </div>

        <div className="md:self-center flex flex-col items-center md:items-end">
          <h4 className="text-sm font-semibold text-gray-200 text-center md:text-right">
            Stay up to date
          </h4>
          <form
            className="mt-4 flex items-center gap-3 justify-center md:justify-end flex-col md:flex-row w-full md:w-auto"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed! 🎉");
            }}
          >
            <label htmlFor="footer-email" className="sr-only">
              Enter your email
            </label>
            <input
              id="footer-email"
              type="email"
              required
              placeholder="Enter your email"
              className="rounded-full px-4 py-2 bg-gray-800 placeholder-gray-400 text-gray-100 border border-gray-700 w-full md:w-64"
            />
            <button className="rounded-full bg-white text-gray-900 px-4 py-2 w-full md:w-auto mt-2 md:mt-0">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container py-4 flex flex-col md:flex-row items-center justify-center text-sm text-gray-400 gap-2">
          <div className="text-center md:text-left">
            <p>© 2025 TheGlobalTrek. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
