import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container">
      <section className="hero-box">
        <div className="hero-label">99advisory Next.js Migration</div>
        <h1 className="hero-title">
          まずは土台だけを
          <br />
          Next.js に移行します。
        </h1>
        <p className="hero-text">
          このページは仮のトップページです。今は共通ヘッダー、共通フッター、
          共通ページ群を先に作るフェーズです。ホーム本体や各LPはこのあと順番に移植します。
        </p>

        <div className="link-grid">
          <Link href="/services/" className="link-card">
            <h2 className="link-card-title">サービス一覧</h2>
            <p className="link-card-text">今後ここに各サービスの一覧を整理します。</p>
          </Link>

          <Link href="/articles/" className="link-card">
            <h2 className="link-card-title">記事一覧</h2>
            <p className="link-card-text">今後ここにSEO記事一覧を構築します。</p>
          </Link>

          <Link href="/company/" className="link-card">
            <h2 className="link-card-title">会社情報</h2>
            <p className="link-card-text">運営者情報やサービス提供情報を共通化します。</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
