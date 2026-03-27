'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import LPHero from '@/components/lp/LPHero';
import LPSection from '@/components/lp/LPSection';
import { LPFitGrid, LPInfoGrid, LPStackList } from '@/components/lp/LPCardGrid';
import LPFaq from '@/components/lp/LPFaq';
import LPLeadForm from '@/components/lp/LPLeadForm';
import LPBottomBar from '@/components/lp/LPBottomBar';
import LPTrustNote from '@/components/lp/LPTrustNote';
import LPResourceCards from '@/components/lp/LPResourceCards';

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
      <LPHero
        eyebrow="利益は出ているのに現金が残らない会社へ"
        title={<>利益は出ているのに、<br />現金が残らない。</>}
        lead="資金繰りの苦しさは、数字が悪いからではなく、利益と現金のズレが整理されていないことから起きる場合があります。まずは、どこで現金が減っているのかを構造で整理します。"
        ctaLabel="資金繰りチェック資料を受け取る"
        ctaHref="#form"
        note="メールアドレスに支援内容と進め方をお送りします"
      />

      <LPSection tone="cream" kicker="こんな状態になっていませんか？" title="当てはまるなら、一度整理する価値があります">
        <LPStackList items={SYMPTOMS} />
        <LPResourceCards
          title="先に整理したい方向けの読み物"
          items={[
            {
              href: '/articles/profit-vs-cash/',
              label: '関連記事',
              title: '黒字なのに現金が残らない理由',
              body: '利益と現金のズレを先に整理したい方向けです。'
            },
            {
              href: '/articles/',
              label: '記事一覧',
              title: '他の記事も見る',
              body: '資金繰り・経営判断に関する記事一覧はこちら。'
            },
            {
              href: '/contact/',
              label: 'お問い合わせ',
              title: '先に相談したい',
              body: '状況が具体的なら、そのまま相談内容をお送りください。'
            }
          ]}
        />
      </LPSection>

      <LPSection tone="white" kicker="構造の整理" title="「利益≠現金」になる3つの構造的な原因">
        <LPInfoGrid items={CAUSES} columns={3} />
      </LPSection>

      <LPSection tone="stone" kicker="まず見る数字" title="まず確認すべき3つの数字">
        <LPInfoGrid items={NUMBERS} columns={3} numbered />
      </LPSection>

      <LPSection tone="white" kicker="支援内容" title="99advisoryの資金繰り改善サポート">
        <LPInfoGrid items={SUPPORTS} columns={3} />
      </LPSection>

      <LPSection tone="white" kicker="向き・不向き" title="このサービスが向いている会社・向いていない会社">
        <LPFitGrid
          yesTitle="向いている会社"
          yesItems={FIT_YES}
          noTitle="向いていない会社"
          noItems={FIT_NO}
        />
      </LPSection>

      <LPSection
        tone="dark"
        kicker="資料請求"
        title="まずは30分、数字を一緒に整理しませんか？"
        subtitle="概要資料では、よくある資金繰り悪化パターン、見るべき数字、初回相談の進め方をまとめています。"
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
          submitLabel="資金繰りチェック資料を受け取る"
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

      <LPBottomBar
        primaryLabel="資料を受け取る"
        primaryHref="#form"
        secondaryLabel="相談する"
        secondaryHref="/contact/"
      />
    </>
  );
}
