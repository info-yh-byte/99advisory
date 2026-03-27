'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_FORM = { company: '', name: '', email: '', message: '' };
const INITIAL_ERRORS = { company: '', name: '', email: '', message: '' };

export default function ContactPage() {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function validate() {
    const next = { ...INITIAL_ERRORS };
    if (!form.company.trim()) next.company = '会社名を入力してください';
    if (!form.name.trim()) next.name = 'お名前を入力してください';
    if (!form.email.trim()) next.email = 'メールアドレスを入力してください';
    else if (!EMAIL_RE.test(form.email)) next.email = 'メールアドレスの形式が正しくありません';
    return next;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const next = validate();
    if (Object.values(next).some(Boolean)) {
      setErrors(next);
      return;
    }
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/form-submit/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          serviceSlug: 'contact',
          formType: 'general',
          sourcePath: '/contact',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.detail || data.error || '送信に失敗しました');
      router.push('/thanks');
    } catch (err) {
      setSubmitError(err.message || '送信に失敗しました。時間を置いて再度お試しください。');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px 96px' }}>
      <p style={{ fontSize: '12px', letterSpacing: '0.12em', color: 'var(--accent)', fontWeight: 600, margin: '0 0 12px' }}>
        CONTACT
      </p>
      <h1 style={{ fontSize: 'clamp(24px, 5vw, 36px)', color: 'var(--navy)', fontWeight: 800, margin: '0 0 20px', lineHeight: 1.3 }}>
        まずは、状況を聞かせてください
      </h1>
      <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8, margin: '0 0 28px' }}>
        サービスをご検討中の方、どこに相談すべきか迷っている方、どちらもお気軽にどうぞ。内容を確認したうえで、2営業日以内にご連絡します。
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
        {['秘密厳守・NDA締結可', '初回相談は無料', '売り込みは行いません'].map((badge) => (
          <span key={badge} style={{ fontSize: '13px', background: 'var(--cream)', border: '1px solid var(--line-soft)', borderRadius: '4px', padding: '6px 14px', color: 'var(--muted)' }}>
            {badge}
          </span>
        ))}
      </div>

      {submitError && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', padding: '14px 18px', color: '#b91c1c', fontSize: '14px', marginBottom: '24px' }}>
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Field label="会社名" required error={errors.company}>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="株式会社○○"
            style={inputStyle(!!errors.company)}
          />
        </Field>

        <Field label="お名前" required error={errors.name}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="山田 太郎"
            style={inputStyle(!!errors.name)}
          />
        </Field>

        <Field label="メールアドレス" required error={errors.email}>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="info@example.com"
            style={inputStyle(!!errors.email)}
          />
        </Field>

        <Field label="ご相談内容" error={errors.message}>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="例：資金繰りが苦しく、どこから手をつけるべきか分からない。まず何を整理すればよいか知りたい。"
            rows={5}
            style={{ ...inputStyle(false), minHeight: '120px', resize: 'vertical' }}
          />
        </Field>

        <button
          type="submit"
          disabled={submitting}
          style={{
            background: 'var(--navy)',
            color: 'var(--white)',
            fontSize: '16px',
            fontWeight: 600,
            width: '100%',
            padding: '16px',
            borderRadius: '6px',
            border: 'none',
            cursor: submitting ? 'not-allowed' : 'pointer',
            opacity: submitting ? 0.7 : 1,
            transition: 'opacity .2s',
          }}
        >
          {submitting ? '送信中...' : '相談内容を送る'}
        </button>
      </form>

      <p style={{ fontSize: '13px', color: 'var(--ink-faint)', textAlign: 'center', marginTop: '20px' }}>
        送信後、受付確認メールをお送りします。メールが届かない場合は info@99advisory.jp までご連絡ください。
      </p>
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>
        {label}
        {required && <span style={{ color: 'var(--accent)', marginLeft: '4px' }}>*</span>}
      </label>
      {children}
      {error && <p style={{ fontSize: '13px', color: '#b91c1c', margin: 0 }}>{error}</p>}
    </div>
  );
}

function inputStyle(hasError) {
  return {
    width: '100%',
    padding: '12px 14px',
    fontSize: '15px',
    border: `1px solid ${hasError ? '#fca5a5' : 'var(--line-soft)'}`,
    borderRadius: '6px',
    background: 'var(--white)',
    color: 'var(--text)',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  };
}
