import { COLORS, DIAG_URL } from "../constants";

export default function DiagBanner() {
  return (
    <section style={{ background: "linear-gradient(135deg, " + COLORS.green + " 0%, #2a9d8f 100%)", padding: "56px 20px", textAlign: "center" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{ fontSize: 40, marginBottom: 14 }}>{"\uD83D\uDCCB"}</div>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 10, lineHeight: 1.5 }}>
          {"1分でわかる、何を先に見るべきか診断"}
        </h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,.85)", lineHeight: 1.8, marginBottom: 8 }}>
          {"8つの質問に答えるだけ。"}<br />
          {"いまの会社が、まず何を優先して見るべきかを整理します。"}
        </p>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginBottom: 28 }}>
          {"資金繰り / 成長 / 承継 / 企業価値 などの重心が見えてきます。"}
        </p>
        <a href={DIAG_URL} target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-block", background: "#fff", color: COLORS.green, padding: "14px 36px", borderRadius: 50, fontWeight: 800, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 16px rgba(0,0,0,.12)" }}>
          {"無料で診断する"}
        </a>
      </div>
    </section>
  );
}
