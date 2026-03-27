'use client';
import { useState } from "react";
import { COLORS } from "@/lib/site-constants";

const faqs = [
  { q: "依頼内容がまだ固まっていません。それでも相談できますか？", a: "はい。むしろ「何が論点なのかまだ混ざっている」という段階でのご相談が多いです。初回で一緒に整理します。" },
  { q: "月額と、スポットはどう選べばいいですか？", a: "まず現状を整理したい場合は、スポットの財務健康診断（5.5万円〜）が入りやすいです。毎月の判断まで整えたい場合は月額伴走がおすすめです。" },
  { q: "顧問税理士がいても大丈夫ですか？", a: "はい。税理士の先生は過去の数字と税務、私たちは未来の数字と意思決定。役割が重なりません。" },
  { q: "資料が散らかっていても大丈夫ですか？", a: "大丈夫です。すべて揃っている必要はありません。何を確認すべきか、初回でお伝えします。" },
  { q: "マーケティングや広告の数字も見てもらえますか？", a: "はい。広告費、LTV、限界利益、回収期間など、財務とつながる形で整理します。" },
  { q: "どのくらいの年商規模の相談が多いですか？", a: "年商数千万円〜10億円前後の中小企業オーナー様が中心です。" },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" style={{ background: COLORS.bg, padding: "72px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: COLORS.green, letterSpacing: 3, marginBottom: 10 }}>FAQ</div>
        <h2 style={{ fontSize: "clamp(20px, 3.5vw, 28px)", fontWeight: 900, color: COLORS.text }}>よくあるご質問</h2>
      </div>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {faqs.map((f, i) => (
          <div
            key={i}
            style={{ background: COLORS.white, borderRadius: 12, marginBottom: 8, overflow: "hidden", border: "1px solid " + (open === i ? COLORS.green : COLORS.border), transition: "border-color .2s" }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "16px 22px", fontSize: 14, fontWeight: 700, color: COLORS.text, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, fontFamily: "inherit" }}
            >
              <span style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ color: COLORS.green, fontWeight: 800, fontSize: 13 }}>Q</span>
                {f.q}
              </span>
              <span style={{ fontSize: 18, color: COLORS.faint, transition: "transform .25s", transform: open === i ? "rotate(45deg)" : "rotate(0)", flexShrink: 0 }}>+</span>
            </button>
            <div style={{ maxHeight: open === i ? 180 : 0, overflow: "hidden", transition: "max-height .3s ease" }}>
              <div style={{ padding: "0 22px 16px 44px", fontSize: 13, color: COLORS.sub, lineHeight: 1.8 }}>{f.a}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
