export type Currency = "BRL" | "USD" | "GBP";
// Reference rates from open.er-api.com, 13 Nov 2026. Conversions are approximate.
export const currencyRates = { BRL: 1, USD: 0.177889, GBP: 0.134398 };
export function convertMoney(value: number, from: Currency, to: Currency) {
  return value / currencyRates[from] * currencyRates[to];
}
export function money(value: number, from: Currency, to: Currency) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: to, maximumFractionDigits: 0 }).format(convertMoney(value, from, to));
}