import LivestockGrid from "@/components/livestock/LivestockGrid";

export const metadata = {
  title: "Our Livestock — Goddard Projects Farm",
  description: "Healthy animals, raised on open Limpopo land.",
};

export default function LivestockPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-heading text-4xl text-warm-cream mb-2">
        Our Livestock
      </h1>
      <p className="text-dusty-clay mb-8 max-w-2xl">
        Healthy animals, raised on open Limpopo land.
      </p>
      <LivestockGrid />
    </div>
  );
}
