import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { WaveSurferProvider } from './contexts/waveSurferContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WaveSurferProvider>
    <App />
    </WaveSurferProvider>
  </React.StrictMode>,
)
