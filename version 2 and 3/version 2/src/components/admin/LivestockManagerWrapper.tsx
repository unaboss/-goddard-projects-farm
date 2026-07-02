import { prisma } from "@/lib/prisma";
import { LivestockManager } from "@/components/admin/LivestockManager";

export default async function LivestockManagerWrapper() {
  const items = await prisma.livestockItem.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return <LivestockManager items={items} />;
}
