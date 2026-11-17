import { Link } from 'react-router-dom'
import type { CryptoCoin, Currency } from '../types/crypto'
import { formatMoney, formatPercent } from '../utils'
interface Props { coin: CryptoCoin; currency: Currency; favorite: boolean; onToggleFavorite: (id: CryptoCoin['id']) => void }
export default function CoinCard({ coin, currency, favorite, onToggleFavorite }: Props) {
  const change = coin.price_change_percentage_24h
  return <article className="coin-card"><div className="card-top"><div className="coin-ident"><img src={coin.image} width="46" height="46" alt="" loading="lazy"/><div><h3>{coin.name}</h3><span>{coin.symbol.toUpperCase()} · #{coin.market_cap_rank ?? '—'}</span></div></div><button className={`favorite ${favorite ? 'active' : ''}`} type="button" onClick={() => onToggleFavorite(coin.id)} aria-label={`${favorite ? 'Quitar' : 'Marcar'} ${coin.name} ${favorite ? 'de' : 'como'} favoritos`} aria-pressed={favorite}>{favorite ? '★' : '☆'}</button></div><p className="eyebrow">PRECIO ACTUAL</p><p className="coin-price">{formatMoney(coin.current_price, currency)}</p><p className={`change ${change === null ? '' : change >= 0 ? 'positive' : 'negative'}`}>Variación 24 h: {formatPercent(change)}</p><div className="card-bottom"><span>Cap. de mercado<br/><strong>{formatMoney(coin.market_cap, currency, true)}</strong></span><Link to={`/criptomonedas/${coin.id}?moneda=${currency}`} className="detail-link">Ver detalle <span aria-hidden="true">→</span></Link></div></article>
}
