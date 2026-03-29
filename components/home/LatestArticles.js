import Link from 'next/link';
import { getAllArticles } from '@/lib/content';

const CATEGORY_LABELS = {
  cashflow: '資金繰り',
  bank: '銀行・融資',
  management: '経営管理',
  marketing: '広告・マーケ',
  seizo: '財務診断',
};

export default async function LatestArticles() {
  const allArticles = await getAllArticles();
  const articles = allArticles.slice(0, 3);

  if (articles.length === 0) return null;

  return (
    <>
      <style>{`
        .la-section {
          background: var(--surface);
          padding: 72px 40px;
        }
        .la-wrap {
          max-width: 1100px;
          margin: 0 auto;
        }
        .la-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .la-header-left {
          min-width: 0;
        }
        .la-kicker {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--blue);
          margin-bottom: 8px;
        }
        .la-heading {
          font-size: clamp(20px, 3vw, 26px);
          font-weight: 800;
          color: var(--navy);
          margin: 0;
          line-height: 1.3;
        }
        .la-all-link {
          font-size: 14px;
          font-weight: 600;
          color: var(--blue);
          text-decoration: none;
          white-space: nowrap;
          transition: opacity 0.15s;
          flex-shrink: 0;
        }
        .la-all-link:hover {
          opacity: 0.75;
        }
        .la-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .la-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-decoration: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .la-card:hover {
          border-color: var(--blue);
          box-shadow: 0 2px 12px rgba(37, 99, 235, 0.08);
        }
        .la-card-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .la-pill {
          background: var(--blue-light);
          color: var(--blue);
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 9999px;
        }
        .la-date {
          font-size: 12px;
          color: var(--hint);
        }
        .la-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--navy);
          line-height: 1.5;
          margin: 0;
        }
        .la-desc {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.7;
          margin: 0;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .la-read {
          font-size: 13px;
          font-weight: 700;
          color: var(--blue);
          margin-top: auto;
        }
        @media (max-width: 900px) {
          .la-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .la-section {
            padding: 56px 20px;
          }
          .la-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="la-section">
        <div className="la-wrap">
          <div className="la-header">
            <div className="la-header-left">
              <span className="la-kicker">ARTICLES</span>
              <h2 className="la-heading">新着記事</h2>
            </div>
            <Link href="/articles/" className="la-all-link">すべての記事を見る →</Link>
          </div>

          <div className="la-grid">
            {articles.map((article) => (
              <Link key={article.slug} href={`/articles/${article.slug}`} className="la-card">
                <div className="la-card-meta">
                  {article.category && (
                    <span className="la-pill">
                      {CATEGORY_LABELS[article.category] || article.category}
                    </span>
                  )}
                  <span className="la-date">{article.date}</span>
                </div>
                <h3 className="la-title">{article.title}</h3>
                <p className="la-desc">{article.description}</p>
                <span className="la-read">読む →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
