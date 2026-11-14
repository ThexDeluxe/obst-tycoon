// Zahlen- und Geldformate (deutsch).
const eur0 = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
const eur2 = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 });
const num0 = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 });
const num1 = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1, minimumFractionDigits: 1 });
const pct0 = new Intl.NumberFormat('de-DE', { style: 'percent', maximumFractionDigits: 0 });

export const money = (v: number): string => eur0.format(Math.round(v));
export const moneyExact = (v: number): string => eur2.format(v);
export const int = (v: number): string => num0.format(v);
export const dec1 = (v: number): string => num1.format(v);
export const pct = (v: number): string => pct0.format(v);
export const signedMoney = (v: number): string => (v > 0 ? '+' : '') + money(v);
