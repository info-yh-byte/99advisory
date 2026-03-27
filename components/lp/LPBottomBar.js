export default function LPBottomBar({
  primaryLabel = '資料を受け取る',
  primaryHref = '#form',
  secondaryLabel = '問い合わせ',
  secondaryHref = '/contact/',
}) {
  return (
    <div className="lp-bottom-bar">
      <div className="lp-bottom-bar-inner">
        <a href={primaryHref} className="lp-bottom-primary">
          {primaryLabel}
        </a>
        <a href={secondaryHref} className="lp-bottom-secondary">
          {secondaryLabel}
        </a>
      </div>
    </div>
  );
}
