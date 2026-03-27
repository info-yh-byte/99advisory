import Link from 'next/link';

const SERVICE_MAP = {
  seizo: {
    title: '経営数字診断の資料請求を受け付けました',
    description:
      'ご入力いただいたメールアドレス宛に、自動返信メールをお送りしています。まずはメールをご確認ください。',
    resources: [
      {
        href: '/seizo/',
        label: 'サービスページ',
        title: '経営数字診断ページに戻る',
        body: '内容をもう一度確認したい場合はこちら。'
      },
      {
        href: '/articles/',
        label: '記事一覧',
        title: '先に記事を読む',
        body: '経営判断や数字の見方に関する記事を読めます。'
      },
      {
        href: '/contact/',
        label: 'お問い合わせ',
        title: 'そのまま相談する',
        body: '状況がはっきりしている場合は、こちらからご相談ください。'
      }
    ]
  },
  cashflow: {
    title: '資金繰りチェック資料の請求を受け付けました',
    description:
      'ご入力いただいたメールアドレス宛に、自動返信メールをお送りしています。届かない場合は迷惑メールフォルダもご確認ください。',
    resources: [
      {
        href: '/articles/profit-vs-cash/',
        label: '関連記事',
        title: '黒字なのに現金が残らない理由',
        body: '利益と現金がズレる基本構造を、先に整理できます。'
      },
      {
        href: '/cashflow/',
        label: 'サービスページ',
        title: '資金繰り改善支援ページに戻る',
        body: '支援内容をあらためて確認したい場合はこちら。'
      },
      {
        href: '/contact/',
        label: 'お問い合わせ',
        title: 'そのまま相談する',
        body: '状況が具体的であれば、相談内容をそのままお送りください。'
      }
    ]
  },
  'bank-plan': {
    title: '融資準備資料の請求を受け付けました',
    description:
      'ご入力いただいたメールアドレス宛に、自動返信メールをお送りしています。メール内の案内をご確認ください。',
    resources: [
      {
        href: '/articles/bank-loan-checkpoints/',
        label: '関連記事',
        title: '銀行融資を受ける前に確認しておくべき5つのポイント',
        body: '銀行が見ている論点を先に確認できます。'
      },
      {
        href: '/bank-plan/',
        label: 'サービスページ',
        title: '銀行融資支援ページに戻る',
        body: '支援内容や相談の流れを見直したい場合はこちら。'
      },
      {
        href: '/contact/',
        label: 'お問い合わせ',
        title: 'そのまま相談する',
        body: '融資・借換え・リスケ前の相談がある場合はこちら。'
      }
    ]
  }
};

function getThanksContent(service) {
  return SERVICE_MAP[service] || {
    title: '資料請求を受け付けました',
    description:
      'ご入力いただいたメールアドレス宛に、自動返信メールをお送りしています。まずはメールをご確認ください。',
    resources: [
      {
        href: '/articles/',
        label: '記事一覧',
        title: '先に記事を読む',
        body: '関連する記事一覧はこちらです。'
      },
      {
        href: '/contact/',
        label: 'お問い合わせ',
        title: 'そのまま相談する',
        body: '相談をご希望の場合はこちらからお送りください。'
      }
    ]
  };
}

export const metadata = {
  title: '送信完了 | 九十九アドバイザリー',
  description: '資料請求・お問い合わせの送信完了ページです。'
};

export default async function ThanksPage({ searchParams }) {
  const params = await searchParams;
  const service = params?.service || '';
  const content = getThanksContent(service);

  return (
    <div className="thanks-page">
      <div className="thanks-wrap">
        <div className="thanks-shell">
          <div className="thanks-badge">THANK YOU</div>
          <h1 className="thanks-title">{content.title}</h1>
          <p className="thanks-description">{content.description}</p>

          <div className="thanks-note">
            メールが見当たらない場合は、迷惑メールフォルダ・プロモーションタブもご確認ください。
          </div>

          <div className="thanks-actions">
            <Link href="/contact/" className="thanks-primary">
              相談内容を送る
            </Link>
            <Link href="/" className="thanks-secondary">
              ホームへ戻る
            </Link>
          </div>
        </div>

        <div className="thanks-resource-grid">
          {content.resources.map((item) => (
            <Link key={item.href + item.title} href={item.href} className="thanks-resource-card">
              <div className="thanks-resource-label">{item.label}</div>
              <div className="thanks-resource-title">{item.title}</div>
              <div className="thanks-resource-body">{item.body}</div>
              <div className="thanks-resource-link">見る →</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
