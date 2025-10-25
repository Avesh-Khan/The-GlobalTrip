export default function WhatsAppWidget() {
  const phoneLink = "https://wa.me/15551234567?text=Hi%20TheGlobalTrek%20Team!%20I%20have%20a%20question%20about%20packages.";

  return (
    <a
      href={phoneLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-5 bottom-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform"
      style={{ top: '-471px', left: '-310px' }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M20.52 3.48A11.88 11.88 0 0012 0C5.373 0 .1 5.373.1 12c0 2.115.548 4.167 1.588 6.004L0 24l6.238-1.634A11.9 11.9 0 0012 24c6.627 0 11.997-5.373 11.997-12 0-3.2-1.245-6.203-3.477-8.52zM12 21.6a9.54 9.54 0 01-4.84-1.34l-.35-.21-3.7.97.99-3.61-.23-.37A9.333 9.333 0 012.7 12C2.7 6.48 6.48 2.7 12 2.7c2.55 0 4.95.98 6.75 2.78A9.48 9.48 0 0121.3 12 9.54 9.54 0 0112 21.6z" />
        <path d="M17.2 14.1c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15s-.76.97-.93 1.17c-.17.2-.34.23-.64.08-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.51.15-.17.2-.28.3-.47.1-.2 0-.37-.05-.52-.05-.15-.66-1.6-.9-2.2-.24-.57-.48-.5-.66-.51l-.56-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.52s1.08 2.93 1.23 3.13c.15.2 2.13 3.25 5.16 4.56 3.03 1.3 3.03.87 3.58.82.55-.05 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35z" fill="#fff"/>
      </svg>
    </a>
  );
}
