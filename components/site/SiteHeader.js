import Link from 'next/link';
import navigation from '../../content/site/navigation';

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="site-logo">
          99advisory
          <span className="site-logo-sub">CFO Advisory for SMEs</span>
        </Link>

        <nav className="site-nav">
          {navigation.header.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
