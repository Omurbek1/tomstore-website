// National SEO data for TomStore.kg
// Powers: /kyrgyzstan, /bishkek, /karakol, /noutbuki-kyrgyzstan, /printery-kyrgyzstan, etc.

export type NationalCityPage = {
  slug: string;
  nameRu: string;
  nameEn: string;
  nameKy: string;
  inRu: string;
  regionRu: string;
  isCapital: boolean;
  deliveryDays: string;
  population: string;
  titleRu: string;
  titleEn: string;
  descriptionRu: string;
  descriptionEn: string;
  h1Ru: string;
  h1En: string;
  leadRu: string;
  leadEn: string;
  seoTextRu: string[];
  seoTextEn: string[];
  faqRu: { q: string; a: string }[];
  faqEn: { q: string; a: string }[];
  nearbyLinks: { nameRu: string; nameEn: string; href: string }[];
};

export type NationalCategoryPage = {
  slug: string;               // noutbuki-kyrgyzstan
  categorySlug: string;       // noutbuki (for geo filter links)
  catalogPath: string;        // /catalog/laptops
  nameRu: string;
  nameEn: string;
  titleRu: string;
  titleEn: string;
  descriptionRu: string;
  descriptionEn: string;
  h1Ru: string;
  h1En: string;
  seoTextRu: string;
  seoTextEn: string;
  faqRu: { q: string; a: string }[];
  faqEn: { q: string; a: string }[];
  apiQuery: string;
};

// ─── City hub pages ───────────────────────────────────────────────────────────

export const NATIONAL_CITY_PAGES: NationalCityPage[] = [
  {
    slug: "bishkek",
    nameRu: "Бишкек",
    nameEn: "Bishkek",
    nameKy: "Бишкек",
    inRu: "в Бишкеке",
    regionRu: "столица Кыргызстана",
    isCapital: true,
    deliveryDays: "1 день",
    population: "1 100 000",
    titleRu: "Купить электронику в Бишкеке — ноутбуки, принтеры, ПК | TomStore",
    titleEn: "Buy Electronics in Bishkek — Laptops, Printers, PCs | TomStore",
    descriptionRu:
      "TomStore Бишкек — магазин ноутбуков, принтеров и ПК. Адрес: ул. Калык Акиева 66, ТЦ Весна, 3-й этаж, С47. Самовывоз и доставка по Бишкеку за 1 день. Гарантия, рассрочка от 3 до 12 мес.",
    descriptionEn:
      "TomStore Bishkek — laptops, printers and PCs store. Address: Kalyk Akiev 66, Vesna Mall, 3rd floor, C47. Pickup and same-day delivery across Bishkek. Warranty, installment 3–12 months.",
    h1Ru: "Купить электронику в Бишкеке — TomStore",
    h1En: "Buy Electronics in Bishkek — TomStore",
    leadRu:
      "TomStore — один из ведущих магазинов электроники в Бишкеке. Расположен по адресу: ул. Калык Акиева 66, ТЦ Весна, 3-й этаж, С47. Более 1 000 товаров в наличии: ноутбуки, принтеры, компьютеры, мониторы и аксессуары. Доставка по Бишкеку за 1 день, самовывоз в тот же день.",
    leadEn:
      "TomStore is one of Bishkek's leading electronics stores. Located at: Kalyk Akiev 66, Vesna Mall, 3rd floor, C47. Over 1,000 items in stock: laptops, printers, computers, monitors and accessories. Bishkek delivery in 1 day, same-day pickup available.",
    seoTextRu: [
      "Бишкек — столица и крупнейший город Кыргызстана с населением более 1 100 000 человек. Это главный IT-хаб страны, где сосредоточены технологические компании, университеты и учебные заведения. Спрос на электронику в Бишкеке — самый высокий в республике.",
      "TomStore обслуживает все районы Бишкека: Первомайский, Ленинский, Октябрьский и Свердловский. Доставка курьером в любую точку города за 1 рабочий день. Возможна оплата при получении — наличными или картой.",
      "В нашем магазине (ТЦ Весна, 3-й этаж, С47) вы можете лично ознакомиться с ассортиментом, получить консультацию специалиста, протестировать устройство перед покупкой и оформить рассрочку от 3 до 12 месяцев — с банком или без банка — прямо на месте. Также доступна онлайн-рассрочка на сайте TomStore.kg — никуда ехать не надо. Работаем ежедневно, без выходных, 09:00–19:00.",
    ],
    seoTextEn: [
      "Bishkek is the capital and largest city of Kyrgyzstan with over 1,100,000 residents. It's the country's main IT hub, home to tech companies, universities and educational institutions. Demand for electronics in Bishkek is the highest in the republic.",
      "TomStore serves all districts of Bishkek: Pervomaysky, Leninsky, Oktyabrsky and Sverdlovsky. Courier delivery to any part of the city within 1 business day. Cash or card payment on delivery available.",
    ],
    faqRu: [
      { q: "Где находится магазин TomStore в Бишкеке?", a: "TomStore расположен по адресу: ул. Калык Акиева 66, ТЦ Весна, 3-й этаж, С47, Бишкек. Работаем ежедневно, без выходных. Тел: +996-508-724-365." },
      { q: "Можно ли забрать товар самостоятельно из TomStore Бишкек?", a: "Да, самовывоз доступен в тот же день при наличии товара на складе. Магазин: ул. Калык Акиева 66, ТЦ Весна, 3-й этаж, С47. Для подтверждения наличия свяжитесь по WhatsApp или позвоните: +996-508-724-365." },
      { q: "Как быстро доставляют заказ по Бишкеку?", a: "Доставка по Бишкеку — в течение 1 рабочего дня с момента подтверждения заказа. Курьер свяжется с вами за 30 минут до прибытия." },
      { q: "Доступна ли рассрочка в TomStore Бишкек?", a: "Да! Рассрочка от 3 до 12 месяцев — с банком и без банка. Оформляйте онлайн прямо на сайте TomStore.kg — никуда ехать не надо. Или приходите в магазин (ТЦ Весна, 3-й этаж, С47) или звоните: +996-508-724-365." },
      { q: "Есть ли гарантия на товары TomStore?", a: "Все товары TomStore продаются с официальной гарантией производителя: ноутбуки — 1–2 года, принтеры — 1 год. Гарантийное обслуживание в авторизованных сервис-центрах Бишкека." },
    ],
    faqEn: [
      { q: "Where is TomStore located in Bishkek?", a: "TomStore is located at Kalyk Akiev 66, Vesna Mall, 3rd floor, C47, Bishkek. Open every day, no days off. Tel: +996-508-724-365." },
      { q: "Can I pick up my order from TomStore Bishkek?", a: "Yes, same-day pickup is available when items are in stock. Store address: Kalyk Akiev 66, Vesna Mall, 3rd floor, C47. Call or WhatsApp: +996-508-724-365 to confirm availability." },
      { q: "How fast is delivery in Bishkek?", a: "Delivery across Bishkek takes 1 business day from order confirmation. The courier will contact you 30 minutes before arrival." },
    ],
    nearbyLinks: [
      { nameRu: "Ноутбуки в Бишкеке", nameEn: "Laptops in Bishkek", href: "/noutbuki/bishkek" },
      { nameRu: "Принтеры в Бишкеке", nameEn: "Printers in Bishkek", href: "/printery/bishkek" },
      { nameRu: "Компьютеры в Бишкеке", nameEn: "Computers in Bishkek", href: "/kompyutery/bishkek" },
      { nameRu: "Мониторы в Бишкеке", nameEn: "Monitors in Bishkek", href: "/monitory/bishkek" },
      { nameRu: "Доставка по Бишкеку", nameEn: "Bishkek Delivery", href: "/dostavka/bishkek" },
    ],
  },
  {
    slug: "karakol",
    nameRu: "Каракол",
    nameEn: "Karakol",
    nameKy: "Каракол",
    inRu: "в Каракол",
    regionRu: "Иссык-Кульская область",
    isCapital: false,
    deliveryDays: "2–3 дня",
    population: "90 000",
    titleRu: "Купить электронику в Каракол — ноутбуки, принтеры | TomStore",
    titleEn: "Buy Electronics in Karakol — Laptops, Printers | TomStore",
    descriptionRu:
      "TomStore доставляет ноутбуки, принтеры и ПК в Каракол (Иссык-Кульская область) за 2–3 дня. Гарантия, рассрочка, онлайн-заказ.",
    descriptionEn:
      "TomStore delivers laptops, printers and PCs to Karakol (Issyk-Kul Region) in 2–3 days. Warranty, installment, online ordering.",
    h1Ru: "Купить электронику в Каракол — доставка 2–3 дня",
    h1En: "Buy Electronics in Karakol — 2–3 Day Delivery",
    leadRu:
      "TomStore доставляет широкий ассортимент электроники в Каракол — административный центр Иссык-Кульской области. Расстояние от Бишкека — около 350 км. Срок доставки: 2–3 рабочих дня. Оплата при получении, рассрочка доступна.",
    leadEn:
      "TomStore delivers a wide range of electronics to Karakol — the administrative center of Issyk-Kul Region. ~350 km from Bishkek. Delivery in 2–3 business days. Cash on delivery, installment available.",
    seoTextRu: [
      "Каракол — крупнейший город Иссык-Кульской области с населением около 90 000 человек. Туристический, образовательный и деловой центр региона. TomStore регулярно доставляет электронику жителям Каракола и близлежащих населённых пунктов: Чолпон-Ата, Балыкчы.",
      "Заказать ноутбук, принтер или компьютер в Каракол очень просто: выберите товар на сайте TomStore, оформите заказ онлайн, и курьер доставит его за 2–3 рабочих дня. Доступна оплата при получении или онлайн. Гарантия производителя сохраняется при любом способе получения.",
    ],
    seoTextEn: [
      "Karakol is the largest city in Issyk-Kul Region with about 90,000 residents. It's a tourism, education, and business hub. TomStore regularly delivers electronics to Karakol and nearby towns: Cholpon-Ata, Balykchy.",
      "Ordering electronics for Karakol delivery is simple: choose items at TomStore, place an order online, and courier delivers in 2–3 business days. Cash on delivery or online payment available. Manufacturer warranty applies regardless of delivery method.",
    ],
    faqRu: [
      { q: "TomStore доставляет в Каракол?", a: "Да! TomStore доставляет во все адреса г. Каракол и Иссык-Кульской области. Срок доставки: 2–3 рабочих дня. Стоимость уточняйте по тел: +996-508-724-365." },
      { q: "Как оформить заказ с доставкой в Каракол?", a: "Добавьте товар в корзину на сайте TomStore, введите адрес в Каракол при оформлении заказа. Менеджер подтвердит заказ и сообщит точную дату доставки." },
      { q: "Есть ли рассрочка для жителей Каракола?", a: "Да! Рассрочка от 3 до 12 месяцев — с банком и без банка — доступна по всему Кыргызстану, включая Каракол. Подробнее: +996-508-724-365." },
      { q: "Как быстро доставят ноутбук в Каракол?", a: "Стандартный срок доставки ноутбука в Каракол — 2–3 рабочих дня с момента подтверждения заказа." },
    ],
    faqEn: [
      { q: "Does TomStore deliver to Karakol?", a: "Yes! TomStore delivers to all addresses in Karakol and Issyk-Kul Region. Delivery time: 2–3 business days. Pricing: +996-508-724-365." },
      { q: "How to order electronics for Karakol delivery?", a: "Add items to your cart at TomStore, enter your Karakol address at checkout. Our manager will confirm the order and provide an exact delivery date." },
    ],
    nearbyLinks: [
      { nameRu: "Ноутбуки в Каракол", nameEn: "Laptops in Karakol", href: "/noutbuki/karakol" },
      { nameRu: "Принтеры в Каракол", nameEn: "Printers in Karakol", href: "/printery/karakol" },
      { nameRu: "Доставка в Каракол", nameEn: "Karakol Delivery", href: "/dostavka/karakol" },
      { nameRu: "Иссык-Кульская область", nameEn: "Issyk-Kul Region", href: "/issyk-kul" },
    ],
  },
];

// ─── National category pages ──────────────────────────────────────────────────

export const NATIONAL_CATEGORY_PAGES: NationalCategoryPage[] = [
  {
    slug: "noutbuki-kyrgyzstan",
    categorySlug: "noutbuki",
    catalogPath: "/catalog/laptops",
    nameRu: "Ноутбуки в Кыргызстане",
    nameEn: "Laptops in Kyrgyzstan",
    titleRu: "Купить ноутбук в Кыргызстане — лучшие цены | TomStore",
    titleEn: "Buy Laptop in Kyrgyzstan — Best Prices | TomStore",
    descriptionRu:
      "Купить ноутбук в Кыргызстане с доставкой по всей стране. Бишкек, Ош, Джалал-Абад, Каракол и все регионы КР. Гарантия, рассрочка. TomStore.kg",
    descriptionEn:
      "Buy a laptop in Kyrgyzstan with nationwide delivery. Bishkek, Osh, Jalal-Abad, Karakol and all regions. Warranty, installment. TomStore.kg",
    h1Ru: "Купить ноутбук в Кыргызстане — доставка по всей стране",
    h1En: "Buy Laptop in Kyrgyzstan — Nationwide Delivery",
    seoTextRu:
      "TomStore.kg — один из ведущих поставщиков ноутбуков в Кыргызстане. Широкий ассортимент от мировых брендов: HP, ASUS, Acer, Lenovo, Dell, MSI. Доставка по всем регионам КР — Бишкек, Ош, Джалал-Абад, Каракол, Нарын, Талас, Баткен и другие города. Все ноутбуки сертифицированы, поставляются с официальной гарантией производителя. Рассрочка от 3 до 12 месяцев — с банком и без банка, оформляйте онлайн на TomStore.kg. Работаем ежедневно, без выходных. Скоро открываем филиалы в регионах Кыргызстана! Подробнее: +996-508-724-365.",
    seoTextEn:
      "TomStore.kg is one of Kyrgyzstan's leading laptop suppliers. Wide selection from world brands: HP, ASUS, Acer, Lenovo, Dell, MSI. Delivery to all regions of Kyrgyzstan — Bishkek, Osh, Jalal-Abad, Karakol, Naryn, Talas, Batken and other cities. All laptops are certified and come with official manufacturer warranty. Interest-free installment, online payment and cash on delivery available.",
    faqRu: [
      { q: "Где купить ноутбук в Кыргызстане по лучшей цене?", a: "TomStore.kg предлагает одни из лучших цен на ноутбуки в Кыргызстане. Магазин: Бишкек, ТЦ Весна, 3-й этаж, С47. Доставка по всей стране за 1–4 дня." },
      { q: "TomStore доставляет ноутбуки в регионы Кыргызстана?", a: "Да! TomStore доставляет ноутбуки во все 7 областей и крупные города Кыргызстана. Сроки: Бишкек — 1 день, Ош — 2–3 дня, Нарын/Баткен — 3–4 дня." },
      { q: "Есть ли рассрочка на ноутбуки по всему Кыргызстану?", a: "Да! Рассрочка от 3 до 12 месяцев — с банком и без банка — доступна жителям всех регионов Кыргызстана. Оформляйте онлайн на сайте TomStore.kg — никуда ехать не надо. Подробнее: +996-508-724-365." },
      { q: "Какие бренды ноутбуков есть в TomStore?", a: "В TomStore представлены: HP, ASUS, Acer, Lenovo, Dell, MSI, Samsung. Есть бюджетные, игровые и профессиональные модели." },
      { q: "Как выбрать ноутбук для учёбы в Кыргызстане?", a: "Для учёбы рекомендуем ноутбук с Intel Core i5 / Ryzen 5, 8–16 ГБ RAM, 256–512 ГБ SSD. Бюджет — от 30 000 сом. Консультация и рассрочка: +996-508-724-365." },
    ],
    faqEn: [
      { q: "Where to buy a laptop in Kyrgyzstan at the best price?", a: "TomStore.kg offers some of the best laptop prices in Kyrgyzstan. Store: Bishkek, Vesna Mall, 3rd floor, C47. Nationwide delivery in 1–4 days." },
      { q: "Does TomStore deliver laptops to Kyrgyzstan regions?", a: "Yes! TomStore delivers laptops to all 7 oblasts and major cities of Kyrgyzstan. Delivery: Bishkek — 1 day, Osh — 2–3 days, Naryn/Batken — 3–4 days." },
      { q: "Is installment available nationwide?", a: "Yes! Installment from 3 to 12 months — with bank or without bank — available nationwide. Apply online at TomStore.kg — no need to visit the store. Details: +996-508-724-365." },
    ],
    apiQuery: "ноутбук",
  },
  {
    slug: "printery-kyrgyzstan",
    categorySlug: "printery",
    catalogPath: "/catalog/printers",
    nameRu: "Принтеры в Кыргызстане",
    nameEn: "Printers in Kyrgyzstan",
    titleRu: "Купить принтер в Кыргызстане — лучшие цены | TomStore",
    titleEn: "Buy Printer in Kyrgyzstan — Best Prices | TomStore",
    descriptionRu:
      "Купить принтер в Кыргызстане с доставкой по всей стране. Epson, HP, Canon. Бишкек, Ош, все регионы КР. Гарантия, рассрочка. TomStore.kg",
    descriptionEn:
      "Buy a printer in Kyrgyzstan with nationwide delivery. Epson, HP, Canon. Bishkek, Osh, all regions. Warranty, installment. TomStore.kg",
    h1Ru: "Купить принтер в Кыргызстане — доставка по всей стране",
    h1En: "Buy Printer in Kyrgyzstan — Nationwide Delivery",
    seoTextRu:
      "TomStore.kg предлагает широкий выбор принтеров и МФУ для дома, офиса и бизнеса. Бренды: Epson, Canon, HP, Brother, Kyocera. Лазерные и струйные принтеры, МФУ с функцией печати, сканирования и копирования. Все модели в наличии, доставка по Кыргызстану за 1–4 дня. Оригинальные картриджи и чернила в наличии. Корпоративным клиентам — специальные условия и сервисное обслуживание.",
    seoTextEn:
      "TomStore.kg offers a wide selection of printers and MFPs for home, office, and business. Brands: Epson, Canon, HP, Brother, Kyocera. Laser and inkjet printers, all-in-one MFPs with print, scan, and copy functions. All models in stock, delivery across Kyrgyzstan in 1–4 days. Original cartridges and inks available. Special terms and service support for corporate clients.",
    faqRu: [
      { q: "Где купить принтер в Кыргызстане?", a: "TomStore.kg — один из лучших магазинов принтеров в Кыргызстане. Магазин: Бишкек, ТЦ Весна, 3-й этаж, С47. Скоро откроем филиалы в регионах! Рассрочка от 3 до 12 мес. онлайн или по телефону: +996-508-724-365." },
      { q: "Какие принтеры лучше для дома?", a: "Для дома рекомендуем струйные МФУ Epson или Canon — доступные, экономичные, позволяют печатать фото. Epson L-серия с СНПЧ — особенно выгодна для частой печати." },
      { q: "TomStore доставляет принтеры в Ош и другие города?", a: "Да, принтеры доставляются во все крупные города Кыргызстана: Ош, Джалал-Абад, Каракол, Нарын, Талас, Баткен. Сроки: 2–4 дня." },
      { q: "Есть ли расходники (картриджи, чернила) в TomStore?", a: "Да, в TomStore доступны оригинальные и совместимые картриджи, чернила, тонеры, бумага для большинства моделей принтеров." },
    ],
    faqEn: [
      { q: "Where to buy a printer in Kyrgyzstan?", a: "TomStore.kg is one of the best printer stores in Kyrgyzstan. Store: Bishkek, Vesna Mall, 3rd floor, C47. Nationwide delivery. Installment 3–12 months: +996-508-724-365." },
      { q: "Does TomStore deliver printers to Osh and other cities?", a: "Yes, printers are delivered to all major Kyrgyzstan cities: Osh, Jalal-Abad, Karakol, Naryn, Talas, Batken. Delivery: 2–4 days." },
    ],
    apiQuery: "принтер",
  },
  {
    slug: "igrovye-noutbuki-kyrgyzstan",
    categorySlug: "noutbuki",
    catalogPath: "/catalog/laptops",
    nameRu: "Игровые ноутбуки в Кыргызстане",
    nameEn: "Gaming Laptops in Kyrgyzstan",
    titleRu: "Купить игровой ноутбук в Кыргызстане — RTX, доставка | TomStore",
    titleEn: "Buy Gaming Laptop in Kyrgyzstan — RTX, Delivery | TomStore",
    descriptionRu:
      "Игровые ноутбуки в Кыргызстане: RTX 4050, RTX 4060, RTX 4070. Бишкек, Ош, Каракол. Доставка по КР, гарантия, рассрочка. TomStore.kg",
    descriptionEn:
      "Gaming laptops in Kyrgyzstan: RTX 4050, RTX 4060, RTX 4070. Bishkek, Osh, Karakol. Nationwide delivery, warranty, installment. TomStore.kg",
    h1Ru: "Игровые ноутбуки в Кыргызстане — доставка по всей стране",
    h1En: "Gaming Laptops in Kyrgyzstan — Nationwide Delivery",
    seoTextRu:
      "TomStore.kg — главный магазин игровых ноутбуков в Кыргызстане. Ассортимент включает самые популярные гейминг-серии: ASUS TUF Gaming, ASUS ROG, Lenovo Legion, MSI Katana, Acer Nitro, HP Victus. Видеокарты NVIDIA GeForce RTX 4050, RTX 4060, RTX 4070 и RTX 4080. Процессоры Intel Core i7/i9 и AMD Ryzen 7/9. Экраны 144 Hz, 165 Hz, 240 Hz для плавного геймплея. Доставка игровых ноутбуков по всему Кыргызстану — Бишкек, Ош, Джалал-Абад, Каракол и все регионы.",
    seoTextEn:
      "TomStore.kg is Kyrgyzstan's main gaming laptop store. Our lineup includes the most popular gaming series: ASUS TUF Gaming, ASUS ROG, Lenovo Legion, MSI Katana, Acer Nitro, HP Victus. NVIDIA GeForce RTX 4050, RTX 4060, RTX 4070, and RTX 4080 GPUs. Intel Core i7/i9 and AMD Ryzen 7/9 processors. 144Hz, 165Hz, 240Hz displays for smooth gameplay. Gaming laptop delivery across all of Kyrgyzstan — Bishkek, Osh, Jalal-Abad, Karakol and all regions.",
    faqRu: [
      { q: "Где купить игровой ноутбук в Кыргызстане?", a: "TomStore.kg — главный магазин игровых ноутбуков в КР. Адрес: Бишкек, ул. Калык Акиева 66, ТЦ Весна, 3-й этаж, С47. Доставка по всему Кыргызстану." },
      { q: "Какие игровые ноутбуки есть в TomStore?", a: "В TomStore: ASUS TUF, ROG, Lenovo Legion, MSI, Acer Nitro, HP Victus. Видеокарты RTX 3050 до RTX 4080. Бюджетные от 45 000 сом, топовые до 200 000 сом." },
      { q: "Доставляют ли игровые ноутбуки в Ош?", a: "Да! Любой игровой ноутбук из каталога TomStore доставляется в Ош за 2–3 рабочих дня с официальной гарантией." },
      { q: "Есть ли рассрочка на игровые ноутбуки?", a: "Да! Рассрочка от 3 до 12 месяцев — с банком и без банка — на все игровые ноутбуки. Оформите онлайн на TomStore.kg, в магазине (ТЦ Весна, 3-й этаж, С47) или по тел: +996-508-724-365." },
      { q: "Что лучше — RTX 4050 или RTX 4060 для игр?", a: "RTX 4060 мощнее на ~30%. RTX 4050 дешевле на 5 000–10 000 сом — отличный выбор для eSports и не очень тяжёлых игр. RTX 4060 нужен для AAA-игр на высоких настройках и 1440p." },
    ],
    faqEn: [
      { q: "Where to buy a gaming laptop in Kyrgyzstan?", a: "TomStore.kg is Kyrgyzstan's main gaming laptop store. Address: Bishkek, Kalyk Akiev 66, Vesna Mall, 3rd floor, C47. Nationwide delivery." },
      { q: "Does TomStore deliver gaming laptops to Osh?", a: "Yes! Any gaming laptop from TomStore's catalog is delivered to Osh in 2–3 business days with official warranty." },
      { q: "Is installment available on gaming laptops?", a: "Yes! Installment from 3 to 12 months — with bank or without bank — on all gaming laptops. Apply online at TomStore.kg, in-store (Vesna Mall, 3rd floor, C47) or call: +996-508-724-365." },
    ],
    apiQuery: "игровой ноутбук",
  },
];

export function getNationalCityPage(slug: string): NationalCityPage | undefined {
  return NATIONAL_CITY_PAGES.find((p) => p.slug === slug);
}

export function getNationalCategoryPage(slug: string): NationalCategoryPage | undefined {
  return NATIONAL_CATEGORY_PAGES.find((p) => p.slug === slug);
}
