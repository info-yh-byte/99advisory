import { COLORS } from "@/lib/site-constants";

const good = [
  "利益は出ているが現金が増えない",
  "未来の数字を相談する相手がいない",
  "投資判断の基準を整えたい",
  "CFOを雇うほどではないが壁打ちがほしい",
  "代行ではなく経営判断の整理に伴走してほしい",
];

const other = [
  "記帳代行や入力作業のみ",
  "税務申告だけ依頼したい",
  "すべての判断を外部に委ねたい",
  "まだ売上が立つ前の段階",
  "今日明日で資金調達だけしたい",
];

export default function Fit() {
  return (
    <section style={{ background: COLORS.white, padding: "72px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: COLORS.green, letterSpacing: 3, marginBottom: 10 }}>FIT</div>
        <h2 style={{ fontSize: "clamp(20px, 3.5vw, 28px)", fontWeight: 900, color: COLORS.text, lineHeight: 1.5 }}>
          ご一緒しやすいケースと、<br />他をお勧めするケース
        </h2>
      </div>
      <div style={{ maxWidth: 760, margin: "0 auto", display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        <div style={{ background: COLORS.greenPale, borderRadius: 16, padding: "26px 24px" }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: COLORS.green, marginBottom: 16 }}>✅ ご一緒しやすいご相談</h3>
          {good.map((t, i) => (
            <div key={i} style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.9 }}>• {t}</div>
          ))}
        </div>
        <div style={{ background: COLORS.white, borderRadius: 16, padding: "26px 24px", border: "1px solid " + COLORS.border }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: COLORS.faint, marginBottom: 16 }}>↗️ 他のサービスをお勧めするケース</h3>
          {other.map((t, i) => (
            <div key={i} style={{ fontSize: 13, color: COLORS.sub, lineHeight: 1.9 }}>• {t}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
