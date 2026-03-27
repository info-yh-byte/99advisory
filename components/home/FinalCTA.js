import { COLORS, FORM_URL, DIAG_URL } from "@/lib/site-constants";

export default function FinalCTA() {
  return (
    <section style={{ background: COLORS.green, padding: "72px 20px", textAlign: "center" }}>
      <h2 style={{ fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 900, color: "#fff", lineHeight: 1.55, marginBottom: 14 }}>
        数字の違和感を、<br />一度整理してみませんか。
      </h2>
      <p style={{ fontSize: 14, color: "rgba(255,255,255,.8)", lineHeight: 1.8, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
        経営の孤独をなくすことはできません。<br />
        でも、数字の見方を少し整えるだけで、判断の負担は和らぎます。
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ background: COLORS.orange, color: "#fff", padding: "16px 36px", borderRadius: 50, fontWeight: 800, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 16px rgba(232,115,74,.35)" }}
        >
          まずは30分、無料で相談する
        </a>
        <a
          href={DIAG_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ background: "rgba(255,255,255,.15)", color: "#fff", padding: "16px 36px", borderRadius: 50, fontWeight: 700, fontSize: 15, textDecoration: "none", border: "1px solid rgba(255,255,255,.3)" }}
        >
          1分で診断してみる
        </a>
      </div>
      <p style={{ fontSize: 11, color: "rgba(255,255,255,.5)", marginTop: 18 }}>
        2営業日以内にご返信します。相談のみでも問題ありません。
      </p>
    </section>
  );
}
