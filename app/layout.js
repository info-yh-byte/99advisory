import './globals.css';
import SiteHeader from '../components/site/SiteHeader';
import SiteFooter from '../components/site/SiteFooter';
import { Shippori_Mincho, Zen_Kaku_Gothic_New } from 'next/font/google';

const shipporiMincho = Shippori_Mincho({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: '99advisory',
  description: '99advisory official website'
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ja"
      className={`${shipporiMincho.variable} ${zenKakuGothicNew.variable}`}
    >
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
