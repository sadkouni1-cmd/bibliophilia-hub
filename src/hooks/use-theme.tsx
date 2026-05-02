import { useEffect, useState, useCallback } from "react";

export type Theme = "light" | "dark" | "sepia" | "ocean" | "forest" | "rose";

const STORAGE_KEY = "rwb-theme";
const THEME_CLASSES: Theme[] = ["dark", "sepia", "ocean", "forest", "rose"];

export const THEMES: { id: Theme; label: string; swatch: string }[] = [
  { id: "light",  label: "نهاري",   swatch: "hsl(36 32% 94%)"  },
  { id: "sepia",  label: "سيبيا",   swatch: "hsl(36 45% 86%)"  },
  { id: "dark",   label: "ليلي",    swatch: "hsl(24 20% 8%)"   },
  { id: "ocean",  label: "محيطي",   swatch: "hsl(210 65% 45%)" },
  { id: "forest", label: "غابة",    swatch: "hsl(150 45% 35%)" },
  { id: "rose",   label: "وردي",    swatch: "hsl(340 70% 60%)" },
];

function isTheme(v: unknown): v is Theme {
  return typeof v === "string" && ["light", "dark", "sepia", "ocean", "forest", "rose"].includes(v);
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isTheme(stored)) return stored;
  return "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  THEME_CLASSES.forEach((c) => root.classList.toggle(c, c === theme));
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

  // Sync across tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && isTheme(e.newValue)) setThemeState(e.newValue);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const toggleTheme = useCallback(
    () =>
      setThemeState((p) => {
        const order: Theme[] = ["light", "sepia", "dark", "ocean", "forest", "rose"];
        const idx = order.indexOf(p);
        return order[(idx + 1) % order.length];
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
