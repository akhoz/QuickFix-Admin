import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import '../i18n.ts';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { WorkshopProvider } from './contexts/WorkshopContext.tsx';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <WorkshopProvider>
        <App />
      </WorkshopProvider>
    </ThemeProvider>
  </StrictMode>
);

