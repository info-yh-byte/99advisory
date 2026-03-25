'use client';

import { useMemo, useState } from 'react';

const FAQS = [
  {
    q: '資料だけ受け取って、診断を申し込まなくても問題ありませんか？',
    a: '問題ありません。資料をご覧いただいて、「自社に合わない」と判断されても構いません。診断の申し込みはご自身のタイミングで、任意でお選びください。'
  },
  {
    q: '数字がまだ整っていなくても診断を受けられますか？',
    a: '受けられます。「数字が整っていない状態」そのものが診断の対象です。試算表がない、案件別の管理をしていない、という状態でも進められます。事前に特別な準備は不要です。'
  },
  {
    q: '税理士がいます。診断を受ける意味はありますか？',
    a: 'あります。税理士は申告の専門家であり、管理会計の構築や経営判断の伴走は業務範囲外であることがほとんどです。本診断は「試算表を経営判断に使える状態にすること」が目的で、既存の税理士との役割は重複しません。税理士を変える必要もありません。'
  }
];

const INITIAL_FORM = {
  company: '',
  industry: '',
  revenue: '',
  email: ''
};

export default function SeizoPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const canSubmit = useMemo(() => {
    return form.company && form.industry && form.revenue && form.email && !isSubmitting;
  }, [form, isSubmitting]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setIsSuccess(false);

    try {
      const res = await fetch('/api/form-submit/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceSlug: 'seizo',
          formType: 'seizo_download',
          ...form
        })
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.detail || data.error || '送信に失敗しました');
      }

      setIsSuccess(true);
      setMessage('ご登録ありがとうございます。ご入力いただいたメールアドレスに資料をお送りしました。届かない場合は迷惑メールフォルダもご確認ください。');
      setForm(INITIAL_FORM);
    } catch (error) {
      setIsSuccess(false);
      setMessage(error.message || '送信に失敗しました。時間を置いて再度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  }

  function toggleFaq(index) {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  }

  return (
    <div className="seizo-page">
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-glow" />

        <div className="hero-inner">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            <span className="eyebrow-text">製造業・建設業・受託加工業の経営者へ</span>
          </div>

          <h1 className="hero-title">
            現場は動いている。<br />
            なのに、<em>利益が残らない。</em>
          </h1>

          <p className="hero-body">
            その原因は、数字が悪いからではなく、
            <br />
            数字が経営判断に使える形で整理されていないからかもしれません。
            <br />
            60分のヒアリングで、御社の構造を整理します。
          </p>

          <div className="hero-actions">
            <a href="#form" className="hero-button">
              サンプルレポートと診断概要を受け取る
            </a>
            <span className="hero-note">
              メールアドレスにサンプルと診断の詳細をお送りします
            </span>
          </div>

          <div className="hero-price">
            診断料金：<strong>98,800円（税別）</strong> ／ 詳細は資料でご確認いただけます
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="wrap">
          <div className="section-label">
            <span className="section-line" />
            <span className="section-text">こんな違和感ありませんか</span>
          </div>
          <h2 className="section-title">
            当てはまるなら、
            <br />
            対象の会社です
          </h2>

          <div className="symptom-list">
            <div className="symptom-item">
              <span className="symptom-dot" />
              <div className="symptom-text">
                <strong>忙しいのに、お金が増えている実感がない</strong>
                受注は悪くない。現場も動いている。でも決算を見たら利益が減っていた。
              </div>
            </div>

            <div className="symptom-item">
              <span className="symptom-dot" />
              <div className="symptom-text">
                <strong>案件ごとに、どこで粗利が削られているか見えない</strong>
                現場の報告書は出る。でも、その案件でいくら残ったかは誰も計算していない。
              </div>
            </div>

            <div className="symptom-item">
              <span className="symptom-dot" />
              <div className="symptom-text">
                <strong>試算表は届くが、次の打ち手が決まらない</strong>
                月末に数字を確認する。「そうか」で終わる。何を変えればいいか分からない。
              </div>
            </div>

            <div className="symptom-item">
              <span className="symptom-dot" />
              <div className="symptom-text">
                <strong>月末の資金繰りが、社長の勘に依存している</strong>
                支払いと入金のタイミングがずれる。足りなければ社長が補填する。これを繰り返している。
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="wrap">
          <div className="section-label">
            <span className="section-line" />
            <span className="section-text">診断で受け取るもの</span>
          </div>
          <h2 className="section-title">
            60分ヒアリング後、
            <br />
            9ページのレポートを5営業日前後で納品
          </h2>
          <p className="section-sub">
            一般論は書きません。ヒアリングで確認した御社の事実をもとに、御社について書いたレポートです。
          </p>

          <div className="card-grid">
            <div className="card">
              <div className="card-no">01</div>
              <div className="card-title">社長向け1ページ要約</div>
              <div className="card-body">
                最重要課題と今すぐやること1つ。忙しい経営者が最初に読むページ。
              </div>
            </div>

            <div className="card">
              <div className="card-no">02</div>
              <div className="card-title">4軸スコアカード＋課題の構造</div>
              <div className="card-body">
                数字の整備・読み方・意思決定接続・資金繰りを5段階採点。なぜそうなっているかの構造まで示す。
              </div>
            </div>

            <div className="card">
              <div className="card-no">03</div>
              <div className="card-title">30日以内の初動アクション3つ</div>
              <div className="card-body">
                「誰が・何を・どの単位で」着手するかまで書く。「強化する」「検討する」は書かない。
              </div>
            </div>
          </div>

          <div className="price-box">
            <div className="price-box-left">
              ヒアリング60分 ＋ 9ページレポート ＋ 納品後の確認面談（60分）
              <br />
              <span className="price-box-note">お申し込み後にご請求書をお送りします</span>
            </div>
            <div className="price-box-right">
              98,800<span>円（税別）</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-stone">
        <div className="wrap">
          <div className="section-label">
            <span className="section-line" />
            <span className="section-text">対象について</span>
          </div>
          <h2 className="section-title">
            向いている会社・
            <br />
            向いていない会社
          </h2>

          <div className="fit-grid">
            <div className="fit-col fit-yes">
              <div className="fit-head">✓ 向いている会社</div>
              <div className="fit-item">✓ 製造・建設・設備工事・受託加工業、年商1.5億〜10億円前後</div>
              <div className="fit-item">✓ 案件ごとの採算を誰も把握できていない</div>
              <div className="fit-item">✓ 試算表はあるが、経営判断につながっていない</div>
              <div className="fit-item">✓ 税理士は申告のみで、経営の相談先がいない</div>
              <div className="fit-item">✓ 数字がまだ整っていなくても大丈夫です</div>
            </div>

            <div className="fit-col fit-no">
              <div className="fit-head">× 向いていない会社</div>
              <div className="fit-item">× 税務申告や節税相談だけを求めている</div>
              <div className="fit-item">× 案件別採算管理がすでに回っている</div>
              <div className="fit-item">× 料金だけ知りたい、無料でアドバイスが欲しい</div>
              <div className="fit-item">× 現状を変えることへの意欲がない</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-navy">
        <div className="wrap">
          <div className="section-label">
            <span className="section-line" />
            <span className="section-text">診断チームについて</span>
          </div>
          <h2 className="section-title white">
            3つの役割で、
            <br />
            チームが診断します
          </h2>
          <p className="section-sub white-sub">
            一人の担当者が全部見るのではなく、財務・業種・分析の専門性を持つメンバーが分担して診断します。
          </p>

          <div className="team-list">
            <div className="team-item">
              <div className="team-left">
                <div className="team-role">診断設計責任者</div>
                <div className="team-title">公認会計士<br />論文式試験合格者</div>
              </div>
              <div className="team-right">
                ITコンサルティングに7年、マーケティングコンサルティングに3年従事。その後、財務面から複数社の支援に関与し、数字を経営判断につなげるための整理・分析・改善提案を行っている。本診断では、全体の論点設計とレポート統括を担当。
              </div>
            </div>

            <div className="team-item">
              <div className="team-left">
                <div className="team-role">財務分析担当</div>
                <div className="team-title">財務分析・<br />管理会計専門</div>
              </div>
              <div className="team-right">
                管理会計・財務分析に強みを持つメンバーが、ヒアリング内容と数値情報をもとに課題構造と優先順位を整理します。スコアカードの採点と機会損失の試算を担当。
              </div>
            </div>

            <div className="team-item">
              <div className="team-left">
                <div className="team-role">業種別アドバイザー</div>
                <div className="team-title">製造・建設業<br />コンサル経験者</div>
              </div>
              <div className="team-right">
                製造業・建設業での実務およびコンサルティング経験を持つメンバーが、案件別採算・外注費管理・工程管理など業種固有の論点を診断に反映します。
              </div>
            </div>
          </div>

          <div className="team-note">
            申告のために数字を作る会社は多いですが、経営判断のために数字を使えている会社は多くありません。
            私たちはそのズレを埋めることに特化しています。税理士を変える必要はありません。
          </div>
        </div>
      </section>

      <section className="section section-form" id="form">
        <div className="wrap">
          <div className="section-label">
            <span className="section-line" />
            <span className="section-text">資料を受け取る</span>
          </div>
          <h2 className="section-title white">
            サンプルレポートと
            <br />
            診断概要を受け取る
          </h2>
          <p className="section-sub white-sub">
            メールアドレスをご登録ください。診断の詳細・サンプルレポート・料金・よくある質問をまとめた資料をお送りします。
          </p>

          <div className="form-what">
            <div className="form-what-item">診断の全体の流れ（事前フォーム→ヒアリング→レポート→確認面談）</div>
            <div className="form-what-item">9ページレポートのサンプル（匿名事例）</div>
            <div className="form-what-item">料金・キャンセルポリシー・よくある質問</div>
          </div>

          <div className="form-box">
            <div className="form-caption">
              業種と売上規模をもとに、御社に合わせた内容でお送りします。所要1分程度です。
            </div>

            <form onSubmit={handleSubmit}>
              <input type="hidden" name="serviceSlug" value="seizo" />
              <input type="hidden" name="formType" value="seizo_download" />

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    会社名 <span className="req">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="company"
                    placeholder="株式会社〇〇"
                    value={form.company}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    業種 <span className="req">*</span>
                  </label>
                  <select
                    className="form-control"
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>選択してください</option>
                    <option value="建設・設備工事業">建設・設備工事業</option>
                    <option value="製造業（受託加工）">製造業（受託加工）</option>
                    <option value="製造業（自社製品）">製造業（自社製品）</option>
                    <option value="設備・プラント工事業">設備・プラント工事業</option>
                    <option value="その他受託業">その他受託業</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    売上規模 <span className="req">*</span>
                  </label>
                  <select
                    className="form-control"
                    name="revenue"
                    value={form.revenue}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>選択してください</option>
                    <option value="1.5億〜3億円">1.5億〜3億円</option>
                    <option value="3億〜5億円">3億〜5億円</option>
                    <option value="5億〜10億円">5億〜10億円</option>
                    <option value="10億円以上">10億円以上</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    メールアドレス <span className="req">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="info@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button className="submit-button" type="submit" disabled={!canSubmit}>
                {isSubmitting ? '送信中…' : 'サンプルレポートと診断概要を受け取る'}
              </button>
            </form>

            <div className="form-meta">
              受付後、自動でメールをお送りします。届かない場合は迷惑メールフォルダもご確認ください。<br />
              <a href="/privacy/" className="meta-link">プライバシーポリシー</a> に同意のうえご送信ください。
            </div>

            {message ? (
              <div className={`submit-message ${isSuccess ? 'success' : 'error'}`}>
                {message}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="wrap">
          <div className="section-label">
            <span className="section-line" />
            <span className="section-text">よくある質問</span>
          </div>
          <h2 className="section-title">FAQ</h2>

          <div className="faq-list">
            {FAQS.map((item, index) => {
              const open = openFaqIndex === index;
              return (
                <div className={`faq-item ${open ? 'open' : ''}`} key={item.q}>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-icon">{open ? '−' : '+'}</span>
                  </button>

                  {open ? (
                    <div className="faq-answer">
                      <div className="faq-answer-inner">{item.a}</div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style jsx>{`
        .seizo-page {
          background: #faf8f4;
          color: #1c1917;
        }

        .hero {
          min-height: 100vh;
          background: #111e30;
          display: flex;
          align-items: center;
          position: relative;
          padding-top: 56px;
          overflow: hidden;
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(184, 150, 62, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(184, 150, 62, 0.04) 1px, transparent 1px);
          background-size: 52px 52px;
        }

        .hero-glow {
          position: absolute;
          width: 640px;
          height: 640px;
          right: -80px;
          top: 50%;
          transform: translateY(-50%);
          background: radial-gradient(circle, rgba(184, 150, 62, 0.07) 0%, transparent 65%);
          pointer-events: none;
        }

        .hero-inner,
        .wrap {
          position: relative;
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .hero-inner {
          padding-top: 88px;
          padding-bottom: 88px;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 32px;
        }

        .eyebrow-line,
        .section-line {
          width: 24px;
          height: 1px;
          background: #b8963e;
          flex-shrink: 0;
        }

        .eyebrow-text,
        .section-text {
          font-size: 11px;
          font-weight: 700;
          color: #b8963e;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .hero-title {
          font-family: serif;
          font-size: clamp(30px, 4.6vw, 54px);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.5;
          margin: 0 0 24px;
        }

        .hero-title em {
          font-style: normal;
          color: #b8963e;
        }

        .hero-body {
          font-size: clamp(14px, 1.6vw, 16px);
          color: rgba(255, 255, 255, 0.58);
          font-weight: 300;
          line-height: 2;
          max-width: 500px;
          margin: 0 0 44px;
        }

        .hero-actions {
          margin-bottom: 36px;
        }

        .hero-button {
          display: inline-block;
          background: #b8963e;
          color: #111e30;
          font-size: 15px;
          font-weight: 700;
          padding: 18px 40px;
          border: none;
          cursor: pointer;
          letter-spacing: 0.06em;
          text-decoration: none;
          transition: all 0.22s;
        }

        .hero-button:hover {
          background: #d4b060;
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(184, 150, 62, 0.4);
        }

        .hero-note {
          display: block;
          margin-top: 10px;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.3);
          letter-spacing: 0.04em;
        }

        .hero-price {
          padding-top: 36px;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          font-size: 13px;
          color: rgba(255, 255, 255, 0.38);
        }

        .hero-price strong {
          color: rgba(255, 255, 255, 0.66);
        }

        .section {
          position: relative;
        }

        .section-cream {
          background: #faf8f4;
          border-top: 1px solid #e7e5e4;
        }

        .section-white {
          background: #ffffff;
          border-top: 1px solid #e7e5e4;
        }

        .section-stone {
          background: #f0ede7;
          border-top: 1px solid #e7e5e4;
        }

        .section-navy {
          background: #1b2e4b;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .section-form {
          background: #111e30;
          border-top: 1px solid rgba(184, 150, 62, 0.15);
          position: relative;
          overflow: hidden;
        }

        .section-form::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(184, 150, 62, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(184, 150, 62, 0.03) 1px, transparent 1px);
          background-size: 52px 52px;
        }

        .wrap {
          padding-top: 80px;
          padding-bottom: 80px;
        }

        .section-label {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 16px;
        }

        .section-title {
          font-family: serif;
          font-size: clamp(22px, 3vw, 34px);
          font-weight: 700;
          color: #1b2e4b;
          line-height: 1.5;
          margin: 0 0 12px;
        }

        .section-title.white {
          color: #ffffff;
        }

        .section-sub {
          font-size: 14px;
          color: #57534e;
          line-height: 1.9;
          max-width: 580px;
          margin: 0;
        }

        .white-sub {
          color: rgba(255, 255, 255, 0.45);
        }

        .symptom-list {
          margin-top: 36px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .symptom-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 18px 22px;
          background: #ffffff;
          border-left: 3px solid transparent;
          transition: border-color 0.25s;
        }

        .symptom-item:hover {
          border-left-color: #b8963e;
        }

        .symptom-dot {
          width: 7px;
          height: 7px;
          background: #b8963e;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 7px;
        }

        .symptom-text {
          font-size: 14px;
          color: #1c1917;
          line-height: 1.75;
        }

        .symptom-text strong {
          display: block;
          font-size: 15px;
          color: #1b2e4b;
          margin-bottom: 3px;
        }

        .card-grid {
          margin-top: 40px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }

        .card {
          background: #f0ede7;
          padding: 28px 24px;
        }

        .card-no {
          font-family: serif;
          font-size: 40px;
          color: #d6d3d1;
          line-height: 1;
          margin-bottom: 12px;
        }

        .card-title {
          font-size: 14px;
          font-weight: 700;
          color: #1b2e4b;
          margin-bottom: 6px;
          line-height: 1.5;
        }

        .card-body {
          font-size: 12px;
          color: #57534e;
          line-height: 1.85;
        }

        .price-box {
          margin-top: 28px;
          padding: 22px 28px;
          background: #1b2e4b;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .price-box-left {
          color: rgba(255, 255, 255, 0.65);
          font-size: 13px;
          line-height: 1.7;
        }

        .price-box-note {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.35);
        }

        .price-box-right {
          font-family: serif;
          font-size: 36px;
          color: #ffffff;
          line-height: 1;
        }

        .price-box-right span {
          font-family: sans-serif;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.4);
        }

        .fit-grid {
          margin-top: 36px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
        }

        .fit-col {
          padding: 28px 26px;
        }

        .fit-yes {
          background: #ffffff;
        }

        .fit-no {
          background: #faf8f4;
          opacity: 0.9;
        }

        .fit-head {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          margin-bottom: 14px;
        }

        .fit-yes .fit-head {
          color: #27ae60;
        }

        .fit-no .fit-head {
          color: #a8a29e;
        }

        .fit-item {
          font-size: 13px;
          color: #1c1917;
          line-height: 1.7;
          margin-bottom: 8px;
        }

        .team-list {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .team-item {
          display: grid;
          grid-template-columns: 200px 1fr;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(184, 150, 62, 0.1);
        }

        .team-left {
          padding: 28px 24px;
          border-right: 1px solid rgba(255, 255, 255, 0.06);
        }

        .team-role {
          font-size: 10px;
          font-weight: 700;
          color: #b8963e;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .team-title {
          font-family: serif;
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.5;
        }

        .team-right {
          padding: 28px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.9;
        }

        .team-note {
          margin-top: 28px;
          padding: 22px 26px;
          border-left: 3px solid #b8963e;
          background: rgba(184, 150, 62, 0.05);
          font-size: 14px;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.9;
          font-style: italic;
        }

        .form-what {
          margin-top: 28px;
          margin-bottom: 36px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-what-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.65);
        }

        .form-what-item::before {
          content: '✓';
          color: #b8963e;
          font-size: 12px;
          font-weight: 700;
        }

        .form-box {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(184, 150, 62, 0.15);
          padding: 40px;
        }

        .form-caption {
          margin-bottom: 24px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.35);
          line-height: 1.8;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 11px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 0.1em;
        }

        .req {
          color: #ef9a9a;
          margin-left: 2px;
        }

        .form-control {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-size: 14px;
          padding: 13px 14px;
          outline: none;
          width: 100%;
        }

        .form-control:focus {
          border-color: #b8963e;
        }

        .form-control option {
          background: #111e30;
          color: #ffffff;
        }

        .submit-button {
          margin-top: 24px;
          width: 100%;
          background: #b8963e;
          color: #111e30;
          font-size: 15px;
          font-weight: 700;
          padding: 18px;
          border: none;
          cursor: pointer;
          letter-spacing: 0.07em;
          transition: all 0.22s;
        }

        .submit-button:hover:enabled {
          background: #d4b060;
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(184, 150, 62, 0.4);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .form-meta {
          margin-top: 12px;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.22);
          text-align: center;
          line-height: 1.9;
        }

        .meta-link {
          color: rgba(255, 255, 255, 0.45);
          text-decoration: underline;
        }

        .submit-message {
          margin-top: 18px;
          padding: 14px 16px;
          font-size: 13px;
          line-height: 1.8;
          border: 1px solid transparent;
        }

        .submit-message.success {
          background: rgba(34, 197, 94, 0.12);
          border-color: rgba(34, 197, 94, 0.3);
          color: #d1fae5;
        }

        .submit-message.error {
          background: rgba(239, 68, 68, 0.12);
          border-color: rgba(239, 68, 68, 0.28);
          color: #fecaca;
        }

        .faq-list {
          margin-top: 36px;
        }

        .faq-item {
          border-bottom: 1px solid #e7e5e4;
        }

        .faq-question {
          width: 100%;
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 0;
          cursor: pointer;
          gap: 16px;
          color: #1b2e4b;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.6;
          text-align: left;
        }

        .faq-icon {
          width: 26px;
          height: 26px;
          border: 1px solid #e7e5e4;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #b8963e;
          flex-shrink: 0;
        }

        .faq-answer {
          padding-bottom: 20px;
        }

        .faq-answer-inner {
          font-size: 13px;
          color: #57534e;
          line-height: 1.9;
          max-width: 700px;
        }

        @media (max-width: 768px) {
          .hero-inner,
          .wrap {
            padding-left: 18px;
            padding-right: 18px;
          }

          .hero-title {
            font-size: clamp(26px, 7.5vw, 38px);
          }

          .card-grid,
          .fit-grid,
          .form-row {
            grid-template-columns: 1fr;
          }

          .team-item {
            grid-template-columns: 1fr;
          }

          .team-left {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          }

          .form-box {
            padding: 24px 18px;
          }

          .price-box {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
