import { prisma } from "@/lib/prisma";

export async function MessagesPanel() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-rich-soil rounded-lg p-6">
      <h2 className="font-heading text-xl text-harvest-gold mb-4">
        Contact Messages
      </h2>

      {messages.length === 0 ? (
        <p className="text-dusty-clay text-sm">No messages yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-subtle-earth text-dusty-clay text-xs uppercase tracking-wider">
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 pr-4">Name</th>
                <th className="pb-3 pr-4">Email</th>
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3">Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className="border-b border-subtle-earth/50">
                  <td className="py-3 pr-4">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        msg.isRead ? "bg-forest-canopy" : "bg-dusty-clay"
                      }`}
                      title={msg.isRead ? "Read" : "Unread"}
                    />
                  </td>
                  <td className="py-3 pr-4 text-warm-cream whitespace-nowrap">
                    {msg.name}
                  </td>
                  <td className="py-3 pr-4 text-dusty-clay whitespace-nowrap">
                    {msg.email}
                  </td>
                  <td className="py-3 pr-4 text-dusty-clay whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString("en-ZA")}
                  </td>
                  <td className="py-3 text-dusty-clay max-w-xs truncate">
                    {msg.message.slice(0, 120)}
                    {msg.message.length > 120 ? "\u2026" : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 text-xs text-dusty-clay">
        {messages.length} message{messages.length !== 1 ? "s" : ""} total
      </p>
    </div>
  );
}
