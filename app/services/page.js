import Link from 'next/link';

export const metadata = {
  title: 'サービス一覧 | 99advisory',
  description:
    '99advisoryのサービス一覧。製造・建設向け診断、資金繰り改善、銀行融資支援など、中小企業の経営判断を支える支援内容を整理しています。',
};

const SERVICES = [
  {
    href: '/seizo/',
    title: '製造・建設向け 経営数字診断',
    subtitle: '忙しいのに利益が残らない会社へ',
    description:
      '案件別採算、試算表の読み方、月末の資金繰りなど、現場は動いているのに数字が経営判断につながっていない状態を整理します。',
    bullets: [
      '案件ごとの採算が見えていない',
      '試算表は来るが、次の打ち手が決まらない',
      '利益が残らない原因を構造で整理したい',
    ],
    cta: '製造・建設向け診断を見る',
  },
  {
    href: '/cashflow/',
    title: '資金繰り改善支援',
    subtitle: '黒字なのに現金が残らない会社へ',
    description:
      '利益と現金のズレを整理し、何から確認すべきか、どこに手を打つべきかを優先順位つきで見える化します。',
    bullets: [
      '利益は出ているのに資金が苦しい',
      '売掛・在庫・借入のどこが重いか分からない',
      '資金繰りを勘ではなく数字で見たい',
    ],
    cta: '資金繰り改善支援を見る',
  },
  {
    href: '/bank-plan/',
    title: '銀行融資・事業計画整理支援',
    subtitle: '融資前に、数字と説明を整えたい会社へ',
    description:
      '銀行が気にする論点に沿って、事業計画の骨格、説明材料、返済余力の見せ方を整理します。',
    bullets: [
      '融資・借換え・リスケ前に準備したい',
      '銀行に何をどう説明すべきか分からない',
      '事業計画の根拠整理をしたい',
    ],
    cta: '銀行融資支援を見る',
  },
];

const SELECT_GUIDE = [
  {
    title: 'まず現状を整理したい',
    text: '案件別採算や試算表の使い方など、経営数字の土台から見直したい場合は「製造・建設向け 経営数字診断」が近いです。',
    href: '/seizo/',
    label: '製造・建設向け診断へ',
  },
  {
    title: 'お金の回り方を見直したい',
    text: '黒字でも口座残高が不安、資金繰りが勘に依存している、という場合は「資金繰り改善支援」が近いです。',
    href: '/cashflow/',
    label: '資金繰り改善支援へ',
  },
  {
    title: '銀行提出前に整えたい',
    text: '追加融資、借換え、リスケ前に、数字と説明材料を先に整理したい場合は「銀行融資・事業計画整理支援」が近いです。',
    href: '/bank-plan/',
    label: '銀行融資支援へ',
  },
];

const cardStyle = {
  background: '#ffffff',
  border: '1px solid var(--line)',
  padding: '28px',
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const buttonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 18px',
  borderRadius: '999px',
  background: 'var(--navy)',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 700,
  width: 'fit-content',
};

const subButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 18px',
  borderRadius: '999px',
  background: '#ffffff',
  color: 'var(--navy)',
  border: '1px solid var(--line)',
  fontSize: '14px',
  fontWeight: 700,
  width: 'fit-content',
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-section">
        <div className="container">
          <div className="hero-box" style={{ paddingTop: 56, paddingBottom: 24 }}>
            <div className="hero-label">SERVICES</div>
            <h1 className="hero-title">
              状況ごとに、
              <br />
              必要な支援を選べます。
            </h1>
            <p className="hero-text">
              99advisory では、中小企業の経営判断に関わる支援を、
              「数字の整理」「資金繰り」「銀行説明」の3つの入口から提供しています。
              まずは今の悩みに近いものをお選びください。
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
              <Link href="/contact/" style={buttonStyle}>
                まず相談したい
              </Link>
              <Link href="/articles/" style={subButtonStyle}>
                先に記事を読む
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section" style={{ paddingTop: 12 }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {SERVICES.map((service) => (
              <article key={service.href} style={cardStyle}>
                <div>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      color: 'var(--gold)',
                      marginBottom: 10,
                    }}
                  >
                    SERVICE
                  </div>
                  <h2
                    style={{
                      fontSize: '24px',
                      lineHeight: 1.5,
                      color: 'var(--navy)',
                      margin: '0 0 8px',
                    }}
                  >
                    {service.title}
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      color: 'var(--text)',
                      fontWeight: 700,
                      fontSize: '15px',
                      lineHeight: 1.8,
                    }}
                  >
                    {service.subtitle}
                  </p>
                </div>

                <p
                  style={{
                    margin: 0,
                    color: 'var(--muted)',
                    fontSize: '14px',
                    lineHeight: 1.9,
                  }}
                >
                  {service.description}
                </p>

                <div>
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: 'var(--navy)',
                      marginBottom: 10,
                    }}
                  >
                    こんな状況に
                  </div>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: 18,
                      color: 'var(--muted)',
                      fontSize: '14px',
                      lineHeight: 1.9,
                    }}
                  >
                    {service.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: 'auto' }}>
                  <Link href={service.href} style={buttonStyle}>
                    {service.cta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div
            style={{
              background: '#ffffff',
              border: '1px solid var(--line)',
              borderRadius: '20px',
              padding: '32px',
            }}
          >
            <h2 className="page-title" style={{ marginBottom: 8 }}>
              どれを選ぶか迷う場合
            </h2>
            <p className="page-lead" style={{ marginTop: 0 }}>
              いま一番困っていることを基準に選ぶと、入口を決めやすくなります。
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '16px',
                marginTop: '24px',
              }}
            >
              {SELECT_GUIDE.map((item) => (
                <div
                  key={item.href}
                  style={{
                    border: '1px solid var(--line)',
                    borderRadius: '16px',
                    padding: '20px',
                    background: 'var(--bg)',
                  }}
                >
                  <h3
                    style={{
                      margin: '0 0 10px',
                      color: 'var(--navy)',
                      fontSize: '18px',
                      lineHeight: 1.6,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      margin: '0 0 16px',
                      color: 'var(--muted)',
                      fontSize: '14px',
                      lineHeight: 1.9,
                    }}
                  >
                    {item.text}
                  </p>
                  <Link href={item.href} style={subButtonStyle}>
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div
            style={{
              background: 'var(--navy)',
              color: '#ffffff',
              borderRadius: '20px',
              padding: '36px 32px',
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: '#d9c58a',
                marginBottom: 12,
              }}
            >
              CONTACT
            </div>
            <h2 style={{ margin: '0 0 12px', fontSize: '28px', lineHeight: 1.5 }}>
              自社にどれが合うか迷う場合は、
              <br />
              まず相談内容だけお送りください。
            </h2>
            <p style={{ margin: '0 0 20px', fontSize: '15px', lineHeight: 1.9, opacity: 0.92 }}>
              無理にその場で決める必要はありません。状況を見ながら、どの入口が近いか整理します。
            </p>
            <Link
              href="/contact/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 18px',
                borderRadius: '999px',
                background: '#ffffff',
                color: 'var(--navy)',
                fontSize: '14px',
                fontWeight: 700,
              }}
            >
              お問い合わせへ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
