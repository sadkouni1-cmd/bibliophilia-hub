import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Star, Play, Pause, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { BookReader } from "@/components/BookReader";
import { getBook, languages } from "@/data/books";

const BookDetail = () => {
  const { id } = useParams();
  const book = getBook(id ?? "");
  const [reading, setReading] = useState(false);
  const [playing, setPlaying] = useState(false);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-3xl text-primary">الكتاب غير موجود</p>
          <Button asChild className="mt-4"><Link to="/">العودة</Link></Button>
        </div>
      </div>
    );
  }

  const isRTL = book.language === "ar";
  const lang = languages.find((l) => l.id === book.language);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container py-8">
        <Button asChild variant="ghost" className="mb-6 -ml-2">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>العودة إلى المكتبة</span>
          </Link>
        </Button>

        {!reading ? (
          <div className="grid md:grid-cols-[300px_1fr] gap-12 items-start">
            <div className="relative animate-float">
              <img src={book.cover} alt={book.title} width={600} height={800} className="w-full rounded-md shadow-book book-spine" />
            </div>
            <div className="animate-fade-up">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <span>{lang?.flag}</span>
                <span>{lang?.label}</span>
                <span>·</span>
                <span className="capitalize">{book.category}</span>
              </div>
              <h1 className={`font-display text-4xl md:text-6xl text-primary leading-tight ${isRTL ? "font-arabic" : ""}`}>
                {book.title}
              </h1>
              <p className="text-xl text-muted-foreground mt-3">{book.author}</p>
              <div className="flex items-center gap-1 mt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(book.rating) ? "fill-accent text-accent" : "text-muted"}`} />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">{book.rating} / 5</span>
              </div>
              <p className={`mt-6 text-lg leading-relaxed text-foreground/80 ${isRTL ? "font-arabic" : ""}`}>
                {book.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {book.category === "audiobooks" ? (
                  <Button size="lg" onClick={() => setPlaying(!playing)} className="bg-accent text-accent-foreground hover:bg-accent/90 font-display text-base shadow-book">
                    {playing ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                    {playing ? "إيقاف" : "استمع الآن"} {book.duration && `· ${book.duration}`}
                  </Button>
                ) : (
                  <Button size="lg" onClick={() => setReading(true)} className="bg-primary text-primary-foreground hover:bg-primary/90 font-display text-base shadow-book">
                    <BookOpen className="h-5 w-5 mr-2" />
                    ابدأ القراءة
                  </Button>
                )}
              </div>

              {playing && book.category === "audiobooks" && (
                <div className="mt-6 p-4 rounded-lg bg-card border border-border shadow-soft">
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-gradient-gold animate-pulse" />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>14:23</span>
                    <span>{book.duration}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="animate-fade-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className={`font-display text-2xl md:text-3xl text-primary ${isRTL ? "font-arabic" : ""}`}>
                {book.title}
              </h2>
              <Button variant="outline" onClick={() => setReading(false)}>إغلاق الكتاب</Button>
            </div>
            <BookReader pages={book.pages} isRTL={isRTL} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
