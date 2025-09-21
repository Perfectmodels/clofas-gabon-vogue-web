import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Rendu direct de l'application sans Clerk
createRoot(document.getElementById("root")!).render(<App />);