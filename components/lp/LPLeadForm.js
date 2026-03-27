export default function LPLeadForm({
  serviceSlug,
  formType,
  fields,
  form,
  onChange,
  onSubmit,
  canSubmit,
  isSubmitting,
  message,
  isSuccess,
  submitLabel = '資料を受け取る',
  helpText,
}) {
  return (
    <form className="lp-form-box" onSubmit={onSubmit}>
      <input type="hidden" name="serviceSlug" value={serviceSlug} />
      <input type="hidden" name="formType" value={formType} />

      <div className="lp-form-intro">
        <div className="lp-form-intro-title">必要な情報だけ、短くお伺いします。</div>
        <div className="lp-form-intro-sub">
          入力後、自動返信メールで概要資料をお送りします。
        </div>
      </div>

      <div className="lp-form-grid">
        {fields.map((field) => (
          <div
            className={`lp-form-group ${field.type === 'textarea' ? 'is-full' : ''}`}
            key={field.name}
          >
            <label>
              {field.label}
              {field.required ? <span className="lp-req">*</span> : null}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                className="lp-form-control lp-textarea"
                name={field.name}
                value={form[field.name] || ''}
                onChange={onChange}
                placeholder={field.placeholder || ''}
                required={field.required}
              />
            ) : (
              <input
                className="lp-form-control"
                type={field.type || 'text'}
                name={field.name}
                value={form[field.name] || ''}
                onChange={onChange}
                placeholder={field.placeholder || ''}
                required={field.required}
              />
            )}
          </div>
        ))}
      </div>

      <div className="lp-form-actions">
        <button className="lp-primary-btn lp-full" type="submit" disabled={!canSubmit}>
          {isSubmitting ? '送信中…' : submitLabel}
        </button>
      </div>

      {helpText ? <div className="lp-form-meta">{helpText}</div> : null}

      {message ? (
        <div className={`lp-submit-message ${isSuccess ? 'is-success' : 'is-error'}`}>
          {message}
        </div>
      ) : null}
    </form>
  );
}
