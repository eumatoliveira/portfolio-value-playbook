import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteShell } from "@/components/SiteShell";
import { experience } from "@/data/profile";

export const Route = createFileRoute("/experiencia")({
  head: () => ({
    meta: [
      { title: "Experiência — Matheus Roberto de Oliveira" },
      { name: "description", content: "Trajetória em IA, program management, governança e transformação digital." },
      { property: "og:title", content: "Experiência — Matheus Roberto de Oliveira" },
      { property: "og:description", content: "De suporte de operações a Head of IT & AI." },
    ],
  }),
  component: Experiencia,
});

function Experiencia() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Experiência" title={<>Trajetória</>} text="Da operação à liderança de iniciativas de IA e transformação digital." />
      <section className="mx-auto max-w-4xl px-5 pb-24">
        <ol className="relative space-y-6 border-l border-border pl-8">
          {experience.map((e) => (
            <li key={e.company + e.role} className="relative">
              <span className="timeline-dot" />
              <div className="glass-card">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-display text-xl font-semibold">{e.company}</h2>
                  <span className="text-sm text-accent">{e.period}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-foreground/80">{e.role}</p>
                <p className="mt-3 text-muted-foreground">{e.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </SiteShell>
  );
}
