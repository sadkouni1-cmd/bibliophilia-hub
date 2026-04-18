import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { getProgress, saveProgress } from "@/lib/library-storage";

export const BookReader = ({ pages, isRTL, bookId }: { pages: string[]; isRTL: boolean; bookId?: string }) => {
  const isMobile = useIsMobile();
  // On mobile we show 1 page per "spread"; on desktop we show 2 pages per spread.
  const pagesPerSpread = isMobile ? 1 : 2;
  const totalSpreads = Math.max(1, Math.ceil(pages.length / pagesPerSpread));

  const [spread, setSpread] = useState(() => {
    if (!bookId) return 0;
    const saved = getProgress(bookId);
    if (!saved) return 0;
    // saved.spread is stored relative to a 2-page spread; convert to current pagesPerSpread.
    const savedPageIndex = saved.spread * 2;
    return Math.min(Math.floor(savedPageIndex / (isMobile ? 1 : 2)), totalSpreads - 1);
  });

  // Re-clamp when layout switches between mobile/desktop.
  useEffect(() => {
    setSpread((s) => Math.min(s, totalSpreads - 1));
  }, [totalSpreads]);

  useEffect(() => {
    if (!bookId) return;
    // Always persist as a 2-page-spread value so it's stable across viewports.
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

  const left = pages[spread * pagesPerSpread];
  const right = !isMobile ? pages[spread * pagesPerSpread + 1] : undefined;

  const Page = ({ text, pageNumber }: { text?: string; pageNumber: number }) => (
    <div className="relative flex-1 paper-texture page-shadow p-5 sm:p-8 md:p-12 overflow-hidden">
      <div
        className={`h-full w-full overflow-y-auto ${isRTL ? "text-right font-arabic" : "text-left"} text-foreground/90 leading-relaxed whitespace-pre-line text-[13px] sm:text-sm md:text-base pb-8`}
      >
        {text}
      </div>
      <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] sm:text-xs text-muted-foreground">
        {pageNumber}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6">
      <div
        className="relative w-full max-w-5xl aspect-[3/4] sm:aspect-[16/10]"
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
