import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LandingProvider } from './context/LandingContext.js';
import { InboxProvider } from './context/InboxContext.js';
import { PendingProvider } from './context/PendingContext';
import { DiscoverProvider } from './context/DiscoverContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DiscoverProvider>
        <PendingProvider>
          <LandingProvider>
            <InboxProvider>
              <App />
            </InboxProvider>
          </LandingProvider>
        </PendingProvider>
      </DiscoverProvider>
    </BrowserRouter>
  </React.StrictMode>
);

