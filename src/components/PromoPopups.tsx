"use client";

import { useCallback, useEffect, useState } from "react";

const promoMessages = [
  { text: "Autoúver s 0% akontáciou!", icon: "€", color: "from-green-500/90 to-green-700/90" },
  { text: "Výkup áut - platba ihneď!", icon: "AUTO", color: "from-red-500/90 to-red-700/90" },
  { text: "PZP už od 39€/rok!", icon: "PZP", color: "from-purple-500/90 to-purple-700/90" },
  { text: "Garancia najazdených KM!", icon: "KM", color: "from-blue-500/90 to-blue-700/90" },
  { text: "Dovoz áut na objednávku!", icon: "EU", color: "from-orange-500/90 to-orange-700/90" },
];

export default function PromoPopups() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const showNextPopup = useCallback(() => {
    setIsVisible(true);
    window.setTimeout(() => {
      setIsVisible(false);
      window.setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % promoMessages.length);
      }, 500);
    }, 5000);
  }, []);

  useEffect(() => {
    if (isDismissed) return;
    const initialTimer = window.setTimeout(showNextPopup, 3000);
    return () => window.clearTimeout(initialTimer);
  }, [isDismissed, showNextPopup]);

  useEffect(() => {
    if (isDismissed || currentIndex === 0) return;
    const timer = window.setTimeout(showNextPopup, 1500);
    return () => window.clearTimeout(timer);
  }, [currentIndex, isDismissed, showNextPopup]);

  if (isDismissed) return null;

  const current = promoMessages[currentIndex];

  return (
    <div className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ease-out ${isVisible ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}>
      <div className={`relative max-w-xs rounded-2xl border border-white/20 bg-gradient-to-r ${current.color} px-6 py-4 text-white shadow-2xl backdrop-blur-md`}>
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-xs font-bold text-gray-700 shadow-md hover:bg-white"
          aria-label="Zavrieť"
        >
          ×
        </button>
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/20 font-jost text-xs font-bold">
            {current.icon}
          </span>
          <span className="font-jost text-sm font-bold leading-tight">{current.text}</span>
        </div>
        <div className="mt-2 flex justify-center gap-1">
          {promoMessages.map((message, index) => (
            <div key={message.text} className={`h-1.5 w-1.5 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/30"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
