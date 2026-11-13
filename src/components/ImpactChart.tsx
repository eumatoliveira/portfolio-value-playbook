import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Reveal } from "./Motion";
import { chartColors } from "@/lib/chart-colors";
import { useReducedMotion } from "framer-motion";

const response = [
  { name: "Antes", horas: 48 }, { name: "Mês 1", horas: 24 }, { name: "Mês 2", horas: 6 }, { name: "Hoje", horas: 0.25 },
];
const audience = [
  { m: "Ago", v: 6247 }, { m: "Set", v: 6650 }, { m: "Out", v: 7050 }, { m: "Nov", v: 7399 },
];
const tip = { contentStyle: { background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, color: "var(--foreground)" } };

export function ImpactCharts() {
  const reduced = useReducedMotion();
  return (
    <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-24 md:grid-cols-2">
      <Reveal className="liquid-glass p-6">
        <h3 className="font-display text-lg font-semibold">Tempo de resposta (horas)</h3>
        <p className="text-sm text-muted-foreground">Automação + IA no atendimento</p>
        <div className="mt-6 h-56">
          <ResponsiveContainer>
            <BarChart data={response}>
              <CartesianGrid stroke="#ffffff1a" vertical={false} />
              <XAxis dataKey="name" stroke="#8a95b8" fontSize={12} />
              <YAxis stroke="#8a95b8" fontSize={12} />
              <Tooltip {...tip} cursor={{ fill: "var(--secondary)" }} />
              <Bar dataKey="horas" fill={chartColors[0]} radius={[8, 8, 0, 0]} isAnimationActive={!reduced} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Reveal>
      <Reveal delay={0.1} className="liquid-glass p-6">
        <h3 className="font-display text-lg font-semibold">Seguidores no LinkedIn</h3>
        <p className="text-sm text-muted-foreground">+18% no trimestre</p>
        <div className="mt-6 h-56">
          <ResponsiveContainer>
            <AreaChart data={audience}>
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartColors[1]} stopOpacity={0.6} />
                  <stop offset="100%" stopColor={chartColors[1]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#ffffff1a" vertical={false} />
              <XAxis dataKey="m" stroke="#8a95b8" fontSize={12} />
              <YAxis stroke="#8a95b8" fontSize={12} domain={[6000, 7600]} />
              <Tooltip {...tip} />
              <Area dataKey="v" name="Seguidores" stroke={chartColors[1]} strokeWidth={2} fill="url(#g)" isAnimationActive={!reduced} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Reveal>
    </section>
  );
}
