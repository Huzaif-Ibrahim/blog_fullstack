import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ContextState } from './context/Context.jsx'

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
        <ContextState>
            <App />
        </ContextState>
    </BrowserRouter>
)
