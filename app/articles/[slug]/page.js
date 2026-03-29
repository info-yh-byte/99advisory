import Link from 'next/link';
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
} from '@/lib/content';
import { notFound } from 'next/navigation';

const serviceLabel = {
  cashflow:         { label: '資金繰り診断',     href: '/cashflow/' },
  'bank-plan':      { label: '銀行向け事業計画', href: '/bank-plan/' },
  seizo:            { label: '財務健康診断',     href: '/seizo/' },
  'monthly-report': { label: '月次経営レポート', href: '/monthly-report/' },
  'monthly-review': { label: '月次経営レビュー', href: '/monthly-review/' },
  yojitsu:          { label: '予実管理伴走',     href: '/yojitsu/' },
  'meeting-design': { label: '経営会議設計',     href: '/meeting-design/' },
};

const categoryLabel = {
  cashflow:   '資金繰り',
  bank:       '銀行・融資',
  management: '経営管理',
  marketing:  '広告・マーケ',
  seizo:      '財務診断',
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} | 九十九アドバイザリー`,
    description: article.description,
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article || !article.published) {
    notFound();
  }

  const related = article.relatedService
    ? await getRelatedArticles(article.relatedService, article.slug)
    : [];

  const service = article.relatedService
    ? serviceLabel[article.relatedService]
    : null;

  const Content = article.Content;

  return (
    <>
      <style>{`
        /* ===== page wrapper ===== */
        .ad-page {
          background: var(--surface);
          min-height: 100vh;
        }

        /* ===== breadcrumb ===== */
        .ad-breadcrumb-bar {
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          padding: 0 40px;
        }
        .ad-breadcrumb-inner {
          max-width: 1100px;
          margin: 0 auto;
          height: 44px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--hint);
        }
        .ad-breadcrumb-inner a {
          color: var(--hint);
          text-decoration: none;
          transition: color 0.15s;
        }
        .ad-breadcrumb-inner a:hover { color: var(--blue); }
        .ad-breadcrumb-sep { color: var(--border); }
        .ad-breadcrumb-current {
          color: var(--muted);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 320px;
        }

        /* ===== article header ===== */
        .ad-header {
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          padding: 56px 40px 48px;
        }
        .ad-header-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .ad-meta-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 22px;
          flex-wrap: wrap;
        }
        .ad-category-pill {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--blue);
          background: var(--blue-light);
          border: 1px solid var(--blue-pale);
          border-radius: var(--radius-pill);
          padding: 4px 13px;
        }
        .ad-date {
          font-size: 13px;
          color: var(--hint);
        }
        .ad-title {
          font-size: clamp(26px, 3.5vw, 40px);
          font-weight: 800;
          color: var(--navy);
          line-height: 1.4;
          letter-spacing: -0.025em;
          margin: 0 0 20px;
          max-width: 840px;
        }
        .ad-description {
          font-size: 16px;
          color: var(--muted);
          line-height: 1.85;
          margin: 0;
          max-width: 680px;
        }

        /* ===== 2-column layout ===== */
        .ad-body-wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 48px 40px 64px;
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 40px;
          align-items: start;
        }

        /* ===== main content ===== */
        .ad-main {
          min-width: 0;
        }
        .ad-article-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 52px 56px;
        }

        /* ===== sidebar ===== */
        .ad-sidebar {
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: sticky;
          top: 96px;
        }
        .ad-sidebar-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 22px 24px;
        }
        .ad-sidebar-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--hint);
          margin-bottom: 14px;
        }
        .ad-sidebar-meta-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ad-sidebar-meta-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ad-sidebar-meta-key {
          font-size: 11px;
          color: var(--hint);
          min-width: 40px;
          flex-shrink: 0;
        }
        .ad-sidebar-meta-val {
          font-size: 13px;
          font-weight: 600;
          color: var(--navy);
        }
        .ad-sidebar-summary {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.75;
        }
        .ad-sidebar-divider {
          border: none;
          border-top: 1px solid var(--border);
          margin: 14px 0;
        }

        /* サービスCTAカード */
        .ad-sidebar-service {
          background: var(--navy);
          border: none;
          border-radius: var(--radius-md);
          padding: 22px 24px;
        }
        .ad-sidebar-service-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-bottom: 10px;
        }
        .ad-sidebar-service-title {
          font-size: 15px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 8px;
          line-height: 1.4;
        }
        .ad-sidebar-service-body {
          font-size: 12px;
          color: rgba(255,255,255,0.65);
          line-height: 1.7;
          margin-bottom: 16px;
        }
        .ad-sidebar-service-btn {
          display: block;
          text-align: center;
          background: var(--blue);
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          padding: 11px 16px;
          border-radius: var(--radius-pill);
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .ad-sidebar-service-btn:hover { opacity: 0.88; }

        /* サイドバー下部リンク */
        .ad-sidebar-back {
          font-size: 13px;
          font-weight: 600;
          color: var(--muted);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 12px 0;
          transition: color 0.15s;
        }
        .ad-sidebar-back:hover { color: var(--navy); }

        /* ===== related articles ===== */
        .ad-related-wrap {
          border-top: 1px solid var(--border);
          background: var(--surface);
          padding: 48px 40px;
        }
        .ad-related-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .ad-related-heading {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--hint);
          margin-bottom: 20px;
        }
        .ad-related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .ad-related-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 22px 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          text-decoration: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .ad-related-card:hover {
          border-color: var(--blue);
          box-shadow: 0 2px 16px rgba(37,99,235,0.07);
        }
        .ad-related-meta {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ad-related-pill {
          font-size: 10px;
          font-weight: 700;
          color: var(--blue);
          background: var(--blue-light);
          border-radius: var(--radius-pill);
          padding: 2px 9px;
        }
        .ad-related-date { font-size: 11px; color: var(--hint); }
        .ad-related-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--navy);
          line-height: 1.55;
        }
        .ad-related-desc {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.65;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .ad-related-arrow {
          font-size: 12px;
          font-weight: 700;
          color: var(--blue);
          margin-top: auto;
        }

        /* ===== footer nav ===== */
        .ad-footer-nav {
          background: var(--bg);
          border-top: 1px solid var(--border);
          padding: 0 40px;
        }
        .ad-footer-nav-inner {
          max-width: 1100px;
          margin: 0 auto;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ad-back-link {
          font-size: 13px;
          font-weight: 600;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.15s;
        }
        .ad-back-link:hover { color: var(--navy); }
        .ad-contact-link {
          font-size: 13px;
          font-weight: 700;
          color: var(--blue);
          text-decoration: none;
        }
        .ad-contact-link:hover { opacity: 0.75; }

        /* ===== mobile ===== */
        @media (max-width: 900px) {
          .ad-body-wrap {
            grid-template-columns: 1fr;
            padding: 24px 20px 48px;
            gap: 24px;
          }
          .ad-sidebar {
            position: static;
            order: 2;
          }
          .ad-main { order: 1; }
          .ad-article-card { padding: 28px 22px; }
          .ad-related-grid { grid-template-columns: 1fr; }
          .ad-breadcrumb-bar,
          .ad-header,
          .ad-related-wrap,
          .ad-footer-nav { padding-left: 20px; padding-right: 20px; }
          .ad-header { padding-top: 40px; padding-bottom: 32px; }
          .ad-breadcrumb-current { max-width: 180px; }
        }
      `}</style>

      <div className="ad-page">

        {/* 1. パンくず */}
        <div className="ad-breadcrumb-bar">
          <div className="ad-breadcrumb-inner">
            <Link href="/">ホーム</Link>
            <span className="ad-breadcrumb-sep">/</span>
            <Link href="/articles/">記事一覧</Link>
            <span className="ad-breadcrumb-sep">/</span>
            <span className="ad-breadcrumb-current">{article.title}</span>
          </div>
        </div>

        {/* 2. 記事ヘッダー */}
        <header className="ad-header">
          <div className="ad-header-inner">
            <div className="ad-meta-row">
              {article.category && (
                <span className="ad-category-pill">
                  {categoryLabel[article.category] || article.category}
                </span>
              )}
              <span className="ad-date">{article.date}</span>
            </div>
            <h1 className="ad-title">{article.title}</h1>
            <p className="ad-description">{article.description}</p>
          </div>
        </header>

        {/* 3. 2カラムレイアウト */}
        <div className="ad-body-wrap">

          {/* 本文（左） */}
          <main className="ad-main">
            <div className="ad-article-card">
              <article className="article-body">
                <Content />
              </article>
            </div>
          </main>

          {/* サイドバー（右） */}
          <aside className="ad-sidebar">

            {/* メタ情報カード */}
            <div className="ad-sidebar-card">
              <div className="ad-sidebar-label">この記事について</div>
              <div className="ad-sidebar-meta-row">
                {article.category && (
                  <div className="ad-sidebar-meta-item">
                    <span className="ad-sidebar-meta-key">分類</span>
                    <span className="ad-sidebar-meta-val">
                      {categoryLabel[article.category] || article.category}
                    </span>
                  </div>
                )}
                <div className="ad-sidebar-meta-item">
                  <span className="ad-sidebar-meta-key">公開</span>
                  <span className="ad-sidebar-meta-val">{article.date}</span>
                </div>
              </div>
              <hr className="ad-sidebar-divider" />
              <p className="ad-sidebar-summary">{article.description}</p>
            </div>

            {/* 関連サービスCTAカード */}
            {service && (
              <div className="ad-sidebar-service">
                <div className="ad-sidebar-service-label">関連サービス</div>
                <div className="ad-sidebar-service-title">{service.label}</div>
                <p className="ad-sidebar-service-body">
                  この記事のテーマについて、詳しく整理したい場合はこちらをご覧ください。
                </p>
                <Link href={service.href} className="ad-sidebar-service-btn">
                  {service.label}を見る →
                </Link>
              </div>
            )}

            {/* 記事一覧に戻るリンク */}
            <Link href="/articles/" className="ad-sidebar-back">
              ← 記事一覧に戻る
            </Link>

          </aside>
        </div>

        {/* 4. 関連記事（3カラム） */}
        {related.length > 0 && (
          <div className="ad-related-wrap">
            <div className="ad-related-inner">
              <div className="ad-related-heading">関連記事</div>
              <div className="ad-related-grid">
                {related.map((r) => (
                  <Link key={r.slug} href={`/articles/${r.slug}/`} className="ad-related-card">
                    <div className="ad-related-meta">
                      {r.category && (
                        <span className="ad-related-pill">
                          {categoryLabel[r.category] || r.category}
                        </span>
                      )}
                      <span className="ad-related-date">{r.date}</span>
                    </div>
                    <div className="ad-related-title">{r.title}</div>
                    <div className="ad-related-desc">{r.description}</div>
                    <div className="ad-related-arrow">読む →</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. フッターナビ */}
        <div className="ad-footer-nav">
          <div className="ad-footer-nav-inner">
            <Link href="/articles/" className="ad-back-link">← 記事一覧に戻る</Link>
            <Link href="/contact/" className="ad-contact-link">相談する →</Link>
          </div>
        </div>

      </div>
    </>
  );
}
