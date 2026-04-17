import { useCallback, useEffect, useState } from "react";

const FAVORITES_KEY = "rwb:favorites";
const PROGRESS_KEY = "rwb:progress";

export interface BookProgress {
  spread: number;
  totalSpreads: number;
  updatedAt: number;
}

type ProgressMap = Record<string, BookProgress>;

const readJSON = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJSON = (key: string, value: unknown) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("rwb:storage"));
  } catch {
    /* ignore */
  }
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => readJSON<string[]>(FAVORITES_KEY, []));

  useEffect(() => {
    const sync = () => setFavorites(readJSON<string[]>(FAVORITES_KEY, []));
    window.addEventListener("rwb:storage", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("rwb:storage", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    const current = readJSON<string[]>(FAVORITES_KEY, []);
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    writeJSON(FAVORITES_KEY, next);
    setFavorites(next);
  }, []);

  return { favorites, isFavorite, toggleFavorite };
};

export const useProgressMap = () => {
  const [progress, setProgress] = useState<ProgressMap>(() => readJSON<ProgressMap>(PROGRESS_KEY, {}));

  useEffect(() => {
    const sync = () => setProgress(readJSON<ProgressMap>(PROGRESS_KEY, {}));
    window.addEventListener("rwb:storage", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("rwb:storage", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return progress;
};

export const getProgress = (id: string): BookProgress | undefined => {
  const map = readJSON<ProgressMap>(PROGRESS_KEY, {});
  return map[id];
};

export const saveProgress = (id: string, spread: number, totalSpreads: number) => {
  const map = readJSON<ProgressMap>(PROGRESS_KEY, {});
  map[id] = { spread, totalSpreads, updatedAt: Date.now() };
  writeJSON(PROGRESS_KEY, map);
};

export const clearProgress = (id: string) => {
  const map = readJSON<ProgressMap>(PROGRESS_KEY, {});
  delete map[id];
  writeJSON(PROGRESS_KEY, map);
};
