"use client";

import { useState } from "react";
import Shop from "@models/shop.model";
import Product, { ProductVariant } from "@models/product.model";
import { useBranch } from "@context/BranchContext";
import { useBranchStorefrontProduct } from "@hook/useStorefrontCatalog";
import BranchPricesList from "@component/branch/BranchPricesList";
import ProductIntro from "./ProductIntro";
import ProductView from "./ProductView";

type Props = {
  product: Product;
  shops: Shop[];
  relatedProducts: Product[];
  frequentlyBought: Product[];
};

export default function ProductPageClient({
  product: serverProduct,
  shops,
  relatedProducts: serverRelated,
  frequentlyBought: serverFrequentlyBought,
}: Props) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const { branchParam, branches, defaultBranch, activeBranch, locked } = useBranch();

  // Сервер отдал цены магазина по умолчанию (страница статическая, ISR).
  // Выбран другой магазин → догружаем товар с ?branch= и подменяем цены.
  const branchQuery = useBranchStorefrontProduct(serverProduct.slug);
  const branchPayload =
    branchParam && branchQuery.data && !branchQuery.isPlaceholderData ? branchQuery.data : null;

  const product = branchPayload?.product ?? serverProduct;
  const relatedProducts = branchPayload?.relatedProducts ?? serverRelated;
  const frequentlyBought = branchPayload?.recommendedProducts.length
    ? branchPayload.recommendedProducts
    : serverFrequentlyBought;
  // Домен одного магазина — в «Ценах по магазинам» только он (список скрыт).
  const allBranchPrices = serverProduct.branchPrices ?? [];
  const branchPrices =
    locked && activeBranch
      ? allBranchPrices.filter((row) => row.branchId === activeBranch.id)
      : allBranchPrices;

  // Чьи цены сейчас на экране: выбранного магазина (когда пришли) или по умолчанию.
  const shownBranchId = branchPayload ? branchParam : defaultBranch?.id ?? serverProduct.priceBranchId;
  const priceBranchName =
    branches.find((branch) => branch.id === shownBranchId)?.name ??
    branchPrices.find((row) => row.branchId === shownBranchId)?.branchName;
  // Место под «Цена для: …» резервируем ещё на сервере (если магазинов >1),
  // чтобы подпись не сдвигала вёрстку после загрузки списка магазинов.
  // Домен одного магазина — подпись остаётся («Цена для: <магазин>»).
  const showPriceBranch = locked || branchPrices.length > 1 || branches.length > 1;

  return (
    <>
      <ProductIntro
        product={product}
        id={product.id}
        price={product.price}
        title={product.title}
        images={product.images || []}
        brand={product.brand}
        oldPrice={product.oldPrice}
        availabilityLabel={product.availabilityLabel}
        labels={product.labels}
        slug={product.slug}
        videoUrl={product.videoUrl}
        onVariantChange={setSelectedVariant}
        priceBranchId={shownBranchId ?? null}
        priceBranchName={showPriceBranch ? priceBranchName ?? "" : undefined}
        afterPrice={branchPrices.length > 1 ? <BranchPricesList branchPrices={branchPrices} variantId={selectedVariant?.id} /> : null}
      />
      <ProductView
        product={product}
        shops={shops}
        relatedProducts={relatedProducts}
        frequentlyBought={frequentlyBought}
        selectedVariant={selectedVariant}
      />
    </>
  );
}
