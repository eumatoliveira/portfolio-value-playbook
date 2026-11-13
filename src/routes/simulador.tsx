import { useTranslation } from "@/components/LanguageProvider";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { PageHeader, SiteShell } from "@/components/SiteShell";
import { Checkbox } from "@/components/ui/checkbox";
import { brl, computeQuote, services, type Urgency } from "@/lib/quote";
import { profile } from "@/data/profile";

export const Route = createFileRoute("/simulador")({
  head: () => ({
    meta: [{ property: "og:type", content: "website" },{ name: "twitter:card", content: "summary_large_image" },
      { title: "Simulador de projeto — Matheus Roberto de Oliveira" },
      { name: "description", content: "Monte seu projeto de IA, automação ou governança e veja uma estimativa de investimento e prazo." },
      { property: "og:title", content: "Simule um projeto comigo" },
      { property: "og:description", content: "Escolha os serviços e receba uma estimativa na hora." },
    ],
  }),
  component: Simulador,
});

import { chartColors as colors } from "@/lib/chart-colors";
const groups = [...new Set(services.map((s) => s.group))];

function Simulador() {
 const { t } = useTranslation();

  const [ids, setIds] = useState<string[]>(["discovery", "genai"]);
  const [urgency, setUrgency] = useState<Urgency>("normal");
  const q = useMemo(() => computeQuote(ids, urgency), [ids, urgency]);
  const toggle = (id: string) => setIds((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const mail = `mailto:${profile.email}?subject=${encodeURIComponent("Proposta de projeto")}&body=${encodeURIComponent(`Olá Matheus! Tenho interesse em: ${q.chosen.map((s) => s.label).join(", ")}. Estimativa: ${brl(q.total)} em ~${q.weeks} semanas.`)}`;

  return (
    <SiteShell>
      <PageHeader eyebrow="Simulador" title={<>{t("Monte seu")}<span className="text-gradient">{t("projeto")}</span></>} text="Marque o que você precisa. O cálculo considera desconto por pacote, prazo com entregas em paralelo e urgência." />
      <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-24 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-8">
          {groups.map((g) => (
            <div key={g}>
              <h2 className="eyebrow mb-3">{g}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {services.filter((s) => s.group === g).map((s) => {
                  const on = ids.includes(s.id);
                  return (
                    <motion.div role="checkbox" aria-checked={on} tabIndex={0} onClick={() => toggle(s.id)} onKeyDown={(e) => (e.key === " " || e.key === "Enter") && (e.preventDefault(), toggle(s.id))} key={s.id} whileTap={{ scale: 0.98 }} className={`liquid-glass flex cursor-pointer gap-3 p-5 ${on ? "is-active" : ""}`}>
                      <Checkbox checked={on} tabIndex={-1} className="pointer-events-none mt-1" />
                      <div className="flex-1">
                        <p className="font-semibold">{t(s.label)}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{t(s.detail)}</p>
                        <p className="mt-3 text-sm text-accent">{brl(s.price)}{t("/hora ·")}{s.hours} {t("h estimadas")}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
          <div>
            <h2 className="eyebrow mb-3">{t("Prazo")}</h2>
            <div className="flex gap-3">
              {(["normal", "rapido"] as const).map((u) => (
                <button key={u} onClick={() => setUrgency(u)} className={`liquid-glass px-5 py-3 text-sm ${urgency === u ? "is-active" : ""}`}>
                  {u === "normal" ? "Normal" : "Urgente (+25%, 30% mais rápido)"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="liquid-glass h-fit p-7 lg:sticky lg:top-24">
          <p className="eyebrow">{t("Sua estimativa")}</p>
          <AnimatePresence mode="popLayout">
            <motion.p key={q.total} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-3 font-display text-4xl font-semibold text-gradient">
              {brl(q.total)}
            </motion.p>
          </AnimatePresence>
          <p className="text-muted-foreground">{q.hours} {t("horas estimadas · cerca de")}{q.weeks} {t("semanas")}</p>
          {q.chosen.length > 0 && (
            <div className="mt-4 h-40">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={q.chosen} dataKey="price" nameKey="label" innerRadius={45} outerRadius={70} paddingAngle={3} stroke="none">
                    {q.chosen.map((s, i) => <Cell key={s.id} fill={colors[i % colors.length] ?? colors[0]} />)}
                  </Pie>
                  <Tooltip formatter={(v) => brl(Number(v))} contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} itemStyle={{ color: "var(--foreground)" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
          <ul className="mt-4 space-y-2 text-sm">
            {q.chosen.map((s) => <li key={s.id} className="flex justify-between gap-3"><span className="flex gap-2"><Check className="size-4 text-accent" />{t(s.label)}</span><span>{brl(s.price)}</span></li>)}
          </ul>
          <div className="mt-5 space-y-1 border-t border-border pt-4 text-sm">
            <p className="flex justify-between"><span>{t("Subtotal")}</span><span>{brl(q.subtotal)}</span></p>
            {q.discount > 0 && <p className="flex justify-between text-accent"><span>{t("Desconto pacote (")}{q.rate * 100}{t("%)")}</span><span>{t("−")}{brl(q.discount)}</span></p>}
            {urgency === "rapido" && <p className="flex justify-between"><span>{t("Urgência")}</span><span>{t("+25%")}</span></p>}
          </div>
          <a href={mail} className={`btn-glow mt-6 w-full justify-center ${q.chosen.length ? "" : "pointer-events-none opacity-50"}`}><Send className="size-4" /> {t("Enviar proposta")}</a>
          <p className="mt-3 text-xs text-muted-foreground">{t("Cobrança por hora, sem mensalidade fixa. Valores de exemplo; horas e escopo definidos antes do início.")}</p>
        </aside>
      </section>
    </SiteShell>
  );
}
