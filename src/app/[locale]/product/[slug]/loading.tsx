const pulse = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
`;

const block = (w = "100%", h = "16px", r = "8px", extra = "") =>
  `display:inline-block;width:${w};height:${h};border-radius:${r};background:#e8ecf0;animation:pulse 1.6s ease-in-out infinite;${extra}`;

export default function ProductLoading() {
  return (
    <>
      <style>{pulse}</style>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1rem" }}>
        {/* Product intro grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}>
          {/* Image gallery */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={block("100%", "400px", "12px") as any} />
            <div style={{ display: "flex", gap: 8 }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={block("72px", "72px", "8px") as any} />
              ))}
            </div>
          </div>

          {/* Product info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={block("60%", "14px") as any} />
            <div style={block("85%", "28px", "6px") as any} />
            <div style={block("40%", "24px") as any} />
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={block("64px", "36px", "8px") as any} />
              ))}
            </div>
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={block("100%", "12px") as any} />
              <div style={block("90%", "12px") as any} />
              <div style={block("70%", "12px") as any} />
            </div>
            <div style={{ marginTop: 16 }}>
              <div style={block("180px", "44px", "10px") as any} />
            </div>
          </div>
        </div>

        {/* Tabs skeleton */}
        <div style={{ marginTop: 64 }}>
          <div style={{ display: "flex", gap: 24, borderBottom: "2px solid #e8ecf0", paddingBottom: 8 }}>
            <div style={block("80px", "16px") as any} />
            <div style={block("100px", "16px") as any} />
          </div>
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
            {[1, 0.9, 0.8, 0.6].map((w, i) => (
              <div key={i} style={block(`${w * 100}%`, "13px") as any} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
