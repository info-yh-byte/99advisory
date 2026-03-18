import { COLORS, scrollTo, FORM_URL } from "../constants";

var menuItems = [
  { l: "お悩みから探す", id: "problems" },
  { l: "サービス・料金", id: "services" },
  { l: "成果物サンプル", id: "samples" },
  { l: "選ばれる理由", id: "reasons" },
];

var supportItems = [
  { l: "ご相談の流れ", id: "flow" },
  { l: "よくある質問", id: "faq" },
  { l: "私たちについて", id: "about" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#1a1a1a",
        padding: "44px 20px 96px",
        color: "rgba(255,255,255,.55)",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 28,
            marginBottom: 32,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 6,
                  background: COLORS.green,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: 11,
                }}
              >
                {"99"}
              </div>
              <span style={{ fontWeight: 800, color: "#fff", fontSize: 13 }}>
                {"九十九アドバイザリー"}
              </span>
            </div>
            <div style={{ fontSize: 11, lineHeight: 1.8 }}>
              {"貴社の数字に、静かに寄り添います。"}
              <br />
              {"〒107-0062 東京都港区青山3丁目1番地36号6階"}
              <br />
              {"info-yh@99advisory.jp"}
            </div>
          </div>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "rgba(255,255,255,.3)",
                  letterSpacing: 2,
                  marginBottom: 10,
                }}
              >
                {"MENU"}
              </div>
              {menuItems.map(function (x, i) {
                return (
                  <div
                    key={i}
                    onClick={function () {
                      scrollTo(x.id);
                    }}
                    style={{
                      fontSize: 12,
                      marginBottom: 7,
                      cursor: "pointer",
                    }}
                  >
                    {x.l}
                  </div>
                );
              })}
            </div>
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "rgba(255,255,255,.3)",
                  letterSpacing: 2,
                  marginBottom: 10,
                }}
              >
                {"SUPPORT"}
              </div>
              {supportItems.map(function (x, i) {
                return (
                  <div
                    key={i}
                    onClick={function () {
                      scrollTo(x.id);
                    }}
                    style={{
                      fontSize: 12,
                      marginBottom: 7,
                      cursor: "pointer",
                    }}
                  >
                    {x.l}
                  </div>
                );
              })}
              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,.55)",
                  textDecoration: "none",
                  display: "block",
                  marginBottom: 7,
                }}
              >
                {"無料相談"}
              </a>
            </div>
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,.08)",
            paddingTop: 16,
            fontSize: 10,
            textAlign: "center",
          }}
        >
          {"\u00A9 2026 九十九アドバイザリー All rights reserved."}
        </div>
      </div>
    </footer>
  );
}
