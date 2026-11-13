import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, animate, motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "./Motion";
import { ArrowRight, Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { brl, computeQuote, services } from "@/lib/quote";

const DEFAULT_IDS = ["discovery", "genai", "automation"];

function AnimatedBRL({ value }: { value: number }) {
  const reduced = useReducedMotion();
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => brl(Math.round(v)));
  useEffect(() => {
    if (reduced) { mv.set(value); return; }
    const controls = animate(mv, value, { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] });
    return () => controls.stop();
  }, [mv, value, reduced]);
  return <motion.span>{text}</motion.span>;
}

export function QuoteBuilder() {
  const reduced = useReducedMotion();
  const [ids, setIds] = useState<string[]>(DEFAULT_IDS);
  const q = computeQuote(ids);
  const toggle = (id: string) => setIds((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <section id="simule" className="mx-auto max-w-6xl px-5 py-20">
      <Reveal><p className="eyebrow">Simulador</p>
      <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
        Simule seu projeto <span className="text-gradient">comigo</span>
      </h2>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Marque os serviços que fazem sentido para o seu momento. O total é atualizado na hora, com desconto por pacote.
      </p></Reveal>

      <Stagger className="mt-10 grid gap-3 sm:grid-cols-2">
        {services.map((s) => {
          const on = ids.includes(s.id);
          return (
            <StaggerItem
              key={s.id}
              role="checkbox"
              aria-checked={on}
              tabIndex={0}
              onClick={() => toggle(s.id)}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  toggle(s.id);
                }
              }}
              whileTap={reduced ? {} : { scale: 0.98 }}
              className={`liquid-glass flex cursor-pointer items-start gap-3 p-5 ${on ? "is-active" : ""}`}
            >
              <Checkbox checked={on} tabIndex={-1} className="pointer-events-none mt-1" />
              <div className="flex-1">
                <p className="font-semibold">{s.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.detail}</p>
                <p className="mt-3 text-sm text-accent">{brl(s.price)}</p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>

      <Reveal className="liquid-glass mt-6 flex flex-wrap items-end justify-between gap-6 p-7">
        <div>
          <p className="eyebrow">Total estimado</p>
          <p className="mt-2 font-display text-5xl font-semibold text-gradient">
            <AnimatedBRL value={q.total} />
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {q.chosen.length} {q.chosen.length === 1 ? "serviço" : "serviços"} · cerca de {q.weeks} semanas
          </p>
        </div>
        <div className="min-w-52 space-y-1 text-sm">
          <p className="flex justify-between gap-6"><span className="text-muted-foreground">Subtotal</span><span>{brl(q.subtotal)}</span></p>
          <AnimatePresence mode="popLayout">
            {q.discount > 0 && (
              <motion.p
                key="discount"
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 1 } : { opacity: 0, y: -6 }}
                transition={{ duration: reduced ? 0 : 0.2 }}
                className="flex justify-between gap-6 text-accent"
              >
                <span>Desconto pacote ({q.rate * 100}%)</span>
                <span>−{brl(q.discount)}</span>
              </motion.p>
            )}
          </AnimatePresence>
          <p className="flex justify-between gap-6 border-t border-border pt-2 font-semibold"><span>Total</span><span>{brl(q.total)}</span></p>
        </div>
      </Reveal>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Link to="/simulador" className="btn-glow">Simulador completo <ArrowRight className="size-4" /></Link>
        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Check className="size-4 text-accent" /> Valores de exemplo, editáveis em src/lib/quote.ts
        </span>
      </div>
    </section>
  );
}
