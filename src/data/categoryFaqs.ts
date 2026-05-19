export interface FaqItem {
  question: string;
  answer: string;
}

type LocaleFaqs = Record<"ru" | "en" | "ky", FaqItem[]>;

const categoryFaqs: Record<string, LocaleFaqs> = {
  "/catalog/laptops": {
    ru: [
      {
        question: "Какой ноутбук лучше выбрать для учёбы?",
        answer:
          "Для учёбы оптимально выбирать ноутбуки с процессором Intel Core i5 или AMD Ryzen 5, 8–16 ГБ оперативной памяти и SSD-накопителем от 256 ГБ. Хорошие варианты — Lenovo IdeaPad, ASUS VivoBook, HP 15. Бюджет от 25 000 до 40 000 сом.",
      },
      {
        question: "Есть ли рассрочка на ноутбуки в TomStore?",
        answer:
          "Да! Рассрочка от 3 до 12 месяцев — с банком и без банка. Оформляйте онлайн на TomStore.kg — никуда ехать не надо. Или в магазине (ТЦ Весна, 3-й этаж, С47) по телефону +996-508-724-365. Для банковской рассрочки нужен только паспорт.",
      },
      {
        question: "Какая гарантия на ноутбуки?",
        answer:
          "Все ноутбуки продаются с официальной гарантией производителя сроком 12–24 месяца. Сервисный центр TomStore находится в Бишкеке.",
      },
      {
        question: "Можно ли привезти ноутбук на диагностику?",
        answer:
          "Да, принимаем ноутбуки на диагностику и ремонт в нашем сервисном центре. Диагностика бесплатная для товаров, купленных в TomStore.",
      },
    ],
    en: [
      {
        question: "Which laptop is best for studying?",
        answer:
          "For studying, the best choice is a laptop with an Intel Core i5 or AMD Ryzen 5 processor, 8–16 GB RAM, and a 256 GB+ SSD. Good options include Lenovo IdeaPad, ASUS VivoBook, and HP 15. Budget: 25,000–40,000 KGS.",
      },
      {
        question: "Is installment payment available at TomStore?",
        answer:
          "Yes! Installment from 3 to 12 months — with bank or without bank. Apply online at TomStore.kg — no need to visit the store. Or in-store (Vesna Mall, 3rd floor, C47) or call +996-508-724-365. Only a Kyrgyz passport is required.",
      },
      {
        question: "What warranty comes with laptops?",
        answer:
          "All laptops are sold with an official manufacturer warranty of 12–24 months. TomStore's service center is located in Bishkek.",
      },
      {
        question: "Can I bring a laptop in for diagnostics?",
        answer:
          "Yes, we accept laptops for diagnostics and repair at our service center. Diagnostics is free for items purchased at TomStore.",
      },
    ],
    ky: [
      {
        question: "Окуу үчүн кайсы ноутбук жакшы?",
        answer:
          "Окуу үчүн Intel Core i5 же AMD Ryzen 5 процессору, 8–16 ГБ оперативдүү эс тутуму жана 256 ГБ SSD бар ноутбукту тандоо оптималдуу. Lenovo IdeaPad, ASUS VivoBook, HP 15 — жакшы варианттар.",
      },
      {
        question: "TomStore дүкөнүндө ноутбуктарды бөлүп төлөөгө алуу мүмкүнбү?",
        answer:
          "Ооба, бардык ноутбуктар 3, 6 жана 12 айга кошумча төлөөсүз бөлүп төлөө менен жеткиликтүү. Каттоо үчүн КР паспорту гана талап кылынат.",
      },
      {
        question: "Ноутбуктарга кепилдик канча убакытка берилет?",
        answer:
          "Бардык ноутбуктар 12–24 айга өндүрүүчүнүн расмий кепилдиги менен сатылат.",
      },
    ],
  },

  "/catalog/printers": {
    ru: [
      {
        question: "Чем отличается струйный принтер от лазерного?",
        answer:
          "Струйные принтеры лучше подходят для печати фотографий и цветных документов, стоят дешевле при покупке, но расходники дороже. Лазерные принтеры быстрее печатают, экономичнее в обслуживании и лучше для офисной черно-белой печати.",
      },
      {
        question: "Есть ли в TomStore оригинальные картриджи?",
        answer:
          "Да, в наличии оригинальные картриджи и тонеры для всех продаваемых моделей принтеров: Epson, Canon, HP, Brother, Kyocera. Также доступны совместимые картриджи по сниженной цене.",
      },
      {
        question: "Можно ли купить принтер с установкой и настройкой?",
        answer:
          "Да, предоставляем услугу установки и настройки принтера на месте. Стоимость услуги уточняйте при заказе.",
      },
      {
        question: "Какой принтер купить для дома?",
        answer:
          "Для дома рекомендуем МФУ (принтер + сканер + копир) на базе струйной технологии — например, Epson L3250 или Canon PIXMA. Они экономичны в использовании и позволяют печатать фотографии.",
      },
    ],
    en: [
      {
        question: "What is the difference between inkjet and laser printers?",
        answer:
          "Inkjet printers are better for photos and color documents, cost less upfront, but have more expensive consumables. Laser printers print faster, are more economical to maintain, and are better for office black-and-white printing.",
      },
      {
        question: "Does TomStore stock original cartridges?",
        answer:
          "Yes, original cartridges and toners are in stock for all printer models we sell: Epson, Canon, HP, Brother, Kyocera. Compatible cartridges are also available at lower prices.",
      },
      {
        question: "Which printer is best for home use?",
        answer:
          "For home use, we recommend an inkjet MFP (printer + scanner + copier) — for example, the Epson L3250 or Canon PIXMA. They're economical and can print photos.",
      },
    ],
    ky: [
      {
        question: "Inkjet жана лазердик принтердин айырмасы эмне?",
        answer:
          "Inkjet принтерлер сүрөттөрдү жана түстүү документтерди басып чыгарууга ылайыктуу. Лазердик принтерлер тезирээк басып чыгарат жана офистик кара-ак басып чыгарууга ылайыктуу.",
      },
      {
        question: "TomStore дүкөнүндө оригиналдуу картридждер барбы?",
        answer:
          "Ооба, Epson, Canon, HP, Brother, Kyocera принтерлери үчүн оригиналдуу картридждер жана тонерлер сатыкта бар.",
      },
    ],
  },

  "/catalog/monitors": {
    ru: [
      {
        question: "Какой монитор выбрать для работы?",
        answer:
          "Для офисной работы рекомендуем IPS монитор с диагональю 24–27 дюймов, разрешением Full HD (1920×1080) или QHD (2560×1440). Важна хорошая цветопередача и регулировка высоты подставки.",
      },
      {
        question: "Какой монитор подойдёт для игр?",
        answer:
          "Для игр рекомендуем монитор с частотой обновления 144 Гц или выше, временем отклика 1–5 мс, поддержкой FreeSync или G-Sync. Оптимальная диагональ — 24–27 дюймов.",
      },
      {
        question: "Есть ли изогнутые мониторы в TomStore?",
        answer:
          "Да, в наличии изогнутые мониторы формата 21:9 и 32:9 с радиусом кривизны 1000R–1800R для иммерсивной работы и игр.",
      },
    ],
    en: [
      {
        question: "Which monitor is best for work?",
        answer:
          "For office work, we recommend an IPS monitor with a 24–27 inch diagonal, Full HD (1920×1080) or QHD (2560×1440) resolution. Good color accuracy and height-adjustable stand are important.",
      },
      {
        question: "Which monitor is best for gaming?",
        answer:
          "For gaming, look for a monitor with 144 Hz+ refresh rate, 1–5 ms response time, and FreeSync or G-Sync support. Optimal diagonal is 24–27 inches.",
      },
    ],
    ky: [
      {
        question: "Иш үчүн кайсы монитор тандоо керек?",
        answer:
          "Офистик иш үчүн 24–27 дюйм диагоналдуу, Full HD же QHD ажырымдуулугу бар IPS монитор сунушталат.",
      },
      {
        question: "Оюндар үчүн кайсы монитор ылайыктуу?",
        answer:
          "Оюндар үчүн 144 Гц же андан жогору жаңылануу жыштыгы, 1–5 мс жооп убактысы, FreeSync же G-Sync колдоосу бар мониторду издеңиз.",
      },
    ],
  },

  "/catalog/computers": {
    ru: [
      {
        question: "Можно ли собрать ПК на заказ в TomStore?",
        answer:
          "Да, предлагаем услугу сборки ПК под заказ. Вы выбираете компоненты или сообщаете задачи и бюджет — наши специалисты подбирают совместимые комплектующие и собирают систему с тестированием.",
      },
      {
        question: "Сколько стоит офисный компьютер?",
        answer:
          "Базовые офисные компьютеры для работы с документами и интернетом доступны от 15 000 сом. Более мощные конфигурации с дискретной графикой — от 30 000 сом.",
      },
      {
        question: "Включена ли Windows в стоимость?",
        answer:
          "Большинство готовых ПК поставляются с лицензионной Windows 11 Home или Pro. Уточняйте при заказе — возможна установка без ОС по сниженной цене.",
      },
    ],
    en: [
      {
        question: "Can I order a custom-built PC at TomStore?",
        answer:
          "Yes, we offer a custom PC build service. Tell us your tasks and budget — our specialists will select compatible components and assemble your system with full testing.",
      },
      {
        question: "How much does an office computer cost?",
        answer:
          "Basic office computers for documents and internet start at 15,000 KGS. More powerful configurations with discrete graphics start at 30,000 KGS.",
      },
    ],
    ky: [
      {
        question: "TomStore дүкөнүндө ПК заказ боюнча чогулттурууга болобу?",
        answer:
          "Ооба, заказ боюнча ПК чогултуу кызматын сунуштайбыз. Милдеттериңизди жана бюджетиңизди айтыңыз — адистерибиз компоненттерди тандап, системаны сынактан өткөрүп чогултат.",
      },
    ],
  },
};

export default categoryFaqs;
