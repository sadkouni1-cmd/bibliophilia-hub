import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Star, Play, Pause, Square, BookOpen, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { BookReader } from "@/components/BookReader";
import { getBook, languages } from "@/data/books";
import { useFavorites } from "@/lib/library-storage";

const speechLangByBook = {
  ar: "ar-SA",
  fr: "fr-FR",
  en: "en-US",
  es: "es-ES",
} as const;

// Arabic narrator branding — maps friendly names to browser voice hints.
const arabicNarrators = [
  { id: "khaled", label: "خالد النجار", hints: ["Majed", "Maged", "male"] },
  { id: "islam", label: "إسلام عادل", hints: ["Tarik", "ar-EG"] },
  { id: "taha", label: "طه الحاج أحمد", hints: ["Naayf", "ar-XA"] },
  { id: "default", label: "الصوت الافتراضي للمتصفح", hints: [] },
] as const;
type NarratorId = typeof arabicNarrators[number]["id"];

const BookDetail = () => {
  const { id } = useParams();
  const book = getBook(id ?? "");
  const { isFavorite, toggleFavorite } = useFavorites();
  const [reading, setReading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.95);
  const [narrationPage, setNarrationPage] = useState(1);
  const [narratorId, setNarratorId] = useState<NarratorId>("khaled");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const speechActiveRef = useRef(false);
  const narrationPageRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const stopNarration = (resetToStart = false) => {
    speechActiveRef.current = false;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setPlaying(false);
    setPaused(false);
    if (resetToStart) {
      narrationPageRef.current = 0;
      setNarrationPage(1);
    }
  };

  useEffect(() => {
    return () => {
      speechActiveRef.current = false;
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (reading) stopNarration(false);
  }, [reading]);

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
  const speechLang = speechLangByBook[book.language];

  const selectedVoice = useMemo(() => {
    if (!voices.length) return null;
    const langPrefix = speechLang.split("-")[0];
    const langVoices = voices.filter((v) => v.lang?.toLowerCase().startsWith(langPrefix));
    if (book.language === "ar") {
      const narrator = arabicNarrators.find((n) => n.id === narratorId);
      if (narrator?.hints.length) {
        const matched = langVoices.find((v) =>
          narrator.hints.some((h) => v.name.toLowerCase().includes(h.toLowerCase()) || v.lang.toLowerCase().includes(h.toLowerCase()))
        );
        if (matched) return matched;
      }
      return langVoices[0] ?? voices[0];
    }
    return langVoices[0] ?? voices[0];
  }, [voices, narratorId, book.language, speechLang]);

  const buildUtterance = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = speechLang;
    u.rate = speechRate;
    u.pitch = 1;
    u.volume = 1;
    if (selectedVoice) u.voice = selectedVoice;
    return u;
  };

  const speakPage = (pageIndex: number) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const pageText = book.pages[pageIndex] ?? book.description;
    if (!pageText) {
      stopNarration(false);
      return;
    }
    const utterance = buildUtterance(pageText);
    utterance.onend = () => {
      if (!speechActiveRef.current) return;
      const nextIndex = pageIndex + 1;
      if (nextIndex >= book.pages.length) {
        stopNarration(false);
        return;
      }
      narrationPageRef.current = nextIndex;
      setNarrationPage(nextIndex + 1);
      speakPage(nextIndex);
    };
    utterance.onerror = () => stopNarration(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleAudioToggle = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (playing && !paused) {
      window.speechSynthesis.pause();
      setPaused(true);
      return;
    }
    if (paused) {
      window.speechSynthesis.resume();
      setPaused(false);
      return;
    }

    const startIndex = narrationPageRef.current;
    speechActiveRef.current = true;
    setPlaying(true);
    setPaused(false);
    setNarrationPage(startIndex + 1);
    window.speechSynthesis.cancel();
    speakPage(startIndex);
  };


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
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span>{book.pageCount} صفحة</span>
                {book.duration && <span>· {book.duration}</span>}
              </div>
              <p className={`mt-6 text-lg leading-relaxed text-foreground/80 ${isRTL ? "font-arabic" : ""}`}>
                {book.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {book.category === "audiobooks" && (
                  <>
                    <Button size="lg" onClick={handleAudioToggle} className="bg-accent text-accent-foreground hover:bg-accent/90 font-display text-base shadow-book">
                      {playing && !paused ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                      {playing ? (paused ? "متابعة" : "إيقاف مؤقت") : "استمع الآن"}
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => stopNarration(true)} disabled={!playing && !paused} className="font-display text-base">
                      إيقاف كامل
                    </Button>
                  </>
                )}
                <Button size="lg" onClick={() => setReading(true)} className="bg-primary text-primary-foreground hover:bg-primary/90 font-display text-base shadow-book">
                  <BookOpen className="h-5 w-5 mr-2" />
                  اقرأ الكتاب
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => toggleFavorite(book.id)}
                  className="font-display text-base"
                >
                  <Heart className={`h-5 w-5 mr-2 ${isFavorite(book.id) ? "fill-primary text-primary" : ""}`} />
                  {isFavorite(book.id) ? "في المفضلة" : "أضف للمفضلة"}
                </Button>
              </div>

              {book.category === "audiobooks" && (
                <div className="mt-6 p-4 rounded-lg bg-card border border-border shadow-soft">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-foreground">
                      {playing || paused ? `جاري السرد من الصفحة ${narrationPage} من ${book.pageCount}` : `جاهز للاستماع إلى ${book.pageCount} صفحة`}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">السرعة</span>
                      {[0.85, 0.95, 1.1].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => setSpeechRate(rate)}
                          className={`rounded-full border px-3 py-1 text-xs transition-smooth ${speechRate === rate ? "bg-accent text-accent-foreground border-accent" : "border-border text-muted-foreground hover:text-foreground"}`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-gold transition-all duration-500"
                      style={{ width: `${Math.max(3, (narrationPage / book.pageCount) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="animate-fade-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`font-display text-2xl md:text-3xl text-primary ${isRTL ? "font-arabic" : ""}`}>
                  {book.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">{book.pageCount} صفحة كاملة</p>
              </div>
              <Button variant="outline" onClick={() => setReading(false)}>إغلاق الكتاب</Button>
            </div>
            <BookReader pages={book.pages} isRTL={isRTL} bookId={book.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
