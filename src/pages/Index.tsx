import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BookCard } from "@/components/BookCard";
import { books, categories, languages, type Category, type Lang } from "@/data/books";
import { cn } from "@/lib/utils";

const Index = () => {
  const [activeCat, setActiveCat] = useState<Category | "all">("all");
  const [activeLang, setActiveLang] = useState<Lang | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return books.filter((b) => {
      if (activeCat !== "all" && b.category !== activeCat) return false;
      if (activeLang !== "all" && b.language !== activeLang) return false;
      if (search && !`${b.title} ${b.author}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [activeCat, activeLang, search]);

  // Group by author when the user is inside a specific section (or searching),
  // so that each author appears as a header with their books listed beneath.
  const groupedByAuthor = useMemo(() => {
    if (activeCat === "all" && !search) return null;
    const map = new Map<string, typeof filtered>();
    for (const b of filtered) {
      const list = map.get(b.author) ?? [];
      list.push(b);
      map.set(b.author, list);
    }
    return Array.from(map.entries())
      .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0], "ar"));
  }, [filtered, activeCat, search]);

  return (
    <div className="min-h-screen">
      <Header onSearch={setSearch} search={search} />
      <Hero />

      <main id="library" className="container py-16">
        {/* Category strip */}
        <div className="mb-8">
          <h2 className="font-display text-3xl md:text-4xl text-primary mb-2">الأقسام</h2>
          <p className="text-muted-foreground mb-6">اختر القسم الذي يناسب مزاجك اليوم</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveCat("all")}
              className={cn(
                "px-5 py-2.5 rounded-full font-display text-base transition-smooth shadow-soft",
                activeCat === "all" ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-secondary"
              )}
            >
              الكل
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={cn(
                  "px-5 py-2.5 rounded-full font-display text-base transition-smooth shadow-soft flex items-center gap-2",
                  activeCat === c.id ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-secondary"
                )}
              >
                <span>{c.icon}</span>
                <span>{c.label}</span>
                <span className="text-xs opacity-70">· {c.labelEn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Language filter */}
        <div className="mb-12 flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground mr-2">اللغة:</span>
          <button
            onClick={() => setActiveLang("all")}
            className={cn(
              "px-3 py-1 rounded-full text-sm transition-smooth border",
              activeLang === "all" ? "bg-accent text-accent-foreground border-accent" : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            All
          </button>
          {languages.map((l) => (
            <button
              key={l.id}
              onClick={() => setActiveLang(l.id)}
              className={cn(
                "px-3 py-1 rounded-full text-sm transition-smooth border flex items-center gap-1.5",
                activeLang === l.id ? "bg-accent text-accent-foreground border-accent" : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>

        {/* Books grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="font-display text-2xl">لا توجد كتب مطابقة</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
            {filtered.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-border/60 mt-20 py-10 text-center text-sm text-muted-foreground">
        <p className="font-display text-2xl text-primary">Read With Bob</p>
        <p className="mt-2">صُنعت بحب للقراء حول العالم — Developed by <span className="text-foreground font-medium">Ayoub Sadkouni</span></p>
      </footer>
    </div>
  );
};

export default Index;
