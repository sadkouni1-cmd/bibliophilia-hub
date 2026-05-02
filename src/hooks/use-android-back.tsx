import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Handles the Android hardware back button (and browser back gesture).
 * - On any non-home route → navigate back in history (or to "/" as fallback).
 * - On the home route → ask the user before exiting (Capacitor) or do nothing (web).
 *
 * Works both in a regular browser/PWA and inside a Capacitor native shell.
 * If @capacitor/app is available at runtime, it hooks into the native
 * `backButton` event; otherwise it falls back to the `popstate` strategy.
 */
export function useAndroidBack() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let removeNativeListener: (() => void) | null = null;
    let cancelled = false;

    const handleBack = () => {
      const isHome = location.pathname === "/";
      if (!isHome) {
        if (window.history.length > 1) {
          navigate(-1);
        } else {
          navigate("/", { replace: true });
        }
        return false;
      }
      // On home: let the native shell decide (will exit on Capacitor).
      return true;
    };

    // Try to wire up Capacitor's native back button if running inside the app.
    (async () => {
      try {
        // Dynamic import so the web build doesn't fail when the package
        // isn't installed yet.
        const mod = (await import(
          /* @vite-ignore */ /* webpackIgnore: true */ "@capacitor/app" as string
        ).catch(() => null)) as { App?: any } | null;
        if (cancelled || !mod?.App) return;

        const sub = await mod.App.addListener("backButton", () => {
          const shouldExit = handleBack();
          if (shouldExit && location.pathname === "/") {
            mod.App.exitApp?.();
          }
        });
        removeNativeListener = () => sub.remove?.();
      } catch {
        /* Capacitor not available — rely on browser popstate below. */
      }
    })();

    // Web fallback: intercept browser back so internal pages go back one step.
    // We push a sentinel state; when the user presses back, popstate fires and
    // we manually navigate.
    const onPopState = () => {
      handleBack();
    };
    window.addEventListener("popstate", onPopState);

    return () => {
      cancelled = true;
      window.removeEventListener("popstate", onPopState);
      removeNativeListener?.();
    };
  }, [location.pathname, navigate]);
}
