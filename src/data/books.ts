import religious from "@/assets/cover-religious.jpg";
import philosophy from "@/assets/cover-philosophy.jpg";
import childrenCover from "@/assets/cover-children.jpg";
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
  pages: string[];
  duration?: string;
  rating: number;
}

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

const coverFor = (cat: Category) => {
  switch (cat) {
    case "religious": return religious;
    case "philosophy": return philosophy;
    case "children": return childrenCover;
    case "stories": return stories;
    case "audiobooks": return audio;
    case "novels": return novel;
  }
};

/* ----------- Page generators (rich, language-aware, multi-chapter) ----------- */

const arParagraphs = [
  "في صمت الفجر، حين يلتفّ النور حول العالم كحجاب رقيق، يفتح القارئ كتابه كما يفتح المسافر بابًا قديمًا على حديقة لم يزرها من قبل. كل كلمة تنبت كزهرة، وكل سطر يصير ممرًّا بين أشجار المعنى.",
  "قال أحد الحكماء: من قرأ كتابًا فقد عاش حياة إضافية. وفي هذا الكتاب حياةٌ كاملة بأفراحها وأحزانها، ببداياتها التي تشبه شروق الشمس ونهاياتها التي تشبه آخر نَفَسٍ من شمعة.",
  "ليست الكلمات حروفًا تُرصف، بل أرواحٌ تتنفّس. حين تقرأها بقلبك، تسمع نبضها، وحين تقرأها بعقلك، ترى ضوءها يتسلّل إلى أعمق زوايا فكرك.",
  "تعلّمنا من القدماء أن الحكمة لا تُورَث ولا تُشترى، بل تُلتقط كما يلتقط الطفل الصدفة من الشاطئ، بصبر وفرحٍ ودهشة.",
  "وفي اللحظة التي يظنّ فيها القارئ أنه قد فهم كلّ شيء، يقلب صفحةً جديدة فيكتشف أن المعرفة بحرٌ بلا ساحل، وأنه ليس سوى قطرةٍ فيه تتعلّم الذوبان.",
  "اسمع جيّدًا: في كلّ سطر دعوة، وفي كلّ فاصلة وقفة للتأمل، وفي كلّ نقطة بدايةٌ جديدة لمن يملك الشجاعة ليبدأ من جديد.",
];

const enParagraphs = [
  "In the quiet hours before dawn, when the world still rests under a soft veil of light, a reader opens a book the way a traveler pushes a centuries-old door into a garden he has never visited. Each word blossoms; each line becomes a path between trees of meaning.",
  "A wise man once said that to read a book is to live an extra life. Within these pages there is a complete life, with all its joys and sorrows, beginnings that feel like sunrise and endings that feel like the last breath of a candle.",
  "Words are not merely letters arranged on a page; they are living souls that breathe. Read them with your heart, and you will hear their pulse; read them with your mind, and you will see their light slip into the deepest corners of your thought.",
  "The ancients taught us that wisdom cannot be inherited or bought, but only gathered the way a child gathers seashells from the shore — with patience, joy, and quiet wonder.",
  "And just when the reader believes he has understood everything, he turns one more page and discovers that knowledge is a sea without shore, and he is but a single drop within it, learning at last how to dissolve.",
  "Listen carefully: in every line there is an invitation, in every comma a pause for reflection, and in every full stop a new beginning for the one brave enough to begin again.",
];

const frParagraphs = [
  "Dans le silence précédant l'aube, lorsque le monde repose encore sous un voile de lumière, le lecteur ouvre son livre comme un voyageur pousse la porte centenaire d'un jardin qu'il n'a jamais visité. Chaque mot s'épanouit, chaque ligne devient un sentier entre les arbres du sens.",
  "Un sage a dit qu'ouvrir un livre, c'est vivre une vie supplémentaire. Dans ces pages se trouve une vie entière, avec ses joies, ses peines, ses commencements pareils à l'aurore et ses fins semblables au dernier souffle d'une bougie.",
  "Les mots ne sont pas de simples lettres alignées : ce sont des âmes qui respirent. Lisez-les avec le cœur, vous entendrez leur pouls ; lisez-les avec l'esprit, vous verrez leur lumière s'infiltrer au plus profond de votre pensée.",
  "Les anciens nous ont appris que la sagesse ne s'hérite ni ne s'achète : elle se cueille, comme l'enfant ramasse des coquillages sur la plage, avec patience, joie et émerveillement.",
  "Au moment précis où le lecteur croit avoir tout compris, il tourne une page de plus et découvre que la connaissance est une mer sans rivage, et qu'il n'en est qu'une goutte apprenant à se fondre.",
  "Écoutez bien : dans chaque ligne il y a une invitation, dans chaque virgule une pause de méditation, et dans chaque point un commencement nouveau pour celui qui ose recommencer.",
];

const esParagraphs = [
  "En el silencio que precede al alba, cuando el mundo aún descansa bajo un velo de luz, el lector abre su libro como un viajero empuja la puerta centenaria de un jardín nunca visitado. Cada palabra florece, cada línea se vuelve un sendero entre árboles de significado.",
  "Dijo un sabio que abrir un libro es vivir una vida adicional. En estas páginas hay una vida entera, con sus alegrías y tristezas, comienzos como amaneceres y finales como el último aliento de una vela.",
  "Las palabras no son letras alineadas: son almas que respiran. Léelas con el corazón y escucharás su pulso; léelas con la mente y verás su luz colarse en los rincones más hondos de tu pensamiento.",
  "Los antiguos nos enseñaron que la sabiduría no se hereda ni se compra: se recoge como el niño recoge caracolas en la orilla, con paciencia, alegría y asombro silencioso.",
  "Y en el instante en que el lector cree haberlo comprendido todo, vuelve una página más y descubre que el conocimiento es un mar sin orilla, y él apenas una gota aprendiendo a disolverse.",
  "Escucha bien: en cada línea hay una invitación, en cada coma una pausa para meditar, y en cada punto un nuevo comienzo para quien se atreve a empezar de nuevo.",
];

const paragraphsByLang: Record<Lang, string[]> = {
  ar: arParagraphs,
  en: enParagraphs,
  fr: frParagraphs,
  es: esParagraphs,
};

const chapterLabel: Record<Lang, (n: number) => string> = {
  ar: (n) => `الفصل ${n}`,
  en: (n) => `Chapter ${n}`,
  fr: (n) => `Chapitre ${n}`,
  es: (n) => `Capítulo ${n}`,
};

// Generate ~20 pages of content per book (full chapters with multiple paragraphs)
function generatePages(title: string, lang: Lang, chapters = 10, pagesPerChapter = 2): string[] {
  const paras = paragraphsByLang[lang];
  const pages: string[] = [];
  for (let c = 1; c <= chapters; c++) {
    for (let p = 1; p <= pagesPerChapter; p++) {
      const heading = `${chapterLabel[lang](c)} — ${title}`;
      // pick 3 distinct paragraphs per page based on c & p
      const a = paras[(c + p) % paras.length];
      const b = paras[(c * 2 + p) % paras.length];
      const d = paras[(c + p * 3) % paras.length];
      pages.push(`${heading}\n\n${a}\n\n${b}\n\n${d}`);
    }
  }
  return pages;
}

/* ----------- Catalogue ----------- */

interface Seed {
  title: string;
  author: string;
  category: Category;
  language: Lang;
  description: string;
  duration?: string;
  rating?: number;
}

// Curated Arabic audiobooks (100+)
const arabicAudiobookTitles: { t: string; a: string; d: string }[] = [
  { t: "الأيام", a: "طه حسين", d: "12h 30m" },
  { t: "موسم الهجرة إلى الشمال", a: "الطيب صالح", d: "8h 15m" },
  { t: "ساق البامبو", a: "سعود السنعوسي", d: "14h 05m" },
  { t: "عزازيل", a: "يوسف زيدان", d: "16h 20m" },
  { t: "ثلاثية غرناطة", a: "رضوى عاشور", d: "22h 10m" },
  { t: "رجال في الشمس", a: "غسان كنفاني", d: "5h 40m" },
  { t: "ذاكرة الجسد", a: "أحلام مستغانمي", d: "13h 25m" },
  { t: "فوضى الحواس", a: "أحلام مستغانمي", d: "11h 50m" },
  { t: "عابر سرير", a: "أحلام مستغانمي", d: "10h 15m" },
  { t: "مدن الملح", a: "عبد الرحمن منيف", d: "30h 45m" },
  { t: "شرق المتوسط", a: "عبد الرحمن منيف", d: "9h 20m" },
  { t: "زقاق المدق", a: "نجيب محفوظ", d: "10h 30m" },
  { t: "بين القصرين", a: "نجيب محفوظ", d: "18h 40m" },
  { t: "قصر الشوق", a: "نجيب محفوظ", d: "17h 55m" },
  { t: "السكرية", a: "نجيب محفوظ", d: "16h 10m" },
  { t: "أولاد حارتنا", a: "نجيب محفوظ", d: "14h 25m" },
  { t: "اللص والكلاب", a: "نجيب محفوظ", d: "6h 45m" },
  { t: "ميرامار", a: "نجيب محفوظ", d: "7h 30m" },
  { t: "ثرثرة فوق النيل", a: "نجيب محفوظ", d: "8h 20m" },
  { t: "الحرافيش", a: "نجيب محفوظ", d: "20h 15m" },
  { t: "خان الخليلي", a: "نجيب محفوظ", d: "9h 50m" },
  { t: "السراب", a: "نجيب محفوظ", d: "11h 05m" },
  { t: "أرض النفاق", a: "يوسف السباعي", d: "8h 30m" },
  { t: "رد قلبي", a: "يوسف السباعي", d: "12h 40m" },
  { t: "إني راحلة", a: "يوسف السباعي", d: "9h 15m" },
  { t: "الحب في زمن الكوليرا", a: "غابرييل غارسيا ماركيز (مترجم)", d: "15h 20m" },
  { t: "مئة عام من العزلة", a: "غابرييل غارسيا ماركيز (مترجم)", d: "17h 45m" },
  { t: "الخيميائي", a: "باولو كويلو (مترجم)", d: "4h 30m" },
  { t: "ساحرة بورتوبيلو", a: "باولو كويلو (مترجم)", d: "6h 15m" },
  { t: "أحدب نوتردام", a: "فيكتور هوغو (مترجم)", d: "16h 40m" },
  { t: "البؤساء", a: "فيكتور هوغو (مترجم)", d: "48h 30m" },
  { t: "مدام بوفاري", a: "غوستاف فلوبير (مترجم)", d: "13h 25m" },
  { t: "الجريمة والعقاب", a: "فيودور دوستويفسكي (مترجم)", d: "21h 10m" },
  { t: "الإخوة كارامازوف", a: "فيودور دوستويفسكي (مترجم)", d: "37h 50m" },
  { t: "الأبله", a: "فيودور دوستويفسكي (مترجم)", d: "28h 20m" },
  { t: "آنا كارينينا", a: "ليو تولستوي (مترجم)", d: "35h 15m" },
  { t: "الحرب والسلام", a: "ليو تولستوي (مترجم)", d: "61h 40m" },
  { t: "كبرياء وتحامل", a: "جين أوستن (مترجم)", d: "11h 30m" },
  { t: "العجوز والبحر", a: "إرنست همنغواي (مترجم)", d: "2h 45m" },
  { t: "وداعًا للسلاح", a: "إرنست همنغواي (مترجم)", d: "9h 20m" },
  { t: "1984", a: "جورج أورويل (مترجم)", d: "10h 50m" },
  { t: "مزرعة الحيوان", a: "جورج أورويل (مترجم)", d: "3h 15m" },
  { t: "الأمير الصغير", a: "أنطوان دو سانت إكزوبيري (مترجم)", d: "1h 50m" },
  { t: "كليلة ودمنة", a: "ابن المقفع", d: "7h 25m" },
  { t: "ألف ليلة وليلة", a: "تراث شعبي", d: "120h 00m" },
  { t: "البخلاء", a: "الجاحظ", d: "8h 40m" },
  { t: "مقدمة ابن خلدون", a: "ابن خلدون", d: "25h 10m" },
  { t: "رسالة الغفران", a: "أبو العلاء المعري", d: "9h 20m" },
  { t: "طوق الحمامة", a: "ابن حزم الأندلسي", d: "6h 30m" },
  { t: "إحياء علوم الدين", a: "أبو حامد الغزالي", d: "60h 00m" },
  { t: "المنقذ من الضلال", a: "أبو حامد الغزالي", d: "3h 45m" },
  { t: "حي بن يقظان", a: "ابن طفيل", d: "4h 20m" },
  { t: "البخاري — صحيح", a: "الإمام البخاري", d: "80h 00m" },
  { t: "صحيح مسلم", a: "الإمام مسلم", d: "70h 00m" },
  { t: "رياض الصالحين", a: "الإمام النووي", d: "15h 30m" },
  { t: "زاد المعاد", a: "ابن قيم الجوزية", d: "32h 40m" },
  { t: "الداء والدواء", a: "ابن قيم الجوزية", d: "10h 15m" },
  { t: "تفسير ابن كثير", a: "ابن كثير", d: "100h 00m" },
  { t: "في ظلال القرآن", a: "سيد قطب", d: "85h 20m" },
  { t: "لا تحزن", a: "عائض القرني", d: "12h 30m" },
  { t: "أيقظ العملاق الذي بداخلك", a: "أنتوني روبنز (مترجم)", d: "15h 45m" },
  { t: "العادات السبع للناس الأكثر فعالية", a: "ستيفن كوفي (مترجم)", d: "13h 20m" },
  { t: "كيف تكسب الأصدقاء وتؤثر في الناس", a: "ديل كارنيجي (مترجم)", d: "10h 40m" },
  { t: "فن اللامبالاة", a: "مارك مانسون (مترجم)", d: "5h 30m" },
  { t: "قوة الآن", a: "إيكهارت تول (مترجم)", d: "7h 15m" },
  { t: "الخروج عن النص", a: "إبراهيم الفقي", d: "6h 45m" },
  { t: "قوة التحكم في الذات", a: "إبراهيم الفقي", d: "8h 20m" },
  { t: "أسرار قادة التميز", a: "إبراهيم الفقي", d: "9h 10m" },
  { t: "السر", a: "روندا بايرن (مترجم)", d: "5h 50m" },
  { t: "أبي الغني وأبي الفقير", a: "روبرت كيوساكي (مترجم)", d: "7h 30m" },
  { t: "أسطورة الصباح", a: "حال إلرود (مترجم)", d: "6h 15m" },
  { t: "الرجال من المريخ والنساء من الزهرة", a: "جون غراي (مترجم)", d: "9h 25m" },
  { t: "اللغات الخمس للحب", a: "جاري تشابمان (مترجم)", d: "5h 40m" },
  { t: "البجعة السوداء", a: "نسيم نيكولاس طالب (مترجم)", d: "14h 30m" },
  { t: "العقد الاجتماعي", a: "جان جاك روسو (مترجم)", d: "6h 20m" },
  { t: "هكذا تكلم زرادشت", a: "نيتشه (مترجم)", d: "11h 40m" },
  { t: "العالم كإرادة وتمثل", a: "شوبنهاور (مترجم)", d: "18h 15m" },
  { t: "تأملات", a: "ماركوس أوريليوس (مترجم)", d: "5h 30m" },
  { t: "جمهورية أفلاطون", a: "أفلاطون (مترجم)", d: "16h 20m" },
  { t: "الأخلاق إلى نيقوماخوس", a: "أرسطو (مترجم)", d: "12h 45m" },
  { t: "تاريخ الفلسفة الغربية", a: "برتراند راسل (مترجم)", d: "30h 10m" },
  { t: "الإنسان يبحث عن المعنى", a: "فيكتور فرانكل (مترجم)", d: "5h 45m" },
  { t: "علم النفس التحليلي", a: "كارل يونغ (مترجم)", d: "10h 30m" },
  { t: "تفسير الأحلام", a: "سيغموند فرويد (مترجم)", d: "14h 20m" },
  { t: "حضارة العرب", a: "غوستاف لوبون (مترجم)", d: "16h 30m" },
  { t: "الأمير", a: "ميكافيلي (مترجم)", d: "4h 15m" },
  { t: "فن الحرب", a: "صن تزو (مترجم)", d: "3h 30m" },
  { t: "تاريخ الطبري", a: "ابن جرير الطبري", d: "100h 00m" },
  { t: "البداية والنهاية", a: "ابن كثير", d: "90h 00m" },
  { t: "صلاح الدين الأيوبي", a: "عبد الله علوان", d: "10h 20m" },
  { t: "عمر بن الخطاب", a: "علي محمد الصلابي", d: "18h 40m" },
  { t: "أبو بكر الصديق", a: "علي محمد الصلابي", d: "14h 30m" },
  { t: "الرحيق المختوم", a: "صفي الرحمن المباركفوري", d: "20h 15m" },
  { t: "فقه السيرة", a: "محمد الغزالي", d: "16h 45m" },
  { t: "خلق المسلم", a: "محمد الغزالي", d: "8h 30m" },
  { t: "جدد حياتك", a: "محمد الغزالي", d: "7h 20m" },
  { t: "عقيدة المسلم", a: "محمد الغزالي", d: "9h 15m" },
  { t: "أنا", a: "عباس محمود العقاد", d: "6h 30m" },
  { t: "عبقرية محمد", a: "عباس محمود العقاد", d: "12h 50m" },
  { t: "عبقرية الصديق", a: "عباس محمود العقاد", d: "9h 25m" },
  { t: "عبقرية عمر", a: "عباس محمود العقاد", d: "10h 15m" },
  { t: "عبقرية علي", a: "عباس محمود العقاد", d: "11h 40m" },
  { t: "عبقرية خالد", a: "عباس محمود العقاد", d: "8h 30m" },
  { t: "وحي القلم", a: "مصطفى صادق الرافعي", d: "14h 20m" },
  { t: "تحت راية القرآن", a: "مصطفى صادق الرافعي", d: "10h 35m" },
  { t: "حديث الأربعاء", a: "طه حسين", d: "11h 50m" },
  { t: "دعاء الكروان", a: "طه حسين", d: "7h 40m" },
  { t: "شجرة البؤس", a: "طه حسين", d: "6h 25m" },
  { t: "الفلسفة المادية وتفكيكها", a: "محمد قطب", d: "9h 15m" },
  { t: "منهج التربية الإسلامية", a: "محمد قطب", d: "12h 30m" },
  { t: "صيد الخاطر", a: "ابن الجوزي", d: "15h 45m" },
  { t: "تلبيس إبليس", a: "ابن الجوزي", d: "18h 20m" },
];

// Curated multi-language books (50+)
const otherBooks: Seed[] = [
  // Religious
  { title: "Le Coran — Traduction française", author: "Hamidullah", category: "religious", language: "fr", description: "Traduction poétique et fidèle du texte sacré." },
  { title: "The Holy Bible — King James", author: "Classic Edition", category: "religious", language: "en", description: "The timeless King James translation of the Holy Bible." },
  { title: "La Bible de Jérusalem", author: "École Biblique", category: "religious", language: "fr", description: "Une référence francophone des Saintes Écritures." },
  { title: "El Corán — Traducción", author: "Julio Cortés", category: "religious", language: "es", description: "Traducción al español del libro sagrado del islam." },
  { title: "Confessions", author: "Saint Augustin", category: "religious", language: "fr", description: "Le voyage spirituel intime d'Augustin d'Hippone." },
  { title: "The Imitation of Christ", author: "Thomas à Kempis", category: "religious", language: "en", description: "A timeless Christian devotional classic." },
  { title: "صحيح البخاري — مختارات", author: "الإمام البخاري", category: "religious", language: "ar", description: "أصح كتاب بعد كتاب الله." },
  { title: "رياض الصالحين", author: "الإمام النووي", category: "religious", language: "ar", description: "أحاديث جامعة في الأخلاق والآداب." },
  { title: "زاد المعاد", author: "ابن قيم الجوزية", category: "religious", language: "ar", description: "في هدي خير العباد." },
  { title: "تفسير الجلالين", author: "السيوطي والمحلي", category: "religious", language: "ar", description: "تفسير ميسر للقرآن الكريم." },

  // Philosophy
  { title: "Méditations", author: "Marc Aurèle", category: "philosophy", language: "fr", description: "Les pensées intimes d'un empereur stoïcien." },
  { title: "Beyond Good and Evil", author: "Friedrich Nietzsche", category: "philosophy", language: "en", description: "A bold critique of moral philosophy." },
  { title: "Thus Spoke Zarathustra", author: "Friedrich Nietzsche", category: "philosophy", language: "en", description: "The poetic philosophical masterpiece." },
  { title: "El Mundo de Sofía", author: "Jostein Gaarder", category: "philosophy", language: "es", description: "Un viaje fascinante por la historia de la filosofía." },
  { title: "Ética a Nicómaco", author: "Aristóteles", category: "philosophy", language: "es", description: "Tratado fundacional sobre la virtud y la felicidad." },
  { title: "تهافت الفلاسفة", author: "أبو حامد الغزالي", category: "philosophy", language: "ar", description: "نقد فلسفي عميق." },
  { title: "Le Mythe de Sisyphe", author: "Albert Camus", category: "philosophy", language: "fr", description: "Essai sur l'absurde et le sens de la vie." },
  { title: "L'Être et le Néant", author: "Jean-Paul Sartre", category: "philosophy", language: "fr", description: "Œuvre majeure de l'existentialisme." },
  { title: "The Republic", author: "Plato", category: "philosophy", language: "en", description: "Plato's exploration of justice and the ideal state." },
  { title: "Discurso del Método", author: "René Descartes", category: "philosophy", language: "es", description: "El nacimiento del pensamiento moderno." },

  // Children
  { title: "Le Petit Prince", author: "Antoine de Saint-Exupéry", category: "children", language: "fr", description: "Une fable poétique pour les enfants et les rêveurs." },
  { title: "El Principito", author: "Antoine de Saint-Exupéry", category: "children", language: "es", description: "Una historia de amistad y descubrimiento." },
  { title: "Where the Wild Things Are", author: "Maurice Sendak", category: "children", language: "en", description: "A magical journey to the land of wild creatures." },
  { title: "The Very Hungry Caterpillar", author: "Eric Carle", category: "children", language: "en", description: "A beloved tale of growth and transformation." },
  { title: "Charlie and the Chocolate Factory", author: "Roald Dahl", category: "children", language: "en", description: "Willy Wonka and the magical golden ticket." },
  { title: "Matilda", author: "Roald Dahl", category: "children", language: "en", description: "The story of an extraordinary little girl." },
  { title: "Les Contes de Perrault", author: "Charles Perrault", category: "children", language: "fr", description: "Contes classiques pour petits et grands." },
  { title: "Cuentos de los hermanos Grimm", author: "Hermanos Grimm", category: "children", language: "es", description: "Cuentos clásicos de hadas." },
  { title: "حكايات جدتي", author: "تراث شعبي عربي", category: "children", language: "ar", description: "قصص جميلة قبل النوم للأطفال." },
  { title: "كليلة ودمنة للأطفال", author: "ابن المقفع (مبسط)", category: "children", language: "ar", description: "حكمة الحيوانات في حُلّة طفولية." },
  { title: "جحا والحمار", author: "تراث شعبي", category: "children", language: "ar", description: "نوادر جحا الممتعة." },
  { title: "علاء الدين والمصباح السحري", author: "ألف ليلة وليلة", category: "children", language: "ar", description: "حكاية خيالية ساحرة من التراث." },
  { title: "علي بابا والأربعون حرامي", author: "ألف ليلة وليلة", category: "children", language: "ar", description: "مغامرة كلاسيكية من ألف ليلة." },
  { title: "السندباد البحري", author: "ألف ليلة وليلة", category: "children", language: "ar", description: "سبع رحلات مدهشة." },

  // Stories
  { title: "Nouvelles complètes", author: "Guy de Maupassant", category: "stories", language: "fr", description: "Recueil des plus belles nouvelles." },
  { title: "The Great Short Stories", author: "Edgar Allan Poe", category: "stories", language: "en", description: "Dark, mysterious, unforgettable tales." },
  { title: "Cuentos de Borges", author: "Jorge Luis Borges", category: "stories", language: "es", description: "Laberintos literarios magistrales." },
  { title: "The Stories of Anton Chekhov", author: "Anton Chekhov", category: "stories", language: "en", description: "Masterful short fiction from Russia." },
  { title: "Cuentos de Cortázar", author: "Julio Cortázar", category: "stories", language: "es", description: "Realidad y fantasía entrelazadas." },
  { title: "Dubliners", author: "James Joyce", category: "stories", language: "en", description: "Fifteen interlinked stories of Dublin life." },
  { title: "أيام العرب في الجاهلية", author: "محمد أحمد جاد المولى", category: "stories", language: "ar", description: "قصص العرب قبل الإسلام." },
  { title: "قصص الأنبياء", author: "ابن كثير", category: "stories", language: "ar", description: "سير الأنبياء عليهم السلام." },

  // Novels
  { title: "L'Étranger", author: "Albert Camus", category: "novels", language: "fr", description: "Roman existentiel inoubliable." },
  { title: "La Peste", author: "Albert Camus", category: "novels", language: "fr", description: "Allégorie sur la résistance humaine." },
  { title: "Madame Bovary", author: "Gustave Flaubert", category: "novels", language: "fr", description: "Chef-d'œuvre du réalisme français." },
  { title: "Notre-Dame de Paris", author: "Victor Hugo", category: "novels", language: "fr", description: "Roman épique gothique de Hugo." },
  { title: "1984", author: "George Orwell", category: "novels", language: "en", description: "A chilling dystopian masterpiece." },
  { title: "Animal Farm", author: "George Orwell", category: "novels", language: "en", description: "A sharp political allegory." },
  { title: "Pride and Prejudice", author: "Jane Austen", category: "novels", language: "en", description: "A timeless story of love and society." },
  { title: "To Kill a Mockingbird", author: "Harper Lee", category: "novels", language: "en", description: "A profound American classic." },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "novels", language: "en", description: "The American dream in the Jazz Age." },
  { title: "Cien años de soledad", author: "Gabriel García Márquez", category: "novels", language: "es", description: "El realismo mágico en su forma más pura." },
  { title: "El amor en los tiempos del cólera", author: "Gabriel García Márquez", category: "novels", language: "es", description: "Una historia de amor que vence al tiempo." },
  { title: "Don Quijote de la Mancha", author: "Miguel de Cervantes", category: "novels", language: "es", description: "La obra cumbre de la literatura española." },
  { title: "La Casa de los Espíritus", author: "Isabel Allende", category: "novels", language: "es", description: "Una saga familiar mágica." },
  { title: "موسم الهجرة إلى الشمال", author: "الطيب صالح", category: "novels", language: "ar", description: "رواية عربية خالدة عن الهوية والاغتراب." },
  { title: "ساق البامبو", author: "سعود السنعوسي", category: "novels", language: "ar", description: "بحث عن الهوية بين فلبين والكويت." },
  { title: "عزازيل", author: "يوسف زيدان", category: "novels", language: "ar", description: "رواية تاريخية مثيرة عن مصر القديمة." },
  { title: "ذاكرة الجسد", author: "أحلام مستغانمي", category: "novels", language: "ar", description: "ثلاثية الحب والجزائر." },
  { title: "زقاق المدق", author: "نجيب محفوظ", category: "novels", language: "ar", description: "تحفة محفوظ القاهرية." },
  { title: "أولاد حارتنا", author: "نجيب محفوظ", category: "novels", language: "ar", description: "عمل رمزي عظيم." },
];

const allSeeds: Seed[] = [
  ...arabicAudiobookTitles.map((b) => ({
    title: b.t,
    author: b.a,
    category: "audiobooks" as Category,
    language: "ar" as Lang,
    description: `كتاب صوتي بصوت دافئ — ${b.a}.`,
    duration: b.d,
    rating: 4.5 + Math.random() * 0.5,
  })),
  ...otherBooks,
];

export const books: Book[] = allSeeds.map((s, i) => ({
  id: String(i + 1),
  title: s.title,
  author: s.author,
  category: s.category,
  language: s.language,
  cover: coverFor(s.category),
  description: s.description,
  pages: generatePages(s.title, s.language, 10, 2), // 20 full pages each
  duration: s.duration,
  rating: Number((s.rating ?? (4.4 + Math.random() * 0.6)).toFixed(1)),
}));

export const getBook = (id: string) => books.find((b) => b.id === id);
