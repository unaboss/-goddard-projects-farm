import { prisma } from "@/lib/prisma";
import { LivestockCard } from "@/components/livestock/LivestockCard";

export default async function LivestockGrid() {
  const items = await prisma.livestockItem.findMany({
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <LivestockCard key={item.id} livestock={item} />
      ))}
    </div>
  );
}
