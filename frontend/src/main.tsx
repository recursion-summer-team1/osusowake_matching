import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RouterRoot from "./RouterRoot.tsx";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <RouterRoot />
        <Toaster
          position="top-center"
          // reverseOrder={false}
          // gutter={8}
          // containerClassName=""
          // containerStyle={{}}
          toastOptions={{
            // Define default options
            // className: "",
            duration: 4000,
            // style: {
            //   background: "#363636",
            //   color: "#fff",
            // },

            // Default options for specific types
            success: {
              // className: "toast alert alert-success",
              // duration: 3000,
              // theme: {
              //   primary: "green",
              //   secondary: "black",
              // },
            },
          }}
        />
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>,
);
