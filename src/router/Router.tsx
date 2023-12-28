import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useNavigate } from "react-router-dom";
import routes from "./Routes";
import Authmiddleware from "../pages/auth/Authmiddleware";
import { useEffect } from "react";
import axios from "axios";

export default function Router() {
  const navigate = useNavigate();
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
            return navigate('login');
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
  },[navigate])

  return (
    <Outlet/>
  )
}
