import Link from 'next/link';

export const metadata = {
  title: 'サービス一覧 | 九十九アドバイザリー',
  description:
    '状況に応じて選べる3つの支援をご案内します。診断支援、月次整理支援、継続的な判断支援まで、中小企業の経営者・財務担当者向けに整理しています。',
};

export default function ServicesPage() {
  return (
    <>
      <style>{`
        /* ===== Layout ===== */
        .sv-section {
          padding: 72px 24px;
        }
        .sv-section-inner {
          max-width: 800px;
          margin: 0 auto;
        }
        .sv-section-inner.narrow {
          max-width: 640px;
        }
        .sv-bg-bg    { background: var(--bg); }
        .sv-bg-white { background: var(--white); }
        .sv-bg-cream { background: var(--cream); }
        .sv-bg-navy  { background: var(--navy); }

        /* ===== Header ===== */
        .sv-eyebrow {
          display: block;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 20px;
        }
        .sv-h1 {
          font-size: clamp(24px, 4vw, 36px);
          color: var(--navy);
          font-weight: 700;
          line-height: 1.35;
          margin: 0 0 20px;
        }
        .sv-lead {
          font-size: 16px;
          color: var(--muted);
          line-height: 1.85;
          max-width: 640px;
          margin: 0;
        }

        /* ===== Section headings ===== */
        .sv-h2 {
          font-size: clamp(18px, 3vw, 26px);
          color: var(--navy);
          font-weight: 700;
          line-height: 1.4;
          margin: 0 0 12px;
        }
        .sv-h2-sub {
          font-size: 15px;
          color: var(--muted);
          font-weight: 700;
          line-height: 1.7;
          margin: 0 0 24px;
        }
        .sv-body {
          font-size: 15px;
          color: var(--muted);
          line-height: 1.9;
          margin: 0 0 16px;
        }

        /* ===== Flow bar ===== */
        .sv-flow {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0;
          margin-top: 28px;
        }
        .sv-flow-step {
          font-size: 14px;
          color: var(--text);
          background: var(--cream);
          border: 1px solid var(--line-soft);
          border-radius: 6px;
          padding: 12px 20px;
          white-space: nowrap;
        }
        .sv-flow-arrow {
          font-size: 14px;
          color: var(--ink-faint);
          padding: 0 10px;
        }
        @media (max-width: 480px) {
          .sv-flow { flex-direction: column; align-items: flex-start; }
          .sv-flow-arrow { padding: 4px 0; transform: rotate(90deg); }
        }

        /* ===== Target list ===== */
        .sv-target-head {
          font-size: 13px;
          font-weight: 700;
          color: var(--navy);
          margin: 0 0 8px;
        }
        .sv-target-list {
          list-style: none;
          padding: 0;
          margin: 0 0 24px;
          display: grid;
          gap: 8px;
        }
        .sv-target-item {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.75;
          display: flex;
          gap: 8px;
          align-items: flex-start;
        }
        .sv-target-mark {
          color: var(--accent);
          font-weight: 700;
          flex-shrink: 0;
        }

        /* ===== Deliverable block ===== */
        .sv-deliverable {
          background: var(--bg);
          border: 1px solid var(--line-soft);
          border-radius: 8px;
          padding: 16px 20px;
          margin: 0 0 28px;
        }
        .sv-deliverable-head {
          font-size: 13px;
          font-weight: 700;
          color: var(--navy);
          margin: 0 0 8px;
        }
        .sv-deliverable-body {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.85;
          margin: 0;
        }

        /* ===== Service mini-cards ===== */
        .sv-card-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }
        .sv-card {
          background: var(--white);
          border: 1px solid var(--line-soft);
          border-radius: 10px;
          padding: 20px 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          text-decoration: none;
          transition: box-shadow 0.15s;
        }
        .sv-bg-cream .sv-card {
          background: var(--white);
        }
        .sv-bg-white .sv-card {
          background: var(--cream);
          border-color: transparent;
        }
        .sv-card:hover { box-shadow: 0 4px 14px rgba(0,0,0,0.07); }
        .sv-card-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--navy);
          line-height: 1.4;
          margin: 0;
        }
        .sv-card-desc {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.75;
          margin: 0;
          flex: 1;
        }
        .sv-card-link {
          font-size: 13px;
          color: var(--accent);
          font-weight: 600;
          margin-top: 4px;
        }

        /* ===== Companion text list ===== */
        .sv-text-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 12px;
        }
        .sv-text-list-item {
          font-size: 15px;
          color: var(--muted);
          line-height: 1.75;
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .sv-text-list-item a {
          color: var(--accent);
          font-weight: 600;
          text-decoration: none;
        }
        .sv-text-list-item a:hover { text-decoration: underline; }
        .sv-companion-note {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.85;
          margin: 20px 0 0;
          border-left: 2px solid var(--line-soft);
          padding-left: 16px;
        }

        /* ===== CTA section ===== */
        .sv-cta-wrap {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }
        .sv-cta-h2 {
          font-size: clamp(18px, 3vw, 26px);
          color: var(--white);
          font-weight: 700;
          line-height: 1.45;
          margin: 0 0 16px;
        }
        .sv-cta-body {
          font-size: 15px;
          color: rgba(255,255,255,0.85);
          line-height: 1.85;
          margin: 0 0 32px;
        }
        .sv-cta-btns {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
        }
        .sv-btn-primary {
          background: var(--white);
          color: var(--navy) !important;
          padding: 14px 28px;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
          transition: opacity 0.15s;
        }
        .sv-btn-primary:hover { opacity: 0.9; }
        .sv-btn-outline {
          color: var(--white) !important;
          border: 1.5px solid rgba(255,255,255,0.6);
          padding: 14px 28px;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
          transition: background 0.15s;
        }
        .sv-btn-outline:hover { background: rgba(255,255,255,0.08); }
      `}</style>

      {/* Section 1: ページヘッダー */}
      <section className="sv-section sv-bg-bg">
        <div className="sv-section-inner narrow">
          <span className="sv-eyebrow">Services</span>
          <h1 className="sv-h1">状況に応じて選べる、3つの支援</h1>
          <p className="sv-lead">
            まず現状を整理したいとき。<br />
            毎月の数字を判断に使いやすい形へ整えたいとき。<br />
            重要な経営判断に、継続して伴走してほしいとき。<br /><br />
            九十九アドバイザリーでは、そうした段階に応じて、支援を3つに分けています。
          </p>
        </div>
      </section>

      {/* Section 2: 3分類の全体図 */}
      <section className="sv-section sv-bg-white">
        <div className="sv-section-inner">
          <h2 className="sv-h2">まず整理する。毎月整える。必要に応じて伴走する。</h2>
          <p className="sv-body">
            最初から大きな支援を前提にする必要はありません。<br />
            いま必要なところから始められるように、支援を3つに整理しています。
          </p>
          <div className="sv-flow">
            <span className="sv-flow-step">A. 診断支援</span>
            <span className="sv-flow-arrow">→</span>
            <span className="sv-flow-step">B. 月次整理支援</span>
            <span className="sv-flow-arrow">→</span>
            <span className="sv-flow-step">C. 継続支援・伴走</span>
          </div>
        </div>
      </section>

      {/* Section 3: 診断支援 */}
      <section className="sv-section sv-bg-cream">
        <div className="sv-section-inner">
          <h2 className="sv-h2">A. まず現状を整理する診断支援</h2>
          <p className="sv-h2-sub">何が問題なのか、どこから手をつけるべきかを明確にしたい会社へ。</p>

          <p className="sv-target-head">こんな状況に</p>
          <ul className="sv-target-list">
            <li className="sv-target-item"><span className="sv-target-mark">—</span><span>利益は出ているのに現金が残らない</span></li>
            <li className="sv-target-item"><span className="sv-target-mark">—</span><span>何から手をつければよいかわからない</span></li>
            <li className="sv-target-item"><span className="sv-target-mark">—</span><span>まずは今の数字を一度整理したい</span></li>
          </ul>

          <div className="sv-deliverable">
            <p className="sv-deliverable-head">何が届くか</p>
            <p className="sv-deliverable-body">
              現状の数字を整理し、気をつけるべき点や次に見るべき論点をまとめた資料をお返しします。
              全体像をつかみ、最初の一歩を決めたい会社に向いています。
            </p>
          </div>

          <p className="sv-target-head">対応サービス</p>
          <div className="sv-card-grid">
            <Link href="/seizo/" className="sv-card">
              <p className="sv-card-title">財務健康診断</p>
              <p className="sv-card-desc">会社全体の数字を整理し、優先的に見るべき論点を明確にします。</p>
              <span className="sv-card-link">詳しく見る →</span>
            </Link>
            <Link href="/cashflow/" className="sv-card">
              <p className="sv-card-title">資金繰り診断</p>
              <p className="sv-card-desc">現金の流れを整理し、どこに無理が出やすいかを見える形にします。</p>
              <span className="sv-card-link">詳しく見る →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: 月次整理支援 */}
      <section className="sv-section sv-bg-white">
        <div className="sv-section-inner">
          <h2 className="sv-h2">B. 月次の数字を、判断しやすい形へ整える支援</h2>
          <p className="sv-h2-sub">毎月の数字や資料を、見るためのものではなく、使うためのものへ。</p>

          <p className="sv-target-head">こんな状況に</p>
          <ul className="sv-target-list">
            <li className="sv-target-item"><span className="sv-target-mark">—</span><span>毎月の数字が経営判断に活かせていない</span></li>
            <li className="sv-target-item"><span className="sv-target-mark">—</span><span>銀行や社内への説明資料が弱い</span></li>
            <li className="sv-target-item"><span className="sv-target-mark">—</span><span>資料づくりに時間がかかっている</span></li>
          </ul>

          <div className="sv-deliverable">
            <p className="sv-deliverable-head">何が届くか</p>
            <p className="sv-deliverable-body">
              資金の流れや月次の数字を、社内で見返しやすく、
              必要に応じて銀行説明にも使いやすい形へ整理した資料をお返しします。
              数字を集めるところまではできているが、その先の使い方まで整えたい会社に向いています。
            </p>
          </div>

          <p className="sv-target-head">対応サービス</p>
          <div className="sv-card-grid">
            <Link href="/cashflow/" className="sv-card">
              <p className="sv-card-title">資金繰り整理</p>
              <p className="sv-card-desc">月次の資金の流れを整理し、毎月確認しやすい形へ整えます。</p>
              <span className="sv-card-link">詳しく見る →</span>
            </Link>
            <Link href="/bank-plan/" className="sv-card">
              <p className="sv-card-title">銀行向け事業計画</p>
              <p className="sv-card-desc">銀行や社内への説明に使いやすい計画資料を整えます。</p>
              <span className="sv-card-link">詳しく見る →</span>
            </Link>
            <Link href="/monthly-review/" className="sv-card">
              <p className="sv-card-title">月次経営レビュー</p>
              <p className="sv-card-desc">月に一度、数字を一緒に読み解き、次の判断と行動を整理する時間をつくります。</p>
              <span className="sv-card-link">詳しく見る →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: 伴走支援 */}
      <section className="sv-section sv-bg-cream">
        <div className="sv-section-inner">
          <h2 className="sv-h2">C. 重要な経営判断に伴走する支援</h2>
          <p className="sv-h2-sub">単発の整理だけで終わらせず、数字を見ながら次の一手まで考えたい会社へ。</p>

          <p className="sv-target-head">こんな状況に</p>
          <ul className="sv-target-list">
            <li className="sv-target-item"><span className="sv-target-mark">—</span><span>数字を見ながら次の一手を整理したい</span></li>
            <li className="sv-target-item"><span className="sv-target-mark">—</span><span>会議や月次の振り返りを経営判断につなげたい</span></li>
            <li className="sv-target-item"><span className="sv-target-mark">—</span><span>継続的に伴走してほしい</span></li>
          </ul>

          <div className="sv-deliverable">
            <p className="sv-deliverable-head">何が届くか</p>
            <p className="sv-deliverable-body">
              月次の論点整理から、継続して見るべき指標の整理、
              会議で確認すべきテーマの設計まで、状況に応じて対応します。
              社内だけでは判断整理が進みにくく、外部の視点も入れながら進めたい会社に向いています。
            </p>
          </div>

          <p className="sv-target-head">対応支援</p>
          <ul className="sv-text-list">
            <li className="sv-text-list-item">
              <span className="sv-target-mark">—</span>
              <span><Link href="/monthly-review/">月次経営レビュー</Link> — 月に一度、数字を一緒に読み解き、判断と行動を整理します。</span>
            </li>
            <li className="sv-text-list-item">
              <span className="sv-target-mark">—</span>
              <span><Link href="/contact/">継続支援・会議設計などのご相談</Link> — 月次の数字を起点に、経営判断を進めやすい継続支援を行っています。具体的な内容はお問い合わせください。</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Section 6: 支援の流れ */}
      <section className="sv-section sv-bg-white">
        <div className="sv-section-inner">
          <h2 className="sv-h2">支援は、必要に応じて段階的に深められます</h2>
          <p className="sv-body">
            まずは診断で現状を整理する。<br />
            次に、毎月の数字や資料を使いやすい形へ整える。<br />
            必要に応じて、継続的な伴走支援へ進む。
          </p>
          <p className="sv-body">
            九十九アドバイザリーでは、この流れを前提に、<br />
            いまの状況に合うところからご相談いただけるようにしています。
          </p>
          <div className="sv-flow">
            <span className="sv-flow-step">診断支援</span>
            <span className="sv-flow-arrow">→</span>
            <span className="sv-flow-step">月次整理支援</span>
            <span className="sv-flow-arrow">→</span>
            <span className="sv-flow-step">継続支援・伴走</span>
          </div>
        </div>
      </section>

      {/* Section 7: 最終CTA */}
      <section className="sv-section sv-bg-navy">
        <div className="sv-cta-wrap">
          <h2 className="sv-cta-h2">
            どれが自社に合うかわからない場合も、<br />
            そのままフォームからお送りください
          </h2>
          <p className="sv-cta-body">
            ご相談内容を確認し、内容に応じてご案内いたします。<br />
            まだ課題が整理しきれていない段階でも問題ありません。
          </p>
          <div className="sv-cta-btns">
            <Link href="/contact/" className="sv-btn-primary">
              お問い合わせフォームへ
            </Link>
            <Link href="/" className="sv-btn-outline">
              トップページを見る
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
