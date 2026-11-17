import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import NotFoundPage from './pages/NotFoundPage'
import './styles.css'
export default function App() { return <BrowserRouter><div className="app-shell"><header className="site-header"><div className="container nav"><Link to="/" className="brand" aria-label="Pulso Abierto, inicio"><span className="brand-mark" aria-hidden="true">⌁</span><span>PULSO<span className="brand-accent">ABIERTO</span></span></Link><nav aria-label="Navegación principal"><Link to="/">Mercado</Link><a href="https://www.coingecko.com/" target="_blank" rel="noopener noreferrer">Fuente de datos ↗</a></nav></div></header><main className="container main-content"><Routes><Route path="/" element={<HomePage/>}/><Route path="/criptomonedas/:id" element={<DetailPage/>}/><Route path="*" element={<NotFoundPage/>}/></Routes></main><footer className="site-footer"><div className="container footer-content"><span>© Pulso Abierto · Proyecto educativo</span><span>Información provista por CoinGecko</span></div></footer></div></BrowserRouter> }
