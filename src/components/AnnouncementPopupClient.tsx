"use client";

import { useState } from "react";
import type { AnnouncementPopupConfig } from "@/lib/announcements";

interface AnnouncementPopupClientProps {
  popup: AnnouncementPopupConfig | null;
}

export default function AnnouncementPopupClient({ popup }: AnnouncementPopupClientProps) {
  const [open, setOpen] = useState(true);

  if (!popup || !popup.enabled || !open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative mx-4 w-full max-w-md rounded-lg bg-white p-5 shadow-lg">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 text-2xl leading-none text-gray-400 hover:text-gray-700"
          aria-label="Zavrieť oznam"
        >
          ×
        </button>
        <h2 className="mb-2 font-jost text-xl font-semibold">{popup.title}</h2>
        <p className="whitespace-pre-line font-montserrat text-sm text-gray-700">{popup.description}</p>
      </div>
    </div>
  );
}
