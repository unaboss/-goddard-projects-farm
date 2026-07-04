'use client';

import { useState } from 'react';
import { exportSubscribers } from '@/app/actions/admin/subscribers';

interface Props { activeCount: number; unsubscribedCount: number; }

export function SubscriberExport({ activeCount, unsubscribedCount }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleExport() {
    setIsLoading(true);
    try {
      const result = await exportSubscribers();
      if (result.success && result.csv) {
        const blob = new Blob([result.csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } finally { setIsLoading(false); }
  }

  return (
    <div className="bg-rich-soil rounded-lg p-6">
      <h2 className="font-heading text-xl text-harvest-gold mb-4">Newsletter Subscribers</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-subtle-earth rounded-lg p-4 text-center"><p className="text-3xl font-heading text-forest-canopy">{activeCount}</p><p className="text-xs text-dusty-clay mt-1">Active</p></div>
        <div className="bg-subtle-earth rounded-lg p-4 text-center"><p className="text-3xl font-heading text-dusty-clay">{unsubscribedCount}</p><p className="text-xs text-dusty-clay mt-1">Unsubscribed</p></div>
      </div>
      <button onClick={handleExport} disabled={isLoading || activeCount === 0}
        className="w-full py-3 bg-harvest-gold text-deep-earth font-semibold rounded-lg hover:bg-harvest-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        {isLoading ? 'Exporting...' : `Export ${activeCount} Active Subscribers as CSV`}
      </button>
    </div>
  );
}
