import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './router/Router';
import Header from './components/Header';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className="App">
      <Header/>
      <RouterProvider router= {router} /> 
    </div>      
  </React.StrictMode>
);

reportWebVitals();
