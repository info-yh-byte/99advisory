'use client';
import { COLORS } from "@/lib/site-constants";

const samples = [
  { num: "01", name: "財務健康診断レポート", purpose: "利益と現金のズレを整理したい", pages: "8-12P", who: "年商3億〜10億前後 / サービス業・製造業など", color: COLORS.green },
  { num: "02", name: "月次 経営管理レポート", purpose: "毎月の数字で判断したい", pages: "10-14P", who: "年商1億〜15億前後 / BtoB・小売・店舗など", color: "#2a6cb8" },
  { num: "03", name: "広告 採算整理シート", purpose: "広告費が利益につながっているか見たい", pages: "6-10P", who: "広告運用あり / D2C・教育・士業など", color: "#7c5cbf" },
  { num: "04", name: "事業計画サマリー", purpose: "銀行説明・資金調達に備えたい", pages: "8-12P", who: "借入・投資フェーズの会社", color: COLORS.gold },
];

export default function SampleCards() {
  return (
    <section id="samples" style={{ background: COLORS.bg, padding: "72px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: COLORS.green, letterSpacing: 3, marginBottom: 10 }}>SAMPLES</div>
        <h2 style={{ fontSize: "clamp(20px, 3.5vw, 28px)", fontWeight: 900, color: COLORS.text, marginBottom: 12 }}>実際にお渡しする資料のサンプル</h2>
        <p style={{ fontSize: 14, color: COLORS.sub }}>課題ごとに見比べて、自分に近いものを探せます。</p>
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14 }}>
        {samples.map((s, i) => (
          <div
            key={i}
            style={{ background: COLORS.white, borderRadius: 16, overflow: "hidden", border: "1px solid " + COLORS.border, transition: "all .25s", cursor: "pointer" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ height: 4, background: s.color }} />
            <div style={{ padding: "22px 20px" }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: s.color, letterSpacing: 2, marginBottom: 8 }}>{"SAMPLE " + s.num}</div>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: COLORS.text, marginBottom: 10 }}>{s.name}</h3>
              <div style={{ display: "inline-block", background: COLORS.orangeLight, padding: "3px 10px", borderRadius: 50, fontSize: 11, fontWeight: 700, color: COLORS.orange, marginBottom: 10 }}>{s.purpose}</div>
              <div style={{ fontSize: 11, color: COLORS.faint, marginBottom: 4 }}>{"PDF / " + s.pages}</div>
              <div style={{ fontSize: 11, color: COLORS.faint, marginBottom: 14 }}>{"例：" + s.who}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: s.color }}>ご面談時にお見せできます →</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
