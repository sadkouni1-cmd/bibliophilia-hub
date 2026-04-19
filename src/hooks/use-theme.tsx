import { useEffect, useState, useCallback } from "react";

export type Theme = "light" | "dark" | "sepia";

const STORAGE_KEY = "rwb-theme";
const THEME_ORDER: Theme[] = ["light", "sepia", "dark"];

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "light" || stored === "dark" || stored === "sepia") return stored;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("sepia", theme === "sepia");
  root.style.colorScheme = theme === "dark" ? "dark" : "light";
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const toggleTheme = useCallback(
    () =>
      setThemeState((p) => {
        const idx = THEME_ORDER.indexOf(p);
        return THEME_ORDER[(idx + 1) % THEME_ORDER.length];
      }),
    []
  );

  return { theme, setTheme, toggleTheme };
}

// Apply theme as early as possible (before React mounts) to avoid flash of wrong theme.
export function initThemeEarly() {
  try {
    applyTheme(getInitialTheme());
  } catch {
    /* ignore */
  }
}
