'use client';
import { COLORS } from "@/lib/site-constants";

const services = [
  {
    badge: "まずはこれ", bc: COLORS.green, icon: "🔍",
    name: "財務健康診断レポート",
    desc: "決算書から会社の稼ぐ力・安全性・お金の回りを読み解き、いまの論点を整理してお渡しします。",
    price: "55,000", unit: "円〜（税込）", note: "スポット",
    points: ["利益と現金のズレが見える", "返済余力が分かる", "改善の優先順位が整理される"],
  },
  {
    badge: "人気", bc: COLORS.orange, icon: "📈",
    name: "CFO型 伴走支援",
    desc: "毎月の数字を一緒に確認しながら、予実管理・着地見込み・投資判断を感覚だけにしない形へ。",
    price: "165,000", unit: "円〜（税込）/ 月", note: "原則6ヶ月〜",
    points: ["月次ミーティング", "予実整理・着地見込み", "投資判断の論点整理"],
  },
  {
    badge: null, bc: null, icon: "🎯",
    name: "投資判断レビュー",
    desc: "M&Aや大型投資の前に、見落としがちな論点を冷静に確認。決断の前の整理役です。",
    price: "220,000", unit: "円〜（税込）", note: "範囲によりお見積もり",
    points: ["論点の洗い出し", "リスクの確認", "意思決定前の材料づくり"],
  },
  {
    badge: null, bc: null, icon: "📄",
    name: "事業計画策定・資金調達",
    desc: "社長の頭の中にある構想を、銀行や社内に伝わる計画へ翻訳します。",
    price: "110,000", unit: "円〜（税込）着手金", note: "+ 成功報酬",
    points: ["事業計画の骨子整理", "資金繰りの見通し設計", "金融機関への説明整理"],
  },
];

export default function PricingTable() {
  return (
    <section id="services" style={{ background: COLORS.white, padding: "72px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: COLORS.green, letterSpacing: 3, marginBottom: 10 }}>SERVICES &amp; PRICING</div>
        <h2 style={{ fontSize: "clamp(20px, 3.5vw, 28px)", fontWeight: 900, color: COLORS.text, marginBottom: 12 }}>サービスと料金</h2>
        <p style={{ fontSize: 14, color: COLORS.sub }}>スポットでも月額でも。いまの状態に合わせて選べます。</p>
      </div>
      <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        {services.map((s, i) => (
          <div
            key={i}
            style={{ background: COLORS.white, borderRadius: 18, overflow: "hidden", border: s.badge === "人気" ? "2px solid " + COLORS.orange : "1px solid " + COLORS.border, display: "flex", flexDirection: "column", position: "relative", transition: "box-shadow .25s" }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,.07)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
          >
            {s.badge && (
              <div style={{ position: "absolute", top: 14, right: 14, background: s.bc, color: "#fff", padding: "4px 12px", borderRadius: 50, fontSize: 10, fontWeight: 800 }}>
                {s.badge}
              </div>
            )}
            <div style={{ padding: "26px 22px 16px" }}>
              <div style={{ fontSize: 30, marginBottom: 10 }}>{s.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: COLORS.text, marginBottom: 10, lineHeight: 1.4 }}>{s.name}</h3>
              <p style={{ fontSize: 13, color: COLORS.sub, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
            <div style={{ background: COLORS.greenPale, padding: "18px 22px", marginTop: "auto" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                <span style={{ fontSize: 26, fontWeight: 900, color: COLORS.green }}>{s.price}</span>
                <span style={{ fontSize: 12, color: COLORS.sub, fontWeight: 600 }}>{s.unit}</span>
              </div>
              <div style={{ fontSize: 11, color: COLORS.faint, marginBottom: 14 }}>{s.note}</div>
              {s.points.map((p, j) => (
                <div key={j} style={{ fontSize: 12, color: COLORS.text, display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}>
                  <span style={{ color: COLORS.green, fontWeight: 800, fontSize: 11 }}>✓</span> {p}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 28, fontSize: 13, color: COLORS.faint }}>
        ※ どれを選べばいいか分からない場合も、無料相談で一緒に整理できます
      </div>
    </section>
  );
}
