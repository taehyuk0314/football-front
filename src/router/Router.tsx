import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../reducer/userSlice";

export default function Router() {
  const member = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
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
        switch (error.response.status) {
          case 401:
          case 403:
            alert("로그인이 필요한 서비스 입니다.");
            dispatch(clearUser(member));
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
