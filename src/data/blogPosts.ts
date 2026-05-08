export interface BlogPost {
  slug: string;
  titleRu: string;
  titleEn: string;
  titleKy: string;
  descriptionRu: string;
  descriptionEn: string;
  publishedAt: string; // ISO date
  category: string;
  readingMinutes: number;
  contentRu: string;
  contentEn: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: "kak-vybrat-noutbuk-2025",
    titleRu: "Как выбрать ноутбук в 2025 году: полное руководство",
    titleEn: "How to Choose a Laptop in 2025: Complete Guide",
    titleKy: "2025-жылы ноутбук кантип тандоо керек: толук колдонмо",
    descriptionRu:
      "Подробное руководство по выбору ноутбука: процессор, видеокарта, объём памяти, время автономной работы. Рекомендации TomStore для учёбы, работы и игр.",
    descriptionEn:
      "A detailed guide to choosing a laptop: processor, GPU, RAM, battery life. TomStore recommendations for study, work, and gaming.",
    publishedAt: "2025-03-15",
    category: "laptops",
    readingMinutes: 8,
    contentRu: `## Как выбрать ноутбук в 2025 году

Выбор ноутбука — ответственное решение. В 2025 году рынок предлагает огромное разнообразие моделей на любой бюджет и задачи. В этом руководстве мы разберём все ключевые параметры.

### 1. Процессор (CPU)

Процессор — «мозг» ноутбука. В 2025 году актуальны:
- **Intel Core Ultra 5/7/9** (Meteor Lake/Lunar Lake) — отличный выбор для работы и учёбы
- **AMD Ryzen 5/7/9 серии 8000** — конкурентоспособная производительность, хорошая автономность
- **Apple M3/M4** — лучшая производительность на ватт для macOS

Для офисных задач достаточно Core i5 / Ryzen 5. Для видеомонтажа и 3D — Core i7/i9 или Ryzen 7/9.

### 2. Оперативная память (RAM)

- **8 ГБ** — минимум для работы с документами и браузером
- **16 ГБ** — комфортная работа, рекомендуем как стартовую точку
- **32 ГБ** — для видеомонтажа, разработки ПО, виртуальных машин

### 3. Накопитель (SSD)

Только SSD — HDD в ноутбуках устарел. Минимум 256 ГБ, рекомендуем 512 ГБ и больше.

### 4. Видеокарта

- Встроенная графика (Intel Iris Xe, AMD Radeon) — для офиса и учёбы
- NVIDIA GeForce RTX 3050 — для лёгких игр и работы с графикой
- NVIDIA GeForce RTX 4060/4070 — для AAA игр и профессиональной работы

### 5. Дисплей

- Full HD (1920×1080) — стандарт для большинства задач
- QHD (2560×1440) — лучше для дизайна и контента
- 144+ Гц — обязательно для игровых ноутбуков

### Рекомендации TomStore

**Для учёбы до 35 000 сом:** Lenovo IdeaPad 3 Gen 8, ASUS VivoBook 15
**Для работы до 60 000 сом:** HP EliteBook, Lenovo ThinkBook
**Для игр от 70 000 сом:** ASUS ROG Strix, MSI Katana, Lenovo Legion

Приходите в TomStore — наши консультанты помогут подобрать оптимальную модель под ваш бюджет и задачи.`,
    contentEn: `## How to Choose a Laptop in 2025

Choosing a laptop is an important decision. In 2025, the market offers a huge variety of models for any budget. Let's break down the key specs.

### 1. Processor (CPU)

- **Intel Core Ultra 5/7/9** — great for work and study
- **AMD Ryzen 5/7/9 8000 series** — competitive performance, good battery life
- **Apple M3/M4** — best performance-per-watt for macOS

### 2. RAM

- **8 GB** — minimum for documents and browsing
- **16 GB** — comfortable for most tasks (recommended starting point)
- **32 GB** — video editing, development, virtual machines

### 3. Storage

SSD only — HDDs in laptops are obsolete. Minimum 256 GB, recommend 512 GB or more.

### 4. GPU

- Integrated (Intel Iris Xe, AMD Radeon) — office and study
- NVIDIA GeForce RTX 3050 — light gaming and graphics work
- NVIDIA GeForce RTX 4060/4070 — AAA gaming and professional work

### 5. Display

- Full HD (1920×1080) — standard for most tasks
- QHD (2560×1440) — better for design and content
- 144+ Hz — essential for gaming laptops

Visit TomStore — our consultants will help you find the right laptop for your budget.`,
  },
  {
    slug: "top-printery-dlya-ofisa-2025",
    titleRu: "Топ-5 принтеров для офиса в 2025 году",
    titleEn: "Top 5 Office Printers in 2025",
    titleKy: "2025-жылдагы офис үчүн топ-5 принтер",
    descriptionRu:
      "Лучшие принтеры для офиса в 2025 году по версии TomStore. Сравниваем лазерные и МФУ по скорости, стоимости печати и надёжности.",
    descriptionEn:
      "Best office printers in 2025 according to TomStore. Comparing laser printers and MFPs by speed, print cost, and reliability.",
    publishedAt: "2025-04-01",
    category: "printers",
    readingMinutes: 6,
    contentRu: `## Топ-5 принтеров для офиса в 2025 году

Правильный выбор принтера для офиса экономит время и деньги. Разбираем лучшие варианты 2025 года.

### 1. HP LaserJet Pro M404dn
Надёжный монохромный лазерный принтер. Скорость — 38 стр/мин, дуплекс, сетевое подключение. Идеален для печати счётов и договоров.

### 2. Canon imageRUNNER 2425i
МФУ корпоративного класса. Скорость — 25 стр/мин, сканер с автоподачей, облачная печать.

### 3. Brother DCP-L2550DW
Доступное лазерное МФУ. Беспроводная печать, дуплекс, отличная стоимость отпечатка.

### 4. Epson EcoTank L15160
Струйное МФУ А3+ формата. Резервуарная система, стоимость страницы — от 0.3 сом. Для печати схем, чертежей, цветных материалов.

### 5. Kyocera ECOSYS M2640idw
Надёжное МФУ с долгоживущим картриджем. Отличный выбор для высоконагруженных офисов.

Все модели доступны в TomStore с гарантией и оригинальными расходниками.`,
    contentEn: `## Top 5 Office Printers in 2025

Choosing the right office printer saves time and money. Here are the best options for 2025.

### 1. HP LaserJet Pro M404dn
Reliable monochrome laser printer. Speed — 38 ppm, duplex, network connectivity.

### 2. Canon imageRUNNER 2425i
Enterprise-class MFP. Speed — 25 ppm, ADF scanner, cloud printing.

### 3. Brother DCP-L2550DW
Affordable laser MFP. Wireless printing, duplex, excellent cost per page.

### 4. Epson EcoTank L15160
A3+ format inkjet MFP. Tank system, cost per page from 0.003 KGS.

### 5. Kyocera ECOSYS M2640idw
Reliable MFP with long-life toner. Great for high-volume offices.

All models available at TomStore with warranty and original consumables.`,
  },
  {
    slug: "igrovoy-noutbuk-do-80000-som",
    titleRu: "Лучшие игровые ноутбуки до 80 000 сом в 2025 году",
    titleEn: "Best Gaming Laptops Under 80,000 KGS in 2025",
    titleKy: "2025-жылы 80 000 сомго чейинки эң жакшы оюн ноутбуктары",
    descriptionRu:
      "Подборка игровых ноутбуков до 80 000 сом: ASUS ROG, MSI, Lenovo Legion. Сравниваем производительность, дисплей и охлаждение.",
    descriptionEn:
      "Gaming laptops under 80,000 KGS: ASUS ROG, MSI, Lenovo Legion. Comparing performance, display, and cooling.",
    publishedAt: "2025-04-20",
    category: "laptops",
    readingMinutes: 7,
    contentRu: `## Лучшие игровые ноутбуки до 80 000 сом

Игровые ноутбуки стали доступнее. Вот топовые варианты за 80 000 сом.

### ASUS ROG Strix G15
- Ryzen 7 / RTX 4060, 16 ГБ DDR5
- 15.6" 165 Гц FHD
- Мощное охлаждение ROG

### MSI Katana 15
- Intel Core i7 / RTX 4060
- 15.6" 144 Гц
- Хорошее соотношение цены и производительности

### Lenovo Legion 5
- AMD Ryzen 7 / RTX 4060
- 165 Гц IPS, подсветка клавиатуры
- Лучший тепловой пакет в классе

Все ноутбуки доступны в TomStore. Возможна рассрочка.`,
    contentEn: `## Best Gaming Laptops Under 80,000 KGS

Gaming laptops have become more accessible. Here are the top picks under 80,000 KGS.

### ASUS ROG Strix G15
- Ryzen 7 / RTX 4060, 16 GB DDR5, 165 Hz display

### MSI Katana 15
- Intel Core i7 / RTX 4060, 144 Hz, great price-performance

### Lenovo Legion 5
- AMD Ryzen 7 / RTX 4060, 165 Hz IPS, best thermal performance in class

All available at TomStore. Installment plans available.`,
  },
];

export default blogPosts;
