import { COLORS } from "../constants";
import Heading from "./Heading";

var steps = [
  { n: "01", icon: "\uD83D\uDCDD", t: "フォーム送信", d: "1〜2分で完了。いまわかる範囲だけで大丈夫。" },
  { n: "02", icon: "\uD83D\uDCC5", t: "日程調整", d: "2営業日以内にご返信。オンライン面談の候補をご案内。" },
  { n: "03", icon: "\uD83D\uDCAC", t: "30分の無料相談", d: "いまの状況を整理し、何を先に見るべきか一緒に確認します。" },
];

export default function Flow() {
  return (
    <section id="flow" style={{ background: COLORS.white, padding: "72px 20px" }}>
      <Heading tag="Flow" title={"ご相談の流れ"} sub={"ご契約を前提とした場ではありません。相談だけで終えても問題ありません。"} />
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        {steps.map(function (s, i) {
          return (
            <div key={i} style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 50, height: 50, borderRadius: "50%", background: COLORS.white, border: "2px solid " + COLORS.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{s.icon}</div>
                {i < 2 && <div style={{ width: 2, height: 32, background: COLORS.border, margin: "6px 0" }} />}
              </div>
              <div style={{ paddingTop: 6, paddingBottom: i < 2 ? 12 : 0 }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: COLORS.green, letterSpacing: 2, marginBottom: 4 }}>{"STEP " + s.n}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.text, marginBottom: 4 }}>{s.t}</div>
                <div style={{ fontSize: 13, color: COLORS.sub, lineHeight: 1.7 }}>{s.d}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
