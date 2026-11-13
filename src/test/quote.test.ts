import { describe, expect, it } from "vitest";
import { computeQuote } from "@/lib/quote";

describe("simulador", () => {
  it("soma sem desconto com 2 serviços", () => {
    expect(computeQuote(["discovery", "rca"]).total).toBe(11000);
  });
  it("aplica 10% com 3 serviços", () => {
    expect(computeQuote(["discovery", "rca", "api"]).total).toBe(16200);
  });
  it("aplica 15% com 5 serviços", () => {
    expect(computeQuote(["discovery", "rca", "api", "pmo", "web"]).discount).toBe(5850);
  });
  it("urgência acrescenta 25%", () => {
    expect(computeQuote(["discovery"], "rapido").total).toBe(7500);
  });
  it("prazo: maior + metade dos demais", () => {
    expect(computeQuote(["genai", "discovery"]).weeks).toBe(7);
  });
  it("serviços da home: 3 marcados = 10% de desconto", () => {
    expect(computeQuote(["discovery", "genai", "automation"]).total).toBe(28800);
  });
  it("lista editável: ids únicos, preços e prazos positivos", () => {
    expect(new Set(services.map((s) => s.id)).size).toBe(services.length);
    services.forEach((s) => {
      expect(s.price).toBeGreaterThan(0);
      expect(s.weeks).toBeGreaterThan(0);
    });
  });
});
