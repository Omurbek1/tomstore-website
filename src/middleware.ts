import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing"; // Добавили "./"

export default createMiddleware(routing);

export const config = {
  matcher: [
    // 1. Обработка корня
    "/",
    // 2. Обработка всех путей с префиксами локалей (en/ru)
    "/(ru|en)/:path*",
    // 3. Исключение служебных файлов
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
