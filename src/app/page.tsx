import { Planner } from "@/components/planner";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(80%_50%_at_50%_-10%,oklch(0.72_0.08_145/0.35),transparent_70%)]"
      />
      <main className="relative mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        <Planner />
      </main>
      <footer className="relative border-t px-4 py-6 text-center text-xs text-muted-foreground">
        Tourbière Lab · modèle optique simplifié pour comparer des rampes, pas un certificat
        de mesure · tarif bleu 0,2001 €/kWh (août 2026)
      </footer>
    </div>
  );
}
