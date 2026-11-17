import { COIN_IDS, type CoinId, type CryptoCoin, type Currency } from '../types/crypto'

const API_BASE = 'https://api.coingecko.com/api/v3/coins/markets'
function isCoinId(value: string): value is CoinId {
  return COIN_IDS.some(id => id === value)
}
export { isCoinId }

export async function fetchCoins(currency: Currency, signal?: AbortSignal): Promise<CryptoCoin[]> {
  const params = new URLSearchParams({ vs_currency: currency, ids: COIN_IDS.join(','), order: 'market_cap_desc', per_page: '3', page: '1', sparkline: 'false', price_change_percentage: '24h' })
  const response = await fetch(`${API_BASE}?${params.toString()}`, { signal, headers: { accept: 'application/json' } })
  if (!response.ok) {
    if (response.status === 429) throw new Error('CoinGecko recibió demasiadas solicitudes. Probá nuevamente en unos minutos.')
    throw new Error(`No se pudo consultar CoinGecko (HTTP ${response.status}).`)
  }
  const data: unknown = await response.json()
  if (!Array.isArray(data)) throw new Error('La API devolvió un formato inesperado.')
  return data.filter((item): item is CryptoCoin => typeof item === 'object' && item !== null && 'id' in item && typeof item.id === 'string' && isCoinId(item.id) && 'current_price' in item && typeof item.current_price === 'number' && 'name' in item && typeof item.name === 'string')
}
