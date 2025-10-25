import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import type { VisaApplicationPayload } from "@shared/api";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  app.post("/api/visa-applications", (req, res) => {
    const body = req.body as VisaApplicationPayload | undefined;
    if (!body || !body.fullName || !body.email || !body.phone || !body.passportNumber || !body.country || !body.travelStart || !body.travelEnd) {
      return res.status(400).json({ ok: false, error: "invalid_payload" });
    }
    const id = Date.now().toString();
    // In a real app, persist to a database or send email to admin here.
    // eslint-disable-next-line no-console
    console.log("Visa application received", { id, ...body });
    return res.status(200).json({ ok: true, id });
  });

  return app;
}
