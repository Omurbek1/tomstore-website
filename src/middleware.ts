import createMiddleware from "next-intl/middleware";
import { routing } from 'i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Более надежный матчер для Next.js 15
  matcher: [
    // Устанавливает локаль для корневого пути
    "/",
    // Устанавливает локаль для всех путей, кроме исключений
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
