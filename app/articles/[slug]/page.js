import Link from 'next/link';
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
} from '@/lib/content';
import { notFound } from 'next/navigation';

const serviceLabel = {
  cashflow:         { label: '資金繰り診断',      href: '/cashflow/' },
  'bank-plan':      { label: '銀行向け事業計画',  href: '/bank-plan/' },
  seizo:            { label: '財務健康診断',       href: '/seizo/' },
  'monthly-report': { label: '月次経営レポート',  href: '/monthly-report/' },
  'monthly-review': { label: '月次経営レビュー',  href: '/monthly-review/' },
  yojitsu:          { label: '予実管理伴走',       href: '/yojitsu/' },
  'meeting-design': { label: '経営会議設計',       href: '/meeting-design/' },
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
          max-width: 800px;
          margin: 0 auto;
          height: 44px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--hint);
          flex-wrap: wrap;
        }
        .ad-breadcrumb-inner a {
          color: var(--hint);
          text-decoration: none;
        }
        .ad-breadcrumb-inner a:hover { color: var(--blue); }
        .ad-breadcrumb-sep { color: var(--border); }
        .ad-breadcrumb-current {
          color: var(--muted);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 260px;
        }

        /* ===== article header ===== */
        .ad-header {
          background: var(--bg);
          padding: 52px 40px 44px;
          border-bottom: 1px solid var(--border);
        }
        .ad-header-inner {
          max-width: 800px;
          margin: 0 auto;
        }
        .ad-meta-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
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
          padding: 4px 12px;
        }
        .ad-date {
          font-size: 13px;
          color: var(--hint);
        }
        .ad-title {
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 800;
          color: var(--navy);
          line-height: 1.45;
          letter-spacing: -0.02em;
          margin: 0 0 18px;
        }
        .ad-description {
          font-size: 16px;
          color: var(--muted);
          line-height: 1.8;
          margin: 0;
          max-width: 640px;
        }

        /* ===== content area ===== */
        .ad-content-wrap {
          padding: 48px 40px;
        }
        .ad-content-inner {
          max-width: 800px;
          margin: 0 auto;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 48px 56px;
        }

        /* ===== service banner ===== */
        .ad-service-banner-wrap {
          padding: 0 40px 48px;
        }
        .ad-service-banner-inner {
          max-width: 800px;
          margin: 0 auto;
          background: var(--navy);
          border-radius: var(--radius-lg);
          padding: 32px 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .ad-service-banner-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .ad-service-banner-title {
          font-size: 18px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 8px;
        }
        .ad-service-banner-body {
          font-size: 14px;
          color: rgba(255,255,255,0.7);
          line-height: 1.7;
          margin: 0;
          max-width: 480px;
        }
        .ad-service-banner-btn {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          background: var(--blue);
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          padding: 13px 28px;
          border-radius: var(--radius-pill);
          text-decoration: none;
          transition: opacity 0.15s;
          flex-shrink: 0;
        }
        .ad-service-banner-btn:hover { opacity: 0.88; }

        /* ===== related articles ===== */
        .ad-related-wrap {
          padding: 0 40px 48px;
        }
        .ad-related-inner {
          max-width: 800px;
          margin: 0 auto;
        }
        .ad-related-heading {
          font-size: 14px;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 16px;
          letter-spacing: 0.04em;
        }
        .ad-related-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        .ad-related-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 20px 22px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          text-decoration: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .ad-related-card:hover {
          border-color: var(--blue);
          box-shadow: 0 2px 12px rgba(37,99,235,0.07);
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
          line-height: 1.5;
        }
        .ad-related-desc {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.6;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        /* ===== footer nav ===== */
        .ad-footer-nav {
          border-top: 1px solid var(--border);
          background: var(--bg);
          padding: 0 40px;
        }
        .ad-footer-nav-inner {
          max-width: 800px;
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
        @media (max-width: 768px) {
          .ad-breadcrumb-bar { padding: 0 20px; }
          .ad-header { padding: 40px 20px 32px; }
          .ad-content-wrap { padding: 24px 16px; }
          .ad-content-inner { padding: 28px 20px; }
          .ad-service-banner-wrap,
          .ad-related-wrap { padding: 0 16px 32px; }
          .ad-service-banner-inner { padding: 24px 20px; }
          .ad-related-grid { grid-template-columns: 1fr; }
          .ad-footer-nav { padding: 0 20px; }
          .ad-breadcrumb-current { max-width: 160px; }
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

        {/* 3. 本文エリア */}
        <div className="ad-content-wrap">
          <div className="ad-content-inner">
            <article className="article-body">
              <Content />
            </article>
          </div>
        </div>

        {/* 4. 関連サービスバナー */}
        {service && (
          <div className="ad-service-banner-wrap">
            <div className="ad-service-banner-inner">
              <div className="ad-service-banner-text">
                <div className="ad-service-banner-label">関連サービス</div>
                <div className="ad-service-banner-title">{service.label}</div>
                <p className="ad-service-banner-body">
                  この記事のテーマについて、詳しく整理したい場合はこちらをご覧ください。まずは現状をお聞かせください。
                </p>
              </div>
              <Link href={service.href} className="ad-service-banner-btn">
                {service.label}を見る →
              </Link>
            </div>
          </div>
        )}

        {/* 5. 関連記事 */}
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
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. フッターナビ */}
        <div className="ad-footer-nav">
          <div className="ad-footer-nav-inner">
            <Link href="/articles/" className="ad-back-link">
              ← 記事一覧に戻る
            </Link>
            <Link href="/contact/" className="ad-contact-link">
              相談する →
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
