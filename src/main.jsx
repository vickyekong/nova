import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ErrorBoundary } from './components/ErrorBoundary';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Nova failed to mount: no #root element in the document.');
}

createRoot(container).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
