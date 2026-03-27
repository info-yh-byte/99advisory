'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import LPLeadForm from '@/components/lp/LPLeadForm';
import LPTrustNote from '@/components/lp/LPTrustNote';

const INITIAL_FORM = {
  name: '',
  company: '',
  message: '',
  email: '',
};

export default function ContactPage() {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const canSubmit = useMemo(() => {
    return form.name && form.email && form.message && !isSubmitting;
  }, [form, isSubmitting]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setIsSuccess(false);

    try {
      const res = await fetch('/api/form-submit/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceSlug: 'contact',
          formType: 'contact_inquiry',
          ...form,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.detail || data.error || '送信に失敗しました');
      }

      setIsSuccess(true);
      setForm(INITIAL_FORM);
      router.push('/thanks?service=contact');
    } catch (error) {
      setIsSuccess(false);
      setMessage(error.message || '送信に失敗しました。時間を置いて再度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="page-section">
      <div className="container" style={{ maxWidth: '640px' }}>
        <div style={{ marginBottom: '40px' }}>
          <p className="lp-kicker">CONTACT</p>
          <h1 className="page-title">お問い合わせ</h1>
          <p className="lp-lead" style={{ marginTop: '16px' }}>
            サービスへのご質問・ご相談など、お気軽にお送りください。<br />
            確認次第、通常2営業日以内にご返信いたします。
          </p>
        </div>

        <LPTrustNote
          items={[
            '資料請求前のご相談も歓迎します',
            '強引な営業は行いません',
            '状況が曖昧な段階でも構いません',
          ]}
        />

        <LPLeadForm
          serviceSlug="contact"
          formType="contact_inquiry"
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          canSubmit={canSubmit}
          isSubmitting={isSubmitting}
          message={message}
          isSuccess={isSuccess}
          submitLabel="送信する"
          helpText={
            <>
              送信後、受付確認メールをお送りします。届かない場合は迷惑メールフォルダもご確認ください。<br />
              <a href="/privacy/">プライバシーポリシー</a> に同意のうえご送信ください。
            </>
          }
          fields={[
            {
              name: 'name',
              label: 'お名前',
              required: true,
              placeholder: '山田 太郎',
            },
            {
              name: 'company',
              label: '会社名',
              required: false,
              placeholder: '株式会社○○（任意）',
            },
            {
              name: 'message',
              label: 'お問い合わせ内容',
              type: 'textarea',
              required: true,
              placeholder: '例：資金繰りについて相談したい。まず何から整理すればよいか知りたい。',
            },
            {
              name: 'email',
              label: 'メールアドレス',
              type: 'email',
              required: true,
              placeholder: 'info@example.com',
            },
          ]}
        />
      </div>
    </section>
  );
}
