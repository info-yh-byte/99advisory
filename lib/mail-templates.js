export function defaultAdminNotice(data) {
  return {
    subject: `【資料請求】${data.company || '会社名未入力'}（${data.industry || '業種未入力'}・${data.revenue || '売上規模未入力'}）`,
    html: `
      <h2>資料請求がありました</h2>
      <table style="border-collapse:collapse;">
        <tr>
          <td style="padding:8px 16px 8px 0;color:#666;">会社名</td>
          <td style="padding:8px 0;font-weight:bold;">${data.company || ''}</td>
        </tr>
        <tr>
          <td style="padding:8px 16px 8px 0;color:#666;">業種</td>
          <td style="padding:8px 0;">${data.industry || ''}</td>
        </tr>
        <tr>
          <td style="padding:8px 16px 8px 0;color:#666;">売上規模</td>
          <td style="padding:8px 0;">${data.revenue || ''}</td>
        </tr>
        <tr>
          <td style="padding:8px 16px 8px 0;color:#666;">メール</td>
          <td style="padding:8px 0;"><a href="mailto:${data.email || ''}">${data.email || ''}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 16px 8px 0;color:#666;">serviceSlug</td>
          <td style="padding:8px 0;">${data.serviceSlug || ''}</td>
        </tr>
        <tr>
          <td style="padding:8px 16px 8px 0;color:#666;">formType</td>
          <td style="padding:8px 0;">${data.formType || ''}</td>
        </tr>
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

          <div style="background:#FAF8F4;border-left:3px solid #B8963E;padding:20px 24px;margin:0 0 28px;">
            <p style="font-size:12px;font-weight:bold;color:#B8963E;letter-spacing:.1em;margin:0 0 12px;">診断でわかること</p>
            <p style="font-size:13px;line-height:2;margin:0;color:#57534E;">
              ・なぜ忙しいのに利益が残らないのか、構造として特定します<br>
              ・4軸スコアカードで御社の現状を採点します<br>
              ・30日以内に着手できる初動アクションを3つ示します
            </p>
          </div>

          <div style="margin:0 0 28px;">
            <p style="font-size:12px;font-weight:bold;color:#666;letter-spacing:.08em;margin:0 0 10px;">診断の流れ</p>
            <p style="font-size:13px;line-height:2;margin:0;color:#57534E;">
              ① 事前フォーム（15分）<br>
              ② ヒアリング 60分<br>
              ③ 9ページレポート納品（3〜5営業日後）<br>
              ④ 確認面談 60分
            </p>
          </div>

          <div style="background:#1B2E4B;padding:20px 24px;margin:0 0 28px;">
            <p style="font-size:12px;color:rgba(255,255,255,.5);margin:0 0 4px;">診断料金</p>
            <p style="font-size:28px;font-weight:bold;color:#fff;margin:0;">98,800<span style="font-size:13px;color:rgba(255,255,255,.6);">円（税別）</span></p>
          </div>

          <div style="border-top:1px solid #E7E5E4;padding-top:24px;margin-top:8px;">
            <p style="font-size:13px;line-height:1.9;color:#57534E;margin:0 0 16px;">
              ご質問・お申し込みはこのメールへの返信でご連絡ください。
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
