import Link from 'next/link';

export default function LPResourceCards({ title = '先に整理したい方向けの読み物', items = [] }) {
  return (
    <div className="lp-resource-block">
      <div className="lp-resource-title">{title}</div>
      <div className="lp-resource-grid">
        {items.map((item) => (
          <Link key={item.href + item.title} href={item.href} className="lp-resource-card">
            <div className="lp-resource-label">{item.label}</div>
            <div className="lp-resource-card-title">{item.title}</div>
            <div className="lp-resource-card-body">{item.body}</div>
            <div className="lp-resource-link">見る →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
