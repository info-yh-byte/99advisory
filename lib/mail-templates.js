export function generalReply(data) {
  const { name = '', message = '' } = data;
  return {
    subject: 'お問い合わせ確認 ─ 九十九アドバイザリー',
    html: `
      <div style="background:#fafaf8;max-width:600px;margin:0 auto;font-family:sans-serif;">
        <div style="background:#1b2e4b;padding:24px 32px;">
          <p style="color:#ffffff;font-size:16px;font-weight:bold;margin:0;">九十九アドバイザリー</p>
        </div>
        <div style="background:#ffffff;padding:32px;">
          <p style="font-size:16px;font-weight:bold;margin:0 0 16px;">${name} 様</p>
          <p style="margin:0 0 8px;">お問い合わせいただきありがとうございます。</p>
          <p style="margin:0 0 24px;">内容を確認のうえ、2営業日以内にご連絡いたします。</p>
          <hr style="border:none;border-top:1px solid #eae8e3;margin:24px 0;" />
          <p style="font-size:14px;color:#57534e;margin:0 0 12px;">まずサービス内容をご確認される場合:</p>
          <a href="https://99advisory.jp/services" style="background:#b78460;color:#ffffff;padding:12px 24px;border-radius:4px;text-decoration:none;display:inline-block;">サービス内容を見る</a>
          ${message ? `
          <hr style="border:none;border-top:1px solid #eae8e3;margin:24px 0;" />
          <p style="font-size:13px;color:#57534e;margin:0 0 8px;">ご相談内容:</p>
          <div style="background:#f6f1e8;padding:16px;border-radius:4px;white-space:pre-wrap;font-size:14px;">${message}</div>
          ` : ''}
        </div>
        <div style="background:#f6f1e8;padding:20px 32px;font-size:13px;color:#57534e;">
          <p style="margin:0 0 4px;">九十九アドバイザリー</p>
          <p style="margin:0 0 4px;">info@99advisory.jp</p>
          <p style="margin:0 0 12px;">https://99advisory.jp</p>
          <p style="font-size:12px;color:#a8a29e;margin:0;">※ このメールは自動送信です。このメールへの返信はお受けできません。</p>
        </div>
      </div>
    `,
    text: `${name} 様\n\nお問い合わせいただきありがとうございます。\n内容を確認のうえ、2営業日以内にご連絡いたします。\n\nサービス内容はこちら: https://99advisory.jp/services\n${message ? `\nご相談内容: ${message}\n` : ''}\n九十九アドバイザリー\ninfo@99advisory.jp\nhttps://99advisory.jp\nこのメールは自動送信です。返信はお受けできません。`
  };
}

export function generalAdminNotice(data) {
  const { company = '', name = '', email = '', message = '', sourcePath = '' } = data;
  return {
    subject: `問い合わせ: ${company}（九十九アドバイザリー）`,
    html: `
      <div style="background:#fafaf8;max-width:600px;font-family:sans-serif;">
        <div style="background:#1b2e4b;padding:20px 32px;">
          <p style="color:#ffffff;font-size:16px;font-weight:bold;margin:0;">新規問い合わせ</p>
        </div>
        <div style="background:#ffffff;padding:32px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr style="border-bottom:1px solid #eae8e3;">
              <th style="background:#f6f1e8;padding:10px 16px;font-size:13px;text-align:left;width:120px;">会社名</th>
              <td style="padding:10px 16px;font-size:14px;">${company}</td>
            </tr>
            <tr style="border-bottom:1px solid #eae8e3;">
              <th style="background:#f6f1e8;padding:10px 16px;font-size:13px;text-align:left;">氏名</th>
              <td style="padding:10px 16px;font-size:14px;">${name}</td>
            </tr>
            <tr style="border-bottom:1px solid #eae8e3;">
              <th style="background:#f6f1e8;padding:10px 16px;font-size:13px;text-align:left;">メール</th>
              <td style="padding:10px 16px;font-size:14px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr style="border-bottom:1px solid #eae8e3;">
              <th style="background:#f6f1e8;padding:10px 16px;font-size:13px;text-align:left;">相談内容</th>
              <td style="padding:10px 16px;font-size:14px;white-space:pre-wrap;">${message || '（未記入）'}</td>
            </tr>
            <tr>
              <th style="background:#f6f1e8;padding:10px 16px;font-size:13px;text-align:left;">流入元</th>
              <td style="padding:10px 16px;font-size:14px;">${sourcePath || '不明'}</td>
            </tr>
          </table>
        </div>
        <div style="font-size:12px;color:#a8a29e;padding:20px 32px;">
          このメールは 99advisory.jp のフォームから自動送信されました。
        </div>
      </div>
    `,
    text: `【新規問い合わせ】\n会社名 : ${company}\n氏名   : ${name}\nメール : ${email}\n内容   : ${message || '（未記入）'}\n流入元 : ${sourcePath || '不明'}`
  };
}

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

export function contactInquiryAdmin(data) {
  return {
    subject: `【お問い合わせ】${data.name || '氏名未入力'} / ${data.company || '会社名未入力'}`,
    html: `
      <h2>お問い合わせがありました</h2>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
        <tr><th align="left">お名前</th><td>${data.name || ''}</td></tr>
        <tr><th align="left">会社名</th><td>${data.company || ''}</td></tr>
        <tr><th align="left">メール</th><td>${data.email || ''}</td></tr>
        <tr><th align="left">お問い合わせ内容</th><td style="white-space:pre-wrap;">${data.message || ''}</td></tr>
      </table>
    `
  };
}

export function contactInquiryReply(data) {
  return {
    subject: '【受付完了】お問い合わせありがとうございます',
    html: `
      <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;color:#1C1917;">
        <div style="background:#1B2E4B;padding:28px 32px;">
          <p style="color:#B8963E;font-size:12px;font-weight:bold;letter-spacing:.15em;margin:0 0 8px;">CPA ADVISORY</p>
          <p style="color:#fff;font-size:18px;font-weight:bold;margin:0;">お問い合わせを受け付けました</p>
        </div>
        <div style="padding:32px;">
          <p style="font-size:14px;line-height:1.9;margin:0 0 24px;">
            ${data.name || ''} 様<br><br>
            お問い合わせいただきありがとうございます。<br>
            内容を確認のうえ、通常2営業日以内にご返信いたします。
          </p>

          <div style="background:#FAF8F4;border-left:3px solid #B8963E;padding:20px 24px;margin:0 0 28px;">
            <p style="font-size:12px;font-weight:bold;color:#B8963E;letter-spacing:.1em;margin:0 0 12px;">お問い合わせ内容</p>
            <p style="font-size:13px;line-height:2;margin:0;color:#57534E;white-space:pre-wrap;">${data.message || ''}</p>
          </div>

          <div style="border-top:1px solid #E7E5E4;padding-top:24px;margin-top:8px;">
            <p style="font-size:13px;line-height:1.9;color:#57534E;margin:0 0 16px;">
              このメールへの返信でご連絡いただくこともできます。
            </p>
            <p style="font-size:12px;color:#A8A29E;margin:0;">
              99advisory<br>
              99tsukumo.info@gmail.com
            </p>
          </div>
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
