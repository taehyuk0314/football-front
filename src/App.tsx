import React from 'react';
import './App.css';
import Header from "./components/Header";
import { RouterProvider } from 'react-router-dom';
import Footer from './components/Footer';
import router from './router/Router';
import axios from 'axios';

export default class App extends React.Component  {
  componentDidMount() {
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

  }
  render() {
    return (
      <>
        <div className="App">
          <RouterProvider router= {router} /> 
        </div>        
      </>
    )
  }
 
}
