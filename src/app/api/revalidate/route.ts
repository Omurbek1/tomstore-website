import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export const dynamic = "force-dynamic";

// On-demand ревалидация витрины. Вызывается из CRM (бэкенд) при смене
// публикации/изменении товара — сбрасывает кэш всех данных витрины сразу,
// не дожидаясь таймеров ISR (даже на SEO-страницах с revalidate=3600).
export async function POST(request: Request) {
  const secret =
    request.headers.get("x-revalidate-secret") ||
    new URL(request.url).searchParams.get("secret");

  const expected = process.env.REVALIDATE_SECRET;
  // Если секрет задан — проверяем. Если не задан — работаем без него
  // (ревалидация безопасна: только сбрасывает кэш витрины).
  if (expected && secret !== expected) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  revalidateTag("storefront");
  return NextResponse.json({ ok: true, revalidated: "storefront" });
}
