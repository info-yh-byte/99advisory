export default function LPHero({ eyebrow, title, lead, ctaLabel = '資料を受け取る', ctaHref = '#form', note }) {
  return (
    <section className="lp-hero lp-dark">
      <div className="lp-wrap lp-wrap-narrow">
        {eyebrow ? <div className="lp-eyebrow">{eyebrow}</div> : null}
        <h1 className="lp-hero-title">{title}</h1>
        {lead ? <p className="lp-lead lp-lead-dark">{lead}</p> : null}

        <div className="lp-hero-actions">
          <a href={ctaHref} className="lp-primary-btn">{ctaLabel}</a>
          {note ? <div className="lp-hero-note">{note}</div> : null}
        </div>
      </div>
    </section>
  );
}
