import Link from "next/link";

export const metadata = {
  title: "サービス一覧 | 九十九アドバイザリー",
  description:
    "九十九アドバイザリーのサービスページ。診断、月次整理、伴走の3段階で、中小企業の経営判断を進めやすくする支援内容を整理しています。",
};

const supportStages = [
  {
    id: "stage-1",
    stage: "01",
    title: "まず現状を整理する診断支援",
    subtitle: "何が問題なのか、どこから手をつけるべきかを明確にしたい会社へ。",
    targets: [
      "利益は出ているのに現金が残らない",
      "何から手をつければよいかわからない",
      "まずは今の数字を整理したい",
    ],
    deliverable:
      "現状の数字を整理し、気をつけるべき点や、次に見るべき論点をまとめた資料をお返しします。全体像をつかみ、最初の一歩を決めたい会社に向いています。",
    services: [
      { label: "財務健康診断", href: "/seizo/" },
      { label: "資金繰り診断", href: "/cashflow/" },
    ],
    cta: { label: "診断サービスを見る", href: "/seizo/" },
  },
  {
    id: "stage-2",
    stage: "02",
    title: "月次の数字を、判断しやすい形へ整える支援",
    subtitle: "毎月の数字や資料を、見るためのものではなく、使うためのものへ。",
    targets: [
      "毎月の数字が経営判断に活かせていない",
      "銀行や社内への説明資料が弱い",
      "資料づくりに時間がかかっている",
    ],
    deliverable:
      "資金の流れや月次の数字を、社内で見返しやすく、必要に応じて銀行説明にも使いやすい形へ整理した資料をお返しします。数字を集めるところまではできているが、その先の使い方まで整えたい会社に向いています。",
    services: [
      { label: "資金繰り整理", href: "/cashflow/" },
      { label: "銀行向け事業計画", href: "/bank-plan/" },
      { label: "月次経営レポート", href: "/contact/" },
    ],
    cta: { label: "月次整理支援を見る", href: "/contact/" },
  },
  {
    id: "stage-3",
    stage: "03",
    title: "重要な経営判断に伴走する支援",
    subtitle: "単発の整理だけで終わらせず、数字を見ながら次の一手まで考えたい会社へ。",
    targets: [
      "数字を見ながら次の一手を整理したい",
      "会議や月次レポートを経営判断につなげたい",
      "継続的に伴走してほしい",
    ],
    deliverable:
      "月次の論点整理にとどまらず、継続して見るべき指標、会議で確認すべきテーマ、次に動くべき論点まで含めて支援します。社内だけでは判断整理が進みにくく、外部の視点も入れながら進めたい会社に向いています。",
    services: [
      { label: "予実管理の伴走", href: "/contact/" },
      { label: "経営会議の設計・運営", href: "/contact/" },
      { label: "継続的な判断支援", href: "/contact/" },
    ],
    cta: { label: "伴走支援について問い合わせる", href: "/contact/" },
  },
];

const flowSteps = [
  {
    title: "まずは診断で現状を整理する",
    text: "課題の全体像と、最初に見るべき論点を見える形にします。",
  },
  {
    title: "次に、毎月の数字や資料を使いやすい形へ整える",
    text: "社内でも見返しやすく、説明にも使いやすい資料へ整えます。",
  },
  {
    title: "必要に応じて、継続的な伴走支援へ進む",
    text: "重要な判断を進める場面で、数字と論点を継続的に整理します。",
  },
];

const primaryButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 46,
  padding: "0 22px",
  borderRadius: 999,
  background: "var(--navy)",
  color: "#ffffff",
  fontSize: 14,
  fontWeight: 700,
  textDecoration: "none",
};

const secondaryButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 42,
  padding: "0 16px",
  borderRadius: 999,
  background: "#ffffff",
  color: "var(--navy)",
  border: "1px solid var(--line)",
  fontSize: 13,
  fontWeight: 700,
  textDecoration: "none",
};

const cardStyle = {
  background: "#ffffff",
  border: "1px solid var(--line)",
  borderRadius: 18,
  padding: 28,
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-section" style={{ paddingTop: 0, background: "#fff" }}>
        <div className="container">
          <div className="hero-box" style={{ paddingBottom: 40 }}>
            <div className="hero-label">SERVICES</div>
            <h1 className="hero-title" style={{ maxWidth: 760, marginBottom: 18 }}>
              状況に応じて選べる、3つの支援
            </h1>
            <div className="hero-text" style={{ maxWidth: 780 }}>
              <p style={{ marginTop: 0, marginBottom: 14 }}>
                まず現状を整理したいとき。毎月の数字を判断に使いやすい形へ整えたいとき。重要な経営判断に、
                継続して伴走してほしいとき。
              </p>
              <p style={{ margin: 0 }}>
                九十九アドバイザリーでは、そうした段階に応じて、支援を3つに分けています。
              </p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
              <Link href="/contact/" style={primaryButtonStyle}>
                お問い合わせフォームへ
              </Link>
              <Link href="#stages" style={secondaryButtonStyle}>
                3つの支援を見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section" style={{ background: "var(--bg)", paddingTop: 48 }}>
        <div className="container">
          <div
            style={{
              ...cardStyle,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            <div>
              <div className="hero-label">GUIDE</div>
              <h2 className="page-title" style={{ marginBottom: 0 }}>
                まず整理する。毎月整える。必要に応じて伴走する。
              </h2>
            </div>
            <div className="page-lead" style={{ maxWidth: "none" }}>
              <p style={{ marginTop: 0, marginBottom: 16 }}>
                最初から大きな支援を前提にする必要はありません。いま必要なところから始められるように、
                支援を3つに整理しています。
              </p>
              <p style={{ margin: 0 }}>
                まずは現状把握から入り、その後に月次整理や継続支援へ進める構成です。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="stages" className="page-section" style={{ background: "#fff" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 18,
            }}
          >
            {supportStages.map((stage) => (
              <article key={stage.id} id={stage.id} style={cardStyle}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    minHeight: 28,
                    padding: "0 10px",
                    borderRadius: 999,
                    background: "#f5f1e7",
                    color: "var(--gold)",
                    fontSize: 11,
                    fontWeight: 700,
                    marginBottom: 14,
                  }}
                >
                  STAGE {stage.stage}
                </div>

                <h2
                  style={{
                    margin: "0 0 10px",
                    color: "var(--navy)",
                    fontSize: 24,
                    lineHeight: 1.55,
                  }}
                >
                  {stage.title}
                </h2>

                <p
                  style={{
                    margin: "0 0 18px",
                    color: "var(--text)",
                    fontWeight: 700,
                    fontSize: 15,
                    lineHeight: 1.8,
                  }}
                >
                  {stage.subtitle}
                </p>

                <div style={{ marginBottom: 18 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--navy)",
                      marginBottom: 10,
                    }}
                  >
                    対象
                  </div>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: 18,
                      color: "var(--muted)",
                      fontSize: 14,
                      lineHeight: 1.9,
                    }}
                  >
                    {stage.targets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginBottom: 18 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--navy)",
                      marginBottom: 10,
                    }}
                  >
                    何が届くか
                  </div>
                  <p
                    style={{
                      margin: 0,
                      color: "var(--muted)",
                      fontSize: 14,
                      lineHeight: 1.9,
                    }}
                  >
                    {stage.deliverable}
                  </p>
                </div>

                <div style={{ marginBottom: 22 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--navy)",
                      marginBottom: 10,
                    }}
                  >
                    {stage.stage === "03" ? "想定支援" : "対応サービス"}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {stage.services.map((service) => (
                      <Link key={service.label} href={service.href} style={secondaryButtonStyle}>
                        {service.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link href={stage.cta.href} style={primaryButtonStyle}>
                  {stage.cta.label}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div
            style={{
              ...cardStyle,
              background: "#fbfaf7",
            }}
          >
            <div style={{ maxWidth: 760, marginBottom: 28 }}>
              <div className="hero-label">FLOW</div>
              <h2 className="page-title" style={{ marginBottom: 12 }}>
                支援は、必要に応じて段階的に深められます
              </h2>
              <div className="page-lead" style={{ maxWidth: 760 }}>
                <p style={{ marginTop: 0, marginBottom: 16 }}>
                  まずは診断で現状を整理する。次に、毎月の数字や資料を使いやすい形へ整える。
                  必要に応じて、継続的な伴走支援へ進む。
                </p>
                <p style={{ margin: 0 }}>
                  九十九アドバイザリーでは、この流れを前提に、いまの状況に合うところからご相談いただけるようにしています。
                </p>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 16,
              }}
            >
              {flowSteps.map((step, index) => (
                <article
                  key={step.title}
                  style={{
                    background: "#ffffff",
                    border: "1px solid var(--line)",
                    borderRadius: 16,
                    padding: 24,
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      color: "var(--gold)",
                      marginBottom: 10,
                    }}
                  >
                    STEP {index + 1}
                  </div>
                  <h3
                    style={{
                      margin: "0 0 10px",
                      fontSize: 18,
                      lineHeight: 1.6,
                      color: "var(--navy)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      lineHeight: 1.9,
                      color: "var(--muted)",
                    }}
                  >
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-section" style={{ background: "var(--navy)", paddingBottom: 80 }}>
        <div className="container">
          <div
            style={{
              maxWidth: 760,
              margin: "0 auto",
              textAlign: "center",
              color: "#ffffff",
            }}
          >
            <div
              style={{
                color: "#d9c58a",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.12em",
                marginBottom: 16,
              }}
            >
              CONTACT
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 36px)",
                lineHeight: 1.6,
                margin: "0 0 16px",
              }}
            >
              どれが自社に合うかわからない場合も、そのままフォームからお送りください
            </h2>
            <div
              style={{
                fontSize: 15,
                lineHeight: 1.95,
                color: "rgba(255,255,255,0.84)",
                marginBottom: 28,
              }}
            >
              <p style={{ marginTop: 0, marginBottom: 14 }}>
                ご相談内容を確認し、資料請求・ご案内・日程調整のいずれが適切かを返信します。
              </p>
              <p style={{ margin: 0 }}>
                まだ課題が整理しきれていない段階でも問題ありません。
              </p>
            </div>

            <Link
              href="/contact/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 46,
                padding: "0 22px",
                borderRadius: 999,
                background: "#ffffff",
                color: "var(--navy)",
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              お問い合わせフォームへ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
