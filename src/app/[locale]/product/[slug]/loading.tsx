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

export default function ProductLoading() {
  return (
    <>
      <style>{pulseCSS}</style>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {/* Image column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={skeleton("100%", 400, 12)} />
            <div style={{ display: "flex", gap: 8 }}>
              {[0, 1, 2, 3].map((i) => <div key={i} style={skeleton(72, 72, 8)} />)}
            </div>
          </div>

          {/* Info column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={skeleton("60%", 14)} />
            <div style={skeleton("85%", 28, 6)} />
            <div style={skeleton("40%", 24)} />
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              {[0, 1, 2].map((i) => <div key={i} style={skeleton(64, 36, 8)} />)}
            </div>
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={skeleton("100%", 12)} />
              <div style={skeleton("90%", 12)} />
              <div style={skeleton("70%", 12)} />
            </div>
            <div style={{ marginTop: 16 }}>
              <div style={skeleton(180, 44, 10)} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ marginTop: 64 }}>
          <div style={{ display: "flex", gap: 24, borderBottom: "2px solid #e8ecf0", paddingBottom: 8 }}>
            <div style={skeleton(80, 16)} />
            <div style={skeleton(100, 16)} />
          </div>
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
            {[1, 0.9, 0.8, 0.6].map((w, i) => (
              <div key={i} style={skeleton(`${w * 100}%`, 13)} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
