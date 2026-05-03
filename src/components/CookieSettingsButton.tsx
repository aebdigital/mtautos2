"use client";

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.__openCookieSettings?.()}
      className="p-0 text-left font-montserrat text-white hover:text-gray-300"
    >
      Cookies
    </button>
  );
}

declare global {
  interface Window {
    __openCookieSettings?: () => void;
  }
}
