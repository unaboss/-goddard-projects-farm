import PublicLayout from '@/components/layout/PublicLayout';
import { LivestockGrid } from '@/components/livestock/LivestockGrid';

export default function LivestockPage() {
  return (
    <PublicLayout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="font-heading text-3xl text-harvest-gold mb-2 after:block after:w-16 after:h-0.5 after:bg-harvest-gold after:mt-2">Livestock</h2>
        <p className="text-dusty-clay mb-8">Quality animals raised with care — browse what is available now.</p>
        <LivestockGrid />
      </div>
    </PublicLayout>
  );
}
