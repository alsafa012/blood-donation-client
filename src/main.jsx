import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import myCreatedRouter from "./Router/Router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={myCreatedRouter} />
  </StrictMode>
);
