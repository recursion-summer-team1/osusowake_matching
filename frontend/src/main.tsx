import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ChatPage from "./pages/ChatPage.tsx";
import FoodList from "./pages/FoodList";
import FooterBar from "./components/FooterBar";

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
    path: "/chat",
    element: <ChatPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
