'use client';

import { useMemo, useState } from 'react';
import LPHero from '@/components/lp/LPHero';
import LPSection from '@/components/lp/LPSection';
import { LPFitGrid, LPInfoGrid, LPStackList } from '@/components/lp/LPCardGrid';
import LPFaq from '@/components/lp/LPFaq';
import LPLeadForm from '@/components/lp/LPLeadForm';

const SYMPTOMS = [
  {
    title: '案件ごとの採算が見えていない',
    body: '忙しく動いているのに、どの案件が利益を残し、どの案件が資金を圧迫しているのか分からない状態です。'
  },
  {
    title: '試算表を見ても、次の打ち手が決まらない',
    body: '月次資料は出ているが、経営判断にどう使えばよいか整理されていない状態です。'
  },
  {
    title: '売上はあるのに、利益や現金が思ったほど残らない',
    body: '粗利、固定費、外注、回収条件など、どこに原因があるかを構造で見たい会社向けです。'
  },
  {
    title: '銀行や社内に、数字をうまく説明できない',
    body: '現場感覚はあるが、数字と言葉で整理して伝えるところに不安がある状態です。'
  }
];

const ISSUES = [
  {
    title: '案件別採算が曖昧',
    body: '売上は追っていても、案件ごとの粗利や利益貢献が見えず、頑張っている案件ほど苦しくなることがあります。'
  },
  {
    title: '固定費と変動費の切り分けが弱い',
    body: '人件費、外注費、設備負担などが混ざって見えていると、利益構造の改善ポイントが見えにくくなります。'
  },
  {
    title: '数字が「管理資料」で止まり、経営判断に変わっていない',
    body: '月次試算表があるだけでは足りず、どこを見てどう判断するかまで整理する必要があります。'
  }
];

const SUPPORTS = [
  {
    label: '01',
    title: '現状の数字を整理する',
    body: '試算表、案件別情報、回収条件、費用構造などを見ながら、今の経営の見えにくさを整理します。'
  },
  {
    label: '02',
    title: '利益が残りにくい構造を見つける',
    body: '案件、粗利、固定費、外注、入出金タイミングなどから、どこが詰まりになっているかを明らかにします。'
  },
  {
    label: '03',
    title: '次に打つべき手を優先順位で整理する',
    body: '価格、案件選別、見積精度、外注管理、回収条件など、何から着手すべきかを整理します。'
  }
];

const VIEWPOINTS = [
  '案件別採算が見える状態になっているか',
  '粗利がどこで落ちているか把握できているか',
  '固定費・外注費の負担構造が整理されているか',
  '売上ではなく利益と現金で判断できているか'
];

const FIT_YES = [
  '製造業・建設業・受託業など、案件単位で採算がぶれやすい会社',
  '試算表はあるが、経営判断に使い切れていない会社',
  '利益や現金が残りにくい原因を整理したい会社'
];

const FIT_NO = [
  '税務申告だけを依頼したい会社',
  '今すぐLPや広告運用だけを頼みたい会社',
  '数字の整理をせず、単発の資料作成だけを求めている会社'
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
  }
];

const INITIAL_FORM = {
  company: '',
  industry: '',
  revenue: '',
  email: ''
};

export default function SeizoPage() {
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
        eyebrow="製造・建設・受託業の経営者へ"
        title={<>案件と数字がつながると、<br />経営判断は変わる。</>}
        lead="売上はあるのに利益が残らない。試算表はあるのに、次の一手が決めにくい。そんな状態に対して、案件別採算、粗利、固定費、回収条件などを整理し、数字を経営判断につなげます。"
        ctaLabel="資料を受け取る"
        ctaHref="#form"
        note="メールアドレスに支援概要と進め方をお送りします"
      />

      <LPSection tone="cream" kicker="こんな状態になっていませんか？" title="現場は動いているのに、数字が判断につながっていない会社へ">
        <LPStackList items={SYMPTOMS} />
      </LPSection>

      <LPSection tone="white" kicker="よくある論点" title="製造・建設・受託業で起きやすい3つの見えにくさ">
        <LPInfoGrid items={ISSUES} columns={3} />
      </LPSection>

      <LPSection tone="stone" kicker="支援内容" title="99advisoryの経営数字診断で行うこと">
        <LPInfoGrid items={SUPPORTS} columns={3} numbered />
      </LPSection>

      <LPSection tone="white" kicker="見る視点" title="まず確認する4つの視点">
        <LPStackList items={VIEWPOINTS} />
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
        title="まずは、自社の数字の見えにくさを整理しませんか？"
        subtitle="概要資料では、よくある利益構造の詰まり方、案件別採算を見る視点、初回相談の進め方をまとめています。"
        narrow
        id="form"
      >
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
    </>
  );
}
