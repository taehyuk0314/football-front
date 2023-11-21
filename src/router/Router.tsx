import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import Main from "../pages/main/Main";

const router = createBrowserRouter([
    {
        path:"/",
        element: <Main />,
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