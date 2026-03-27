import Link from 'next/link';
import LatestArticles from '@/components/home/LatestArticles';

export const metadata = {
  title: '九十九アドバイザリー | 中小企業向けCFO型アドバイザリー',
  description:
    '数字と論点を整理し、経営判断を進めやすい形へ整える支援を行っています。財務健康診断・資金繰り診断・月次経営レビューなど、中小企業の経営者・財務担当者向けサービス。',
};

const PROBLEMS = [
  '利益は出ているのに、現金が思ったほど残らない',
  '毎月の数字を見ても、何を優先すべきか決めきれない',
  '銀行や社内への説明資料づくりが、いつも後回しになる',
  '資金繰りに不安はあるが、どこから整理すればいいか見えない',
  '単発の相談だけでなく、継続的に相談できる先が欲しい',
];

const DELIVERABLES = [
  {
    title: '財務健康診断レポート',
    body: '現状の数字を整理し、優先論点をまとめたメモ',
  },
  {
    title: '資金繰り整理資料',
    body: '現金の動きと注意点をまとめた一覧',
  },
  {
    title: '月次レポート・事業計画資料',
    body: '銀行説明や社内共有に使える形式',
  },
];

export default function HomePage() {
  return (
    <>
      <style>{`
        /* ===== Hero ===== */
        .hp-hero {
          background: var(--bg);
          padding: 80px 24px 72px;
        }
        .hp-hero-inner {
          max-width: 720px;
          margin: 0 auto;
        }
        .hp-eyebrow {
          display: block;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 20px;
        }
        .hp-h1 {
          font-size: clamp(28px, 5vw, 44px);
          color: var(--navy);
          line-height: 1.3;
          font-weight: 700;
          margin: 0 0 28px;
          letter-spacing: -0.01em;
        }
        .hp-lead {
          font-size: 16px;
          color: var(--muted);
          line-height: 1.85;
          max-width: 600px;
          margin: 0 0 8px;
        }
        .hp-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 28px 0 36px;
        }
        .hp-badge {
          font-size: 13px;
          background: var(--cream);
          border: 1px solid var(--line-soft);
          border-radius: 4px;
          padding: 6px 14px;
          color: var(--muted);
          white-space: nowrap;
        }
        .hp-cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
        }
        .hp-btn-primary {
          background: var(--navy);
          color: var(--white) !important;
          padding: 14px 28px;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
          transition: opacity 0.15s;
        }
        .hp-btn-primary:hover { opacity: 0.85; }
        .hp-btn-secondary {
          color: var(--navy) !important;
          border: 1.5px solid var(--navy);
          padding: 14px 28px;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
          transition: background 0.15s;
        }
        .hp-btn-secondary:hover { background: rgba(27,46,75,0.05); }

        /* ===== Sections ===== */
        .hp-section {
          padding: 72px 24px;
        }
        .hp-section-inner {
          max-width: 800px;
          margin: 0 auto;
        }
        .hp-section-inner.narrow {
          max-width: 640px;
        }
        .hp-section-bg-cream { background: var(--cream); }
        .hp-section-bg-white { background: var(--white); }
        .hp-section-bg-navy {
          background: var(--navy);
          color: var(--white);
        }

        .hp-section-h2 {
          font-size: clamp(20px, 3vw, 28px);
          color: var(--navy);
          font-weight: 700;
          line-height: 1.4;
          margin: 0 0 20px;
        }
        .hp-section-bg-navy .hp-section-h2 {
          color: var(--white);
        }
        .hp-section-intro {
          font-size: 15px;
          color: var(--muted);
          line-height: 1.85;
          margin: 0 0 40px;
          max-width: 600px;
        }
        .hp-section-bg-navy .hp-section-intro {
          color: rgba(255,255,255,0.8);
        }
        .hp-body {
          font-size: 16px;
          color: var(--muted);
          line-height: 1.9;
          margin: 0 0 20px;
        }
        .hp-body-note {
          font-size: 13px;
          color: var(--ink-faint);
          margin-top: 20px;
        }

        /* ===== Problems ===== */
        .hp-problem-list {
          list-style: none;
          padding: 0;
          margin: 32px 0 0;
          display: grid;
          gap: 12px;
        }
        .hp-problem-item {
          background: var(--white);
          border: 1px solid var(--line-soft);
          border-radius: 8px;
          padding: 18px 20px;
          font-size: 15px;
          color: var(--text);
          line-height: 1.6;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .hp-problem-mark {
          color: var(--accent);
          font-size: 14px;
          flex-shrink: 0;
          margin-top: 2px;
          font-weight: 700;
        }

        /* ===== Service cards ===== */
        .hp-card-grid {
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 640px) {
          .hp-card-grid { grid-template-columns: 1fr; }
        }
        .hp-card {
          background: var(--white);
          border: 1px solid var(--line-soft);
          border-radius: 10px;
          padding: 28px 24px;
        }
        .hp-card-head {
          font-size: 15px;
          font-weight: 700;
          color: var(--navy);
          margin: 0 0 12px;
          line-height: 1.4;
        }
        .hp-card-body {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.75;
          margin: 0 0 20px;
        }
        .hp-card-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .hp-card-link {
          font-size: 13px;
          color: var(--accent);
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .hp-card-link:hover { text-decoration: underline; }

        /* ===== Deliverables ===== */
        .hp-deliv-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(3, 1fr);
          margin-top: 32px;
        }
        @media (max-width: 640px) {
          .hp-deliv-grid { grid-template-columns: 1fr; }
        }
        .hp-deliv-card {
          background: var(--cream);
          border-radius: 8px;
          padding: 24px 20px;
          border: 1px solid var(--line-soft);
        }
        .hp-deliv-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--navy);
          margin: 0 0 8px;
        }
        .hp-deliv-body {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.7;
          margin: 0;
        }

        /* ===== Entry cards ===== */
        .hp-entry-grid {
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(3, 1fr);
          margin-top: 32px;
        }
        @media (max-width: 640px) {
          .hp-entry-grid { grid-template-columns: 1fr; }
        }
        .hp-entry-card {
          background: var(--white);
          border: 1px solid var(--line-soft);
          border-radius: 10px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          transition: box-shadow 0.15s;
        }
        .hp-entry-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.07); }
        .hp-entry-tagline {
          font-size: 12px;
          color: var(--accent);
          font-weight: 600;
          letter-spacing: 0.04em;
          margin: 0 0 10px;
        }
        .hp-entry-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--navy);
          margin: 0 0 12px;
          line-height: 1.35;
        }
        .hp-entry-body {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.75;
          margin: 0 0 20px;
          flex: 1;
        }
        .hp-entry-cta {
          font-size: 13px;
          color: var(--accent);
          font-weight: 600;
        }

        /* ===== Flow ===== */
        .hp-flow {
          display: flex;
          flex-wrap: wrap;
          gap: 0;
          align-items: center;
          margin-top: 32px;
        }
        .hp-flow-step {
          font-size: 13px;
          color: var(--muted);
          background: var(--cream);
          border: 1px solid var(--line-soft);
          border-radius: 4px;
          padding: 8px 14px;
          white-space: nowrap;
        }
        .hp-flow-arrow {
          font-size: 13px;
          color: var(--ink-faint);
          padding: 0 8px;
        }
        @media (max-width: 480px) {
          .hp-flow { flex-direction: column; align-items: flex-start; }
          .hp-flow-arrow { transform: rotate(90deg); }
        }

        /* ===== Trust badges ===== */
        .hp-trust-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 28px;
        }
        .hp-trust-badge {
          font-size: 13px;
          background: var(--white);
          border: 1px solid var(--line-soft);
          border-radius: 4px;
          padding: 7px 14px;
          color: var(--muted);
        }

        /* ===== Final CTA ===== */
        .hp-final-cta-wrap {
          max-width: 560px;
          margin: 0 auto;
          text-align: center;
        }
        .hp-final-cta-wrap .hp-section-h2 {
          color: var(--white);
        }
        .hp-final-cta-wrap .hp-body {
          color: rgba(255,255,255,0.8);
        }
        .hp-final-cta-btns {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          margin-top: 32px;
        }
        .hp-btn-outline-white {
          color: rgba(255,255,255,0.85) !important;
          border: 1.5px solid rgba(255,255,255,0.4);
          padding: 14px 28px;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
          transition: background 0.15s;
        }
        .hp-btn-outline-white:hover { background: rgba(255,255,255,0.08); }
      `}</style>

      {/* Section 1: Hero */}
      <section className="hp-hero">
        <div className="hp-hero-inner">
          <span className="hp-eyebrow">中小企業の経営判断を、数字から整える</span>
          <h1 className="hp-h1">
            数字を見ているのに、<br />
            次の判断に迷う会社へ。
          </h1>
          <p className="hp-lead">
            利益は出ている。試算表もある。<br />
            けれど、資金繰り、銀行への説明、月次の打ち手が、まだはっきりしない。
          </p>
          <p className="hp-lead">
            九十九アドバイザリーは、数字と論点を整理し、<br />
            経営判断を進めやすい形へ整えるための支援を行っています。
          </p>
          <div className="hp-badges">
            <span className="hp-badge">秘密厳守</span>
            <span className="hp-badge">NDA締結可</span>
            <span className="hp-badge">初回相談受付</span>
          </div>
          <div className="hp-cta-row">
            <Link href="/contact/" className="hp-btn-primary">
              お問い合わせフォームへ
            </Link>
            <Link href="/services/" className="hp-btn-secondary">
              サービス一覧を見る
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: よくあるお悩み */}
      <section className="hp-section hp-section-bg-cream">
        <div className="hp-section-inner">
          <h2 className="hp-section-h2">こんな状態で、止まっていませんか</h2>
          <ul className="hp-problem-list">
            {PROBLEMS.map((item) => (
              <li key={item} className="hp-problem-item">
                <span className="hp-problem-mark">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 3: フィロソフィー */}
      <section className="hp-section hp-section-bg-white">
        <div className="hp-section-inner narrow">
          <h2 className="hp-section-h2">
            数字があることと、判断できることは、同じではありません
          </h2>
          <p className="hp-body">
            決算書、試算表、資金繰り表。<br />
            必要な情報が手元にあっても、判断しやすい形に整理されていなければ、<br />
            次の一手は決めにくくなります。
          </p>
          <p className="hp-body">
            九十九アドバイザリーは、数字をただ並べるのではなく、<br />
            いま見るべき論点を整理し、経営判断につながる形へ整える支援を行っています。
          </p>
          <p className="hp-body-note">
            ※ 記帳・税務申告・融資手続きの代行は行っていません。
          </p>
        </div>
      </section>

      {/* Section 4: 3分類の支援領域 */}
      <section className="hp-section hp-section-bg-cream">
        <div className="hp-section-inner">
          <h2 className="hp-section-h2">いま必要なところから、順番にご相談いただけます</h2>
          <p className="hp-section-intro">
            最初から大きな支援を前提にする必要はありません。<br />
            まず現状を整理し、その後に毎月の数字を整え、<br />
            必要に応じて継続的な伴走へ進める。<br />
            そうした流れに合わせて、支援を3つに分けています。
          </p>
          <div className="hp-card-grid">
            <div className="hp-card">
              <p className="hp-card-head">まず現状を整理する診断支援</p>
              <p className="hp-card-body">
                何が問題なのか、どこから手をつけるべきかを整理したい会社へ。
                数字を見ながら、現状と論点をはっきりさせるための入口支援です。
              </p>
              <div className="hp-card-links">
                <Link href="/seizo/" className="hp-card-link">財務健康診断 →</Link>
                <Link href="/cashflow/" className="hp-card-link">資金繰り診断 →</Link>
              </div>
            </div>
            <div className="hp-card">
              <p className="hp-card-head">月次の数字を、判断に使いやすい形へ整える支援</p>
              <p className="hp-card-body">
                毎月の数字は見ているが、経営判断や説明資料にうまくつながっていない会社へ。
                数字と資料を、毎月使える形へ整えていく支援です。
              </p>
              <div className="hp-card-links">
                <Link href="/bank-plan/" className="hp-card-link">銀行向け事業計画 →</Link>
                <Link href="/monthly-review/" className="hp-card-link">月次経営レビュー →</Link>
              </div>
            </div>
            <div className="hp-card">
              <p className="hp-card-head">重要な経営判断に伴走する支援</p>
              <p className="hp-card-body">
                単発の整理だけでなく、数字を見ながら次の一手まで一緒に考えたい会社へ。
                必要に応じて、継続的な判断支援や会議設計まで対応します。
              </p>
              <div className="hp-card-links">
                <Link href="/monthly-review/" className="hp-card-link">詳しく見る →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: 成果物イメージ */}
      <section className="hp-section hp-section-bg-white">
        <div className="hp-section-inner">
          <h2 className="hp-section-h2">お返しするのは、判断しやすく整理された資料です</h2>
          <p className="hp-section-intro">
            感覚的なコメントだけをお返しするのではなく、<br />
            数字の見え方、注意すべき点、次に見るべき論点を、整理した形でお返しします。
          </p>
          <div className="hp-deliv-grid">
            {DELIVERABLES.map((item) => (
              <div key={item.title} className="hp-deliv-card">
                <p className="hp-deliv-title">{item.title}</p>
                <p className="hp-deliv-body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: 入口商品3つの導線 */}
      <section className="hp-section hp-section-bg-cream">
        <div className="hp-section-inner">
          <h2 className="hp-section-h2">まずは、今の悩みに近いところからご覧ください</h2>
          <p className="hp-section-intro">
            最初にご相談いただきやすい入口商品を3つご用意しています。
            それぞれ単体でもご利用いただけますが、
            必要に応じてその後の月次整理や継続支援へつなげることもできます。
          </p>
          <div className="hp-entry-grid">
            <Link href="/seizo/" className="hp-entry-card">
              <p className="hp-entry-tagline">財務健康診断</p>
              <p className="hp-entry-title">会社全体の数字を、一度整理したい方へ</p>
              <p className="hp-entry-body">
                現状の数字を見ながら、どこに注意すべきか、何から着手すべきかを明確にします。
              </p>
              <span className="hp-entry-cta">詳しく見る →</span>
            </Link>
            <Link href="/cashflow/" className="hp-entry-card">
              <p className="hp-entry-tagline">資金繰り診断</p>
              <p className="hp-entry-title">現金の流れや返済負担に不安がある方へ</p>
              <p className="hp-entry-body">
                資金の動きを整理し、どこに無理が出やすいかを見える形にします。
              </p>
              <span className="hp-entry-cta">詳しく見る →</span>
            </Link>
            <Link href="/monthly-review/" className="hp-entry-card">
              <p className="hp-entry-tagline">月次経営レビュー</p>
              <p className="hp-entry-title">毎月の数字を、経営判断に使いやすい形へ整えたい方へ</p>
              <p className="hp-entry-body">
                月に一度、数字を一緒に読み解き、次の判断と行動を整理する時間をつくります。
              </p>
              <span className="hp-entry-cta">詳しく見る →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 7: 継続支援への流れ */}
      <section className="hp-section hp-section-bg-white">
        <div className="hp-section-inner">
          <h2 className="hp-section-h2">必要に応じて、単発相談から継続支援へ進めます</h2>
          <p className="hp-body">
            最初から継続契約を前提にする必要はありません。<br />
            まずは診断や単発の整理から始め、<br />
            そのうえで必要があれば、毎月の数字の見直しや<br />
            継続的な伴走支援へ進めます。
          </p>
          <p className="hp-body">
            いまの状況に合わせて、無理のない順番でご相談いただけます。
          </p>
          <div className="hp-flow">
            <span className="hp-flow-step">診断</span>
            <span className="hp-flow-arrow">→</span>
            <span className="hp-flow-step">課題が見える</span>
            <span className="hp-flow-arrow">→</span>
            <span className="hp-flow-step">月次整理</span>
            <span className="hp-flow-arrow">→</span>
            <span className="hp-flow-step">数字が使える状態になる</span>
            <span className="hp-flow-arrow">→</span>
            <span className="hp-flow-step">月次レビュー</span>
            <span className="hp-flow-arrow">→</span>
            <span className="hp-flow-step">判断と行動が毎月回る</span>
          </div>
        </div>
      </section>

      {/* Section 8: 信頼補強 */}
      <section className="hp-section hp-section-bg-cream">
        <div className="hp-section-inner">
          <h2 className="hp-section-h2">このような会社に向いています</h2>
          <p className="hp-body">
            毎月の数字は見ているが、まだ判断につながる形には整理しきれていない。<br />
            利益、資金繰り、銀行説明、月次管理のどこかに引っかかりがある。<br />
            社内だけで整理しきれない論点を、外部の視点も入れながら進めたい。
          </p>
          <p className="hp-body">
            そうした中小企業の経営者・財務担当者に向いた支援です。
          </p>
          <div className="hp-trust-badges">
            <span className="hp-trust-badge">オンライン対応（全国）</span>
            <span className="hp-trust-badge">初回相談は無料</span>
            <span className="hp-trust-badge">秘密厳守・NDA締結可</span>
            <span className="hp-trust-badge">売り込みは行いません</span>
          </div>
        </div>
      </section>

      {/* Section 9: 新着記事 */}
      <LatestArticles />

      {/* Section 10: 最終CTA */}
      <section className="hp-section hp-section-bg-navy">
        <div className="hp-final-cta-wrap">
          <h2 className="hp-section-h2">まずは、今の状況をフォームからお送りください</h2>
          <p className="hp-body">
            ご相談内容を確認のうえ、2営業日以内にご連絡いたします。<br />
            まだ整理しきれていない段階でも、そのままお送りいただいて問題ありません。
          </p>
          <div className="hp-final-cta-btns">
            <Link href="/contact/" className="hp-btn-primary">
              お問い合わせフォームへ
            </Link>
            <Link href="/services/" className="hp-btn-outline-white">
              サービス一覧を見る
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
