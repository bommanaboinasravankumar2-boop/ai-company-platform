import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { setupMockFetchFallback } from './lib/mockFetch.ts';
import './index.css';

// Initialize global fetch proxy and client-side database simulation for GitHub Pages compatibility
setupMockFetchFallback();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
