import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import FoodList from "./pages/FoodList";
import FoodDetails from "./pages/FoodDetails";
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
    path: "/food-details/:id",
    element: <FoodDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
