export const USD_TO_INR = 83; // static conversion rate, update as needed

const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

// Convert USD amount to INR and format
export function formatINR(usd: number) {
  const inr = Math.round(usd * USD_TO_INR);
  return formatter.format(inr);
}

// Format a value that is already in INR (no conversion)
export function formatINRValue(inr: number) {
  return formatter.format(Math.round(inr));
}
