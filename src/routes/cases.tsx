import { useTranslation } from "@/components/LanguageProvider";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import pluratalks from "@/assets/case-pluratalks.jpg";
import tower from "@/assets/case-control-tower.jpg";
import gov from "@/assets/case-governance.jpg";
import llm from "@/assets/case-llm.jpg";
import { PageHeader, SiteShell } from "@/components/SiteShell";
import { Reveal } from "@/components/Motion";
import { CardSlides } from "@/components/CardSlides";

export const Route = createFileRoute("/cases")({
  head: () => ({
    meta: [
      { title: "Cases de sucesso — Matheus Roberto de Oliveira" },
      { name: "description", content: "Resultados reais em IA, automação, governança e venture building." },
      { property: "og:title", content: "Cases de sucesso — Matheus Roberto de Oliveira" },
      { property: "og:description", content: "+30% em vendas, atendimento de 48h para 15 min e mais." },
    ],
  }),
  component: Cases,
});

const cases = [
  { img: tower, tag: "GLX Partners", title: "IA e automação que aceleram vendas", problem: "Atendimento lento e processos manuais travavam o crescimento.", solution: "IA generativa com RAG, integrações via API e marketplace interno na GLX Control Tower.", metrics: [["+30%", "vendas"], ["48h → 15min", "resposta"], ["R$15 mil", "economia/mês"]] },
  { img: pluratalks, tag: "PluraTalks", title: "Healthtech de IA do zero ao investidor", problem: "Validar uma startup de saúde com IA e atrair capital.", solution: "Estratégia de tecnologia, desenvolvimento de negócio e relacionamento com investidores. Selecionada para ALPHA no Web Summit Rio 2026 e premiada como startup de impacto através de um grupo da Insper JR, que apoiou o projeto desde o início.", metrics: [["Impacto", "prêmio · Insper JR"], ["US$10 mil", "créditos AWS"], ["ALPHA", "Web Summit Rio 2026"]] },
  { img: gov, tag: "Dolarizando-se", title: "Governança para expansão internacional", problem: "Decisões de investimento sem visão consolidada do portfólio.", solution: "Business cases, KPIs executivos e práticas de lessons learned.", metrics: [["US$10 mil", "créditos Azure"], ["KPIs", "executivos"], ["Global", "expansão"]] },
  { img: llm, tag: "Outlier AI", title: "Qualidade e segurança em LLMs", problem: "Modelos de linguagem com respostas inconsistentes.", solution: "Critérios de avaliação, RLHF e padrões de AI QA alinhados à ISO/IEC 42001.", metrics: [["RLHF", "aplicado"], ["AI Safety", "padrões"], ["EN", "internacional"]] },
];

function Cases() {
 const { t } = useTranslation();

  return (
    <SiteShell>
      <PageHeader eyebrow="Cases" title={<>{t("Cases de")}<span className="text-gradient">{t("sucesso")}</span></>} text="Problema, solução e resultado — em projetos reais." />
      <section className="mx-auto max-w-6xl px-5 pb-24"><CardSlides>
        {cases.map((c, i) => (
          <Reveal key={t(c.title)} className="space-y-5">
            <motion.div whileHover={{ scale: 1.02 }} className="overflow-hidden rounded-3xl border border-border">
              <img src={c.img} alt={t(c.title)} width={1280} height={800} loading="lazy" className="aspect-[16/10] w-full object-cover" />
            </motion.div>
            <div>
              <span className="chip">{t(c.tag)}</span>
              <h2 className="mt-4 font-display text-3xl font-semibold">{t(c.title)}</h2>
              <p className="mt-4 text-muted-foreground"><strong className="text-foreground">{t("Desafio:")}</strong> {t(c.problem)}</p>
              <p className="mt-2 text-muted-foreground"><strong className="text-foreground">{t("Solução:")}</strong> {t(c.solution)}</p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {c.metrics.map(([v, l]) => (
                  <div key={l} className="liquid-glass p-4">
                    <p className="font-display text-lg font-semibold text-gradient">{v}</p>
                    <p className="text-xs text-muted-foreground">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </CardSlides></section>
    </SiteShell>
  );
}
