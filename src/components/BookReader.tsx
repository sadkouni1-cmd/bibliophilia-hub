import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const BookReader = ({ pages, isRTL }: { pages: string[]; isRTL: boolean }) => {
  const [spread, setSpread] = useState(0); // index of left page; right = left + 1
  const [flipping, setFlipping] = useState<"next" | "prev" | null>(null);

  const totalSpreads = Math.ceil(pages.length / 2);

  const flip = (dir: "next" | "prev") => {
    if (flipping) return;
    if (dir === "next" && spread + 1 >= totalSpreads) return;
    if (dir === "prev" && spread === 0) return;
    setFlipping(dir);
    setTimeout(() => {
      setSpread((s) => s + (dir === "next" ? 1 : -1));
      setFlipping(null);
    }, 500);
  };

  const left = pages[spread * 2];
  const right = pages[spread * 2 + 1];

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="relative w-full max-w-5xl aspect-[16/10] [perspective:2500px]"
        dir="ltr"
      >
        <div className="absolute inset-0 flex shadow-book rounded-lg overflow-hidden bg-gradient-page">
          {/* Left page */}
          <div className="relative flex-1 paper-texture page-shadow p-8 md:p-12 overflow-hidden border-r border-border/40">
            <div className={`h-full w-full ${isRTL ? "text-right font-arabic" : "text-left"} text-foreground/90 leading-relaxed whitespace-pre-line text-sm md:text-base`}>
              {left}
            </div>
            <div className="absolute bottom-3 left-0 right-0 text-center text-xs text-muted-foreground">
              {spread * 2 + 1}
            </div>
          </div>
          {/* Right page */}
          <div className="relative flex-1 paper-texture page-shadow p-8 md:p-12 overflow-hidden">
            <div className={`h-full w-full ${isRTL ? "text-right font-arabic" : "text-left"} text-foreground/90 leading-relaxed whitespace-pre-line text-sm md:text-base`}>
              {right}
            </div>
            <div className="absolute bottom-3 left-0 right-0 text-center text-xs text-muted-foreground">
              {spread * 2 + 2}
            </div>
          </div>
          {/* Center binding */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-6 bg-gradient-to-r from-foreground/15 via-foreground/30 to-foreground/15 pointer-events-none" />

          {/* Flipping page overlay */}
          {flipping && (
            <div
              className={`absolute top-0 ${flipping === "next" ? "right-0 origin-left" : "left-0 origin-right"} h-full w-1/2 bg-gradient-page paper-texture page-shadow`}
              style={{
                animation: `${flipping === "next" ? "page-flip" : "page-flip"} 0.5s forwards`,
                transformStyle: "preserve-3d",
                boxShadow: "0 0 30px hsl(24 40% 14% / 0.4)",
              }}
            />
          )}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Button variant="outline" size="icon" onClick={() => flip("prev")} disabled={spread === 0} className="rounded-full h-12 w-12">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <span className="font-display text-lg text-muted-foreground">
          {spread + 1} / {totalSpreads}
        </span>
        <Button variant="outline" size="icon" onClick={() => flip("next")} disabled={spread + 1 >= totalSpreads} className="rounded-full h-12 w-12">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
