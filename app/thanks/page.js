'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const SERVICE_MAP = {
  seizo: {
    heading: '財務健康診断へのお問い合わせを受け付けました',
    body: '内容を確認のうえ、2営業日以内にご連絡いたします。初回ヒアリング（30分・無料）の日程をご提案します。',
    next: { label: '財務健康診断の詳細を見る', href: '/seizo/' },
  },
  cashflow: {
    heading: '資金繰り診断へのお問い合わせを受け付けました',
    body: '内容を確認のうえ、2営業日以内にご連絡いたします。初回ヒアリング（30分・無料）の日程をご提案します。',
    next: { label: '資金繰り診断の詳細を見る', href: '/cashflow/' },
  },
  'bank-plan': {
    heading: '銀行向け事業計画へのお問い合わせを受け付けました',
    body: '内容を確認のうえ、2営業日以内にご連絡いたします。融資スケジュールがある場合はその旨をお知らせください。',
    next: { label: '銀行向け事業計画の詳細を見る', href: '/bank-plan/' },
  },
  'monthly-report': {
    heading: '月次経営レポートへのお問い合わせを受け付けました',
    body: '内容を確認のうえ、2営業日以内にご連絡いたします。初回ヒアリング（30分・無料）の日程をご提案します。',
    next: { label: '月次経営レポートの詳細を見る', href: '/monthly-report/' },
  },
  'monthly-review': {
    heading: '月次経営レビューへのお問い合わせを受け付けました',
    body: '内容を確認のうえ、2営業日以内にご連絡いたします。初回ヒアリング（30分・無料）の日程をご提案します。',
    next: { label: '月次経営レビューの詳細を見る', href: '/monthly-review/' },
  },
  yojitsu: {
    heading: '予実管理伴走へのお問い合わせを受け付けました',
    body: '内容を確認のうえ、2営業日以内にご連絡いたします。現在の予実管理の状況もあわせてご共有ください。',
    next: { label: '予実管理伴走の詳細を見る', href: '/yojitsu/' },
  },
  'meeting-design': {
    heading: '経営会議設計へのお問い合わせを受け付けました',
    body: '内容を確認のうえ、2営業日以内にご連絡いたします。現在の会議体の構成があればご共有いただけると助かります。',
    next: { label: '経営会議設計の詳細を見る', href: '/meeting-design/' },
  },
  contact: {
    heading: 'お問い合わせを受け付けました',
    body: '内容を確認のうえ、2営業日以内にご連絡いたします。',
    next: { label: 'サービス一覧を見る', href: '/services/' },
  },
};

const DEFAULT = {
  heading: '送信を受け付けました',
  body: '内容を確認のうえ、2営業日以内にご連絡いたします。',
  next: { label: 'サービス一覧を見る', href: '/services/' },
};

function ThanksContent() {
  const searchParams = useSearchParams();
  const service = searchParams.get('service') || '';
  const { heading, body, next } = SERVICE_MAP[service] || DEFAULT;

  return (
    <>
      <style>{`
        .th-page {
          background: var(--bg);
          min-height: 100vh;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 96px 40px;
        }
        .th-wrap {
          max-width: 560px;
          width: 100%;
          text-align: center;
        }
        .th-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #eff6ff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 28px;
        }
        .th-heading {
          font-size: clamp(20px, 3vw, 26px);
          font-weight: 800;
          color: var(--navy);
          line-height: 1.4;
          margin: 0 0 16px;
        }
        .th-body {
          font-size: 15px;
          color: var(--muted);
          line-height: 1.8;
          margin: 0 0 20px;
        }
        .th-note {
          font-size: 13px;
          color: var(--hint);
          line-height: 1.7;
          margin: 0 0 36px;
        }
        .th-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
        }
        .th-btn-primary {
          display: inline-block;
          padding: 14px 32px;
          background: var(--navy);
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          border-radius: 9999px;
          text-decoration: none;
          transition: opacity 0.2s;
          width: 100%;
          max-width: 360px;
          box-sizing: border-box;
        }
        .th-btn-primary:hover { opacity: 0.88; }
        .th-btn-secondary {
          display: inline-block;
          padding: 13px 32px;
          background: transparent;
          color: var(--navy);
          font-size: 15px;
          font-weight: 600;
          border-radius: 9999px;
          border: 1.5px solid var(--border);
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
          width: 100%;
          max-width: 360px;
          box-sizing: border-box;
        }
        .th-btn-secondary:hover { border-color: var(--navy); }

        @media (max-width: 768px) {
          .th-page { padding: 72px 20px; }
        }
      `}</style>

      <div className="th-page">
        <div className="th-wrap">
          <div className="th-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <path d="M6 14.5l5.5 5.5L22 9" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="th-heading">{heading}</h1>
          <p className="th-body">{body}</p>
          <p className="th-note">
            受付確認メールをお送りしています。メールが届かない場合は、迷惑メールフォルダもご確認ください。
          </p>
          <div className="th-actions">
            <Link href={next.href} className="th-btn-primary">{next.label}</Link>
            <Link href="/" className="th-btn-secondary">トップページへ</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ThanksPage() {
  return (
    <Suspense>
      <ThanksContent />
    </Suspense>
  );
}
