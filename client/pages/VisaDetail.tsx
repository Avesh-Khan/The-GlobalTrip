import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Banner from "@/components/site/Banner";
import { COUNTRIES, FLAG_CDN, type Country } from "@/lib/countries";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import VisaApplicationForm from "@/components/visa/VisaApplicationForm";

function getVisaInfo(c: Country) {
  const commonDocs = ["Passport (minimum 6 months validity)", "Recent passport-size photo", "Completed application form"];
  const regionBased: Record<string, { processing: string; fee: string; extra?: string[] }> = {
    "Europe": { processing: "5-10 business days", fee: "$40" },
    "Asia": { processing: "7-15 business days", fee: "$50" },
    "Africa": { processing: "10-20 business days", fee: "$60" },
    "Middle East": { processing: "7-14 business days", fee: "$55" },
    "North America": { processing: "5-10 business days", fee: "$45" },
    "South America": { processing: "7-12 business days", fee: "$40" },
    "Australia": { processing: "5-10 business days", fee: "$65" },
    "Central America": { processing: "7-14 business days", fee: "$35" },
    "Caribbean": { processing: "7-14 business days", fee: "$35" },
  };

  const base = regionBased[c.region] ?? { processing: "7-14 business days", fee: "$50" };
  const documents = [...commonDocs];
  if (c.name === "USA") documents.push("ESTA or visa depending on nationality");
  if (c.name === "UK") documents.push("Additional ID may be required for certain nationalities");

  return {
    visaType: "Tourist Visa",
    documents,
    processing: base.processing,
    fee: base.fee,
    notes: base.extra ?? [],
  };
}

export default function VisaDetail() {
  const { iso } = useParams();
  const navigate = useNavigate();
  const country = COUNTRIES.find((c) => c.iso === iso);

  if (!country) {
    return (
      <main>
        <Header />
        <div className="container py-24 text-center">
          <h2 className="text-2xl font-semibold">Country not found</h2>
          <p className="mt-4 text-foreground/70">We couldn't find that destination.</p>
          <div className="mt-6">
            <Button onClick={() => navigate(-1)}>Back</Button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const [tab, setTab] = useState<"Tourist" | "Seamen">("Tourist");
  const info = getVisaInfo(country);

  return (
    <main>
      <Header />

      <section className="container py-12">
        <Banner
          title={country.name}
          subtitle={`Visa requirements for ${country.name} - general guidelines and helpful information.`}
        />

        <div className="mt-8 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-extrabold">{country.name}</h1>
            <div className="mt-3 flex items-center gap-4">
              <div className="text-sm text-foreground/70">Region: {country.region}</div>
            </div>

            <div className="mt-6 text-foreground/70">
              <p>
                Visa requirements for {country.name} depend on your nationality and purpose of travel. Below are general guidelines for tourist travel. For exact and up-to-date information, contact our team.
              </p>

              <div className="mt-6">
                <nav className="flex gap-6 border-b">
                  <button
                    onClick={() => setTab("Tourist")}
                    className={`pb-3 text-sm font-semibold ${tab === "Tourist" ? "text-primary border-b-2 border-primary" : "text-foreground/70"}`}
                  >
                    Tourist
                  </button>
                  <button
                    onClick={() => setTab("Seamen")}
                    className={`pb-3 text-sm font-semibold ${tab === "Seamen" ? "text-primary border-b-2 border-primary" : "text-foreground/70"}`}
                  >
                    Seamen
                  </button>
                </nav>

                {tab === "Tourist" && (
                  <div className="mt-6">
                    <h3 className="text-xl font-bold text-red-600 uppercase">Tourist Visa</h3>
                    <ol className="mt-4 list-decimal list-inside text-foreground/70 space-y-2">
                      <li>Org valid ppt at least for 06 months.</li>
                      <li>Two colour photo 35x45mm 80% face white background.</li>
                      <li>Two visa application form dully filled & signed by paxs only, back to back print will not do.</li>
                      <li>Original Covering letter from applicant on business letter head with company round seal, if having own business, if working in company then covering letter on plain paper will do.</li>
                      <li>Original Leave letter from company on letter head with mentioning exact leaves dated & with round seal of company.</li>
                      <li>Indian company Registration copy.</li>
                      <li>Prsnl Org bank stmt of applicant for last 03 months with org bank seal & sign on each page.</li>
                      <li>Prsnl I T paper copies for last 03 years.</li>
                      <li>Ticket Itenary.</li>
                      <li>Hotel booking as per tkt copy.</li>
                      <li>Travel Insurance as per tkt copy.</li>
                      <li>Day to Day Itenary</li>
                    </ol>
                  </div>
                )}

                {tab === "Seamen" && (
                  <div className="mt-6">
                    <h3 className="text-xl font-bold">Seamen Visa</h3>
                    <p className="mt-2 text-foreground/70">Please contact our team for Seamen visa requirements and documentation. We will provide step-by-step guidance.</p>
                  </div>
                )}
              </div>

              <h3 className="mt-6 font-semibold">What's included</h3>
              <ul className="mt-2 list-disc list-inside text-foreground/70">
                <li>Visa application assistance</li>
                <li>Document checklist and form filling</li>
                <li>Appointment scheduling</li>
                <li>Follow-up until approval</li>
              </ul>

              <h3 className="mt-6 font-semibold">Required Documents</h3>
              <ul className="mt-2 list-disc list-inside text-foreground/70">
                {info.documents.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>

              <h3 className="mt-6 font-semibold">Application Steps</h3>
              <ol className="mt-2 list-decimal list-inside text-foreground/70">
                <li>Prepare your documents as listed above.</li>
                <li>Submit the application through embassy/consulate or online portal.</li>
                <li>Attend any required appointments.</li>
                <li>Receive decision and collect your passport.</li>
              </ol>

              <div className="mt-6">
                <h3 className="font-semibold">Processing Time</h3>
                <div className="mt-2 text-lg font-extrabold text-secondary">{info.processing}</div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold">Application Fee</h3>
                <div className="mt-2 text-lg font-extrabold">{info.fee}</div>
              </div>

              <div className="mt-6 flex gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-primary text-white uppercase">Contact Us</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Visa Application</DialogTitle>
                      <DialogDescription>Provide your details and our team will contact you.</DialogDescription>
                    </DialogHeader>
                    <VisaApplicationForm country={country.name} />
                  </DialogContent>
                </Dialog>
                <a href={`mailto:info@theglobaltrek.com?subject=Visa%20assistance%20for%20${encodeURIComponent(country.name)}`}>
                  <Button variant="outline">Request Assistance</Button>
                </a>
                <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
              </div>
            </div>
          </div>

          <aside className="rounded-2xl bg-white p-6 shadow-sm">
            <h4 className="font-semibold">Need help?</h4>
            <p className="mt-2 text-foreground/70">Contact our visa experts to customize your application or ask questions.</p>
            <div className="mt-4">
              <a href="mailto:globaltripinternational@gmail.com" className="text-primary hover:underline">globaltripinternational@gmail.com</a>
            </div>
            <div className="mt-6">
              <div className="text-sm text-foreground/70">Category</div>
              <div className="mt-1 flex gap-2 flex-wrap">
                <span className="text-sm px-2 py-1 rounded-full bg-slate-100 text-slate-800">Visa Service</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
