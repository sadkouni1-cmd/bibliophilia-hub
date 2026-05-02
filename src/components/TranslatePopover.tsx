import { useEffect, useRef, useState } from "react";
import { Languages, Loader2, X, Volume2, BookOpen } from "lucide-react";

type Pos = { x: number; y: number };

interface Props {
  sourceLang: string; // e.g. "en", "fr", "es"
  containerRef: React.RefObject<HTMLElement>;
}

interface DictEntry {
  pos: string; // part of speech, e.g. "noun"
  terms: string[]; // arabic equivalents
}

interface Result {
  primary: string; // main translation
  isSingleWord: boolean;
  dictionary: DictEntry[]; // only for single words
}

interface State {
  text: string;
  pos: Pos;
  loading: boolean;
  result: Result | null;
  error: string | null;
}

const CACHE_STORAGE_KEY = "rwb-translate-cache-v1";

function loadCache(): Map<string, Result> {
  if (typeof window === "undefined") return new Map();
  try {
    const raw = window.localStorage.getItem(CACHE_STORAGE_KEY);
    if (!raw) return new Map();
    const obj = JSON.parse(raw) as Record<string, Result>;
    return new Map(Object.entries(obj));
  } catch {
    return new Map();
  }
}

const cache: Map<string, Result> = loadCache();

function persistCache() {
  if (typeof window === "undefined") return;
  try {
    // cap at ~500 entries to avoid bloat
    const entries = Array.from(cache.entries()).slice(-500);
    const obj = Object.fromEntries(entries);
    window.localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(obj));
  } catch {
    /* ignore quota errors */
  }
}

function isSingleWord(text: string): boolean {
  // single word = no whitespace, length <= 40, has at least one letter
  return /^[\p{L}\p{M}'’\-]+$/u.test(text) && text.length <= 40;
}

async function translate(text: string, source: string): Promise<Result> {
  const single = isSingleWord(text);
  const key = `${source}::${single ? "w" : "s"}::${text}`;
  if (cache.has(key)) return cache.get(key)!;

  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    throw new Error("offline");
  }

  // dt=t : translation, dt=bd : dictionary (synonyms for single words)
  const dtParams = single ? "&dt=t&dt=bd" : "&dt=t";
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(
    source
  )}&tl=ar${dtParams}&q=${encodeURIComponent(text)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("translate_failed");
  const data = await res.json();

  const primary = (data?.[0] ?? [])
    .map((seg: any[]) => seg?.[0] ?? "")
    .join("")
    .trim();

  const dictionary: DictEntry[] = [];
  if (single && Array.isArray(data?.[1])) {
    for (const block of data[1]) {
      const pos = block?.[0] ?? "";
      const terms: string[] = Array.isArray(block?.[1]) ? block[1].slice(0, 6) : [];
      if (terms.length) dictionary.push({ pos, terms });
    }
  }

  if (!primary) throw new Error("empty");

  const result: Result = { primary, isSingleWord: single, dictionary };
  cache.set(key, result);
  persistCache();
  return result;
}

const POS_LABEL_AR: Record<string, string> = {
  noun: "اسم",
  verb: "فعل",
  adjective: "صفة",
  adverb: "ظرف",
  pronoun: "ضمير",
  preposition: "حرف جر",
  conjunction: "حرف عطف",
  interjection: "تعجب",
  abbreviation: "اختصار",
};

export const TranslatePopover = ({ sourceLang, containerRef }: Props) => {
  const [state, setState] = useState<State | null>(null);
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;


    // Run translation for an arbitrary text + position (used by both selection & tap)
    const runTranslate = (text: string, pos: Pos) => {
      setState({ text, pos, loading: true, result: null, error: null });
      translate(text, sourceLang)
        .then((result) =>
          setState((s) => (s && s.text === text ? { ...s, loading: false, result } : s))
        )
        .catch((err) =>
          setState((s) =>
            s && s.text === text
              ? {
                  ...s,
                  loading: false,
                  error:
                    err?.message === "offline"
                      ? "أنت غير متصل بالإنترنت — هذه الكلمة لم تُترجم سابقًا."
                      : "تعذر الترجمة، حاول مرة أخرى.",
                }
              : s
          )
        );
    };

    // Find the word at a given client (x,y) inside the container.
    const wordAtPoint = (x: number, y: number): { word: string; rect: DOMRect } | null => {
      const doc: any = document;
      let range: Range | null = null;
      if (typeof doc.caretRangeFromPoint === "function") {
        range = doc.caretRangeFromPoint(x, y);
      } else if (typeof doc.caretPositionFromPoint === "function") {
        const p = doc.caretPositionFromPoint(x, y);
        if (p && p.offsetNode) {
          range = document.createRange();
          range.setStart(p.offsetNode, p.offset);
          range.setEnd(p.offsetNode, p.offset);
        }
      }
      if (!range) return null;
      const node = range.startContainer;
      if (!node || node.nodeType !== Node.TEXT_NODE) return null;
      const text = node.textContent || "";
      const offset = range.startOffset;
      // Word boundary regex (unicode letters, marks, apostrophe, hyphen)
      const wordChar = /[\p{L}\p{M}'’\-]/u;
      let start = offset;
      let end = offset;
      while (start > 0 && wordChar.test(text[start - 1])) start--;
      while (end < text.length && wordChar.test(text[end])) end++;
      if (start === end) return null;
      const word = text.slice(start, end).trim();
      if (!word || !isSingleWord(word)) return null;
      const wordRange = document.createRange();
      wordRange.setStart(node, start);
      wordRange.setEnd(node, end);
      const rect = wordRange.getBoundingClientRect();
      return { word, rect };
    };

    const handleTap = (e: MouseEvent | TouchEvent) => {
      // Ignore if user is selecting text
      const sel = window.getSelection();
      if (sel && !sel.isCollapsed && sel.toString().trim().length > 0) return;
      // Ignore taps inside the popover itself
      if (popRef.current && popRef.current.contains(e.target as Node)) return;

      let x: number, y: number;
      if ("touches" in e) {
        const t = e.changedTouches[0] ?? e.touches[0];
        if (!t) return;
        x = t.clientX;
        y = t.clientY;
      } else {
        x = e.clientX;
        y = e.clientY;
      }
      const hit = wordAtPoint(x, y);
      if (!hit) {
        // tap on empty area → close any open popover
        setState(null);
        return;
      }
      runTranslate(hit.word, {
        x: hit.rect.left + hit.rect.width / 2,
        y: hit.rect.top,
      });
    };

    const handleSelection = () => {
      // small delay so selection is finalized (esp. on touch devices)
      setTimeout(() => {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed) return;
        const text = sel.toString().trim();
        // only handle multi-word selections here; single words handled by tap
        if (!text || text.length > 200 || isSingleWord(text)) return;
        const anchor = sel.anchorNode;
        if (!anchor || !el.contains(anchor)) return;

        const range = sel.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        if (!rect || (rect.width === 0 && rect.height === 0)) return;

        runTranslate(text, {
          x: rect.left + rect.width / 2,
          y: rect.top,
        });
      }, 30);
    };

    const handleDocDown = (e: MouseEvent | TouchEvent) => {
      if (popRef.current && popRef.current.contains(e.target as Node)) return;
      if (el.contains(e.target as Node)) return; // taps inside reader handled by handleTap
      setState(null);
    };

    el.addEventListener("click", handleTap as EventListener);
    el.addEventListener("mouseup", handleSelection);
    el.addEventListener("touchend", handleSelection);
    document.addEventListener("mousedown", handleDocDown);
    document.addEventListener("touchstart", handleDocDown, { passive: true });
    return () => {
      el.removeEventListener("click", handleTap as EventListener);
      el.removeEventListener("mouseup", handleSelection);
      el.removeEventListener("touchend", handleSelection);
      document.removeEventListener("mousedown", handleDocDown);
      document.removeEventListener("touchstart", handleDocDown);
    };
  }, [containerRef, sourceLang]);

  if (!state) return null;

  // clamp horizontal position
  const popWidth = 280;
  const maxLeft = typeof window !== "undefined" ? window.innerWidth - popWidth / 2 - 12 : state.pos.x;
  const minLeft = popWidth / 2 + 12;
  const left = Math.max(minLeft, Math.min(state.pos.x, maxLeft));
  const top = Math.max(70, state.pos.y - 12);

  const speak = () => {
    try {
      const u = new SpeechSynthesisUtterance(state.text);
      u.lang = sourceLang;
      window.speechSynthesis.speak(u);
    } catch {
      /* ignore */
    }
  };

  const single = state.result?.isSingleWord ?? isSingleWord(state.text);

  return (
    <div
      ref={popRef}
      className="fixed z-50 -translate-x-1/2 -translate-y-full animate-fade-up"
      style={{ left, top, maxWidth: `${popWidth}px` }}
      dir="rtl"
    >
      <div className="bg-card border border-border/70 shadow-book rounded-xl px-3 py-2 min-w-[240px] max-w-[300px] font-arabic">
        <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-1.5 mb-1.5">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            {single ? (
              <BookOpen className="h-3.5 w-3.5" />
            ) : (
              <Languages className="h-3.5 w-3.5" />
            )}
            <span>{single ? "ترجمة الكلمة" : "ترجمة الجملة"}</span>
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

        <div className="text-[12px] text-muted-foreground/80 mb-1.5 truncate" dir="ltr">
          {state.text}
        </div>

        {state.loading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-1">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>جارٍ الترجمة…</span>
          </div>
        ) : state.error ? (
          <div className="text-sm text-destructive">{state.error}</div>
        ) : state.result ? (
          <>
            <div className="text-base text-primary font-semibold leading-snug">
              {state.result.primary}
            </div>

            {state.result.isSingleWord && state.result.dictionary.length > 0 && (
              <div className="mt-2 pt-2 border-t border-border/40 space-y-1.5">
                {state.result.dictionary.map((entry, i) => (
                  <div key={i}>
                    {entry.pos && (
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 mb-0.5">
                        {POS_LABEL_AR[entry.pos] ?? entry.pos}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {entry.terms.map((t, j) => (
                        <span
                          key={j}
                          className="text-[12px] bg-muted/60 text-foreground/90 px-1.5 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : null}
      </div>
      <div className="w-2 h-2 bg-card border-l border-b border-border/70 rotate-[-45deg] mx-auto -mt-1" />
    </div>
  );
};
