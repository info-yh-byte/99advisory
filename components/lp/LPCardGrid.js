export function LPStackList({ items }) {
  return (
    <div className="lp-stack">
      {items.map((item) => (
        <div className="lp-list-card" key={item.title || item}>
          {typeof item === 'string' ? (
            <div className="lp-simple-row">• {item}</div>
          ) : (
            <>
              <div className="lp-dot" />
              <div>
                <div className="lp-card-title">{item.title}</div>
                <div className="lp-card-body">{item.body}</div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export function LPInfoGrid({ items, columns = 3, numbered = false }) {
  return (
    <div className={`lp-grid lp-grid-${columns}`}>
      {items.map((item) => (
        <div className="lp-info-card" key={item.label || item.title}>
          {numbered && item.label ? <div className="lp-metric-no">{item.label}</div> : null}
          <div className="lp-card-title">{item.title}</div>
          <div className="lp-card-body">{item.body}</div>
        </div>
      ))}
    </div>
  );
}

export function LPFitGrid({ yesTitle, yesItems, noTitle, noItems }) {
  return (
    <div className="lp-fit-grid">
      <div className="lp-fit-col">
        <div className="lp-fit-head">{yesTitle}</div>
        {yesItems.map((item) => (
          <div className="lp-fit-item" key={item}>✓ {item}</div>
        ))}
      </div>
      <div className="lp-fit-col">
        <div className="lp-fit-head">{noTitle}</div>
        {noItems.map((item) => (
          <div className="lp-fit-item" key={item}>− {item}</div>
        ))}
      </div>
    </div>
  );
}
