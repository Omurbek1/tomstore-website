import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { createHmac, timingSafeEqual } from "node:crypto";

export const dynamic = "force-dynamic";

const env = (name: string) => String(process.env[name] || "").trim();

const safeEqual = (a: string, b: string) => {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
};

// On-demand ревалидация витрины. Вызывается из CRM (бэкенд) при смене
// публикации/изменении товара — сбрасывает кэш всех данных витрины сразу,
// не дожидаясь таймеров ISR (даже на SEO-страницах с revalidate=3600).
//
// Доступ — любой из:
//  • x-revalidate-secret (или ?secret=) = REVALIDATE_SECRET — сайт TomStore;
//  • x-revalidate-signature — секрет сайта компании из CRM («Домены сайта»,
//    STOREFRONT_REVALIDATE_SECRET / REVALIDATE_SECRET_COMPANY): сам секрет
//    или HMAC-SHA256(секрет, тело запроса) в hex.
// Если ни один секрет не задан — открыто (только сбрасывает кэш витрины);
// если задан хоть один — без верной подписи 401.
export async function POST(request: Request) {
  const sharedSecret = env("REVALIDATE_SECRET");
  const companySecret =
    env("STOREFRONT_REVALIDATE_SECRET") || env("REVALIDATE_SECRET_COMPANY");

  if (sharedSecret || companySecret) {
    const secret =
      request.headers.get("x-revalidate-secret") ||
      new URL(request.url).searchParams.get("secret") ||
      "";
    const signature = String(request.headers.get("x-revalidate-signature") || "").trim();

    let authorized = Boolean(sharedSecret && secret && safeEqual(secret, sharedSecret));
    if (!authorized && companySecret && signature) {
      const body = await request.text().catch(() => "");
      const hmac = createHmac("sha256", companySecret).update(body).digest("hex");
      const hex = signature.toLowerCase().replace(/^sha256=/, "");
      authorized = safeEqual(hex, hmac) || safeEqual(signature, companySecret);
    }
    if (!authorized) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
  }

  revalidateTag("storefront");
  return NextResponse.json({ ok: true, revalidated: "storefront" });
}
