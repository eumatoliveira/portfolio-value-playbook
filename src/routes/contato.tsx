import { useTranslation } from "@/components/LanguageProvider";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { PageHeader, SiteShell } from "@/components/SiteShell";
import { profile } from "@/data/profile";
import { company } from "@/data/company";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [{ property: "og:type", content: "website" },{ name: "twitter:card", content: "summary_large_image" },
      { title: "Contato — Matheus Roberto de Oliveira" },
      { name: "description", content: "Vamos conversar sobre IA, programas de tecnologia e transformação digital." },
      { property: "og:title", content: "Contato — Matheus Roberto de Oliveira" },
      { property: "og:description", content: "E-mail, WhatsApp, LinkedIn, GitHub e Substack." },
    ],
  }),
  component: Contato,
});

function Contato() {
 const { t } = useTranslation();

  return (
    <SiteShell>
      <PageHeader eyebrow="Contato" title={<>{t("Vamos")}<span className="text-gradient">{t("conversar")}</span></>} text="Aberto a oportunidades no Brasil e no exterior, parcerias e projetos de IA." />
      <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-24 md:grid-cols-2">
        <a href={`mailto:${profile.email}`} className="glass-card flex items-center gap-4 p-8">
          <Mail className="size-8 text-accent" />
          <div><p className="font-display text-xl font-semibold">{t("E-mail")}</p><p className="text-muted-foreground">{profile.email}</p></div>
        </a>
        <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="glass-card flex items-center gap-4 p-8">
          <MessageCircle className="size-8 text-accent" />
          <div><p className="font-display text-xl font-semibold">{t("WhatsApp")}</p><p className="text-muted-foreground">{profile.phone}</p></div>
        </a>
        {profile.links.map((l) => (
          <a key={t(l.label)} href={l.href} target="_blank" rel="noreferrer" className="glass-card flex items-center justify-between p-6">
            <span className="font-display text-lg font-semibold">{t(l.label)}</span>
            <ArrowUpRight className="size-5 text-accent" />
          </a>
        ))}
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-24"><h2 className="font-display text-2xl font-semibold">{t("Dados empresariais")}</h2><dl className="mt-6 grid gap-x-10 gap-y-5 text-sm sm:grid-cols-2">{[["Razão Social",company.legalName],["Nome Fantasia",company.tradeName],["CNPJ",company.cnpj],["Data de Abertura",company.opened],["Situação Cadastral",company.status],["Atividade Principal (CNAE)",company.cnae],["Localização",company.location],["Telefone cadastral",company.phone],["E-mail",company.email]].map(([label,value])=><div key={label}><dt className="text-muted-foreground">{label}</dt><dd className="mt-1 break-words">{value}</dd></div>)}</dl></section>
    </SiteShell>
  );
}
