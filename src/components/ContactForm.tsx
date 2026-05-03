"use client";

import Link from "next/link";
import Script from "next/script";
import { FormEvent, useCallback, useRef, useState } from "react";

const TURNSTILE_SITE_KEY = "0x4AAAAAACGYwHRtj640z_Zr";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message: string;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId: string) => void;
    };
  }
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: "idle", message: "" });
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const initTurnstile = useCallback(() => {
    if (!turnstileRef.current || !window.turnstile || widgetIdRef.current) return;

    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(""),
      "error-callback": () => setTurnstileToken(""),
    });
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!turnstileToken) {
      setFormStatus({
        type: "error",
        message: "Prosím počkajte na overenie bezpečnostnej kontroly.",
      });
      return;
    }

    setFormStatus({ type: "loading", message: "Odosielam..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          "cf-turnstile-response": turnstileToken,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Nastala chyba pri odosielaní");
      }

      setFormStatus({
        type: "success",
        message: "Vaša správa bola úspešne odoslaná. Ozveme sa Vám čo najskôr.",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTurnstileToken("");
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
    } catch (error) {
      setFormStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Nastala chyba pri odosielaní",
      });
      setTurnstileToken("");
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
    }
  }

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" onLoad={initTurnstile} />

      <div className="overflow-hidden rounded-lg shadow-lg">
        <div
          className="relative h-48 bg-cover bg-center"
          style={{ backgroundImage: 'url("/kontakt bg.jpg")' }}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-4 left-4">
            <h2 className="font-jost text-2xl font-bold text-white">Ak máte otázky, neváhajte sa pýtať!</h2>
          </div>
        </div>

        <div className="bg-white p-6">
          <p className="mb-6 font-montserrat text-sm text-gray-600">
            Vyplňte potrebné údaje a ozveme sa Vám čo najskôr.
          </p>

          {formStatus.type !== "idle" ? (
            <div
              className={`mb-4 rounded border p-4 ${
                formStatus.type === "success"
                  ? "border-green-300 bg-green-100 text-green-800"
                  : formStatus.type === "error"
                    ? "border-red-300 bg-red-100 text-red-800"
                    : "border-blue-300 bg-blue-100 text-blue-800"
              }`}
            >
              {formStatus.message}
            </div>
          ) : null}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Meno"
                value={formData.name}
                onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                className="w-full rounded border border-gray-300 px-3 py-2 font-montserrat"
                required
                disabled={formStatus.type === "loading"}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                className="w-full rounded border border-gray-300 px-3 py-2 font-montserrat"
                required
                disabled={formStatus.type === "loading"}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="tel"
                name="phone"
                placeholder="Telefón"
                value={formData.phone}
                onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
                className="w-full rounded border border-gray-300 px-3 py-2 font-montserrat"
                disabled={formStatus.type === "loading"}
              />
              <input
                type="text"
                name="subject"
                placeholder="Predmet"
                value={formData.subject}
                onChange={(event) => setFormData((prev) => ({ ...prev, subject: event.target.value }))}
                className="w-full rounded border border-gray-300 px-3 py-2 font-montserrat"
                disabled={formStatus.type === "loading"}
              />
            </div>

            <textarea
              name="message"
              placeholder="Správa"
              rows={4}
              value={formData.message}
              onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
              className="w-full rounded border border-gray-300 px-3 py-2 font-montserrat"
              required
              disabled={formStatus.type === "loading"}
            />

            <div className="flex justify-center">
              <div ref={turnstileRef} />
            </div>

            <button
              type="submit"
              disabled={formStatus.type === "loading" || !turnstileToken}
              className="w-full rounded bg-black px-6 py-3 font-montserrat font-bold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {formStatus.type === "loading" ? "Odosielam..." : "Odoslať"}
            </button>
          </form>

          <p className="mt-4 font-montserrat text-xs text-gray-500">
            Odoslaním súhlasíte so spracovaním údajov v{" "}
            <Link href="/ochrana-osobnych-udajov" className="text-blue-600 underline">
              ochrane osobných údajov
            </Link>.
          </p>
        </div>
      </div>
    </>
  );
}
