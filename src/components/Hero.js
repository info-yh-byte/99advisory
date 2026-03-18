import { COLORS, FORM_URL, DIAG_URL } from "../constants";

export default function Hero() {
  return (
    <section
      id="top"
      style={{
        background: COLORS.white,
        paddingTop: 100,
        paddingBottom: 60,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: COLORS.greenPale,
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: COLORS.orangeLight,
          opacity: 0.4,
        }}
      />
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: COLORS.greenLight,
            padding: "6px 18px",
            borderRadius: 50,
            fontSize: 12,
            fontWeight: 700,
            color: COLORS.green,
            marginBottom: 28,
            letterSpacing: 0.5,
          }}
        >
          {"中小企業向け 経営判断の伴走支援"}
        </div>

        <h1
          style={{
            fontSize: "clamp(26px, 5vw, 42px)",
            fontWeight: 900,
            color: COLORS.text,
            lineHeight: 1.6,
            marginBottom: 20,
          }}
        >
          {"決算書や試算表は見ている。"}
          <br />
          {"でも、次の一手に自信が持てない。"}
        </h1>

        <p
          style={{
            fontSize: "clamp(14px, 2vw, 16px)",
            color: COLORS.sub,
            lineHeight: 1.9,
            maxWidth: 520,
            margin: "0 auto 36px",
          }}
        >
          {"資金繰り、返済余力、広告費の回収。"}
          <br />
          {"頭の中にある判断材料を、"}
          <br />
          {"見える形に整えます。"}
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 36,
          }}
        >
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: COLORS.orange,
              color: "#fff",
              padding: "16px 34px",
              borderRadius: 50,
              fontWeight: 800,
              fontSize: 15,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(232,115,74,.3)",
              transition: "transform .2s",
            }}
            onMouseEnter={function (e) {
              e.target.style.transform = "scale(1.03)";
            }}
            onMouseLeave={function (e) {
              e.target.style.transform = "scale(1)";
            }}
          >
            {"まずは30分、無料で相談する"}
          </a>
          <a
            href={DIAG_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: COLORS.white,
              color: COLORS.green,
              padding: "16px 34px",
              borderRadius: 50,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
              border: "2px solid " + COLORS.green,
            }}
          >
            {"1分で診断してみる"}
          </a>
        </div>

        <p style={{ fontSize: 12, color: COLORS.faint }}>
          {"今の状況を話すだけで大丈夫です / NDAにも対応しています / 無理な売り込みはしません"}
        </p>
      </div>
    </section>
  );
}
