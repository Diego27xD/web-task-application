import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./router/routes.tsx";
import { CustomProvider } from "rsuite";
import "rsuite/dist/rsuite.min.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CustomProvider>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </CustomProvider>
  </StrictMode>
);
