'use client';

import { useMemo, useState } from 'react';

const SYMPTOMS = [
  {
    title: '銀行に何を説明すべきか分からない',
    body: '数字はあるが、どの順番で何を伝えるべきか整理できていない状態です。'
  },
  {
    title: '事業計画書が形になっていない',
    body: '売上見込みや返済計画の根拠が弱く、説明できる資料に落ちていません。'
  },
  {
    title: '銀行面談で突っ込まれそうで不安',
    body: '利益、借入、返済余力、資金使途など、どこを聞かれるかを整理したい状態です。'
  },
  {
    title: '借換え・追加融資・リスケ前に準備したい',
    body: '現状の数字をどう見せるか、どこを先に整えるかを明確にしたい会社向けです。'
  }
];

const REASONS = [
  {
    title: '数字はあるのに、読み手の順番で整理されていない',
    body: '銀行は「現状」「使途」「返済可能性」の順で見ます。そこに沿っていない資料は読まれにくくなります。'
  },
  {
    title: '売上計画の根拠が弱く、再現性が見えない',
    body: '数字だけを置いても、なぜ達成できるのかが見えなければ納得されません。'
  },
  {
    title: '現状説明と将来計画がつながっていない',
    body: '直近の実績、現在の課題、今後の打ち手がつながっていないと、計画書は説得力を失います。'
  }
];

const POINTS = [
  {
    label: '01',
    title: '現状の数字を、銀行が読める形で並べる',
    body: '決算書・試算表・借入状況を、説明順に整理します。'
  },
  {
    label: '02',
    title: '計画の根拠を言葉と数字でつなぐ',
    body: '売上、粗利、固定費、返済原資がどう積み上がるかを示します。'
  },
  {
    label: '03',
    title: '「何に使い、どう返すか」を明確にする',
    body: '資金使途と返済可能性を、面談で説明できる状態に整えます。'
  }
];

const CASES = [
  {
    title: '追加融資前の整理',
    body: '利益は出ていたが、資金使途と返済計画の説明が弱かった会社。借入一覧と月次推移を整理し、説明順を組み直した。'
  },
  {
    title: '借換え前の整理',
    body: '借入本数が多く、経営者自身も全体像を把握しきれていなかった会社。借入条件、返済負担、改善余地を一覧化して面談準備を進めた。'
  },
  {
    title: 'リスケ前の説明整理',
    body: 'いきなり「厳しい」と伝えるのではなく、現状、原因、改善方針の順で説明できるように資料を組み直した。'
  }
];

const PATTERNS = [
  '数字は並んでいるが、どこが重要か分からない計画書',
  '売上計画が強気だが、根拠の説明が薄い計画書',
  '資金使途は書いてあるが、返済原資の説明が弱い計画書',
  '経営者の頭の中にはあるが、資料として整理されていない状態'
];

const PLAN_FIT = [
  {
    title: 'まず整理したい会社',
    body: '資料がバラバラ、何が足りないか分からない、銀行に出す前に論点整理から始めたい会社向けです。'
  },
  {
    title: '計画と説明まで整えたい会社',
    body: 'すでに一部資料はあるが、面談で説明できる粒度まで詰めたい会社向けです。'
  }
];

const SUPPORT_PLANS = [
  {
    title: '整理プラン',
    body: '現状の数字、借入状況、資金使途、銀行が見やすい順番を整理します。まず全体像を掴みたい会社向けです。'
  },
  {
    title: '整理＋面談準備プラン',
    body: '整理に加えて、面談でどう説明するか、何を聞かれやすいか、どこを補足すべきかまで整えます。'
  }
];

const FREE_SESSION = [
  '今ある資料で何が足りないか',
  '銀行が気にしやすい論点は何か',
  '先に整理すべき数字はどれか'
];

const LENSES = [
  '返済可能性',
  '資金使途の明確さ',
  '直近実績と今後計画のつながり',
  '経営者が数字を理解しているか'
];

const FIT_YES = [
  '融資前に数字と説明を整えたい会社',
  '借換え・追加融資・リスケ前に準備したい会社',
  '銀行との対話を、勘ではなく資料で進めたい会社'
];

const FIT_NO = [
  'とにかく急ぎで体裁だけの計画書が欲しい会社',
  '税務申告だけを求めている会社',
  '経営状況の整理を一切せずに、申請だけを進めたい会社'
];

const FLOW = [
  '初回相談：現状と目的を確認',
  '必要資料の確認：今あるもの、足りないものを整理',
  '論点整理：銀行が見る順番に並べ替え',
  '必要に応じて面談準備：説明順と補足論点を詰める'
];

const BEFORE_CONTACT = [
  '決算書または試算表',
  '借入一覧（残高・返済額・金利が分かるもの）',
  '今回の資金使途のメモ',
  '現在気になっている論点'
];

const FAQS = [
  {
    q: 'まだ資料が揃っていなくても相談できますか？',
    a: 'できます。むしろ、資料が足りない状態でどこから整えるべきかを整理するのが最初の支援です。現時点である資料から進められます。'
  },
  {
    q: '銀行提出用の事業計画書がまだありません。それでも対象ですか？',
    a: '対象です。まずは現状の数字と説明材料を整理し、銀行が確認したい論点に沿って、どの資料が必要かを整えていきます。'
  },
  {
    q: '資料だけ受け取って、依頼しなくても問題ありませんか？',
    a: '問題ありません。まずは資料を見て、自社に合いそうかをご判断ください。'
  }
];

const INITIAL_FORM = {
  company: '',
  purpose: '',
  email: ''
};

export default function BankPlanPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const canSubmit = useMemo(() => {
    return form.company && form.purpose && form.email && !isSubmitting;
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
          serviceSlug: 'bank-plan',
          formType: 'bankplan_download',
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
          <div className="eyebrow">銀行提出前・借入相談前の経営者へ</div>
          <h1>
            計画書を、銀行が読める資料へ整理する。
          </h1>
          <p className="lead">
            融資の可否は、数字の良し悪しだけでなく、
            何をどう説明できるかでも変わります。
            銀行が気にする論点に沿って、事業計画と説明材料を整理します。
          </p>
          <div className="hero-actions">
            <a href="#form" className="primary-btn">資料を受け取る</a>
            <div className="hero-note">メールアドレスに支援概要と進め方をお送りします</div>
          </div>
        </div>
      </section>

      <section className="section cream">
        <div className="wrap">
          <div className="section-kicker">こんな悩み、心当たりはありますか？</div>
          <h2>申請の前に、一度整理する価値があります</h2>
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
          <div className="section-kicker">読まれない理由</div>
          <h2>計画書が「読まれない」本当の理由</h2>
          <div className="three-grid">
            {REASONS.map((item) => (
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
          <div className="section-kicker">整理ポイント</div>
          <h2>事業の現状と計画が伝わる3つの整理ポイント</h2>
          <div className="three-grid">
            {POINTS.map((item) => (
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
          <div className="section-kicker">相談事例（匿名）</div>
          <h2>よくある相談の整理パターン</h2>
          <div className="three-grid">
            {CASES.map((item) => (
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
          <div className="section-kicker">よくあるつまずき</div>
          <h2>銀行に指摘されやすい4つの計画書パターン</h2>
          <div className="stack">
            {PATTERNS.map((item) => (
              <div className="simple-row" key={item}>• {item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="wrap">
          <div className="section-kicker">どちらが向いているか</div>
          <h2>あなたはどちらのプランが向いていますか？</h2>
          <div className="two-grid">
            {PLAN_FIT.map((item) => (
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
          <div className="section-kicker">支援プラン</div>
          <h2>99advisoryの2つの支援プラン</h2>
          <div className="two-grid">
            {SUPPORT_PLANS.map((item) => (
              <div className="info-card" key={item.title}>
                <div className="card-title">{item.title}</div>
                <div className="card-body">{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="wrap">
          <div className="section-kicker">初回30分でわかること</div>
          <h2>初回30分の無料相談でわかること</h2>
          <div className="stack">
            {FREE_SESSION.map((item) => (
              <div className="simple-row" key={item}>• {item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cream">
        <div className="wrap">
          <div className="section-kicker">整理の視点</div>
          <h2>どんな視点で整理するのか</h2>
          <div className="stack">
            {LENSES.map((item) => (
              <div className="simple-row" key={item}>• {item}</div>
            ))}
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

      <section className="section stone">
        <div className="wrap">
          <div className="section-kicker">ご相談の流れ</div>
          <h2>ご相談の流れ</h2>
          <div className="stack">
            {FLOW.map((item) => (
              <div className="simple-row" key={item}>• {item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="wrap">
          <div className="section-kicker">相談前に確認できること</div>
          <h2>相談する前に確認できること</h2>
          <div className="stack">
            {BEFORE_CONTACT.map((item) => (
              <div className="simple-row" key={item}>• {item}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="form" className="section dark">
        <div className="wrap narrow">
          <div className="section-kicker gold">資料請求</div>
          <h2 className="white-text">今の資料で何が足りないかを、30分で整理しませんか。</h2>
          <p className="section-sub white-sub">
            概要資料では、銀行が確認する論点、計画整理の進め方、初回相談で確認する内容をまとめています。
          </p>

          <form className="form-box" onSubmit={handleSubmit}>
            <input type="hidden" name="serviceSlug" value="bank-plan" />
            <input type="hidden" name="formType" value="bankplan_download" />

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
              <label>今回の相談目的<span className="req">*</span></label>
              <textarea
                className="form-control textarea"
                name="purpose"
                value={form.purpose}
                onChange={handleChange}
                placeholder="例：追加融資の相談前に、銀行へどう説明するか整理したい"
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
        .list-card, .simple-row {
          display: flex; gap: 14px; padding: 18px 20px; background: #fff; border: 1px solid #e7e5e4;
          font-size: 14px; line-height: 1.85; color: #57534e;
        }
        .dot { width: 8px; height: 8px; border-radius: 999px; background: #b8963e; margin-top: 9px; flex: 0 0 auto; }
        .list-title, .card-title { font-size: 16px; line-height: 1.7; font-weight: 700; color: #1b2e4b; margin-bottom: 6px; }
        .list-body, .card-body { font-size: 14px; line-height: 1.85; color: #57534e; }
        .three-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 28px; }
        .two-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 28px; }
        .info-card, .metric-card { background: #fff; border: 1px solid #e7e5e4; padding: 24px; }
        .metric-no { font-size: 12px; font-weight: 700; letter-spacing: .12em; color: #b8963e; margin-bottom: 10px; }
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
          .three-grid, .two-grid, .fit-grid { grid-template-columns: 1fr; }
          .section, .hero { padding: 64px 0; }
          .form-box { padding: 20px; }
        }
      `}</style>
    </div>
  );
}
