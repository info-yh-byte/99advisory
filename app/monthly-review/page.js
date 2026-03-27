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

const PROBLEMS = [
  {
    title: '毎月試算表が届くが、どう読めばいいかわからない',
    body: '数字は出ているが、何が良くて何が悪いのか、自社でどう判断すればよいかが整理できていない状態です。'
  },
  {
    title: '数字を見ても、次に何をすべきかが判断できない',
    body: '月次の数字は把握しているが、それをもとに何を動かすかの優先順位がつけられていません。'
  },
  {
    title: '経営会議や月次ミーティングが形骸化している',
    body: '毎月同じ資料を確認するだけで終わり、議論や意思決定につながっていない状態です。'
  },
  {
    title: '利益は出ているはずなのに、手元に残らない状態が続いている',
    body: '試算表では黒字でも、なぜ手元に残らないかを整理できておらず、判断の根拠が曖昧です。'
  },
  {
    title: '銀行や社内への説明に毎回時間がかかっている',
    body: '数字をまとめる作業が毎月発生しており、説明のたびにゼロから整理し直しています。'
  },
  {
    title: '月次の数字は出るが、経営会議が「確認の場」で終わっている',
    body: '数字を「見る」ことと、「使う」ことが切り離されたままです。'
  }
];

const ORGANIZES = [
  {
    label: '01',
    title: '数字の動きを整理する',
    body: '試算表・資金繰り表・前月比較をもとに、今月何が起きたかを整理します。'
  },
  {
    label: '02',
    title: '判断の論点を絞る',
    body: '見えてきた課題を優先順位つきで整理し、今月どこに手を打つかを明確にします。'
  },
  {
    label: '03',
    title: '次の行動へ落とす',
    body: '話した内容を、その場の感想で終わらせず、会議や社内共有に使える形へ整えます。'
  }
];

const PROCESS_STEPS = [
  {
    label: 'STEP 1',
    title: '前月の数字をご共有いただく',
    body: '試算表・資金繰り表など、毎月の数字資料をご送付いただきます。'
  },
  {
    label: 'STEP 2',
    title: '事前に内容を確認し、当日の論点を整理する',
    body: '資料を確認したうえで、当日のレビューで扱う論点を事前に整理します。'
  },
  {
    label: 'STEP 3',
    title: 'オンラインで60分のレビューを行う',
    body: '毎月1回、オンラインで数字の動きと判断の整理を行います。'
  },
  {
    label: 'STEP 4',
    title: '翌営業日に、議事メモとアクションリストをお送りする',
    body: 'レビュー後、論点・優先確認数字・アクションリストをまとめてお送りします。'
  }
];

const INCLUDED = [
  '月次レビューセッション（60分 × 月1回）',
  '事前準備・論点整理',
  'セッション後の議事メモ・アクションリスト送付',
  '月中の簡易相談（メール）'
];

const EXCLUDED = [
  '記帳・税務申告・融資手続き代行',
  '追加セッション（別途相談）'
];

const FIT_YES = [
  '月次の数字は出ているが、経営判断に十分使えていない',
  '経理や税理士はいるが、数字を経営判断につなぐ整理役がいない',
  '毎月30〜60分、経営者または財務担当者が同席できる',
  '継続的に、数字の見方と判断の質を整えたい'
];

const FIT_NO = [
  '記帳、税務申告、融資手続きの代行そのものを求めている',
  'まだ月次の数字がほとんど整っておらず、まず資料整備から必要',
  '単発の診断だけを求めていて、継続的な見直しは想定していない'
];

const FAQS = [
  {
    q: '税理士がいても利用できますか？',
    a: 'はい。税務・記帳は税理士の領域です。このサービスは、数字を経営判断につなぐための整理とレビューを担うため、役割は重複しません。'
  },
  {
    q: '最初の月から始められますか？',
    a: 'お問い合わせ後、初回ヒアリング（無料・30分）で現状と課題を確認します。その後、翌月からのスタートが可能です。'
  },
  {
    q: '途中で解約できますか？',
    a: '最低契約期間（3ヶ月）以降は、1ヶ月前のご連絡で解約いただけます。'
  },
  {
    q: 'オンラインのみですか？',
    a: '基本はオンラインです。対面をご希望の場合はご相談ください。'
  },
  {
    q: '月次経営レポートとの違いは何ですか？',
    a: '月次経営レポートは、数字を整理して見やすい形へ整える入口支援です。月次経営レビューは、その整理した数字をもとに、毎月の判断と行動までつなげる継続サポートです。'
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

export default function MonthlyReviewPage() {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const canSubmit = useMemo(() => {
    return (
      form.company &&
      form.name &&
      form.email &&
      form.industry &&
      form.revenue &&
      !isSubmitting
    );
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
          serviceSlug: 'monthly-review',
          formType: 'monthly_review_contact',
          sourcePath: '/monthly-review',
          ...form,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.detail || data.error || '送信に失敗しました');
      }

      setIsSuccess(true);
      setForm(INITIAL_FORM);
      router.push('/thanks?service=monthly-review');
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
        eyebrow="月次経営レビュー / 継続サポート"
        title={<>毎月の数字を、<br />次の判断と行動につなげる。</>}
        lead="試算表や資金繰り表を、受け取って終わりにしていませんか。月に一度、数字を一緒に整理し、今月どこを見るべきか、何を決めるべきか、次に何を動かすかまで整えます。"
        ctaLabel="初回ヒアリングを予約する（無料）"
        ctaHref="#form"
        note="まだ課題が整理しきれていない段階でも問題ありません"
      />

      <LPSection tone="cream" kicker="現状確認" title="こんな状態が続いていませんか">
        <LPStackList items={PROBLEMS} />
      </LPSection>

      <LPSection tone="white" kicker="サービス内容" title="このサービスで整理すること">
        <LPInfoGrid items={ORGANIZES} columns={3} numbered />
      </LPSection>

      <LPSection tone="stone" kicker="成果物" title="お渡しするもの">
        <div className="lp-prose">
          <p>毎月のレビュー後には、議事録だけではなく、「今月見えてきた論点」「優先して確認すべき数字」「次回までのアクション」を整理したメモをお送りします。</p>
          <p>たとえば、売上・粗利・資金残高の変化を簡潔に整理したサマリー、今月の注意点をまとめた論点メモ、次回までに社内で動かすことを整理したアクションリストなど、毎月の判断にそのまま使いやすい形でお返しします。</p>
        </div>
      </LPSection>

      <LPSection tone="white" kicker="向き・不向き" title="このような会社に向いています">
        <LPFitGrid
          yesTitle="向いている会社"
          yesItems={FIT_YES}
          noTitle="このようなご要望には向いていません"
          noItems={FIT_NO}
        />
      </LPSection>

      <LPSection tone="cream" kicker="進め方" title="進め方">
        <LPInfoGrid items={PROCESS_STEPS} columns={2} numbered />
      </LPSection>

      <LPSection tone="white" kicker="料金" title="料金">
        <div className="lp-pricing-block">
          <p className="lp-pricing-intro">毎月1回のセッション料金ではなく、事前整理・レビュー・整理メモ・月中の簡易相談まで含めた、月次の判断支援としてご提供します。</p>
          <div className="lp-pricing-main">
            <span className="lp-pricing-amount">月額 250,000円</span>
            <span className="lp-pricing-tax">（税別）</span>
          </div>
          <p className="lp-pricing-min">最低契約期間：3ヶ月</p>
          <div className="lp-pricing-lists">
            <div className="lp-pricing-col">
              <p className="lp-pricing-col-head">含まれるもの</p>
              <ul className="lp-pricing-ul">
                {INCLUDED.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="lp-pricing-col">
              <p className="lp-pricing-col-head is-excluded">含まれないもの</p>
              <ul className="lp-pricing-ul is-excluded">
                {EXCLUDED.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </LPSection>

      <LPSection tone="white" kicker="FAQ" title="よくある質問">
        <LPFaq items={FAQS} openIndex={openFaqIndex} onToggle={toggleFaq} />
      </LPSection>

      <LPSection tone="stone" kicker="継続的な深化" title="必要に応じて、さらに運用を深めることもできます">
        <div className="lp-prose">
          <p>月次レビューを続ける中で、必要に応じて、KPI設計や月次運用の整備、予実差異のコメント整理、粗利改善の定点観測など、より深い継続支援へ進めることもできます。</p>
          <p>どこまで深めるかは、レビューの中で状況を見ながら一緒に判断します。最初から全部を決める必要はありません。</p>
        </div>
      </LPSection>

      <LPSection
        tone="dark"
        kicker="まずは現状をお聞かせください"
        title="初回ヒアリングのご予約（無料・30分）"
        subtitle="まだ課題が整理しきれていない段階でも問題ありません。内容確認後、2営業日以内にご連絡します。"
        narrow
        id="form"
      >
        <LPTrustNote
          items={[
            'まず現状をお聞きするだけの場です',
            '無理な提案・売り込みはしません',
            'NDA締結にも対応しています'
          ]}
        />

        <LPLeadForm
          serviceSlug="monthly-review"
          formType="monthly_review_contact"
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
            {
              name: 'company',
              label: '会社名',
              required: true,
              placeholder: '株式会社○○'
            },
            {
              name: 'name',
              label: 'お名前',
              required: true,
              placeholder: '山田 太郎'
            },
            {
              name: 'email',
              label: 'メールアドレス',
              type: 'email',
              required: true,
              placeholder: 'info@example.com'
            },
            {
              name: 'industry',
              label: '業種',
              required: true,
              placeholder: '例：製造業、小売業、サービス業'
            },
            {
              name: 'revenue',
              label: '売上規模（概算）',
              required: true,
              placeholder: '例：1〜3億円'
            },
            {
              name: 'message',
              label: 'ご相談内容・現在の課題（任意）',
              type: 'textarea',
              required: false,
              placeholder: '例：毎月試算表は届くが、読み方と次のアクションがわからない。経営会議を実質的なものにしたい。'
            }
          ]}
        />
      </LPSection>

      <LPBottomBar
        primaryLabel="初回ヒアリングを予約する"
        primaryHref="#form"
        secondaryLabel="サービス一覧を見る"
        secondaryHref="/services/"
      />
    </>
  );
}
