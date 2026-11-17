export type Currency = 'usd' | 'ars'
export type CoinId = 'bitcoin' | 'ethereum' | 'solana'
export interface CryptoCoin {
  id: CoinId
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number | null
  price_change_percentage_24h: number | null
  total_volume: number
  high_24h: number | null
  low_24h: number | null
  last_updated: string
}
export type LoadStatus = 'idle' | 'loading' | 'success' | 'empty' | 'error'
export const COIN_IDS: CoinId[] = ['bitcoin', 'ethereum', 'solana']
