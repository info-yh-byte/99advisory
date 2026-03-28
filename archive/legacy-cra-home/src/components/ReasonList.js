import { COLORS } from "../constants";
import Heading from "./Heading";
import reasons from "../data/reasons";

export default function ReasonList() {
  return (
    <section id="reasons" style={{ background: COLORS.white, padding: "72px 20px" }}>
      <Heading tag="Why Us" title={"選ばれている理由"} />
      <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
        {reasons.map(function (r, i) {
          return (
            <div key={i} style={{ display: "flex", gap: 18, alignItems: "flex-start", background: COLORS.white, border: "1px solid " + COLORS.border, borderRadius: 14, padding: "22px 24px", transition: "border-color .2s" }}
              onMouseEnter={function (e) { e.currentTarget.style.borderColor = COLORS.green; }}
              onMouseLeave={function (e) { e.currentTarget.style.borderColor = COLORS.border; }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: COLORS.greenPale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{r.icon}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: COLORS.text, marginBottom: 4 }}>{r.title}</div>
                <div style={{ fontSize: 13, color: COLORS.sub, lineHeight: 1.7 }}>{r.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
