import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

/**
 * POST /api/contact
 *
 * Receives "Start a Project" enquiries from the SmartBiz contact form and
 * emails them to the business inbox via Resend. The Resend API key never
 * leaves this server-side function.
 *
 * Required environment variables (set in Vercel, never committed):
 *   RESEND_API_KEY    - server-side Resend API key
 *   CONTACT_TO_EMAIL   - inbox that should receive enquiries
 *   CONTACT_FROM_EMAIL - verified Resend sender address (e.g. a subdomain of a verified domain)
 */

const MAX_LENGTHS = {
  name: 100,
  business: 150,
  email: 254,
  phone: 50,
  projectType: 100,
  message: 5000,
} as const;

type ContactField = keyof typeof MAX_LENGTHS;

interface ContactPayload {
  name: string;
  business: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function asTrimmedString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function sendJson(res: VercelResponse, status: number, body: Record<string, unknown>): VercelResponse {
  return res.status(status).json(body);
}

function sendError(res: VercelResponse, status: number, error: string): VercelResponse {
  return sendJson(res, status, { success: false, error });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<VercelResponse> {
  // 1. Only POST is supported.
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendError(res, 405, 'Method not allowed.');
  }

  // 2. Require a JSON request body.
  const contentType = String(req.headers['content-type'] ?? '').toLowerCase();
  if (!contentType.includes('application/json')) {
    return sendError(res, 415, 'Content-Type must be application/json.');
  }

  // 3. Parse and sanity-check the body. Vercel usually parses JSON for us,
  // but we defensively handle a raw string body and malformed JSON too.
  let rawBody: unknown = req.body;
  if (typeof rawBody === 'string') {
    if (rawBody.length === 0) {
      return sendError(res, 400, 'Request body is empty.');
    }
    try {
      rawBody = JSON.parse(rawBody);
    } catch {
      return sendError(res, 400, 'Malformed JSON body.');
    }
  }

  if (!isRecord(rawBody)) {
    return sendError(res, 400, 'Malformed JSON body.');
  }

  // 4. Normalize + validate fields. Never trust client input.
  const payload: ContactPayload = {
    name: asTrimmedString(rawBody.name),
    business: asTrimmedString(rawBody.business),
    email: asTrimmedString(rawBody.email),
    phone: asTrimmedString(rawBody.phone),
    projectType: asTrimmedString(rawBody.projectType),
    message: asTrimmedString(rawBody.message),
  };

  if (!payload.name || !payload.email || !payload.message) {
    return sendError(res, 400, 'Name, email and message are required.');
  }

  if (!EMAIL_REGEX.test(payload.email)) {
    return sendError(res, 400, 'Please provide a valid email address.');
  }

  const overLimitField = (Object.keys(MAX_LENGTHS) as ContactField[]).find(
    (field) => payload[field].length > MAX_LENGTHS[field],
  );
  if (overLimitField) {
    return sendError(res, 400, `The ${overLimitField} field is too long.`);
  }

  // 5. Confirm the server is actually configured before calling Resend.
  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !toEmail || !fromEmail) {
    console.error(
      'Contact form is missing required environment variables (RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL).',
    );
    return sendError(
      res,
      500,
      'The contact form is not fully configured yet. Please reach out via WhatsApp or email directly.',
    );
  }

  const resend = new Resend(resendApiKey);

  const textBody = [
    `Name: ${payload.name}`,
    `Business: ${payload.business || '—'}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || '—'}`,
    `Project Type: ${payload.projectType || '—'}`,
    '',
    'Message:',
    payload.message,
  ].join('\n');

  const htmlBody = `
    <div style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; color: #1a1a1a; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">New SmartBiz Project Enquiry</h2>
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p style="margin: 0 0 8px;"><strong>Business:</strong> ${escapeHtml(payload.business) || '—'}</p>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p style="margin: 0 0 8px;"><strong>Phone:</strong> ${escapeHtml(payload.phone) || '—'}</p>
      <p style="margin: 0 0 16px;"><strong>Project Type:</strong> ${escapeHtml(payload.projectType) || '—'}</p>
      <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
      <p style="white-space: pre-wrap; margin: 0;">${escapeHtml(payload.message)}</p>
    </div>
  `;

  // 6. Send via Resend. The client's address is only used as reply-to,
  // never as the sender.
  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: payload.email,
      subject: `New SmartBiz Project Enquiry — ${payload.name}`,
      text: textBody,
      html: htmlBody,
    });

    if (error) {
      console.error('Resend API returned an error:', error);
      return sendError(res, 502, 'We could not send your message right now. Please try again shortly.');
    }

    return sendJson(res, 200, { success: true });
  } catch (err) {
    console.error('Unexpected error sending contact form email:', err);
    return sendError(res, 500, 'Something went wrong. Please try again or contact us directly.');
  }
}
