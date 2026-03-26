export function defaultAdminNotice(data) {
  return {
    subject: `【資料請求】${data.company || '会社名未入力'} / ${data.formType || ''}`,
    html: `
      <h2>新しい問い合わせがありました</h2>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
        <tr><th align="left">会社名</th><td>${data.company || ''}</td></tr>
        <tr><th align="left">業種</th><td>${data.industry || ''}</td></tr>
        <tr><th align="left">売上規模</th><td>${data.revenue || ''}</td></tr>
        <tr><th align="left">現在の悩み</th><td>${data.issue || ''}</td></tr>
        <tr><th align="left">今回の相談目的</th><td>${data.purpose || ''}</td></tr>
        <tr><th align="left">メール</th><td>${data.email || ''}</td></tr>
        <tr><th align="left">serviceSlug</th><td>${data.serviceSlug || ''}</td></tr>
        <tr><th align="left">formType</th><td>${data.formType || ''}</td></tr>
      </table>
    `
  };
}

export function seizoDownloadReply(data) {
  return {
    subject: '【資料お届け】経営数字 活用診断の詳細資料',
    html: `
      <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;color:#1C1917;">
        <div style="background:#1B2E4B;padding:28px 32px;">
          <p style="color:#B8963E;font-size:12px;font-weight:bold;letter-spacing:.15em;margin:0 0 8px;">CPA ADVISORY</p>
          <p style="color:#fff;font-size:18px;font-weight:bold;margin:0;">経営数字 活用診断　資料のお届け</p>
        </div>
        <div style="padding:32px;">
          <p style="font-size:14px;line-height:1.9;margin:0 0 24px;">
            ${data.company || ''} ご担当者様<br><br>
            資料請求いただきありがとうございます。<br>
            診断の詳細をご確認ください。
          </p>
        </div>
      </div>
    `
  };
}

export function cashflowDownloadReply(data) {
  return {
    subject: '【資料お届け】資金繰り改善支援のご案内',
    html: `
      <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;color:#1C1917;">
        <div style="background:#1B2E4B;padding:28px 32px;">
          <p style="color:#B8963E;font-size:12px;font-weight:bold;letter-spacing:.15em;margin:0 0 8px;">CPA ADVISORY</p>
          <p style="color:#fff;font-size:18px;font-weight:bold;margin:0;">資金繰り改善支援　資料のお届け</p>
        </div>
        <div style="padding:32px;">
          <p style="font-size:14px;line-height:1.9;margin:0 0 24px;">
            ${data.company || ''} ご担当者様<br><br>
            資料請求いただきありがとうございます。<br>
            資金繰り改善支援の概要をご確認ください。
          </p>
          <p style="font-size:13px;line-height:2;margin:0;color:#57534E;">
            ${data.issue || '（未入力）'}
          </p>
        </div>
      </div>
    `
  };
}

export function bankplanDownloadReply(data) {
  return {
    subject: '【資料お届け】銀行融資支援のご案内',
    html: `
      <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;color:#1C1917;">
        <div style="background:#1B2E4B;padding:28px 32px;">
          <p style="color:#B8963E;font-size:12px;font-weight:bold;letter-spacing:.15em;margin:0 0 8px;">CPA ADVISORY</p>
          <p style="color:#fff;font-size:18px;font-weight:bold;margin:0;">銀行融資支援　資料のお届け</p>
        </div>
        <div style="padding:32px;">
          <p style="font-size:14px;line-height:1.9;margin:0 0 24px;">
            ${data.company || ''} ご担当者様<br><br>
            資料請求いただきありがとうございます。<br>
            銀行融資支援の概要をご確認ください。
          </p>

          <div style="background:#FAF8F4;border-left:3px solid #B8963E;padding:20px 24px;margin:0 0 28px;">
            <p style="font-size:12px;font-weight:bold;color:#B8963E;letter-spacing:.1em;margin:0 0 12px;">この支援で整理すること</p>
            <p style="font-size:13px;line-height:2;margin:0;color:#57534E;">
              ・銀行が確認する主要論点の整理<br>
              ・事業計画と説明材料の骨格整理<br>
              ・面談前に確認すべき数字と論点の洗い出し
            </p>
          </div>

          <div style="margin:0 0 28px;">
            <p style="font-size:12px;font-weight:bold;color:#666;letter-spacing:.08em;margin:0 0 10px;">今回いただいたご相談目的</p>
            <p style="font-size:13px;line-height:2;margin:0;color:#57534E;">
              ${data.purpose || '（未入力）'}
            </p>
          </div>

          <div style="border-top:1px solid #E7E5E4;padding-top:24px;margin-top:8px;">
            <p style="font-size:13px;line-height:1.9;color:#57534E;margin:0 0 16px;">
              ご質問・ご相談はこのメールへの返信でご連絡ください。
            </p>
            <p style="font-size:12px;color:#A8A29E;margin:0;">
              柏 CPA Advisory<br>
              99tsukumo.info@gmail.com
            </p>
          </div>
        </div>
      </div>
    `
  };
}
