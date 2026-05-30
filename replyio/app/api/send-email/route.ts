import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { to, subject, message, ticketNumber } = await request.json();

  // Fetch company settings for branding (avoid count to prevent 406 errors)
  const { data: settings, error: settingsError } = await supabase
    .from('company_settings')
    .select('*', { count: 'none' })
    .single();

  if (settingsError) {
    console.error('Failed to load company settings', settingsError);
  }

  // Build HTML email template
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f5f5f5; padding: 20px; text-align: center; border-bottom: 3px solid #2563EB; }
        .logo { max-width: 150px; margin-bottom: 10px; }
        .content { padding: 30px 0; }
        .footer { background: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; border-top: 1px solid #eee; }
        .social { margin: 10px 0; }
        .social a { margin: 0 10px; text-decoration: none; color: #2563EB; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          ${settings?.logo_url ? `<img src="${settings.logo_url}" alt="Logo" class="logo">` : ''}
          <h2>${settings?.company_name || 'Support Team'}</h2>
        </div>
        <div class="content">
          <p>${message}</p>
        </div>
        <div class="footer">
          <p><strong>${settings?.company_name || 'Company'}</strong></p>
          ${settings?.website_url ? `<p><a href="${settings.website_url}">Visit our website</a></p>` : ''}
          <div class="social">
            ${settings?.twitter_url ? `<a href="${settings.twitter_url}">Twitter</a>` : ''}
            ${settings?.linkedin_url ? `<a href="${settings.linkedin_url}">LinkedIn</a>` : ''}
            ${settings?.facebook_url ? `<a href="${settings.facebook_url}">Facebook</a>` : ''}
            ${settings?.instagram_url ? `<a href="${settings.instagram_url}">Instagram</a>` : ''}
          </div>
          <p>${settings?.support_email || 'support@example.com'}</p>
          <p>Ticket: ${ticketNumber}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const result = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject,
    html,
  });

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
