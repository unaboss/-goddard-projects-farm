'use client';

import { useState } from 'react';
import { subscribeEmail } from '@/app/actions/newsletter';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'already-subscribed' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setStatus('error'); setErrorMessage('Valid email required.'); return; }

    setStatus('submitting');
    const result = await subscribeEmail(email.trim());

    if (result.success) { setStatus('success'); setEmail(''); }
    else if (result.isDuplicate) { setStatus('already-subscribed'); }
    else { setStatus('error'); setErrorMessage(result.error || 'Something went wrong.'); }
  }

  return (
    <div>
      {status === 'success' && <div className="bg-forest-canopy/10 border border-forest-canopy/30 rounded-lg px-4 py-3 text-forest-canopy text-sm mb-4">Subscribed! Check your inbox for updates.</div>}
      {status === 'already-subscribed' && <div className="bg-harvest-gold/10 border border-harvest-gold/30 rounded-lg px-4 py-3 text-harvest-gold text-sm mb-4">You are already subscribed.</div>}
      {status === 'error' && <div className="bg-red-400/10 border border-red-400/30 rounded-lg px-4 py-3 text-red-400 text-sm mb-4">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required
          className="flex-1 bg-rich-soil border border-subtle-earth rounded-lg px-4 py-3 text-warm-cream placeholder-dusty-clay focus:outline-none focus:border-harvest-gold focus:ring-1 focus:ring-harvest-gold transition-colors" />
        <button type="submit" disabled={status === 'submitting'} className="px-6 py-3 bg-harvest-gold text-deep-earth font-semibold rounded-lg hover:bg-harvest-gold/90 transition-colors disabled:opacity-50 whitespace-nowrap">
          {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
}
