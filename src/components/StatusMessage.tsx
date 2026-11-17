import type { LoadStatus } from '../types/crypto'
interface Props { status: LoadStatus; message?: string; onRetry: () => void }
export default function StatusMessage({ status, message, onRetry }: Props) {
  if (status === 'idle') return <div className="notice" role="status">Preparando la consulta...</div>
  if (status === 'loading') return <div className="notice" role="status" aria-live="polite"><span className="spinner" aria-hidden="true"/> Consultando cotizaciones...</div>
  if (status === 'empty') return <div className="notice" role="status">No se encontraron criptomonedas para esta búsqueda.</div>
  if (status === 'error') return <div className="notice notice-error" role="alert"><p>{message ?? 'Ocurrió un error al cargar los datos.'}</p><button className="secondary" onClick={onRetry}>Reintentar consulta</button></div>
  return null
}
