'use client';
import { COLORS } from "@/lib/site-constants";

const reasons = [
  { icon: "💬", title: "数字を難しく話しすぎない", desc: "専門用語を並べるのではなく、社長が判断に使える言葉で整理します。" },
  { icon: "🤝", title: "顧問税理士と競合しない", desc: "過去の数字は税理士、未来の数字は私たち。役割が重なりません。" },
  { icon: "📊", title: "現場の数字まで切り離さず見る", desc: "広告費や人件費も、売上と利益のつながりの中で整理します。財務だけで閉じません。" },
  { icon: "🔍", title: "まず整理から始められる", desc: "いきなり高額な契約ではなく、5.5万円のスポット診断から入れます。" },
  { icon: "🔒", title: "NDA対応・オンライン完結", desc: "秘密保持契約にも対応。すべてオンラインで完結できます。" },
];

export default function ReasonList() {
  return (
    <section id="reasons" style={{ background: COLORS.white, padding: "72px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: COLORS.green, letterSpacing: 3, marginBottom: 10 }}>WHY US</div>
        <h2 style={{ fontSize: "clamp(20px, 3.5vw, 28px)", fontWeight: 900, color: COLORS.text }}>選ばれている理由</h2>
      </div>
      <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
        {reasons.map((r, i) => (
          <div
            key={i}
            style={{ display: "flex", gap: 18, alignItems: "flex-start", background: COLORS.white, border: "1px solid " + COLORS.border, borderRadius: 14, padding: "22px 24px", transition: "border-color .2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.green}
            onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}
          >
            <div style={{ width: 46, height: 46, borderRadius: 12, background: COLORS.greenPale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{r.icon}</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: COLORS.text, marginBottom: 4 }}>{r.title}</div>
              <div style={{ fontSize: 13, color: COLORS.sub, lineHeight: 1.7 }}>{r.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
