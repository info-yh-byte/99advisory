import { useState } from "react";
import { COLORS } from "../constants";
import Heading from "./Heading";
import faqs from "../data/faqs";

export default function FAQ() {
  var os = useState(null),
    open = os[0],
    setOpen = os[1];

  return (
    <section id="faq" style={{ background: COLORS.bg, padding: "72px 20px" }}>
      <Heading tag="FAQ" title={"よくあるご質問"} />
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {faqs.map(function (f, i) {
          return (
            <div
              key={i}
              style={{
                background: COLORS.white,
                borderRadius: 12,
                marginBottom: 8,
                overflow: "hidden",
                border: "1px solid " + (open === i ? COLORS.green : COLORS.border),
                transition: "border-color .2s",
              }}
            >
              <button
                onClick={function () {
                  setOpen(open === i ? null : i);
                }}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "16px 22px",
                  fontSize: 14,
                  fontWeight: 700,
                  color: COLORS.text,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ color: COLORS.green, fontWeight: 800, fontSize: 13 }}>
                    {"Q"}
                  </span>
                  {f.q}
                </span>
                <span
                  style={{
                    fontSize: 18,
                    color: COLORS.faint,
                    transition: "transform .25s",
                    transform: open === i ? "rotate(45deg)" : "rotate(0)",
                    flexShrink: 0,
                  }}
                >
                  {"+"}
                </span>
              </button>
              <div
                style={{
                  maxHeight: open === i ? 180 : 0,
                  overflow: "hidden",
                  transition: "max-height .3s ease",
                }}
              >
                <div
                  style={{
                    padding: "0 22px 16px 44px",
                    fontSize: 13,
                    color: COLORS.sub,
                    lineHeight: 1.8,
                  }}
                >
                  {f.a}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
