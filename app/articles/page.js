import Link from "next/link";
import { getAllArticles } from "@/lib/content";

export const metadata = {
  title: "記事一覧 | 九十九アドバイザリー",
  description: "中小企業の経営判断に役立つ記事を掲載しています。",
};

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

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", padding: "60px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
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
          <h1
            style={{
              fontSize: "clamp(22px, 4vw, 32px)",
              fontWeight: 900,
              color: COLORS.text,
              marginBottom: 12,
            }}
          >
            記事一覧
          </h1>
          <p style={{ fontSize: 14, color: COLORS.sub, lineHeight: 1.8 }}>
            中小企業の経営判断に役立つ情報をまとめています。
          </p>
        </div>

        {articles.length === 0 ? (
          <p style={{ color: COLORS.faint, fontSize: 14 }}>記事はまだありません。</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
                    padding: "28px 28px",
                    border: "1px solid " + COLORS.border,
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

                  <h2
                    style={{
                      fontSize: 17,
                      fontWeight: 800,
                      color: COLORS.text,
                      marginBottom: 10,
                      lineHeight: 1.5,
                    }}
                  >
                    {article.title}
                  </h2>

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
        )}
      </div>
    </div>
  );
}
