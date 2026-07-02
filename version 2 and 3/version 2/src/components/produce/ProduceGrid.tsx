import { prisma } from "@/lib/prisma";
import { ProduceCard } from "@/components/produce/ProduceCard";

export default async function ProduceGrid() {
  const items = await prisma.produceItem.findMany({
    orderBy: { displayOrder: "asc" },
  });

  if (items.length === 0) {
    return (
      <p className="text-dusty-clay text-center py-12">
        Nothing here yet &mdash; check back soon!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ProduceCard key={item.id} produce={item} />
      ))}
    </div>
  );
}
