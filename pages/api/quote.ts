import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

interface QuoteLead {
  fullName: string;
  companyName: string;
  country: string;
  email: string;
  phone: string;
  website?: string;
  productType?: string;
  productCode?: string;
  estimatedQuantity?: string;
  customDesign?: boolean | string;
  privateLabel?: boolean | string;
  targetMarket?: string;
  additionalDetails?: string;
  sourcePage?: string;
  createdAt?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const lead: QuoteLead = req.body;

    if (!lead.fullName || !lead.companyName || !lead.email || !lead.country) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: fullName, companyName, email, and country are required.'
      });
    }

    const leadRecord = {
      ...lead,
      createdAt: new Date().toISOString(),
      leadId: `RFQ-${Date.now()}`
    };

    // 1. Audit log in data/leads.json (Graceful persistence)
    try {
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const leadsFile = path.join(dataDir, 'leads.json');
      let existingLeads: any[] = [];
      if (fs.existsSync(leadsFile)) {
        try {
          existingLeads = JSON.parse(fs.readFileSync(leadsFile, 'utf8'));
        } catch (e) {
          existingLeads = [];
        }
      }
      existingLeads.unshift(leadRecord);
      fs.writeFileSync(leadsFile, JSON.stringify(existingLeads.slice(0, 500), null, 2));
    } catch (fsErr) {
      console.warn('Could not write lead to local audit log:', fsErr);
    }

    // 2. Build pre-filled WhatsApp text
    const waText = encodeURIComponent(
      `Hello YKP Supplies,\n*New Wholesale Quote Request*\n` +
      `• Name: ${lead.fullName}\n` +
      `• Company: ${lead.companyName} (${lead.country})\n` +
      `• Email: ${lead.email}\n` +
      `• Phone/WA: ${lead.phone || 'N/A'}\n` +
      `• Product: ${lead.productType || lead.productCode || 'General Catalog'}\n` +
      `• Est. Quantity: ${lead.estimatedQuantity || 'To be discussed'}\n` +
      `• Custom/OEM: ${lead.customDesign || lead.privateLabel ? 'Yes' : 'No'}\n` +
      `• Notes: ${lead.additionalDetails || 'None'}`
    );
    const whatsappUrl = `https://wa.me/201002406013?text=${waText}`;

    // 3. Dispatch Email if transporter configured
    const emailUser = process.env.EMAIL_USER || process.env.GMAIL_USER;
    const emailPass = process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD;

    if (emailUser && emailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: emailUser, pass: emailPass }
        });

        // Email to factory sales team
        await transporter.sendMail({
          from: emailUser,
          to: 'sales@ykp-eg.com, ykpcommerchel@gmail.com',
          replyTo: lead.email,
          subject: `📦 [B2B Quote Request] ${lead.companyName} (${lead.country}) - ${lead.productType || 'Catalog'}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
              <div style="background: #0B132B; padding: 24px; border-radius: 8px; text-align: center; color: white;">
                <h2 style="margin: 0; color: #D4AF37; font-size: 22px;">New B2B Wholesale Quote Request</h2>
                <p style="margin: 6px 0 0; font-size: 13px; color: #94a3b8;">YKP Supplies Global Manufacturing</p>
              </div>
              <div style="padding: 24px 8px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr><td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 35%;">Company Name</td><td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${lead.companyName}</td></tr>
                  <tr><td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Contact Name</td><td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${lead.fullName}</td></tr>
                  <tr><td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Country / Market</td><td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${lead.country}</td></tr>
                  <tr><td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Email</td><td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
                  <tr><td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Phone / WhatsApp</td><td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${lead.phone || 'N/A'}</td></tr>
                  <tr><td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Product Line</td><td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${lead.productType || lead.productCode || 'General Wholesale Catalog'}</td></tr>
                  <tr><td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Estimated Quantity</td><td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${lead.estimatedQuantity || 'Not specified'}</td></tr>
                  <tr><td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Custom Design / Private Label</td><td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${lead.customDesign || lead.privateLabel ? 'Yes (Requested)' : 'Standard Catalog'}</td></tr>
                  <tr><td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Source Page</td><td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${lead.sourcePage || '/request-a-quote'}</td></tr>
                </table>
                ${lead.additionalDetails ? `
                  <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-left: 4px solid #D4AF37; border-radius: 4px;">
                    <p style="margin: 0; font-size: 13px; color: #334155;"><strong>Project Notes:</strong><br/>${lead.additionalDetails}</p>
                  </div>
                ` : ''}
              </div>
            </div>
          `
        });

        // Confirmation to buyer
        await transporter.sendMail({
          from: emailUser,
          to: lead.email,
          subject: 'Thank you for your Wholesale Quote Request | YKP Supplies Egypt',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b;">
              <h2 style="color: #0B132B;">Dear ${lead.fullName},</h2>
              <p>Thank you for contacting <strong>YKP Supplies</strong> regarding your travel pillow wholesale and manufacturing inquiry.</p>
              <p>Our commercial export department in Cairo has received your request and will review your specifications. You will receive an official quotation and container packing specifications within 24 hours.</p>
              <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
                <p style="margin: 0 0 8px; font-weight: bold; color: #0B132B;">Direct Factory Contacts:</p>
                <p style="margin: 4px 0; font-size: 13px;">• WhatsApp / Phone: +20 100 240 6013</p>
                <p style="margin: 4px 0; font-size: 13px;">• Email: sales@ykp-eg.com</p>
                <p style="margin: 4px 0; font-size: 13px;">• Facility: New Cairo, Cairo, Egypt</p>
              </div>
              <p style="font-size: 12px; color: #64748b;">Best regards,<br/>YKP Supplies Global B2B Export Team</p>
            </div>
          `
        });
      } catch (mailError) {
        console.error('Mail dispatch error:', mailError);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Your quote request has been recorded. Our team will contact you within 24 hours.',
      leadId: leadRecord.leadId,
      whatsappUrl
    });
  } catch (error) {
    console.error('Quote handler error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please message us directly via WhatsApp (+20 100 240 6013).'
    });
  }
}
