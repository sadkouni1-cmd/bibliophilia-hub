import religious from "@/assets/cover-religious.jpg";
import philosophy from "@/assets/cover-philosophy.jpg";
import childrenCover from "@/assets/cover-children.jpg";
import stories from "@/assets/cover-stories.jpg";
import audio from "@/assets/cover-audio.jpg";
import novel from "@/assets/cover-novel.jpg";

export type Category = "religious" | "philosophy" | "children" | "stories" | "audiobooks" | "novels";
export type Lang = "ar" | "fr" | "en" | "es";
type PageProfile = "short" | "medium" | "long" | "epic";

export interface Book {
  id: string;
  title: string;
  author: string;
  category: Category;
  language: Lang;
  cover: string;
  description: string;
  pages: string[];
  pageCount: number;
  duration?: string;
  rating: number;
}

interface Seed {
  title: string;
  author: string;
  category: Category;
  language: Lang;
  description: string;
  duration?: string;
  rating?: number;
  pageProfile?: PageProfile;
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

const pageCountByProfile: Record<PageProfile, number> = {
  short: 36,
  medium: 72,
  long: 120,
  epic: 180,
};

const defaultProfileByCategory: Record<Category, PageProfile> = {
  religious: "epic",
  philosophy: "long",
  children: "short",
  stories: "medium",
  audiobooks: "long",
  novels: "epic",
};

const arabicCategoryLabel: Record<Category, string> = {
  religious: "الأدب الديني والروحي",
  philosophy: "الفكر الفلسفي",
  children: "قصص الأطفال",
  stories: "القصص والسرد القصير",
  audiobooks: "المكتبة الصوتية",
  novels: "الروايات",
};

const englishCategoryLabel: Record<Category, string> = {
  religious: "religious literature",
  philosophy: "philosophical thought",
  children: "children's stories",
  stories: "short stories",
  audiobooks: "audiobook narration",
  novels: "novels",
};

const frenchCategoryLabel: Record<Category, string> = {
  religious: "la littérature spirituelle",
  philosophy: "la pensée philosophique",
  children: "les récits pour enfants",
  stories: "les nouvelles",
  audiobooks: "la narration audio",
  novels: "les romans",
};

const spanishCategoryLabel: Record<Category, string> = {
  religious: "la literatura espiritual",
  philosophy: "el pensamiento filosófico",
  children: "los cuentos infantiles",
  stories: "los relatos breves",
  audiobooks: "la narración en audio",
  novels: "las novelas",
};

const arParagraphs = [
  "في صمت الفجر، حين يلتفّ النور حول العالم كحجاب رقيق، يفتح القارئ كتابه كما يفتح المسافر بابًا قديمًا على حديقة لم يزرها من قبل. كل كلمة تنبت كزهرة، وكل سطر يصير ممرًّا بين أشجار المعنى.",
  "قال أحد الحكماء: من قرأ كتابًا فقد عاش حياة إضافية. وفي هذا الكتاب حياةٌ كاملة بأفراحها وأحزانها، ببداياتها التي تشبه شروق الشمس ونهاياتها التي تشبه آخر نَفَسٍ من شمعة.",
  "ليست الكلمات حروفًا تُرصف، بل أرواحٌ تتنفّس. حين تقرأها بقلبك، تسمع نبضها، وحين تقرأها بعقلك، ترى ضوءها يتسلّل إلى أعمق زوايا فكرك.",
  "تعلّمنا من القدماء أن الحكمة لا تُورَث ولا تُشترى، بل تُلتقط كما يلتقط الطفل الصدفة من الشاطئ، بصبر وفرحٍ ودهشة.",
  "وفي اللحظة التي يظنّ فيها القارئ أنه قد فهم كلّ شيء، يقلب صفحةً جديدة فيكتشف أن المعرفة بحرٌ بلا ساحل، وأنه ليس سوى قطرةٍ فيه تتعلّم الذوبان.",
  "اسمع جيّدًا: في كلّ سطر دعوة، وفي كلّ فاصلة وقفة للتأمل، وفي كلّ نقطة بدايةٌ جديدة لمن يملك الشجاعة ليبدأ من جديد.",
  "هذا الكتاب لا يطلب منك أن تسرع، بل أن تتمهّل؛ أن ترفع عينيك أحيانًا عن الصفحة لتتأمل أثر العبارة في القلب، ثم تعود وقد صار المعنى أكثر صفاءً ورسوخًا.",
  "وحين تتكاثر الأسئلة، لا يقدّم النص أجوبة جاهزة بقدر ما يفتح نوافذ أوسع للبحث، حتى يشعر القارئ أن الرحلة في داخله لا تقل عمقًا عن الرحلة بين الصفحات.",
];

const enParagraphs = [
  "In the quiet hours before dawn, when the world still rests under a soft veil of light, a reader opens a book the way a traveler pushes a centuries-old door into a garden he has never visited. Each word blossoms; each line becomes a path between trees of meaning.",
  "A wise man once said that to read a book is to live an extra life. Within these pages there is a complete life, with all its joys and sorrows, beginnings that feel like sunrise and endings that feel like the last breath of a candle.",
  "Words are not merely letters arranged on a page; they are living souls that breathe. Read them with your heart, and you will hear their pulse; read them with your mind, and you will see their light slip into the deepest corners of your thought.",
  "The ancients taught us that wisdom cannot be inherited or bought, but only gathered the way a child gathers seashells from the shore — with patience, joy, and quiet wonder.",
  "Just when the reader believes everything has become clear, another page opens and reminds him that knowledge is a sea without shore, and he is learning, slowly, how to navigate it.",
  "In every line there is an invitation, in every comma a pause for reflection, and in every full stop a new beginning for the one brave enough to begin again.",
];

const frParagraphs = [
  "Dans le silence précédant l'aube, lorsque le monde repose encore sous un voile de lumière, le lecteur ouvre son livre comme un voyageur pousse la porte centenaire d'un jardin qu'il n'a jamais visité. Chaque mot s'épanouit, chaque ligne devient un sentier entre les arbres du sens.",
  "Un sage a dit qu'ouvrir un livre, c'est vivre une vie supplémentaire. Dans ces pages se trouve une vie entière, avec ses joies, ses peines, ses commencements pareils à l'aurore et ses fins semblables au dernier souffle d'une bougie.",
  "Les mots ne sont pas de simples lettres alignées : ce sont des âmes qui respirent. Lisez-les avec le cœur, vous entendrez leur pouls ; lisez-les avec l'esprit, vous verrez leur lumière s'infiltrer au plus profond de votre pensée.",
  "Les anciens nous ont appris que la sagesse ne s'hérite ni ne s'achète : elle se cueille, comme l'enfant ramasse des coquillages sur la plage, avec patience, joie et émerveillement.",
  "Au moment précis où le lecteur croit avoir tout compris, il tourne une page de plus et découvre que la connaissance est une mer sans rivage, et qu'il n'en est qu'une goutte apprenant à se fondre.",
  "Dans chaque ligne il y a une invitation, dans chaque virgule une pause de méditation, et dans chaque point un commencement nouveau pour celui qui ose recommencer.",
];

const esParagraphs = [
  "En el silencio que precede al alba, cuando el mundo aún descansa bajo un velo de luz, el lector abre su libro como un viajero empuja la puerta centenaria de un jardín nunca visitado. Cada palabra florece, cada línea se vuelve un sendero entre árboles de significado.",
  "Dijo un sabio que abrir un libro es vivir una vida adicional. En estas páginas hay una vida entera, con sus alegrías y tristezas, comienzos como amaneceres y finales como el último aliento de una vela.",
  "Las palabras no son letras alineadas: son almas que respiran. Léelas con el corazón y escucharás su pulso; léelas con la mente y verás su luz colarse en los rincones más hondos de tu pensamiento.",
  "Los antiguos nos enseñaron que la sabiduría no se hereda ni se compra: se recoge como el niño recoge caracolas en la orilla, con paciencia, alegría y asombro silencioso.",
  "Y en el instante en que el lector cree haberlo comprendido todo, vuelve una página más y descubre que el conocimiento es un mar sin orilla, y él apenas una gota aprendiendo a disolverse.",
  "En cada línea hay una invitación, en cada coma una pausa para meditar, y en cada punto un nuevo comienzo para quien se atreve a empezar de nuevo.",
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

function stableRating(title: string) {
  return Number((4.3 + (title.length % 7) * 0.1).toFixed(1));
}

function pageCountForSeed(seed: Seed) {
  return pageCountByProfile[seed.pageProfile ?? defaultProfileByCategory[seed.category]];
}

function generatePages(seed: Pick<Seed, "title" | "author" | "language" | "category">, count: number): string[] {
  const paras = paragraphsByLang[seed.language];
  const pages: string[] = [];

  for (let page = 0; page < count; page++) {
    const chapter = Math.floor(page / 2) + 1;
    const p1 = paras[(page + 1) % paras.length];
    const p2 = paras[(page * 2 + 2) % paras.length];
    const p3 = paras[(page * 3 + 3) % paras.length];

    const heading = `${chapterLabel[seed.language](chapter)} — ${seed.title}`;

    let intro = "";
    if (seed.language === "ar") {
      intro = `هذا المقطع من كتاب «${seed.title}» للمؤلف ${seed.author} ينتمي إلى ${arabicCategoryLabel[seed.category]}، ويُعرض هنا في صفحات مطوّلة لتجربة قراءة متصلة وسلسة داخل التطبيق.`;
    } else if (seed.language === "fr") {
      intro = `Cet extrait prolongé de « ${seed.title} » par ${seed.author} appartient à ${frenchCategoryLabel[seed.category]} et est présenté ici dans un format de lecture continue pour l'application.`;
    } else if (seed.language === "es") {
      intro = `Este fragmento ampliado de «${seed.title}» de ${seed.author} pertenece a ${spanishCategoryLabel[seed.category]} y aparece aquí en un formato continuo de lectura para la aplicación.`;
    } else {
      intro = `This extended reading page from “${seed.title}” by ${seed.author} belongs to ${englishCategoryLabel[seed.category]} and is presented here in a smooth, continuous in-app reading format.`;
    }

    pages.push(`${heading}\n\n${intro}\n\n${p1}\n\n${p2}\n\n${p3}`);
  }

  return pages;
}

const arabicAudiobookTitles: Array<[string, string, string]> = [
  ["الأيام", "طه حسين", "12h 30m"],
  ["موسم الهجرة إلى الشمال", "الطيب صالح", "8h 15m"],
  ["ساق البامبو", "سعود السنعوسي", "14h 05m"],
  ["عزازيل", "يوسف زيدان", "16h 20m"],
  ["ثلاثية غرناطة", "رضوى عاشور", "22h 10m"],
  ["رجال في الشمس", "غسان كنفاني", "5h 40m"],
  ["ذاكرة الجسد", "أحلام مستغانمي", "13h 25m"],
  ["فوضى الحواس", "أحلام مستغانمي", "11h 50m"],
  ["عابر سرير", "أحلام مستغانمي", "10h 15m"],
  ["مدن الملح", "عبد الرحمن منيف", "30h 45m"],
  ["شرق المتوسط", "عبد الرحمن منيف", "9h 20m"],
  ["زقاق المدق", "نجيب محفوظ", "10h 30m"],
  ["بين القصرين", "نجيب محفوظ", "18h 40m"],
  ["قصر الشوق", "نجيب محفوظ", "17h 55m"],
  ["السكرية", "نجيب محفوظ", "16h 10m"],
  ["أولاد حارتنا", "نجيب محفوظ", "14h 25m"],
  ["اللص والكلاب", "نجيب محفوظ", "6h 45m"],
  ["ميرامار", "نجيب محفوظ", "7h 30m"],
  ["ثرثرة فوق النيل", "نجيب محفوظ", "8h 20m"],
  ["الحرافيش", "نجيب محفوظ", "20h 15m"],
  ["خان الخليلي", "نجيب محفوظ", "9h 50m"],
  ["السراب", "نجيب محفوظ", "11h 05m"],
  ["أرض النفاق", "يوسف السباعي", "8h 30m"],
  ["رد قلبي", "يوسف السباعي", "12h 40m"],
  ["إني راحلة", "يوسف السباعي", "9h 15m"],
  ["الحب في زمن الكوليرا", "غابرييل غارسيا ماركيز (مترجم)", "15h 20m"],
  ["مئة عام من العزلة", "غابرييل غارسيا ماركيز (مترجم)", "17h 45m"],
  ["الخيميائي", "باولو كويلو (مترجم)", "4h 30m"],
  ["ساحرة بورتوبيلو", "باولو كويلو (مترجم)", "6h 15m"],
  ["أحدب نوتردام", "فيكتور هوغو (مترجم)", "16h 40m"],
  ["البؤساء", "فيكتور هوغو (مترجم)", "48h 30m"],
  ["مدام بوفاري", "غوستاف فلوبير (مترجم)", "13h 25m"],
  ["الجريمة والعقاب", "فيودور دوستويفسكي (مترجم)", "21h 10m"],
  ["الإخوة كارامازوف", "فيودور دوستويفسكي (مترجم)", "37h 50m"],
  ["الأبله", "فيودور دوستويفسكي (مترجم)", "28h 20m"],
  ["آنا كارينينا", "ليو تولستوي (مترجم)", "35h 15m"],
  ["الحرب والسلام", "ليو تولستوي (مترجم)", "61h 40m"],
  ["كبرياء وتحامل", "جين أوستن (مترجم)", "11h 30m"],
  ["العجوز والبحر", "إرنست همنغواي (مترجم)", "2h 45m"],
  ["1984", "جورج أورويل (مترجم)", "10h 50m"],
  ["مزرعة الحيوان", "جورج أورويل (مترجم)", "3h 15m"],
  ["الأمير الصغير", "أنطوان دو سانت إكزوبيري (مترجم)", "1h 50m"],
  ["كليلة ودمنة", "ابن المقفع", "7h 25m"],
  ["ألف ليلة وليلة", "تراث شعبي", "120h 00m"],
  ["البخلاء", "الجاحظ", "8h 40m"],
  ["مقدمة ابن خلدون", "ابن خلدون", "25h 10m"],
  ["رسالة الغفران", "أبو العلاء المعري", "9h 20m"],
  ["طوق الحمامة", "ابن حزم الأندلسي", "6h 30m"],
  ["إحياء علوم الدين", "أبو حامد الغزالي", "60h 00m"],
  ["المنقذ من الضلال", "أبو حامد الغزالي", "3h 45m"],
  ["حي بن يقظان", "ابن طفيل", "4h 20m"],
  ["صحيح البخاري", "الإمام البخاري", "80h 00m"],
  ["صحيح مسلم", "الإمام مسلم", "70h 00m"],
  ["رياض الصالحين", "الإمام النووي", "15h 30m"],
  ["زاد المعاد", "ابن قيم الجوزية", "32h 40m"],
  ["الداء والدواء", "ابن قيم الجوزية", "10h 15m"],
  ["تفسير ابن كثير", "ابن كثير", "100h 00m"],
  ["في ظلال القرآن", "سيد قطب", "85h 20m"],
  ["لا تحزن", "عائض القرني", "12h 30m"],
  ["أيقظ العملاق الذي بداخلك", "أنتوني روبنز (مترجم)", "15h 45m"],
  ["العادات السبع للناس الأكثر فعالية", "ستيفن كوفي (مترجم)", "13h 20m"],
  ["كيف تكسب الأصدقاء وتؤثر في الناس", "ديل كارنيجي (مترجم)", "10h 40m"],
  ["فن اللامبالاة", "مارك مانسون (مترجم)", "5h 30m"],
  ["قوة الآن", "إيكهارت تول (مترجم)", "7h 15m"],
  ["الخروج عن النص", "إبراهيم الفقي", "6h 45m"],
  ["قوة التحكم في الذات", "إبراهيم الفقي", "8h 20m"],
  ["أسرار قادة التميز", "إبراهيم الفقي", "9h 10m"],
  ["السر", "روندا بايرن (مترجم)", "5h 50m"],
  ["أبي الغني وأبي الفقير", "روبرت كيوساكي (مترجم)", "7h 30m"],
  ["أسطورة الصباح", "حال إلرود (مترجم)", "6h 15m"],
  ["الرجال من المريخ والنساء من الزهرة", "جون غراي (مترجم)", "9h 25m"],
  ["اللغات الخمس للحب", "جاري تشابمان (مترجم)", "5h 40m"],
  ["البجعة السوداء", "نسيم نيكولاس طالب (مترجم)", "14h 30m"],
  ["العقد الاجتماعي", "جان جاك روسو (مترجم)", "6h 20m"],
  ["هكذا تكلم زرادشت", "نيتشه (مترجم)", "11h 40m"],
  ["العالم كإرادة وتمثل", "شوبنهاور (مترجم)", "18h 15m"],
  ["تأملات", "ماركوس أوريليوس (مترجم)", "5h 30m"],
  ["جمهورية أفلاطون", "أفلاطون (مترجم)", "16h 20m"],
  ["الأخلاق إلى نيقوماخوس", "أرسطو (مترجم)", "12h 45m"],
  ["تاريخ الفلسفة الغربية", "برتراند راسل (مترجم)", "30h 10m"],
  ["الإنسان يبحث عن المعنى", "فيكتور فرانكل (مترجم)", "5h 45m"],
  ["علم النفس التحليلي", "كارل يونغ (مترجم)", "10h 30m"],
  ["تفسير الأحلام", "سيغموند فرويد (مترجم)", "14h 20m"],
  ["حضارة العرب", "غوستاف لوبون (مترجم)", "16h 30m"],
  ["الأمير", "ميكافيلي (مترجم)", "4h 15m"],
  ["فن الحرب", "صن تزو (مترجم)", "3h 30m"],
  ["تاريخ الطبري", "ابن جرير الطبري", "100h 00m"],
  ["البداية والنهاية", "ابن كثير", "90h 00m"],
  ["الرحيق المختوم", "صفي الرحمن المباركفوري", "20h 15m"],
  ["خلق المسلم", "محمد الغزالي", "8h 30m"],
  ["جدد حياتك", "محمد الغزالي", "7h 20m"],
  ["عقيدة المسلم", "محمد الغزالي", "9h 15m"],
  ["أنا", "عباس محمود العقاد", "6h 30m"],
  ["عبقرية محمد", "عباس محمود العقاد", "12h 50m"],
  ["عبقرية الصديق", "عباس محمود العقاد", "9h 25m"],
  ["عبقرية عمر", "عباس محمود العقاد", "10h 15m"],
  ["عبقرية علي", "عباس محمود العقاد", "11h 40m"],
  ["عبقرية خالد", "عباس محمود العقاد", "8h 30m"],
  ["وحي القلم", "مصطفى صادق الرافعي", "14h 20m"],
  ["تحت راية القرآن", "مصطفى صادق الرافعي", "10h 35m"],
  ["حديث الأربعاء", "طه حسين", "11h 50m"],
  ["دعاء الكروان", "طه حسين", "7h 40m"],
  ["شجرة البؤس", "طه حسين", "6h 25m"],
  ["الفلسفة المادية وتفكيكها", "محمد قطب", "9h 15m"],
  ["منهج التربية الإسلامية", "محمد قطب", "12h 30m"],
  ["صيد الخاطر", "ابن الجوزي", "15h 45m"],
  ["تلبيس إبليس", "ابن الجوزي", "18h 20m"],
  // الإمام الغزالي - مجموعة موسعة
  ["إحياء علوم الدين — الجزء الأول", "أبو حامد الغزالي", "22h 10m"],
  ["إحياء علوم الدين — الجزء الثاني", "أبو حامد الغزالي", "21h 40m"],
  ["إحياء علوم الدين — الجزء الثالث", "أبو حامد الغزالي", "23h 05m"],
  ["إحياء علوم الدين — الجزء الرابع", "أبو حامد الغزالي", "20h 55m"],
  ["مشكاة الأنوار", "أبو حامد الغزالي", "4h 30m"],
  ["معارج القدس", "أبو حامد الغزالي", "6h 15m"],
  ["ميزان العمل", "أبو حامد الغزالي", "5h 50m"],
  ["كيمياء السعادة", "أبو حامد الغزالي", "7h 20m"],
  ["تهافت الفلاسفة", "أبو حامد الغزالي", "10h 40m"],
  ["بداية الهداية", "أبو حامد الغزالي", "3h 10m"],
  ["أيها الولد", "أبو حامد الغزالي", "2h 25m"],
  ["جواهر القرآن", "أبو حامد الغزالي", "5h 40m"],
  ["فضائح الباطنية", "أبو حامد الغزالي", "6h 20m"],
  // الكندي
  ["رسالة في الفلسفة الأولى", "يعقوب بن إسحاق الكندي", "5h 30m"],
  ["رسالة في حدود الأشياء ورسومها", "الكندي", "2h 45m"],
  ["رسالة في العقل", "الكندي", "2h 10m"],
  ["كتاب في صناعة الشعر", "الكندي", "3h 50m"],
  ["رسالة في الحيلة لدفع الأحزان", "الكندي", "2h 30m"],
  // ابن قيم الجوزية - مجموعة موسعة
  ["مدارج السالكين", "ابن قيم الجوزية", "40h 15m"],
  ["إعلام الموقعين", "ابن قيم الجوزية", "35h 50m"],
  ["الفوائد", "ابن قيم الجوزية", "8h 20m"],
  ["طريق الهجرتين", "ابن قيم الجوزية", "12h 10m"],
  ["روضة المحبين ونزهة المشتاقين", "ابن قيم الجوزية", "14h 30m"],
  ["الجواب الكافي لمن سأل عن الدواء الشافي", "ابن قيم الجوزية", "9h 45m"],
  ["شفاء العليل", "ابن قيم الجوزية", "13h 20m"],
  ["حادي الأرواح إلى بلاد الأفراح", "ابن قيم الجوزية", "11h 30m"],
  ["مفتاح دار السعادة", "ابن قيم الجوزية", "16h 50m"],
  ["عدة الصابرين وذخيرة الشاكرين", "ابن قيم الجوزية", "7h 40m"],
  ["الوابل الصيب من الكلم الطيب", "ابن قيم الجوزية", "5h 25m"],
  // قصص الصحابة
  ["حياة الصحابة", "محمد يوسف الكاندهلوي", "45h 20m"],
  ["صور من حياة الصحابة", "عبد الرحمن رأفت الباشا", "12h 30m"],
  ["صور من حياة الصحابيات", "عبد الرحمن رأفت الباشا", "10h 15m"],
  ["صور من حياة التابعين", "عبد الرحمن رأفت الباشا", "11h 40m"],
  ["رجال حول الرسول", "خالد محمد خالد", "20h 10m"],
  ["خلفاء الرسول", "خالد محمد خالد", "18h 50m"],
  ["أبو بكر الصديق", "محمد حسين هيكل", "14h 20m"],
  ["الفاروق عمر", "محمد حسين هيكل", "16h 35m"],
  ["عثمان بن عفان", "صادق عرجون", "12h 15m"],
  ["علي بن أبي طالب", "عبد الفتاح عبد المقصود", "22h 40m"],
  ["خالد بن الوليد سيف الله المسلول", "صادق عرجون", "13h 50m"],
  ["بلال بن رباح", "علي الطنطاوي", "5h 30m"],
  ["سلمان الفارسي", "عبد الحميد جودة السحار", "6h 45m"],
  ["أبو ذر الغفاري", "عبد الحميد جودة السحار", "5h 20m"],
  // مصطفى محمود
  ["رحلتي من الشك إلى الإيمان", "مصطفى محمود", "6h 30m"],
  ["حوار مع صديقي الملحد", "مصطفى محمود", "5h 50m"],
  ["القرآن محاولة لفهم عصري", "مصطفى محمود", "8h 15m"],
  ["الله", "مصطفى محمود", "4h 40m"],
  ["لغز الحياة", "مصطفى محمود", "5h 20m"],
  ["لغز الموت", "مصطفى محمود", "4h 30m"],
  ["لغز الزمن", "مصطفى محمود", "4h 45m"],
  ["السر الأعظم", "مصطفى محمود", "6h 10m"],
  ["الإسلام السياسي والمعركة القادمة", "مصطفى محمود", "5h 35m"],
  ["عصر القرود", "مصطفى محمود", "4h 50m"],
  ["العنكبوت", "مصطفى محمود", "5h 25m"],
  ["رجل تحت الصفر", "مصطفى محمود", "6h 00m"],
  ["زيارة للجنة والنار", "مصطفى محمود", "3h 45m"],
  // أسامة المسلم
  ["خوف", "أسامة المسلم", "10h 20m"],
  ["خوف 2", "أسامة المسلم", "11h 30m"],
  ["مذكرات سائق هيلوكس", "أسامة المسلم", "9h 50m"],
  ["نادي الفرسان", "أسامة المسلم", "12h 40m"],
  ["عرافة الموتى", "أسامة المسلم", "8h 30m"],
  ["ما وراء الفوضى", "أسامة المسلم", "10h 15m"],
  ["سلسلة أرض زيكولا", "أسامة المسلم", "20h 25m"],
  ["ملحمة السبليون", "أسامة المسلم", "18h 50m"],
  ["خادمة القصر", "أسامة المسلم", "11h 10m"],
  // نيتشه (مترجم)
  ["هكذا تكلم زرادشت", "فريدريك نيتشه (مترجم)", "12h 40m"],
  ["ما وراء الخير والشر", "فريدريك نيتشه (مترجم)", "9h 30m"],
  ["جينيالوجيا الأخلاق", "فريدريك نيتشه (مترجم)", "8h 20m"],
  ["العلم المرح", "فريدريك نيتشه (مترجم)", "10h 15m"],
  ["أفول الأصنام", "فريدريك نيتشه (مترجم)", "5h 45m"],
  ["عدو المسيح", "فريدريك نيتشه (مترجم)", "6h 10m"],
  ["إنساني مفرط في إنسانيته", "فريدريك نيتشه (مترجم)", "13h 30m"],
  ["مولد التراجيديا", "فريدريك نيتشه (مترجم)", "7h 20m"],
  // جورج أورويل (مترجم)
  ["1984", "جورج أورويل (مترجم)", "11h 10m"],
  ["مزرعة الحيوان", "جورج أورويل (مترجم)", "3h 30m"],
  ["متشردًا في باريس ولندن", "جورج أورويل (مترجم)", "8h 20m"],
  ["الطريق إلى ويغان بير", "جورج أورويل (مترجم)", "9h 40m"],
  ["تكريمًا لكتالونيا", "جورج أورويل (مترجم)", "10h 15m"],
  ["لتحيا الأسماك في الهواء", "جورج أورويل (مترجم)", "9h 30m"],
  // تولستوي (مترجم)
  ["الحرب والسلام", "ليو تولستوي (مترجم)", "62h 10m"],
  ["آنا كارينينا", "ليو تولستوي (مترجم)", "36h 20m"],
  ["موت إيفان إيليتش", "ليو تولستوي (مترجم)", "3h 40m"],
  ["البعث (القيامة)", "ليو تولستوي (مترجم)", "24h 15m"],
  ["السوناتا لكروتزر", "ليو تولستوي (مترجم)", "4h 50m"],
  ["الحاج مراد", "ليو تولستوي (مترجم)", "6h 30m"],
  ["ما الفن", "ليو تولستوي (مترجم)", "9h 20m"],
  ["مملكة الله بداخلكم", "ليو تولستوي (مترجم)", "13h 40m"],
  // فرانز كافكا (مترجم)
  ["المسخ", "فرانز كافكا (مترجم)", "3h 20m"],
  ["المحاكمة", "فرانز كافكا (مترجم)", "11h 40m"],
  ["القصر", "فرانز كافكا (مترجم)", "14h 30m"],
  ["أمريكا", "فرانز كافكا (مترجم)", "12h 15m"],
  ["رسالة إلى الوالد", "فرانز كافكا (مترجم)", "2h 50m"],
  ["مستعمرة العقاب", "فرانز كافكا (مترجم)", "2h 30m"],
  ["قصص قصيرة كاملة", "فرانز كافكا (مترجم)", "10h 20m"],
  // دوستويفسكي (مترجم)
  ["الجريمة والعقاب", "فيودور دوستويفسكي (مترجم)", "22h 10m"],
  ["الإخوة كارامازوف", "فيودور دوستويفسكي (مترجم)", "38h 50m"],
  ["الأبله", "فيودور دوستويفسكي (مترجم)", "29h 30m"],
  ["المقامر", "فيودور دوستويفسكي (مترجم)", "6h 40m"],
  ["مذكرات قبو", "فيودور دوستويفسكي (مترجم)", "5h 50m"],
  ["الشياطين", "فيودور دوستويفسكي (مترجم)", "30h 20m"],
  ["مذلون مهانون", "فيودور دوستويفسكي (مترجم)", "13h 15m"],
  ["البؤساء (المساكين)", "فيودور دوستويفسكي (مترجم)", "8h 40m"],
  ["ليالٍ بيضاء", "فيودور دوستويفسكي (مترجم)", "3h 20m"],
];

const arabicPhilosophyTitles: Array<[string, string]> = [
  ["فصل المقال", "ابن رشد"],
  ["تهافت التهافت", "ابن رشد"],
  ["الإشارات والتنبيهات", "ابن سينا"],
  ["الشفاء", "ابن سينا"],
  ["النجاة", "ابن سينا"],
  ["رسائل إخوان الصفا", "إخوان الصفا"],
  ["آراء أهل المدينة الفاضلة", "الفارابي"],
  ["السياسة المدنية", "الفارابي"],
  ["تحصيل السعادة", "الفارابي"],
  ["مشكاة الأنوار", "أبو حامد الغزالي"],
  ["معيار العلم", "أبو حامد الغزالي"],
  ["القسطاس المستقيم", "أبو حامد الغزالي"],
  ["حي بن يقظان", "ابن طفيل"],
  ["رسالة التوحيد", "محمد عبده"],
  ["مستقبل الثقافة في مصر", "طه حسين"],
  ["تجديد الفكر العربي", "زكي نجيب محمود"],
  ["تجديد الفكر الديني", "محمد إقبال"],
  ["نحن والتراث", "محمد عابد الجابري"],
  ["تكوين العقل العربي", "محمد عابد الجابري"],
  ["بنية العقل العربي", "محمد عابد الجابري"],
  ["العقل السياسي العربي", "محمد عابد الجابري"],
  ["نقد العقل العربي", "محمد عابد الجابري"],
  ["الإيديولوجيا العربية المعاصرة", "عبد الله العروي"],
  ["مفهوم العقل", "عبد الله العروي"],
  ["في الشعر الجاهلي", "طه حسين"],
  ["المنقذ من الضلال", "أبو حامد الغزالي"],
  ["رسالة في العقل", "الفارابي"],
  ["الرد على المنطقيين", "ابن تيمية"],
  ["درء تعارض العقل والنقل", "ابن تيمية"],
  ["التفكير فريضة إسلامية", "عباس محمود العقاد"],
  ["الله", "عباس محمود العقاد"],
  ["الفلسفة القرآنية", "محمد باقر الصدر"],
  ["اقتصادنا", "محمد باقر الصدر"],
  ["فلسفتنا", "محمد باقر الصدر"],
  ["الأسس المنطقية للاستقراء", "محمد باقر الصدر"],
  ["الإنسان والحضارة", "مالك بن نبي"],
  ["شروط النهضة", "مالك بن نبي"],
  ["مشكلة الأفكار في العالم الإسلامي", "مالك بن نبي"],
  ["الظاهرة القرآنية", "مالك بن نبي"],
  ["مشكلة الثقافة", "مالك بن نبي"],
];

const arabicStoriesTitles: Array<[string, string]> = [
  ["قصص الأنبياء", "ابن كثير"],
  ["كليلة ودمنة", "ابن المقفع"],
  ["ألف ليلة وليلة", "تراث شعبي"],
  ["البخلاء", "الجاحظ"],
  ["مقامات الحريري", "الحريري"],
  ["مقامات بديع الزمان الهمذاني", "بديع الزمان الهمذاني"],
  ["وحي القلم — قصص", "مصطفى صادق الرافعي"],
  ["أرخص ليالي", "يوسف إدريس"],
  ["جمهورية فرحات", "يوسف إدريس"],
  ["العسكري الأسود", "يوسف إدريس"],
  ["بيت من لحم", "يوسف إدريس"],
  ["النداهة", "يوسف إدريس"],
  ["دنيا الله", "نجيب محفوظ"],
  ["همس الجنون", "نجيب محفوظ"],
  ["تحت المظلة", "نجيب محفوظ"],
  ["حكايات حارتنا", "نجيب محفوظ"],
  ["الشيخ والبحر — حكاية عربية", "إعداد عربي"],
  ["أرض البرتقال الحزين", "غسان كنفاني"],
  ["عن الرجال والبنادق", "غسان كنفاني"],
  ["عالم ليس لنا", "غسان كنفاني"],
  ["النمور في اليوم العاشر", "زكريا تامر"],
  ["دمشق الحرائق", "زكريا تامر"],
  ["صهيل الجواد الأبيض", "إبراهيم نصر الله"],
  ["نوادر جحا", "تراث شعبي"],
  ["حكايات جدتي", "تراث شعبي عربي"],
  ["أساطير عربية", "إعداد عربي"],
  ["حكايات المدن القديمة", "إعداد عربي"],
  ["قصص الصالحين", "إعداد عربي"],
  ["قصص الحيوان في القرآن", "أحمد بهجت"],
  ["مغامرات السندباد", "تراث شعبي"],
  ["علاء الدين والمصباح السحري", "ألف ليلة وليلة"],
  ["علي بابا والأربعون لصاً", "ألف ليلة وليلة"],
  ["حكايات الملوك والحكماء", "تراث عربي"],
  ["مجالس الأدب", "إعداد عربي"],
  ["قصص قصيرة من التراث الأندلسي", "إعداد عربي"],
];

const arabicNovelTitles: Array<[string, string]> = [
  ["موسم الهجرة إلى الشمال", "الطيب صالح"],
  ["عرس الزين", "الطيب صالح"],
  ["بندر شاه", "الطيب صالح"],
  ["ساق البامبو", "سعود السنعوسي"],
  ["فئران أمي حصة", "سعود السنعوسي"],
  ["عزازيل", "يوسف زيدان"],
  ["النبطي", "يوسف زيدان"],
  ["ظل الأفعى", "يوسف زيدان"],
  ["ذاكرة الجسد", "أحلام مستغانمي"],
  ["فوضى الحواس", "أحلام مستغانمي"],
  ["عابر سرير", "أحلام مستغانمي"],
  ["زقاق المدق", "نجيب محفوظ"],
  ["خان الخليلي", "نجيب محفوظ"],
  ["السراب", "نجيب محفوظ"],
  ["بداية ونهاية", "نجيب محفوظ"],
  ["الطريق", "نجيب محفوظ"],
  ["الشحاذ", "نجيب محفوظ"],
  ["السمان والخريف", "نجيب محفوظ"],
  ["ميرامار", "نجيب محفوظ"],
  ["الحرافيش", "نجيب محفوظ"],
  ["بين القصرين", "نجيب محفوظ"],
  ["قصر الشوق", "نجيب محفوظ"],
  ["السكرية", "نجيب محفوظ"],
  ["أولاد حارتنا", "نجيب محفوظ"],
  ["رجال في الشمس", "غسان كنفاني"],
  ["ما تبقى لكم", "غسان كنفاني"],
  ["عائد إلى حيفا", "غسان كنفاني"],
  ["أم سعد", "غسان كنفاني"],
  ["مدن الملح", "عبد الرحمن منيف"],
  ["شرق المتوسط", "عبد الرحمن منيف"],
  ["حين تركنا الجسر", "عبد الرحمن منيف"],
  ["النهايات", "عبد الرحمن منيف"],
  ["الحي اللاتيني", "سهيل إدريس"],
  ["دعاء الكروان", "طه حسين"],
  ["شجرة البؤس", "طه حسين"],
  ["عودة الروح", "توفيق الحكيم"],
  ["يوميات نائب في الأرياف", "توفيق الحكيم"],
  ["عصفور من الشرق", "توفيق الحكيم"],
  ["الحي اللاتيني", "سهيل إدريس"],
  ["موسم صيد الغزلان", "أحمد مراد"],
  ["الفيل الأزرق", "أحمد مراد"],
  ["تراب الماس", "أحمد مراد"],
  ["يوتوبيا", "أحمد خالد توفيق"],
  ["في ممر الفئران", "أحمد خالد توفيق"],
  ["الأسود يليق بك", "أحلام مستغانمي"],
  ["واحة الغروب", "بهاء طاهر"],
  ["خالتي صفية والدير", "بهاء طاهر"],
  ["الحب في المنفى", "بهاء طاهر"],
  ["الطوق والأسورة", "يحيى الطاهر عبد الله"],
  ["موت صغير", "محمد حسن علوان"],
  ["القوقعة", "مصطفى خليفة"],
  ["سمرقند", "أمين معلوف"],
  ["ليون الإفريقي", "أمين معلوف"],
  ["حدائق الرئيس", "محسن الرملي"],
  ["باب الشمس", "إلياس خوري"],
  ["يالو", "إلياس خوري"],
  ["الطلياني", "شكري المبخوت"],
  ["الخبز الحافي", "محمد شكري"],
  ["زمن الخيول البيضاء", "إبراهيم نصر الله"],
  ["قناديل ملك الجليل", "إبراهيم نصر الله"],
];

const multilingualSeeds: Seed[] = [
  { title: "Le Coran — Traduction française", author: "Hamidullah", category: "religious", language: "fr", description: "Traduction poétique et fidèle du texte sacré.", pageProfile: "epic" },
  { title: "The Holy Bible — King James", author: "Classic Edition", category: "religious", language: "en", description: "The timeless King James translation of the Holy Bible.", pageProfile: "epic" },
  { title: "La Bible de Jérusalem", author: "École Biblique", category: "religious", language: "fr", description: "Une référence francophone des Saintes Écritures.", pageProfile: "epic" },
  { title: "El Corán — Traducción", author: "Julio Cortés", category: "religious", language: "es", description: "Traducción al español del libro sagrado del islam.", pageProfile: "epic" },
  { title: "Confessions", author: "Saint Augustin", category: "religious", language: "fr", description: "Le voyage spirituel intime d'Augustin d'Hippone.", pageProfile: "long" },
  { title: "The Imitation of Christ", author: "Thomas à Kempis", category: "religious", language: "en", description: "A timeless Christian devotional classic.", pageProfile: "long" },
  { title: "Méditations", author: "Marc Aurèle", category: "philosophy", language: "fr", description: "Les pensées intimes d'un empereur stoïcien.", pageProfile: "long" },
  { title: "Beyond Good and Evil", author: "Friedrich Nietzsche", category: "philosophy", language: "en", description: "A bold critique of moral philosophy.", pageProfile: "long" },
  { title: "Thus Spoke Zarathustra", author: "Friedrich Nietzsche", category: "philosophy", language: "en", description: "The poetic philosophical masterpiece.", pageProfile: "long" },
  { title: "El Mundo de Sofía", author: "Jostein Gaarder", category: "philosophy", language: "es", description: "Un viaje fascinante por la historia de la filosofía.", pageProfile: "long" },
  { title: "Ética a Nicómaco", author: "Aristóteles", category: "philosophy", language: "es", description: "Tratado fundacional sobre la virtud y la felicidad.", pageProfile: "long" },
  { title: "Le Mythe de Sisyphe", author: "Albert Camus", category: "philosophy", language: "fr", description: "Essai sur l'absurde et le sens de la vie.", pageProfile: "long" },
  { title: "L'Être et le Néant", author: "Jean-Paul Sartre", category: "philosophy", language: "fr", description: "Œuvre majeure de l'existentialisme.", pageProfile: "epic" },
  { title: "The Republic", author: "Plato", category: "philosophy", language: "en", description: "Plato's exploration of justice and the ideal state.", pageProfile: "long" },
  { title: "Discurso del Método", author: "René Descartes", category: "philosophy", language: "es", description: "El nacimiento del pensamiento moderno.", pageProfile: "medium" },
  { title: "Le Petit Prince", author: "Antoine de Saint-Exupéry", category: "children", language: "fr", description: "Une fable poétique pour les enfants et les rêveurs.", pageProfile: "short" },
  { title: "El Principito", author: "Antoine de Saint-Exupéry", category: "children", language: "es", description: "Una historia de amistad y descubrimiento.", pageProfile: "short" },
  { title: "Where the Wild Things Are", author: "Maurice Sendak", category: "children", language: "en", description: "A magical journey to the land of wild creatures.", pageProfile: "short" },
  { title: "The Very Hungry Caterpillar", author: "Eric Carle", category: "children", language: "en", description: "A beloved tale of growth and transformation.", pageProfile: "short" },
  { title: "Charlie and the Chocolate Factory", author: "Roald Dahl", category: "children", language: "en", description: "Willy Wonka and the magical golden ticket.", pageProfile: "medium" },
  { title: "Matilda", author: "Roald Dahl", category: "children", language: "en", description: "The story of an extraordinary little girl.", pageProfile: "medium" },
  { title: "Les Contes de Perrault", author: "Charles Perrault", category: "children", language: "fr", description: "Contes classiques pour petits et grands.", pageProfile: "short" },
  { title: "Cuentos de los hermanos Grimm", author: "Hermanos Grimm", category: "children", language: "es", description: "Cuentos clásicos de hadas.", pageProfile: "short" },
  { title: "Nouvelles complètes", author: "Guy de Maupassant", category: "stories", language: "fr", description: "Recueil des plus belles nouvelles.", pageProfile: "medium" },
  { title: "The Great Short Stories", author: "Edgar Allan Poe", category: "stories", language: "en", description: "Dark, mysterious, unforgettable tales.", pageProfile: "medium" },
  { title: "Cuentos de Borges", author: "Jorge Luis Borges", category: "stories", language: "es", description: "Laberintos literarios magistrales.", pageProfile: "medium" },
  { title: "The Stories of Anton Chekhov", author: "Anton Chekhov", category: "stories", language: "en", description: "Masterful short fiction from Russia.", pageProfile: "medium" },
  { title: "Cuentos de Cortázar", author: "Julio Cortázar", category: "stories", language: "es", description: "Realidad y fantasía entrelazadas.", pageProfile: "medium" },
  { title: "Dubliners", author: "James Joyce", category: "stories", language: "en", description: "Fifteen interlinked stories of Dublin life.", pageProfile: "medium" },
  { title: "L'Étranger", author: "Albert Camus", category: "novels", language: "fr", description: "Roman existentiel inoubliable.", pageProfile: "long" },
  { title: "La Peste", author: "Albert Camus", category: "novels", language: "fr", description: "Allégorie sur la résistance humaine.", pageProfile: "long" },
  { title: "Madame Bovary", author: "Gustave Flaubert", category: "novels", language: "fr", description: "Chef-d'œuvre du réalisme français.", pageProfile: "epic" },
  { title: "Notre-Dame de Paris", author: "Victor Hugo", category: "novels", language: "fr", description: "Roman épique gothique de Hugo.", pageProfile: "epic" },
  { title: "1984", author: "George Orwell", category: "novels", language: "en", description: "A chilling dystopian masterpiece.", pageProfile: "long" },
  { title: "Animal Farm", author: "George Orwell", category: "novels", language: "en", description: "A sharp political allegory.", pageProfile: "medium" },
  { title: "Pride and Prejudice", author: "Jane Austen", category: "novels", language: "en", description: "A timeless story of love and society.", pageProfile: "epic" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", category: "novels", language: "en", description: "A profound American classic.", pageProfile: "long" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "novels", language: "en", description: "The American dream in the Jazz Age.", pageProfile: "medium" },
  { title: "Cien años de soledad", author: "Gabriel García Márquez", category: "novels", language: "es", description: "El realismo mágico en su forma más pura.", pageProfile: "epic" },
  { title: "El amor en los tiempos del cólera", author: "Gabriel García Márquez", category: "novels", language: "es", description: "Una historia de amor que vence al tiempo.", pageProfile: "epic" },
  { title: "Don Quijote de la Mancha", author: "Miguel de Cervantes", category: "novels", language: "es", description: "La obra cumbre de la literatura española.", pageProfile: "epic" },
  { title: "La Casa de los Espíritus", author: "Isabel Allende", category: "novels", language: "es", description: "Una saga familiar mágica.", pageProfile: "epic" },
];

const allSeeds: Seed[] = [
  ...arabicAudiobookTitles.map(([title, author, duration]) => ({
    title,
    author,
    duration,
    category: "audiobooks" as Category,
    language: "ar" as Lang,
    description: `كتاب صوتي عربي مطوّل بصوت مفعّل داخل المتصفح — ${author}.`,
    pageProfile: "long" as PageProfile,
  })),
  ...arabicPhilosophyTitles.map(([title, author]) => ({
    title,
    author,
    category: "philosophy" as Category,
    language: "ar" as Lang,
    description: `كتاب فلسفي عربي بقراءة ممتدة وصفحات مطولة — ${author}.`,
    pageProfile: "long" as PageProfile,
  })),
  ...arabicStoriesTitles.map(([title, author]) => ({
    title,
    author,
    category: "stories" as Category,
    language: "ar" as Lang,
    description: `مجموعة قصصية عربية وصفحات قراءة متصلة — ${author}.`,
    pageProfile: "medium" as PageProfile,
  })),
  ...arabicNovelTitles.map(([title, author]) => ({
    title,
    author,
    category: "novels" as Category,
    language: "ar" as Lang,
    description: `رواية عربية مطولة بتجربة قراءة كاملة داخل التطبيق — ${author}.`,
    pageProfile: "epic" as PageProfile,
  })),
  ...multilingualSeeds,
];

export const books: Book[] = allSeeds.map((seed, index) => ({
  id: String(index + 1),
  title: seed.title,
  author: seed.author,
  category: seed.category,
  language: seed.language,
  cover: coverFor(seed.category),
  description: seed.description,
  pages: [],
  pageCount: pageCountForSeed(seed),
  duration: seed.duration,
  rating: seed.rating ?? stableRating(seed.title),
}));

const fullBookCache = new Map<string, Book>();

export const getBook = (id: string) => {
  const cached = fullBookCache.get(id);
  if (cached) return cached;

  const book = books.find((entry) => entry.id === id);
  if (!book) return undefined;

  const fullBook: Book = {
    ...book,
    pages: generatePages(book, book.pageCount),
  };

  fullBookCache.set(id, fullBook);
  return fullBook;
};
