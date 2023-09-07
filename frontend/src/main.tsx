import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import FoodList from "./pages/FoodList.tsx";
import FoodDetails from "./pages/FoodDetails";
import ChatPage from "./pages/ChatPage.tsx";
import FoodRegistration from "./pages/FoodRegistration.tsx";
import FooterBar from "./components/FooterBar";
import DealPage from "./pages/DealPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        Hello world
        <div>
          <FooterBar />
        </div>
      </div>
    ),
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
