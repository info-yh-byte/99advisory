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
    title: '毎月数字は出るが、レポートの形にできていない',
    body: '試算表は届く。でも会議や説明に使える形に整える時間がなく、数字が「確認」で終わっている。'
  },
  {
    no: '02',
    title: '会議や説明の前に、資料づくりで時間をとられる',
    body: '数字が揃ってから資料をまとめるまでに時間がかかり、準備に追われて会議の中身が薄くなる。'
  },
  {
    no: '03',
    title: '数字を集めることと、使える形にすることが別になっている',
    body: '試算表の作成は経理が担当しているが、そこから資料化・整理するステップが抜けている。'
  },
  {
    no: '04',
    title: '経理はいるが、資料整理まで手が回っていない',
    body: '記帳・申告・日次業務に追われていて、経営会議向けの資料整理は後回しになりがち。'
  },
  {
    no: '05',
    title: '毎月同じ作業を繰り返していて、改善できていない',
    body: '資料作成のフローが属人的で、誰かが休むと回らない。仕組みが整っていない状態が続いている。'
  }
];

const DELIVERABLES = [
  {
    color: 'blue',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    title: '月次損益サマリー',
    body: '当月・前月・累計の比較を一覧化。どこが計画と違うかが一目でわかる形に整えます。'
  },
  {
    color: 'green',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: '資金繰り状況メモ',
    body: '月末残高・翌月の入出金見通しを簡潔に整理。口頭で説明できる水準にまとめます。'
  },
  {
    color: 'purple',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: '今月の論点メモ（1〜2点）',
    body: '数字から見えた今月気をつけることを短く添付。会議の冒頭で読めるA4半ページ程度。'
  }
];

const STEPS = [
  {
    title: '前月末に数字を共有いただく（試算表・資金繰り表）',
    body: '毎月決まったタイミングで数字資料をお送りいただきます。'
  },
  {
    title: '資料を作成・論点を整理（3〜5営業日）',
    body: '損益サマリー・資金繰りメモ・論点メモを作成します。'
  },
  {
    title: '毎月決まったタイミングで納品',
    body: 'PDFまたはスプレッドシートで納品します。社内共有・印刷に使いやすい形に整えます。'
  },
  {
    title: '気になる点はメールで確認可',
    body: '納品後、内容について簡易なメール確認に対応します。'
  }
];

const INCLUDED = [
  '月次レポート資料の作成・納品',
  '気になる点への簡易コメント',
  '月中の軽微な確認（メール）'
];

const NOT_INCLUDED = [
  '記帳・税務申告',
  '予算策定・中期計画の立案'
];

const FAQS = [
  {
    q: '月次経営レビューとの違いは何ですか？',
    a: '月次経営レポートは資料を納品するサービスです。資料を一緒に読んで次に何をするか整理したい場合は、月次経営レビューをご検討ください。'
  },
  {
    q: '税理士がいても使えますか？',
    a: 'はい。記帳・税務は税理士の領域です。このサービスは数字を使いやすい形へ整える役割なので重複しません。'
  },
  {
    q: 'どんな形式で納品されますか？',
    a: 'PDFまたはスプレッドシートで納品します。社内共有・印刷に使いやすい形に整えます。'
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

export default function MonthlyReportPage() {
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
          serviceSlug: 'monthly-report',
          formType: 'monthly_report_contact',
          sourcePath: '/monthly-report',
          ...form,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.detail || data.error || '送信に失敗しました');
      }

      setIsSuccess(true);
      setForm(INITIAL_FORM);
      router.push('/thanks?service=monthly-report');
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
        .mr-problem-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .mr-problem-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 20px 20px 20px 24px;
        }
        .mr-problem-card:last-child:nth-child(odd) {
          grid-column: 1;
          max-width: calc(50% - 6px);
        }
        .mr-problem-no {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--blue);
          margin-bottom: 8px;
        }
        .mr-problem-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 6px;
          line-height: 1.5;
        }
        .mr-problem-body {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.7;
        }
        .mr-deliv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .mr-deliv-card {
          border-radius: var(--radius-lg);
          padding: 28px 24px;
        }
        .mr-deliv-card-blue { background: var(--blue-light); border: 1px solid var(--blue-pale); }
        .mr-deliv-card-green { background: var(--green-light); border: 1px solid var(--green-pale); }
        .mr-deliv-card-purple { background: var(--purple-light); border: 1px solid var(--purple-pale); }
        .mr-deliv-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .mr-deliv-card-blue .mr-deliv-icon { background: var(--blue-pale); color: var(--blue); }
        .mr-deliv-card-green .mr-deliv-icon { background: var(--green-pale); color: var(--green); }
        .mr-deliv-card-purple .mr-deliv-icon { background: var(--purple-pale); color: var(--purple); }
        .mr-deliv-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 8px;
        }
        .mr-deliv-body {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.7;
        }
        .mr-price-block {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 32px 28px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: start;
        }
        .mr-price-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--faint);
          margin-bottom: 8px;
          text-transform: uppercase;
        }
        .mr-price-amount {
          font-size: 36px;
          font-weight: 800;
          color: var(--navy);
          line-height: 1.1;
          margin-bottom: 4px;
        }
        .mr-price-unit {
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 8px;
        }
        .mr-price-note {
          font-size: 14px;
          color: var(--muted);
          margin-top: 8px;
          line-height: 1.6;
        }
        .mr-check-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .mr-check-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: var(--text-sub);
          line-height: 1.5;
        }
        .mr-check-item::before {
          content: '✓';
          color: var(--green);
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .mr-cross-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: var(--muted);
          line-height: 1.5;
        }
        .mr-cross-item::before {
          content: '−';
          color: var(--hint);
          font-weight: 700;
          flex-shrink: 0;
        }
        .mr-price-right-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 12px;
        }
        .mr-cross-label {
          font-size: 12px;
          color: var(--faint);
          font-weight: 600;
          margin: 16px 0 8px;
        }
        .mr-next-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .mr-next-card {
          display: block;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 20px 24px;
          text-decoration: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .mr-next-card:hover {
          border-color: var(--blue);
          box-shadow: 0 2px 12px rgba(37,99,235,0.08);
        }
        .mr-next-badge {
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
        .mr-next-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 6px;
        }
        .mr-next-body {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.6;
        }
        @media (max-width: 768px) {
          .mr-problem-grid { grid-template-columns: 1fr; }
          .mr-problem-card:last-child:nth-child(odd) { grid-column: auto; max-width: 100%; }
          .mr-deliv-grid { grid-template-columns: 1fr; }
          .mr-price-block { grid-template-columns: 1fr; gap: 20px; }
          .mr-next-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <LPHero
        eyebrow="月次経営レポート｜入口商品"
        title="毎月の数字を、説明できる資料に整える。"
        lead="試算表や資金繰り表はある。でも、会議や銀行説明に使いやすい形に整える時間がない。毎月の数字を受け取り、見やすく整理した資料として納品します。"
        ctaLabel="お問い合わせ・資料請求"
        ctaHref="#form"
        note="記帳・税務申告・融資手続きの代行は行っていません"
      />

      <LPSection tone="stone" kicker="こんな状態が続いていませんか" title="月次レポートが整わない5つの状態">
        <div className="mr-problem-grid">
          {PROBLEMS.map((p) => (
            <div className="mr-problem-card" key={p.no}>
              <div className="mr-problem-no">{p.no}</div>
              <div className="mr-problem-title">{p.title}</div>
              <div className="mr-problem-body">{p.body}</div>
            </div>
          ))}
        </div>
      </LPSection>

      <LPSection tone="white" kicker="お渡しするもの" title="毎月納品する3つの資料">
        <div className="mr-deliv-grid">
          {DELIVERABLES.map((d) => (
            <div className={`mr-deliv-card mr-deliv-card-${d.color}`} key={d.title}>
              <div className="mr-deliv-icon">{d.icon}</div>
              <div className="mr-deliv-title">{d.title}</div>
              <div className="mr-deliv-body">{d.body}</div>
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
            '売上1億〜10億円規模',
            '経理担当はいるが、レポート整理まで手が回っていない',
            '毎月の数字を会議や銀行説明に使える形にしたい',
            '外部に資料整理を任せ、経営判断に集中したい'
          ]}
          noTitle="向いていない会社"
          noItems={[
            '記帳・税務申告の代行を求めている会社',
            '予算策定・中期計画の立案を求めている会社',
            '月次で数字を一緒に読み解くサポートが必要な会社（→月次経営レビューへ）'
          ]}
        />
        <p style={{fontSize:'13px', color:'var(--hint)', marginTop:'16px'}}>
          ※ 記帳・税務申告・融資手続きの代行は行っていません
        </p>
      </LPSection>

      <LPSection tone="stone" kicker="料金" title="費用と含まれる内容">
        <div className="mr-price-block">
          <div>
            <div className="mr-price-label">月額</div>
            <div className="mr-price-amount">150,000<span style={{fontSize:'18px',fontWeight:600}}>円</span></div>
            <div className="mr-price-unit">税別 / 月額</div>
            <div className="mr-price-note">初月はヒアリング・設定込み（追加料金なし）</div>
          </div>
          <div>
            <div className="mr-price-right-title">含まれる内容</div>
            <ul className="mr-check-list">
              {INCLUDED.map((item) => (
                <li className="mr-check-item" key={item}>{item}</li>
              ))}
            </ul>
            <div className="mr-cross-label">含まれないもの</div>
            {NOT_INCLUDED.map((item) => (
              <div className="mr-cross-item" key={item}>{item}</div>
            ))}
          </div>
        </div>
      </LPSection>

      <LPSection tone="white" kicker="FAQ" title="よくあるご質問">
        <LPFaq items={FAQS} openIndex={openFaqIndex} onToggle={toggleFaq} />
      </LPSection>

      <LPSection tone="stone" kicker="次のステップ" title="資料が整ったら、次のステップへ">
        <div className="mr-next-grid">
          <Link href="/monthly-review/" className="mr-next-card">
            <div className="mr-next-badge">継続支援</div>
            <div className="mr-next-title">月次経営レビュー</div>
            <div className="mr-next-body">整えた資料を一緒に読んで、今月の判断と次のアクションまで整理します。</div>
          </Link>
          <Link href="/yojitsu/" className="mr-next-card">
            <div className="mr-next-badge">上位支援</div>
            <div className="mr-next-title">予実管理伴走</div>
            <div className="mr-next-body">計画と実績の差異を毎月分析し、次の判断材料に変えます。</div>
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
            '資料請求だけでも問題ありません'
          ]}
        />

        <LPLeadForm
          serviceSlug="monthly-report"
          formType="monthly_report_contact"
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
            { name: 'revenue', label: '売上規模（概算）', required: true, placeholder: '例：1〜3億円' },
            { name: 'message', label: 'ご相談内容・現在の課題（任意）', type: 'textarea', required: false, placeholder: '例：毎月試算表は届くが、会議に使える形に整える時間がない。' }
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
