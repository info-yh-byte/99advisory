const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = '99tsukumo.info@gmail.com'; 

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { company, industry, revenue, email } = req.body;

  if (!company || !industry || !revenue || !email) {
    return res.status(400).json({ error: '必須項目が不足しています' });
  }

  try {
    await resend.emails.send({
      from: '九十九アドバイザリー <info@99advisory.jp>',
      to: ADMIN_EMAIL,
      subject: `【資料請求】${company}（${industry}・${revenue}）`,
      html: `
        <h2>資料請求がありました</h2>
        <table style="border-collapse:collapse;">
          <tr><td style="padding:8px 16px 8px 0;color:#666;">会社名</td><td style="padding:8px 0;font-weight:bold;">${company}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;color:#666;">業種</td><td style="padding:8px 0;">${industry}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;color:#666;">売上規模</td><td style="padding:8px 0;">${revenue}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;color:#666;">メール</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
        </table>
      `
    });

    await resend.emails.send({
      from: '九十九アドバイザリー <info@99advisory.jp>',
      to: email,
      subject: '【確認】資料請求ありがとうございます｜九十九アドバイザリー',
      html: `
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;color:#1C1917;">
          <div style="background:#1B2E4B;padding:28px 32px;">
            <p style="color:#B8963E;font-size:12px;font-weight:bold;letter-spacing:.15em;margin:0 0 8px;">CPA ADVISORY</p>
            <p style="color:#fff;font-size:18px;font-weight:bold;margin:0;">経営数字 活用診断　資料のお届け</p>
          </div>
          <div style="padding:32px;">
            <p style="font-size:14px;line-height:1.9;margin:0 0 24px;">
              ${company} ご担当者様<br><br>
              このたびは、99 Advisoryの資料をご請求いただきありがとうございます。フォーム送信を受け付けました。
              <br>診断の詳細をご確認ください。
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
                 このメールは、資料請求フォーム送信後の確認メールです。<br>お心当たりがない場合は、このまま破棄してください。
              </p>
              <p style="font-size:12px;color:#A8A29E;margin:0;">
                九十九アドバイザリー<br>
                ${ADMIN_EMAIL}
              </p>
            </div>
          </div>
        </div>
      `
    });

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'メール送信に失敗しました' });
  }
};
