import { prisma } from '@/lib/prisma';
import { ProduceManager } from '@/components/admin/ProduceManager';

export async function ProduceManagerWrapper() {
  const items = await prisma.produceItem.findMany({ orderBy: { displayOrder: 'asc' } });
  return <ProduceManager items={JSON.parse(JSON.stringify(items))} />;
}
