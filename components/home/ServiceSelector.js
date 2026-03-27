'use client';
import { COLORS, scrollTo } from "@/lib/site-constants";

const routes = [
  { emoji: "🔍", label: "まず現状を整理したい", arrow: "財務健康診断", c: COLORS.green },
  { emoji: "📈", label: "毎月の数字で判断したい", arrow: "CFO型 伴走支援", c: "#2a6cb8" },
  { emoji: "🎯", label: "大きな投資前に確認したい", arrow: "投資判断レビュー", c: "#7c5cbf" },
  { emoji: "📄", label: "銀行に伝わる計画を作りたい", arrow: "事業計画策定", c: COLORS.gold },
];

export default function ServiceSelector() {
  return (
    <section style={{ background: COLORS.bg, padding: "60px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: COLORS.green, letterSpacing: 3, marginBottom: 10 }}>GUIDE</div>
        <h2 style={{ fontSize: "clamp(20px, 3.5vw, 28px)", fontWeight: 900, color: COLORS.text, marginBottom: 12 }}>どれを選べばいい？</h2>
        <p style={{ fontSize: 14, color: COLORS.sub }}>いまの状態に近いものをタップしてください。</p>
      </div>
      <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10 }}>
        {routes.map((r, i) => (
          <div
            key={i}
            onClick={() => scrollTo("services")}
            style={{ background: COLORS.white, borderRadius: 14, padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", border: "1px solid " + COLORS.border, transition: "all .25s", gap: 12 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = r.c; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.05)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 24 }}>{r.emoji}</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>{r.label}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: r.c }}>{r.arrow}</span>
              <span style={{ color: r.c }}>→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
