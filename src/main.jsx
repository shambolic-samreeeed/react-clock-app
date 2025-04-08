import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App className= "p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" />
  </StrictMode>,
)
