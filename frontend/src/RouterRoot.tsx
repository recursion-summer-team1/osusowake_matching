import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { useRecoilState } from "recoil";
import { getLoggedInInfo, myUserState } from "./utils/myUserState";
import { useEffect } from "react";
import FoodList from "./pages/FoodList";
import FoodDetails from "./pages/FoodDetails";
import ChatPage from "./pages/ChatPage";
import FoodRegistration from "./pages/FoodRegistration";
import DealPage from "./pages/DealPage";
import MyPage from "./pages/MyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/food-list" replace />,
  },
  {
    path: "/food-list",
    element: <FoodList />,
  },
  {
    path: "/food-details/:id",
    element: <FoodDetails />,
  },
  {
    path: "/chat/:dealId",
    element: <ChatPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
  {
    path: "/food-registration",
    element: <FoodRegistration />,
  },
  {
    path: "/deal-list",
    element: <DealPage />,
  },
  {
    path: "/me",
    element: <MyPage />,
  },
]);

const RouterRoot = () => {
  const [, setMyUser] = useRecoilState(myUserState);
  useEffect(() => {
    const storedMyUser = getLoggedInInfo();
    if (storedMyUser) {
      setMyUser(storedMyUser);
    }
  }, [setMyUser]);
  return <RouterProvider router={router} />;
};

export default RouterRoot;
