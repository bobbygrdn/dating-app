import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LandingProvider } from './context/LandingContext.js';
import { InboxProvider } from './context/InboxContext.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LandingProvider>
        <InboxProvider>
          <App />
        </InboxProvider>
      </LandingProvider>
    </BrowserRouter>
  </React.StrictMode>
);

