export default function LPTrustNote({ items = [] }) {
  return (
    <div className="lp-trust-note">
      <div className="lp-trust-title">送信前にご確認いただきたいこと</div>
      <div className="lp-trust-grid">
        {items.map((item) => (
          <div className="lp-trust-item" key={item}>
            <span className="lp-trust-check">✓</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
