'use client';

import { useState } from 'react';
import MessagesPanel from '@/components/admin/MessagesPanelWrapper';
import { VotingManagerWrapper } from '@/components/admin/VotingManagerWrapper';
import { ProduceManagerWrapper } from '@/components/admin/ProduceManagerWrapper';
import { LivestockManagerWrapper } from '@/components/admin/LivestockManagerWrapper';
import { GalleryManagerWrapper } from '@/components/admin/GalleryManagerWrapper';
import { SubscriberExportWrapper } from '@/components/admin/SubscriberExportWrapper';

type Tab = 'messages' | 'voting' | 'produce' | 'livestock' | 'gallery' | 'subscribers';

const TABS: { key: Tab; label: string }[] = [
  { key: 'messages', label: 'Messages' },
  { key: 'voting', label: 'Voting' },
  { key: 'produce', label: 'Produce' },
  { key: 'livestock', label: 'Livestock' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'subscribers', label: 'Subscribers' },
];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('messages');

  return (
    <div>
      <nav className="flex gap-1 border-b border-subtle-earth mb-6 overflow-x-auto" role="tablist">
        {TABS.map((tab) => (
          <button key={tab.key} role="tab" aria-selected={activeTab === tab.key} onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.key ? 'border-harvest-gold text-harvest-gold' : 'border-transparent text-dusty-clay hover:text-warm-cream'
            }`}>
            {tab.label}
          </button>
        ))}
      </nav>
      <div role="tabpanel">
        {activeTab === 'messages' && <MessagesPanel />}
        {activeTab === 'voting' && <VotingManagerWrapper />}
        {activeTab === 'produce' && <ProduceManagerWrapper />}
        {activeTab === 'livestock' && <LivestockManagerWrapper />}
        {activeTab === 'gallery' && <GalleryManagerWrapper />}
        {activeTab === 'subscribers' && <SubscriberExportWrapper />}
      </div>
    </div>
  );
}
