import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Search, Library, X, Sun, Moon, Info, BookMarked } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { AboutDialog } from "@/components/AboutDialog";

export const Header = ({ onSearch, search }: { onSearch?: (v: string) => void; search?: string }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme } = useTheme();

  // When opening the mobile search, focus after the overlay has mounted.
  useEffect(() => {
    if (searchOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      // Lock body scroll while overlay is open so the keyboard doesn't fight the page.
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    }
  }, [searchOpen]);

  // Close on Escape
  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="container flex h-14 sm:h-16 items-center gap-2 sm:gap-4 px-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2 group min-w-0">
            <div className="rounded-md bg-gradient-gold p-1.5 sm:p-2 shadow-soft group-hover:scale-110 transition-smooth shrink-0">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div className="flex flex-col leading-none min-w-0">
              <span className="font-display text-base sm:text-2xl font-semibold text-primary truncate">
                Read With Bob
              </span>
              <span className="hidden sm:block text-[10px] text-muted-foreground tracking-widest uppercase">
                by Ayoub Sadkouni
              </span>
            </div>
          </Link>

          {/* Desktop search */}
          {onSearch && (
            <div className="ml-auto hidden md:flex flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="ابحث عن كتاب أو مؤلف..."
                className="pl-9 bg-card/60 border-border/70"
              />
            </div>
          )}

          {/* Mobile search toggle */}
          {onSearch && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden ml-auto h-9 w-9"
              onClick={() => setSearchOpen(true)}
              aria-label="بحث"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          {(() => {
            const nextLabel =
              theme === "light" ? "وضع سيبيا" : theme === "sepia" ? "وضع ليلي" : "وضع نهاري";
            const Icon = theme === "light" ? BookMarked : theme === "sepia" ? Moon : Sun;
            return (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={`${onSearch ? "" : "ml-auto"} h-9 w-9 shrink-0`}
                aria-label={nextLabel}
                title={nextLabel}
              >
                <Icon className="h-5 w-5" />
              </Button>
            );
          })()}

          <AboutDialog
            trigger={
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 shrink-0"
                aria-label="حول التطبيق"
                title="حول التطبيق"
              >
                <Info className="h-5 w-5" />
              </Button>
            }
          />

          <Button asChild variant="ghost" size="sm" className="px-2 sm:px-3">
            <Link to="/my-books" className="flex items-center gap-1.5 sm:gap-2">
              <Library className="h-4 w-4" />
              <span className="font-display text-sm sm:text-base hidden sm:inline">كتبي</span>
            </Link>
          </Button>
        </div>
      </header>

      {/* Mobile fullscreen search overlay — robust against keyboard layout shifts */}
      {onSearch && searchOpen && (
        <div
          className="md:hidden fixed inset-0 z-[100] bg-background flex flex-col animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center gap-2 px-3 py-3 border-b border-border/60 bg-background">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 shrink-0"
              onClick={() => setSearchOpen(false)}
              aria-label="إغلاق"
            >
              <X className="h-5 w-5" />
            </Button>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                ref={inputRef}
                value={search ?? ""}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="ابحث عن كتاب أو مؤلف..."
                inputMode="search"
                enterKeyHint="search"
                autoComplete="off"
                style={{ fontSize: "16px" }}
                className="w-full h-11 rounded-md border border-border/70 bg-card pl-9 pr-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>
          {/* Tap outside (below) to close */}
          <button
            type="button"
            aria-label="إغلاق"
            className="flex-1 bg-background/60"
            onClick={() => setSearchOpen(false)}
          />
        </div>
      )}
    </>
  );
};
