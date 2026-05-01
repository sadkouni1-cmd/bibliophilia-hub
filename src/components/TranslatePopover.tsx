import { useEffect, useRef, useState } from "react";
import { Languages, Loader2, X, Volume2 } from "lucide-react";

type Pos = { x: number; y: number };

interface Props {
  sourceLang: string; // e.g. "en", "fr", "es"
  containerRef: React.RefObject<HTMLElement>;
}

interface State {
  text: string;
  pos: Pos;
  loading: boolean;
  translation: string | null;
  error: string | null;
}

const cache = new Map<string, string>();

async function translateToArabic(text: string, source: string): Promise<string> {
  const key = `${source}::${text}`;
  if (cache.has(key)) return cache.get(key)!;

  // Free Google Translate public endpoint (no key required)
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(
    source
  )}&tl=ar&dt=t&q=${encodeURIComponent(text)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("translate_failed");
  const data = await res.json();
  // data[0] is array of [translatedChunk, originalChunk, ...]
  const out = (data?.[0] ?? [])
    .map((seg: any[]) => seg?.[0] ?? "")
    .join("")
    .trim();
  if (!out) throw new Error("empty");
  cache.set(key, out);
  return out;
}

export const TranslatePopover = ({ sourceLang, containerRef }: Props) => {
  const [state, setState] = useState<State | null>(null);
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleUp = () => {
      // small delay so selection is finalized
      setTimeout(() => {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed) return;
        const text = sel.toString().trim();
        if (!text || text.length > 200) return;
        // Make sure selection is inside our container
        const anchor = sel.anchorNode;
        if (!anchor || !el.contains(anchor)) return;

        const range = sel.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        if (!rect || (rect.width === 0 && rect.height === 0)) return;

        const pos = {
          x: rect.left + rect.width / 2,
          y: rect.top, // viewport coords; we use position: fixed
        };

        setState({ text, pos, loading: true, translation: null, error: null });

        translateToArabic(text, sourceLang)
          .then((tr) =>
            setState((s) => (s && s.text === text ? { ...s, loading: false, translation: tr } : s))
          )
          .catch(() =>
            setState((s) =>
              s && s.text === text
                ? { ...s, loading: false, error: "تعذر الترجمة، حاول مرة أخرى." }
                : s
            )
          );
      }, 10);
    };

    const handleDocDown = (e: MouseEvent) => {
      if (popRef.current && popRef.current.contains(e.target as Node)) return;
      // closing only if clicking outside popover
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) {
        setState(null);
      }
    };

    el.addEventListener("mouseup", handleUp);
    el.addEventListener("touchend", handleUp);
    document.addEventListener("mousedown", handleDocDown);
    return () => {
      el.removeEventListener("mouseup", handleUp);
      el.removeEventListener("touchend", handleUp);
      document.removeEventListener("mousedown", handleDocDown);
    };
  }, [containerRef, sourceLang]);

  if (!state) return null;

  // clamp horizontal position
  const maxLeft = typeof window !== "undefined" ? window.innerWidth - 180 : state.pos.x;
  const left = Math.max(20, Math.min(state.pos.x, maxLeft));
  const top = Math.max(60, state.pos.y - 12);

  const speak = () => {
    try {
      const u = new SpeechSynthesisUtterance(state.text);
      u.lang = sourceLang;
      window.speechSynthesis.speak(u);
    } catch {
      /* ignore */
    }
  };

  return (
    <div
      ref={popRef}
      className="fixed z-50 -translate-x-1/2 -translate-y-full animate-fade-up"
      style={{ left, top }}
      dir="rtl"
    >
      <div className="bg-card border border-border/70 shadow-book rounded-xl px-3 py-2 min-w-[220px] max-w-[300px] font-arabic">
        <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-1.5 mb-1.5">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Languages className="h-3.5 w-3.5" />
            <span>ترجمة عربية</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={speak}
              className="p-1 rounded hover:bg-muted transition-smooth"
              aria-label="استماع"
              title="استماع"
            >
              <Volume2 className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
            <button
              onClick={() => setState(null)}
              className="p-1 rounded hover:bg-muted transition-smooth"
              aria-label="إغلاق"
            >
              <X className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>
        <div className="text-[11px] text-muted-foreground/80 mb-1 truncate" dir="ltr">
          {state.text}
        </div>
        {state.loading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-1">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>جارٍ الترجمة…</span>
          </div>
        ) : state.error ? (
          <div className="text-sm text-destructive">{state.error}</div>
        ) : (
          <div className="text-base text-primary font-semibold leading-snug">
            {state.translation}
          </div>
        )}
      </div>
      <div className="w-2 h-2 bg-card border-l border-b border-border/70 rotate-[-45deg] mx-auto -mt-1" />
    </div>
  );
};
