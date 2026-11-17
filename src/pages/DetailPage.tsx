import { Link, useParams, useSearchParams } from 'react-router-dom'
import StatusMessage from '../components/StatusMessage'
import { useCoins } from '../hooks/useCoins'
import { isCoinId } from '../services/coins'
import type { Currency } from '../types/crypto'
import { formatMoney, formatPercent } from '../utils'
import { useFavoritesStore } from '../stores/favorites'
export default function DetailPage() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const currency: Currency = params.get('moneda') === 'ars' ? 'ars' : 'usd'
  const { coins, status, error, retry } = useCoins(currency)
  const favorites = useFavoritesStore(state => state.favorites)
  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite)
  if (!id || !isCoinId(id)) return <div className="empty-page"><h1>Criptomoneda no encontrada</h1><p>El identificador de la dirección no corresponde a un activo disponible.</p><Link to="/">Volver al listado</Link></div>
  const coin = coins.find(item => item.id === id)
  const isFavorite = coin ? favorites.includes(coin.id) : false
  return <div className="detail-wrapper"><Link className="back-link" to="/">← Volver a criptomonedas</Link><StatusMessage status={status} message={error} onRetry={retry}/>{status === 'success' && (coin ? <article className="detail-panel"><div className="detail-title"><img src={coin.image} alt="" width="64" height="64"/><div><span className="eyebrow">FICHA DE CRIPTOMONEDA</span><h1>{coin.name} <small>{coin.symbol.toUpperCase()}</small></h1></div><button type="button" className={`favorite detail-favorite ${isFavorite ? "active" : ""}`} aria-pressed={isFavorite} aria-label={`${isFavorite ? "Quitar" : "Marcar"} ${coin.name} ${isFavorite ? "de" : "como"} favoritos`} onClick={() => toggleFavorite(coin.id)}>{isFavorite ? "★" : "☆"} <span>{isFavorite ? "Quitar favorito" : "Agregar favorito"}</span></button></div><div className="detail-highlight"><span>Precio actual</span><strong>{formatMoney(coin.current_price, currency)}</strong><p>Variación 24 h: {formatPercent(coin.price_change_percentage_24h)}</p></div><div className="details-grid"><div><span>Capitalización de mercado</span><strong>{formatMoney(coin.market_cap, currency)}</strong></div><div><span>Volumen en 24 horas</span><strong>{formatMoney(coin.total_volume, currency)}</strong></div><div><span>Máximo en 24 horas</span><strong>{coin.high_24h === null ? 'Sin datos' : formatMoney(coin.high_24h, currency)}</strong></div><div><span>Mínimo en 24 horas</span><strong>{coin.low_24h === null ? 'Sin datos' : formatMoney(coin.low_24h, currency)}</strong></div><div><span>Ranking de mercado</span><strong>#{coin.market_cap_rank ?? 'Sin datos'}</strong></div><div><span>Última actualización (API)</span><strong>{new Date(coin.last_updated).toLocaleString('es-AR')}</strong></div></div></article> : <div className="notice" role="status">La API no devolvió información para este activo. <button className="secondary" onClick={retry}>Volver a intentar</button></div>)}</div>
}
