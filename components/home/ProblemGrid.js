'use client';
import { COLORS, scrollTo } from "@/lib/site-constants";

const problems = [
  { icon: "💸", title: "利益は出ているのに\n現金が増えない", color: "#fff3ef" },
  { icon: "📊", title: "毎月の数字を\nどう見ればいいか分からない", color: "#f0f7ff" },
  { icon: "📢", title: "広告費が\n効いているか不安", color: "#f5f0ff" },
  { icon: "🏦", title: "銀行への説明を\n整えたい", color: "#fff8e8" },
  { icon: "🎯", title: "大きな投資の前に\n確認したい", color: "#e8f5f2" },
  { icon: "👔", title: "CFOを雇うほどじゃないが\n壁打ち相手がほしい", color: "#fef2f2" },
];

export default function ProblemGrid() {
  return (
    <section id="problems" style={{ background: COLORS.white, padding: "72px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: COLORS.green, letterSpacing: 3, marginBottom: 10 }}>COMMON PROBLEMS</div>
        <h2 style={{ fontSize: "clamp(20px, 3.5vw, 28px)", fontWeight: 900, color: COLORS.text, marginBottom: 12 }}>こんなモヤモヤ、ありませんか？</h2>
        <p style={{ fontSize: 14, color: COLORS.sub }}>ひとつでもピンときたら、まずは30分の無料相談へ。</p>
      </div>
      <div style={{ maxWidth: 860, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 14 }}>
        {problems.map((p, i) => (
          <div
            key={i}
            style={{ background: COLORS.white, border: "1px solid " + COLORS.border, borderRadius: 16, padding: "26px 22px", cursor: "pointer", transition: "all .25s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.green; e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,.06)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
            onClick={() => scrollTo("services")}
          >
            <div style={{ width: 48, height: 48, borderRadius: 12, background: p.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 14 }}>
              {p.icon}
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: COLORS.text, lineHeight: 1.6, whiteSpace: "pre-line" }}>{p.title}</div>
            <div style={{ marginTop: 10, fontSize: 12, fontWeight: 700, color: COLORS.green }}>対応するサービスを見る →</div>
          </div>
        ))}
      </div>
    </section>
  );
}
