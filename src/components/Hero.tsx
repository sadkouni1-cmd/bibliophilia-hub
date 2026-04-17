import heroImg from "@/assets/library-hero.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroImg} alt="مكتبة دافئة" width={1600} height={900} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-hero" />
    </div>
    <div className="container relative z-10 py-24 md:py-36 text-center text-primary-foreground">
      <p className="font-arabic text-accent text-lg mb-4 tracking-wide animate-fade-up">مرحباً بك في</p>
      <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold animate-fade-up" style={{ animationDelay: "0.1s" }}>
        Read With Bob
      </h1>
      <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/85 animate-fade-up" style={{ animationDelay: "0.2s" }}>
        مئات الكتب الصوتية العربية، روايات، فلسفة، كتب دينية وقصص للأطفال — بأربع لغات.
        <br />
        <span className="text-accent font-display italic text-xl">A library that reads like silk.</span>
      </p>
      <div className="mt-10 flex items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-book font-display text-base">
          <a href="#library">استكشف المكتبة</a>
        </Button>
        <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 font-display text-base">
          <Link to="/book/1">ابدأ القراءة</Link>
        </Button>
      </div>
    </div>
  </section>
);
