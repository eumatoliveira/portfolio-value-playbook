import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail } from "lucide-react";
import hero from "@/assets/hero-waves.jpg";
import portrait from "@/assets/matheus-portrait.jpeg.asset.json";
import { SiteShell } from "@/components/SiteShell";
import { Tools } from "@/components/Tools";
import { ImpactCharts } from "@/components/ImpactChart";
import { audience, impact, profile } from "@/data/profile";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Matheus Roberto de Oliveira — AI & Technical Program Manager" },
      { name: "description", content: "Transformo iniciativas complexas de tecnologia e IA em resultados de negócio mensuráveis." },
      { property: "og:title", content: "Matheus Roberto de Oliveira — AI & Technical Program Manager" },
      { property: "og:description", content: "IA, Program Management e Governança para resultados de negócio." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      <section className="relative isolate overflow-hidden">
        <img src={hero} alt="" width={1920} height={1088} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 -z-10 bg-hero-fade" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-[1.4fr_1fr] md:py-32">
          <div className="fade-up">
            <p className="eyebrow">AI • Program Management • Governance</p>
            <h1 className="mt-5 font-display text-5xl font-light leading-[1.05] tracking-tight md:text-7xl">
              Turning <strong className="font-semibold">Technology Complexity</strong> Into{" "}
              <strong className="text-gradient font-semibold">Business Outcomes</strong>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Sou {profile.name}, Technical Program Manager e AI Solutions Architect. Conecto engenharia, produto, dados e liderança executiva para entregar resultados mensuráveis.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/simulador" className="btn-glow">Simular projeto <ArrowRight className="size-4" /></Link>
              <a href={`mailto:${profile.email}`} className="btn-ghost"><Mail className="size-4" /> Fale comigo</a>
            </div>
          </div>
          <div className="relative mx-auto w-64 md:w-full md:max-w-sm fade-up">
            <div className="portrait-ring">
              <img src={portrait.url} alt={profile.name} className="aspect-square w-full rounded-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="eyebrow">Impacto</p>
        <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Resultados que movem o negócio</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {impact.map((s) => (
            <div key={s.label} className="glass-card">
              <p className="font-display text-3xl font-semibold text-gradient">{s.value}</p>
              <p className="mt-3 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <ImpactCharts />
      <Tools />
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="glass-card grid gap-10 p-10 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow">Comunidade</p>
            <h2 className="mt-3 font-display text-3xl font-semibold">Conteúdo sobre IA em PT, EN e ES</h2>
            <a href={profile.links[0]!.href} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-accent">Seguir no LinkedIn <ArrowRight className="size-4" /></a>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {audience.map((s) => (
              <div key={s.label}>
                <p className="font-display text-4xl font-semibold">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
