import type { CSSProperties } from "react";

const skeletonCSS = `
  @keyframes sk-pulse { 0%,100% { opacity:1 } 50% { opacity:.45 } }

  .sk {
    display: inline-block;
    background: #e0e6ef;
    animation: sk-pulse 1.6s ease-in-out infinite;
  }
  .sk-divider {
    border-bottom: 2px solid #e0e6ef;
  }

  @media (prefers-color-scheme: dark) {
    .sk         { background: #192036; }
    .sk-divider { border-bottom-color: #192036; }
  }
  [data-theme="dark"] .sk          { background: #192036; }
  [data-theme="dark"] .sk-divider  { border-bottom-color: #192036; }
  [data-theme="light"] .sk         { background: #e0e6ef; }
  [data-theme="light"] .sk-divider { border-bottom-color: #e0e6ef; }
`;

function Sk({ w = "100%", h = 16, r = 8 }: {
  w?: CSSProperties["width"];
  h?: number;
  r?: CSSProperties["borderRadius"];
}) {
  return <div className="sk" style={{ width: w, height: h, borderRadius: r }} />;
}

export default function ProductLoading() {
  return (
    <>
      <style>{skeletonCSS}</style>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {/* Image column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Sk h={400} r={12} />
            <div style={{ display: "flex", gap: 8 }}>
              {[0, 1, 2, 3].map((i) => <Sk key={i} w={72} h={72} r={8} />)}
            </div>
          </div>

          {/* Info column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Sk w="60%" h={14} />
            <Sk w="85%" h={28} r={6} />
            <Sk w="40%" h={24} />
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              {[0, 1, 2].map((i) => <Sk key={i} w={64} h={36} r={8} />)}
            </div>
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              <Sk h={12} />
              <Sk w="90%" h={12} />
              <Sk w="70%" h={12} />
            </div>
            <div style={{ marginTop: 16 }}>
              <Sk w={180} h={44} r={10} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ marginTop: 64 }}>
          <div className="sk-divider" style={{ display: "flex", gap: 24, paddingBottom: 8 }}>
            <Sk w={80} h={16} />
            <Sk w={100} h={16} />
          </div>
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
            {[1, 0.9, 0.8, 0.6].map((w, i) => (
              <Sk key={i} w={`${w * 100}%`} h={13} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
