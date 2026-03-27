const formConfig = {
  seizo_download: {
    serviceSlug: 'seizo',
    formType: 'seizo_download',
    fromEmail: 'info@99advisory.jp',
    adminEmail: '99tsukumo.info@gmail.com',
    requiredFields: ['company', 'industry', 'revenue', 'email'],
    allowedFields: ['company', 'industry', 'revenue', 'email', 'serviceSlug', 'formType'],
    userTemplate: 'seizoDownloadReply',
    adminTemplate: 'defaultAdminNotice',
    successMessage: '送信が完了しました。メールをご確認ください。'
  },

  cashflow_download: {
    serviceSlug: 'cashflow',
    formType: 'cashflow_download',
    fromEmail: 'info@99advisory.jp',
    adminEmail: '99tsukumo.info@gmail.com',
    requiredFields: ['company', 'issue', 'email'],
    allowedFields: ['company', 'issue', 'email', 'serviceSlug', 'formType'],
    userTemplate: 'cashflowDownloadReply',
    adminTemplate: 'defaultAdminNotice',
    successMessage: '送信が完了しました。メールをご確認ください。'
  },

  bankplan_download: {
    serviceSlug: 'bank-plan',
    formType: 'bankplan_download',
    fromEmail: 'info@99advisory.jp',
    adminEmail: '99tsukumo.info@gmail.com',
    requiredFields: ['company', 'purpose', 'email'],
    allowedFields: ['company', 'purpose', 'email', 'serviceSlug', 'formType'],
    userTemplate: 'bankplanDownloadReply',
    adminTemplate: 'defaultAdminNotice',
    successMessage: '送信が完了しました。メールをご確認ください。'
  }
};

export default formConfig;
