// Hyperlocal geo data for Kyrgyzstan SEO
// Start: Chuy Oblast — expand other oblasts as needed

export type GeoCategory = {
  slug: string;        // URL slug: "noutbuki"
  nameRu: string;      // "Ноутбуки"
  nameEn: string;
  nameKy: string;
  genRu: string;       // genitive: "ноутбуков"
  accusRu: string;     // accusative: "ноутбук"
  catalogPath: string; // "/catalog/laptops"
  icon: string;
};

export type GeoSettlement = {
  slug: string;
  nameRu: string;
  nameEn: string;
  nameKy: string;
  inRu: string;        // "в Канте"
  deliveryDays: string;
};

export type GeoDistrict = {
  slug: string;
  nameRu: string;       // "Кант" (city) or "Кантский район"
  nameEn: string;
  nameKy: string;
  inRu: string;         // "в Канте"
  regionSlug: string;   // parent region slug
  deliveryDays: string;
  adminCenter: string;  // "Кант"
  distanceFromCapital: string; // "75 км от Бишкека"
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

// ─── Categories ───────────────────────────────────────────────────────────────

export const GEO_CATEGORIES: GeoCategory[] = [
  {
    slug: "noutbuki",
    nameRu: "Ноутбуки",
    nameEn: "Laptops",
    nameKy: "Ноутбуктар",
    genRu: "ноутбуков",
    accusRu: "ноутбук",
    catalogPath: "/catalog/laptops",
    icon: "💻",
  },
  {
    slug: "printery",
    nameRu: "Принтеры и МФУ",
    nameEn: "Printers",
    nameKy: "Принтерлер",
    genRu: "принтеров",
    accusRu: "принтер",
    catalogPath: "/catalog/printers",
    icon: "🖨️",
  },
  {
    slug: "kompyutery",
    nameRu: "Компьютеры",
    nameEn: "Computers",
    nameKy: "Компьютерлер",
    genRu: "компьютеров",
    accusRu: "компьютер",
    catalogPath: "/catalog/computers",
    icon: "🖥️",
  },
  {
    slug: "monitory",
    nameRu: "Мониторы",
    nameEn: "Monitors",
    nameKy: "Мониторлор",
    genRu: "мониторов",
    accusRu: "монитор",
    catalogPath: "/catalog/monitors",
    icon: "🖥",
  },
  {
    slug: "aksessuary",
    nameRu: "Аксессуары",
    nameEn: "Accessories",
    nameKy: "Аксессуарлар",
    genRu: "аксессуаров",
    accusRu: "аксессуары",
    catalogPath: "/catalog/accessories",
    icon: "🖱️",
  },
];

// ─── Chuy Oblast ──────────────────────────────────────────────────────────────

export const CHUY_REGION: GeoRegion = {
  slug: "chuy",
  nameRu: "Чуйская область",
  nameEn: "Chuy Region",
  nameKy: "Чүй облусу",
  capitalRu: "Бишкек",
  deliveryDays: "1–2 дня",
  districts: [
    {
      slug: "bishkek",
      nameRu: "Бишкек",
      nameEn: "Bishkek",
      nameKy: "Бишкек",
      inRu: "в Бишкеке",
      regionSlug: "chuy",
      deliveryDays: "1 день",
      adminCenter: "Бишкек",
      distanceFromCapital: "столица",
      settlements: [
        { slug: "pervomaysky", nameRu: "Первомайский район", nameEn: "Pervomaysky", nameKy: "Первомай", inRu: "в Первомайском районе", deliveryDays: "1 день" },
        { slug: "leninsky",    nameRu: "Ленинский район",    nameEn: "Leninsky",    nameKy: "Ленин",    inRu: "в Ленинском районе",    deliveryDays: "1 день" },
        { slug: "oktyabrsky",  nameRu: "Октябрьский район",  nameEn: "Oktyabrsky",  nameKy: "Октябрь",  inRu: "в Октябрьском районе",  deliveryDays: "1 день" },
        { slug: "sverdlovsky", nameRu: "Свердловский район", nameEn: "Sverdlovsky", nameKy: "Свердлов", inRu: "в Свердловском районе",  deliveryDays: "1 день" },
      ],
    },
    {
      slug: "kant",
      nameRu: "Кант",
      nameEn: "Kant",
      nameKy: "Кант",
      inRu: "в Канте",
      regionSlug: "chuy",
      deliveryDays: "1–2 дня",
      adminCenter: "Кант",
      distanceFromCapital: "20 км от Бишкека",
      settlements: [
        { slug: "kant-center",  nameRu: "Кант (центр)",  nameEn: "Kant",      nameKy: "Кант",      inRu: "в Канте",      deliveryDays: "1–2 дня" },
        { slug: "ivanovka",     nameRu: "Ивановка",      nameEn: "Ivanovka",  nameKy: "Ивановка",  inRu: "в Ивановке",   deliveryDays: "1–2 дня" },
        { slug: "vasilyevka",   nameRu: "Васильевка",    nameEn: "Vasilyevka",nameKy: "Василевка", inRu: "в Васильевке", deliveryDays: "1–2 дня" },
      ],
    },
    {
      slug: "tokmok",
      nameRu: "Токмок",
      nameEn: "Tokmok",
      nameKy: "Токмок",
      inRu: "в Токмоке",
      regionSlug: "chuy",
      deliveryDays: "1–2 дня",
      adminCenter: "Токмок",
      distanceFromCapital: "65 км от Бишкека",
      settlements: [
        { slug: "tokmok-center", nameRu: "Токмок (центр)", nameEn: "Tokmok",   nameKy: "Токмок",     inRu: "в Токмоке",    deliveryDays: "1–2 дня" },
        { slug: "bystrovka",     nameRu: "Быстровка",      nameEn: "Bystrovka",nameKy: "Быстровка",  inRu: "в Быстровке",  deliveryDays: "2 дня" },
      ],
    },
    {
      slug: "kara-balta",
      nameRu: "Кара-Балта",
      nameEn: "Kara-Balta",
      nameKy: "Кара-Балта",
      inRu: "в Кара-Балте",
      regionSlug: "chuy",
      deliveryDays: "1–2 дня",
      adminCenter: "Кара-Балта",
      distanceFromCapital: "60 км от Бишкека",
      settlements: [
        { slug: "kara-balta-center", nameRu: "Кара-Балта (центр)", nameEn: "Kara-Balta", nameKy: "Кара-Балта", inRu: "в Кара-Балте",  deliveryDays: "1–2 дня" },
        { slug: "sosnovka",          nameRu: "Сосновка",           nameEn: "Sosnovka",   nameKy: "Сосновка",   inRu: "в Сосновке",    deliveryDays: "2 дня" },
      ],
    },
    {
      slug: "sokuluk",
      nameRu: "Сокулук",
      nameEn: "Sokuluk",
      nameKy: "Сокулук",
      inRu: "в Сокулуке",
      regionSlug: "chuy",
      deliveryDays: "1–2 дня",
      adminCenter: "Сокулук",
      distanceFromCapital: "25 км от Бишкека",
      settlements: [
        { slug: "sokuluk-center",    nameRu: "Сокулук (центр)",   nameEn: "Sokuluk",       nameKy: "Сокулук",       inRu: "в Сокулуке",      deliveryDays: "1–2 дня" },
        { slug: "belovodskoe",       nameRu: "Беловодское",       nameEn: "Belovodskoe",   nameKy: "Беловодское",   inRu: "в Беловодском",   deliveryDays: "2 дня" },
        { slug: "krasnorechenskoe",  nameRu: "Красноречное",      nameEn: "Krasnorechne",  nameKy: "Красноречное",  inRu: "в Красноречном",  deliveryDays: "2 дня" },
      ],
    },
    {
      slug: "alamudun",
      nameRu: "Аламудун",
      nameEn: "Alamudun",
      nameKy: "Аламудун",
      inRu: "в Аламудуне",
      regionSlug: "chuy",
      deliveryDays: "1–2 дня",
      adminCenter: "Лебединовка",
      distanceFromCapital: "15 км от Бишкека",
      settlements: [
        { slug: "lebedinovka", nameRu: "Лебединовка", nameEn: "Lebedinovka", nameKy: "Лебединовка", inRu: "в Лебединовке", deliveryDays: "1–2 дня" },
        { slug: "orlovka",     nameRu: "Орловка",     nameEn: "Orlovka",     nameKy: "Орловка",     inRu: "в Орловке",     deliveryDays: "2 дня" },
        { slug: "koi-tash",    nameRu: "Кой-Таш",     nameEn: "Koi-Tash",    nameKy: "Кой-Таш",     inRu: "в Кой-Таше",    deliveryDays: "2 дня" },
      ],
    },
    {
      slug: "kemin",
      nameRu: "Кемин",
      nameEn: "Kemin",
      nameKy: "Кемин",
      inRu: "в Кемине",
      regionSlug: "chuy",
      deliveryDays: "2–3 дня",
      adminCenter: "Кемин",
      distanceFromCapital: "100 км от Бишкека",
      settlements: [
        { slug: "kemin-center", nameRu: "Кемин (центр)",  nameEn: "Kemin",      nameKy: "Кемин",     inRu: "в Кемине",     deliveryDays: "2–3 дня" },
        { slug: "kochkor-ata",  nameRu: "Кочкор-Ата",     nameEn: "Kochkor-Ata",nameKy: "Кочкор-Ата",inRu: "в Кочкор-Ате", deliveryDays: "2–3 дня" },
      ],
    },
    {
      slug: "panfilov",
      nameRu: "Панфиловский район",
      nameEn: "Panfilov",
      nameKy: "Панфилов",
      inRu: "в Панфиловском районе",
      regionSlug: "chuy",
      deliveryDays: "2–3 дня",
      adminCenter: "Кара-Суу",
      distanceFromCapital: "80 км от Бишкека",
      settlements: [
        { slug: "kara-suu-chuy", nameRu: "Кара-Суу",      nameEn: "Kara-Suu",  nameKy: "Кара-Суу",  inRu: "в Кара-Суу",    deliveryDays: "2–3 дня" },
        { slug: "alamedin-selo", nameRu: "Аламедин (с.)", nameEn: "Alamedin",  nameKy: "Аламедин",  inRu: "в Аламедине",   deliveryDays: "2–3 дня" },
      ],
    },
    {
      slug: "issyk-ata",
      nameRu: "Ысык-Ата",
      nameEn: "Issyk-Ata",
      nameKy: "Ысык-Ата",
      inRu: "в Ысык-Ата",
      regionSlug: "chuy",
      deliveryDays: "2–3 дня",
      adminCenter: "Ысык-Ата",
      distanceFromCapital: "45 км от Бишкека",
      settlements: [
        { slug: "issyk-ata-center", nameRu: "Ысык-Ата",    nameEn: "Issyk-Ata",   nameKy: "Ысык-Ата",    inRu: "в Ысык-Ата",  deliveryDays: "2–3 дня" },
        { slug: "shamaldysay",      nameRu: "Шамалды-Сай", nameEn: "Shamaldysay", nameKy: "Шамалды-Сай", inRu: "в Шамалды-Сай",deliveryDays: "2–3 дня" },
      ],
    },
  ],
};

// ─── All regions (other oblasts — stub for now, expand later) ─────────────────

export const ALL_REGIONS: GeoRegion[] = [
  CHUY_REGION,
  {
    slug: "osh",
    nameRu: "Ошская область",
    nameEn: "Osh Region",
    nameKy: "Ош облусу",
    capitalRu: "Ош",
    deliveryDays: "2–3 дня",
    districts: [
      { slug: "osh", nameRu: "Ош", nameEn: "Osh", nameKy: "Ош", inRu: "в Оше", regionSlug: "osh", deliveryDays: "2–3 дня", adminCenter: "Ош", distanceFromCapital: "750 км от Бишкека", settlements: [
        { slug: "osh-center", nameRu: "Ош (центр)", nameEn: "Osh", nameKy: "Ош", inRu: "в Оше", deliveryDays: "2–3 дня" },
        { slug: "kara-suu-osh", nameRu: "Кара-Суу", nameEn: "Kara-Suu", nameKy: "Кара-Суу", inRu: "в Кара-Суу", deliveryDays: "3 дня" },
        { slug: "nookat", nameRu: "Ноокат", nameEn: "Nookat", nameKy: "Ноокат", inRu: "в Ноокате", deliveryDays: "3 дня" },
        { slug: "uzgen", nameRu: "Узген", nameEn: "Uzgen", nameKy: "Өзгөн", inRu: "в Узгене", deliveryDays: "3 дня" },
      ]},
    ],
  },
  {
    slug: "jalal-abad",
    nameRu: "Джалал-Абадская область",
    nameEn: "Jalal-Abad Region",
    nameKy: "Жалал-Абад облусу",
    capitalRu: "Джалал-Абад",
    deliveryDays: "2–3 дня",
    districts: [
      { slug: "jalal-abad", nameRu: "Джалал-Абад", nameEn: "Jalal-Abad", nameKy: "Жалал-Абад", inRu: "в Джалал-Абаде", regionSlug: "jalal-abad", deliveryDays: "2–3 дня", adminCenter: "Джалал-Абад", distanceFromCapital: "650 км от Бишкека", settlements: [
        { slug: "jalal-abad-center", nameRu: "Джалал-Абад", nameEn: "Jalal-Abad", nameKy: "Жалал-Абад", inRu: "в Джалал-Абаде", deliveryDays: "2–3 дня" },
        { slug: "mailuu-suu", nameRu: "Майлуу-Суу", nameEn: "Mailuu-Suu", nameKy: "Майлуу-Суу", inRu: "в Майлуу-Суу", deliveryDays: "3 дня" },
        { slug: "tash-kumyr", nameRu: "Таш-Кумыр", nameEn: "Tash-Kumyr", nameKy: "Таш-Кумыр", inRu: "в Таш-Кумыре", deliveryDays: "3 дня" },
      ]},
    ],
  },
  {
    slug: "issyk-kul",
    nameRu: "Иссык-Кульская область",
    nameEn: "Issyk-Kul Region",
    nameKy: "Ысык-Көл облусу",
    capitalRu: "Каракол",
    deliveryDays: "2–3 дня",
    districts: [
      { slug: "karakol", nameRu: "Каракол", nameEn: "Karakol", nameKy: "Каракол", inRu: "в Караколе", regionSlug: "issyk-kul", deliveryDays: "2–3 дня", adminCenter: "Каракол", distanceFromCapital: "350 км от Бишкека", settlements: [
        { slug: "karakol-center", nameRu: "Каракол", nameEn: "Karakol", nameKy: "Каракол", inRu: "в Караколе", deliveryDays: "2–3 дня" },
        { slug: "cholpon-ata", nameRu: "Чолпон-Ата", nameEn: "Cholpon-Ata", nameKy: "Чолпон-Ата", inRu: "в Чолпон-Ате", deliveryDays: "2–3 дня" },
        { slug: "balykchy", nameRu: "Балыкчы", nameEn: "Balykchy", nameKy: "Балыкчы", inRu: "в Балыкчы", deliveryDays: "2–3 дня" },
        { slug: "bokonbaevo", nameRu: "Боконбаево", nameEn: "Bokonbaevo", nameKy: "Боконбаев", inRu: "в Боконбаево", deliveryDays: "3 дня" },
      ]},
    ],
  },
  {
    slug: "naryn",
    nameRu: "Нарынская область",
    nameEn: "Naryn Region",
    nameKy: "Нарын облусу",
    capitalRu: "Нарын",
    deliveryDays: "3–4 дня",
    districts: [
      { slug: "naryn", nameRu: "Нарын", nameEn: "Naryn", nameKy: "Нарын", inRu: "в Нарыне", regionSlug: "naryn", deliveryDays: "3–4 дня", adminCenter: "Нарын", distanceFromCapital: "350 км от Бишкека", settlements: [
        { slug: "naryn-center", nameRu: "Нарын", nameEn: "Naryn", nameKy: "Нарын", inRu: "в Нарыне", deliveryDays: "3–4 дня" },
        { slug: "at-bashy", nameRu: "Ат-Башы", nameEn: "At-Bashy", nameKy: "Ат-Башы", inRu: "в Ат-Башы", deliveryDays: "3–4 дня" },
      ]},
    ],
  },
  {
    slug: "talas",
    nameRu: "Таласская область",
    nameEn: "Talas Region",
    nameKy: "Талас облусу",
    capitalRu: "Талас",
    deliveryDays: "2–3 дня",
    districts: [
      { slug: "talas", nameRu: "Талас", nameEn: "Talas", nameKy: "Талас", inRu: "в Таласе", regionSlug: "talas", deliveryDays: "2–3 дня", adminCenter: "Талас", distanceFromCapital: "200 км от Бишкека", settlements: [
        { slug: "talas-center", nameRu: "Талас", nameEn: "Talas", nameKy: "Талас", inRu: "в Таласе", deliveryDays: "2–3 дня" },
        { slug: "manas-talas", nameRu: "Манас (с.)", nameEn: "Manas", nameKy: "Манас", inRu: "в Манасе", deliveryDays: "3 дня" },
      ]},
    ],
  },
  {
    slug: "batken",
    nameRu: "Баткенская область",
    nameEn: "Batken Region",
    nameKy: "Баткен облусу",
    capitalRu: "Баткен",
    deliveryDays: "3–4 дня",
    districts: [
      { slug: "batken", nameRu: "Баткен", nameEn: "Batken", nameKy: "Баткен", inRu: "в Баткене", regionSlug: "batken", deliveryDays: "3–4 дня", adminCenter: "Баткен", distanceFromCapital: "900 км от Бишкека", settlements: [
        { slug: "batken-center", nameRu: "Баткен", nameEn: "Batken", nameKy: "Баткен", inRu: "в Баткене", deliveryDays: "3–4 дня" },
        { slug: "kyzyl-kiya", nameRu: "Кызыл-Кия", nameEn: "Kyzyl-Kiya", nameKy: "Кызыл-Кыя", inRu: "в Кызыл-Кие", deliveryDays: "3–4 дня" },
        { slug: "isfana", nameRu: "Исфана", nameEn: "Isfana", nameKy: "Исфана", inRu: "в Исфане", deliveryDays: "4 дня" },
      ]},
    ],
  },
];

// ─── Lookup helpers ───────────────────────────────────────────────────────────

export function getRegion(regionSlug: string): GeoRegion | undefined {
  return ALL_REGIONS.find((r) => r.slug === regionSlug);
}

export function getDistrict(
  regionSlug: string,
  districtSlug: string,
): GeoDistrict | undefined {
  return getRegion(regionSlug)?.districts.find((d) => d.slug === districtSlug);
}

export function getGeoCategory(categorySlug: string): GeoCategory | undefined {
  return GEO_CATEGORIES.find((c) => c.slug === categorySlug);
}

export function getSettlement(
  regionSlug: string,
  districtSlug: string,
  settlementSlug: string,
): GeoSettlement | undefined {
  return getDistrict(regionSlug, districtSlug)?.settlements.find(
    (s) => s.slug === settlementSlug,
  );
}

// All region/district/category combinations for static generation
export function getAllGeoCombinations() {
  const combos: { region: string; district: string; category: string }[] = [];
  for (const region of ALL_REGIONS) {
    for (const district of region.districts) {
      for (const cat of GEO_CATEGORIES) {
        combos.push({ region: region.slug, district: district.slug, category: cat.slug });
      }
    }
  }
  return combos;
}
