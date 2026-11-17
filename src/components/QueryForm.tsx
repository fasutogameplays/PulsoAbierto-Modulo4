import { useState, type FormEvent } from 'react'
import { z } from 'zod'
import type { Currency } from '../types/crypto'

const formSchema = z.object({
  search: z.string().trim().min(2, 'Ingresá al menos 2 caracteres para buscar.').max(30, 'Ingresá como máximo 30 caracteres.'),
  currency: z.enum(['usd', 'ars'], { error: 'Elegí una moneda válida.' })
})
type FormErrors = { search?: string; currency?: string }
interface Props { onApply: (search: string, currency: Currency) => void; initialCurrency: Currency }
export default function QueryForm({ onApply, initialCurrency }: Props) {
  const [search, setSearch] = useState('')
  const [currency, setCurrency] = useState<Currency>(initialCurrency)
  const [errors, setErrors] = useState<FormErrors>({})
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = formSchema.safeParse({ search, currency })
    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors
      setErrors({ search: fieldErrors.search?.[0], currency: fieldErrors.currency?.[0] })
      return
    }
    setErrors({})
    onApply(result.data.search, result.data.currency)
  }
  const handleClear = () => { setSearch(''); setErrors({}); onApply('', currency) }
  return <form onSubmit={handleSubmit} className="search-form" noValidate>
    <div className="field"><label htmlFor="coin-search">Buscar criptomoneda</label><input id="coin-search" value={search} onChange={event => { setSearch(event.target.value); if (errors.search) setErrors(previous => ({ ...previous, search: undefined })) }} placeholder="Ej.: Bitcoin o Solana" aria-invalid={Boolean(errors.search)} aria-describedby={errors.search ? 'search-error' : 'search-help'} /><small id="search-help">Buscá por nombre o símbolo; mínimo 2 letras al aplicar.</small>{errors.search && <p className="field-error" id="search-error" role="alert">{errors.search}</p>}</div>
    <div className="field"><label htmlFor="currency">Moneda de cotización</label><select id="currency" value={currency} onChange={event => setCurrency(event.target.value as Currency)} aria-invalid={Boolean(errors.currency)}>{/* valores restringidos por las opciones y validados con Zod */}<option value="usd">Dólar (USD)</option><option value="ars">Peso argentino (ARS)</option></select>{errors.currency && <p className="field-error" role="alert">{errors.currency}</p>}</div>
    <div className="form-actions"><button type="submit" className="primary">Aplicar filtros</button><button type="button" className="secondary" onClick={handleClear}>Mostrar todas</button></div>
  </form>
}
