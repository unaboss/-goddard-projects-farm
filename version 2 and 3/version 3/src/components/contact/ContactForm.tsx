'use client';

import { useState } from 'react';
import { submitContact } from '@/app/actions/contact';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get('name') as string).trim();
    const email = (formData.get('email') as string).trim();
    const message = (formData.get('message') as string).trim();

    if (!name) { setStatus('error'); setErrorMessage('Name is required.'); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setStatus('error'); setErrorMessage('Valid email required.'); return; }
    if (!message) { setStatus('error'); setErrorMessage('Message is required.'); return; }

    setStatus('submitting');
    const result = await submitContact(formData);

    if (result.success) {
      setStatus('success');
      form.reset();
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'Something went wrong.');
    }
  }

  return (
    <div>
      {status === 'success' && (
        <div className="bg-forest-canopy/10 border border-forest-canopy/30 rounded-lg px-4 py-3 text-forest-canopy text-sm mb-4">
          Message sent! We will get back to you soon.
        </div>
      )}
      {status === 'error' && (
        <div className="bg-red-400/10 border border-red-400/30 rounded-lg px-4 py-3 text-red-400 text-sm mb-4">{errorMessage}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm text-warm-cream/80 mb-1">Name</label>
          <input id="name" name="name" required placeholder="Your name" className="w-full bg-rich-soil border border-subtle-earth rounded-lg px-4 py-3 text-warm-cream placeholder-dusty-clay focus:outline-none focus:border-harvest-gold focus:ring-1 focus:ring-harvest-gold transition-colors" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-warm-cream/80 mb-1">Email</label>
          <input id="email" name="email" type="email" required placeholder="you@example.com" className="w-full bg-rich-soil border border-subtle-earth rounded-lg px-4 py-3 text-warm-cream placeholder-dusty-clay focus:outline-none focus:border-harvest-gold focus:ring-1 focus:ring-harvest-gold transition-colors" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm text-warm-cream/80 mb-1">Phone (optional)</label>
          <input id="phone" name="phone" type="tel" placeholder="+27..." className="w-full bg-rich-soil border border-subtle-earth rounded-lg px-4 py-3 text-warm-cream placeholder-dusty-clay focus:outline-none focus:border-harvest-gold focus:ring-1 focus:ring-harvest-gold transition-colors" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm text-warm-cream/80 mb-1">Message</label>
          <textarea id="message" name="message" required rows={4} placeholder="Your message..." className="w-full bg-rich-soil border border-subtle-earth rounded-lg px-4 py-3 text-warm-cream placeholder-dusty-clay focus:outline-none focus:border-harvest-gold focus:ring-1 focus:ring-harvest-gold transition-colors resize-none" />
        </div>
        <button type="submit" disabled={status === 'submitting'} className="w-full py-3 bg-harvest-gold text-deep-earth font-semibold rounded-lg hover:bg-harvest-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
