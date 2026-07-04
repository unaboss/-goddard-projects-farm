import PublicLayout from '@/components/layout/PublicLayout';
import { ProduceGrid } from '@/components/produce/ProduceGrid';

export default function ProducePage() {
  return (
    <PublicLayout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="font-heading text-3xl text-harvest-gold mb-2 after:block after:w-16 after:h-0.5 after:bg-harvest-gold after:mt-2">Our Produce</h2>
        <p className="text-dusty-clay mb-8">Fresh from the soil of Limpopo — browse our seasonal selection.</p>
        <ProduceGrid />
      </div>
    </PublicLayout>
  );
}
