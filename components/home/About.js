import { COLORS } from "@/lib/site-constants";

const cards = [
  { icon: "🤝", t: "窓口がシンプル", d: "話す相手が毎回変わりません" },
  { icon: "👁", t: "多角的な視点", d: "財務・経営管理・マーケを横断" },
  { icon: "💬", t: "まず30分から", d: "違和感の整理から始められます" },
];

export default function About() {
  return (
    <section id="about" style={{ background: COLORS.bg, padding: "72px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: COLORS.green, letterSpacing: 3, marginBottom: 10 }}>ABOUT</div>
        <h2 style={{ fontSize: "clamp(20px, 3.5vw, 28px)", fontWeight: 900, color: COLORS.text }}>私たちについて</h2>
      </div>
      <div style={{ maxWidth: 660, margin: "0 auto" }}>
        <div style={{ background: COLORS.white, borderRadius: 18, padding: "32px 28px", marginBottom: 20, fontSize: 14, color: COLORS.text, lineHeight: 2, border: "1px solid " + COLORS.border }}>
          <p style={{ marginBottom: 16 }}>大企業向けの知見を、過剰なマージンなしで中小企業へ直接届けたい。その考えから始まりました。</p>
          <p style={{ marginBottom: 16 }}>公認会計士をはじめ、各分野のフリーランスや企業内スペシャリストがチームを組み、表に出すぎず内容で支援する体制をとっています。</p>
          <p style={{ margin: 0, color: COLORS.sub }}>財務と経営管理の両面から、経営者の判断が少しでも整理しやすくなるよう伴走します。</p>
        </div>
        <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
          {cards.map((x, i) => (
            <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: "18px 14px", textAlign: "center", border: "1px solid " + COLORS.border }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{x.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 800, color: COLORS.text, marginBottom: 4 }}>{x.t}</div>
              <div style={{ fontSize: 11, color: COLORS.sub, lineHeight: 1.5 }}>{x.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
