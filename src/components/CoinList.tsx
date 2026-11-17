import CoinCard from './CoinCard'
import { useFavoritesStore } from '../stores/favorites'
import type { CryptoCoin, Currency } from '../types/crypto'
interface Props { coins: CryptoCoin[]; currency: Currency }
export default function CoinList({ coins, currency }: Props) {
  const favorites = useFavoritesStore((state) => state.favorites)
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
  return <section aria-label="Resultados de la consulta" className="card-grid">{coins.map(coin => <CoinCard key={coin.id} coin={coin} currency={currency} favorite={favorites.includes(coin.id)} onToggleFavorite={toggleFavorite}/>)}</section>
}
