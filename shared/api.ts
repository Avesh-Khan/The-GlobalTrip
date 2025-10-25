/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface VisaApplicationPayload {
  fullName: string;
  email: string;
  phone: string;
  passportNumber: string;
  country: string;
  visaType: "Tourist" | "Business" | "Family Visit";
  travelStart: string; // ISO date
  travelEnd: string; // ISO date
  message?: string;
}

export interface VisaApplicationResponse {
  ok: boolean;
  id: string;
}
