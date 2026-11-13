import { useTranslation } from "@/components/LanguageProvider";
import { createFileRoute } from "@tanstack/react-router";
import portrait from "@/assets/matheus-portrait.jpeg.asset.json";
import { PageHeader, SiteShell } from "@/components/SiteShell";
import { certifications, languages, profile, skills } from "@/data/profile";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Matheus Roberto de Oliveira" },
      { name: "description", content: "Program Manager na interseção de IA, engenharia de software, transformação digital e estratégia." },
      { property: "og:title", content: "Sobre — Matheus Roberto de Oliveira" },
      { property: "og:description", content: "Liderança em tecnologia que alinha pessoas, estratégia, capital e execução." },
    ],
  }),
  component: Sobre,
});

function Sobre() {
 const { t } = useTranslation();

  return (
    <SiteShell>
      <PageHeader eyebrow="Sobre" title={<>{t("Tecnologia com")}<span className="text-gradient">{t("propósito de negócio")}</span></>} />
      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-24 md:grid-cols-[1fr_1.6fr]">
        <div className="portrait-ring h-fit">
          <img src={portrait.url} alt={profile.name} className="aspect-square w-full rounded-full object-cover" />
        </div>
        <div className="space-y-6 text-lg text-muted-foreground">
          <p>{t("Sou Technology Project & Program Manager atuando na interseção entre Inteligência Artificial, Engenharia de Software, Transformação Digital e Estratégia de Negócio.")}</p>
          <p>{t("Conecto Engenharia, Produto, Dados, Operações e executivos para transformar prioridades de negócio em roadmaps técnicos, execução estruturada e resultados mensuráveis.")}</p>
          <p className="border-l-2 border-accent pl-5 text-foreground">{t("Liderança em tecnologia não é só entregar projetos. É alinhar pessoas, estratégia, capital e execução para gerar valor sustentável.")}</p>
          <p>{t("Aberto a oportunidades internacionais em TPM, AI Program Management e Strategy & Operations — incluindo Estados Unidos, Europa e Reino Unido.")}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-24 md:grid-cols-3">
        <div className="glass-card md:col-span-3">
          <h2 className="font-display text-xl font-semibold">{t("Competências")}</h2>
          <div className="mt-5 flex flex-wrap gap-2">{skills.map((s) => <span key={s} className="chip">{s}</span>)}</div>
        </div>
        <div className="glass-card">
          <h2 className="font-display text-xl font-semibold">{t("Idiomas")}</h2>
          <ul className="mt-4 space-y-2">{languages.map((l) => <li key={l.name} className="flex justify-between"><span>{l.name}</span><span className="text-muted-foreground">{t(l.level)}</span></li>)}</ul>
        </div>
        <div className="glass-card md:col-span-2">
          <h2 className="font-display text-xl font-semibold">{t("Certificações & formação")}</h2>
          <ul className="mt-4 grid gap-2 text-muted-foreground sm:grid-cols-2">
            {certifications.map((c) => <li key={c}>{t("•")}{c}</li>)}
            <li>{t("• MBA Ciência de Dados e IA — Faculdade Exame")}</li>
            <li>{t("• Análise de Sistemas — Anhembi Morumbi")}</li>
            <li>{t("• Startup School — Y Combinator")}</li>
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
