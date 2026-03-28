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
    title: '毎回同じ話題で会議が終わっている',
    body: '先月と同じ確認が繰り返され、どこにも向かっていない。議題が構造化されていない。'
  },
  {
    no: '02',
    title: '議題が場当たり的で、優先順位がついていない',
    body: '毎回その場で議題が出てくる。事前準備もなく、重要な論点が後回しになっている。'
  },
  {
    no: '03',
    title: '数字は共有されるが、そこから判断や行動につながらない',
    body: '資料を見て「わかりました」で終わり。何かを決めて動くところまで会議が機能していない。'
  },
  {
    no: '04',
    title: '会議の後に何が決まったかが共有されない',
    body: '会議に参加した人の頭の中にしかない。議事録もなく、決まったことが実行されているかわからない。'
  },
  {
    no: '05',
    title: '会議の準備に時間がかかりすぎている',
    body: '毎回ゼロから資料を作り直している。標準的なアジェンダや確認指標の型がない。'
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
    title: '会議アジェンダ設計書',
    body: '毎回の会議で確認すべき議題の順序と、各議題にかける時間の目安を整理した設計書。'
  },
  {
    color: 'green',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: '確認指標一覧',
    body: '会議で毎月確認すべき数字と、その見方のポイントをまとめた一覧。参加者全員が同じ視点で数字を見るための資料です。'
  },
  {
    color: 'purple',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
    title: '決定事項メモの型',
    body: '会議で決まったことを、次回までに誰が何をするかで整理する議事録テンプレート。'
  }
];

const STEPS = [
  {
    title: '現状ヒアリング（60〜90分）',
    body: '会議の形式・参加者・頻度・現在の課題を確認します。'
  },
  {
    title: '設計資料の作成（1〜2週間）',
    body: 'アジェンダ設計書・確認指標一覧・議事録テンプレートを作成します。'
  },
  {
    title: '資料の納品・内容の説明',
    body: '資料一式をお渡しし、使い方と運用のポイントを説明します。'
  },
  {
    title: '納品後フォローアップ相談（1回・1ヶ月以内）',
    body: '実際に使ってみて出てきた疑問や修正点を確認します。'
  }
];

const INCLUDED = [
  '現状ヒアリングセッション（60〜90分）',
  '会議設計資料の作成・納品',
  '納品後フォローアップ相談（1回）'
];

const NOT_INCLUDED = [
  '会議の運営・ファシリテーション（設計のみ）',
  '継続的な会議の改善サポート（オプションで相談可）'
];

const FAQS = [
  {
    q: '会議の運営もお願いできますか？',
    a: 'このサービスは設計・資料納品が対象です。運営はお客様側で行っていただきます。継続的な伴走が必要な場合は月次経営レビューをご検討ください。'
  },
  {
    q: '設計後に月次レビューに移行できますか？',
    a: 'はい。会議の型が整った後に月次経営レビューへ移行される会社もあります。そのままご相談ください。'
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

export default function MeetingDesignPage() {
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
          serviceSlug: 'meeting-design',
          formType: 'meeting_design_contact',
          sourcePath: '/meeting-design',
          ...form,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.detail || data.error || '送信に失敗しました');
      }

      setIsSuccess(true);
      setForm(INITIAL_FORM);
      router.push('/thanks?service=meeting-design');
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
        .md-deliv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .md-deliv-card {
          border-radius: var(--radius-lg);
          padding: 28px 24px;
        }
        .md-deliv-card-blue { background: var(--blue-light); border: 1px solid var(--blue-pale); }
        .md-deliv-card-green { background: var(--green-light); border: 1px solid var(--green-pale); }
        .md-deliv-card-purple { background: var(--purple-light); border: 1px solid var(--purple-pale); }
        .md-deliv-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .md-deliv-card-blue .md-deliv-icon { background: var(--blue-pale); color: var(--blue); }
        .md-deliv-card-green .md-deliv-icon { background: var(--green-pale); color: var(--green); }
        .md-deliv-card-purple .md-deliv-icon { background: var(--purple-pale); color: var(--purple); }
        .md-deliv-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 8px;
        }
        .md-deliv-body {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.7;
        }
        .md-step-note {
          margin-top: 16px;
          padding: 14px 18px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          font-size: 13px;
          color: var(--muted);
          line-height: 1.7;
        }
        .md-fit-note {
          margin-top: 16px;
          padding: 16px 20px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          font-size: 13px;
          color: var(--muted);
          line-height: 1.7;
        }
        .md-fit-link {
          color: var(--blue);
          text-decoration: none;
          font-size: 13px;
        }
        .md-fit-link:hover { text-decoration: underline; }
        .md-price-block {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 32px 28px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: start;
        }
        .md-price-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--faint);
          margin-bottom: 8px;
          text-transform: uppercase;
        }
        .md-price-amount {
          font-size: 36px;
          font-weight: 800;
          color: var(--navy);
          line-height: 1.1;
          margin-bottom: 4px;
        }
        .md-price-unit {
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 4px;
        }
        .md-price-desc {
          font-size: 14px;
          color: var(--muted);
          margin-top: 8px;
          line-height: 1.6;
        }
        .md-price-option {
          font-size: 13px;
          color: var(--hint);
          margin-top: 8px;
        }
        .md-check-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .md-check-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: var(--text-sub);
          line-height: 1.5;
        }
        .md-check-item::before {
          content: '✓';
          color: var(--green);
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .md-cross-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: var(--muted);
          line-height: 1.5;
        }
        .md-cross-item::before {
          content: '−';
          color: var(--hint);
          font-weight: 700;
          flex-shrink: 0;
        }
        .md-price-right-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 12px;
        }
        .md-cross-label {
          font-size: 12px;
          color: var(--faint);
          font-weight: 600;
          margin: 16px 0 8px;
        }
        .md-next-card {
          display: block;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 20px 24px;
          text-decoration: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          max-width: 480px;
        }
        .md-next-card:hover {
          border-color: var(--blue);
          box-shadow: 0 2px 12px rgba(37,99,235,0.08);
        }
        .md-next-badge {
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
        .md-next-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 6px;
        }
        .md-next-body {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.6;
        }
        @media (max-width: 768px) {
          .md-deliv-grid { grid-template-columns: 1fr; }
          .md-price-block { grid-template-columns: 1fr; gap: 20px; }
          .md-next-card { max-width: 100%; }
        }
      `}</style>

      <LPHero
        eyebrow="経営会議設計｜上位商品・スポット支援"
        title="判断が動く会議の型を、一度つくる。"
        lead="会議はある。数字も共有している。でも毎回、議題が決まらず、何が決まったかも曖昧なまま終わっている。会議の設計を一度整えることで、毎月の経営判断が動きやすくなります。"
        ctaLabel="お問い合わせ・ご相談"
        ctaHref="#form"
        note="会議設計のみ。運営・ファシリテーションは含まれません"
      />

      <LPProblemSection
        tone="stone"
        kicker="こんな状態が続いていませんか"
        title="会議が機能しない5つの状態"
        items={PROBLEMS}
      />

      <LPSection tone="white" kicker="お渡しするもの" title="納品する3つの設計資料">
        <div className="md-deliv-grid">
          {DELIVERABLES.map((d) => (
            <div className={`md-deliv-card md-deliv-card-${d.color}`} key={d.title}>
              <div className="md-deliv-icon">{d.icon}</div>
              <div className="md-deliv-title">{d.title}</div>
              <div className="md-deliv-body">{d.body}</div>
            </div>
          ))}
        </div>
      </LPSection>

      <LPSection tone="stone" kicker="進め方" title="支援の流れ">
        <LPStepFlow items={STEPS} />
        <div className="md-step-note">
          運営はお客様側で行っていただきます。継続支援が必要な場合は月次経営レビューをあわせてご検討ください。
        </div>
      </LPSection>

      <LPSection tone="white" kicker="向いている会社" title="このサービスが向いている会社・向いていない会社">
        <LPFitGrid
          yesTitle="向いている会社"
          yesItems={[
            '経営会議を新たに設計したい、または見直したい',
            '設計を一度整えたら、あとは自社で運営できる',
            '月次の数字を会議で活かせる形にしたい'
          ]}
          noTitle="向いていない会社"
          noItems={[
            '会議の運営・ファシリテーションも含めて依頼したい会社',
            '継続的な伴走・改善サポートを求めている会社（→月次経営レビューへ）',
            '記帳・税務申告の代行を求めている会社'
          ]}
        />
        <div className="md-fit-note">
          設計後も継続的な伴走が必要な場合は月次経営レビューへ進めることもできます。<br />
          <Link href="/monthly-review/" className="md-fit-link">月次経営レビューを見る →</Link>
        </div>
      </LPSection>

      <LPSection tone="stone" kicker="料金" title="費用と含まれる内容">
        <div className="md-price-block">
          <div>
            <div className="md-price-label">スポット</div>
            <div className="md-price-amount">300,000<span style={{fontSize:'18px',fontWeight:600}}>円</span></div>
            <div className="md-price-unit">税別 / 一回完結</div>
            <div className="md-price-desc">ヒアリング・設計・資料納品・フォロー相談1回を含む</div>
            <div className="md-price-option">継続的な見直し支援は別途相談</div>
          </div>
          <div>
            <div className="md-price-right-title">含まれる内容</div>
            <ul className="md-check-list">
              {INCLUDED.map((item) => (
                <li className="md-check-item" key={item}>{item}</li>
              ))}
            </ul>
            <div className="md-cross-label">含まれないもの</div>
            {NOT_INCLUDED.map((item) => (
              <div className="md-cross-item" key={item}>{item}</div>
            ))}
          </div>
        </div>
      </LPSection>

      <LPSection tone="white" kicker="FAQ" title="よくあるご質問">
        <LPFaq items={FAQS} openIndex={openFaqIndex} onToggle={toggleFaq} />
      </LPSection>

      <LPSection tone="stone" kicker="次のステップ" title="設計が整ったら、継続支援へ">
        <Link href="/monthly-review/" className="md-next-card">
          <div className="md-next-badge">継続支援</div>
          <div className="md-next-title">月次経営レビュー</div>
          <div className="md-next-body">会議の型が整った後、月次で数字を一緒に読んで判断と行動を整理します。設計後の継続支援として多く選ばれています。</div>
        </Link>
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
          serviceSlug="meeting-design"
          formType="meeting_design_contact"
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
            { name: 'message', label: 'ご相談内容・現在の課題（任意）', type: 'textarea', required: false, placeholder: '例：毎月会議はあるが、何が決まったかが曖昧なまま終わっている。' }
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
