import React, { useEffect } from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/Router';
import axios from 'axios';

export default function App() {
  useEffect(()=>{
    axios.interceptors.request.use((config) => {
      return config;
    });
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error.response);

        switch (error.response.status) {
          case 401:
          case 403:
            return Promise.reject(error);
          case 500:
            if (!error.response.data) {
              break;
            }
            switch (error.response.data.exceptionName) {
              case "BussinessException":
              case "PaymentExeption":
                return Promise.reject(error);
            }
            break;
        }
        return Promise.reject(error);
      }
    );
  })
  
  return (
    <>
      <div className="App">
        <RouterProvider router= {router} /> 
      </div>        
    </>
  )
 
}
