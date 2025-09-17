import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import { AuthProvider } from '../Context/Context.jsx'
//AuthProvider is wrapped around <App/> so the applicaiton can access Context. Browser Router is wrapped around both AuthProvider and App so they may access and use routes.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider> 
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
