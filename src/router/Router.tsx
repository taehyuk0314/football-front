import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import Main from "../pages/main/Main";
import Join from "../pages/login/Join";
import LayoutMain from "../layout/LayoutMain";
import Ugcs from "../pages/board/Ugcs";
import Ugc from "../pages/board/Ugc";
import Mypage from "../pages/mypage/Mypage";

const routeBefore = ()  => {
  return 1;
}

const router = createBrowserRouter([
    {
        path:"/",
        element: <LayoutMain />,
        children: [
            {
              path: "/",
              element: <Main />,
            },
            //** 커뮤니티 */
            {
              path: "/ugcs",
              element: <Ugcs />,
            },
            {
              path: "/ugc",
              element: <Ugc />,
            },
            {
              path: "/mypage",
              element: <Mypage />,
            },
        ]
    },
    {
        path:"/join",
        element: <Join />
    },
    {
        path:"/login",
        element: <Login />
    }
]

// 현재 위 상태로 돌리게 되면, root의 내용이 자식 주소에게도 보이게 됨.
// 따라서, Root.tsx로 가서 <Outlet />을 적어줘야 함!
)
export default router;