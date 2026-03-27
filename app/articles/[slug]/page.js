import Link from "next/link";
import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/content";
import { notFound } from "next/navigation";

const COLORS = {
  green: "#1a8a7a",
  greenLight: "#e6f5f2",
  greenPale: "#f4faf8",
  text: "#222",
  sub: "#666",
  faint: "#999",
  bg: "#fafafa",
  white: "#fff",
  border: "#eaeaea",
};

const serviceLabel = {
  cashflow: { label: "キャッシュフロー改善", href: "/cashflow" },
  "bank-plan": { label: "銀行融資・事業計画", href: "/bank-plan" },
  seizo: { label: "財務健康診断", href: "/seizo" },
};

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} | 九十九アドバイザリー`,
    description: article.description,
  };
}

function renderMarkdown(content) {
  const lines = content.split("\n");
  const elements = [];
  let key = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      elements.push(<h2 key={key++} style={{ fontSize: 20, fontWeight: 900, color: COLORS.text, margin: "40px 0 16px", paddingBottom: 8, borderBottom: "2px solid " + COLORS.border }}>{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={key++} style={{ fontSize: 16, fontWeight: 800, color: COLORS.text, margin: "28px 0 10px" }}>{line.slice(4)}</h3>);
    } else if (line.startsWith("---")) {
      elements.push(<hr key={key++} style={{ border: "none", borderTop: "1px solid " + COLORS.border, margin: "32px 0" }} />);
    } else if (line.startsWith("- ")) {
      elements.push(<li key={key++} style={{ fontSize: 15, color: COLORS.text, lineHeight: 1.8, marginBottom: 4, marginLeft: 20 }}>{line.slice(2)}</li>);
    } else if (line.trim() === "") {
      elements.push(<div key={key++} style={{ height: 8 }} />);
    } else {
      elements.push(<p key={key++} style={{ fontSize: 15, color: COLORS.text, lineHeight: 1.9, margin: "0 0 8px" }}>{line}</p>);
    }
  }
  return elements;
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = article.relatedService
    ? getRelatedArticles(article.relatedService, article.slug)
    : [];
  const service = article.relatedService ? serviceLabel[article.relatedService] : null;

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", padding: "60px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ fontSize: 12, color: COLORS.faint, marginBottom: 32 }}>
          <Link href="/" style={{ color: COLORS.faint, textDecoration: "none" }}>ホーム</Link>
          {" / "}
          <Link href="/articles" style={{ color: COLORS.faint, textDecoration: "none" }}>記事一覧</Link>
          {" / "}
          <span>{article.title}</span>
        </div>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 12, color: COLORS.faint, marginBottom: 12 }}>{article.date}</div>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 900, color: COLORS.text, lineHeight: 1.5, marginBottom: 16 }}>{article.title}</h1>
          <p style={{ fontSize: 15, color: COLORS.sub, lineHeight: 1.8 }}>{article.description}</p>
        </div>
        <div style={{ background: COLORS.white, borderRadius: 16, padding: "40px 36px", border: "1px solid " + COLORS.border, marginBottom: 40 }}>
          {renderMarkdown(article.content)}
        </div>
        {service && (
          <div style={{ background: COLORS.greenPale, borderRadius: 16, padding: "28px 28px", marginBottom: 40, border: "1px solid " + COLORS.border }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.green, marginBottom: 8 }}>関連サービス</div>
            <p style={{ fontSize: 14, color: COLORS.sub, lineHeight: 1.7, marginBottom: 16 }}>この記事のテーマに関連するサービスをご用意しています。まずは無料相談でご状況をお聞かせください。</p>
            <Link href={service.href} style={{ display: "inline-block", background: COLORS.green, color: "#fff", padding: "12px 28px", borderRadius: 50, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
              {service.label}のページを見る →
            </Link>
          </div>
        )}
        {related.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: COLORS.text, marginBottom: 16 }}>関連記事</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {related.map((a) => (
                <Link key={a.slug} href={`/articles/${a.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: COLORS.white, borderRadius: 12, padding: "18px 20px", border: "1px solid " + COLORS.border }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>{a.title}</div>
                    <div style={{ fontSize: 12, color: COLORS.sub }}>{a.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        <Link href="/articles" style={{ fontSize: 13, color: COLORS.green, fontWeight: 700, textDecoration: "none" }}>← 記事一覧に戻る</Link>
      </div>
    </div>
  );
}
