import { prisma } from '@/lib/prisma';
import { MessagesPanelV2 } from '@/components/admin/MessagesPanelV2';

export default async function MessagesPanelWrapper() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  return <MessagesPanelV2 messages={JSON.parse(JSON.stringify(messages))} />;
}
