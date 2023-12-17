import { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Router from './router/Router';

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
            alert("로그인이 필요한 서비스 입니다.");
            // navigate("/login");
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
  },[])
  
  return (
    <>
      <div className="App">
        <Router/> 
      </div>        
    </>
  )
 
}
