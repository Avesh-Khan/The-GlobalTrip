import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { forwardRef, TextareaHTMLAttributes, useState, useEffect } from "react";
import { packages } from "@/lib/packages";
import { Helmet } from "react-helmet-async";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  packageId: z.string().optional(),
  enquiry: z
    .enum(["Booking", "Availability", "Visa", "Customization", "Other"])
    .optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  travelInsurance: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>((props, ref) => {
  return (
    <textarea
      ref={ref}
      {...props}
      className={`flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${props.className ?? ""}`}
    />
  );
});
Textarea.displayName = "Textarea";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      packageId: "",
      enquiry: "",
      message: "",
    },
  });

  // ✅ Web3Forms Integration (JSON method)
  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);

      const data = {
        access_key: "399f2320-b3fe-46ef-bca6-6f3c20f97523", // 🔑 your Web3Forms key
        name: values.name,
        email: values.email,
        phone: values.phone || "",
        package: values.packageId || "Not specified",
        enquiry: values.enquiry || "General",
        message: values.message,
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (json.success) {
        alert("✅ Message sent successfully! We’ll reply within 24 hours.");
        form.reset();
      } else {
        alert("❌ Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("⚠️ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // const [searchParams] = useSearchParams();
  // const packageIdFromURL = searchParams.get("packageId");

  // useEffect(() => {
  //   if (packageIdFromURL) {
  //     form.setValue("packageId", packageIdFromURL);
  //   }
  // }, [packageIdFromURL, form]);


  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const preselectedPackage = params.get("package");
  const preselectedPackageId = params.get("id");

  useEffect(() => {
    if (preselectedPackageId) {
      form.setValue("packageId", preselectedPackageId);
    } else if (preselectedPackage) {
      // fallback to title matching if only name is sent
      const found = packages.find(
        (p) => p.title.toLowerCase() === preselectedPackage.toLowerCase()
      );
      if (found) form.setValue("packageId", found.id);
    }
    // auto-select enquiry type as "Booking"
    form.setValue("enquiry", "Booking");
  }, [preselectedPackageId, preselectedPackage, form, packages]);



  return (
    <>
      <Helmet>
        <title>Contact Global Trip International | Plan Your Luxury World Tour</title>
        <meta name="description" content="Contact Global Trip International to plan your luxury world tour. Our experts assist with travel loans, exclusive packages, and custom itineraries for couples and families." />
        <meta name="keywords" content="contact Global Trip International, world travel agency, travel assistance, luxury tours, global holidays, travel loans" />
      </Helmet>

      <main>
        <Header />

        <section className="container pt-12 px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-primary text-white p-6 sm:p-10 shadow-lg">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide">
                GET IN TOUCH
              </h2>
              <p className="mt-3 text-sm md:text-base text-white/90 max-w-xl mx-auto">
                Questions about bookings or visas? Send a message and we'll reply
                within 24 hours.
              </p>
              <div className="mt-6">
                <form className="mt-4" />
              </div>
            </div>
          </div>
        </section>

        <section className="container pt-12 px-4 sm:px-6 lg:px-8 pb-24 grid md:grid-cols-2 gap-12 items-start">
          <div className="max-sm:mt-5">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-secondary">
              Contact Us
            </h1>
            <p className="mt-4 text-foreground/70 max-w-prose">
              Questions about bookings or visas? Send a message — we'll reply
              within 24 hours.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <h4 className="font-semibold">Office</h4>
                <p className="text-sm text-foreground/70 mt-2">
                  Marwadi Square, Nagpur, Maharashtra
                </p>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <h4 className="font-semibold">Email</h4>
                <a
                  href="mailto:globaltripinternational@gmail.com"
                  className="text-sm text-primary hover:underline"
                >
                  globaltripinternational@gmail.com
                </a>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <h4 className="font-semibold">Phone</h4>
                <a
                  href="tel:+919156856387"
                  className="text-sm text-primary hover:underline"
                  style={{ marginLeft: "1px" }}
                >
                  +91 9156856387
                </a>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <h4 className="font-semibold">Working Hours</h4>
                <p className="text-sm text-foreground/70 mt-2">
                  Mon - Fri: 9:00 - 18:00
                  <br />
                  Sat: 10:00 - 14:00
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-lg">
                Frequently Asked Questions
              </h3>
              <div className="mt-3 space-y-2">
                <details className="rounded-lg bg-white p-4 shadow-sm">
                  <summary className="cursor-pointer font-medium">
                    How long does booking confirmation take?
                  </summary>
                  <p className="mt-2 text-sm text-foreground/70">
                    Most bookings are confirmed within 24 hours. Custom
                    itineraries may take 48-72 hours to finalize.
                  </p>
                </details>
                <details className="rounded-lg bg-white p-4 shadow-sm">
                  <summary className="cursor-pointer font-medium">
                    Do you provide travel insurance?
                  </summary>
                  <p className="mt-2 text-sm text-foreground/70">
                    We recommend travel insurance. We can connect you with trusted
                    providers during booking.
                  </p>
                </details>
                <details className="rounded-lg bg-white p-4 shadow-sm">
                  <summary className="cursor-pointer font-medium">
                    Can I customize a package?
                  </summary>
                  <p className="mt-2 text-sm text-foreground/70">
                    Yes — most of our packages can be tailored to your
                    preferences. Contact our team to get started.
                  </p>
                </details>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-sm font-semibold">
                Trusted
              </div>
              <div className="rounded-full bg-yellow-100 text-yellow-800 px-3 py-1 text-sm font-semibold">
                Secure Payments
              </div>
              <div className="rounded-full bg-slate-100 text-slate-800 px-3 py-1 text-sm font-semibold">
                24/7 Support
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Optional phone"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="packageId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Package</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="w-full rounded-md border border-input px-3 py-2 bg-background"
                          >
                            <option value="">
                              -- Select package (optional) --
                            </option>
                            {packages.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.title} — {p.location}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="enquiry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enquiry</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="w-full rounded-md border border-input px-3 py-2 bg-background"
                          >
                            <option value="">Select enquiry type</option>
                            <option value="Booking">Booking</option>
                            <option value="Availability">Availability</option>
                            <option value="Visa">Visa</option>
                            <option value="Travel Finance">Travel Finance</option>
                            <option value="US DropBox Visa">US DropBox Visa</option>
                            <option value="Customization">Customization</option>
                            <option value="Other">Other</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="How can we help you?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="travelInsurance"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 mt-4">
                      <FormControl>
                        <input
                          type="checkbox"
                          id="travelInsurance"
                          checked={field.value || false}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="h-3 w-3 mt-2 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                      </FormControl>
                      <FormLabel htmlFor="travelInsurance" className="text-sm text-foreground/80">
                        I would like to include Travel Insurance
                      </FormLabel>
                    </FormItem>
                  )}
                />


                <div className="flex items-center gap-3">
                  <Button
                    type="submit"
                    className="uppercase tracking-wide bg-primary hover:bg-primary/90 text-white"
                  >
                    Send Message
                  </Button>
                  <a
                    href="mailto:globaltripinternational@gmail.com"
                    className="ml-2 text-sm text-foreground/70"
                  >
                    Or email us directly
                  </a>
                </div>
              </form>
            </Form>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
