import { prisma } from '@/lib/prisma';
import { SubscriberExport } from '@/components/admin/SubscriberExport';

export async function SubscriberExportWrapper() {
  const [activeCount, unsubscribedCount] = await Promise.all([
    prisma.subscriber.count({ where: { status: 'Active' } }),
    prisma.subscriber.count({ where: { status: 'Unsubscribed' } }),
  ]);
  return <SubscriberExport activeCount={activeCount} unsubscribedCount={unsubscribedCount} />;
}
