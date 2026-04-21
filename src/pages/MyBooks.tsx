import { Link } from "react-router-dom";
import { Heart, BookOpen, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { BookCard } from "@/components/BookCard";
import { books } from "@/data/books";
import { useFavorites, useProgressMap, clearProgress } from "@/lib/library-storage";
import { useState } from "react";

const MyBooks = () => {
  const { favorites } = useFavorites();
  const progress = useProgressMap();
  const [, force] = useState(0);

  const favoriteBooks = books.filter((b) => favorites.includes(b.id));

  const inProgressEntries = Object.entries(progress)
    .map(([id, p]) => ({ book: books.find((b) => b.id === id), progress: p }))
    .filter((e) => e.book && e.progress.spread > 0)
    .sort((a, b) => b.progress.updatedAt - a.progress.updatedAt);

  const handleClear = (id: string) => {
    clearProgress(id);
    force((n) => n + 1);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-8 sm:py-12 px-4 sm:px-6">
        <Button
          asChild
          variant="default"
          size="lg"
          className="mb-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft font-display h-11 px-5"
        >
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span>العودة إلى المكتبة</span>
          </Link>
        </Button>
        <div className="mb-10 sm:mb-12 text-center">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-primary">كتبي</h1>
          <p className="text-muted-foreground mt-3">المفضلة وآخر صفحة قُرئت — محفوظة على جهازك</p>
        </div>

        {/* Continue reading */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="font-display text-3xl text-primary">تابع القراءة</h2>
            <span className="text-sm text-muted-foreground">({inProgressEntries.length})</span>
          </div>

          {inProgressEntries.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-card/40 p-10 text-center">
              <p className="font-display text-xl text-muted-foreground">لم تبدأ بعد أي كتاب</p>
              <Button asChild className="mt-4">
                <Link to="/">استكشف المكتبة</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {inProgressEntries.map(({ book, progress: p }) => {
                if (!book) return null;
                const percent = Math.min(100, Math.round(((p.spread + 1) / Math.max(1, p.totalSpreads)) * 100));
                return (
                  <div key={book.id} className="flex gap-4 rounded-lg border border-border bg-card p-4 shadow-soft">
                    <Link to={`/book/${book.id}`} className="shrink-0">
                      <img src={book.cover} alt={book.title} className="h-24 w-16 object-cover rounded shadow-book book-spine" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/book/${book.id}`}>
                        <h3 className="font-display text-xl text-foreground hover:text-primary transition-smooth line-clamp-1">
                          {book.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-muted-foreground">{book.author}</p>
                      <div className="mt-3">
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-gold transition-all" style={{ width: `${percent}%` }} />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                          <span>صفحة {p.spread * 2 + 1} من {p.totalSpreads * 2}</span>
                          <span>{percent}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <Button asChild size="sm">
                        <Link to={`/book/${book.id}`}>متابعة</Link>
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleClear(book.id)} aria-label="حذف التقدم">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Favorites */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Heart className="h-5 w-5 text-primary fill-primary" />
            <h2 className="font-display text-3xl text-primary">المفضلة</h2>
            <span className="text-sm text-muted-foreground">({favoriteBooks.length})</span>
          </div>

          {favoriteBooks.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-card/40 p-10 text-center">
              <p className="font-display text-xl text-muted-foreground">لا توجد كتب في المفضلة بعد</p>
              <p className="text-sm text-muted-foreground mt-2">اضغط على رمز القلب على أي كتاب لإضافته هنا</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
              {favoriteBooks.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-border/60 mt-20 py-10 text-center text-sm text-muted-foreground">
        <p className="font-display text-2xl text-primary">Read With Bob</p>
        <p className="mt-2">Developed by <span className="text-foreground font-medium">Ayoub Sadkouni</span></p>
      </footer>
    </div>
  );
};

export default MyBooks;
