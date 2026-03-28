'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LPHero from '@/components/lp/LPHero';
import LPSection from '@/components/lp/LPSection';
import { LPStepFlow, LPFitGrid } from '@/components/lp/LPCardGrid';
import LPFaq from '@/components/lp/LPFaq';
import LPLeadForm from '@/components/lp/LPLeadForm';
import LPBottomBar from '@/components/lp/LPBottomBar';
import LPTrustNote from '@/components/lp/LPTrustNote';

const PROBLEMS = [
  {
    no: '01',
    title: '案件ごとの採算がつかめていない',
    body: '忙しく動いているのに、どの案件が利益を残し、どの案件が資金を圧迫しているか分からない。'
  },
  {
    no: '02',
    title: '試算表はあるが、次の打ち手が決まらない',
    body: '月次資料は出ているが、どの数字をどう読んで、何を判断すればよいかまで整理できていない。'
  },
  {
    no: '03',
    title: '売上はあるのに、利益や現金が残らない',
    body: '粗利、固定費、外注費、回収条件のどこに原因があるのかを構造で見られていない状態。'
  },
  {
    no: '04',
    title: '固定費と変動費の切り分けができていない',
    body: '人件費・外注費・設備負担などが混ざって見えていると、利益構造の改善ポイントが見えにくくなる。'
  },
  {
    no: '05',
    title: '銀行や社内に、数字でうまく説明できない',
    body: '現場感覚はあるが、それを数字と言葉に整理して伝えるところに自信が持てない。'
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
    title: '財務構造マップ',
    body: '試算表・借入状況・費用構造を一枚に整理。利益と現金の流れが一目でわかる状態にします。'
  },
  {
    color: 'green',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
    title: '優先論点リスト',
    body: '改善インパクトが大きい箇所を、実行しやすさと合わせて優先順位で整理します。'
  },
  {
    color: 'purple',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: '経営判断メモ',
    body: '次の一手の根拠と論点を文字で整理。社内外への説明材料にも使えます。'
  }
];

const STEPS = [
  {
    title: '初回ヒアリング',
    body: '試算表・借入状況・現場の状況を共有いただき、整理の優先順位を確認します。'
  },
  {
    title: '財務構造の整理',
    body: '利益・現金・費用の流れを整理し、どこに詰まりがあるかを明らかにします。'
  },
  {
    title: '優先論点の抽出',
    body: '改善インパクトが大きい箇所を、実行しやすさと合わせて整理します。'
  },
  {
    title: '資料納品・説明',
    body: '財務構造マップ・優先論点リスト・経営判断メモをお渡しし、内容を説明します。'
  }
];

const INCLUDED = [
  'ヒアリング2回（各60分）',
  '財務構造マップ（1枚）',
  '優先論点リスト',
  '経営判断メモ',
  '納品後30日間のメール質問対応'
];

const NOT_INCLUDED = [
  '顧問契約・継続支援（別途相談可）',
  '記帳・会計ソフト入力',
  '税務申告書の作成'
];

const FAQS = [
  {
    q: 'まだ案件別の数字が揃っていなくても相談できますか？',
    a: 'できます。数字が細かく揃っていない場合でも、今ある試算表や現場情報から、まずどこを見える化すべきかを整理できます。'
  },
  {
    q: '製造業や建設業以外でも対象ですか？',
    a: '対象です。受託業やプロジェクト型の事業など、案件ごとの採算や粗利のブレが大きい業種には特に相性があります。'
  },
  {
    q: '顧問税理士がいても相談する意味はありますか？',
    a: 'あります。税理士は申告や会計処理の専門家であり、案件別採算の見方や経営判断の優先順位づけまで一緒に整理する役割とは重なりません。'
  },
  {
    q: '150,000円は税別ですか？',
    a: '税別です。別途消費税がかかります。分割払いや月次サポートへの移行については、初回相談時にご相談ください。'
  }
];

const INITIAL_FORM = {
  company: '',
  industry: '',
  revenue: '',
  email: ''
};

export default function SeizoPage() {
  const router = useRouter();
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
      setForm(INITIAL_FORM);
      router.push('/thanks?service=seizo');
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
        .sz-problem-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .sz-problem-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 20px 20px 20px 24px;
          position: relative;
        }
        .sz-problem-card:last-child:nth-child(odd) {
          grid-column: 1;
          max-width: calc(50% - 6px);
        }
        .sz-problem-no {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--blue);
          margin-bottom: 8px;
        }
        .sz-problem-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 6px;
          line-height: 1.5;
        }
        .sz-problem-body {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.7;
        }
        .sz-deliv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .sz-deliv-card {
          border-radius: var(--radius-lg);
          padding: 28px 24px;
        }
        .sz-deliv-card-blue {
          background: var(--blue-light);
          border: 1px solid var(--blue-pale);
        }
        .sz-deliv-card-green {
          background: var(--green-light);
          border: 1px solid var(--green-pale);
        }
        .sz-deliv-card-purple {
          background: var(--purple-light);
          border: 1px solid var(--purple-pale);
        }
        .sz-deliv-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .sz-deliv-card-blue .sz-deliv-icon { background: var(--blue-pale); color: var(--blue); }
        .sz-deliv-card-green .sz-deliv-icon { background: var(--green-pale); color: var(--green); }
        .sz-deliv-card-purple .sz-deliv-icon { background: var(--purple-pale); color: var(--purple); }
        .sz-deliv-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 8px;
        }
        .sz-deliv-body {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.7;
        }
        .sz-price-block {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 32px 28px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: start;
        }
        .sz-price-left {}
        .sz-price-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--faint);
          margin-bottom: 8px;
          text-transform: uppercase;
        }
        .sz-price-amount {
          font-size: 36px;
          font-weight: 800;
          color: var(--navy);
          line-height: 1.1;
          margin-bottom: 4px;
        }
        .sz-price-unit {
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 20px;
        }
        .sz-price-note {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.6;
          padding: 12px 16px;
          background: var(--surface);
          border-radius: var(--radius-sm);
        }
        .sz-check-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .sz-check-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: var(--text-sub);
          line-height: 1.5;
        }
        .sz-check-item::before {
          content: '✓';
          color: var(--green);
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .sz-cross-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: var(--muted);
          line-height: 1.5;
        }
        .sz-cross-item::before {
          content: '−';
          color: var(--hint);
          font-weight: 700;
          flex-shrink: 0;
        }
        .sz-price-right-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 12px;
        }
        .sz-cross-label {
          font-size: 12px;
          color: var(--faint);
          font-weight: 600;
          margin: 16px 0 8px;
        }
        .sz-next-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .sz-next-card {
          display: block;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 20px 24px;
          text-decoration: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .sz-next-card:hover {
          border-color: var(--blue);
          box-shadow: 0 2px 12px rgba(37,99,235,0.08);
        }
        .sz-next-badge {
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
        .sz-next-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 6px;
        }
        .sz-next-body {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.6;
        }
        @media (max-width: 768px) {
          .sz-problem-grid { grid-template-columns: 1fr; }
          .sz-problem-card:last-child:nth-child(odd) { grid-column: auto; max-width: 100%; }
          .sz-deliv-grid { grid-template-columns: 1fr; }
          .sz-price-block { grid-template-columns: 1fr; gap: 20px; }
          .sz-next-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <LPHero
        eyebrow="財務健康診断｜診断支援"
        title="会社全体の数字を、一度整理する。"
        lead="試算表はあるのに次の手が決まらない。利益は出ているのに現金が残らない。そんな状態に対して、財務構造・利益・現金のつながりを整理し、経営判断につながる形に変えます。"
        ctaLabel="診断支援の資料を受け取る"
        ctaHref="#form"
        note="メールアドレスに支援概要と進め方をお送りします"
      />

      <LPSection tone="stone" kicker="こんな悩みはありませんか" title="経営者がよく抱える5つの状態">
        <div className="sz-problem-grid">
          {PROBLEMS.map((p) => (
            <div className="sz-problem-card" key={p.no}>
              <div className="sz-problem-no">{p.no}</div>
              <div className="sz-problem-title">{p.title}</div>
              <div className="sz-problem-body">{p.body}</div>
            </div>
          ))}
        </div>
      </LPSection>

      <LPSection tone="white" kicker="診断で得られるもの" title="支援後に手元に残る3つの成果物">
        <div className="sz-deliv-grid">
          {DELIVERABLES.map((d) => (
            <div className={`sz-deliv-card sz-deliv-card-${d.color}`} key={d.title}>
              <div className="sz-deliv-icon">{d.icon}</div>
              <div className="sz-deliv-title">{d.title}</div>
              <div className="sz-deliv-body">{d.body}</div>
            </div>
          ))}
        </div>
      </LPSection>

      <LPSection tone="stone" kicker="進め方" title="支援の流れ">
        <LPStepFlow items={STEPS} />
      </LPSection>

      <LPSection tone="white" kicker="料金" title="費用と含まれる内容">
        <div className="sz-price-block">
          <div className="sz-price-left">
            <div className="sz-price-label">スポット診断</div>
            <div className="sz-price-amount">150,000<span style={{fontSize:'18px',fontWeight:600}}>円</span></div>
            <div className="sz-price-unit">税別 / 一回完結</div>
            <div className="sz-price-note">月次サポートへの移行も相談可能です。継続支援については初回相談時にご確認ください。</div>
          </div>
          <div className="sz-price-right">
            <div className="sz-price-right-title">含まれる内容</div>
            <ul className="sz-check-list">
              {INCLUDED.map((item) => (
                <li className="sz-check-item" key={item}>{item}</li>
              ))}
            </ul>
            <div className="sz-cross-label">含まれないもの</div>
            {NOT_INCLUDED.map((item) => (
              <div className="sz-cross-item" key={item}>{item}</div>
            ))}
          </div>
        </div>
      </LPSection>

      <LPSection tone="white" kicker="向き・不向き" title="このサービスが向いている会社・向いていない会社">
        <LPFitGrid
          yesTitle="向いている会社"
          yesItems={[
            '試算表はあるが、経営判断に使い切れていない会社',
            '利益や現金が残りにくい原因を整理したい会社',
            '案件別採算のブレが大きい会社',
            '銀行や社内への説明を整えたい会社'
          ]}
          noTitle="向いていない会社"
          noItems={[
            '税務申告だけを依頼したい会社',
            '数字の整理をせず単発の資料作成だけを求める会社',
            '今すぐ融資申請書だけ欲しい会社'
          ]}
        />
      </LPSection>

      <LPSection
        tone="dark"
        kicker="資料請求"
        title="まずは、自社の数字の見えにくさを整理しませんか？"
        subtitle="概要資料では、よくある利益構造の詰まり方、財務構造マップのサンプル、初回相談の進め方をまとめています。"
        narrow
        id="form"
      >
        <LPTrustNote
          items={[
            '案件別の数字が揃っていなくても相談できます',
            'まずは試算表や現場情報から整理可能です',
            '資料請求だけでも問題ありません'
          ]}
        />

        <LPLeadForm
          serviceSlug="seizo"
          formType="seizo_download"
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          canSubmit={canSubmit}
          isSubmitting={isSubmitting}
          message={message}
          isSuccess={isSuccess}
          submitLabel="診断支援の資料を受け取る"
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
              name: 'industry',
              label: '業種',
              required: true,
              placeholder: '例：製造業、建設業、受託開発'
            },
            {
              name: 'revenue',
              label: '年商規模',
              required: true,
              placeholder: '例：3億円、10億円程度'
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

      <LPSection tone="stone" kicker="次のステップ" title="診断後に検討される支援">
        <div className="sz-next-grid">
          <Link href="/monthly-report/" className="sz-next-card">
            <div className="sz-next-badge">月次レポート</div>
            <div className="sz-next-title">月次レポート支援</div>
            <div className="sz-next-body">診断で整理した財務構造をベースに、月次で数字を追い続ける仕組みをつくります。</div>
          </Link>
          <Link href="/monthly-review/" className="sz-next-card">
            <div className="sz-next-badge">経営会議</div>
            <div className="sz-next-title">月次経営会議サポート</div>
            <div className="sz-next-body">月次の数字をもとに、経営判断を会議の中で確実に回す仕組みを整えます。</div>
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
