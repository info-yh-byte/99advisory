import { COLORS } from "../constants";
import Heading from "./Heading";

var stats = [
  { label: "対応している年商規模", value: "数千万円〜10億円前後", note: "中小企業オーナー様が中心です" },
  { label: "よくある業種", value: "サービス / 小売 / D2C / 士業 / BtoB", note: "業種を問わず、数字の整理はどこでも必要です" },
  { label: "多い相談テーマ", value: "利益とキャッシュのズレ / 広告採算 / 月次管理", note: "どれも、社長が一人で抱えがちな論点です" },
];

var triggers = [
  "「決算は黒字なのに、なぜか現金が減っている」",
  "「試算表は毎月届くけど、次に何をすればいいか分からない」",
  "「銀行に聞かれたが、うまく数字を説明できなかった」",
  "「広告費をかけているけど、回収できているか自信がない」",
  "「スポットで一度、外の目線で見てもらいたい」",
  "「CFOを雇うほどではないが、数字の壁打ち相手がほしい」",
];

export default function Scope() {
  return (
    <section style={{ background: COLORS.bg, padding: "72px 20px" }}>
      <Heading
        tag="Scope"
        title={"こんなご相談に対応しています"}
        sub={"年商規模や業種、相談テーマの例から、ご自身に近いケースかどうかを見ていただけます。"}
      />
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ display: "grid", gap: 14, marginBottom: 24, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          {stats.map(function (s, i) {
            return (
              <div key={i} style={{ background: COLORS.white, borderRadius: 14, padding: "24px 22px", border: "1px solid " + COLORS.border }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.faint, letterSpacing: 1, marginBottom: 8 }}>{s.label}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: COLORS.text, lineHeight: 1.5, marginBottom: 8 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: COLORS.sub, lineHeight: 1.6 }}>{s.note}</div>
              </div>
            );
          })}
        </div>
        <div style={{ background: COLORS.white, borderRadius: 14, padding: "24px 28px", border: "1px solid " + COLORS.border }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.text, marginBottom: 14 }}>{"ご相談はこんなきっかけで始まることが多いです"}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 10 }}>
            {triggers.map(function (t, i) {
              return (
                <div key={i} style={{ fontSize: 13, color: COLORS.sub, lineHeight: 1.7, paddingLeft: 16, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: COLORS.green, fontWeight: 800 }}>{"\u2022"}</span>
                  {t}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
