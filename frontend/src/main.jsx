import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './context/User.context.jsx'
import { PinProvider } from './context/Pin.context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <PinProvider>
    <App />
    </PinProvider>
    </UserProvider>
  </StrictMode>,
)
