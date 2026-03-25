'use client';

import { useState } from 'react';

export default function SeizoPage() {
  const [form, setForm] = useState({
    company: '',
    industry: '',
    revenue: '',
    email: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

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
          serviceSlug: 'seizo',
          formType: 'seizo_download',
          ...form
        })
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.detail || data.error || '送信に失敗しました');
      }

      setIsSuccess(true);
      setMessage('送信が完了しました。メールをご確認ください。');
      setForm({
        company: '',
        industry: '',
        revenue: '',
        email: ''
      });
    } catch (error) {
      setMessage(error.message || '送信に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <section className="page-section" style={{ paddingTop: 88 }}>
        <div className="container">
          <p style={{ color: '#b8963e', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 12 }}>
            製造業・建設業・受託業向け
          </p>
          <h1 className="page-title" style={{ fontSize: 42, maxWidth: 760 }}>
            経営数字を、判断に使える形へ。
          </h1>
          <p className="page-lead">
            忙しいのに利益が残らない。試算表はあるが、次の打ち手が決まらない。
            そんな会社向けに、経営数字の見方と使い方を整理する診断サービスです。
          </p>
        </div>
      </section>

      <section className="page-section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 32 }}>
          <div>
            <div style={{ background: '#fff', border: '1px solid #e7e5e4', padding: 28, marginBottom: 20 }}>
              <h2 style={{ marginTop: 0, color: '#1b2e4b' }}>この診断で整理すること</h2>
              <ul style={{ lineHeight: 2, paddingLeft: 20, color: '#57534e' }}>
                <li>利益が残らない構造の把握</li>
                <li>数字を経営判断に使うための整理</li>
                <li>初動アクションの優先順位づけ</li>
              </ul>
            </div>

            <div style={{ background: '#fff', border: '1px solid #e7e5e4', padding: 28 }}>
              <h2 style={{ marginTop: 0, color: '#1b2e4b' }}>対象の会社</h2>
              <p className="page-lead" style={{ maxWidth: '100%' }}>
                製造業、建設業、設備工事業、受託業など。
                試算表や月次数字はあるが、意思決定や改善行動につながっていない会社を想定しています。
              </p>
            </div>
          </div>

          <div id="form">
            <div style={{ background: '#fff', border: '1px solid #e7e5e4', padding: 28 }}>
              <h2 style={{ marginTop: 0, color: '#1b2e4b' }}>資料を受け取る</h2>
              <p className="page-lead" style={{ maxWidth: '100%' }}>
                会社情報をご入力ください。診断概要とサンプル情報をメールでお送りします。
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
                <input type="hidden" name="serviceSlug" value="seizo" />
                <input type="hidden" name="formType" value="seizo_download" />

                <div>
                  <label style={{ display: 'block', marginBottom: 6, fontSize: 14 }}>会社名</label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: 12, border: '1px solid #d6d3d1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 6, fontSize: 14 }}>業種</label>
                  <input
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: 12, border: '1px solid #d6d3d1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 6, fontSize: 14 }}>売上規模</label>
                  <input
                    name="revenue"
                    value={form.revenue}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: 12, border: '1px solid #d6d3d1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 6, fontSize: 14 }}>メールアドレス</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: 12, border: '1px solid #d6d3d1' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    background: '#b8963e',
                    color: '#1b2e4b',
                    border: 'none',
                    padding: '14px 18px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {isSubmitting ? '送信中…' : '診断概要を受け取る'}
                </button>
              </form>

              {message ? (
                <p style={{ marginTop: 16, color: isSuccess ? '#15803d' : '#b91c1c', lineHeight: 1.8 }}>
                  {message}
                </p>
              ) : null}

              <p style={{ marginTop: 16, fontSize: 12, color: '#78716c', lineHeight: 1.8 }}>
                送信により、
                <a href="/privacy/" style={{ textDecoration: 'underline' }}>プライバシーポリシー</a>
                に同意したものとみなします。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
