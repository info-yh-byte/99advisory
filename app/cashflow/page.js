'use client';

import { useMemo, useState } from 'react';

const FAQS = [
  {
    q: 'まだ数字が整っていなくても相談できますか？',
    a: 'できます。むしろ、数字が整理されていない状態そのものが支援対象です。試算表の見方、資金繰りの把握、確認すべき優先順位から整理します。'
  },
  {
    q: '税理士がいても依頼する意味はありますか？',
    a: 'あります。税理士は申告や記帳の専門家であり、資金繰り改善の優先順位づけや、経営判断の伴走までは業務範囲外であることが多いです。役割は重複しません。'
  },
  {
    q: '資料請求だけでも問題ありませんか？',
    a: '問題ありません。まずは資料を見て、自社に合うかどうかを判断してください。申し込みは任意です。'
  }
];

const INITIAL_FORM = {
  company: '',
  issue: '',
  email: ''
};

export default function CashflowPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const canSubmit = useMemo(() => {
    return form.company && form.issue && form.email && !isSubmitting;
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
          serviceSlug: 'cashflow',
          formType: 'cashflow_download',
          ...form
        })
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.detail || data.error || '送信に失敗しました');
      }

      setIsSuccess(true);
      setMessage('送信が完了しました。メールをご確認ください。');
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
    <div className="cashflow-page">
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-glow" />

        <div className="hero-inner">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            <span className="eyebrow-text">利益は出ているのに現金が残らない会社へ</span>
          </div>

          <h1 className="hero-title">
            黒字なのに、<br />
            <em>資金繰りが苦しい。</em>
          </h1>

          <p className="hero-body">
            利益と現金がずれる原因は、数字が悪いことよりも、
            <br />
            資金繰りの構造が整理されていないことにあります。
            <br />
            まずは、どこで現金が減っているのかを見える化します。
          </p>

          <div className="hero-actions">
            <a href="#form" className="hero-button">
              資料を受け取る
            </a>
            <span className="hero-note">
              メールアドレスに支援内容と進め方をお送りします
            </span>
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="wrap">
          <div className="section-label">
            <span className="section-line" />
            <span className="section-text">こんな状態なら対象です</span>
          </div>
          <h2 className="section-title">
            当てはまるなら、
            <br />
            一度整理する価値があります
          </h2>

          <div className="symptom-list">
            <div className="symptom-item">
              <span className="symptom-dot" />
              <div className="symptom-text">
                <strong>利益は出ているのに、月末の残高が不安</strong>
                試算表では黒字でも、口座残高に余裕がなく、常に資金繰りが気になる。
              </div>
            </div>

            <div className="symptom-item">
              <span className="symptom-dot" />
              <div className="symptom-text">
                <strong>入金と支払いのズレが大きい</strong>
                売上は立っているが、回収前に支払いが先に来て苦しくなる。
              </div>
            </div>

            <div className="symptom-item">
              <span className="symptom-dot" />
              <div className="symptom-text">
                <strong>どこに資金が詰まっているのか分からない</strong>
                在庫、売掛金、借入返済、外注費など、どこを先に見るべきか整理できていない。
              </div>
            </div>

            <div className="symptom-item">
              <span className="symptom-dot" />
              <div className="symptom-text">
                <strong>資金繰りが社長の勘に依存している</strong>
                「今月はなんとかいけそう」で回していて、3か月先の見通しが弱い。
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="wrap">
          <div className="section-label">
            <span className="section-line" />
            <span className="section-text">受け取れるもの</span>
          </div>
          <h2 className="section-title">
            現金が残らない原因を、
            <br />
            構造で整理します
          </h2>
          <p className="section-sub">
            単なる一般論ではなく、御社の状況に合わせて「どこから見直すか」を整理するための資料と支援イメージをお送りします。
          </p>

          <div className="card-grid">
            <div className="card">
              <div className="card-no">01</div>
              <div className="card-title">よくある資金繰り悪化パターン</div>
              <div className="card-body">
                利益と現金のズレが起きる典型パターンを整理します。
              </div>
            </div>

            <div className="card">
              <div className="card-no">02</div>
              <div className="card-title">確認すべき数字の優先順位</div>
              <div className="card-body">
                まず何を見るべきか、売掛・在庫・借入・返済などの視点で整理します。
              </div>
            </div>

            <div className="card">
              <div className="card-no">03</div>
              <div className="card-title">初回相談の進め方</div>
              <div className="card-body">
                初回ヒアリングで何を確認し、どこまで整理するかの流れをお送りします。
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-stone">
        <div className="wrap">
          <div className="section-label">
            <span className="section-line" />
            <span className="section-text">向いている会社</span>
          </div>
          <h2 className="section-title">
            こんな会社に
            <br />
            向いています
          </h2>

          <div className="fit-grid">
            <div className="fit-col fit-yes">
              <div className="fit-head">✓ 向いている会社</div>
              <div className="fit-item">✓ 利益は出ているが、現金が残らない</div>
              <div className="fit-item">✓ 資金繰りの原因を構造で整理したい</div>
              <div className="fit-item">✓ 数字を見ているが、打ち手に落ちていない</div>
              <div className="fit-item">✓ 経営判断の優先順位を整理したい</div>
            </div>

            <div className="fit-col fit-no">
              <div className="fit-head">× 向いていない会社</div>
              <div className="fit-item">× 記帳代行だけを求めている</div>
              <div className="fit-item">× 節税相談だけを求めている</div>
              <div className="fit-item">× 無料で個別アドバイスだけ欲しい</div>
              <div className="fit-item">× 数字を見直す意思がない</div>
            </div>
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
            資金繰り改善の
            <br />
            概要資料を受け取る
          </h2>
          <p className="section-sub white-sub">
            会社情報と現在の悩みをご入力ください。支援内容と進め方をメールでお送りします。
          </p>

          <div className="form-box">
            <div className="form-caption">
              所要1分程度です。現在の悩みを簡単に書いていただければ十分です。
            </div>

            <form onSubmit={handleSubmit}>
              <input type="hidden" name="serviceSlug" value="cashflow" />
              <input type="hidden" name="formType" value="cashflow_download" />

              <div className="form-row one-col">
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
              </div>

              <div className="form-row one-col">
                <div className="form-group">
                  <label className="form-label">
                    現在の悩み <span className="req">*</span>
                  </label>
                  <textarea
                    className="form-control textarea"
                    name="issue"
                    placeholder="例：利益は出ているのに資金が残らず、毎月の支払い前に不安になります"
                    value={form.issue}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row one-col">
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
                {isSubmitting ? '送信中…' : '資料を受け取る'}
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
        .cashflow-page {
          background: #faf8f4;
          color: #1c1917;
        }

        .hero {
          min-height: 88vh;
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
          max-width: 560px;
          margin: 0 0 44px;
        }

        .hero-actions {
          margin-bottom: 20px;
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
          max-width: 620px;
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

        .form-row.one-col {
          grid-template-columns: 1fr;
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

        .textarea {
          min-height: 120px;
          resize: vertical;
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

          .form-box {
            padding: 24px 18px;
          }
        }
      `}</style>
    </div>
  );
}
