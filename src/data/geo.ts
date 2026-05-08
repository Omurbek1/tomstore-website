// Hyperlocal geo data — full Kyrgyzstan district coverage
// URL patterns supported:
//   /[region]/[district]/[category]  →  /chuy/kant/noutbuki
//   /[category]/[city]               →  /noutbuki/bishkek
//   /[category]/[region]/[district]  →  /noutbuki/chuy/sokuluk

export type GeoCategory = {
  slug: string;
  nameRu: string;
  nameEn: string;
  nameKy: string;
  genRu: string;    // genitive "ноутбуков"
  accusRu: string;  // accusative "ноутбук"
  catalogPath: string;
  icon: string;
};

export type GeoSettlement = {
  slug: string;
  nameRu: string;
  nameEn: string;
  nameKy: string;
  inRu: string;
  deliveryDays: string;
};

export type GeoDistrict = {
  slug: string;
  nameRu: string;
  nameEn: string;
  nameKy: string;
  inRu: string;
  regionSlug: string;
  deliveryDays: string;
  adminCenter: string;
  distanceFromCapital: string;
  settlements: GeoSettlement[];
};

export type GeoRegion = {
  slug: string;
  nameRu: string;
  nameEn: string;
  nameKy: string;
  capitalRu: string;
  deliveryDays: string;
  districts: GeoDistrict[];
};

export type MajorCity = {
  slug: string;
  nameRu: string;
  nameEn: string;
  nameKy: string;
  inRu: string;
  regionRu: string;
  deliveryDays: string;
};

// ─── Categories ───────────────────────────────────────────────────────────────

export const GEO_CATEGORIES: GeoCategory[] = [
  { slug: "noutbuki",    nameRu: "Ноутбуки",         nameEn: "Laptops",      nameKy: "Ноутбуктар",    genRu: "ноутбуков",    accusRu: "ноутбук",    catalogPath: "/catalog/laptops",     icon: "💻" },
  { slug: "printery",    nameRu: "Принтеры и МФУ",   nameEn: "Printers",     nameKy: "Принтерлер",    genRu: "принтеров",    accusRu: "принтер",    catalogPath: "/catalog/printers",    icon: "🖨️" },
  { slug: "kompyutery",  nameRu: "Компьютеры",       nameEn: "Computers",    nameKy: "Компьютерлер",  genRu: "компьютеров",  accusRu: "компьютер",  catalogPath: "/catalog/computers",   icon: "🖥️" },
  { slug: "monitory",    nameRu: "Мониторы",         nameEn: "Monitors",     nameKy: "Мониторлор",    genRu: "мониторов",    accusRu: "монитор",    catalogPath: "/catalog/monitors",    icon: "🖥" },
  { slug: "aksessuary",  nameRu: "Аксессуары",       nameEn: "Accessories",  nameKy: "Аксессуарлар",  genRu: "аксессуаров",  accusRu: "аксессуары", catalogPath: "/catalog/accessories", icon: "🖱️" },
];

// ─── 14 Major cities (for /[category]/[city] pattern) ────────────────────────

export const MAJOR_CITIES: MajorCity[] = [
  { slug: "bishkek",    nameRu: "Бишкек",      nameEn: "Bishkek",     nameKy: "Бишкек",     inRu: "в Бишкеке",      regionRu: "Чуйская область",        deliveryDays: "1 день"   },
  { slug: "osh",        nameRu: "Ош",          nameEn: "Osh",         nameKy: "Ош",         inRu: "в Оше",          regionRu: "Ошская область",         deliveryDays: "2–3 дня"  },
  { slug: "jalal-abad", nameRu: "Джалал-Абад", nameEn: "Jalal-Abad",  nameKy: "Жалал-Абад", inRu: "в Джалал-Абаде", regionRu: "Джалал-Абадская область",deliveryDays: "2–3 дня"  },
  { slug: "karakol",    nameRu: "Каракол",     nameEn: "Karakol",     nameKy: "Каракол",    inRu: "в Караколе",     regionRu: "Иссык-Кульская область", deliveryDays: "2–3 дня"  },
  { slug: "naryn",      nameRu: "Нарын",       nameEn: "Naryn",       nameKy: "Нарын",      inRu: "в Нарыне",       regionRu: "Нарынская область",      deliveryDays: "3–4 дня"  },
  { slug: "talas",      nameRu: "Талас",       nameEn: "Talas",       nameKy: "Талас",      inRu: "в Таласе",       regionRu: "Таласская область",      deliveryDays: "2–3 дня"  },
  { slug: "batken",     nameRu: "Баткен",      nameEn: "Batken",      nameKy: "Баткен",     inRu: "в Баткене",      regionRu: "Баткенская область",     deliveryDays: "3–4 дня"  },
  { slug: "tokmok",     nameRu: "Токмок",      nameEn: "Tokmok",      nameKy: "Токмок",     inRu: "в Токмоке",      regionRu: "Чуйская область",        deliveryDays: "1–2 дня"  },
  { slug: "kara-balta", nameRu: "Кара-Балта",  nameEn: "Kara-Balta",  nameKy: "Кара-Балта", inRu: "в Кара-Балте",   regionRu: "Чуйская область",        deliveryDays: "1–2 дня"  },
  { slug: "kant",       nameRu: "Кант",        nameEn: "Kant",        nameKy: "Кант",       inRu: "в Канте",        regionRu: "Чуйская область",        deliveryDays: "1–2 дня"  },
  { slug: "balykchy",   nameRu: "Балыкчы",     nameEn: "Balykchy",    nameKy: "Балыкчы",    inRu: "в Балыкчы",      regionRu: "Иссык-Кульская область", deliveryDays: "2–3 дня"  },
  { slug: "uzgen",      nameRu: "Узген",       nameEn: "Uzgen",       nameKy: "Өзгөн",      inRu: "в Узгене",       regionRu: "Ошская область",         deliveryDays: "2–3 дня"  },
  { slug: "kyzyl-kiya", nameRu: "Кызыл-Кия",  nameEn: "Kyzyl-Kiya",  nameKy: "Кызыл-Кыя",  inRu: "в Кызыл-Кие",    regionRu: "Баткенская область",     deliveryDays: "3–4 дня"  },
  { slug: "kara-suu",   nameRu: "Кара-Суу",    nameEn: "Kara-Suu",    nameKy: "Кара-Суу",   inRu: "в Кара-Суу",     regionRu: "Ошская область",         deliveryDays: "2–3 дня"  },
];

// ─── Chuy Oblast ──────────────────────────────────────────────────────────────

const CHUY: GeoRegion = {
  slug: "chuy",
  nameRu: "Чуйская область",
  nameEn: "Chuy Region",
  nameKy: "Чүй облусу",
  capitalRu: "Бишкек",
  deliveryDays: "1–2 дня",
  districts: [
    {
      slug: "bishkek", nameRu: "Бишкек", nameEn: "Bishkek", nameKy: "Бишкек",
      inRu: "в Бишкеке", regionSlug: "chuy", deliveryDays: "1 день",
      adminCenter: "Бишкек", distanceFromCapital: "столица КР",
      settlements: [
        { slug: "pervomaysky", nameRu: "Первомайский р-н", nameEn: "Pervomaysky", nameKy: "Первомай р.", inRu: "в Первомайском районе", deliveryDays: "1 день" },
        { slug: "leninsky",    nameRu: "Ленинский р-н",    nameEn: "Leninsky",    nameKy: "Ленин р.",    inRu: "в Ленинском районе",    deliveryDays: "1 день" },
        { slug: "oktyabrsky",  nameRu: "Октябрьский р-н",  nameEn: "Oktyabrsky",  nameKy: "Октябрь р.",  inRu: "в Октябрьском районе",  deliveryDays: "1 день" },
        { slug: "sverdlovsky", nameRu: "Свердловский р-н", nameEn: "Sverdlovsky", nameKy: "Свердлов р.", inRu: "в Свердловском районе", deliveryDays: "1 день" },
      ],
    },
    {
      slug: "kant", nameRu: "Кант", nameEn: "Kant", nameKy: "Кант",
      inRu: "в Канте", regionSlug: "chuy", deliveryDays: "1–2 дня",
      adminCenter: "Кант", distanceFromCapital: "20 км от Бишкека",
      settlements: [
        { slug: "kant-center",  nameRu: "Кант (центр)",  nameEn: "Kant",        nameKy: "Кант",      inRu: "в Канте",       deliveryDays: "1–2 дня" },
        { slug: "ivanovka",     nameRu: "Ивановка",      nameEn: "Ivanovka",    nameKy: "Ивановка",  inRu: "в Ивановке",    deliveryDays: "1–2 дня" },
        { slug: "vasilyevka",   nameRu: "Васильевка",    nameEn: "Vasilyevka",  nameKy: "Василевка", inRu: "в Васильевке",  deliveryDays: "1–2 дня" },
      ],
    },
    {
      slug: "tokmok", nameRu: "Токмок", nameEn: "Tokmok", nameKy: "Токмок",
      inRu: "в Токмоке", regionSlug: "chuy", deliveryDays: "1–2 дня",
      adminCenter: "Токмок", distanceFromCapital: "65 км от Бишкека",
      settlements: [
        { slug: "tokmok-center", nameRu: "Токмок (центр)", nameEn: "Tokmok",    nameKy: "Токмок",    inRu: "в Токмоке",    deliveryDays: "1–2 дня" },
        { slug: "bystrovka",     nameRu: "Быстровка",      nameEn: "Bystrovka", nameKy: "Быстровка", inRu: "в Быстровке",  deliveryDays: "2 дня" },
      ],
    },
    {
      slug: "kara-balta", nameRu: "Кара-Балта", nameEn: "Kara-Balta", nameKy: "Кара-Балта",
      inRu: "в Кара-Балте", regionSlug: "chuy", deliveryDays: "1–2 дня",
      adminCenter: "Кара-Балта", distanceFromCapital: "60 км от Бишкека",
      settlements: [
        { slug: "kara-balta-c", nameRu: "Кара-Балта",  nameEn: "Kara-Balta", nameKy: "Кара-Балта", inRu: "в Кара-Балте", deliveryDays: "1–2 дня" },
        { slug: "sosnovka",     nameRu: "Сосновка",    nameEn: "Sosnovka",   nameKy: "Сосновка",   inRu: "в Сосновке",   deliveryDays: "2 дня" },
      ],
    },
    {
      slug: "sokuluk", nameRu: "Сокулук", nameEn: "Sokuluk", nameKy: "Сокулук",
      inRu: "в Сокулуке", regionSlug: "chuy", deliveryDays: "1–2 дня",
      adminCenter: "Сокулук", distanceFromCapital: "25 км от Бишкека",
      settlements: [
        { slug: "sokuluk-c",       nameRu: "Сокулук",       nameEn: "Sokuluk",      nameKy: "Сокулук",      inRu: "в Сокулуке",    deliveryDays: "1–2 дня" },
        { slug: "belovodskoe",     nameRu: "Беловодское",   nameEn: "Belovodskoe",  nameKy: "Беловодское",  inRu: "в Беловодском", deliveryDays: "2 дня" },
        { slug: "krasnorechenskoe",nameRu: "Красноречное",  nameEn: "Krasnorechne", nameKy: "Красноречное", inRu: "в Красноречном",deliveryDays: "2 дня" },
      ],
    },
    {
      slug: "alamudun", nameRu: "Аламүдүн", nameEn: "Alamudun", nameKy: "Аламүдүн",
      inRu: "в Аламудуне", regionSlug: "chuy", deliveryDays: "1–2 дня",
      adminCenter: "Лебединовка", distanceFromCapital: "15 км от Бишкека",
      settlements: [
        { slug: "lebedinovka", nameRu: "Лебединовка", nameEn: "Lebedinovka", nameKy: "Лебединовка", inRu: "в Лебединовке", deliveryDays: "1–2 дня" },
        { slug: "orlovka",     nameRu: "Орловка",     nameEn: "Orlovka",     nameKy: "Орловка",     inRu: "в Орловке",     deliveryDays: "2 дня" },
        { slug: "koi-tash",    nameRu: "Кой-Таш",     nameEn: "Koi-Tash",    nameKy: "Кой-Таш",     inRu: "в Кой-Таше",    deliveryDays: "2 дня" },
      ],
    },
    {
      slug: "issyk-ata", nameRu: "Ысык-Ата", nameEn: "Issyk-Ata", nameKy: "Ысык-Ата",
      inRu: "в Ысык-Ате", regionSlug: "chuy", deliveryDays: "2–3 дня",
      adminCenter: "Ысык-Ата", distanceFromCapital: "45 км от Бишкека",
      settlements: [
        { slug: "issyk-ata-c", nameRu: "Ысык-Ата",     nameEn: "Issyk-Ata",   nameKy: "Ысык-Ата",    inRu: "в Ысык-Ате",    deliveryDays: "2–3 дня" },
        { slug: "shamaldysay", nameRu: "Шамалды-Сай",  nameEn: "Shamaldysay", nameKy: "Шамалды-Сай", inRu: "в Шамалды-Сай", deliveryDays: "2–3 дня" },
      ],
    },
    {
      slug: "jayyl", nameRu: "Жайыл", nameEn: "Jayyl", nameKy: "Жайыл",
      inRu: "в Жайыле", regionSlug: "chuy", deliveryDays: "2–3 дня",
      adminCenter: "Кара-Балта", distanceFromCapital: "60 км от Бишкека",
      settlements: [
        { slug: "jayyl-c",     nameRu: "Жайыл",      nameEn: "Jayyl",       nameKy: "Жайыл",      inRu: "в Жайыле",      deliveryDays: "2–3 дня" },
        { slug: "aleksandrovka",nameRu: "Александровка",nameEn: "Aleksandrovka",nameKy: "Александровка",inRu: "в Александровке",deliveryDays: "2–3 дня" },
      ],
    },
    {
      slug: "panfilov", nameRu: "Панфилов", nameEn: "Panfilov", nameKy: "Панфилов",
      inRu: "в Панфиловском районе", regionSlug: "chuy", deliveryDays: "2–3 дня",
      adminCenter: "Кара-Суу", distanceFromCapital: "80 км от Бишкека",
      settlements: [
        { slug: "kara-suu-p", nameRu: "Кара-Суу",  nameEn: "Kara-Suu",  nameKy: "Кара-Суу",  inRu: "в Кара-Суу",    deliveryDays: "2–3 дня" },
        { slug: "alamedin-s", nameRu: "Аламедин",  nameEn: "Alamedin",  nameKy: "Аламедин",  inRu: "в Аламедине",   deliveryDays: "2–3 дня" },
      ],
    },
    {
      slug: "moskva", nameRu: "Московский район", nameEn: "Moskovsky", nameKy: "Москва р.",
      inRu: "в Московском районе", regionSlug: "chuy", deliveryDays: "2–3 дня",
      adminCenter: "Беловодское", distanceFromCapital: "35 км от Бишкека",
      settlements: [
        { slug: "belov-m",        nameRu: "Беловодское",    nameEn: "Belovodskoe",    nameKy: "Беловодское",    inRu: "в Беловодском",    deliveryDays: "2–3 дня" },
        { slug: "krasnor-m",      nameRu: "Красноречное",   nameEn: "Krasnorechne",   nameKy: "Красноречное",   inRu: "в Красноречном",   deliveryDays: "2–3 дня" },
      ],
    },
    {
      slug: "kemin", nameRu: "Кемин", nameEn: "Kemin", nameKy: "Кемин",
      inRu: "в Кемине", regionSlug: "chuy", deliveryDays: "2–3 дня",
      adminCenter: "Кемин", distanceFromCapital: "100 км от Бишкека",
      settlements: [
        { slug: "kemin-c",    nameRu: "Кемин",      nameEn: "Kemin",       nameKy: "Кемин",      inRu: "в Кемине",     deliveryDays: "2–3 дня" },
        { slug: "kochkor-ata",nameRu: "Кочкор-Ата", nameEn: "Kochkor-Ata", nameKy: "Кочкор-Ата", inRu: "в Кочкор-Ате", deliveryDays: "2–3 дня" },
      ],
    },
  ],
};

// ─── Osh Oblast ───────────────────────────────────────────────────────────────

const OSH: GeoRegion = {
  slug: "osh",
  nameRu: "Ошская область",
  nameEn: "Osh Region",
  nameKy: "Ош облусу",
  capitalRu: "Ош",
  deliveryDays: "2–3 дня",
  districts: [
    { slug: "osh-city",    nameRu: "Ош",          nameEn: "Osh",          nameKy: "Ош",          inRu: "в Оше",          regionSlug: "osh", deliveryDays: "2–3 дня", adminCenter: "Ош",          distanceFromCapital: "750 км от Бишкека",
      settlements: [
        { slug: "osh-c",      nameRu: "Ош (центр)",   nameEn: "Osh",        nameKy: "Ош",         inRu: "в Оше",          deliveryDays: "2–3 дня" },
        { slug: "masyieva",   nameRu: "Масыева",      nameEn: "Masyieva",   nameKy: "Масыева",    inRu: "в Масыево",      deliveryDays: "2–3 дня" },
      ] },
    { slug: "kara-suu-d",  nameRu: "Кара-Суу",    nameEn: "Kara-Suu",     nameKy: "Кара-Суу",    inRu: "в Кара-Суу",     regionSlug: "osh", deliveryDays: "2–3 дня", adminCenter: "Кара-Суу",    distanceFromCapital: "760 км от Бишкека",
      settlements: [{ slug: "kara-suu-o", nameRu: "Кара-Суу", nameEn: "Kara-Suu", nameKy: "Кара-Суу", inRu: "в Кара-Суу", deliveryDays: "2–3 дня" }] },
    { slug: "aravan",      nameRu: "Araван",       nameEn: "Aravan",       nameKy: "Аравaн",      inRu: "в Araване",      regionSlug: "osh", deliveryDays: "3 дня",   adminCenter: "Araван",      distanceFromCapital: "755 км от Бишкека",
      settlements: [{ slug: "aravan-c", nameRu: "Araван", nameEn: "Aravan", nameKy: "Аравaн", inRu: "в Araване", deliveryDays: "3 дня" }] },
    { slug: "nookat",      nameRu: "Ноокат",       nameEn: "Nookat",       nameKy: "Ноокат",      inRu: "в Ноокате",      regionSlug: "osh", deliveryDays: "3 дня",   adminCenter: "Ноокат",      distanceFromCapital: "780 км от Бишкека",
      settlements: [{ slug: "nookat-c", nameRu: "Ноокат", nameEn: "Nookat", nameKy: "Ноокат", inRu: "в Ноокате", deliveryDays: "3 дня" }] },
    { slug: "uzgen",       nameRu: "Узген",        nameEn: "Uzgen",        nameKy: "Өзгөн",       inRu: "в Узгене",       regionSlug: "osh", deliveryDays: "3 дня",   adminCenter: "Узген",       distanceFromCapital: "720 км от Бишкека",
      settlements: [{ slug: "uzgen-c", nameRu: "Узген", nameEn: "Uzgen", nameKy: "Өзгөн", inRu: "в Узгене", deliveryDays: "3 дня" }] },
    { slug: "kara-kulzha", nameRu: "Кара-Кулжа",  nameEn: "Kara-Kulzha",  nameKy: "Кара-Кулжа",  inRu: "в Кара-Кулже",   regionSlug: "osh", deliveryDays: "3–4 дня", adminCenter: "Кара-Кулжа",  distanceFromCapital: "800 км от Бишкека",
      settlements: [{ slug: "kara-kulzha-c", nameRu: "Кара-Кулжа", nameEn: "Kara-Kulzha", nameKy: "Кара-Кулжа", inRu: "в Кара-Кулже", deliveryDays: "3–4 дня" }] },
    { slug: "chong-alay",  nameRu: "Чоң-Алай",    nameEn: "Chong-Alay",   nameKy: "Чоң-Алай",    inRu: "в Чоң-Алае",     regionSlug: "osh", deliveryDays: "4–5 дней",adminCenter: "Ирдык",       distanceFromCapital: "850 км от Бишкека",
      settlements: [{ slug: "chong-alay-c", nameRu: "Чоң-Алай", nameEn: "Chong-Alay", nameKy: "Чоң-Алай", inRu: "в Чоң-Алае", deliveryDays: "4–5 дней" }] },
  ],
};

// ─── Jalal-Abad Oblast ────────────────────────────────────────────────────────

const JALAL_ABAD: GeoRegion = {
  slug: "jalal-abad",
  nameRu: "Джалал-Абадская область",
  nameEn: "Jalal-Abad Region",
  nameKy: "Жалал-Абад облусу",
  capitalRu: "Джалал-Абад",
  deliveryDays: "2–3 дня",
  districts: [
    { slug: "jalal-abad-c", nameRu: "Джалал-Абад",  nameEn: "Jalal-Abad",    nameKy: "Жалал-Абад", inRu: "в Джалал-Абаде",  regionSlug: "jalal-abad", deliveryDays: "2–3 дня", adminCenter: "Джалал-Абад",  distanceFromCapital: "650 км от Бишкека",
      settlements: [
        { slug: "jal-c",       nameRu: "Джалал-Абад",  nameEn: "Jalal-Abad",  nameKy: "Жалал-Абад",  inRu: "в Джалал-Абаде", deliveryDays: "2–3 дня" },
        { slug: "mailuu-suu",  nameRu: "Майлуу-Суу",   nameEn: "Mailuu-Suu",  nameKy: "Майлуу-Суу",  inRu: "в Майлуу-Суу",   deliveryDays: "3 дня" },
        { slug: "tash-kumyr",  nameRu: "Таш-Кумыр",    nameEn: "Tash-Kumyr",  nameKy: "Таш-Кумыр",   inRu: "в Таш-Кумыре",   deliveryDays: "3 дня" },
      ] },
    { slug: "suzak",        nameRu: "Сузак",        nameEn: "Suzak",         nameKy: "Сузак",      inRu: "в Сузаке",        regionSlug: "jalal-abad", deliveryDays: "3 дня",   adminCenter: "Сузак",        distanceFromCapital: "660 км от Бишкека",
      settlements: [{ slug: "suzak-c", nameRu: "Сузак", nameEn: "Suzak", nameKy: "Сузак", inRu: "в Сузаке", deliveryDays: "3 дня" }] },
    { slug: "bazar-korgon", nameRu: "Базар-Коргон", nameEn: "Bazar-Korgon",  nameKy: "Базар-Коргон",inRu: "в Базар-Коргоне", regionSlug: "jalal-abad", deliveryDays: "3 дня",   adminCenter: "Базар-Коргон", distanceFromCapital: "620 км от Бишкека",
      settlements: [{ slug: "bazk-c", nameRu: "Базар-Коргон", nameEn: "Bazar-Korgon", nameKy: "Базар-Коргон", inRu: "в Базар-Коргоне", deliveryDays: "3 дня" }] },
    { slug: "nooken",       nameRu: "Ноокен",       nameEn: "Nooken",        nameKy: "Ноокен",     inRu: "в Ноокене",       regionSlug: "jalal-abad", deliveryDays: "3 дня",   adminCenter: "Ноокен",       distanceFromCapital: "640 км от Бишкека",
      settlements: [{ slug: "nooken-c", nameRu: "Ноокен", nameEn: "Nooken", nameKy: "Ноокен", inRu: "в Ноокене", deliveryDays: "3 дня" }] },
    { slug: "ala-buka",     nameRu: "Ала-Бука",     nameEn: "Ala-Buka",      nameKy: "Ала-Бука",   inRu: "в Ала-Буке",      regionSlug: "jalal-abad", deliveryDays: "3–4 дня", adminCenter: "Ала-Бука",      distanceFromCapital: "680 км от Бишкека",
      settlements: [{ slug: "ala-buka-c", nameRu: "Ала-Бука", nameEn: "Ala-Buka", nameKy: "Ала-Бука", inRu: "в Ала-Буке", deliveryDays: "3–4 дня" }] },
    { slug: "aksyy",        nameRu: "Аксый",        nameEn: "Aksyy",         nameKy: "Аксый",      inRu: "в Аксые",         regionSlug: "jalal-abad", deliveryDays: "3–4 дня", adminCenter: "Кербен",        distanceFromCapital: "670 км от Бишкека",
      settlements: [{ slug: "aksyy-c", nameRu: "Аксый", nameEn: "Aksyy", nameKy: "Аксый", inRu: "в Аксые", deliveryDays: "3–4 дня" }] },
    { slug: "toktogul",     nameRu: "Токтогул",     nameEn: "Toktogul",      nameKy: "Токтогул",   inRu: "в Токтогуле",     regionSlug: "jalal-abad", deliveryDays: "3–4 дня", adminCenter: "Токтогул",      distanceFromCapital: "550 км от Бишкека",
      settlements: [{ slug: "toktogul-c", nameRu: "Токтогул", nameEn: "Toktogul", nameKy: "Токтогул", inRu: "в Токтогуле", deliveryDays: "3–4 дня" }] },
    { slug: "chatkal",      nameRu: "Чаткал",       nameEn: "Chatkal",       nameKy: "Чаткал",     inRu: "в Чаткале",       regionSlug: "jalal-abad", deliveryDays: "4–5 дней",adminCenter: "Жаңыл",         distanceFromCapital: "580 км от Бишкека",
      settlements: [{ slug: "chatkal-c", nameRu: "Чаткал", nameEn: "Chatkal", nameKy: "Чаткал", inRu: "в Чаткале", deliveryDays: "4–5 дней" }] },
  ],
};

// ─── Issyk-Kul Oblast ─────────────────────────────────────────────────────────

const ISSYK_KUL: GeoRegion = {
  slug: "issyk-kul",
  nameRu: "Иссык-Кульская область",
  nameEn: "Issyk-Kul Region",
  nameKy: "Ысык-Көл облусу",
  capitalRu: "Каракол",
  deliveryDays: "2–3 дня",
  districts: [
    { slug: "karakol",   nameRu: "Каракол",     nameEn: "Karakol",    nameKy: "Каракол",    inRu: "в Караколе",   regionSlug: "issyk-kul", deliveryDays: "2–3 дня", adminCenter: "Каракол",    distanceFromCapital: "350 км от Бишкека",
      settlements: [
        { slug: "karakol-c",   nameRu: "Каракол",     nameEn: "Karakol",    nameKy: "Каракол",    inRu: "в Караколе",   deliveryDays: "2–3 дня" },
        { slug: "cholpon-ata", nameRu: "Чолпон-Ата",  nameEn: "Cholpon-Ata",nameKy: "Чолпон-Ата", inRu: "в Чолпон-Ате", deliveryDays: "2–3 дня" },
        { slug: "balykchy",    nameRu: "Балыкчы",     nameEn: "Balykchy",   nameKy: "Балыкчы",    inRu: "в Балыкчы",    deliveryDays: "2–3 дня" },
      ] },
    { slug: "ak-suu",    nameRu: "Ак-Суу",      nameEn: "Ak-Suu",     nameKy: "Ак-Суу",     inRu: "в Ак-Суу",     regionSlug: "issyk-kul", deliveryDays: "3 дня",   adminCenter: "Каракол",    distanceFromCapital: "370 км от Бишкека",
      settlements: [{ slug: "ak-suu-c", nameRu: "Ак-Суу", nameEn: "Ak-Suu", nameKy: "Ак-Суу", inRu: "в Ак-Суу", deliveryDays: "3 дня" }] },
    { slug: "jeti-oguz", nameRu: "Жети-Өгүз",   nameEn: "Jeti-Oguz",  nameKy: "Жети-Өгүз",  inRu: "в Жети-Өгүзе", regionSlug: "issyk-kul", deliveryDays: "3 дня",   adminCenter: "Покровка",   distanceFromCapital: "380 км от Бишкека",
      settlements: [{ slug: "jeti-oguz-c", nameRu: "Жети-Өгүз", nameEn: "Jeti-Oguz", nameKy: "Жети-Өгүз", inRu: "в Жети-Өгүзе", deliveryDays: "3 дня" }] },
    { slug: "tyup",      nameRu: "Түп",         nameEn: "Tyup",       nameKy: "Түп",        inRu: "в Түпе",       regionSlug: "issyk-kul", deliveryDays: "3 дня",   adminCenter: "Түп",        distanceFromCapital: "390 км от Бишкека",
      settlements: [{ slug: "tyup-c", nameRu: "Түп", nameEn: "Tyup", nameKy: "Түп", inRu: "в Түпе", deliveryDays: "3 дня" }] },
    { slug: "ton",       nameRu: "Тон",         nameEn: "Ton",        nameKy: "Тон",        inRu: "в Тоне",       regionSlug: "issyk-kul", deliveryDays: "3 дня",   adminCenter: "Боконбаево", distanceFromCapital: "320 км от Бишкека",
      settlements: [
        { slug: "ton-c",       nameRu: "Тон",        nameEn: "Ton",       nameKy: "Тон",       inRu: "в Тоне",       deliveryDays: "3 дня" },
        { slug: "bokonbaevo",  nameRu: "Боконбаево", nameEn: "Bokonbaevo",nameKy: "Боконбаев", inRu: "в Боконбаево", deliveryDays: "3 дня" },
      ] },
    { slug: "issyk-kul-d",nameRu: "Ысык-Көл",  nameEn: "Issyk-Kul",  nameKy: "Ысык-Көл",  inRu: "в Ысык-Кёле",  regionSlug: "issyk-kul", deliveryDays: "2–3 дня", adminCenter: "Чолпон-Ата", distanceFromCapital: "250 км от Бишкека",
      settlements: [{ slug: "issyk-kul-c", nameRu: "Ысык-Көл", nameEn: "Issyk-Kul", nameKy: "Ысык-Көл", inRu: "в Ысык-Кёле", deliveryDays: "2–3 дня" }] },
  ],
};

// ─── Naryn Oblast ─────────────────────────────────────────────────────────────

const NARYN: GeoRegion = {
  slug: "naryn",
  nameRu: "Нарынская область",
  nameEn: "Naryn Region",
  nameKy: "Нарын облусу",
  capitalRu: "Нарын",
  deliveryDays: "3–4 дня",
  districts: [
    { slug: "naryn-c",   nameRu: "Нарын",     nameEn: "Naryn",    nameKy: "Нарын",    inRu: "в Нарыне",    regionSlug: "naryn", deliveryDays: "3–4 дня", adminCenter: "Нарын",    distanceFromCapital: "350 км от Бишкека",
      settlements: [{ slug: "naryn-city", nameRu: "Нарын", nameEn: "Naryn", nameKy: "Нарын", inRu: "в Нарыне", deliveryDays: "3–4 дня" }] },
    { slug: "at-bashy",  nameRu: "Ат-Башы",   nameEn: "At-Bashy", nameKy: "Ат-Башы",  inRu: "в Ат-Башы",   regionSlug: "naryn", deliveryDays: "4 дня",   adminCenter: "Ат-Башы",  distanceFromCapital: "450 км от Бишкека",
      settlements: [{ slug: "at-bashy-c", nameRu: "Ат-Башы", nameEn: "At-Bashy", nameKy: "Ат-Башы", inRu: "в Ат-Башы", deliveryDays: "4 дня" }] },
    { slug: "kochkor",   nameRu: "Кочкор",    nameEn: "Kochkor",  nameKy: "Кочкор",   inRu: "в Кочкоре",   regionSlug: "naryn", deliveryDays: "3–4 дня", adminCenter: "Кочкор",   distanceFromCapital: "250 км от Бишкека",
      settlements: [{ slug: "kochkor-c", nameRu: "Кочкор", nameEn: "Kochkor", nameKy: "Кочкор", inRu: "в Кочкоре", deliveryDays: "3–4 дня" }] },
    { slug: "zhumgal",   nameRu: "Жумгал",    nameEn: "Zhumgal",  nameKy: "Жумгал",   inRu: "в Жумгале",   regionSlug: "naryn", deliveryDays: "4 дня",   adminCenter: "Чаек",     distanceFromCapital: "300 км от Бишкека",
      settlements: [{ slug: "zhumgal-c", nameRu: "Жумгал", nameEn: "Zhumgal", nameKy: "Жумгал", inRu: "в Жумгале", deliveryDays: "4 дня" }] },
    { slug: "ak-talaa",  nameRu: "Ак-Талаа",  nameEn: "Ak-Talaa", nameKy: "Ак-Талаа", inRu: "в Ак-Талаа",  regionSlug: "naryn", deliveryDays: "4–5 дней",adminCenter: "Баетов",   distanceFromCapital: "380 км от Бишкека",
      settlements: [{ slug: "ak-talaa-c", nameRu: "Ак-Талаа", nameEn: "Ak-Talaa", nameKy: "Ак-Талаа", inRu: "в Ак-Талаа", deliveryDays: "4–5 дней" }] },
  ],
};

// ─── Talas Oblast ─────────────────────────────────────────────────────────────

const TALAS: GeoRegion = {
  slug: "talas",
  nameRu: "Таласская область",
  nameEn: "Talas Region",
  nameKy: "Талас облусу",
  capitalRu: "Талас",
  deliveryDays: "2–3 дня",
  districts: [
    { slug: "talas-c",   nameRu: "Талас",      nameEn: "Talas",     nameKy: "Талас",     inRu: "в Таласе",    regionSlug: "talas", deliveryDays: "2–3 дня", adminCenter: "Талас",    distanceFromCapital: "200 км от Бишкека",
      settlements: [{ slug: "talas-city", nameRu: "Талас", nameEn: "Talas", nameKy: "Талас", inRu: "в Таласе", deliveryDays: "2–3 дня" }] },
    { slug: "manas",     nameRu: "Манас",      nameEn: "Manas",     nameKy: "Манас",     inRu: "в Манасе",    regionSlug: "talas", deliveryDays: "3 дня",   adminCenter: "Кировское",distanceFromCapital: "210 км от Бишкека",
      settlements: [{ slug: "manas-c", nameRu: "Манас", nameEn: "Manas", nameKy: "Манас", inRu: "в Манасе", deliveryDays: "3 дня" }] },
    { slug: "bakai-ata", nameRu: "Бакай-Ата",  nameEn: "Bakai-Ata", nameKy: "Бакай-Ата", inRu: "в Бакай-Ате", regionSlug: "talas", deliveryDays: "3 дня",   adminCenter: "Покровка", distanceFromCapital: "230 км от Бишкека",
      settlements: [{ slug: "bakai-ata-c", nameRu: "Бакай-Ата", nameEn: "Bakai-Ata", nameKy: "Бакай-Ата", inRu: "в Бакай-Ате", deliveryDays: "3 дня" }] },
    { slug: "kara-buura",nameRu: "Кара-Буура", nameEn: "Kara-Buura",nameKy: "Кара-Буура",inRu: "в Кара-Бууре",regionSlug: "talas", deliveryDays: "3 дня",   adminCenter: "Беш-Таш",  distanceFromCapital: "220 км от Бишкека",
      settlements: [{ slug: "kara-buura-c", nameRu: "Кара-Буура", nameEn: "Kara-Buura", nameKy: "Кара-Буура", inRu: "в Кара-Бууре", deliveryDays: "3 дня" }] },
  ],
};

// ─── Batken Oblast ────────────────────────────────────────────────────────────

const BATKEN: GeoRegion = {
  slug: "batken",
  nameRu: "Баткенская область",
  nameEn: "Batken Region",
  nameKy: "Баткен облусу",
  capitalRu: "Баткен",
  deliveryDays: "3–4 дня",
  districts: [
    { slug: "batken-c",   nameRu: "Баткен",     nameEn: "Batken",     nameKy: "Баткен",     inRu: "в Баткене",   regionSlug: "batken", deliveryDays: "3–4 дня", adminCenter: "Баткен",   distanceFromCapital: "900 км от Бишкека",
      settlements: [{ slug: "batken-city", nameRu: "Баткен", nameEn: "Batken", nameKy: "Баткен", inRu: "в Баткене", deliveryDays: "3–4 дня" }] },
    { slug: "kyzyl-kiya", nameRu: "Кызыл-Кия",  nameEn: "Kyzyl-Kiya", nameKy: "Кызыл-Кыя",  inRu: "в Кызыл-Кие",regionSlug: "batken", deliveryDays: "3–4 дня", adminCenter: "Кызыл-Кия",distanceFromCapital: "870 км от Бишкека",
      settlements: [{ slug: "kyzyl-kiya-c", nameRu: "Кызыл-Кия", nameEn: "Kyzyl-Kiya", nameKy: "Кызыл-Кыя", inRu: "в Кызыл-Кие", deliveryDays: "3–4 дня" }] },
    { slug: "isfana",     nameRu: "Исфана",     nameEn: "Isfana",     nameKy: "Исфана",     inRu: "в Исфане",    regionSlug: "batken", deliveryDays: "4 дня",   adminCenter: "Исфана",   distanceFromCapital: "920 км от Бишкека",
      settlements: [{ slug: "isfana-c", nameRu: "Исфана", nameEn: "Isfana", nameKy: "Исфана", inRu: "в Исфане", deliveryDays: "4 дня" }] },
    { slug: "kadamzhay",  nameRu: "Кадамжай",   nameEn: "Kadamzhay",  nameKy: "Кадамжай",   inRu: "в Кадамжае", regionSlug: "batken", deliveryDays: "3–4 дня", adminCenter: "Кадамжай", distanceFromCapital: "880 км от Бишкека",
      settlements: [{ slug: "kadamzhay-c", nameRu: "Кадамжай", nameEn: "Kadamzhay", nameKy: "Кадамжай", inRu: "в Кадамжае", deliveryDays: "3–4 дня" }] },
    { slug: "leilek",     nameRu: "Лейлек",     nameEn: "Leilek",     nameKy: "Лейлек",     inRu: "в Лейлеке",  regionSlug: "batken", deliveryDays: "4 дня",   adminCenter: "Лейлек",   distanceFromCapital: "910 км от Бишкека",
      settlements: [{ slug: "leilek-c", nameRu: "Лейлек", nameEn: "Leilek", nameKy: "Лейлек", inRu: "в Лейлеке", deliveryDays: "4 дня" }] },
  ],
};

// ─── All regions ──────────────────────────────────────────────────────────────

export const ALL_REGIONS: GeoRegion[] = [CHUY, OSH, JALAL_ABAD, ISSYK_KUL, NARYN, TALAS, BATKEN];

// ─── Lookup helpers ───────────────────────────────────────────────────────────

export function getRegion(slug: string): GeoRegion | undefined {
  return ALL_REGIONS.find((r) => r.slug === slug);
}

export function getDistrict(regionSlug: string, districtSlug: string): GeoDistrict | undefined {
  return getRegion(regionSlug)?.districts.find((d) => d.slug === districtSlug);
}

export function getGeoCategory(slug: string): GeoCategory | undefined {
  return GEO_CATEGORIES.find((c) => c.slug === slug);
}

export function getMajorCity(slug: string): MajorCity | undefined {
  return MAJOR_CITIES.find((c) => c.slug === slug);
}

export function isCategorySlug(slug: string): boolean {
  return GEO_CATEGORIES.some((c) => c.slug === slug);
}

export function getAllGeoCombinations() {
  const combos: { region: string; district: string; category: string }[] = [];
  for (const region of ALL_REGIONS) {
    for (const district of region.districts) {
      for (const cat of GEO_CATEGORIES) {
        // Old style: /chuy/kant/noutbuki
        combos.push({ region: region.slug, district: district.slug, category: cat.slug });
        // New style: /noutbuki/chuy/kant
        combos.push({ region: cat.slug, district: region.slug, category: district.slug });
      }
    }
  }
  return combos;
}
