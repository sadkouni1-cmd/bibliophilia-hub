import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Search, Library, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Header = ({ onSearch, search }: { onSearch?: (v: string) => void; search?: string }) => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
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
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="بحث"
          >
            {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </Button>
        )}

        <Button asChild variant="ghost" size="sm" className={onSearch ? "px-2 sm:px-3" : "ml-auto px-2 sm:px-3"}>
          <Link to="/my-books" className="flex items-center gap-1.5 sm:gap-2">
            <Library className="h-4 w-4" />
            <span className="font-display text-sm sm:text-base">كتبي</span>
          </Link>
        </Button>
      </div>

      {/* Mobile expanding search */}
      {onSearch && searchOpen && (
        <div className="md:hidden border-t border-border/60 bg-background/95 px-3 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              autoFocus
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="ابحث عن كتاب أو مؤلف..."
              className="pl-9 bg-card/60 border-border/70 h-10"
            />
          </div>
        </div>
      )}
    </header>
  );
};
