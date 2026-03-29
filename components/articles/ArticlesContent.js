'use client';

import { useState } from 'react';
import Link from 'next/link';

const CATEGORY_LABELS = {
  cashflow: '資金繰り',
  bank: '銀行・融資',
  management: '経営管理',
  marketing: '広告・マーケ',
  seizo: '財務診断',
};

export default function ArticlesContent({ articles }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = ['all', ...Array.from(new Set(articles.map((a) => a.category).filter(Boolean)))];

  const filtered = activeFilter === 'all'
    ? articles
    : articles.filter((a) => a.category === activeFilter);

  return (
    <>
      <style>{`
        .ar-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 28px;
        }
        .ar-chip {
          font-size: 13px;
          font-weight: 600;
          padding: 7px 16px;
          border-radius: 9999px;
          border: 1px solid var(--border);
          background: #fff;
          color: var(--muted);
          cursor: pointer;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
          line-height: 1;
        }
        .ar-chip:hover {
          border-color: var(--blue);
          color: var(--blue);
        }
        .ar-chip.active {
          background: var(--blue);
          color: #fff;
          border-color: var(--blue);
        }
        .ar-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .ar-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-decoration: none;
          cursor: pointer;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .ar-card:hover {
          border-color: var(--blue);
          box-shadow: 0 2px 12px rgba(37, 99, 235, 0.08);
        }
        .ar-card-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .ar-pill {
          background: var(--blue-light);
          color: var(--blue);
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 9999px;
        }
        .ar-date {
          font-size: 12px;
          color: var(--hint);
        }
        .ar-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--navy);
          line-height: 1.5;
          margin: 0;
        }
        .ar-desc {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.7;
          margin: 0;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .ar-read {
          font-size: 13px;
          font-weight: 700;
          color: var(--blue);
          margin-top: auto;
        }
        .ar-empty {
          grid-column: 1 / -1;
          font-size: 14px;
          color: var(--hint);
          padding: 24px 0;
        }
        .ar-banner {
          margin-top: 48px;
          background: var(--navy);
          border-radius: 16px;
          padding: 28px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .ar-banner-text {
          color: rgba(255, 255, 255, 0.85);
          font-size: 15px;
          line-height: 1.7;
          margin: 0;
        }
        .ar-banner-btn {
          background: #2563eb;
          color: #fff;
          padding: 11px 24px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          white-space: nowrap;
          transition: opacity 0.15s;
          flex-shrink: 0;
        }
        .ar-banner-btn:hover {
          opacity: 0.88;
        }
        @media (max-width: 640px) {
          .ar-grid {
            grid-template-columns: 1fr;
          }
          .ar-banner {
            flex-direction: column;
            align-items: flex-start;
          }
          .ar-banner-btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      <div className="ar-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`ar-chip${activeFilter === cat ? ' active' : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat === 'all' ? 'すべて' : (CATEGORY_LABELS[cat] || cat)}
          </button>
        ))}
      </div>

      <div className="ar-grid">
        {filtered.length === 0 ? (
          <p className="ar-empty">このカテゴリの記事はまだありません。</p>
        ) : (
          filtered.map((article) => (
            <Link key={article.slug} href={`/articles/${article.slug}`} className="ar-card">
              <div className="ar-card-meta">
                {article.category && (
                  <span className="ar-pill">
                    {CATEGORY_LABELS[article.category] || article.category}
                  </span>
                )}
                <span className="ar-date">{article.date}</span>
              </div>
              <h2 className="ar-title">{article.title}</h2>
              <p className="ar-desc">{article.description}</p>
              <span className="ar-read">読む →</span>
            </Link>
          ))
        )}
      </div>

      <div className="ar-banner">
        <p className="ar-banner-text">
          数字の整理や資金繰りについてご相談ください。<br />
          まずは現状をお聞かせください。
        </p>
        <Link href="/contact/" className="ar-banner-btn">お問い合わせ →</Link>
      </div>
    </>
  );
}
