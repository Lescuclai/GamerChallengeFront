import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";

import "./styles/reset.css";
import "./styles/index.css";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./styles/theme.ts";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
);
