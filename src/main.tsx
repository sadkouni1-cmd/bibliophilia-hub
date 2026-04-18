import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Register service worker only in production AND only outside iframes (preview-safe).
if (
  "serviceWorker" in navigator &&
  import.meta.env.PROD &&
  typeof window !== "undefined" &&
  window.self === window.top
) {
  window.addEventListener("load", () => {
    import("virtual:pwa-register")
      .then(({ registerSW }) => {
        registerSW({ immediate: true });
      })
      .catch(() => {
        /* no-op: PWA optional */
      });
  });
}
