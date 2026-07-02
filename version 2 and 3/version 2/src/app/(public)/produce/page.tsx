import ProduceGrid from "@/components/produce/ProduceGrid";

export const metadata = {
  title: "Our Produce — Goddard Projects Farm",
  description: "Fresh from the soil, grown with care in the Limpopo sun.",
};

export default function ProducePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-heading text-4xl text-warm-cream mb-2">
        Our Produce
      </h1>
      <p className="text-dusty-clay mb-8 max-w-2xl">
        Fresh from the soil, grown with care in the Limpopo sun.
      </p>
      <ProduceGrid />
    </div>
  );
}
