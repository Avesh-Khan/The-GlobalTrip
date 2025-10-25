import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { VisaApplicationPayload } from "@shared/api";

interface Props {
  country: string;
  onSubmitted?: () => void;
}

export default function VisaApplicationForm({ country, onSubmitted }: Props) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<VisaApplicationPayload>({
    fullName: "",
    email: "",
    phone: "",
    passportNumber: "",
    country: country,
    visaType: "Tourist",
    travelStart: "",
    travelEnd: "",
    message: "",
  });

  const update = (k: keyof VisaApplicationPayload, v: string) =>
    setForm((s) => ({ ...s, [k]: v }));

  // ✅ Web3Forms Integration
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.email ||
      !form.phone ||
      !form.passportNumber ||
      !form.country ||
      !form.travelStart ||
      !form.travelEnd
    ) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
      });
      return;
    }

    try {
      setLoading(true);

      const data = {
        access_key: "399f2320-b3fe-46ef-bca6-6f3c20f97523", // ✅ your Web3Forms access key
        subject: "New Visa Application Submission",
        from_name: form.fullName,
        from_email: form.email,
        message: `
          Visa Application Details:
          ----------------------------
          Full Name: ${form.fullName}
          Email: ${form.email}
          Phone: ${form.phone}
          Passport Number: ${form.passportNumber}
          Country: ${form.country}
          Visa Type: ${form.visaType}
          Travel Start: ${form.travelStart}
          Travel End: ${form.travelEnd}
          Message: ${form.message || "N/A"}
        `,
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
        toast({
          title: "✅ Application submitted successfully!",
          description: "We’ll contact you within 24 hours.",
        });
        setForm({
          fullName: "",
          email: "",
          phone: "",
          passportNumber: "",
          country: country,
          visaType: "Tourist",
          travelStart: "",
          travelEnd: "",
          message: "",
        });
        onSubmitted?.();
      } else {
        toast({
          title: "❌ Submission failed",
          description: "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "⚠️ Something went wrong",
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="passportNumber">Passport Number</Label>
          <Input
            id="passportNumber"
            value={form.passportNumber}
            onChange={(e) => update("passportNumber", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            value={form.country}
            onChange={(e) => update("country", e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Visa Type</Label>
          <Select
            value={form.visaType}
            onValueChange={(v) => update("visaType", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select visa type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tourist">Tourist</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Family Visit">Family Visit</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="travelStart">Travel Start</Label>
          <Input
            id="travelStart"
            type="date"
            value={form.travelStart}
            onChange={(e) => update("travelStart", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="travelEnd">Travel End</Label>
          <Input
            id="travelEnd"
            type="date"
            value={form.travelEnd}
            onChange={(e) => update("travelEnd", e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Any additional details..."
        />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <Button type="submit" disabled={loading} className="uppercase">
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
