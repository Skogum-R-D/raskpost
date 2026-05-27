import Link from "next/link";
import { Button } from "@/components/ui/Button";

const steps = [
  { icon: "📦", title: "Legg ut pakken", desc: "Fyll inn hente- og leveringsadresse, pakkestørrelse og pris du tilbyr." },
  { icon: "🚗", title: "En sjåfør tar oppdraget", desc: "Tilgjengelige sjåfører i nærheten ser oppdraget og reserverer det." },
  { icon: "⚡", title: "Levert på timer", desc: "Sjåføren henter og leverer — du sporer i sanntid." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 py-24 text-center">
          <span className="inline-block rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-600 mb-6">
            Raskere enn posten — alltid
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Få pakken levert{" "}
            <span className="text-orange-500">i dag</span>
          </h1>
          <p className="mt-5 text-lg text-slate-500 max-w-xl mx-auto">
            Post et leveringsoppdrag og la en sjåfør i nærheten ta det. Ingen venting på Posten — levering på timer, ikke dager.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/jobs/new">
              <Button size="lg">Legg ut pakke nå</Button>
            </Link>
            <Link href="/jobs">
              <Button size="lg" variant="ghost">Se ledige oppdrag</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-4xl px-4 py-20">
        <h2 className="text-center text-2xl font-bold text-slate-900 mb-12">Slik fungerer det</h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-3">Er du sjåfør?</h2>
          <p className="text-slate-400 mb-6">Tjen penger på kjøreturer du allerede gjør. Se ledige oppdrag i nærheten og velg selv.</p>
          <Link href="/jobs">
            <Button variant="secondary" size="lg">Se ledige oppdrag</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
