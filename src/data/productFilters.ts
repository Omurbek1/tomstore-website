// SEO filter pages: /noutbuki/rtx-4050, /noutbuki/hp, etc.
// URL pattern: /[locale]/[categorySlug]/[filterSlug]

export type ProductFilter = {
  slug: string;
  categorySlug: string;    // which GEO_CATEGORY this belongs to
  nameRu: string;
  nameEn: string;
  nameKy: string;
  titleRu: string;         // SEO title ru
  titleEn: string;
  descriptionRu: string;   // SEO description ru
  descriptionEn: string;
  h1Ru: string;
  h1En: string;
  seoTextRu: string;
  seoTextEn: string;
  apiQuery: string;        // catalog API search query
  type: "gpu" | "cpu" | "ram" | "brand" | "feature";
};

const LAPTOP_FILTERS: ProductFilter[] = [
  // ── GPU filters ───────────────────────────────────────────────────────────
  {
    slug: "rtx-4050",
    categorySlug: "noutbuki",
    nameRu: "RTX 4050",
    nameEn: "RTX 4050",
    nameKy: "RTX 4050",
    titleRu: "Ноутбуки с RTX 4050 в Бишкеке — купить | TomStore",
    titleEn: "RTX 4050 Laptops in Bishkek — Buy | TomStore",
    descriptionRu:
      "Ноутбуки с видеокартой NVIDIA GeForce RTX 4050 в Бишкеке. Лучшие цены, гарантия, рассрочка, доставка по Кыргызстану. TomStore.",
    descriptionEn:
      "Laptops with NVIDIA GeForce RTX 4050 GPU in Bishkek. Best prices, warranty, installment, delivery across Kyrgyzstan. TomStore.",
    h1Ru: "Ноутбуки с RTX 4050 в Бишкеке",
    h1En: "RTX 4050 Laptops in Bishkek",
    seoTextRu:
      "NVIDIA GeForce RTX 4050 — оптимальная видеокарта для игровых ноутбуков 2024–2025 годов. Она обеспечивает плавный геймплей в популярных играх на высоких настройках графики при 60–144 FPS. Ноутбуки с RTX 4050 подходят для CS2, Valorant, GTA V, Cyberpunk 2077 и большинства современных тайтлов. В TomStore представлены модели ASUS TUF, Acer Nitro, HP Victus, Lenovo IdeaPad Gaming и другие. Доставка по Бишкеку и всему Кыргызстану.",
    seoTextEn:
      "The NVIDIA GeForce RTX 4050 is the ideal GPU for gaming laptops in 2024–2025. It delivers smooth gameplay in popular titles at high settings, 60–144 FPS. Laptops with RTX 4050 are great for CS2, Valorant, GTA V, Cyberpunk 2077, and most modern games. TomStore carries ASUS TUF, Acer Nitro, HP Victus, Lenovo IdeaPad Gaming, and more. Delivery across Bishkek and all of Kyrgyzstan.",
    apiQuery: "RTX 4050",
    type: "gpu",
  },
  {
    slug: "rtx-4060",
    categorySlug: "noutbuki",
    nameRu: "RTX 4060",
    nameEn: "RTX 4060",
    nameKy: "RTX 4060",
    titleRu: "Ноутбуки с RTX 4060 в Бишкеке — купить | TomStore",
    titleEn: "RTX 4060 Laptops in Bishkek — Buy | TomStore",
    descriptionRu:
      "Ноутбуки с NVIDIA RTX 4060 в Бишкеке. Игры в 1080p и 1440p на максимальных настройках. Гарантия, рассрочка. TomStore Кыргызстан.",
    descriptionEn:
      "RTX 4060 laptops in Bishkek. 1080p and 1440p gaming on max settings. Warranty, installment. TomStore Kyrgyzstan.",
    h1Ru: "Ноутбуки с RTX 4060 в Бишкеке",
    h1En: "RTX 4060 Laptops in Bishkek",
    seoTextRu:
      "RTX 4060 — мощная мобильная видеокарта NVIDIA для игровых ноутбуков. Обеспечивает 1080p и 1440p гейминг на максимальных настройках, поддерживает трассировку лучей и DLSS 3. Идеально для Battlefield, Hogwarts Legacy, The Witcher 3 и другие тяжёлых игр. Ноутбуки с RTX 4060 доступны в TomStore Бишкек с гарантией и рассрочкой.",
    seoTextEn:
      "The RTX 4060 is a powerful NVIDIA mobile GPU for gaming laptops. It handles 1080p and 1440p gaming on maximum settings, supports ray tracing and DLSS 3. Perfect for Battlefield, Hogwarts Legacy, The Witcher 3 and other demanding games. RTX 4060 laptops are available at TomStore Bishkek with warranty and installment.",
    apiQuery: "RTX 4060",
    type: "gpu",
  },
  {
    slug: "rtx-5060",
    categorySlug: "noutbuki",
    nameRu: "RTX 5060",
    nameEn: "RTX 5060",
    nameKy: "RTX 5060",
    titleRu: "Ноутбуки с RTX 5060 в Бишкеке — купить | TomStore",
    titleEn: "RTX 5060 Laptops in Bishkek — Buy | TomStore",
    descriptionRu:
      "Ноутбуки с новейшей NVIDIA RTX 5060 в Бишкеке. Архитектура Blackwell, поддержка DLSS 4. Гарантия, рассрочка. TomStore.kg.",
    descriptionEn:
      "Laptops with the latest NVIDIA RTX 5060 in Bishkek. Blackwell architecture, DLSS 4 support. Warranty, installment. TomStore.kg.",
    h1Ru: "Ноутбуки с RTX 5060 в Бишкеке",
    h1En: "RTX 5060 Laptops in Bishkek",
    seoTextRu:
      "NVIDIA RTX 5060 — видеокарта нового поколения на архитектуре Blackwell. Значительный прирост производительности по сравнению с RTX 4060 благодаря DLSS 4 и улучшенному трассировщику лучей. Ноутбуки с RTX 5060 — лучший выбор для геймеров, кто хочет будущее прямо сейчас. Доступны в TomStore Бишкек.",
    seoTextEn:
      "The NVIDIA RTX 5060 is a next-generation GPU built on the Blackwell architecture. Significant performance leap over the RTX 4060 thanks to DLSS 4 and an improved ray tracer. RTX 5060 laptops are the best choice for gamers who want the future right now. Available at TomStore Bishkek.",
    apiQuery: "RTX 5060",
    type: "gpu",
  },
  {
    slug: "rtx-3050",
    categorySlug: "noutbuki",
    nameRu: "RTX 3050",
    nameEn: "RTX 3050",
    nameKy: "RTX 3050",
    titleRu: "Ноутбуки с RTX 3050 в Бишкеке — купить дёшево | TomStore",
    titleEn: "RTX 3050 Laptops in Bishkek — Buy Cheap | TomStore",
    descriptionRu:
      "Бюджетные игровые ноутбуки с RTX 3050 в Бишкеке. Лучшая цена, гарантия, рассрочка. TomStore Кыргызстан.",
    descriptionEn:
      "Budget gaming laptops with RTX 3050 in Bishkek. Best price, warranty, installment. TomStore Kyrgyzstan.",
    h1Ru: "Ноутбуки с RTX 3050 в Бишкеке",
    h1En: "RTX 3050 Laptops in Bishkek",
    seoTextRu:
      "RTX 3050 — доступная игровая видеокарта для бюджетных геймерских ноутбуков. Подходит для eSports игр — CS2, Valorant, Dota 2 — и не очень требовательных тайтлов. Ноутбуки с RTX 3050 — оптимальный выбор для тех, кто хочет войти в PC-гейминг без больших затрат. В TomStore Бишкек большой выбор моделей HP, ASUS, Acer.",
    seoTextEn:
      "The RTX 3050 is an affordable gaming GPU for budget gaming laptops. Great for eSports titles — CS2, Valorant, Dota 2 — and less demanding games. RTX 3050 laptops are the optimal entry into PC gaming without breaking the bank. TomStore Bishkek carries a wide selection of HP, ASUS, and Acer models.",
    apiQuery: "RTX 3050",
    type: "gpu",
  },

  // ── CPU filters ───────────────────────────────────────────────────────────
  {
    slug: "ryzen-7",
    categorySlug: "noutbuki",
    nameRu: "Ryzen 7",
    nameEn: "Ryzen 7",
    nameKy: "Ryzen 7",
    titleRu: "Ноутбуки с AMD Ryzen 7 в Бишкеке | TomStore",
    titleEn: "AMD Ryzen 7 Laptops in Bishkek | TomStore",
    descriptionRu:
      "Ноутбуки AMD Ryzen 7 в Бишкеке. Высокая производительность, долгое время работы. Гарантия, рассрочка. TomStore.kg.",
    descriptionEn:
      "AMD Ryzen 7 laptops in Bishkek. High performance, long battery life. Warranty, installment. TomStore.kg.",
    h1Ru: "Ноутбуки с AMD Ryzen 7 в Бишкеке",
    h1En: "AMD Ryzen 7 Laptops in Bishkek",
    seoTextRu:
      "Процессоры AMD Ryzen 7 серии 7000/8000 обеспечивают превосходную многоядерную производительность при отличной энергоэффективности. Ноутбуки на Ryzen 7 идеальны для разработчиков, дизайнеров, контент-мейкеров и продвинутых пользователей. Поддержка DDR5, PCIe 4.0 и встроенная графика Radeon делают их универсальными машинами. Купить в TomStore Бишкек с гарантией и рассрочкой.",
    seoTextEn:
      "AMD Ryzen 7 series 7000/8000 processors offer excellent multi-core performance with great energy efficiency. Ryzen 7 laptops are ideal for developers, designers, content creators, and power users. DDR5 support, PCIe 4.0, and integrated Radeon graphics make them versatile machines. Buy at TomStore Bishkek with warranty and installment.",
    apiQuery: "Ryzen 7",
    type: "cpu",
  },
  {
    slug: "ryzen-5",
    categorySlug: "noutbuki",
    nameRu: "Ryzen 5",
    nameEn: "Ryzen 5",
    nameKy: "Ryzen 5",
    titleRu: "Ноутбуки с AMD Ryzen 5 в Бишкеке | TomStore",
    titleEn: "AMD Ryzen 5 Laptops in Bishkek | TomStore",
    descriptionRu:
      "Ноутбуки AMD Ryzen 5 в Бишкеке. Отличный баланс цена/производительность. Гарантия, рассрочка. TomStore Кыргызстан.",
    descriptionEn:
      "AMD Ryzen 5 laptops in Bishkek. Excellent price-to-performance ratio. Warranty, installment. TomStore Kyrgyzstan.",
    h1Ru: "Ноутбуки с AMD Ryzen 5 в Бишкеке",
    h1En: "AMD Ryzen 5 Laptops in Bishkek",
    seoTextRu:
      "AMD Ryzen 5 — процессор с лучшим соотношением цены и производительности в среднем ценовом сегменте. Ноутбуки на Ryzen 5 подходят для учёбы, работы с документами, видеозвонков и лёгких игр. Встроенная графика Radeon позволяет обходиться без дискретной видеокарты для большинства задач. Купить в TomStore Бишкек.",
    seoTextEn:
      "AMD Ryzen 5 offers the best price-to-performance ratio in the mid-range segment. Ryzen 5 laptops are great for studying, document work, video calls, and light gaming. Integrated Radeon graphics handle most tasks without a discrete GPU. Buy at TomStore Bishkek.",
    apiQuery: "Ryzen 5",
    type: "cpu",
  },
  {
    slug: "i7",
    categorySlug: "noutbuki",
    nameRu: "Intel Core i7",
    nameEn: "Intel Core i7",
    nameKy: "Intel Core i7",
    titleRu: "Ноутбуки Intel Core i7 в Бишкеке | TomStore",
    titleEn: "Intel Core i7 Laptops in Bishkek | TomStore",
    descriptionRu:
      "Ноутбуки Intel Core i7 в Бишкеке. Производительность для работы, AutoCAD, видеомонтажа. Гарантия, рассрочка. TomStore.",
    descriptionEn:
      "Intel Core i7 laptops in Bishkek. Performance for work, AutoCAD, video editing. Warranty, installment. TomStore.",
    h1Ru: "Ноутбуки Intel Core i7 в Бишкеке",
    h1En: "Intel Core i7 Laptops in Bishkek",
    seoTextRu:
      "Intel Core i7 — проверенный выбор для профессиональной работы: AutoCAD, Photoshop, 3ds Max, видеомонтаж. Поддержка Thunderbolt 4/5, высокоскоростной памяти DDR5 и нескольких дисплеев. Ноутбуки с i7 серии 12-го, 13-го и 14-го поколений представлены в TomStore Бишкек (ТЦ Весна, 3-й этаж, С47). Рассрочка от 3 до 12 мес. с банком и без банка: +996-508-724-365.",
    seoTextEn:
      "Intel Core i7 is a proven choice for professional work: AutoCAD, Photoshop, 3ds Max, video editing. Supports Thunderbolt 4/5, high-speed DDR5 memory, and multiple displays. i7 laptops from 12th, 13th, and 14th gen at TomStore Bishkek (Vesna Mall, 3rd floor, C47). Installment 3–12 months with bank or without: +996-508-724-365.",
    apiQuery: "Core i7",
    type: "cpu",
  },
  {
    slug: "i5",
    categorySlug: "noutbuki",
    nameRu: "Intel Core i5",
    nameEn: "Intel Core i5",
    nameKy: "Intel Core i5",
    titleRu: "Ноутбуки Intel Core i5 в Бишкеке | TomStore",
    titleEn: "Intel Core i5 Laptops in Bishkek | TomStore",
    descriptionRu:
      "Ноутбуки Intel Core i5 в Бишкеке — лучшая цена. Для учёбы, офиса, лёгкой работы. Гарантия, рассрочка. TomStore.kg.",
    descriptionEn:
      "Intel Core i5 laptops in Bishkek — best price. For study, office, light work. Warranty, installment. TomStore.kg.",
    h1Ru: "Ноутбуки Intel Core i5 в Бишкеке",
    h1En: "Intel Core i5 Laptops in Bishkek",
    seoTextRu:
      "Intel Core i5 — оптимальный процессор для большинства пользователей. Справляется с офисными задачами, браузером, видеозвонками, программированием и несложным монтажом. Ноутбуки с i5 последних поколений в TomStore доступны по привлекательным ценам с рассрочкой.",
    seoTextEn:
      "Intel Core i5 is the optimal processor for most users. Handles office tasks, browsing, video calls, programming, and light editing. Latest-gen i5 laptops at TomStore are available at attractive prices with installment.",
    apiQuery: "Core i5",
    type: "cpu",
  },

  // ── RAM filters ───────────────────────────────────────────────────────────
  {
    slug: "16gb",
    categorySlug: "noutbuki",
    nameRu: "16 ГБ ОЗУ",
    nameEn: "16GB RAM",
    nameKy: "16 ГБ ОЗУ",
    titleRu: "Ноутбуки 16 ГБ ОЗУ в Бишкеке | TomStore",
    titleEn: "16GB RAM Laptops in Bishkek | TomStore",
    descriptionRu:
      "Ноутбуки с 16 ГБ оперативной памяти в Бишкеке. Комфортная работа, многозадачность. Гарантия, рассрочка. TomStore.",
    descriptionEn:
      "Laptops with 16GB RAM in Bishkek. Comfortable work, multitasking. Warranty, installment. TomStore.",
    h1Ru: "Ноутбуки с 16 ГБ ОЗУ в Бишкеке",
    h1En: "16GB RAM Laptops in Bishkek",
    seoTextRu:
      "16 ГБ оперативной памяти — золотой стандарт для современного ноутбука. Достаточно для комфортной работы с большим количеством вкладок браузера, редактирования таблиц, программирования и даже лёгких игр. При выборе важно обращать внимание на тип памяти — DDR4 или DDR5. В TomStore Бишкек большой выбор ноутбуков с 16 ГБ RAM.",
    seoTextEn:
      "16GB RAM is the gold standard for a modern laptop. Enough for comfortable work with many browser tabs, spreadsheet editing, programming, and even light gaming. When choosing, pay attention to the memory type — DDR4 or DDR5. TomStore Bishkek offers a wide selection of 16GB RAM laptops.",
    apiQuery: "16GB",
    type: "ram",
  },
  {
    slug: "32gb",
    categorySlug: "noutbuki",
    nameRu: "32 ГБ ОЗУ",
    nameEn: "32GB RAM",
    nameKy: "32 ГБ ОЗУ",
    titleRu: "Ноутбуки 32 ГБ ОЗУ в Бишкеке | TomStore",
    titleEn: "32GB RAM Laptops in Bishkek | TomStore",
    descriptionRu:
      "Ноутбуки с 32 ГБ ОЗУ для профессионалов в Бишкеке. Видеомонтаж, 3D, программирование. Гарантия, рассрочка. TomStore.",
    descriptionEn:
      "32GB RAM laptops for professionals in Bishkek. Video editing, 3D, programming. Warranty, installment. TomStore.",
    h1Ru: "Ноутбуки с 32 ГБ ОЗУ в Бишкеке",
    h1En: "32GB RAM Laptops in Bishkek",
    seoTextRu:
      "32 ГБ ОЗУ — выбор профессионалов: видеомонтажёров, архитекторов, разработчиков и научных сотрудников. С таким объёмом памяти можно работать в Adobe Premiere, DaVinci Resolve, AutoCAD, 3ds Max и запускать виртуальные машины. TomStore Бишкек предлагает профессиональные ноутбуки с 32 ГБ ОЗУ с официальной гарантией.",
    seoTextEn:
      "32GB RAM is the choice of professionals: video editors, architects, developers, and researchers. With this memory, you can work in Adobe Premiere, DaVinci Resolve, AutoCAD, 3ds Max, and run virtual machines. TomStore Bishkek offers professional 32GB RAM laptops with official warranty.",
    apiQuery: "32GB",
    type: "ram",
  },

  // ── Brand filters ─────────────────────────────────────────────────────────
  {
    slug: "hp",
    categorySlug: "noutbuki",
    nameRu: "HP",
    nameEn: "HP",
    nameKy: "HP",
    titleRu: "Ноутбуки HP в Бишкеке — купить | TomStore",
    titleEn: "HP Laptops in Bishkek — Buy | TomStore",
    descriptionRu:
      "Ноутбуки HP в Бишкеке: HP Victus, HP Pavilion, HP EliteBook. Лучшие цены в Кыргызстане. Гарантия, рассрочка. TomStore.",
    descriptionEn:
      "HP laptops in Bishkek: HP Victus, HP Pavilion, HP EliteBook. Best prices in Kyrgyzstan. Warranty, installment. TomStore.",
    h1Ru: "Ноутбуки HP в Бишкеке",
    h1En: "HP Laptops in Bishkek",
    seoTextRu:
      "HP — один из ведущих производителей ноутбуков в мире. В TomStore Бишкек (ТЦ Весна, 3-й этаж, С47) представлена широкая линейка: HP Victus для геймеров, HP Pavilion для учёбы и дома, HP EliteBook для бизнеса, HP ZBook для профессиональной работы. Все ноутбуки HP с официальной гарантией. Рассрочка от 3 до 12 мес. с банком и без банка: +996-508-724-365.",
    seoTextEn:
      "HP is one of the world's leading laptop manufacturers. TomStore Bishkek (Vesna Mall, 3rd floor, C47) carries a wide range: HP Victus for gamers, HP Pavilion for study and home, HP EliteBook for business, HP ZBook for professional work. All HP laptops come with official manufacturer warranty. Installment 3–12 months with bank or without: +996-508-724-365.",
    apiQuery: "HP",
    type: "brand",
  },
  {
    slug: "asus",
    categorySlug: "noutbuki",
    nameRu: "ASUS",
    nameEn: "ASUS",
    nameKy: "ASUS",
    titleRu: "Ноутбуки ASUS в Бишкеке — купить | TomStore",
    titleEn: "ASUS Laptops in Bishkek — Buy | TomStore",
    descriptionRu:
      "Ноутбуки ASUS в Бишкеке: ASUS TUF Gaming, ROG, ZenBook, VivoBook. Цены в Кыргызстане. Гарантия, рассрочка. TomStore.",
    descriptionEn:
      "ASUS laptops in Bishkek: ASUS TUF Gaming, ROG, ZenBook, VivoBook. Prices in Kyrgyzstan. Warranty, installment. TomStore.",
    h1Ru: "Ноутбуки ASUS в Бишкеке",
    h1En: "ASUS Laptops in Bishkek",
    seoTextRu:
      "ASUS — тайваньский гигант с богатой линейкой ноутбуков для каждой задачи. Игровые: ASUS ROG Strix и TUF Gaming с RTX 4060/4070. Для работы: ASUS ZenBook (тонкие и лёгкие). Для учёбы: ASUS VivoBook (практичные и доступные). В TomStore Бишкек все серии ASUS в наличии с гарантией и рассрочкой.",
    seoTextEn:
      "ASUS is a Taiwanese giant with a rich laptop lineup for every task. Gaming: ASUS ROG Strix and TUF Gaming with RTX 4060/4070. For work: ASUS ZenBook (slim and light). For study: ASUS VivoBook (practical and affordable). TomStore Bishkek stocks all ASUS series with warranty and installment.",
    apiQuery: "ASUS",
    type: "brand",
  },
  {
    slug: "acer",
    categorySlug: "noutbuki",
    nameRu: "Acer",
    nameEn: "Acer",
    nameKy: "Acer",
    titleRu: "Ноутбуки Acer в Бишкеке — купить | TomStore",
    titleEn: "Acer Laptops in Bishkek — Buy | TomStore",
    descriptionRu:
      "Ноутбуки Acer в Бишкеке: Acer Nitro, Predator, Aspire, Swift. Лучшие цены в Кыргызстане. Гарантия, рассрочка. TomStore.",
    descriptionEn:
      "Acer laptops in Bishkek: Acer Nitro, Predator, Aspire, Swift. Best prices in Kyrgyzstan. Warranty, installment. TomStore.",
    h1Ru: "Ноутбуки Acer в Бишкеке",
    h1En: "Acer Laptops in Bishkek",
    seoTextRu:
      "Acer предлагает одни из лучших соотношений цены и качества на рынке ноутбуков. Игровые серии Nitro 5/7 и Predator Helios — с мощными GPU и процессорами. Для учёбы и работы — Aspire (бюджетный) и Swift (ультрабук). Acer Nitro 5 с RTX 4050 — один из самых популярных игровых ноутбуков в TomStore Бишкек.",
    seoTextEn:
      "Acer offers some of the best price-to-quality ratios in the laptop market. Gaming series Nitro 5/7 and Predator Helios — with powerful GPUs and processors. For study and work — Aspire (budget) and Swift (ultrabook). Acer Nitro 5 with RTX 4050 is one of the most popular gaming laptops at TomStore Bishkek.",
    apiQuery: "Acer",
    type: "brand",
  },
  {
    slug: "lenovo",
    categorySlug: "noutbuki",
    nameRu: "Lenovo",
    nameEn: "Lenovo",
    nameKy: "Lenovo",
    titleRu: "Ноутбуки Lenovo в Бишкеке — купить | TomStore",
    titleEn: "Lenovo Laptops in Bishkek — Buy | TomStore",
    descriptionRu:
      "Ноутбуки Lenovo в Бишкеке: IdeaPad, Legion, ThinkPad, Yoga. Лучшие цены. Гарантия, рассрочка. TomStore Кыргызстан.",
    descriptionEn:
      "Lenovo laptops in Bishkek: IdeaPad, Legion, ThinkPad, Yoga. Best prices. Warranty, installment. TomStore Kyrgyzstan.",
    h1Ru: "Ноутбуки Lenovo в Бишкеке",
    h1En: "Lenovo Laptops in Bishkek",
    seoTextRu:
      "Lenovo — мировой лидер рынка ноутбуков. Игровые Legion с RTX 4060 и выше. Бизнес-серия ThinkPad с надёжностью и безопасностью. Универсальные IdeaPad для учёбы и дома. Трансформеры Yoga 2-в-1 для творчества. Все модели Lenovo в TomStore Бишкек с гарантией производителя и удобной рассрочкой.",
    seoTextEn:
      "Lenovo is the global laptop market leader. Gaming Legion with RTX 4060 and above. Business ThinkPad series with reliability and security. Versatile IdeaPad for study and home. Yoga 2-in-1 convertibles for creativity. All Lenovo models at TomStore Bishkek with manufacturer warranty and convenient installment.",
    apiQuery: "Lenovo",
    type: "brand",
  },
];

// Map for fast lookup
export const PRODUCT_FILTERS_BY_SLUG = new Map(
  LAPTOP_FILTERS.map((f) => [`${f.categorySlug}:${f.slug}`, f]),
);

export function getProductFilter(
  categorySlug: string,
  filterSlug: string,
): ProductFilter | undefined {
  return PRODUCT_FILTERS_BY_SLUG.get(`${categorySlug}:${filterSlug}`);
}

export function isFilterSlug(categorySlug: string, filterSlug: string): boolean {
  return PRODUCT_FILTERS_BY_SLUG.has(`${categorySlug}:${filterSlug}`);
}

export function getFiltersForCategory(categorySlug: string): ProductFilter[] {
  return LAPTOP_FILTERS.filter((f) => f.categorySlug === categorySlug);
}

export default LAPTOP_FILTERS;
