import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// StrictMode is intentionally omitted because the portrait engine attaches global listeners once.
createRoot(document.getElementById('root')!).render(<App />);
