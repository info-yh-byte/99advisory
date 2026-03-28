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
    title: '利益は出ているのに、月末の残高が不安',
    body: '試算表では黒字でも、口座残高に余裕がない。利益と現金のズレがどこで起きているか見えていない。'
  },
  {
    no: '02',
    title: '入金と支払いのタイミングがいつもずれている',
    body: '売上は立っているが、回収前に支払いが先に来て苦しくなる。サイトの整理が後回しになっている。'
  },
  {
    no: '03',
    title: 'どこに資金が詰まっているか分からない',
    body: '売掛金・在庫・借入返済・外注費など、どこを先に見るべきか整理できていない。'
  },
  {
    no: '04',
    title: '資金繰りが経営者の感覚に依存している',
    body: '「今月はなんとかいけそう」で回していて、3か月先の見通しが数字で持てていない。'
  },
  {
    no: '05',
    title: '改善したいが、どこから手をつけるか分からない',
    body: '回収条件・借入返済・在庫圧縮など、優先順位がつかず、動けないまま時間が経っている。'
  }
];

const DELIVERABLES = [
  {
    color: 'blue',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: '資金詰まり構造図',
    body: '売掛・在庫・借入・回収サイトなど、現金がどこで詰まっているかを一枚に整理します。'
  },
  {
    color: 'green',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
    title: '優先改善アクション',
    body: '改善インパクトが大きい箇所を、実行しやすさと合わせて優先順位で整理します。'
  },
  {
    color: 'purple',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: '3か月見通しシート',
    body: '入出金の見通しを月次で整理し、いつ・どこで残高が下がるかを見える状態にします。'
  }
];

const STEPS = [
  {
    title: '初回ヒアリング',
    body: '試算表・借入一覧・入出金の状況を共有いただき、資金詰まりの全体像を確認します。'
  },
  {
    title: '構造の特定',
    body: '利益と現金のズレがどこで起きているかを、御社固有の構造として明らかにします。'
  },
  {
    title: '優先順位の整理',
    body: '何から手をつけるべきかを、改善インパクトと実行しやすさの両面から整理します。'
  },
  {
    title: '資料納品・説明',
    body: '資金詰まり構造図・優先改善アクション・見通しシートをお渡しし、内容を説明します。'
  }
];

const INCLUDED = [
  'ヒアリング2回（各60分）',
  '資金詰まり構造図（1枚）',
  '優先改善アクション一覧',
  '3か月見通しシート',
  '納品後30日間のメール質問対応'
];

const NOT_INCLUDED = [
  '月次の継続サポート（別途相談可）',
  '記帳・会計ソフト入力',
  '税務申告書の作成'
];

const FAQS = [
  {
    q: 'まだ数字が整っていなくても相談できますか？',
    a: 'できます。むしろ、数字が整理されていない状態そのものが支援対象です。試算表の見方や確認すべき優先順位から整理します。'
  },
  {
    q: '税理士がいても依頼する意味はありますか？',
    a: 'あります。税理士は申告や記帳の専門家です。資金繰り改善の優先順位づけや、経営判断の伴走までは業務範囲外であることが多く、役割は重複しません。'
  },
  {
    q: '資料請求だけでも問題ありませんか？',
    a: '問題ありません。まずは資料を見て、自社に合うかどうかを判断してください。申し込みは任意です。'
  },
  {
    q: '150,000円は税別ですか？',
    a: '税別です。別途消費税がかかります。継続支援や月次サポートについては、初回相談時にご相談ください。'
  }
];

const INITIAL_FORM = {
  company: '',
  issue: '',
  email: ''
};

export default function CashflowPage() {
  const router = useRouter();
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
      setForm(INITIAL_FORM);
      router.push('/thanks?service=cashflow');
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
        .cf-deliv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .cf-deliv-card {
          border-radius: var(--radius-lg);
          padding: 28px 24px;
        }
        .cf-deliv-card-blue { background: var(--blue-light); border: 1px solid var(--blue-pale); }
        .cf-deliv-card-green { background: var(--green-light); border: 1px solid var(--green-pale); }
        .cf-deliv-card-purple { background: var(--purple-light); border: 1px solid var(--purple-pale); }
        .cf-deliv-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .cf-deliv-card-blue .cf-deliv-icon { background: var(--blue-pale); color: var(--blue); }
        .cf-deliv-card-green .cf-deliv-icon { background: var(--green-pale); color: var(--green); }
        .cf-deliv-card-purple .cf-deliv-icon { background: var(--purple-pale); color: var(--purple); }
        .cf-deliv-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 8px;
        }
        .cf-deliv-body {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.7;
        }
        .cf-price-block {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 32px 28px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: start;
        }
        .cf-price-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--faint);
          margin-bottom: 8px;
          text-transform: uppercase;
        }
        .cf-price-amount {
          font-size: 36px;
          font-weight: 800;
          color: var(--navy);
          line-height: 1.1;
          margin-bottom: 4px;
        }
        .cf-price-unit {
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 20px;
        }
        .cf-price-note {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.6;
          padding: 12px 16px;
          background: var(--surface);
          border-radius: var(--radius-sm);
        }
        .cf-check-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .cf-check-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: var(--text-sub);
          line-height: 1.5;
        }
        .cf-check-item::before {
          content: '✓';
          color: var(--green);
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .cf-cross-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: var(--muted);
          line-height: 1.5;
        }
        .cf-cross-item::before {
          content: '−';
          color: var(--hint);
          font-weight: 700;
          flex-shrink: 0;
        }
        .cf-price-right-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 12px;
        }
        .cf-cross-label {
          font-size: 12px;
          color: var(--faint);
          font-weight: 600;
          margin: 16px 0 8px;
        }
        .cf-next-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .cf-next-card {
          display: block;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 20px 24px;
          text-decoration: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .cf-next-card:hover {
          border-color: var(--blue);
          box-shadow: 0 2px 12px rgba(37,99,235,0.08);
        }
        .cf-next-badge {
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
        .cf-next-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 6px;
        }
        .cf-next-body {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.6;
        }
        @media (max-width: 768px) {
          .cf-deliv-grid { grid-template-columns: 1fr; }
          .cf-price-block { grid-template-columns: 1fr; gap: 20px; }
          .cf-next-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <LPHero
        eyebrow="資金繰り改善支援"
        title="利益と現金のズレを、構造で整理する。"
        lead="黒字なのに現金が残らない。入金と支払いのタイミングが合わない。そんな状態は、数字が悪いからではなく、利益と現金のズレが整理されていないことから起きます。まずは、どこで現金が詰まっているかを明らかにします。"
        ctaLabel="資金繰り改善資料を受け取る"
        ctaHref="#form"
        note="メールアドレスに支援内容と進め方をお送りします"
      />

      <LPProblemSection
        tone="stone"
        kicker="こんな悩みはありませんか"
        title="資金繰りで経営者が直面しやすい5つの状態"
        items={PROBLEMS}
      />

      <LPSection tone="white" kicker="支援で得られるもの" title="支援後に手元に残る3つの成果物">
        <div className="cf-deliv-grid">
          {DELIVERABLES.map((d) => (
            <div className={`cf-deliv-card cf-deliv-card-${d.color}`} key={d.title}>
              <div className="cf-deliv-icon">{d.icon}</div>
              <div className="cf-deliv-title">{d.title}</div>
              <div className="cf-deliv-body">{d.body}</div>
            </div>
          ))}
        </div>
      </LPSection>

      <LPSection tone="stone" kicker="進め方" title="支援の流れ">
        <LPStepFlow items={STEPS} />
      </LPSection>

      <LPSection tone="white" kicker="料金" title="費用と含まれる内容">
        <div className="cf-price-block">
          <div className="cf-price-left">
            <div className="cf-price-label">スポット支援</div>
            <div className="cf-price-amount">150,000<span style={{fontSize:'18px',fontWeight:600}}>円</span></div>
            <div className="cf-price-unit">税別 / 一回完結</div>
            <div className="cf-price-note">月次の継続サポートへの移行も相談可能です。継続支援については初回相談時にご確認ください。</div>
          </div>
          <div className="cf-price-right">
            <div className="cf-price-right-title">含まれる内容</div>
            <ul className="cf-check-list">
              {INCLUDED.map((item) => (
                <li className="cf-check-item" key={item}>{item}</li>
              ))}
            </ul>
            <div className="cf-cross-label">含まれないもの</div>
            {NOT_INCLUDED.map((item) => (
              <div className="cf-cross-item" key={item}>{item}</div>
            ))}
          </div>
        </div>
      </LPSection>

      <LPSection tone="white" kicker="向き・不向き" title="このサービスが向いている会社・向いていない会社">
        <LPFitGrid
          yesTitle="向いている会社"
          yesItems={[
            '利益と現金のズレを整理したい会社',
            '数字で資金繰りを見られるようにしたい会社',
            '借入・売掛・在庫のどこが重いかを把握したい会社',
            '3か月先の見通しを持ちたい会社'
          ]}
          noTitle="向いていない会社"
          noItems={[
            '税務申告だけを求めている会社',
            '短期の資金手当てのみを外注したい会社',
            '数字の整理をせず申請だけ進めたい会社'
          ]}
        />
      </LPSection>

      <LPSection
        tone="dark"
        kicker="資料請求"
        title="まずは、利益と現金のズレを整理しませんか？"
        subtitle="概要資料では、よくある資金繰り悪化パターン、見るべき3つの数字、初回相談の進め方をまとめています。"
        narrow
        id="form"
      >
        <LPTrustNote
          items={[
            'まだ数字が完全に整理されていなくても相談できます',
            '資料請求だけでも問題ありません',
            '無理な営業前提ではなく、まず状況整理から進めます'
          ]}
        />

        <LPLeadForm
          serviceSlug="cashflow"
          formType="cashflow_download"
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          canSubmit={canSubmit}
          isSubmitting={isSubmitting}
          message={message}
          isSuccess={isSuccess}
          submitLabel="資金繰り改善資料を受け取る"
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
              name: 'issue',
              label: '今の悩み',
              type: 'textarea',
              required: true,
              placeholder: '例：利益は出ているが、月末の残高が苦しい。どこを先に見直すべきか整理したい'
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

      <LPSection tone="stone" kicker="次のステップ" title="改善後に検討される支援">
        <div className="cf-next-grid">
          <Link href="/seizo/" className="cf-next-card">
            <div className="cf-next-badge">財務診断</div>
            <div className="cf-next-title">財務健康診断</div>
            <div className="cf-next-body">資金繰りだけでなく、利益構造・費用構造・案件採算まで含めて会社の財務を整理します。</div>
          </Link>
          <Link href="/monthly-report/" className="cf-next-card">
            <div className="cf-next-badge">月次レポート</div>
            <div className="cf-next-title">月次レポート支援</div>
            <div className="cf-next-body">整理した資金繰り構造をベースに、月次で数字を追い続ける仕組みをつくります。</div>
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
