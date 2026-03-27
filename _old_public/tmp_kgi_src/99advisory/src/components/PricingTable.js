import { COLORS } from "../constants";
import Heading from "./Heading";
import services from "../data/services";

export default function PricingTable() {
  return (
    <section id="services" style={{ background: COLORS.white, padding: "72px 20px" }}>
      <Heading
        tag="Services & Pricing"
        title={"サービスと料金"}
        sub={"スポットでも月額でも。いまの状態に合わせて選べます。"}
      />
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {services.map(function (s, i) {
          return (
            <div
              key={i}
              style={{
                background: COLORS.white,
                borderRadius: 18,
                overflow: "hidden",
                border:
                  s.badge === "人気"
                    ? "2px solid " + COLORS.orange
                    : "1px solid " + COLORS.border,
                display: "flex",
                flexDirection: "column",
                position: "relative",
                transition: "box-shadow .25s",
              }}
              onMouseEnter={function (e) {
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,.07)";
              }}
              onMouseLeave={function (e) {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {s.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    background: s.bc,
                    color: "#fff",
                    padding: "4px 12px",
                    borderRadius: 50,
                    fontSize: 10,
                    fontWeight: 800,
                  }}
                >
                  {s.badge}
                </div>
              )}
              <div style={{ padding: "26px 22px 16px" }}>
                <div style={{ fontSize: 30, marginBottom: 10 }}>{s.icon}</div>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: COLORS.text,
                    marginBottom: 10,
                    lineHeight: 1.4,
                  }}
                >
                  {s.name}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: COLORS.sub,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {s.desc}
                </p>
              </div>
              <div
                style={{
                  background: COLORS.greenPale,
                  padding: "18px 22px",
                  marginTop: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 4,
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{ fontSize: 26, fontWeight: 900, color: COLORS.green }}
                  >
                    {s.price}
                  </span>
                  <span
                    style={{ fontSize: 12, color: COLORS.sub, fontWeight: 600 }}
                  >
                    {s.unit}
                  </span>
                </div>
                <div
                  style={{ fontSize: 11, color: COLORS.faint, marginBottom: 14 }}
                >
                  {s.note}
                </div>
                {s.points.map(function (p, j) {
                  return (
                    <div
                      key={j}
                      style={{
                        fontSize: 12,
                        color: COLORS.text,
                        display: "flex",
                        gap: 6,
                        alignItems: "center",
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          color: COLORS.green,
                          fontWeight: 800,
                          fontSize: 11,
                        }}
                      >
                        {"\u2713"}
                      </span>{" "}
                      {p}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: 28,
          fontSize: 13,
          color: COLORS.faint,
        }}
      >
        {"※ どれを選べばいいか分からない場合も、無料相談で一緒に整理できます"}
      </div>
    </section>
  );
}
