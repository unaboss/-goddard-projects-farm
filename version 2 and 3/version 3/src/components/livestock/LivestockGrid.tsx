import { prisma } from '@/lib/prisma';
import { LivestockCard } from '@/components/livestock/LivestockCard';

export async function LivestockGrid() {
  const items = await prisma.livestockItem.findMany({ orderBy: { displayOrder: 'asc' } });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item) => <LivestockCard key={item.id} livestock={item} />)}
    </div>
  );
}
