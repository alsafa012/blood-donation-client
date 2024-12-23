import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import myCreatedRouter from "./Router/Router";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./Provider/AuthProvider";
import { AddressProvider } from "./Provider/LocationContext";
// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AddressProvider>
          <HelmetProvider>
            <RouterProvider router={myCreatedRouter} />
          </HelmetProvider>
        </AddressProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
