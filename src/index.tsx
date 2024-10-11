import React, { useEffect, useLayoutEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, useLocation } from "react-router-dom";
// import { ClerkProvider } from "@clerk/clerk-react";
import axios from "axios";
import "preline/preline";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export {};

declare global {
  interface Window {
    HSStaticMethods: {
      autoInit: () => void;
    };
  }
}


// const PUBLISHABLE_KEY =
//   "pk_test_c2FjcmVkLWJ1bGxkb2ctMjAuY2xlcmsuYWNjb3VudHMuZGV2JA";

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key");
// }
axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;
root.render(
  <React.StrictMode>
    {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/"> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </ClerkProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
