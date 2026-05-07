const pulse = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
`;

const block = (w = "100%", h = "16px", r = "8px", extra = "") =>
  `display:inline-block;width:${w};height:${h};border-radius:${r};background:#e8ecf0;animation:pulse 1.6s ease-in-out infinite;${extra}`;

function ProductCardSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={block("100%", "180px", "12px") as any} />
      <div style={block("75%", "13px") as any} />
      <div style={block("45%", "13px") as any} />
    </div>
  );
}

export default function HomeLoading() {
  return (
    <>
      <style>{pulse}</style>

      {/* Hero skeleton */}
      <div style={{ background: "#f6f9fc", padding: "2rem 0 3rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "2rem",
              minHeight: 280,
            }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={block("70%", "36px", "8px") as any} />
              <div style={block("55%", "20px") as any} />
              <div style={block("55%", "16px") as any} />
              <div style={{ marginTop: 8 }}>
                <div style={block("140px", "44px", "10px") as any} />
              </div>
            </div>
            <div style={block("min(38%, 320px)", "260px", "12px") as any} />
          </div>
        </div>
      </div>

      {/* Categories skeleton */}
      <div style={{ maxWidth: 1200, margin: "2rem auto", padding: "0 1rem" }}>
        <div style={block("160px", "22px", "6px") as any} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            gap: 12,
            marginTop: 20,
          }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={block("64px", "64px", "50%") as any} />
              <div style={block("80%", "12px") as any} />
            </div>
          ))}
        </div>
      </div>

      {/* Products grid skeleton */}
      <div style={{ maxWidth: 1200, margin: "2rem auto", padding: "0 1rem" }}>
        <div style={block("200px", "22px", "6px") as any} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 16,
            marginTop: 20,
          }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </>
  );
}
