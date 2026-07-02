import { prisma } from "@/lib/prisma";
import { ProduceManager } from "@/components/admin/ProduceManager";

export default async function ProduceManagerWrapper() {
  const items = await prisma.produceItem.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return <ProduceManager items={items} />;
}
