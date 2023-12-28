import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useNavigate } from 'react-router-dom';
import Authmiddleware from './pages/auth/Authmiddleware';
import routes from './router/Routes';
import Router from './router/Router';

export default function App() {
  const routeList = () => {
      return <Route 
        path='/'
        element={<Router/>}
      >
        {
          routes.map((item: any,idx)=> 
            <Route 
              path={item.path} 
              element={
                item.meta && item.meta.auth?
                <Authmiddleware>
                  {item.element}  
                </Authmiddleware>
                  :          
                item.element
              }
              key={idx}
            >
              {
                item.children && getChildren(item.children)
              }
            </Route>
          )
        }
      </Route>

    
  }
  
  const getChildren = (route: any) => {
    return route.map((item: any)=>
      <Route 
        path={item.path} 
        element={
          item.meta && item.meta.auth?
          <Authmiddleware>
            {item.element}  
          </Authmiddleware>
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
    <div className="App">
      <RouterProvider router= {router} />
    </div>        
  )
 
}
