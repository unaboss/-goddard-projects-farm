"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { authenticateAdmin } from "@/app/actions/auth";

export function LoginForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError(undefined);
    const formData = new FormData(e.currentTarget);
    const result = await authenticateAdmin(null, formData);
    setIsPending(false);
    if (result.success) {
      router.push("/admin");
    } else {
      setError(result.error);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="block text-sm text-warm-cream/80 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          defaultValue="admin@goddardprojects.co.za"
          className="w-full px-4 py-3 bg-subtle-earth border border-dusty-clay/20 rounded-lg text-warm-cream placeholder:text-dusty-clay focus:outline-none focus:border-harvest-gold transition-colors"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm text-warm-cream/80 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          defaultValue="farm2026"
          placeholder="Password"
          className="w-full px-4 py-3 bg-subtle-earth border border-dusty-clay/20 rounded-lg text-warm-cream placeholder:text-dusty-clay focus:outline-none focus:border-harvest-gold transition-colors"
        />
      </div>

      {error && (
        <div className="bg-red-400/10 border border-red-400/30 rounded-lg px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 bg-harvest-gold text-deep-earth font-semibold rounded-lg hover:bg-harvest-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
