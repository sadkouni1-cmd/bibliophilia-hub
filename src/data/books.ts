import religious from "@/assets/cover-religious.jpg";
import philosophy from "@/assets/cover-philosophy.jpg";
import children from "@/assets/cover-children.jpg";
import stories from "@/assets/cover-stories.jpg";
import audio from "@/assets/cover-audio.jpg";
import novel from "@/assets/cover-novel.jpg";

export type Category = "religious" | "philosophy" | "children" | "stories" | "audiobooks" | "novels";
export type Lang = "ar" | "fr" | "en" | "es";

export interface Book {
  id: string;
  title: string;
  author: string;
  category: Category;
  language: Lang;
  cover: string;
  description: string;
  pages: string[]; // each string is one page of content
  duration?: string; // for audiobooks
  rating: number;
}

const lorem = (seed: string, n = 6) =>
  Array.from({ length: n }, (_, i) =>
    `${seed} — Chapter ${i + 1}\n\nIn the silence of the early morning, a thought emerged like a candle lit in an old library. The reader turned the page slowly, savoring each word as if it were a rare wine. Time itself seemed to slow, suspended between the lines of ink and the breath of imagination.\n\nThrough centuries of wisdom and wonder, stories have shaped the human soul. They teach us, comfort us, and remind us that we are never truly alone. Each chapter is a doorway, each paragraph a path, each sentence a small light against the vast darkness of the unknown.\n\nAnd so we read on, page after page, drawn forward by curiosity and the quiet promise that something beautiful awaits at the turn of the next leaf.`
  );

export const categories: { id: Category; label: string; labelEn: string; color: string; icon: string }[] = [
  { id: "religious", label: "ديني", labelEn: "Religious", color: "hsl(var(--cat-religious))", icon: "📿" },
  { id: "philosophy", label: "فلسفة", labelEn: "Philosophy", color: "hsl(var(--cat-philosophy))", icon: "🏛️" },
  { id: "children", label: "أطفال", labelEn: "Children", color: "hsl(var(--cat-children))", icon: "🦊" },
  { id: "stories", label: "قصص قصيرة", labelEn: "Short Stories", color: "hsl(var(--cat-stories))", icon: "📖" },
  { id: "audiobooks", label: "كتب صوتية", labelEn: "Audiobooks", color: "hsl(var(--cat-audio))", icon: "🎧" },
  { id: "novels", label: "روايات", labelEn: "Novels", color: "hsl(var(--cat-novel))", icon: "🌅" },
];

export const languages: { id: Lang; label: string; flag: string }[] = [
  { id: "ar", label: "العربية", flag: "🇸🇦" },
  { id: "fr", label: "Français", flag: "🇫🇷" },
  { id: "en", label: "English", flag: "🇬🇧" },
  { id: "es", label: "Español", flag: "🇪🇸" },
];

export const books: Book[] = [
  { id: "1", title: "إحياء علوم الدين", author: "أبو حامد الغزالي", category: "religious", language: "ar", cover: religious, description: "رحلة روحية خالدة في تزكية النفس وإحياء القلب.", pages: lorem("Ihya"), rating: 4.9 },
  { id: "2", title: "Le Coran — Traduction", author: "Traduction française", category: "religious", language: "fr", cover: religious, description: "Une traduction poétique et fidèle du texte sacré.", pages: lorem("Coran"), rating: 4.8 },
  { id: "3", title: "The Bible — King James", author: "Classic Edition", category: "religious", language: "en", cover: religious, description: "The timeless King James translation of the Holy Bible.", pages: lorem("Bible"), rating: 4.9 },

  { id: "4", title: "Méditations", author: "Marc Aurèle", category: "philosophy", language: "fr", cover: philosophy, description: "Les pensées intimes d'un empereur philosophe stoïcien.", pages: lorem("Meditations"), rating: 4.9 },
  { id: "5", title: "Beyond Good and Evil", author: "Friedrich Nietzsche", category: "philosophy", language: "en", cover: philosophy, description: "A bold critique of moral philosophy and modern thought.", pages: lorem("Nietzsche"), rating: 4.7 },
  { id: "6", title: "El Mundo de Sofía", author: "Jostein Gaarder", category: "philosophy", language: "es", cover: philosophy, description: "Un viaje fascinante por la historia de la filosofía.", pages: lorem("Sofia"), rating: 4.8 },
  { id: "7", title: "تهافت الفلاسفة", author: "أبو حامد الغزالي", category: "philosophy", language: "ar", cover: philosophy, description: "نقد فلسفي عميق لأفكار الفلاسفة المسلمين.", pages: lorem("Tahafut"), rating: 4.6 },

  { id: "8", title: "Le Petit Prince", author: "Antoine de Saint-Exupéry", category: "children", language: "fr", cover: children, description: "Une fable poétique pour les enfants et les rêveurs.", pages: lorem("Petit Prince"), rating: 5.0 },
  { id: "9", title: "Where the Wild Things Are", author: "Maurice Sendak", category: "children", language: "en", cover: children, description: "A magical journey to the land of wild creatures.", pages: lorem("Wild Things"), rating: 4.8 },
  { id: "10", title: "El Principito", author: "Antoine de Saint-Exupéry", category: "children", language: "es", cover: children, description: "Una historia de amistad, amor y descubrimiento.", pages: lorem("Principito"), rating: 5.0 },
  { id: "11", title: "حكايات جدتي", author: "مجموعة قصص", category: "children", language: "ar", cover: children, description: "قصص جميلة قبل النوم للأطفال الصغار.", pages: lorem("Hikayat"), rating: 4.7 },

  { id: "12", title: "Nouvelles complètes", author: "Guy de Maupassant", category: "stories", language: "fr", cover: stories, description: "Un recueil des plus belles nouvelles de Maupassant.", pages: lorem("Maupassant"), rating: 4.7 },
  { id: "13", title: "The Great Short Stories", author: "Edgar Allan Poe", category: "stories", language: "en", cover: stories, description: "Dark, mysterious, and unforgettable tales.", pages: lorem("Poe"), rating: 4.8 },
  { id: "14", title: "Cuentos de Borges", author: "Jorge Luis Borges", category: "stories", language: "es", cover: stories, description: "Laberintos literarios de uno de los grandes maestros.", pages: lorem("Borges"), rating: 4.9 },

  { id: "15", title: "Don Quijote (Audio)", author: "Miguel de Cervantes", category: "audiobooks", language: "es", cover: audio, description: "La obra maestra narrada con voz cálida y profunda.", pages: lorem("Quijote"), duration: "42h 18m", rating: 4.9 },
  { id: "16", title: "Les Misérables (Audio)", author: "Victor Hugo", category: "audiobooks", language: "fr", cover: audio, description: "Le chef-d'œuvre de Hugo, narré avec passion.", pages: lorem("Miserables"), duration: "60h 45m", rating: 4.9 },
  { id: "17", title: "Pride and Prejudice (Audio)", author: "Jane Austen", category: "audiobooks", language: "en", cover: audio, description: "A beloved classic, beautifully narrated.", pages: lorem("Pride"), duration: "11h 35m", rating: 4.8 },

  { id: "18", title: "L'Étranger", author: "Albert Camus", category: "novels", language: "fr", cover: novel, description: "Un roman existentiel inoubliable sous le soleil d'Alger.", pages: lorem("Etranger"), rating: 4.8 },
  { id: "19", title: "1984", author: "George Orwell", category: "novels", language: "en", cover: novel, description: "A chilling vision of a totalitarian future.", pages: lorem("1984"), rating: 4.9 },
  { id: "20", title: "Cien años de soledad", author: "Gabriel García Márquez", category: "novels", language: "es", cover: novel, description: "El realismo mágico en su forma más pura.", pages: lorem("Cien"), rating: 5.0 },
  { id: "21", title: "موسم الهجرة إلى الشمال", author: "الطيب صالح", category: "novels", language: "ar", cover: novel, description: "رواية عربية خالدة عن الهوية والاغتراب.", pages: lorem("Mawsim"), rating: 4.9 },
];

export const getBook = (id: string) => books.find((b) => b.id === id);
