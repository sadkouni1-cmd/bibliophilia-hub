import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { BookCard } from "@/components/BookCard";
import { books, languages } from "@/data/books";

interface WikiSummary {
  title: string;
  description?: string;
  extract: string;
  thumbnail?: { source: string };
  content_urls?: { desktop?: { page?: string } };
  lang: string;
}

const LANG_ORDER = ["ar", "en", "fr", "es"] as const;

async function fetchWiki(name: string): Promise<WikiSummary | null> {
  for (const lang of LANG_ORDER) {
    try {
      const res = await fetch(
        `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`
      );
      if (!res.ok) continue;
      const data = await res.json();
      if (data?.extract && data.type !== "disambiguation") {
        return { ...data, lang };
      }
    } catch {
      /* try next lang */
    }
  }
  return null;
}

const AuthorDetail = () => {
  const { name } = useParams();
  const decoded = decodeURIComponent(name ?? "");
  const authorBooks = books.filter((b) => b.author === decoded);
  const [bio, setBio] = useState<WikiSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setBio(null);
    fetchWiki(decoded).then((data) => {
      if (alive) {
        setBio(data);
        setLoading(false);
      }
    });
    return () => {
      alive = false;
    };
  }, [decoded]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-6 sm:py-10 px-4 sm:px-6">
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

        <section className="grid sm:grid-cols-[160px_1fr] md:grid-cols-[200px_1fr] gap-5 sm:gap-8 items-start animate-fade-up">
          <div className="mx-auto sm:mx-0 w-32 sm:w-full aspect-square overflow-hidden rounded-full border-4 border-primary/30 shadow-book bg-card flex items-center justify-center">
            {bio?.thumbnail?.source ? (
              <img
                src={bio.thumbnail.source}
                alt={decoded}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <User className="h-16 w-16 text-muted-foreground" />
            )}
          </div>

          <div className="min-w-0">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-primary leading-tight">
              {decoded}
            </h1>
            {bio?.description && (
              <p className="text-sm sm:text-base text-muted-foreground mt-2 italic">
                {bio.description}
              </p>
            )}

            <div className="mt-4 sm:mt-6">
              {loading ? (
                <div className="space-y-2">
                  <div className="h-4 bg-muted/60 rounded animate-pulse w-full" />
                  <div className="h-4 bg-muted/60 rounded animate-pulse w-11/12" />
                  <div className="h-4 bg-muted/60 rounded animate-pulse w-9/12" />
                </div>
              ) : bio ? (
                <>
                  <p
                    className={`text-base sm:text-lg leading-relaxed text-foreground/85 whitespace-pre-line ${
                      bio.lang === "ar" ? "font-arabic text-right" : ""
                    }`}
                  >
                    {bio.extract}
                  </p>
                  {bio.content_urls?.desktop?.page && (
                    <a
                      href={bio.content_urls.desktop.page}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mt-3"
                    >
                      اقرأ المزيد على ويكيبيديا
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </>
              ) : (
                <p className="text-muted-foreground">
                  لا تتوفر سيرة ذاتية لهذا المؤلف حاليًا.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mt-12 sm:mt-16">
          <div className="flex items-baseline justify-between mb-4 sm:mb-6 border-b border-border/60 pb-2">
            <h2 className="font-display text-2xl sm:text-3xl text-primary">
              كتب المؤلف
            </h2>
            <span className="text-xs sm:text-sm text-muted-foreground">
              {authorBooks.length} كتاب
            </span>
          </div>
          {authorBooks.length === 0 ? (
            <p className="text-muted-foreground text-center py-10">
              لا توجد كتب لهذا المؤلف في المكتبة.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-10">
              {authorBooks.map((b) => {
                const lang = languages.find((l) => l.id === b.language);
                return (
                  <div key={b.id}>
                    <BookCard book={b} />
                    <p className="text-[10px] text-muted-foreground mt-1 px-1">
                      {lang?.flag} {lang?.label}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AuthorDetail;
