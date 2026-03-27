import Link from "next/link";
import { COLORS } from "@/lib/site-constants";

export const metadata = {
  title: "九十九アドバイザリー | 中小企業の経営判断を、数字から整える",
  description:
    "利益は出ている、試算表もある。それでも次の判断に迷う中小企業へ。九十九アドバイザリーは、数字と論点を整理し、経営判断を進めやすい形へ整える支援を行っています。",
};

const heroBadges = ["秘密厳守", "NDA締結可", "初回相談受付"];

const problems = [
  "利益は出ているのに、現金が思ったほど残らない。",
  "毎月の数字を見ても、何を優先すべきか決めきれない。",
  "銀行や社内に説明する資料づくりが、いつも後回しになる。",
  "資金繰りに不安はあるが、どこから整理すればよいか見えない。",
  "単発で意見を聞くだけでなく、必要に応じて継続的に相談したい。",
];

const categories = [
  {
    stage: "01",
    title: "まず現状を整理する診断支援",
    body:
      "何が問題なのか、どこから手をつけるべきかを整理したい会社へ。まずは数字を見ながら、現状と論点をはっきりさせるための入口支援です。",
    href: "/services/#stage-1",
    cta: "診断支援を見る",
  },
  {
    stage: "02",
    title: "月次の数字を、判断に使いやすい形へ整える支援",
    body:
      "毎月の数字は見ているが、経営判断や説明資料にうまくつながっていない会社へ。数字と資料を、毎月使える形へ整えていく支援です。",
    href: "/services/#stage-2",
    cta: "月次整理支援を見る",
  },
  {
    stage: "03",
    title: "重要な経営判断に伴走する支援",
    body:
      "単発の整理だけでなく、数字を見ながら次の一手まで一緒に考えたい会社へ。必要に応じて、継続的な判断支援や会議設計まで対応します。",
    href: "/services/#stage-3",
    cta: "伴走支援を見る",
  },
];

const deliverables = [
  {
    title: "財務の状態を整理した診断メモ",
    text:
      "現状の数字を読み解き、気をつけるべき点と次に確認すべき論点を、経営者が見返しやすい形で整理します。",
  },
  {
    title: "資金の流れと注意点をまとめた整理資料",
    text:
      "利益と現金のズレや返済負担の見え方を整理し、どこで無理が出やすいかを共有しやすい形にまとめます。",
  },
  {
    title: "月次レポートや計画資料",
    text:
      "銀行や社内への説明にもつなげやすいよう、数字の見え方と打ち手の論点を実務で使える資料へ整えます。",
  },
];

const entryServices = [
  {
    title: "財務健康診断",
    body:
      "まず全体像を整理したい会社へ。現状の数字を見ながら、どこに注意すべきか、何から着手すべきかを明確にします。",
    href: "/seizo/",
    cta: "診断サービスを見る",
  },
  {
    title: "資金繰り診断",
    body:
      "現金の流れや返済負担に不安がある会社へ。資金の動きを整理し、どこに無理が出やすいかを見える形にします。",
    href: "/cashflow/",
    cta: "資金繰り診断を見る",
  },
  {
    title: "月次経営レポート",
    body:
      "毎月の数字を、経営判断に使いやすい形へ整えたい会社へ。社内共有や銀行説明にもつながる、月次の土台資料を整えます。",
    href: "/contact/",
    cta: "月次整理について問い合わせる",
  },
];

const supportFlow = [
  {
    label: "スポット相談",
    title: "まずは診断や単発の整理から始める",
    text:
      "課題がまだ漠然としている段階でも、現状と論点を整理するところから入れます。",
  },
  {
    label: "月次整理",
    title: "毎月の数字を、判断に使える状態へ整える",
    text:
      "継続して見るべき数字や資料の形を決め、社内共有や説明の土台を整えていきます。",
  },
  {
    label: "伴走支援",
    title: "必要なときに、重要な判断まで一緒に考える",
    text:
      "会議設計や論点整理を含め、次の一手まで外部の視点を入れながら進められます。",
  },
];

const fitPoints = [
  "毎月の数字は見ているが、まだ判断につながる形には整理しきれていない。",
  "利益、資金繰り、銀行説明、月次管理のどこかに引っかかりがある。",
  "社内だけで整理しきれない論点を、外部の視点も入れながら進めたい。",
];

const trustPoints = [
  "秘密厳守。必要に応じて NDA 締結にも対応します。",
  "顧問税理士や社内担当者と併用しながら進められます。",
  "まだ課題が整理しきれていない段階でも、そのままご相談いただけます。",
];

const primaryButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 46,
  padding: "0 22px",
  borderRadius: 999,
  background: COLORS.orange,
  color: "#ffffff",
  fontSize: 14,
  fontWeight: 700,
  textDecoration: "none",
  boxShadow: "0 8px 20px rgba(232,115,74,0.18)",
};

const secondaryButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 46,
  padding: "0 22px",
  borderRadius: 999,
  background: "#ffffff",
  color: "var(--navy)",
  border: "1px solid var(--line)",
  fontSize: 14,
  fontWeight: 700,
  textDecoration: "none",
};

const cardStyle = {
  background: "#ffffff",
  border: "1px solid var(--line)",
  borderRadius: 18,
  padding: 28,
};

export default function HomePage() {
  return (
    <div style={{ color: "var(--text)", overflowX: "hidden" }}>
      <section
        className="page-section"
        style={{ background: COLORS.white, paddingTop: 0, paddingBottom: 56 }}
      >
        <div className="container">
          <div className="hero-box" style={{ paddingBottom: 40 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "7px 14px",
                borderRadius: 999,
                background: COLORS.greenPale,
                color: COLORS.green,
                fontSize: 12,
                fontWeight: 700,
                marginBottom: 18,
              }}
            >
              中小企業の経営判断を、数字から整える
            </div>

            <h1
              className="hero-title"
              style={{
                maxWidth: 720,
                marginBottom: 18,
                fontSize: "clamp(34px, 5vw, 46px)",
              }}
            >
              数字を見ているのに、
              <br />
              次の判断に迷う会社へ。
            </h1>

            <div className="hero-text" style={{ maxWidth: 760 }}>
              <p style={{ margin: "0 0 14px" }}>
                利益は出ている。試算表もある。けれど、資金繰り、銀行への説明、投資判断、
                毎月の打ち手が、まだはっきりしない。
              </p>
              <p style={{ margin: 0 }}>
                九十九アドバイザリーは、数字と論点を整理し、経営判断を進めやすい形へ整えるための支援を行っています。
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 24,
              }}
            >
              {heroBadges.map((badge) => (
                <span
                  key={badge}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    minHeight: 34,
                    padding: "0 14px",
                    borderRadius: 999,
                    background: "#ffffff",
                    border: "1px solid var(--line)",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--navy)",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                marginTop: 30,
              }}
            >
              <Link href="/contact/" style={primaryButtonStyle}>
                お問い合わせフォームへ
              </Link>
              <Link href="/services/" style={secondaryButtonStyle}>
                サービス一覧を見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section" style={{ background: "var(--bg)", paddingTop: 56 }}>
        <div className="container">
          <div style={{ maxWidth: 760, marginBottom: 28 }}>
            <div className="hero-label">COMMON PROBLEMS</div>
            <h2 className="page-title" style={{ marginBottom: 12 }}>
              こんな状態で、止まっていませんか
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            {problems.map((item, index) => (
              <div key={item} style={cardStyle}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "var(--gold)",
                    marginBottom: 14,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.9,
                    color: "var(--text)",
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section" style={{ background: COLORS.white }}>
        <div className="container">
          <div
            style={{
              ...cardStyle,
              display: "grid",
              gap: 28,
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            }}
          >
            <div>
              <div className="hero-label">PHILOSOPHY</div>
              <h2 className="page-title" style={{ marginBottom: 16 }}>
                数字があることと、判断できることは、同じではありません
              </h2>
            </div>

            <div className="page-lead" style={{ maxWidth: "none" }}>
              <p style={{ marginTop: 0, marginBottom: 16 }}>
                決算書、試算表、資金繰り表、銀行向けの資料。必要な情報が手元にあっても、
                判断しやすい形に整理されていなければ、次の一手は決めにくくなります。
              </p>
              <p style={{ margin: 0 }}>
                九十九アドバイザリーは、数字をただ並べるのではなく、いま見るべき論点を整理し、
                経営判断につながる形へ整える支援を行っています。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div style={{ maxWidth: 780, marginBottom: 28 }}>
            <div className="hero-label">SUPPORT CATEGORIES</div>
            <h2 className="page-title" style={{ marginBottom: 12 }}>
              いま必要なところから、順番にご相談いただけます
            </h2>
            <p className="page-lead" style={{ margin: 0 }}>
              最初から大きな支援を前提にする必要はありません。まず現状を整理し、その後に毎月の数字を整え、
              必要に応じて継続的な伴走へ進める。そうした流れに合わせて、支援を3つに分けています。
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {categories.map((category) => (
              <article key={category.stage} style={cardStyle}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    minHeight: 28,
                    padding: "0 10px",
                    borderRadius: 999,
                    background: COLORS.greenPale,
                    color: COLORS.green,
                    fontSize: 11,
                    fontWeight: 700,
                    marginBottom: 14,
                  }}
                >
                  STAGE {category.stage}
                </div>
                <h3
                  style={{
                    margin: "0 0 12px",
                    color: "var(--navy)",
                    fontSize: 22,
                    lineHeight: 1.6,
                  }}
                >
                  {category.title}
                </h3>
                <p
                  style={{
                    margin: "0 0 18px",
                    color: "var(--muted)",
                    fontSize: 14,
                    lineHeight: 1.9,
                  }}
                >
                  {category.body}
                </p>
                <Link
                  href={category.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "var(--navy)",
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  {category.cta}
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section" style={{ background: COLORS.white }}>
        <div className="container">
          <div style={{ maxWidth: 780, marginBottom: 28 }}>
            <div className="hero-label">DELIVERABLES</div>
            <h2 className="page-title" style={{ marginBottom: 12 }}>
              お返しするのは、判断しやすく整理された資料です
            </h2>
            <div className="page-lead" style={{ maxWidth: 760 }}>
              <p style={{ marginTop: 0, marginBottom: 16 }}>
                感覚的なコメントだけをお返しするのではなく、数字の見え方、気をつけるべき点、
                次に見るべき論点を、整理した形でお返しします。
              </p>
              <p style={{ margin: 0 }}>
                たとえば、財務の状態を整理した診断メモ、資金の流れと注意点をまとめた資金繰り整理資料、
                銀行や社内への説明に使いやすい月次レポートや計画資料など、目的に応じて、実務で使いやすい形に整えます。
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
            }}
          >
            {deliverables.map((item) => (
              <article key={item.title} style={cardStyle}>
                <h3
                  style={{
                    margin: "0 0 12px",
                    fontSize: 18,
                    lineHeight: 1.6,
                    color: "var(--navy)",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    lineHeight: 1.9,
                    color: "var(--muted)",
                  }}
                >
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div style={{ maxWidth: 780, marginBottom: 28 }}>
            <div className="hero-label">ENTRY SERVICES</div>
            <h2 className="page-title" style={{ marginBottom: 12 }}>
              まずは、いまの悩みに近いところからご覧ください
            </h2>
            <p className="page-lead" style={{ margin: 0 }}>
              最初にご相談いただきやすい入口商品を、3つご用意しています。それぞれ単体でもご利用いただけますが、
              必要に応じてその後の月次整理や継続支援へつなげることもできます。
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 16,
            }}
          >
            {entryServices.map((service) => (
              <article key={service.title} style={cardStyle}>
                <h3
                  style={{
                    margin: "0 0 12px",
                    fontSize: 22,
                    lineHeight: 1.6,
                    color: "var(--navy)",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    margin: "0 0 18px",
                    fontSize: 14,
                    lineHeight: 1.9,
                    color: "var(--muted)",
                  }}
                >
                  {service.body}
                </p>
                <Link
                  href={service.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "var(--navy)",
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  {service.cta}
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section" style={{ background: COLORS.white }}>
        <div className="container">
          <div
            style={{
              ...cardStyle,
              background: "#fbfaf7",
            }}
          >
            <div style={{ maxWidth: 780, marginBottom: 28 }}>
              <div className="hero-label">FLOW</div>
              <h2 className="page-title" style={{ marginBottom: 12 }}>
                必要に応じて、単発相談から継続支援へ進めます
              </h2>
              <div className="page-lead" style={{ maxWidth: 760 }}>
                <p style={{ marginTop: 0, marginBottom: 16 }}>
                  最初から継続契約を前提にする必要はありません。まずは診断や単発の整理から始め、
                  そのうえで必要があれば、毎月の数字の見直しや、継続的な伴走支援へ進めます。
                </p>
                <p style={{ margin: 0 }}>
                  いまの状況に合わせて、無理のない順番でご相談いただけます。
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
              {supportFlow.map((step, index) => (
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
                      color: "var(--gold)",
                      letterSpacing: "0.08em",
                      marginBottom: 10,
                    }}
                  >
                    STEP {index + 1}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: COLORS.green,
                      marginBottom: 8,
                    }}
                  >
                    {step.label}
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

      <section className="page-section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            <article style={cardStyle}>
              <div className="hero-label">FIT</div>
              <h2 className="page-title" style={{ fontSize: 28, marginBottom: 12 }}>
                このような会社に向いています
              </h2>
              <p className="page-lead" style={{ marginTop: 0, marginBottom: 18, maxWidth: "none" }}>
                九十九アドバイザリーは、そうした中小企業の経営者や財務担当者に向いた支援です。
              </p>
              <div style={{ display: "grid", gap: 12 }}>
                {fitPoints.map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      fontSize: 14,
                      lineHeight: 1.9,
                      color: "var(--text)",
                    }}
                  >
                    <span style={{ color: COLORS.green, fontWeight: 700 }}>•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>

            <article
              style={{
                ...cardStyle,
                background: COLORS.greenPale,
                borderColor: "rgba(26,138,122,0.15)",
              }}
            >
              <div className="hero-label" style={{ color: COLORS.green }}>
                TRUST
              </div>
              <h2 className="page-title" style={{ fontSize: 28, marginBottom: 12 }}>
                落ち着いて相談できる体制を整えています
              </h2>
              <div style={{ display: "grid", gap: 12 }}>
                {trustPoints.map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      fontSize: 14,
                      lineHeight: 1.9,
                      color: "var(--text)",
                    }}
                  >
                    <span style={{ color: COLORS.green, fontWeight: 700 }}>•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>
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
                fontSize: "clamp(30px, 4.5vw, 38px)",
                lineHeight: 1.6,
                margin: "0 0 16px",
              }}
            >
              まずは、今の状況をフォームからお送りください
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
                ご相談内容や資料請求のご希望を確認のうえ、自動返信メールをお送りします。内容に応じて、
                資料送付、日程調整、ご案内のいずれかをお返しします。
              </p>
              <p style={{ margin: 0 }}>
                まだ整理しきれていない段階でも、そのままお送りいただいて問題ありません。
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <Link href="/contact/" style={primaryButtonStyle}>
                お問い合わせフォームへ
              </Link>
              <Link
                href="/services/"
                style={{
                  ...secondaryButtonStyle,
                  background: "transparent",
                  color: "#ffffff",
                  borderColor: "rgba(255,255,255,0.24)",
                }}
              >
                サービス一覧を見る
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
