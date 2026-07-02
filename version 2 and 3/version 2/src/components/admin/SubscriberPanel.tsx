import { prisma } from "@/lib/prisma";

export async function SubscriberPanel() {
  const [activeCount, unsubscribedCount] = await Promise.all([
    prisma.subscriber.count({ where: { status: "Active" } }),
    prisma.subscriber.count({ where: { status: "Unsubscribed" } }),
  ]);

  return (
    <div className="bg-rich-soil rounded-lg p-6">
      <h2 className="font-heading text-xl text-harvest-gold mb-4">
        Newsletter Subscribers
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-subtle-earth rounded-lg p-4 text-center">
          <p className="text-3xl font-heading text-forest-canopy">
            {activeCount}
          </p>
          <p className="text-xs text-dusty-clay mt-1">Active</p>
        </div>

        <div className="bg-subtle-earth rounded-lg p-4 text-center">
          <p className="text-3xl font-heading text-dusty-clay">
            {unsubscribedCount}
          </p>
          <p className="text-xs text-dusty-clay mt-1">Unsubscribed</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-dusty-clay">
        {activeCount + unsubscribedCount} total subscriber
        {activeCount + unsubscribedCount !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
