import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './renderer/src/App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)