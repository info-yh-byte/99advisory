export default function LPFaq({ items, openIndex, onToggle }) {
  return (
    <div className="lp-faq-list">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div className="lp-faq-item" key={item.q}>
            <button
              type="button"
              className="lp-faq-q"
              onClick={() => onToggle(index)}
              aria-expanded={open}
            >
              <span>{item.q}</span>
              <span className="lp-faq-icon">{open ? '−' : '+'}</span>
            </button>
            {open ? <div className="lp-faq-a">{item.a}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
