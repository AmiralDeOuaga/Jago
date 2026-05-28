import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles.css'
import App from './App.jsx'
import { ErrorBoundary } from './components/ErrorBoundary.jsx'

if ('serviceWorker' in navigator) {
  const isCapacitor = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());

  if (isCapacitor) {
    // Dans l'app mobile : vider tous les SW et caches (évite l'affichage de l'ancienne version)
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(reg => reg.unregister());
    });
    if ('caches' in window) {
      caches.keys().then(names => names.forEach(name => caches.delete(name)));
    }
  } else {
    // Sur le web uniquement : enregistrer le SW pour le mode offline
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
