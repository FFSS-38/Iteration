import React from 'react';
//import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// the below replaces render in current version of React
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('app'));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
