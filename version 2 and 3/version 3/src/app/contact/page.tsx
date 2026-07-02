import PublicLayout from '@/components/layout/PublicLayout';
import { ContactForm } from '@/components/contact/ContactForm';
import { VotingSection } from '@/components/contact/VotingSection';
import { NewsletterForm } from '@/components/contact/NewsletterForm';

export default function ContactPage() {
  return (
    <PublicLayout>
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-16">
        <section>
          <h2 className="font-heading text-3xl text-harvest-gold mb-2 after:block after:w-16 after:h-0.5 after:bg-harvest-gold after:mt-2">Get in Touch</h2>
          <p className="text-dusty-clay mb-6">We would love to hear from you. Send us a message and we will get back to you.</p>
          <ContactForm />
        </section>
        <section className="border-t border-subtle-earth pt-16">
          <h2 className="font-heading text-3xl text-harvest-gold mb-2 after:block after:w-16 after:h-0.5 after:bg-harvest-gold after:mt-2">Community Vote</h2>
          <p className="text-dusty-clay mb-6">Help us decide what to plant next! Select your favourites below.</p>
          <VotingSection />
        </section>
        <section className="border-t border-subtle-earth pt-16">
          <h2 className="font-heading text-3xl text-harvest-gold mb-2 after:block after:w-16 after:h-0.5 after:bg-harvest-gold after:mt-2">Newsletter</h2>
          <p className="text-dusty-clay mb-6">Stay in the loop. Get farm updates, seasonal produce alerts, and news straight to your inbox.</p>
          <NewsletterForm />
        </section>
      </div>
    </PublicLayout>
  );
}
