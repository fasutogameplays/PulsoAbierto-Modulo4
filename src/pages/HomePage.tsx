import { useMemo, useState } from 'react'
import CoinList from '../components/CoinList'
import QueryForm from '../components/QueryForm'
import StatusMessage from '../components/StatusMessage'
import { useCoins } from '../hooks/useCoins'
import type { Currency } from '../types/crypto'
import { useFavoritesStore } from '../stores/favorites'
export default function HomePage() {
  const [currency, setCurrency] = useState<Currency>('usd')
  const [search, setSearch] = useState('')
  const favoriteCount = useFavoritesStore(state => state.favorites.length)
  const { coins, status, error, retry } = useCoins(currency)
  const visible = useMemo(() => coins.filter(coin => `${coin.name} ${coin.symbol}`.toLocaleLowerCase().includes(search.toLocaleLowerCase())), [coins, search])
  const displayStatus = status === 'success' && visible.length === 0 ? 'empty' : status
  return <><section className="hero"><div><span className="hero-label">MERCADO DIGITAL · DATOS EN VIVO</span><h1>Seguimos el pulso<br/><span>de las criptomonedas.</span></h1><p>Consultá Bitcoin, Ethereum y Solana con datos públicos de CoinGecko. Simple, claro y en un solo lugar.</p></div><div className="hero-symbol" aria-hidden="true">↗</div></section><section className="panel" aria-label="Filtros de búsqueda"><div className="section-heading"><div><span className="eyebrow">EXPLORAR MERCADO</span><h2>Buscá y compará</h2></div><span className="live-pill"><span aria-hidden="true">●</span> Datos CoinGecko</span></div><QueryForm initialCurrency={currency} onApply={(nextSearch, nextCurrency) => { setSearch(nextSearch); setCurrency(nextCurrency) }}/></section><div className="results-heading"><div><span className="eyebrow">COTIZACIONES</span><h2>Criptomonedas <span className="result-count">{status === 'success' ? visible.length : '—'} resultados</span></h2><p className="favorite-summary" aria-label="Cantidad de favoritos">Favoritos: {favoriteCount}</p></div><button className="refresh" type="button" onClick={retry} disabled={status === 'loading'}>↻ Actualizar</button></div><StatusMessage status={displayStatus} message={error} onRetry={retry}/>{status === 'success' && visible.length > 0 && <CoinList coins={visible} currency={currency}/>}<p className="disclaimer">Información orientativa. Los precios pueden variar y no constituyen asesoramiento financiero.</p></>
}
