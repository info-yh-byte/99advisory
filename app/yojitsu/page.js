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
    title: '予算と実績を並べても、原因の整理まで追いつかない',
    body: '数字のズレはわかるが、それがなぜ起きたのかまで整理する時間も視点も不足している。'
  },
  {
    no: '02',
    title: '差異が出ていることはわかるが、どう対処すべきか判断できない',
    body: '原因はなんとなく見えていても、優先順位と対応策まで整理できないまま次の月へ進んでいる。'
  },
  {
    no: '03',
    title: '月次レビューが数字の確認で終わり、行動につながらない',
    body: '「こうなっています」を確認して終わり。「だからどう動くか」まで整理できていない。'
  },
  {
    no: '04',
    title: '毎月同じ課題が繰り返されている気がする',
    body: '月次で差異を見ているはずなのに、同じ問題がまた出てくる。構造への対処が後回しになっている。'
  },
  {
    no: '05',
    title: '計画と実績の乖離を、社内でうまく説明できていない',
    body: '差異の原因と対策を言語化する仕組みがなく、説明が属人的になっている。'
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
    title: '差異分析サマリー',
    body: '項目別に計画比・前年比で何がズレたかを一覧化。どの数字が問題かが一目でわかる形に整えます。'
  },
  {
    color: 'green',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    title: '原因仮説メモ',
    body: '差異の主な原因を外部要因・内部要因に分けて整理。なぜズレたかの仮説を2〜3点に絞って記載。'
  },
  {
    color: 'purple',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: '次月の確認項目',
    body: '来月特に注視すべき数字と確認しておくべき論点を箇条書きで整理。レビューの冒頭で使える形にします。'
  }
];

const STEPS = [
  {
    title: '前月の実績数値を共有いただく',
    body: '毎月決まったタイミングで実績数値をお送りいただきます。'
  },
  {
    title: '予算との差異を項目別に整理・分析（3〜5営業日）',
    body: '差異分析サマリーと原因仮説メモを作成します。'
  },
  {
    title: '差異分析サマリー・原因仮説・次月確認項目を送付',
    body: 'セッション前に資料一式をお送りします。'
  },
  {
    title: '月次レビューセッション（30〜45分）で内容を確認',
    body: '資料の内容を確認し、対応の優先順位を整理します。'
  },
  {
    title: 'セッション後に議事メモを送付',
    body: '決定事項・次月確認項目を整理してお送りします。'
  }
];

const INCLUDED = [
  '差異分析レポートの作成（月次）',
  '原因仮説・次月確認項目の整理',
  '月次レビューセッション（30〜45分）',
  'セッション後の議事メモ'
];

const NOT_INCLUDED = [
  '予算策定・中期計画の立案',
  '記帳・税務申告'
];

const FAQS = [
  {
    q: '予算がない会社でも使えますか？',
    a: 'このサービスは既存の計画との比較が前提です。まず計画を整える段階であれば、別途ご相談ください。'
  },
  {
    q: '月次経営レビューとの違いは何ですか？',
    a: '月次経営レビューは今月の数字を読んで判断を整理するセッション型のサービスです。予実管理伴走は計画と実績の差異分析に特化した、より深い継続支援です。両方を組み合わせてご利用いただく会社もあります。'
  }
];

const INITIAL_FORM = {
  company: '',
  name: '',
  email: '',
  industry: '',
  revenue: '',
  message: '',
};

export default function YojitsuPage() {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const canSubmit = useMemo(() => {
    return form.company && form.name && form.email && form.industry && form.revenue && !isSubmitting;
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
          serviceSlug: 'yojitsu',
          formType: 'yojitsu_contact',
          sourcePath: '/yojitsu',
          ...form,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.detail || data.error || '送信に失敗しました');
      }

      setIsSuccess(true);
      setForm(INITIAL_FORM);
      router.push('/thanks?service=yojitsu');
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
        .yj-hero-note {
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          text-align: center;
          padding: 12px 40px;
          font-size: 13px;
          color: var(--hint);
        }
        .yj-deliv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .yj-deliv-card {
          border-radius: var(--radius-lg);
          padding: 28px 24px;
        }
        .yj-deliv-card-blue { background: var(--blue-light); border: 1px solid var(--blue-pale); }
        .yj-deliv-card-green { background: var(--green-light); border: 1px solid var(--green-pale); }
        .yj-deliv-card-purple { background: var(--purple-light); border: 1px solid var(--purple-pale); }
        .yj-deliv-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .yj-deliv-card-blue .yj-deliv-icon { background: var(--blue-pale); color: var(--blue); }
        .yj-deliv-card-green .yj-deliv-icon { background: var(--green-pale); color: var(--green); }
        .yj-deliv-card-purple .yj-deliv-icon { background: var(--purple-pale); color: var(--purple); }
        .yj-deliv-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 8px;
        }
        .yj-deliv-body {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.7;
        }
        .yj-fit-note {
          margin-top: 16px;
          padding: 16px 20px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          font-size: 13px;
          color: var(--muted);
          line-height: 1.7;
        }
        .yj-fit-link {
          color: var(--blue);
          text-decoration: none;
          font-size: 13px;
        }
        .yj-fit-link:hover { text-decoration: underline; }
        .yj-price-block {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 32px 28px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: start;
        }
        .yj-price-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--faint);
          margin-bottom: 8px;
          text-transform: uppercase;
        }
        .yj-price-amount {
          font-size: 36px;
          font-weight: 800;
          color: var(--navy);
          line-height: 1.1;
          margin-bottom: 4px;
        }
        .yj-price-unit {
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 8px;
        }
        .yj-price-note {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.6;
          padding: 12px 16px;
          background: var(--surface);
          border-radius: var(--radius-sm);
        }
        .yj-check-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .yj-check-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: var(--text-sub);
          line-height: 1.5;
        }
        .yj-check-item::before {
          content: '✓';
          color: var(--green);
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .yj-cross-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: var(--muted);
          line-height: 1.5;
        }
        .yj-cross-item::before {
          content: '−';
          color: var(--hint);
          font-weight: 700;
          flex-shrink: 0;
        }
        .yj-price-right-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 12px;
        }
        .yj-cross-label {
          font-size: 12px;
          color: var(--faint);
          font-weight: 600;
          margin: 16px 0 8px;
        }
        .yj-next-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .yj-next-card {
          display: block;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 20px 24px;
          text-decoration: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .yj-next-card:hover {
          border-color: var(--blue);
          box-shadow: 0 2px 12px rgba(37,99,235,0.08);
        }
        .yj-next-badge {
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
        .yj-next-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 6px;
        }
        .yj-next-body {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.6;
        }
        @media (max-width: 768px) {
          .yj-hero-note { padding: 10px 16px; }
          .yj-deliv-grid { grid-template-columns: 1fr; }
          .yj-price-block { grid-template-columns: 1fr; gap: 20px; }
          .yj-next-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <LPHero
        eyebrow="予実管理伴走｜上位商品・継続支援"
        title="計画と実績のズレを、次の判断材料に変える。"
        lead="予算はある。毎月実績も出ている。でも「なぜズレたか」「次にどう動くか」まで毎月整理しきれていない。既存の計画をベースに、実績との差異を分析し、次の判断につながる形で整理するサービスです。"
        ctaLabel="お問い合わせ・ご相談"
        ctaHref="#form"
        note="このサービスは年度予算またはそれに準じる計画がある会社向けです"
      />

      <div className="yj-hero-note">
        ※ このサービスは、すでに年度予算またはそれに準じる計画がある会社向けです。
      </div>

      <LPProblemSection
        tone="stone"
        kicker="こんな状態が続いていませんか"
        title="予実管理が機能しない5つの状態"
        items={PROBLEMS}
      />

      <LPSection tone="white" kicker="お渡しするもの" title="毎月納品する3つの成果物">
        <div className="yj-deliv-grid">
          {DELIVERABLES.map((d) => (
            <div className={`yj-deliv-card yj-deliv-card-${d.color}`} key={d.title}>
              <div className="yj-deliv-icon">{d.icon}</div>
              <div className="yj-deliv-title">{d.title}</div>
              <div className="yj-deliv-body">{d.body}</div>
            </div>
          ))}
        </div>
      </LPSection>

      <LPSection tone="stone" kicker="進め方" title="毎月の流れ">
        <LPStepFlow items={STEPS} />
      </LPSection>

      <LPSection tone="white" kicker="向いている会社" title="このサービスが向いている会社・向いていない会社">
        <LPFitGrid
          yesTitle="向いている会社"
          yesItems={[
            '年度予算または月次計画がすでにある',
            '売上1億〜20億円規模',
            '実績は毎月出るが、差異の整理と次の打ち手が結びついていない',
            '月次経営レビューをすでに利用、または併用を検討している'
          ]}
          noTitle="向いていない会社"
          noItems={[
            '計画がまだない会社（まず計画策定が必要）',
            '記帳・税務申告の代行を求めている会社',
            '単発の診断だけを求めている会社'
          ]}
        />
        <div className="yj-fit-note">
          このサービスは計画があることが前提です。まず月次の数字整理から始めたい場合は
          月次経営レポートまたは月次経営レビューからご検討ください。<br />
          <Link href="/monthly-report/" className="yj-fit-link">月次経営レポートを見る →</Link>
          {' '}／{' '}
          <Link href="/monthly-review/" className="yj-fit-link">月次経営レビューを見る →</Link>
        </div>
      </LPSection>

      <LPSection tone="stone" kicker="料金" title="費用と含まれる内容">
        <div className="yj-price-block">
          <div>
            <div className="yj-price-label">月額・継続契約</div>
            <div className="yj-price-amount">150,000<span style={{fontSize:'18px',fontWeight:600}}>円</span></div>
            <div className="yj-price-unit">税別 / 月額</div>
            <div className="yj-price-note">最低契約期間：3ヶ月。3ヶ月以降は1ヶ月前のご連絡で解約可能です。</div>
          </div>
          <div>
            <div className="yj-price-right-title">含まれる内容</div>
            <ul className="yj-check-list">
              {INCLUDED.map((item) => (
                <li className="yj-check-item" key={item}>{item}</li>
              ))}
            </ul>
            <div className="yj-cross-label">含まれないもの</div>
            {NOT_INCLUDED.map((item) => (
              <div className="yj-cross-item" key={item}>{item}</div>
            ))}
          </div>
        </div>
      </LPSection>

      <LPSection tone="white" kicker="FAQ" title="よくあるご質問">
        <LPFaq items={FAQS} openIndex={openFaqIndex} onToggle={toggleFaq} />
      </LPSection>

      <LPSection tone="stone" kicker="次のステップ" title="まず土台から整えたい場合">
        <div className="yj-next-grid">
          <Link href="/monthly-report/" className="yj-next-card">
            <div className="yj-next-badge">入口支援</div>
            <div className="yj-next-title">月次経営レポート</div>
            <div className="yj-next-body">毎月の数字を会議や説明に使える形に整えます。予実管理の土台づくりに。</div>
          </Link>
          <Link href="/monthly-review/" className="yj-next-card">
            <div className="yj-next-badge">継続支援</div>
            <div className="yj-next-title">月次経営レビュー</div>
            <div className="yj-next-body">月次の数字を一緒に読んで、判断と行動を整理します。予実管理との併用も可能です。</div>
          </Link>
        </div>
      </LPSection>

      <LPSection
        tone="dark"
        kicker="お問い合わせ"
        title="まずは現状をお聞かせください。"
        subtitle="送信後、受付確認メールをお送りします。2営業日以内にご連絡いたします。"
        narrow
        id="form"
      >
        <LPTrustNote
          items={[
            '秘密厳守・NDA締結可',
            'まず状況確認からお聞きします',
            '無理な提案・売り込みはしません'
          ]}
        />

        <LPLeadForm
          serviceSlug="yojitsu"
          formType="yojitsu_contact"
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          canSubmit={canSubmit}
          isSubmitting={isSubmitting}
          message={message}
          isSuccess={isSuccess}
          submitLabel="相談内容を送る"
          helpText={
            <>
              送信後、受付確認メールをお送りします。届かない場合は迷惑メールフォルダもご確認ください。<br />
              <a href="/privacy/">プライバシーポリシー</a>に同意のうえご送信ください。
            </>
          }
          fields={[
            { name: 'company', label: '会社名', required: true, placeholder: '株式会社○○' },
            { name: 'name', label: 'お名前', required: true, placeholder: '山田 太郎' },
            { name: 'email', label: 'メールアドレス', type: 'email', required: true, placeholder: 'info@example.com' },
            { name: 'industry', label: '業種', required: true, placeholder: '例：製造業、小売業、サービス業' },
            { name: 'revenue', label: '売上規模（概算）', required: true, placeholder: '例：3〜10億円' },
            { name: 'message', label: 'ご相談内容・現在の課題（任意）', type: 'textarea', required: false, placeholder: '例：予算と実績は毎月出るが、差異の原因整理まで手が回っていない。' }
          ]}
        />
      </LPSection>

      <LPBottomBar
        primaryLabel="お問い合わせ"
        primaryHref="#form"
        secondaryLabel="相談する"
        secondaryHref="/contact/"
      />
    </>
  );
}
