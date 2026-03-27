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

export default async function LatestArticles() {
  const allArticles = await getAllArticles();
  const articles = allArticles.slice(0, 3);

  if (articles.length === 0) return null;

  return (
    <section style={{ background: COLORS.bg, padding: "80px 20px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: COLORS.green,
              letterSpacing: 3,
              marginBottom: 10,
            }}
          >
            ARTICLES
          </div>
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 34px)",
              fontWeight: 900,
              color: COLORS.text,
              marginBottom: 12,
            }}
          >
            新着記事
          </h2>
          <p style={{ fontSize: 14, color: COLORS.sub, lineHeight: 1.8 }}>
            中小企業の経営判断に役立つ情報をまとめています。
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  background: COLORS.white,
                  borderRadius: 16,
                  padding: "24px",
                  border: "1px solid " + COLORS.border,
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 12,
                    flexWrap: "wrap",
                  }}
                >
                  {article.category && (
                    <span
                      style={{
                        background: COLORS.greenLight,
                        color: COLORS.green,
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: 50,
                      }}
                    >
                      {categoryLabel[article.category] || article.category}
                    </span>
                  )}
                  <span style={{ fontSize: 12, color: COLORS.faint }}>
                    {article.date}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 800,
                    color: COLORS.text,
                    marginBottom: 10,
                    lineHeight: 1.5,
                  }}
                >
                  {article.title}
                </h3>

                <p
                  style={{
                    fontSize: 13,
                    color: COLORS.sub,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {article.description}
                </p>

                <div
                  style={{
                    marginTop: 14,
                    fontSize: 13,
                    fontWeight: 700,
                    color: COLORS.green,
                  }}
                >
                  読む →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 24 }}>
          <Link
            href="/articles"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 44,
              padding: "0 18px",
              borderRadius: 999,
              background: COLORS.white,
              color: COLORS.text,
              border: "1px solid " + COLORS.border,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            記事一覧を見る
          </Link>
        </div>
      </div>
    </section>
  );
}
