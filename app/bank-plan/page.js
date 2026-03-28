'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LPHero from '@/components/lp/LPHero';
import LPProblemSection from '@/components/lp/LPProblemSection';
import LPSection from '@/components/lp/LPSection';
import { LPStepFlow, LPFitGrid } from '@/components/lp/LPCardGrid';
import LPFaq from '@/components/lp/LPFaq';
import LPLeadForm from '@/components/lp/LPLeadForm';
import LPBottomBar from '@/components/lp/LPBottomBar';
import LPTrustNote from '@/components/lp/LPTrustNote';

const PROBLEMS = [
  {
    no: '01',
    title: '銀行に何をどう説明すればよいか分からない',
    body: '数字はあるが、どの順番で何を伝えるべきか整理できていない。銀行が何を確認したいかが見えていない。'
  },
  {
    no: '02',
    title: '事業計画の内容が根拠として弱い',
    body: '売上見込みや費用の根拠が整理されておらず、数字を問われると説明しきれない状態。'
  },
  {
    no: '03',
    title: '説明材料が整理されないまま面談が近づいている',
    body: '決算書・試算表・借入一覧などが手元にあるが、面談で使えるレベルに整えられていない。'
  },
  {
    no: '04',
    title: '現状説明と将来計画がつながっていない',
    body: '直近の実績と今後の打ち手が別々に存在していて、一本の話として整理されていない。'
  },
  {
    no: '05',
    title: '借換え・追加調達・条件変更の前に整理したい',
    body: '現状の数字をどう見せるか、どこを先に整えるか、面談前に論点を確認したい。'
  }
];

const DELIVERABLES = [
  {
    color: 'blue',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    title: '財務サマリー資料',
    body: '決算書・試算表・借入状況を、銀行が読みやすい順番で整理した説明用資料。'
  },
  {
    color: 'green',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    title: '計画整理ドキュメント',
    body: '現状・使途・返済見通しの3点を軸に、銀行が確認する順番で整えた計画書。'
  },
  {
    color: 'purple',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    title: '想定Q&Aシート',
    body: '銀行から聞かれやすい論点を整理し、面談で答えられる状態を作るための準備資料。'
  }
];

const STEPS = [
  {
    title: '初回ヒアリング',
    body: '現状の数字・相談目的・今ある資料を確認し、整理の方針と優先順位を決めます。'
  },
  {
    title: '論点の整理',
    body: '銀行が確認する「現状・使途・返済余力」の順番に沿って、必要な論点を整えます。'
  },
  {
    title: '資料の作成・整備',
    body: '財務サマリー・計画整理ドキュメント・想定Q&Aを作成・整理します。'
  },
  {
    title: '確認・納品',
    body: '内容を共有し、面談で説明できる状態になっているかを確認します。'
  }
];

const SPOT_INCLUDED = [
  'ヒアリング2回（各60分）',
  '財務サマリー資料',
  '計画整理ドキュメント',
  '想定Q&Aシート',
  '納品後30日間のメール質問対応'
];

const MONTHLY_INCLUDED = [
  '月次の数字確認（月1回・60分）',
  '計画と実績のズレ整理',
  '銀行対話の論点更新',
  '都度のメール相談対応'
];

const NOT_INCLUDED = [
  '銀行との交渉・代理申請',
  '記帳・会計ソフト入力',
  '税務申告書の作成'
];

const FAQS = [
  {
    q: 'まだ資料が揃っていなくても相談できますか？',
    a: 'できます。資料が足りない状態でどこから整えるべきかを整理するのが最初の支援です。現時点にある資料から進められます。'
  },
  {
    q: '計画書がまだありません。それでも対象ですか？',
    a: '対象です。まずは現状の数字と説明材料を整理し、銀行が確認したい論点に沿って必要な資料を整えていきます。'
  },
  {
    q: '資料だけ受け取って、依頼しなくても問題ありませんか？',
    a: '問題ありません。まずは資料を見て、自社に合いそうかをご判断ください。'
  },
  {
    q: 'スポットと月次サポートはどう使い分けますか？',
    a: '面談前の準備が目的であればスポットを、定期的に銀行対話の論点を更新したい場合は月次サポートが向いています。どちらから始めるかは初回相談時に整理します。'
  }
];

const INITIAL_FORM = {
  company: '',
  purpose: '',
  email: ''
};

export default function BankPlanPage() {
  const router = useRouter();
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
      setForm(INITIAL_FORM);
      router.push('/thanks?service=bank-plan');
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
    <>
      <style>{`
        .bp-deliv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .bp-deliv-card {
          border-radius: var(--radius-lg);
          padding: 28px 24px;
        }
        .bp-deliv-card-blue { background: var(--blue-light); border: 1px solid var(--blue-pale); }
        .bp-deliv-card-green { background: var(--green-light); border: 1px solid var(--green-pale); }
        .bp-deliv-card-purple { background: var(--purple-light); border: 1px solid var(--purple-pale); }
        .bp-deliv-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .bp-deliv-card-blue .bp-deliv-icon { background: var(--blue-pale); color: var(--blue); }
        .bp-deliv-card-green .bp-deliv-icon { background: var(--green-pale); color: var(--green); }
        .bp-deliv-card-purple .bp-deliv-icon { background: var(--purple-pale); color: var(--purple); }
        .bp-deliv-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 8px;
        }
        .bp-deliv-body {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.7;
        }
        .bp-price-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .bp-price-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px 24px;
        }
        .bp-price-card-featured {
          background: var(--blue-light);
          border-color: var(--blue-pale);
        }
        .bp-price-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          border-radius: 9999px;
          padding: 3px 10px;
          margin-bottom: 12px;
        }
        .bp-price-card .bp-price-badge {
          color: var(--faint);
          background: var(--surface);
          border: 1px solid var(--border);
        }
        .bp-price-card-featured .bp-price-badge {
          color: var(--blue);
          background: var(--blue-pale);
          border: 1px solid var(--blue-pale);
        }
        .bp-price-amount {
          font-size: 32px;
          font-weight: 800;
          color: var(--navy);
          line-height: 1.1;
          margin-bottom: 4px;
        }
        .bp-price-unit {
          font-size: 12px;
          color: var(--muted);
          margin-bottom: 20px;
        }
        .bp-price-desc {
          font-size: 13px;
          color: var(--text-sub);
          margin-bottom: 16px;
          line-height: 1.6;
        }
        .bp-check-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .bp-check-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: var(--text-sub);
          line-height: 1.5;
        }
        .bp-check-item::before {
          content: '✓';
          color: var(--green);
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .bp-cross-note {
          margin-top: 16px;
          padding: 12px 16px;
          background: var(--surface);
          border-radius: var(--radius-sm);
          font-size: 12px;
          color: var(--muted);
          line-height: 1.6;
        }
        .bp-cross-label {
          font-weight: 600;
          margin-bottom: 4px;
        }
        .bp-cross-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 12px;
          color: var(--muted);
          line-height: 1.5;
          margin-bottom: 4px;
        }
        .bp-cross-item::before {
          content: '−';
          color: var(--hint);
          font-weight: 700;
          flex-shrink: 0;
        }
        .bp-next-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .bp-next-card {
          display: block;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 20px 24px;
          text-decoration: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .bp-next-card:hover {
          border-color: var(--blue);
          box-shadow: 0 2px 12px rgba(37,99,235,0.08);
        }
        .bp-next-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--blue);
          background: var(--blue-light);
          border: 1px solid var(--blue-pale);
          border-radius: 9999px;
          padding: 3px 10px;
          margin-bottom: 10px;
        }
        .bp-next-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 6px;
        }
        .bp-next-body {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.6;
        }
        @media (max-width: 768px) {
          .bp-deliv-grid { grid-template-columns: 1fr; }
          .bp-price-grid { grid-template-columns: 1fr; }
          .bp-next-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <LPHero
        eyebrow="銀行対話準備支援"
        title="計画書を、銀行が読める資料へ整理する。"
        lead="何をどう説明するかが整っていないと、数字の良し悪しに関わらず話が前に進みません。銀行が確認する「現状・使途・返済余力」の順番に沿って、事業の状況と計画を整理します。"
        ctaLabel="銀行対話準備資料を受け取る"
        ctaHref="#form"
        note="メールアドレスに支援概要と進め方をお送りします"
      />

      <LPProblemSection
        tone="stone"
        kicker="こんな悩みはありませんか"
        title="銀行対話の前に経営者が感じる5つの状態"
        items={PROBLEMS}
      />

      <LPSection tone="white" kicker="支援で得られるもの" title="支援後に手元に残る3つの成果物">
        <div className="bp-deliv-grid">
          {DELIVERABLES.map((d) => (
            <div className={`bp-deliv-card bp-deliv-card-${d.color}`} key={d.title}>
              <div className="bp-deliv-icon">{d.icon}</div>
              <div className="bp-deliv-title">{d.title}</div>
              <div className="bp-deliv-body">{d.body}</div>
            </div>
          ))}
        </div>
      </LPSection>

      <LPSection tone="stone" kicker="進め方" title="支援の流れ">
        <LPStepFlow items={STEPS} />
      </LPSection>

      <LPSection tone="white" kicker="料金" title="2つの支援プラン">
        <div className="bp-price-grid">
          <div className="bp-price-card">
            <div className="bp-price-badge">スポット</div>
            <div className="bp-price-amount">200,000<span style={{fontSize:'16px',fontWeight:600}}>円</span></div>
            <div className="bp-price-unit">税別 / 一回完結</div>
            <div className="bp-price-desc">面談前の準備が目的。今ある資料を整理し、説明できる状態を作りたい会社向け。</div>
            <ul className="bp-check-list">
              {SPOT_INCLUDED.map((item) => (
                <li className="bp-check-item" key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bp-price-card bp-price-card-featured">
            <div className="bp-price-badge">月次サポート</div>
            <div className="bp-price-amount">100,000<span style={{fontSize:'16px',fontWeight:600}}>円</span></div>
            <div className="bp-price-unit">税別 / 月額</div>
            <div className="bp-price-desc">定期的に銀行対話の論点を更新したい会社向け。計画と実績のズレを月次で確認します。</div>
            <ul className="bp-check-list">
              {MONTHLY_INCLUDED.map((item) => (
                <li className="bp-check-item" key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bp-cross-note">
          <div className="bp-cross-label">いずれのプランにも含まれないもの</div>
          {NOT_INCLUDED.map((item) => (
            <div className="bp-cross-item" key={item}>{item}</div>
          ))}
        </div>
      </LPSection>

      <LPSection tone="white" kicker="向き・不向き" title="このサービスが向いている会社・向いていない会社">
        <LPFitGrid
          yesTitle="向いている会社"
          yesItems={[
            '銀行面談前に数字と説明を整えたい会社',
            '借換え・追加調達・条件変更の前に準備したい会社',
            '銀行との対話を、感覚ではなく資料で進めたい会社',
            '計画と実績のズレを定期的に確認したい会社'
          ]}
          noTitle="向いていない会社"
          noItems={[
            '体裁だけの計画書が急ぎで欲しい会社',
            '税務申告だけを求めている会社',
            '状況整理なしに、申請だけ進めたい会社'
          ]}
        />
      </LPSection>

      <LPSection
        tone="dark"
        kicker="資料請求"
        title="今の資料で何が足りないかを、一緒に整理しませんか。"
        subtitle="概要資料では、銀行が確認する論点、計画整理の進め方、初回相談で確認する内容をまとめています。"
        narrow
        id="form"
      >
        <LPTrustNote
          items={[
            '資料が揃っていなくても相談できます',
            'まずは不足論点の整理から始めます',
            '資料請求だけでも問題ありません'
          ]}
        />

        <LPLeadForm
          serviceSlug="bank-plan"
          formType="bankplan_download"
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          canSubmit={canSubmit}
          isSubmitting={isSubmitting}
          message={message}
          isSuccess={isSuccess}
          submitLabel="銀行対話準備資料を受け取る"
          helpText={
            <>
              受付後、自動でメールをお送りします。届かない場合は迷惑メールフォルダもご確認ください。<br />
              <a href="/privacy/">プライバシーポリシー</a> に同意のうえご送信ください。
            </>
          }
          fields={[
            {
              name: 'company',
              label: '会社名',
              required: true,
              placeholder: '株式会社○○'
            },
            {
              name: 'purpose',
              label: '今回の相談目的',
              type: 'textarea',
              required: true,
              placeholder: '例：追加調達の相談前に、銀行へどう説明するか整理したい'
            },
            {
              name: 'email',
              label: 'メールアドレス',
              type: 'email',
              required: true,
              placeholder: 'info@example.com'
            }
          ]}
        />
      </LPSection>

      <LPSection tone="white" kicker="FAQ" title="よくあるご質問">
        <LPFaq items={FAQS} openIndex={openFaqIndex} onToggle={toggleFaq} />
      </LPSection>

      <LPSection tone="stone" kicker="次のステップ" title="整理後に検討される支援">
        <div className="bp-next-grid">
          <Link href="/seizo/" className="bp-next-card">
            <div className="bp-next-badge">財務診断</div>
            <div className="bp-next-title">財務健康診断</div>
            <div className="bp-next-body">銀行対話の土台となる財務構造・利益・現金のつながりを、診断として整理します。</div>
          </Link>
          <Link href="/cashflow/" className="bp-next-card">
            <div className="bp-next-badge">資金繰り</div>
            <div className="bp-next-title">資金繰り改善支援</div>
            <div className="bp-next-body">利益と現金のズレを構造で整理し、資金繰りの安定を図ります。</div>
          </Link>
        </div>
      </LPSection>

      <LPBottomBar
        primaryLabel="資料を受け取る"
        primaryHref="#form"
        secondaryLabel="相談する"
        secondaryHref="/contact/"
      />
    </>
  );
}
