import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteShell } from "@/components/SiteShell";
import { projects } from "@/data/profile";
import { CardSlides } from "@/components/CardSlides";

export const Route = createFileRoute("/projetos")({
  head: () => ({
    meta: [
      { title: "Projetos — Matheus Roberto de Oliveira" },
      { name: "description", content: "PluraTalks, GLX Control Tower, governança de portfólio e avaliação de LLMs." },
      { property: "og:title", content: "Projetos — Matheus Roberto de Oliveira" },
      { property: "og:description", content: "Iniciativas de IA, plataformas e venture building." },
    ],
  }),
  component: Projetos,
});

function Projetos() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Projetos" title={<>Iniciativas em <span className="text-gradient">destaque</span></>} text="Venture building, plataformas de IA e governança." />
      <section className="mx-auto max-w-6xl px-5 pb-24"><CardSlides>
        {projects.map((p) => (
          <article key={p.title} className="glass-card group p-8">
            <span className="chip">{p.tag}</span>
            <h2 className="mt-5 font-display text-2xl font-semibold">{p.title}</h2>
            <p className="mt-3 text-muted-foreground">{p.text}</p>
            <ul className="mt-6 flex flex-wrap gap-2 text-sm">
              {p.points.map((x) => <li key={x} className="text-accent">✦ {x}</li>)}
            </ul>
          </article>
        ))}
      </CardSlides></section>
    </SiteShell>
  );
}
