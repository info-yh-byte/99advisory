import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import formConfig from '../../../lib/form-config';
import { defaultAdminNotice, seizoDownloadReply, cashflowDownloadReply } from '../../../lib/mail-templates';
import { appendLeadRow } from '../../../lib/sheets';

const resend = new Resend(process.env.RESEND_API_KEY);

const templateMap = {
  defaultAdminNotice,
  seizoDownloadReply,
  cashflowDownloadReply
};

function pickAllowedFields(body, allowedFields) {
  const result = {};
  for (const key of allowedFields) {
    result[key] = body[key] ?? '';
  }
  return result;
}

function validateRequiredFields(data, requiredFields) {
  return requiredFields.filter((field) => !data[field]);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const formType = body.formType;

    if (!formType) {
      return NextResponse.json(
        { ok: false, error: 'formType is required' },
        { status: 400 }
      );
    }

    const config = formConfig[formType];

    if (!config) {
      return NextResponse.json(
        { ok: false, error: 'Unknown formType' },
        { status: 400 }
      );
    }

    const filteredData = pickAllowedFields(body, config.allowedFields);
    const missingFields = validateRequiredFields(filteredData, config.requiredFields);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields', missingFields },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: 'RESEND_API_KEY is missing' },
        { status: 500 }
      );
    }

    const adminTemplate = templateMap[config.adminTemplate](filteredData);
    const userTemplate = templateMap[config.userTemplate](filteredData);

    const adminResult = await resend.emails.send({
      from: `99advisory <${config.fromEmail}>`,
      to: config.adminEmail,
      replyTo: filteredData.email,
      subject: adminTemplate.subject,
      html: adminTemplate.html
    });

    const userResult = await resend.emails.send({
      from: `99advisory <${config.fromEmail}>`,
      to: filteredData.email,
      subject: userTemplate.subject,
      html: userTemplate.html
    });

    await appendLeadRow([
      new Date().toISOString(),
      config.serviceSlug,
      config.formType,
      filteredData.company || '',
      filteredData.email || '',
      filteredData.industry || filteredData.issue || '',
      filteredData.revenue || '',
      adminResult?.data?.id ?? '',
      userResult?.data?.id ?? '',
      JSON.stringify(filteredData)
    ]);

    return NextResponse.json({
      ok: true,
      message: config.successMessage,
      adminEmailId: adminResult?.data?.id ?? null,
      userEmailId: userResult?.data?.id ?? null
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Failed to process form submission',
        detail: error.message
      },
      { status: 500 }
    );
  }
}
