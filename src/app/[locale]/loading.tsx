import type { CSSProperties } from "react";

const skeletonCSS = `
  @keyframes sk-pulse { 0%,100% { opacity:1 } 50% { opacity:.45 } }

  .sk {
    display: inline-block;
    background: #e0e6ef;
    animation: sk-pulse 1.6s ease-in-out infinite;
  }
  .sk-hero-bg {
    background: #f6f9fc;
    padding: 2rem 0 3rem;
  }

  @media (prefers-color-scheme: dark) {
    .sk          { background: #192036; }
    .sk-hero-bg  { background: #080b12; }
  }
  [data-theme="dark"] .sk         { background: #192036; }
  [data-theme="dark"] .sk-hero-bg { background: #080b12; }
  [data-theme="light"] .sk        { background: #e0e6ef; }
  [data-theme="light"] .sk-hero-bg{ background: #f6f9fc; }
`;

const s = (
  width: CSSProperties["width"] = "100%",
  height: CSSProperties["height"] = 16,
  borderRadius: CSSProperties["borderRadius"] = 8,
): CSSProperties => ({ width, height, borderRadius });

function Sk({ w = "100%", h = 16, r = 8 }: { w?: CSSProperties["width"]; h?: number; r?: CSSProperties["borderRadius"] }) {
  return <div className="sk" style={s(w, h, r)} />;
}

function CardSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Sk h={180} r={12} />
      <Sk w="75%" h={13} />
      <Sk w="45%" h={13} />
    </div>
  );
}

export default function HomeLoading() {
  return (
    <>
      <style>{skeletonCSS}</style>

      {/* Hero */}
      <div className="sk-hero-bg">
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem", minHeight: 280 }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
              <Sk w="70%" h={36} r={8} />
              <Sk w="55%" h={20} />
              <Sk w="55%" h={16} />
              <div style={{ marginTop: 8 }}><Sk w={140} h={44} r={10} /></div>
            </div>
            <Sk w="38%" h={260} r={12} />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ maxWidth: 1200, margin: "2rem auto", padding: "0 1rem" }}>
        <Sk w={160} h={22} r={6} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 12, marginTop: 20 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <Sk w={64} h={64} r="50%" />
              <Sk w="80%" h={12} />
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div style={{ maxWidth: 1200, margin: "2rem auto", padding: "0 1rem" }}>
        <Sk w={200} h={22} r={6} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16, marginTop: 20 }}>
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      </div>
    </>
  );
}
