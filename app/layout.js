import './globals.css';
import SiteHeader from '../components/site/SiteHeader';
import SiteFooter from '../components/site/SiteFooter';

export const metadata = {
  title: '99advisory',
  description: '99advisory official website'
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
