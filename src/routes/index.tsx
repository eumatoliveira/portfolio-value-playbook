import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail } from "lucide-react";
import hero from "@/assets/hero-waves-blue.jpg";
import portrait from "@/assets/matheus-portrait.jpeg.asset.json";
import { SiteShell } from "@/components/SiteShell";
import { Tools } from "@/components/Tools";
import { ImpactCharts } from "@/components/ImpactChart";
import { QuoteBuilder } from "@/components/QuoteBuilder";
import { audience, profile } from "@/data/profile";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { FinancialResults } from "@/components/FinancialResults";
import { SocialProof } from "@/components/SocialProof";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Matheus Roberto de Oliveira — AI & Technical Program Manager" },
      { name: "description", content: "Transformo iniciativas complexas de tecnologia e IA em resultados de negócio mensuráveis." },
      { property: "og:title", content: "Matheus Roberto de Oliveira — AI & Technical Program Manager" },
      { property: "og:description", content: "IA, Program Management e Governança para resultados de negócio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      <section className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <Reveal>
            <p className="eyebrow">Mansilla Consultoria em TI</p>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.1] md:text-6xl">
              Turning <strong className="font-semibold">Technology Complexity</strong> Into{" "}
              <strong className="text-gradient font-semibold">Business Outcomes</strong>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Consultoria em tecnologia, IA e desenvolvimento. Da ideia à entrega, com estratégia, clareza e resultados mensuráveis.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/simulador" className="btn-glow">Simular projeto <ArrowRight className="size-4" /></Link>
              <a href={`mailto:${profile.email}`} className="btn-ghost"><Mail className="size-4" /> Fale comigo</a>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="mt-10"><img src={hero} alt="Tecnologia e conexões globais" width={1920} height={1088} className="h-48 w-full rounded-lg object-cover object-center md:h-56"/></Reveal>
        </div>
      </section>

      <FinancialResults />

      <QuoteBuilder />
      <ImpactCharts />
      <Tools />
      <SocialProof />
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <Reveal className="grid gap-10 border-t border-border py-10 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow">Comunidade</p>
            <h2 className="mt-3 font-display text-3xl font-semibold">Conteúdo sobre IA em PT, EN e ES</h2>
            <a href={profile.links[0]?.href} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-accent">Seguir no LinkedIn <ArrowRight className="size-4" /></a>
          </div>
          <Stagger className="grid grid-cols-2 gap-6">
            {audience.map((s) => (
              <StaggerItem key={s.label}>
                <p className="font-display text-4xl font-semibold">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-24"><Reveal className="grid items-center gap-10 border-t border-border pt-16 md:grid-cols-[240px_1fr]"><img src={portrait.url} alt={profile.name} width={400} height={400} loading="lazy" className="mx-auto aspect-square w-60 rounded-full object-cover"/><div><p className="eyebrow">Quem está por trás</p><h2 className="mt-3 font-display text-3xl font-semibold">{profile.name}</h2><p className="mt-5 max-w-2xl text-muted-foreground">Technical Program Manager e AI Solutions Architect. Conecto engenharia, produto, dados e liderança executiva para entregar resultados mensuráveis. Minha trajetória reúne IA generativa, desenvolvimento de software, governança e a construção da PluraTalks.</p><Link to="/sobre" className="mt-5 inline-flex items-center gap-2 text-accent">Conheça minha trajetória <ArrowRight className="size-4"/></Link></div></Reveal></section>
    </SiteShell>
  );
}
