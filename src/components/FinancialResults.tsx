import { useTranslation } from "@/components/LanguageProvider";
import { useState } from "react";
import { Button } from "./ui/button";
import { Reveal, Stagger, StaggerItem } from "./Motion";
import { money, type Currency } from "@/lib/currency";
import { CardSlides } from "./CardSlides";

export function FinancialResults() {
 const { t } = useTranslation();

  const [currency, setCurrency] = useState<Currency>("BRL");
  return <section className="mx-auto max-w-6xl px-5 py-20">
    <Reveal><p className="eyebrow">{t("Impacto")}</p><div className="mt-3 flex flex-wrap items-center justify-between gap-5"><h2 className="font-display text-3xl font-semibold md:text-4xl">{t("Resultados que movem o negócio")}</h2><div className="flex gap-1" role="group" aria-label="Moeda dos resultados">{(["BRL","USD","GBP"] as const).map(c => <Button key={c} variant={c === currency ? "default" : "ghost"} aria-pressed={c === currency} onClick={() => setCurrency(c)}>{c === "BRL" ? "R$" : c === "USD" ? "US$" : "£"}</Button>)}</div></div></Reveal>
    <CardSlides>{[
      ["+30%", "crescimento em vendas com iniciativas de IA e automação"],
      ["48h → 15min", "redução no tempo de resposta de atendimento"],
      [money(15000,"BRL",currency), "de economia operacional mensal"],
      [money(20000,"USD",currency), "em créditos cloud (AWS + Azure) conquistados"],
    ].map(([value,label]) => <Reveal key={label} className="glass-card h-44"><p className="font-display text-3xl font-semibold text-gradient">{value}</p><p className="mt-3 text-sm text-muted-foreground">{label}</p></Reveal>)}</CardSlides>
    <p className="mt-4 text-xs text-muted-foreground">{t("Conversões aproximadas · cotação de referência de 13/11/2026 · ExchangeRate-API")}</p>
  </section>;
}