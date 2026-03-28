export default function LPHero({
  eyebrow,
  title,
  lead,
  ctaLabel = '資料を受け取る',
  ctaHref = '#form',
  note
}) {
  return (
    <section className="lp-hero">
      <div className="lp-wrap lp-wrap-narrow">
        <div className="lp-hero-shell">
          {eyebrow ? <div className="lp-eyebrow">{eyebrow}</div> : null}

          <h1 className="lp-hero-title">{title}</h1>

          {lead ? <p className="lp-lead">{lead}</p> : null}

          <div className="lp-hero-actions">
            <a href={ctaHref} className="lp-primary-btn">
              {ctaLabel}
            </a>
          </div>

          <div className="lp-hero-meta">
            <div className="lp-hero-badge">初回相談可</div>
            <div className="lp-hero-badge">資料請求のみ可</div>
            <div className="lp-hero-badge">オンライン対応</div>
          </div>

          {note ? <div className="lp-hero-note">{note}</div> : null}
        </div>
      </div>
    </section>
  );
}
