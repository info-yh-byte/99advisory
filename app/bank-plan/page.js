'use client';

import { useMemo, useState } from 'react';
import LPHero from '@/components/lp/LPHero';
import LPSection from '@/components/lp/LPSection';
import { LPFitGrid, LPInfoGrid, LPStackList } from '@/components/lp/LPCardGrid';
import LPFaq from '@/components/lp/LPFaq';
import LPLeadForm from '@/components/lp/LPLeadForm';

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
    <>
      <LPHero
        eyebrow="銀行提出前・借入相談前の経営者へ"
        title="計画書を、銀行が読める資料へ整理する。"
        lead="融資の可否は、数字の良し悪しだけでなく、何をどう説明できるかでも変わります。銀行が気にする論点に沿って、事業計画と説明材料を整理します。"
        ctaLabel="資料を受け取る"
        ctaHref="#form"
        note="メールアドレスに支援概要と進め方をお送りします"
      />

      <LPSection tone="cream" kicker="こんな悩み、心当たりはありますか？" title="申請の前に、一度整理する価値があります">
        <LPStackList items={SYMPTOMS} />
      </LPSection>

      <LPSection tone="white" kicker="読まれない理由" title="計画書が「読まれない」本当の理由">
        <LPInfoGrid items={REASONS} columns={3} />
      </LPSection>

      <LPSection tone="stone" kicker="整理ポイント" title="事業の現状と計画が伝わる3つの整理ポイント">
        <LPInfoGrid items={POINTS} columns={3} numbered />
      </LPSection>

      <LPSection tone="white" kicker="相談事例（匿名）" title="よくある相談の整理パターン">
        <LPInfoGrid items={CASES} columns={3} />
      </LPSection>

      <LPSection tone="cream" kicker="よくあるつまずき" title="銀行に指摘されやすい4つの計画書パターン">
        <LPStackList items={PATTERNS} />
      </LPSection>

      <LPSection tone="white" kicker="どちらが向いているか" title="あなたはどちらのプランが向いていますか？">
        <LPInfoGrid items={PLAN_FIT} columns={2} />
      </LPSection>

      <LPSection tone="stone" kicker="支援プラン" title="99advisoryの2つの支援プラン">
        <LPInfoGrid items={SUPPORT_PLANS} columns={2} />
      </LPSection>

      <LPSection tone="white" kicker="初回30分でわかること" title="初回30分の無料相談でわかること">
        <LPStackList items={FREE_SESSION} />
      </LPSection>

      <LPSection tone="cream" kicker="整理の視点" title="どんな視点で整理するのか">
        <LPStackList items={LENSES} />
      </LPSection>

      <LPSection tone="white" kicker="向き・不向き" title="このサービスが向いている会社・向いていない会社">
        <LPFitGrid
          yesTitle="向いている会社"
          yesItems={FIT_YES}
          noTitle="向いていない会社"
          noItems={FIT_NO}
        />
      </LPSection>

      <LPSection tone="stone" kicker="ご相談の流れ" title="ご相談の流れ">
        <LPStackList items={FLOW} />
      </LPSection>

      <LPSection tone="white" kicker="相談前に確認できること" title="相談する前に確認できること">
        <LPStackList items={BEFORE_CONTACT} />
      </LPSection>

      <LPSection
        tone="dark"
        kicker="資料請求"
        title="今の資料で何が足りないかを、30分で整理しませんか。"
        subtitle="概要資料では、銀行が確認する論点、計画整理の進め方、初回相談で確認する内容をまとめています。"
        narrow
        id="form"
      >
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
          submitLabel="資料を受け取る"
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
              placeholder: '例：追加融資の相談前に、銀行へどう説明するか整理したい'
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
    </>
  );
}
