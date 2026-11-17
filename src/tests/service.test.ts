import { describe, expect, it, vi } from 'vitest'
import { fetchCoins } from '../services/coins'
import { bitcoin } from './fixtures'

describe('servicio de CoinGecko', () => {
  it('devuelve los datos tipados al recibir una respuesta exitosa', async () => {
    const mockedFetch = vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: true, json: async () => [bitcoin] } as Response)
    expect(await fetchCoins('usd')).toEqual([bitcoin])
    expect(mockedFetch).toHaveBeenCalledTimes(1)
    expect(String(mockedFetch.mock.calls[0][0])).toContain('vs_currency=usd')
  })
  it('arroja error cuando response.ok es false', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false, status: 500 } as Response)
    await expect(fetchCoins('usd')).rejects.toThrow(/HTTP 500/)
  })
  it('rechaza formatos externos inesperados', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: true, json: async () => ({ unexpected: true }) } as Response)
    await expect(fetchCoins('usd')).rejects.toThrow(/formato inesperado/)
  })
})
