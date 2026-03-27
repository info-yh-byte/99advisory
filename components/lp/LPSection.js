export default function LPSection({
  tone = 'white',
  kicker,
  title,
  subtitle,
  children,
  narrow = false,
  id,
}) {
  return (
    <section id={id} className={`lp-section lp-${tone}`}>
      <div className={`lp-wrap ${narrow ? 'lp-wrap-narrow' : ''}`}>
        {kicker ? <div className={`lp-section-kicker ${tone === 'dark' ? 'is-gold' : ''}`}>{kicker}</div> : null}
        {title ? <h2 className={`lp-section-title ${tone === 'dark' ? 'is-white' : ''}`}>{title}</h2> : null}
        {subtitle ? (
          <p className={`lp-section-sub ${tone === 'dark' ? 'is-white-sub' : ''}`}>{subtitle}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
