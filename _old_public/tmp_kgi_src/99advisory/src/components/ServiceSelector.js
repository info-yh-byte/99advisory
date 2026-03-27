import { COLORS, scrollTo } from "../constants";
import Heading from "./Heading";
import { routes } from "../data/services";

export default function ServiceSelector() {
  return (
    <section style={{ background: COLORS.bg, padding: "60px 20px" }}>
      <Heading
        tag="Guide"
        title={"どれを選べばいい？"}
        sub={"いまの状態に近いものをタップしてください。"}
      />
      <div
        style={{
          maxWidth: 700,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {routes.map(function (r, i) {
          return (
            <div
              key={i}
              onClick={function () {
                scrollTo("services");
              }}
              style={{
                background: COLORS.white,
                borderRadius: 14,
                padding: "18px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                border: "1px solid " + COLORS.border,
                transition: "all .25s",
                gap: 12,
              }}
              onMouseEnter={function (e) {
                e.currentTarget.style.borderColor = r.c;
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.05)";
              }}
              onMouseLeave={function (e) {
                e.currentTarget.style.borderColor = COLORS.border;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 24 }}>{r.emoji}</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>
                  {r.label}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: r.c }}>
                  {r.arrow}
                </span>
                <span style={{ color: r.c }}>{"\u2192"}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
