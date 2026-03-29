'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const SERVICE_MAP = {
  seizo: {
    heading: '財務健康診断へのお問い合わせを受け付けました',
    body: '内容を確認のうえ、2営業日以内にご連絡いたします。初回ヒアリング（30分・無料）の日程をご提案します。',
    next: { label: '財務健康診断の詳細を見る', href: '/seizo/' },
    related: [
      { label: '資金繰り診断を見る', href: '/cashflow/' },
      { label: '月次経営レビューを見る', href: '/monthly-review/' },
      { label: '記事一覧を見る', href: '/articles/' },
    ],
  },
  cashflow: {
    heading: '資金繰り診断へのお問い合わせを受け付けました',
    body: '内容を確認のうえ、2営業日以内にご連絡いたします。初回ヒアリング（30分・無料）の日程をご提案します。',
    next: { label: '資金繰り診断の詳細を見る', href: '/cashflow/' },
    related: [
      { label: '財務健康診断を見る', href: '/seizo/' },
      { label: '月次経営レポートを見る', href: '/monthly-report/' },
      { label: '記事一覧を見る', href: '/articles/' },
    ],
  },
  'bank-plan': {
    heading: '銀行向け事業計画へのお問い合わせを受け付けました',
    body: '内容を確認のうえ、2営業日以内にご連絡いたします。融資スケジュールがある場合はその旨をお知らせください。',
    next: { label: '銀行向け事業計画の詳細を見る', href: '/bank-plan/' },
    related: [
      { label: '財務健康診断を見る', href: '/seizo/' },
      { label: '月次経営レビューを見る', href: '/monthly-review/' },
      { label: 'サービス一覧を見る', href: '/services/' },
    ],
  },
  'monthly-report': {
    heading: '月次経営レポートへのお問い合わせを受け付けました',
    body: '内容を確認のうえ、2営業日以内にご連絡いたします。初回ヒアリング（30分・無料）の日程をご提案します。',
    next: { label: '月次経営レポートの詳細を見る', href: '/monthly-report/' },
    related: [
      { label: '月次経営レビューを見る', href: '/monthly-review/' },
      { label: '資金繰り診断を見る', href: '/cashflow/' },
      { label: '記事一覧を見る', href: '/articles/' },
    ],
  },
  'monthly-review': {
    heading: '月次経営レビューへのお問い合わせを受け付けました',
    body: '内容を確認のうえ、2営業日以内にご連絡いたします。初回ヒアリング（30分・無料）の日程をご提案します。',
    next: { label: '月次経営レビューの詳細を見る', href: '/monthly-review/' },
    related: [
      { label: '予実管理伴走を見る', href: '/yojitsu/' },
      { label: '経営会議設計を見る', href: '/meeting-design/' },
      { label: 'サービス一覧を見る', href: '/services/' },
    ],
  },
  yojitsu: {
    heading: '予実管理伴走へのお問い合わせを受け付けました',
    body: '内容を確認のうえ、2営業日以内にご連絡いたします。現在の予実管理の状況もあわせてご共有ください。',
    next: { label: '予実管理伴走の詳細を見る', href: '/yojitsu/' },
    related: [
      { label: '月次経営レビューを見る', href: '/monthly-review/' },
      { label: '経営会議設計を見る', href: '/meeting-design/' },
      { label: 'サービス一覧を見る', href: '/services/' },
    ],
  },
  'meeting-design': {
    heading: '経営会議設計へのお問い合わせを受け付けました',
    body: '内容を確認のうえ、2営業日以内にご連絡いたします。現在の会議体の構成があればご共有いただけると助かります。',
    next: { label: '経営会議設計の詳細を見る', href: '/meeting-design/' },
    related: [
      { label: '月次経営レビューを見る', href: '/monthly-review/' },
      { label: '予実管理伴走を見る', href: '/yojitsu/' },
      { label: 'サービス一覧を見る', href: '/services/' },
    ],
  },
  contact: {
    heading: 'お問い合わせを受け付けました',
    body: '内容を確認のうえ、2営業日以内にご連絡いたします。',
    next: { label: 'サービス一覧を見る', href: '/services/' },
    related: [
      { label: 'サービス一覧を見る', href: '/services/' },
      { label: '記事一覧を見る', href: '/articles/' },
    ],
  },
};

const DEFAULT = {
  heading: '送信を受け付けました',
  body: '内容を確認のうえ、2営業日以内にご連絡いたします。',
  next: { label: 'サービス一覧を見る', href: '/services/' },
  related: [
    { label: 'サービス一覧を見る', href: '/services/' },
    { label: '記事一覧を見る', href: '/articles/' },
  ],
};

function ThanksContent() {
  const searchParams = useSearchParams();
  const service = searchParams.get('service') || '';
  const { heading, body, next, related } = SERVICE_MAP[service] || DEFAULT;

  return (
    <>
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
            受付確認メールをお送りしました。届かない場合は info@99advisory.jp までご連絡ください。
          </p>
          <div className="th-actions">
            <Link href={next.href} className="th-btn-primary">{next.label}</Link>
            <Link href="/" className="th-btn-secondary">トップページへ</Link>
          </div>
          {related && related.length > 0 && (
            <div className="th-related">
              <div className="th-related-label">次に見ておきたいページ</div>
              <div className="th-related-links">
                {related.map((r) => (
                  <Link key={r.href} href={r.href} className="th-related-link">{r.label} →</Link>
                ))}
              </div>
            </div>
          )}
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
