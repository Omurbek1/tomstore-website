"use client";

import { useEffect, useRef, useState } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { ProductListCard } from "@component/product-cards";
import Product from "@models/product.model";

interface Props {
  products: Product[];
}

const ITEM_GAP = "1.25rem";
const ESTIMATED_ITEM_HEIGHT = 200;

export default function ProductListView({ products }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollMargin, setScrollMargin] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const top = containerRef.current.getBoundingClientRect().top + window.scrollY;
      setScrollMargin(top);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(document.body);
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const virtualizer = useWindowVirtualizer({
    count: products.length,
    estimateSize: () => ESTIMATED_ITEM_HEIGHT,
    overscan: 3,
    scrollMargin,
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div ref={containerRef}>
      <div style={{ height: virtualizer.getTotalSize(), position: "relative", width: "100%" }}>
        {virtualItems.map((virtualItem) => {
          const product = products[virtualItem.index];
          return (
            <div
              key={virtualItem.key}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualItem.start - scrollMargin}px)`,
              }}
            >
              <div style={{ paddingBottom: ITEM_GAP }}>
                <ProductListCard
                  id={product.id}
                  slug={product.slug}
                  price={product.price}
                  title={product.title}
                  off={product.discount}
                  rating={product.rating}
                  images={product.images ?? []}
                  imgUrl={product.thumbnail}
                  categories={product.categories}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
