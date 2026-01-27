import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

console.log('Mounting App...');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/prime_cinema">
      <App />
    </BrowserRouter>
  </StrictMode>,
)
