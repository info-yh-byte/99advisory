'use client';
import { useState, useEffect } from "react";
import { COLORS, DIAG_URL } from "@/lib/site-constants";

export default function BottomBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShow(window.scrollY > 500);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "rgba(255,255,255,.96)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid #e8e8e8",
        padding: "10px 16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        transform: show ? "translateY(0)" : "translateY(100%)",
        transition: "transform .35s ease",
      }}
    >
      <a
        href="/contact/"
        style={{ background: COLORS.orange, color: "#fff", padding: "12px 28px", borderRadius: 50, fontWeight: 700, fontSize: 13, textDecoration: "none" }}
      >
        まずは30分、無料で相談する
      </a>
      <a
        href={DIAG_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{ background: "none", color: COLORS.green, padding: "12px 16px", borderRadius: 50, fontWeight: 700, fontSize: 12, textDecoration: "none", border: "1px solid " + COLORS.border }}
      >
        1分で診断
      </a>
    </div>
  );
}
