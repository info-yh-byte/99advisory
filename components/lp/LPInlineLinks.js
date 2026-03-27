import Link from 'next/link';

export default function LPInlineLinks({
  articleHref = '/articles/',
  articleLabel = '先に記事を読む',
  contactHref = '/contact/',
  contactLabel = 'まず相談する',
}) {
  return (
    <div className="lp-inline-links">
      <Link href={articleHref} className="lp-inline-link">
        {articleLabel}
      </Link>
      <Link href={contactHref} className="lp-inline-link">
        {contactLabel}
      </Link>
    </div>
  );
}
