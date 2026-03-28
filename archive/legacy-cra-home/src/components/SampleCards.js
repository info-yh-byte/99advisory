import { COLORS } from "../constants";
import Heading from "./Heading";
import samples from "../data/samples";

export default function SampleCards() {
  return (
    <section id="samples" style={{ background: COLORS.bg, padding: "72px 20px" }}>
      <Heading
        tag="Samples"
        title={"実際にお渡しする資料のサンプル"}
        sub={"課題ごとに見比べて、自分に近いものを探せます。"}
      />
      <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14 }}>
        {samples.map(function (s, i) {
          return (
            <div key={i} style={{ background: COLORS.white, borderRadius: 16, overflow: "hidden", border: "1px solid " + COLORS.border, transition: "all .25s", cursor: "pointer" }}
              onMouseEnter={function (e) { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,.06)"; }}
              onMouseLeave={function (e) { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ height: 4, background: s.color }} />
              <div style={{ padding: "22px 20px" }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: s.color, letterSpacing: 2, marginBottom: 8 }}>{"SAMPLE " + s.num}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: COLORS.text, marginBottom: 10 }}>{s.name}</h3>
                <div style={{ display: "inline-block", background: COLORS.orangeLight, padding: "3px 10px", borderRadius: 50, fontSize: 11, fontWeight: 700, color: COLORS.orange, marginBottom: 10 }}>{s.purpose}</div>
                <div style={{ fontSize: 11, color: COLORS.faint, marginBottom: 4 }}>{"PDF / " + s.pages}</div>
                <div style={{ fontSize: 11, color: COLORS.faint, marginBottom: 14 }}>{"例：" + s.who}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{"ご面談時にお見せできます \u2192"}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
