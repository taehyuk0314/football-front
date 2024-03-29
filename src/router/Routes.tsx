import Login from "../pages/login/Login";
import Join from "../pages/login/Join";
import Products from "../pages/product/Products";
import Mypage from "../pages/mypage/Mypage";
import Ugc from "../pages/board/Ugc";
import Ugcs from "../pages/board/Ugcs";
import Main from "../pages/main/Main";
import LayoutMain from "../layout/LayoutMain";
import Cart from "../pages/mypage/Cart";
import UgcForm from "../pages/board/UgcForm";
import Product from "../pages/product/Product";
import Order from "../pages/order/Order";

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
                        path: "/ugc/:boardNo",
                        element: <Ugc />,
                        meta: { title:"" }
                    },
                    {
                        id:"ugcForm",
                        path: "/ugc/new",
                        element: <UgcForm />,
                        meta: { title:"게시글 쓰기", auth: true }
                    },
                    {
                        id:"mypage",
                        path: "/mypage",
                        element: <Mypage />,
                        meta: { title:"",auth: true }
                    },
                    {
                        id:"cart",
                        path: "/cart/:cartType",
                        element: <Cart />,
                        meta: { title:"",auth: true }
                    },
                    {
                        id:"products",
                        path: "/products",
                        element: <Products />,
                        meta: {title:""}
                    },
                    {
                        id:"product",
                        path: "/product/:productNo",
                        element: <Product />,
                        meta: {title:""}
                    },
                    {
                        id:"order",
                        path: "/order/:orderNo",
                        element: <Order />,
                        meta: {title:"주문상세"}
                    },
                    {
                        id:"paymentComplete",
                        path: "/payment/complete",
                        element: <Order />,
                        meta: {title:"주문상세"}
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