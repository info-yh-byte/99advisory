import { NextResponse } from 'next/server';
import formConfig from '../../../lib/form-config';
import { defaultAdminNotice, seizoDownloadReply } from '../../../lib/mail-templates';

const templateMap = {
  defaultAdminNotice,
  seizoDownloadReply
};

function pickAllowedFields(body, allowedFields) {
  const result = {};
  for (const key of allowedFields) {
    result[key] = body[key] ?? '';
  }
  return result;
}

function validateRequiredFields(data, requiredFields) {
  const missing = requiredFields.filter((field) => !data[field]);
  return missing;
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

    const adminTemplate = templateMap[config.adminTemplate](filteredData);
    const userTemplate = templateMap[config.userTemplate](filteredData);

    return NextResponse.json({
      ok: true,
      message: config.successMessage,
      debug: {
        config,
        filteredData,
        adminTemplate,
        userTemplate
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Invalid request',
        detail: error.message
      },
      { status: 500 }
    );
  }
}
