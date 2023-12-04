import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER;
axios.defaults.withCredentials = true;
axios.defaults.paramsSerializer = (params) => {
  let result = '';
  Object.keys(params).filter(key => params[key] || params[key] == false).forEach(key => {
    result += `${key}=${encodeURIComponent(params[key])}&`;
  });
  return result.substring(0, result.length - 1);
}
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

reportWebVitals();
