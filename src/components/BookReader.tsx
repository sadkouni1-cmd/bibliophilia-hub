import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, AArrowDown, AArrowUp, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { getProgress, saveProgress } from "@/lib/library-storage";

type FontSize = "sm" | "md" | "lg" | "xl";

const FONT_STORAGE_KEY = "rwb-reader-font-size";

const FONT_SIZE_ORDER: FontSize[] = ["sm", "md", "lg", "xl"];

const FONT_SIZE_LABEL: Record<FontSize, string> = {
  sm: "صغير",
  md: "متوسط",
  lg: "كبير",
  xl: "كبير جدًا",
};

// Tailwind classes per size — mobile first, scales up on larger screens.
const FONT_SIZE_CLASS: Record<FontSize, string> = {
  sm: "text-[12px] sm:text-[13px] md:text-sm leading-relaxed",
  md: "text-[14px] sm:text-[15px] md:text-base leading-relaxed",
  lg: "text-[16px] sm:text-[18px] md:text-lg leading-loose",
  xl: "text-[18px] sm:text-[20px] md:text-xl leading-loose",
};

function loadFontSize(): FontSize {
  if (typeof window === "undefined") return "md";
  const v = window.localStorage.getItem(FONT_STORAGE_KEY) as FontSize | null;
  return v && FONT_SIZE_ORDER.includes(v) ? v : "md";
}

export const BookReader = ({ pages, isRTL, bookId }: { pages: string[]; isRTL: boolean; bookId?: string }) => {
  const isMobile = useIsMobile();
  // On mobile we show 1 page per "spread"; on desktop we show 2 pages per spread.
  const pagesPerSpread = isMobile ? 1 : 2;
  const totalSpreads = Math.max(1, Math.ceil(pages.length / pagesPerSpread));

  const [spread, setSpread] = useState(() => {
    if (!bookId) return 0;
    const saved = getProgress(bookId);
    if (!saved) return 0;
    const savedPageIndex = saved.spread * 2;
    return Math.min(Math.floor(savedPageIndex / (isMobile ? 1 : 2)), totalSpreads - 1);
  });

  const [fontSize, setFontSize] = useState<FontSize>(() => loadFontSize());

  // Persist font size
  useEffect(() => {
    try {
      window.localStorage.setItem(FONT_STORAGE_KEY, fontSize);
    } catch {
      /* ignore */
    }
  }, [fontSize]);

  // Re-clamp when layout switches between mobile/desktop.
  useEffect(() => {
    setSpread((s) => Math.min(s, totalSpreads - 1));
  }, [totalSpreads]);

  useEffect(() => {
    if (!bookId) return;
    const pageIndex = spread * pagesPerSpread;
    const normalizedSpread = Math.floor(pageIndex / 2);
    const normalizedTotal = Math.max(1, Math.ceil(pages.length / 2));
    saveProgress(bookId, normalizedSpread, normalizedTotal);
  }, [bookId, spread, pagesPerSpread, pages.length]);

  const go = (dir: "next" | "prev") => {
    setSpread((s) => {
      if (dir === "next") return Math.min(s + 1, totalSpreads - 1);
      return Math.max(s - 1, 0);
    });
  };

  const adjustFont = (dir: "inc" | "dec") => {
    setFontSize((cur) => {
      const idx = FONT_SIZE_ORDER.indexOf(cur);
      if (dir === "inc") return FONT_SIZE_ORDER[Math.min(idx + 1, FONT_SIZE_ORDER.length - 1)];
      return FONT_SIZE_ORDER[Math.max(idx - 1, 0)];
    });
  };

  const left = pages[spread * pagesPerSpread];
  const right = !isMobile ? pages[spread * pagesPerSpread + 1] : undefined;

  const Page = ({ text, pageNumber }: { text?: string; pageNumber: number }) => (
    <div className="relative flex-1 bg-card paper-texture page-shadow p-5 sm:p-8 md:p-12 overflow-hidden">
      <div
        className={`h-full w-full overflow-y-auto ${isRTL ? "text-right font-arabic" : "text-left"} text-card-foreground whitespace-pre-line ${FONT_SIZE_CLASS[fontSize]} pb-8`}
      >
        {text}
      </div>
      <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] sm:text-xs text-muted-foreground">
        {pageNumber}
      </div>
    </div>
  );

  const fontIdx = FONT_SIZE_ORDER.indexOf(fontSize);

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6">
      {/* Font size controls */}
      <div className="flex items-center gap-2 self-end sm:self-center bg-card/80 border border-border/60 rounded-full px-2 py-1 shadow-soft">
        <Type className="h-4 w-4 text-muted-foreground mx-1 hidden sm:inline-block" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => adjustFont("dec")}
          disabled={fontIdx === 0}
          className="h-8 w-8 rounded-full"
          aria-label="تصغير الخط"
          title="تصغير الخط"
        >
          <AArrowDown className="h-4 w-4" />
        </Button>
        <span className="text-xs sm:text-sm text-muted-foreground tabular-nums min-w-[3.5rem] text-center font-display">
          {FONT_SIZE_LABEL[fontSize]}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => adjustFont("inc")}
          disabled={fontIdx === FONT_SIZE_ORDER.length - 1}
          className="h-8 w-8 rounded-full"
          aria-label="تكبير الخط"
          title="تكبير الخط"
        >
          <AArrowUp className="h-4 w-4" />
        </Button>
      </div>

      <div
        className="relative w-full max-w-5xl h-[calc(100vh-13rem)] sm:h-auto sm:aspect-[16/10]"
        dir="ltr"
      >
        <div className="absolute inset-0 flex shadow-book rounded-lg overflow-hidden bg-gradient-page">
          <Page text={left} pageNumber={spread * pagesPerSpread + 1} />
          {!isMobile && (
            <>
              <div className="w-px bg-border/40" />
              <Page text={right} pageNumber={spread * pagesPerSpread + 2} />
              <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-4 sm:w-6 bg-gradient-to-r from-foreground/15 via-foreground/30 to-foreground/15 pointer-events-none" />
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6 w-full justify-center">
        <Button
          variant="outline"
          size="icon"
          onClick={() => go("prev")}
          disabled={spread === 0}
          className="rounded-full h-10 w-10 sm:h-12 sm:w-12"
          aria-label="السابق"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <span className="font-display text-base sm:text-lg text-muted-foreground tabular-nums">
          {spread + 1} / {totalSpreads}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => go("next")}
          disabled={spread + 1 >= totalSpreads}
          className="rounded-full h-10 w-10 sm:h-12 sm:w-12"
          aria-label="التالي"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
