import { describe, expect, it } from "vitest";
import { computeQuote, services } from "@/lib/quote";

describe("simulador", () => {
  it("soma sem desconto com 2 serviços", () => {
    expect(computeQuote(["discovery", "rca"]).total).toBe(574.8);
  });
  it("aplica 10% com 3 serviços", () => {
    expect(computeQuote(["discovery", "rca", "api"]).total).toBe(1495.08);
  });
  it("aplica 15% com 5 serviços", () => {
    expect(computeQuote(["discovery", "rca", "api", "pmo", "web"]).discount).toBe(594.06);
  });
  it("urgência acrescenta 25%", () => {
    expect(computeQuote(["discovery"], "rapido").total).toBe(479);
  });
  it("prazo: maior + metade dos demais", () => {
    expect(computeQuote(["genai", "discovery"]).weeks).toBe(5);
  });
  it("serviços da home: 3 marcados = 10% de desconto", () => {
    expect(computeQuote(["discovery", "genai", "automation"]).total).toBe(4199.04);
  });
  it("cobra R$47,90 por hora de discovery, não uma mensalidade", () => {
    expect(services.find(s=>s.id==="discovery")?.price).toBe(47.9);
    expect(computeQuote(["discovery"]).total).toBe(383.2);
    expect(computeQuote(["discovery"]).hours).toBe(8);
  });
  it("lista editável: ids únicos, preços e prazos positivos", () => {
    expect(new Set(services.map((s) => s.id)).size).toBe(services.length);
    services.forEach((s) => {
      expect(s.price).toBeGreaterThan(0);
      expect(s.weeks).toBeGreaterThan(0);
    });
  });
});
