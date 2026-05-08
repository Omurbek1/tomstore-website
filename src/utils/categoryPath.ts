// Maps Russian category names (as returned by the API) to catalog URL paths.
const CATEGORY_PATHS: Record<string, string> = {
  "ноутбуки": "/catalog/laptops",
  "принтеры": "/catalog/printers",
  "принтеры и мфу": "/catalog/printers",
  "мфу": "/catalog/printers",
  "компьютеры": "/catalog/computers",
  "комплектующие": "/catalog/components",
  "аксессуары": "/catalog/accessories",
  "мониторы": "/catalog/monitors",
  "сеть": "/catalog/network",
  "распродажа": "/catalog/sale",
  "рассрочка": "/catalog/installment",
  "комплекты": "/catalog/combo",
};

export function categoryNameToCatalogPath(name: string): string {
  return (
    CATEGORY_PATHS[name.toLowerCase().trim()] ??
    `/catalog?category=${encodeURIComponent(name)}`
  );
}
