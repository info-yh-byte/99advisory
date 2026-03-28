import LPSection from '@/components/lp/LPSection';

export default function LPProblemSection({
  tone = 'stone',
  kicker,
  title,
  subtitle,
  items = [],
  id,
}) {
  return (
    <LPSection tone={tone} kicker={kicker} title={title} subtitle={subtitle} id={id}>
      <div className="lp-problem-shell">
        <div className="lp-problem-list">
          {items.map((item, index) => (
            <article className="lp-problem-item" key={item.no || item.title || index}>
              <div className="lp-problem-meta">
                <div className="lp-problem-no">
                  {item.no || String(index + 1).padStart(2, '0')}
                </div>
              </div>
              <div className="lp-problem-copy">
                <h3 className="lp-problem-title">{item.title}</h3>
                {item.body ? <p className="lp-problem-body">{item.body}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </LPSection>
  );
}
