import Login from "../pages/login/Login";
import Join from "../pages/login/Join";
import Products from "../pages/product/Products";
import Mypage from "../pages/mypage/Mypage";
import Ugc from "../pages/board/Ugc";
import Ugcs from "../pages/board/Ugcs";
import Main from "../pages/main/Main";
import LayoutMain from "../layout/LayoutMain";

 const routes = [
            {
                path: "/",
                element: <LayoutMain />,
                children: [
                    {
                        path: "/",
                        element: <Main />,
                        meta: { title:"" }
                    },
                    //** 커뮤니티 */
                    {
                        id:"ugcs",
                        path: "/ugcs",
                        element: <Ugcs />,
                        meta: { title:"" }
                    },
                    {
                        id:"ugc",
                        path: "/ugc:boardNo",
                        element: <Ugc />,
                        meta: { title:"" }
                    },
                    {
                        id:"mypage",
                        path: "/mypage",
                        element: <Mypage />,
                        meta: { title:"",auth: true }
                    },
                    {
                        id:"products",
                        path: "/products",
                        element: <Products />,
                        meta: {title:""}
                    },
                ]
            }, 
            {
                id:"join",
                path:"/join",
                element: <Join />,
                meta: {title:""}
            },
            {
                id:"login",
                path:"/login",
                element: <Login />,
                meta: {title:""}
            }             
    ]
export default routes;