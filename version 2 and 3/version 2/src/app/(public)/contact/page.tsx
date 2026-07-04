import { ContactForm } from "@/components/contact/ContactForm";
import VotingSection from "@/components/contact/VotingSection";
import { NewsletterForm } from "@/components/contact/NewsletterForm";

export const metadata = {
  title: "Contact — Goddard Projects Farm",
  description: "Get in touch with Goddard Projects Farm in Manamane, Limpopo.",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-12">
      <section>
        <h2 className="font-heading text-3xl text-warm-cream mb-2">
          Get in Touch
        </h2>
        <p className="text-dusty-clay mb-6">
          We&apos;d love to hear from you. Send us a message and we&apos;ll get
          back to you.
        </p>
        <div className="bg-rich-soil rounded-lg p-6 border border-subtle-earth">
          <ContactForm />
        </div>
      </section>

      <section>
        <VotingSection />
      </section>

      <section>
        <h2 className="font-heading text-3xl text-warm-cream mb-2">
          Stay Connected
        </h2>
        <p className="text-dusty-clay mb-6">
          Stay in the loop. Get farm updates, seasonal produce alerts, and news
          straight to your inbox.
        </p>
        <div className="bg-rich-soil rounded-lg p-6 border border-subtle-earth">
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
