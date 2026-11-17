import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import { bitcoin } from './fixtures'

describe('consulta de criptomonedas', () => {
  it('muestra la carga y luego el resultado de la consulta', async () => {
    let resolveFetch!: (value: Response) => void
    vi.spyOn(globalThis, 'fetch').mockImplementation(() => new Promise<Response>(resolve => { resolveFetch = resolve }))
    render(<MemoryRouter><HomePage /></MemoryRouter>)
    expect(screen.getByText(/consultando cotizaciones/i)).toBeInTheDocument()
    resolveFetch({ ok: true, json: async () => [bitcoin] } as Response)
    expect(await screen.findByRole('heading', { name: 'Bitcoin' })).toBeInTheDocument()
  })
  it('muestra el error y permite reintentar hasta recuperar los resultados', async () => {
    const mockedFetch = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce({ ok: false, status: 500 } as Response)
      .mockResolvedValueOnce({ ok: true, json: async () => [bitcoin] } as Response)
    const user = userEvent.setup()
    render(<MemoryRouter><HomePage /></MemoryRouter>)
    expect(await screen.findByRole('alert')).toHaveTextContent('HTTP 500')
    await user.click(screen.getByRole('button', { name: /reintentar consulta/i }))
    expect(await screen.findByRole('heading', { name: 'Bitcoin' })).toBeInTheDocument()
    await waitFor(() => expect(mockedFetch).toHaveBeenCalledTimes(2))
  })
})
