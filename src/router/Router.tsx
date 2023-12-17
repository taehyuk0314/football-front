import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import routes from "./Routes";
import Login from "../pages/login/Login";
import { useSelector } from "react-redux";
export default function Router() {
  const state = useSelector((state: any) => state);
  const routeList = () => {
    return routes.map((item: any)=> 
      <Route 
        path={item.path} 
        element={
          item.meta && item.meta.auth && !state.user.memNo?
          <Login/>
          :
          item.element
        }
      >
        {
          item.children && getChildern(item.children)
        }
      </Route>
    )
  }
  
  const getChildern = (route: any) => {
    return route.map((item: any)=>
      <Route 
        path={item.path} 
        element={
          item.meta && item.meta.auth && !state.user.memNo?
          <Login/>
          :
          item.element
        }
      />
    )
  }
  const router = createBrowserRouter(
    createRoutesFromElements(
      routeList()
    )  
  )

  return (
    <RouterProvider router= {router} /> 
  )
}
