import { COLORS } from "@/lib/site-constants";

const badges = [
  { icon: "🆓", t: "初回30分 無料" },
  { icon: "🔒", t: "NDA対応" },
  { icon: "⚡", t: "2営業日以内に返信" },
  { icon: "🤝", t: "顧問税理士と併用OK" },
  { icon: "📂", t: "資料バラバラでもOK" },
  { icon: "💻", t: "オンライン完結" },
];

export default function TrustBadges() {
  return (
    <section style={{ background: COLORS.bg, padding: "28px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10 }}>
        {badges.map((b, i) => (
          <div key={i} style={{ background: COLORS.white, border: "1px solid " + COLORS.border, borderRadius: 50, padding: "8px 18px", fontSize: 12, fontWeight: 700, color: COLORS.text, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 16 }}>{b.icon}</span> {b.t}
          </div>
        ))}
      </div>
    </section>
  );
}
