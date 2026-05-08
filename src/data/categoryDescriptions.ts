export interface CategoryDescription {
  title: string;
  description: string;
}

type LocaleDescriptions = Record<"ru" | "en" | "ky", CategoryDescription>;

const categoryDescriptions: Record<string, LocaleDescriptions> = {
  "/catalog/laptops": {
    ru: {
      title: "Ноутбуки в Бишкеке",
      description:
        "В TomStore представлен широкий выбор ноутбуков для любых задач: офисная работа, учёба, игры и профессиональное творчество. Мы предлагаем модели от ведущих мировых брендов — Lenovo, HP, ASUS, Acer, Dell, MSI и Apple. В нашем каталоге вы найдёте бюджетные ноутбуки для повседневных задач, мощные игровые машины с видеокартами NVIDIA RTX, ультрабуки для деловых людей и профессиональные рабочие станции для дизайнеров и инженеров. Все ноутбуки сертифицированы, поставляются с официальной гарантией и доступны в рассрочку без переплат. Бесплатная доставка по Бишкеку при заказе от 3000 сом. Консультанты TomStore помогут подобрать оптимальную модель под ваш бюджет и задачи.",
    },
    en: {
      title: "Laptops in Bishkek",
      description:
        "TomStore offers a wide selection of laptops for any purpose: office work, studying, gaming, and professional creative tasks. We stock models from world-leading brands — Lenovo, HP, ASUS, Acer, Dell, MSI, and Apple. Our catalog includes budget laptops for everyday use, powerful gaming rigs with NVIDIA RTX graphics, slim ultrabooks for business professionals, and workstations for designers and engineers. All laptops are certified, come with an official warranty, and are available on installment plans. Free delivery across Bishkek on orders over 3,000 KGS. TomStore consultants will help you choose the right model for your budget and needs.",
    },
    ky: {
      title: "Ноутбуктар Бишкекте",
      description:
        "TomStore дүкөнүндө ар кандай максаттар үчүн ноутбуктардын кең тандоосу бар: офистик иш, окуу, оюндар жана кесиптик чыгармачылык. Биз дүйнөнүн алдыңкы бренддеринен модельдерди сунуштайбыз — Lenovo, HP, ASUS, Acer, Dell, MSI жана Apple. Каталогубузда күнүмдүк милдеттер үчүн бюджеттик ноутбуктар, NVIDIA RTX видеокарталары бар күчтүү оюн компьютерлери, иш адамдары үчүн ультрабуктар жана дизайнерлер менен инженерлер үчүн жумуш станциялары бар. Бардык ноутбуктар сертификатталган, расмий кепилдик менен жеткирилет жана бөлүп төлөө менен жеткиликтүү.",
    },
  },

  "/catalog/printers": {
    ru: {
      title: "Принтеры в Бишкеке",
      description:
        "TomStore — ваш надёжный поставщик принтеров, МФУ и расходных материалов в Бишкеке. В каталоге представлены струйные принтеры для качественной цветной печати фотографий и документов, лазерные принтеры для высокоскоростной офисной печати, а также МФУ — многофункциональные устройства с возможностью печати, сканирования и копирования. Мы работаем с ведущими производителями: Epson, Canon, HP, Brother и Kyocera. Для каждой модели доступны оригинальные картриджи, чернила и тонеры по выгодным ценам. Корпоративным клиентам предоставляем специальные условия и сервисное обслуживание. Все принтеры в наличии, доставка по Бишкеку за 1 день.",
    },
    en: {
      title: "Printers in Bishkek",
      description:
        "TomStore is your trusted supplier of printers, multifunction devices, and consumables in Bishkek. Our catalog features inkjet printers for high-quality color printing of photos and documents, laser printers for fast office printing, and all-in-one MFPs with printing, scanning, and copying capabilities. We work with leading manufacturers: Epson, Canon, HP, Brother, and Kyocera. Original cartridges, inks, and toners are available for every model at competitive prices. Corporate clients receive special terms and service support. All printers are in stock — same-day delivery across Bishkek.",
    },
    ky: {
      title: "Принтерлер Бишкекте",
      description:
        "TomStore — Бишкектеги принтерлердин, МФУлардын жана сарп материалдарынын ишенимдүү жеткирүүчүсү. Каталогдо сүрөттөрдү жана документтерди сапаттуу түрдүү басып чыгаруу үчүн inkjet принтерлер, офистик тез басып чыгаруу үчүн лазердик принтерлер, ошондой эле басып чыгаруу, скандоо жана көчүрүү мүмкүнчүлүгү бар МФУлар бар. Epson, Canon, HP, Brother жана Kyocera өндүрүүчүлөрү менен иштейбиз.",
    },
  },

  "/catalog/computers": {
    ru: {
      title: "Компьютеры и ПК в Бишкеке",
      description:
        "В TomStore вы найдёте готовые системные блоки, моноблоки и мини-ПК для дома, офиса и профессиональной работы. Предлагаем как бюджетные решения для базовых офисных задач, так и мощные рабочие станции для 3D-моделирования, видеомонтажа и разработки ПО. Также доступна услуга сборки ПК под заказ: вы выбираете компоненты, наши специалисты собирают и тестируют систему. Все компьютеры поставляются с установленной операционной системой Windows и пакетом ПО по желанию. Гарантия на каждую систему, техническая поддержка после покупки. Широкий выбор мониторов, клавиатур и мышей в комплекте.",
    },
    en: {
      title: "Desktop Computers & PCs in Bishkek",
      description:
        "TomStore offers ready-made desktop PCs, all-in-ones, and mini PCs for home, office, and professional use. We provide budget solutions for basic office tasks as well as powerful workstations for 3D modeling, video editing, and software development. Custom PC build-to-order service is also available — you choose components, our specialists assemble and test the system. All computers come with Windows pre-installed and optional software packages. Warranty on every system with post-purchase technical support.",
    },
    ky: {
      title: "Компьютерлер жана ПК Бишкекте",
      description:
        "TomStore дүкөнүндө үй, офис жана кесиптик иш үчүн даяр системалык блоктор, моноблоктор жана мини-ПКлар бар. Негизги офистик милдеттер үчүн бюджеттик чечимдерди да, 3D моделдөө, видео монтаж жана программалык камсыздоону иштеп чыгуу үчүн күчтүү жумуш станцияларын да сунуштайбыз. Заказ боюнча ПК чогултуу кызматы да бар.",
    },
  },

  "/catalog/monitors": {
    ru: {
      title: "Мониторы в Бишкеке",
      description:
        "TomStore предлагает широкий выбор мониторов для дома, офиса и игр. В каталоге представлены модели с диагональю от 21 до 34 дюймов, разрешением Full HD, QHD и 4K UHD. Для геймеров — игровые мониторы с частотой обновления 144 Гц, 165 Гц и 240 Гц, поддержкой AMD FreeSync и NVIDIA G-Sync. Для дизайнеров и фотографов — мониторы с расширенным цветовым охватом sRGB 99% и выше. Офисные мониторы с регулировкой высоты подставки и поворотом экрана снизят нагрузку на зрение. Производители: Samsung, LG, ASUS, Acer, AOC, BenQ, ViewSonic. Все мониторы в наличии, самовывоз и доставка по Бишкеку.",
    },
    en: {
      title: "Monitors in Bishkek",
      description:
        "TomStore offers a wide selection of monitors for home, office, and gaming. Our catalog includes models from 21 to 34 inches with Full HD, QHD, and 4K UHD resolution. For gamers — gaming monitors with 144 Hz, 165 Hz, and 240 Hz refresh rates, supporting AMD FreeSync and NVIDIA G-Sync. For designers and photographers — monitors with extended sRGB 99% color gamut. Office monitors with height-adjustable stands reduce eye strain. Brands: Samsung, LG, ASUS, Acer, AOC, BenQ, ViewSonic. All monitors in stock — pickup or delivery across Bishkek.",
    },
    ky: {
      title: "Мониторлор Бишкекте",
      description:
        "TomStore үй, офис жана оюндар үчүн мониторлордун кең тандоосун сунуштайт. Каталогдо 21ден 34 дюймга чейин диагоналы, Full HD, QHD жана 4K UHD ажырымдуулугу бар модельдер бар. Оюнчулар үчүн — 144 Гц, 165 Гц жана 240 Гц жаңылануу жыштыгы бар оюн мониторлору. Дизайнерлер үчүн — кеңейтилген түс камтуу диапазонуна ээ мониторлор.",
    },
  },

  "/catalog/components": {
    ru: {
      title: "Комплектующие для ПК в Бишкеке",
      description:
        "TomStore — один из крупнейших поставщиков комплектующих для ПК в Бишкеке. В наличии: процессоры Intel Core и AMD Ryzen, видеокарты NVIDIA GeForce и AMD Radeon, оперативная память DDR4 и DDR5, материнские платы для любых платформ, SSD-накопители M.2 и SATA, блоки питания и корпуса. Помогаем подобрать совместимые компоненты для апгрейда существующего ПК или сборки с нуля. Наши специалисты бесплатно проконсультируют по выбору конфигурации под ваш бюджет. Работаем как с частными покупателями, так и с корпоративными заказчиками. Гарантия на все комплектующие, возврат в течение 14 дней.",
    },
    en: {
      title: "PC Components in Bishkek",
      description:
        "TomStore is one of the largest PC component suppliers in Bishkek. In stock: Intel Core and AMD Ryzen processors, NVIDIA GeForce and AMD Radeon graphics cards, DDR4 and DDR5 RAM, motherboards for all platforms, M.2 and SATA SSDs, power supplies, and cases. We help you select compatible components for upgrading an existing PC or building from scratch. Our specialists provide free consultation on configuration within your budget. We serve both individual buyers and corporate clients. Warranty on all components with 14-day returns.",
    },
    ky: {
      title: "ПК комплектующийлер Бишкекте",
      description:
        "TomStore — Бишкектеги ПК комплектующийлеринин эң ири жеткирүүчүлөрүнүн бири. Сатыкта бар: Intel Core жана AMD Ryzen процессорлор, NVIDIA GeForce жана AMD Radeon видеокарталар, DDR4 жана DDR5 оперативдүү эс тутум, бардык платформалар үчүн аналык платалар, M.2 жана SATA SSD дисктер. Бюджетиңизге ылайыктуу конфигурацияны тандоодо кеңеш берүүчүлөрүбүз жардам берет.",
    },
  },

  "/catalog/accessories": {
    ru: {
      title: "Аксессуары для ноутбуков и ПК в Бишкеке",
      description:
        "В TomStore большой выбор аксессуаров для ноутбуков и компьютеров: сумки и рюкзаки для ноутбуков, подставки и охлаждающие подставки, USB-хабы и разветвители, адаптеры и переходники HDMI, DisplayPort, USB-C. Также в наличии чистящие наборы, защитные плёнки, кабели и зарядные устройства. Всё необходимое для комфортной работы в офисе и в дороге. Доступны аксессуары для всех популярных моделей ноутбуков — MacBook, ThinkPad, HP, ASUS и других. Регулярные акции и скидки на аксессуары. Быстрая доставка по Бишкеку и Кыргызстану.",
    },
    en: {
      title: "Laptop & PC Accessories in Bishkek",
      description:
        "TomStore stocks a wide range of laptop and computer accessories: laptop bags and backpacks, stands and cooling pads, USB hubs and splitters, HDMI, DisplayPort, and USB-C adapters. Also available: cleaning kits, screen protectors, cables, and chargers — everything you need for comfortable work at the office and on the go. Accessories are available for all popular laptop models — MacBook, ThinkPad, HP, ASUS, and more. Regular promotions and discounts. Fast delivery across Bishkek and Kyrgyzstan.",
    },
    ky: {
      title: "Ноутбук жана ПК аксессуарлары Бишкекте",
      description:
        "TomStore дүкөнүндө ноутбуктар жана компьютерлер үчүн аксессуарлардын чоң тандоосу бар: ноутбук баштыктары жана рюкзактары, туруктар жана муздатуу туруктары, USB-хабдар жана HDMI адаптерлер. Бардык популярдуу ноутбук моделдери үчүн аксессуарлар бар. Бишкек жана Кыргызстан боюнча тез жеткирүү.",
    },
  },

  "/catalog/peripherals": {
    ru: {
      title: "Периферия для ПК в Бишкеке",
      description:
        "TomStore предлагает полный ассортимент периферийных устройств для ПК и ноутбуков. Клавиатуры — мембранные, механические, беспроводные и игровые с RGB-подсветкой. Мыши — офисные, эргономичные, игровые с высоким DPI. Гарнитуры и наушники для работы, конференций и игр. Веб-камеры Full HD и 4K для видеозвонков и стриминга. Акустические системы и колонки от Logitech, JBL, Trust и других брендов. Игровые контроллеры и геймпады. Все устройства совместимы с Windows и macOS. Отличное соотношение цены и качества, официальная гарантия производителя.",
    },
    en: {
      title: "PC Peripherals in Bishkek",
      description:
        "TomStore offers a full range of peripherals for PCs and laptops. Keyboards — membrane, mechanical, wireless, and gaming with RGB lighting. Mice — office, ergonomic, gaming with high DPI. Headsets and headphones for work, conferences, and gaming. Full HD and 4K webcams for video calls and streaming. Speaker systems from Logitech, JBL, Trust, and other brands. Gaming controllers and gamepads. All devices are compatible with Windows and macOS. Excellent value for money with official manufacturer warranty.",
    },
    ky: {
      title: "ПК перифериялык түзүлүштөр Бишкекте",
      description:
        "TomStore ПК жана ноутбуктар үчүн перифериялык түзүлүштөрдүн толук ассортиментин сунуштайт. Клавиатуралар, чычкандар, гарнитуралар, вебкамералар жана акустикалык системалар. Бардык түзүлүштөр Windows жана macOS менен шайкеш. Расмий өндүрүүчү кепилдиги менен жакшы баа-сапат катышы.",
    },
  },

  "/catalog/network": {
    ru: {
      title: "Сетевое оборудование в Бишкеке",
      description:
        "TomStore — ваш поставщик сетевого оборудования для дома, офиса и бизнеса в Бишкеке. В каталоге: Wi-Fi роутеры и точки доступа — стандарты Wi-Fi 5, Wi-Fi 6 и Wi-Fi 6E от TP-Link, ASUS, Mikrotik, Keenetic. Сетевые коммутаторы, сетевые карты, NAS-серверы для хранения данных. Кабели Ethernet Cat5e, Cat6, Cat6A для построения проводных сетей. Оборудование для видеонаблюдения и сетевой безопасности. Помогаем с проектированием и настройкой сети для офисов и предприятий. Все оборудование в наличии, доставка и монтаж в Бишкеке.",
    },
    en: {
      title: "Network Equipment in Bishkek",
      description:
        "TomStore is your supplier of network equipment for home, office, and business in Bishkek. Our catalog includes: Wi-Fi routers and access points — Wi-Fi 5, Wi-Fi 6, and Wi-Fi 6E standards from TP-Link, ASUS, Mikrotik, Keenetic. Network switches, network cards, NAS servers for data storage. Ethernet Cat5e, Cat6, Cat6A cables for wired networks. Video surveillance and network security equipment. We assist with network design and configuration for offices and enterprises. All equipment in stock — delivery and installation in Bishkek.",
    },
    ky: {
      title: "Тармак жабдуулары Бишкекте",
      description:
        "TomStore — Бишкектеги үй, офис жана бизнес үчүн тармак жабдууларынын жеткирүүчүсү. Каталогдо: Wi-Fi роутерлер жана жеткиримдүү чекиттер, тармак которгучтары, NAS серверлери, Ethernet кабелдер. TP-Link, ASUS, Mikrotik, Keenetic бренддери менен иштейбиз. Офистер жана ишканалар үчүн тармак долбоорлоо жана конфигурациялоо боюнча жардам беребиз.",
    },
  },

  "/catalog/pc": {
    ru: {
      title: "Системные блоки в Бишкеке",
      description:
        "В TomStore доступны готовые системные блоки и сборки ПК для дома и офиса. Конфигурации на базе процессоров Intel Core i3, i5, i7, i9 и AMD Ryzen 3, 5, 7, 9 в сочетании с дискретными видеокартами или встроенной графикой. Бюджетные офисные ПК от 15 000 сом, игровые сборки от 40 000 сом, профессиональные рабочие станции для видеомонтажа и 3D-рендеринга. Возможна индивидуальная сборка под ваши задачи и бюджет. Все системные блоки тестируются перед продажей, комплектуются лицензионной Windows и предоставляются с гарантией 12 месяцев.",
    },
    en: {
      title: "Desktop PC Cases & Systems in Bishkek",
      description:
        "TomStore offers ready-made desktop PCs and custom builds for home and office. Configurations based on Intel Core i3/i5/i7/i9 and AMD Ryzen 3/5/7/9 processors with discrete or integrated graphics. Budget office PCs from 15,000 KGS, gaming builds from 40,000 KGS, and professional workstations for video editing and 3D rendering. Custom builds available to match your tasks and budget. All systems are tested before sale, come with licensed Windows, and include a 12-month warranty.",
    },
    ky: {
      title: "Системалык блоктор Бишкекте",
      description:
        "TomStore дүкөнүндө үй жана офис үчүн даяр системалык блоктор жана ПК чогулмалары бар. Intel Core жана AMD Ryzen процессорлорунун негизиндеги конфигурациялар. Бюджеттик офистик ПКлардан баштап профессиональ жумуш станцияларына чейин. Бардык системалар сатылганга чейин сыналат, лицензиялык Windows менен жабдылат жана 12 ай кепилдик берилет.",
    },
  },

  "/catalog/sale": {
    ru: {
      title: "Распродажа электроники в Бишкеке",
      description:
        "Раздел распродаж TomStore — лучшее место для выгодных покупок электроники в Бишкеке. Здесь вы найдёте ноутбуки, принтеры, компьютеры, мониторы и аксессуары со скидками до 50%. Акционные товары меняются каждую неделю, поэтому рекомендуем проверять раздел регулярно. Все товары на распродаже — оригинальные, с гарантией производителя. Скидки предоставляются на товары с истекающим сроком гарантии, витринные образцы и модели предыдущих поколений. Сэкономьте на покупке качественной техники без ущерба для надёжности и функциональности.",
    },
    en: {
      title: "Electronics Sale in Bishkek",
      description:
        "TomStore's sale section is the best place for great electronics deals in Bishkek. Here you'll find laptops, printers, computers, monitors, and accessories with discounts up to 50%. Sale items change weekly, so we recommend checking regularly. All sale items are genuine with manufacturer warranty. Discounts apply to items with expiring warranty, display models, and previous-generation products. Save on quality tech without compromising reliability or functionality.",
    },
    ky: {
      title: "Электроника дисконту Бишкекте",
      description:
        "TomStore дүкөнүнүн дисконт бөлүмү — Бишкекте электроника арзан сатып алуу үчүн эң жакшы жер. Бул жерде 50% ка чейин арзандатуу менен ноутбуктарды, принтерлерди, компьютерлерди, мониторлорду жана аксессуарларды таба аласыз. Дисконт товарлары ар жума өзгөрүп турат. Бардык дисконт товарлары оригиналдуу, өндүрүүчү кепилдиги менен.",
    },
  },
};

export default categoryDescriptions;
