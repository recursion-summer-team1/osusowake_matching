import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import FoodList from "./pages/FoodList.tsx";
import FoodDetails from "./pages/FoodDetails";
import ChatPage from "./pages/ChatPage.tsx";
import FoodRegistration from "./pages/FoodRegistration.tsx";
import DealPage from "./pages/DealPage.tsx";
import MyPage from "./pages/MyPage.tsx";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>,
);
