export function defaultAdminNotice(data) {
  return {
    subject: `【問い合わせ】${data.company || '会社名未入力'} / ${data.formType || ''}`,
    html: `
      <h2>新しい問い合わせがありました</h2>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
        <tr><th align="left">会社名</th><td>${data.company || ''}</td></tr>
        <tr><th align="left">業種</th><td>${data.industry || ''}</td></tr>
        <tr><th align="left">売上規模</th><td>${data.revenue || ''}</td></tr>
        <tr><th align="left">メール</th><td>${data.email || ''}</td></tr>
        <tr><th align="left">serviceSlug</th><td>${data.serviceSlug || ''}</td></tr>
        <tr><th align="left">formType</th><td>${data.formType || ''}</td></tr>
      </table>
    `
  };
}

export function seizoDownloadReply(data) {
  return {
    subject: '【確認】資料請求ありがとうございます｜99advisory',
    html: `
      <p>${data.company || ''} ご担当者様</p>
      <p>資料請求ありがとうございます。</p>
      <p>現在は Next.js 移行中のため、このメールはテスト用の自動返信です。</p>
      <p>後続フェーズで正式な文面に差し替えます。</p>
    `
  };
}
