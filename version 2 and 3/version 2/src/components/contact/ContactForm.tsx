"use client";

import { useState, useRef } from "react";
import { submitContact } from "@/app/actions/contact";

export function ContactForm() {
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError(undefined);
    setSuccess(false);
    const formData = new FormData(e.currentTarget);
    const result = await submitContact(null, formData);
    setIsPending(false);
    if (result.success) {
      setSuccess(true);
      formRef.current?.reset();
    } else {
      setError(result.error);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      {success && (
        <div className="bg-forest-canopy/10 border border-forest-canopy rounded-lg px-4 py-3 text-forest-canopy text-sm">
          Message sent! We&apos;ll get back to you soon.
        </div>
      )}
      {error && (
        <div className="bg-red-400/10 border border-red-400/30 rounded-lg px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm text-warm-cream/80 mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Your name"
          className="w-full bg-rich-soil border border-subtle-earth rounded-lg px-4 py-3 text-warm-cream placeholder-dusty-clay focus:outline-none focus:border-harvest-gold focus:ring-1 focus:ring-harvest-gold transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-warm-cream/80 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="you@example.com"
          className="w-full bg-rich-soil border border-subtle-earth rounded-lg px-4 py-3 text-warm-cream placeholder-dusty-clay focus:outline-none focus:border-harvest-gold focus:ring-1 focus:ring-harvest-gold transition-colors"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm text-warm-cream/80 mb-1">
          Phone <span className="text-dusty-clay">(optional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="+27 12 345 6789"
          className="w-full bg-rich-soil border border-subtle-earth rounded-lg px-4 py-3 text-warm-cream placeholder-dusty-clay focus:outline-none focus:border-harvest-gold focus:ring-1 focus:ring-harvest-gold transition-colors"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-warm-cream/80 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Your message..."
          className="w-full bg-rich-soil border border-subtle-earth rounded-lg px-4 py-3 text-warm-cream placeholder-dusty-clay focus:outline-none focus:border-harvest-gold focus:ring-1 focus:ring-harvest-gold transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 bg-harvest-gold text-deep-earth font-semibold rounded-lg hover:bg-harvest-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
