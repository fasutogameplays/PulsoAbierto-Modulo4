import { Link } from 'react-router-dom'
export default function NotFoundPage() { return <div className="empty-page"><p className="error-code">404</p><h1>Página no encontrada</h1><p>La dirección que ingresaste no existe en Pulso Abierto.</p><Link to="/">Volver al inicio</Link></div> }
