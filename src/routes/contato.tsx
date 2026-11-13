import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { PageHeader, SiteShell } from "@/components/SiteShell";
import { profile } from "@/data/profile";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Matheus Roberto de Oliveira" },
      { name: "description", content: "Vamos conversar sobre IA, programas de tecnologia e transformação digital." },
      { property: "og:title", content: "Contato — Matheus Roberto de Oliveira" },
      { property: "og:description", content: "E-mail, WhatsApp, LinkedIn, GitHub e Substack." },
    ],
  }),
  component: Contato,
});

function Contato() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Contato" title={<>Vamos <span className="text-gradient">conversar</span></>} text="Aberto a oportunidades no Brasil e no exterior, parcerias e projetos de IA." />
      <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-24 md:grid-cols-2">
        <a href={`mailto:${profile.email}`} className="glass-card flex items-center gap-4 p-8">
          <Mail className="size-8 text-accent" />
          <div><p className="font-display text-xl font-semibold">E-mail</p><p className="text-muted-foreground">{profile.email}</p></div>
        </a>
        <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="glass-card flex items-center gap-4 p-8">
          <MessageCircle className="size-8 text-accent" />
          <div><p className="font-display text-xl font-semibold">WhatsApp</p><p className="text-muted-foreground">{profile.phone}</p></div>
        </a>
        {profile.links.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="glass-card flex items-center justify-between p-6">
            <span className="font-display text-lg font-semibold">{l.label}</span>
            <ArrowUpRight className="size-5 text-accent" />
          </a>
        ))}
      </section>
    </SiteShell>
  );
}
