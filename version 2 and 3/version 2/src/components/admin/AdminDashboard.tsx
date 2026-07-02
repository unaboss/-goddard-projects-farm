"use client";

import { useState, ReactNode } from "react";

type Tab = "messages" | "voting" | "produce" | "livestock" | "gallery" | "subscribers";

const TABS: { key: Tab; label: string }[] = [
  { key: "messages", label: "Messages" },
  { key: "voting", label: "Voting" },
  { key: "produce", label: "Produce" },
  { key: "livestock", label: "Livestock" },
  { key: "gallery", label: "Gallery" },
  { key: "subscribers", label: "Subscribers" },
];

interface Props {
  panels: Record<Tab, ReactNode>;
}

export function AdminDashboard({ panels }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("messages");

  return (
    <div>
      <nav
        className="flex gap-1 border-b border-subtle-earth mb-6 overflow-x-auto"
        role="tablist"
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.key
                ? "border-harvest-gold text-harvest-gold"
                : "border-transparent text-dusty-clay hover:text-warm-cream"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div role="tabpanel">{panels[activeTab]}</div>
    </div>
  );
}
