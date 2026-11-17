import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import CoinList from '../components/CoinList'
import { bitcoin } from './fixtures'
import { useFavoritesStore } from '../stores/favorites'

describe('favoritos compartidos', () => {
  it('permite marcar y desmarcar desde una tarjeta', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><CoinList coins={[bitcoin]} currency="usd" /></MemoryRouter>)
    await user.click(screen.getByRole('button', { name: /marcar bitcoin como favoritos/i }))
    expect(screen.getByRole('button', { name: /quitar bitcoin de favoritos/i })).toHaveAttribute('aria-pressed', 'true')
    expect(useFavoritesStore.getState().favorites).toEqual(['bitcoin'])
    await user.click(screen.getByRole('button', { name: /quitar bitcoin de favoritos/i }))
    expect(useFavoritesStore.getState().favorites).toEqual([])
  })
  it('conserva solamente los favoritos en almacenamiento local', () => {
    useFavoritesStore.getState().toggleFavorite('solana')
    const persisted = JSON.parse(localStorage.getItem('pulso-abierto-favorites') ?? '{}')
    expect(persisted.state.favorites).toEqual(['solana'])
    expect(persisted.state).not.toHaveProperty('error')
    expect(persisted.state).not.toHaveProperty('status')
  })
})
