"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
};

const COOKIE_CONSENT_KEY = "mt-autos-cookie-consent";

function getStoredPreferences(): CookiePreferences | null {
  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return null;
}

function savePreferences(prefs: CookiePreferences) {
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({ necessary: true, analytics: false });

  useEffect(() => {
    const stored = getStoredPreferences();
    if (stored) {
      setPreferences(stored);
    } else {
      setShowBanner(true);
    }
  }, []);

  useEffect(() => {
    window.__openCookieSettings = () => setShowSettings(true);
    return () => {
      delete window.__openCookieSettings;
    };
  }, []);

  const save = (prefs: CookiePreferences) => {
    const nextPrefs = { ...prefs, necessary: true };
    setPreferences(nextPrefs);
    savePreferences(nextPrefs);
    setShowBanner(false);
    setShowSettings(false);
  };

  return (
    <>
      {showBanner ? (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
          <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 font-montserrat shadow-2xl md:p-8">
            <div className="mb-5 flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 font-jost text-lg font-bold">Táto stránka používa cookies</h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  Používame cookies na zabezpečenie základnej funkčnosti stránky a na analytické účely.
                  Viac informácií nájdete v našej{" "}
                  <Link href="/ochrana-osobnych-udajov" className="text-blue-500 underline">
                    ochrane osobných údajov
                  </Link>.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => { setShowBanner(false); setShowSettings(true); }} className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                Nastavenia
              </button>
              <button type="button" onClick={() => save({ necessary: true, analytics: false })} className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                Odmietnuť všetky
              </button>
              <button type="button" onClick={() => save({ necessary: true, analytics: true })} className="rounded-lg bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-purple-700">
                Prijať všetky
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showSettings ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white font-montserrat shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 p-6">
              <h2 className="font-jost text-xl font-bold">Nastavenia cookies</h2>
              <button type="button" onClick={() => setShowSettings(false)} className="text-2xl font-bold text-gray-500 hover:text-gray-700">
                ×
              </button>
            </div>
            <div className="space-y-6 p-6">
              <CookieRow title="Nevyhnutné cookies" description="Zabezpečujú základnú funkčnosť stránky. Tieto cookies nie je možné vypnúť." enabled locked />
              <CookieRow
                title="Štatistické cookies"
                description="Pomáhajú nám pochopiť, ako návštevníci stránku používajú, čo nám umožňuje zlepšovať naše služby."
                enabled={preferences.analytics}
                onToggle={() => setPreferences((prev) => ({ ...prev, analytics: !prev.analytics }))}
              />
            </div>
            <div className="flex flex-col gap-3 border-t border-gray-200 p-6 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setShowSettings(false)} className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                Zrušiť
              </button>
              <button type="button" onClick={() => save(preferences)} className="rounded-lg bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-purple-700">
                Uložiť nastavenia
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function CookieRow({
  title,
  description,
  enabled,
  locked = false,
  onToggle,
}: {
  title: string;
  description: string;
  enabled: boolean;
  locked?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h4 className="mb-1 font-jost font-bold">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <button
        type="button"
        onClick={onToggle}
        disabled={locked}
        className={`relative mt-1 h-6 w-12 flex-shrink-0 rounded-full transition-colors ${enabled ? "bg-purple-500" : "bg-gray-300"}`}
        aria-pressed={enabled}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${enabled ? "right-0.5" : "left-0.5"}`} />
      </button>
    </div>
  );
}
