import Link from "next/link";
import { getAllArticles } from "@/lib/content";

const COLORS = {
  green: "#1a8a7a",
  greenLight: "#e6f5f2",
  text: "#222",
  sub: "#666",
  faint: "#999",
  bg: "#fafafa",
  white: "#fff",
  border: "#eaeaea",
};

const categoryLabel = {
  cashflow: "資金繰り",
  bank: "銀行・融資",
  management: "経営管理",
  marketing: "広告・マーケ",
};

export default function LatestArticles() {
  const articles = getAllArticles().slice(0, 3);
  if (articles.length === 0) return null;

  return (
    <section style={{ background: COLORS.white, padding: "72px 20px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: COLORS.green, letterSpacing: 3, marginBottom: 8 }}>ARTICLES</div>
            <h2 style={{ fontSize: "clamp(20px, 3.5vw, 26px)", fontWeight: 900, color: COLORS.text }}>新着記事</h2>
          </div>
          <Link href="/articles" style={{ fontSize: 13, fontWeight: 700, color: COLORS.green, textDecoration: "none" }}>
            すべての記事を見る →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {articles.map((article) => (
            <Link key={article.slug} href={`/articles/${article.slug}`} style={{ textDecoration: "none" }}>
              <div style={{ background: COLORS.bg, borderRadius: 14, padding: "24px 22px", border: "1px solid " + COLORS.border, height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  {article.category && (
                    <span style={{ background: COLORS.greenLight, color: COLORS.green, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 50 }}>
                      {categoryLabel[article.category] || article.category}
                    </span>
                  )}
                  <span style={{ fontSize: 11, color: COLORS.faint }}>{article.date}</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: COLORS.text, lineHeight: 1.5, marginBottom: 8 }}>
                  {article.title}
                </h3>
                <p style={{ fontSize: 12, color: COLORS.sub, lineHeight: 1.7, margin: 0 }}>
                  {article.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
