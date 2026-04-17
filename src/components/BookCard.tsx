import { Link } from "react-router-dom";
import { Star, Headphones } from "lucide-react";
import type { Book } from "@/data/books";

export const BookCard = ({ book }: { book: Book }) => {
  return (
    <Link
      to={`/book/${book.id}`}
      className="group block animate-fade-up"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-md shadow-book transition-smooth group-hover:-translate-y-2 group-hover:rotate-1 duration-500">
        <img
          src={book.cover}
          alt={book.title}
          loading="lazy"
          className="h-full w-full object-cover transition-smooth group-hover:scale-105"
        />
        <div className="book-spine absolute inset-0 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
        {book.category === "audiobooks" && (
          <div className="absolute top-2 right-2 rounded-full bg-accent text-accent-foreground p-1.5 shadow-soft">
            <Headphones className="h-3.5 w-3.5" />
          </div>
        )}
        <div className="absolute bottom-2 left-2 right-2 text-primary-foreground opacity-0 group-hover:opacity-100 transition-smooth">
          <p className="text-xs line-clamp-2">{book.description}</p>
        </div>
      </div>
      <div className="mt-3 px-1">
        <h3 className="font-display text-lg leading-tight text-foreground line-clamp-2 group-hover:text-primary transition-smooth">
          {book.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">{book.author}</p>
        <div className="flex items-center gap-1 mt-1.5">
          <Star className="h-3 w-3 fill-accent text-accent" />
          <span className="text-xs text-muted-foreground">{book.rating}</span>
          {book.duration && <span className="text-xs text-muted-foreground ml-2">• {book.duration}</span>}
        </div>
      </div>
    </Link>
  );
};
