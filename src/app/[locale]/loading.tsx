import type { CSSProperties } from "react";

const pulseCSS = `@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`;

const skeleton = (
  width: CSSProperties["width"] = "100%",
  height: CSSProperties["height"] = 16,
  borderRadius: CSSProperties["borderRadius"] = 8,
): CSSProperties => ({
  display: "inline-block",
  width,
  height,
  borderRadius,
  background: "#e8ecf0",
  animation: "pulse 1.6s ease-in-out infinite",
});

function CardSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={skeleton("100%", 180, 12)} />
      <div style={skeleton("75%", 13)} />
      <div style={skeleton("45%", 13)} />
    </div>
  );
}

export default function HomeLoading() {
  return (
    <>
      <style>{pulseCSS}</style>

      {/* Hero */}
      <div style={{ background: "#f6f9fc", padding: "2rem 0 3rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem", minHeight: 280 }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={skeleton("70%", 36, 8)} />
              <div style={skeleton("55%", 20)} />
              <div style={skeleton("55%", 16)} />
              <div style={{ marginTop: 8 }}>
                <div style={skeleton(140, 44, 10)} />
              </div>
            </div>
            <div style={skeleton("38%", 260, 12)} />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ maxWidth: 1200, margin: "2rem auto", padding: "0 1rem" }}>
        <div style={skeleton(160, 22, 6)} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 12, marginTop: 20 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={skeleton(64, 64, "50%")} />
              <div style={skeleton("80%", 12)} />
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div style={{ maxWidth: 1200, margin: "2rem auto", padding: "0 1rem" }}>
        <div style={skeleton(200, 22, 6)} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16, marginTop: 20 }}>
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      </div>
    </>
  );
}
