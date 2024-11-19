import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { DarkModeProvider } from "@store/DarkModeContext.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import ErrorBoundaryWrapper from "@utils/ErrorBoundary.tsx";
import { queryClient } from "@utils/queryClient.ts";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundaryWrapper>
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <App />
        <Toaster />
      </DarkModeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ErrorBoundaryWrapper>,
);
