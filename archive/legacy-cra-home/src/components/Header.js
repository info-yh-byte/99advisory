import { useState, useEffect } from "react";
import { COLORS, scrollTo, FORM_URL } from "../constants";

export default function Header() {
  var ms = useState(false),
    menu = ms[0],
    setMenu = ms[1];
  var ss = useState(false),
    scrolled = ss[0],
    setScrolled = ss[1];

  useEffect(function () {
    function h() {
      setScrolled(window.scrollY > 30);
    }
    window.addEventListener("scroll", h);
    return function () {
      window.removeEventListener("scroll", h);
    };
  }, []);

  var nav = [
    { l: "お悩みから探す", id: "problems" },
    { l: "サービス・料金", id: "services" },
    { l: "成果物サンプル", id: "samples" },
    { l: "選ばれる理由", id: "reasons" },
    { l: "ご相談の流れ", id: "flow" },
    { l: "よくある質問", id: "faq" },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        background: scrolled
          ? "rgba(255,255,255,.97)"
          : "rgba(255,255,255,.85)",
        backdropFilter: "blur(14px)",
        borderBottom:
          "1px solid " + (scrolled ? "#e8e8e8" : "transparent"),
        transition: "all .3s",
      }}
    >
      <div
        style={{
          maxWidth: 1060,
          margin: "0 auto",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
          }}
          onClick={function () {
            scrollTo("top");
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: COLORS.green,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 900,
              fontSize: 13,
            }}
          >
            {"99"}
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 14, color: COLORS.text }}>
              {"九十九アドバイザリー"}
            </div>
            <div style={{ fontSize: 9, color: COLORS.faint, letterSpacing: 2 }}>
              {"99 ADVISORY"}
            </div>
          </div>
        </div>

        <nav
          className="dNav"
          style={{ display: "flex", gap: 2, alignItems: "center" }}
        >
          {nav.map(function (n) {
            return (
              <button
                key={n.id}
                onClick={function () {
                  scrollTo(n.id);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px 10px",
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: COLORS.text,
                  borderRadius: 6,
                }}
                onMouseEnter={function (e) {
                  e.target.style.background = "#f0f0f0";
                }}
                onMouseLeave={function (e) {
                  e.target.style.background = "none";
                }}
              >
                {n.l}
              </button>
            );
          })}
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: COLORS.orange,
              color: "#fff",
              padding: "8px 20px",
              borderRadius: 50,
              fontWeight: 700,
              fontSize: 12.5,
              textDecoration: "none",
              marginLeft: 8,
            }}
          >
            {"無料相談"}
          </a>
        </nav>

        <button
          className="mBurger"
          onClick={function () {
            setMenu(!menu);
          }}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 22,
            color: COLORS.text,
            padding: 8,
          }}
        >
          {menu ? "\u2715" : "\u2630"}
        </button>
      </div>

      {menu && (
        <div style={{ background: "#fff", padding: 20, borderTop: "1px solid #eee" }}>
          {nav.map(function (n) {
            return (
              <button
                key={n.id}
                onClick={function () {
                  scrollTo(n.id);
                  setMenu(false);
                }}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  padding: "14px 8px",
                  fontSize: 15,
                  fontWeight: 600,
                  color: COLORS.text,
                  cursor: "pointer",
                  borderBottom: "1px solid #f5f5f5",
                }}
              >
                {n.l}
              </button>
            );
          })}
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              background: COLORS.orange,
              color: "#fff",
              padding: 14,
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
              textAlign: "center",
              marginTop: 16,
            }}
          >
            {"まずは30分、無料で相談する"}
          </a>
        </div>
      )}
    </header>
  );
}
