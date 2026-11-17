import { useCallback, useEffect, useState } from 'react'
import { fetchCoins } from '../services/coins'
import type { CryptoCoin, Currency, LoadStatus } from '../types/crypto'
export function useCoins(currency: Currency) {
  const [coins, setCoins] = useState<CryptoCoin[]>([])
  const [status, setStatus] = useState<LoadStatus>('idle')
  const [error, setError] = useState('')
  const [retryToken, setRetryToken] = useState(0)
  const retry = useCallback(() => setRetryToken(current => current + 1), [])
  useEffect(() => {
    const controller = new AbortController()
    let active = true
    const load = async () => {
      setStatus('loading'); setError('')
      try { const result = await fetchCoins(currency, controller.signal); if (active) { setCoins(result); setStatus(result.length ? 'success' : 'empty') } }
      catch (err) { if (active && !controller.signal.aborted) { setError(err instanceof Error ? err.message : 'Error desconocido'); setStatus('error') } }
    }
    void load()
    return () => { active = false; controller.abort() }
  }, [currency, retryToken])
  return { coins, status, error, retry }
}
