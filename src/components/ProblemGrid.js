import { COLORS, scrollTo } from "../constants";
import Heading from "./Heading";
import problems from "../data/problems";

export default function ProblemGrid() {
  return (
    <section id="problems" style={{ background: COLORS.white, padding: "72px 20px" }}>
      <Heading
        tag="Common Problems"
        title={"こんなモヤモヤ、ありませんか？"}
        sub={"ひとつでもピンときたら、まずは30分の無料相談へ。"}
      />
      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 14,
        }}
      >
        {problems.map(function (p, i) {
          return (
            <div
              key={i}
              style={{
                background: COLORS.white,
                border: "1px solid " + COLORS.border,
                borderRadius: 16,
                padding: "26px 22px",
                cursor: "pointer",
                transition: "all .25s",
              }}
              onMouseEnter={function (e) {
                e.currentTarget.style.borderColor = COLORS.green;
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,.06)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={function (e) {
                e.currentTarget.style.borderColor = COLORS.border;
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              onClick={function () {
                scrollTo("services");
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: p.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  marginBottom: 14,
                }}
              >
                {p.icon}
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: COLORS.text,
                  lineHeight: 1.6,
                  whiteSpace: "pre-line",
                }}
              >
                {p.title}
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 12,
                  fontWeight: 700,
                  color: COLORS.green,
                }}
              >
                {"対応するサービスを見る \u2192"}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
