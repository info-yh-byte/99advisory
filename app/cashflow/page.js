'use client';

import { useMemo, useState } from 'react';

const SYMPTOMS = [
  {
    title: '利益は出ているのに、月末の残高が不安',
    body: '試算表では黒字でも、口座残高に余裕がなく、常に資金繰りが気になる状態です。'
  },
  {
    title: '入金と支払いのズレが大きい',
    body: '売上は立っているが、回収前に支払いが先に来て苦しくなる。売掛金や支払サイトの整理が弱い状態です。'
  },
  {
    title: 'どこに資金が詰まっているのか分からない',
    body: '在庫、売掛金、借入返済、外注費など、どこを先に見るべきか整理できていません。'
  },
  {
    title: '資金繰りが社長の勘に依存している',
    body: '「今月はなんとかいけそう」で回していて、3か月先の見通しが弱い状態です。'
  }
];

const CAUSES = [
  {
    title: '売掛金の回収が遅く、利益より先に現金が苦しくなる',
    body: '売上は立っていても、現金化まで時間がかかると、その間の支払いを先に負担することになります。'
  },
  {
    title: '在庫・仕掛・前払いが増え、現金が事業の中に滞留する',
    body: '利益計算上は見えにくくても、実際には現金が在庫や仕掛の形で寝ていることがあります。'
  },
  {
    title: '借入返済や投資支出が、利益以上に現金を減らしている',
    body: 'P/L上は黒字でも、返済や設備投資で現金が減ると、残高の不安は解消しません。'
  }
];

const NUMBERS = [
  {
    label: '01',
    title: '営業キャッシュフロー',
    body: '本業で現金を生めているかを確認する最初の数字です。'
  },
  {
    label: '02',
    title: '売掛金・在庫・買掛金の回転',
    body: '現金がどこで滞留しているかを把握するために見ます。'
  },
  {
    label: '03',
    title: '借入返済額と月次残高推移',
    body: '利益が出ていても現金が減る原因が、返済負担なのかを見極めます。'
  }
];

const SUPPORTS = [
  {
    title: '現状把握',
    body: '試算表、借入一覧、売掛・在庫状況などを見ながら、どこに資金が詰まっているかを整理します。'
  },
  {
    title: '構造整理',
    body: '利益と現金のズレを、御社固有の構造として言語化し、何がボトルネックかを明らかにします。'
  },
  {
    title: '優先順位づけ',
    body: '何から手を付けるべきかを、改善インパクトと実行しやすさの両面から整理します。'
  }
];

const DIFFERENCE_ROWS = [
  {
    item: '主な役割',
    tax: '記帳・申告・税務対応',
    advisory: '資金繰り構造の整理、優先順位づけ、経営判断の伴走'
  },
  {
    item: '見る数字',
    tax: '主に税務・決算数値',
    advisory: '現金残高、回収・支払サイト、借入返済、運転資金の流れ'
  },
  {
    item: 'アウトプット',
    tax: '決算書、申告書、月次試算表',
    advisory: '何が詰まりで、どこから直すべきかの整理'
  }
];

const FIT_YES = [
  '利益と現金のズレを整理したい会社',
  '社長の勘ではなく、数字で資金繰りを見たい会社',
  '借入・売掛・在庫のどこが重いかを把握したい会社'
];

const FIT_NO = [
  'とにかく今すぐ融資申請書だけ作りたい会社',
  '数字の整理ではなく、税務申告だけを求めている会社',
  '短期の資金手当てのみを外注したい会社'
];

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
    <div className="lp">
      <section className="hero dark">
        <div className="wrap narrow">
          <div className="eyebrow">利益は出ているのに現金が残らない会社へ</div>
          <h1>
            利益は出ているのに、<br />
            現金が残らない。
          </h1>
          <p className="lead">
            資金繰りの苦しさは、数字が悪いからではなく、
            利益と現金のズレが整理されていないことから起きる場合があります。
            まずは、どこで現金が減っているのかを構造で整理します。
          </p>
          <div className="hero-actions">
            <a href="#form" className="primary-btn">資料を受け取る</a>
            <div className="hero-note">メールアドレスに支援内容と進め方をお送りします</div>
          </div>
        </div>
      </section>

      <section className="section cream">
        <div className="wrap">
          <div className="section-kicker">こんな状態になっていませんか？</div>
          <h2>当てはまるなら、一度整理する価値があります</h2>
          <div className="stack">
            {SYMPTOMS.map((item) => (
              <div className="list-card" key={item.title}>
                <div className="dot" />
                <div>
                  <div className="list-title">{item.title}</div>
                  <div className="list-body">{item.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="wrap">
          <div className="section-kicker">構造の整理</div>
          <h2>「利益≠現金」になる3つの構造的な原因</h2>
          <div className="three-grid">
            {CAUSES.map((item) => (
              <div className="info-card" key={item.title}>
                <div className="card-title">{item.title}</div>
                <div className="card-body">{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section stone">
        <div className="wrap">
          <div className="section-kicker">まず見る数字</div>
          <h2>まず確認すべき3つの数字</h2>
          <div className="three-grid">
            {NUMBERS.map((item) => (
              <div className="metric-card" key={item.label}>
                <div className="metric-no">{item.label}</div>
                <div className="card-title">{item.title}</div>
                <div className="card-body">{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="wrap">
          <div className="section-kicker">支援内容</div>
          <h2>99advisoryの資金繰り改善サポート</h2>
          <div className="three-grid">
            {SUPPORTS.map((item) => (
              <div className="info-card" key={item.title}>
                <div className="card-title">{item.title}</div>
                <div className="card-body">{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cream">
        <div className="wrap">
          <div className="section-kicker">役割の違い</div>
          <h2>顧問税理士との違い</h2>
          <div className="table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>項目</th>
                  <th>顧問税理士</th>
                  <th>99advisory</th>
                </tr>
              </thead>
              <tbody>
                {DIFFERENCE_ROWS.map((row) => (
                  <tr key={row.item}>
                    <td>{row.item}</td>
                    <td>{row.tax}</td>
                    <td>{row.advisory}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="wrap">
          <div className="section-kicker">向き・不向き</div>
          <h2>このサービスが向いている会社・向いていない会社</h2>
          <div className="fit-grid">
            <div className="fit-col yes">
              <div className="fit-head">向いている会社</div>
              {FIT_YES.map((item) => (
                <div className="fit-item" key={item}>✓ {item}</div>
              ))}
            </div>
            <div className="fit-col no">
              <div className="fit-head">向いていない会社</div>
              {FIT_NO.map((item) => (
                <div className="fit-item" key={item}>− {item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="form" className="section dark">
        <div className="wrap narrow">
          <div className="section-kicker gold">資料請求</div>
          <h2 className="white-text">まずは30分、数字を一緒に整理しませんか？</h2>
          <p className="section-sub white-sub">
            概要資料では、よくある資金繰り悪化パターン、見るべき数字、初回相談の進め方をまとめています。
          </p>

          <form className="form-box" onSubmit={handleSubmit}>
            <input type="hidden" name="serviceSlug" value="cashflow" />
            <input type="hidden" name="formType" value="cashflow_download" />

            <div className="form-group">
              <label>会社名<span className="req">*</span></label>
              <input
                className="form-control"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="株式会社○○"
                required
              />
            </div>

            <div className="form-group">
              <label>今の悩み<span className="req">*</span></label>
              <textarea
                className="form-control textarea"
                name="issue"
                value={form.issue}
                onChange={handleChange}
                placeholder="例：利益は出ているが、月末の残高が苦しい。どこを先に見直すべきか整理したい"
                required
              />
            </div>

            <div className="form-group">
              <label>メールアドレス<span className="req">*</span></label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="info@example.com"
                required
              />
            </div>

            <button className="primary-btn full" type="submit" disabled={!canSubmit}>
              {isSubmitting ? '送信中…' : '資料を受け取る'}
            </button>

            <div className="form-meta">
              受付後、自動でメールをお送りします。届かない場合は迷惑メールフォルダもご確認ください。<br />
              <a href="/privacy/">プライバシーポリシー</a> に同意のうえご送信ください。
            </div>

            {message ? (
              <div className={`submit-message ${isSuccess ? 'success' : 'error'}`}>
                {message}
              </div>
            ) : null}
          </form>
        </div>
      </section>

      <section className="section white">
        <div className="wrap">
          <div className="section-kicker">FAQ</div>
          <h2>よくあるご質問</h2>
          <div className="faq-list">
            {FAQS.map((item, index) => {
              const open = openFaqIndex === index;
              return (
                <div className="faq-item" key={item.q}>
                  <button type="button" className="faq-q" onClick={() => toggleFaq(index)}>
                    <span>{item.q}</span>
                    <span>{open ? '−' : '+'}</span>
                  </button>
                  {open ? <div className="faq-a">{item.a}</div> : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style jsx>{`
        .lp { background: #faf8f4; color: #1c1917; }
        .wrap { max-width: 1040px; margin: 0 auto; padding: 0 24px; }
        .wrap.narrow { max-width: 820px; }
        .section { padding: 80px 0; }
        .hero { padding: 110px 0 90px; }
        .dark { background: #111e30; color: #fff; }
        .cream { background: #faf8f4; }
        .white { background: #fff; }
        .stone { background: #f0ede7; }
        .eyebrow, .section-kicker { font-size: 12px; letter-spacing: .14em; font-weight: 700; color: #b8963e; margin-bottom: 14px; }
        .gold { color: #d4b060; }
        h1 { font-size: clamp(32px, 5vw, 54px); line-height: 1.45; margin: 0 0 18px; color: #fff; }
        h2 { font-size: clamp(24px, 3.5vw, 38px); line-height: 1.5; margin: 0 0 16px; color: #1b2e4b; }
        .white-text { color: #fff; }
        .lead, .section-sub { font-size: 15px; line-height: 1.95; max-width: 760px; color: #57534e; }
        .white-sub, .dark .lead { color: rgba(255,255,255,.72); }
        .hero-actions { margin-top: 28px; }
        .hero-note { margin-top: 12px; font-size: 12px; color: rgba(255,255,255,.58); }
        .primary-btn {
          display: inline-flex; align-items: center; justify-content: center;
          min-height: 52px; padding: 0 24px; border: 0; border-radius: 999px;
          background: #b8963e; color: #111e30; font-weight: 700; cursor: pointer;
        }
        .primary-btn.full { width: 100%; margin-top: 8px; }
        .stack { display: grid; gap: 12px; margin-top: 28px; }
        .list-card { display: flex; gap: 14px; padding: 18px 20px; background: #fff; border: 1px solid #e7e5e4; }
        .dot { width: 8px; height: 8px; border-radius: 999px; background: #b8963e; margin-top: 9px; flex: 0 0 auto; }
        .list-title, .card-title { font-size: 16px; line-height: 1.7; font-weight: 700; color: #1b2e4b; margin-bottom: 6px; }
        .list-body, .card-body { font-size: 14px; line-height: 1.85; color: #57534e; }
        .three-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 28px; }
        .info-card, .metric-card { background: #fff; border: 1px solid #e7e5e4; padding: 24px; }
        .metric-no { font-size: 12px; font-weight: 700; letter-spacing: .12em; color: #b8963e; margin-bottom: 10px; }
        .table-wrap { overflow-x: auto; margin-top: 28px; }
        .compare-table { width: 100%; border-collapse: collapse; background: #fff; }
        .compare-table th, .compare-table td { border: 1px solid #e7e5e4; padding: 14px; text-align: left; vertical-align: top; font-size: 14px; line-height: 1.8; }
        .compare-table th { background: #f8f7f4; color: #1b2e4b; }
        .fit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 28px; }
        .fit-col { padding: 24px; border: 1px solid #e7e5e4; background: #fff; }
        .fit-head { font-size: 14px; font-weight: 700; margin-bottom: 14px; color: #1b2e4b; }
        .fit-item { font-size: 14px; line-height: 1.85; color: #57534e; margin-bottom: 8px; }
        .form-box { margin-top: 28px; padding: 28px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.12); }
        .form-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
        .form-group label { font-size: 13px; color: rgba(255,255,255,.82); font-weight: 700; }
        .req { color: #f5b6b6; margin-left: 4px; }
        .form-control {
          width: 100%; min-height: 48px; padding: 12px 14px;
          border: 1px solid rgba(255,255,255,.18); background: rgba(255,255,255,.08);
          color: #fff; border-radius: 8px; font-size: 14px;
        }
        .textarea { min-height: 120px; resize: vertical; }
        .form-meta { margin-top: 14px; font-size: 12px; line-height: 1.8; color: rgba(255,255,255,.62); }
        .form-meta a { color: #d4b060; }
        .submit-message { margin-top: 16px; padding: 14px 16px; border-radius: 10px; font-size: 14px; line-height: 1.8; }
        .submit-message.success { background: rgba(39,174,96,.16); color: #d5ffe6; }
        .submit-message.error { background: rgba(220,76,100,.16); color: #ffd8df; }
        .faq-list { display: grid; gap: 12px; margin-top: 28px; }
        .faq-item { border: 1px solid #e7e5e4; background: #fff; }
        .faq-q {
          width: 100%; display: flex; justify-content: space-between; gap: 16px;
          text-align: left; padding: 18px 20px; background: transparent; border: 0; cursor: pointer;
          font-size: 15px; font-weight: 700; color: #1b2e4b;
        }
        .faq-a { padding: 0 20px 18px; font-size: 14px; line-height: 1.9; color: #57534e; }
        @media (max-width: 800px) {
          .three-grid, .fit-grid { grid-template-columns: 1fr; }
          .section, .hero { padding: 64px 0; }
          .form-box { padding: 20px; }
        }
      `}</style>
    </div>
  );
}
