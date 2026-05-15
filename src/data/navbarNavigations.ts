const navbarNavigations = [
  {
    title: "Покупателям",
    child: [
      { title: "Доставка", url: "/dostavka" },
      { title: "Оплата и рассрочка", url: "/catalog/installment" },
      { title: "Оформить заказ", url: "/checkout" },
      { title: "Мои заказы", url: "/orders" },
      { title: "Избранное", url: "/wish-list" },
    ],
  },
  {
    title: "Каталог",
    child: [
      { title: "Ноутбуки", url: "/catalog/laptops" },
      { title: "Компьютеры", url: "/catalog/computers" },
      { title: "Принтеры", url: "/catalog/printers" },
      { title: "Комплектующие", url: "/catalog/components" },
      { title: "Аксессуары", url: "/catalog/accessories" },
      { title: "Сеть и связь", url: "/catalog/network" },
    ],
  },
  {
    title: "Акции",
    child: [
      { title: "Флэш-распродажа", url: "/flash-deals" },
      { title: "Скидки", url: "/deals" },
      { title: "Комплекты", url: "/catalog/combo" },
    ],
  },
  {
    title: "О компании",
    child: [
      { title: "О нас", url: "/about" },
      { title: "Блог", url: "/blog" },
      { title: "Вакансии", url: "/vacancies" },
      { title: "Контакты", url: "/contacts" },
    ],
  },
];

export default navbarNavigations;
