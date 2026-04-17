import { Link } from "react-router-dom";
import { BookOpen, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Header = ({ onSearch, search }: { onSearch?: (v: string) => void; search?: string }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container flex h-16 items-center gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="rounded-md bg-gradient-gold p-2 shadow-soft group-hover:scale-110 transition-smooth">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-2xl font-semibold text-primary">Read With Bob</span>
            <span className="text-[10px] text-muted-foreground tracking-widest uppercase">by Ayoub Sadkouni</span>
          </div>
        </Link>
        {onSearch && (
          <div className="ml-auto flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="ابحث عن كتاب أو مؤلف..."
              className="pl-9 bg-card/60 border-border/70"
            />
          </div>
        )}
      </div>
    </header>
  );
};
