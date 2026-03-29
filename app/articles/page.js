import { getAllArticles } from '@/lib/content';
import ArticlesContent from '@/components/articles/ArticlesContent';

export const metadata = {
  title: '記事一覧 | 九十九アドバイザリー',
  description: '資金繰り・財務・月次管理など、中小企業の経営判断に役立つ情報を掲載しています。',
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <>
      <style>{`
        .ar-page-header {
          background: var(--bg);
          padding: 72px 40px 40px;
        }
        .ar-page-header-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .ar-page-eyebrow {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--blue);
          margin-bottom: 16px;
        }
        .ar-page-h1 {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 800;
          color: var(--navy);
          margin: 0 0 12px;
          letter-spacing: -0.02em;
          line-height: 1.25;
        }
        .ar-page-lead {
          font-size: 15px;
          color: var(--muted);
          line-height: 1.8;
          max-width: 560px;
          margin: 0;
        }
        .ar-page-body {
          padding: 0 40px 80px;
        }
        .ar-page-body-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .ar-page-divider {
          border: none;
          border-top: 1px solid var(--border);
          margin: 0 0 32px;
        }
        @media (max-width: 768px) {
          .ar-page-header {
            padding: 56px 20px 32px;
          }
          .ar-page-body {
            padding: 0 20px 64px;
          }
        }
      `}</style>

      <div className="ar-page-header">
        <div className="ar-page-header-inner">
          <span className="ar-page-eyebrow">ARTICLES</span>
          <h1 className="ar-page-h1">経営管理の論点を整理する記事</h1>
          <p className="ar-page-lead">
            資金繰り・財務・月次管理など、中小企業の経営判断に役立つ情報を掲載しています。
          </p>
        </div>
      </div>

      <div className="ar-page-body">
        <div className="ar-page-body-inner">
          <hr className="ar-page-divider" />
          <ArticlesContent articles={articles} />
        </div>
      </div>
    </>
  );
}
