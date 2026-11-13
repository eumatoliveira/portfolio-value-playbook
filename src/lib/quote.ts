// ============================================================
//  ARQUIVO ÚNICO DE VALORES DO SIMULADOR
//  Edite tudo aqui — a página inicial e a página /simulador
//  usam exatamente esta lista.
//
//  price = valor por hora em dólares (US$) | hours = horas estimadas
//  weeks = prazo estimado de entrega, sem cobrança mensal
//  id = chave interna (mude só se souber o que está fazendo)
//  group = agrupa os serviços na tela
// ============================================================

export type Service = { id: string; group: string; label: string; detail: string; price: number; hours: number; weeks: number };

export const services: Service[] = [
  { id: "discovery", group: "Estratégia", label: "Discovery & Business Case", detail: "Diagnóstico, ROI e roadmap executivo", price: 50, hours: 8, weeks: 1 },
  { id: "pmo", group: "Estratégia", label: "Estruturação de PMO / Governança", detail: "KPIs, riscos, ritos e reporte executivo", price: 50, hours: 16, weeks: 2 },
  { id: "genai", group: "Inteligência Artificial", label: "Assistente com IA generativa (RAG)", detail: "Chatbot treinado com dados da empresa", price: 100, hours: 32, weeks: 4 },
  { id: "llm-eval", group: "Inteligência Artificial", label: "Avaliação e governança de LLMs", detail: "Critérios de qualidade, segurança e ISO/IEC 42001", price: 100, hours: 16, weeks: 2 },
  { id: "automation", group: "Operações", label: "Automação de processos", detail: "Fluxos automáticos e redução de trabalho manual", price: 50, hours: 24, weeks: 3 },
  { id: "api", group: "Operações", label: "Integrações via API", detail: "Conectar sistemas, CRMs e plataformas", price: 100, hours: 16, weeks: 2 },
  { id: "web", group: "Produto", label: "Site ou aplicação web", detail: "Do requisito à publicação", price: 50, hours: 32, weeks: 4 },
  { id: "rca", group: "Produto", label: "Confiabilidade & RCA", detail: "Análise de causa raiz e SLAs", price: 50, hours: 4, weeks: 1 },
];

export const urgencyFactor = { normal: 1, rapido: 1.25 } as const;
export type Urgency = keyof typeof urgencyFactor;

/** Package discount: 3+ services = 10%, 5+ services = 15%. */
export function discountRate(count: number) {
  if (count >= 5) return 0.15;
  if (count >= 3) return 0.1;
  return 0;
}

export function computeQuote(ids: string[], urgency: Urgency = "normal") {
  const chosen = services.filter((s) => ids.includes(s.id)).map(s => ({ ...s, hourlyRate: s.price, price: Math.round(s.price * s.hours * 100) / 100 }));
  const subtotal = chosen.reduce((a, s) => a + s.price, 0);
  const rate = discountRate(chosen.length);
  const discount = Math.round(subtotal * rate * 100) / 100;
  const total = Math.round((subtotal - discount) * urgencyFactor[urgency] * 100) / 100;
  // Services run partly in parallel: longest item + 50% of the rest.
  const sorted = chosen.map((s) => s.weeks).sort((a, b) => b - a);
  const rawWeeks = sorted.length ? (sorted[0] ?? 0) + sorted.slice(1).reduce((a, w) => a + w, 0) * 0.5 : 0;
  const weeks = Math.ceil(urgency === "rapido" ? rawWeeks * 0.7 : rawWeeks);
  const hours = chosen.reduce((sum,s)=>sum+s.hours,0);
  return { chosen, subtotal, rate, discount, total, weeks, hours };
}

export const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
