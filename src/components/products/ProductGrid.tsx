"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { ProductGridCard } from "@component/product-cards";
import Product from "@models/product.model";
import useWindowSize from "@hook/useWindowSize";

interface Props {
  products: Product[];
}

const ROW_GAP = "1rem";
const ESTIMATED_ROW_HEIGHT = 400;

export default function ProductGridView({ products }: Props) {
  const width = useWindowSize();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollMargin, setScrollMargin] = useState(0);

  const measure = () => {
    if (!containerRef.current) return;
    const top = containerRef.current.getBoundingClientRect().top + window.scrollY;
    setScrollMargin(top);
  };

  // Re-measure on mount, resize, and any body layout change
  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Re-measure after each filter (products prop change) once the DOM settles
  useLayoutEffect(() => {
    measure();
  }, [products]);

  const columns = !width ? 3 : width < 1025 ? 2 : 3;

  const rows = useMemo<Product[][]>(() => {
    const result: Product[][] = [];
    for (let i = 0; i < products.length; i += columns) {
      result.push(products.slice(i, i + columns));
    }
    return result;
  }, [products, columns]);

  const virtualizer = useWindowVirtualizer({
    count: rows.length,
    estimateSize: () => ESTIMATED_ROW_HEIGHT,
    overscan: 5,
    scrollMargin,
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div ref={containerRef}>
      <div style={{ height: virtualizer.getTotalSize(), position: "relative", width: "100%" }}>
        {virtualItems.map((virtualRow) => (
          <div
            key={virtualRow.key}
            data-index={virtualRow.index}
            ref={virtualizer.measureElement}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualRow.start - scrollMargin}px)`,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: ROW_GAP,
                paddingBottom: ROW_GAP,
              }}
            >
              {rows[virtualRow.index].map((product) => (
                <ProductGridCard
                  key={product.id}
                  id={product.id}
                  slug={product.slug}
                  price={product.price}
                  title={product.title}
                  off={product.discount}
                  images={product.images ?? []}
                  imgUrl={product.thumbnail}
                  rating={product.rating || 4}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
