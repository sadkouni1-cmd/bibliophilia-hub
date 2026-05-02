import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Handles the Android hardware back button inside a Capacitor native shell.
 * - On any non-home route → navigate back in history (or to "/" as fallback).
 * - On the home route → exit the app.
 *
 * In a regular browser/PWA the native event never fires, so this is a no-op
 * and the browser's built-in back gesture continues to work via react-router.
 */
export function useAndroidBack() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let removeListener: (() => void) | null = null;
    let cancelled = false;

    (async () => {
      try {
        // Dynamic import — package is optional and only present in the native build.
        const mod = (await import(
          /* @vite-ignore */ "@capacitor/app" as string
        ).catch(() => null)) as { App?: any } | null;
        if (cancelled || !mod?.App) return;

        const sub = await mod.App.addListener("backButton", () => {
          const isHome = location.pathname === "/";
          if (!isHome) {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate("/", { replace: true });
            }
          } else {
            mod.App.exitApp?.();
          }
        });
        removeListener = () => sub.remove?.();
      } catch {
        /* Capacitor not available — ignore. */
      }
    })();

    return () => {
      cancelled = true;
      removeListener?.();
    };
  }, [location.pathname, navigate]);
}
