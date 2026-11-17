import type { Currency } from './types/crypto'
export function formatMoney(value: number, currency: Currency, compact = false) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: currency.toUpperCase(), maximumFractionDigits: value < 1 ? 6 : 2, notation: compact ? 'compact' : 'standard', compactDisplay: 'short' }).format(value)
}
export function formatPercent(value: number | null) { return value === null ? 'Sin datos' : `${value >= 0 ? '+' : ''}${new Intl.NumberFormat('es-AR', { maximumFractionDigits: 2 }).format(value)}%` }
