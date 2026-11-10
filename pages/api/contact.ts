import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  inquiryType?: string;
  company?: string;
  phone?: string;
  message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, subject, inquiryType, company, phone, message }: ContactFormData = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all required fields (Name, Email, Message)' 
      });
    }

    const contactRecord = {
      name,
      email,
      subject: subject || 'General B2B Inquiry',
      inquiryType: inquiryType || 'General Inquiry',
      company: company || 'Not specified',
      phone: phone || 'Not specified',
      message,
      contactId: `CNT-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    // 1. Audit log in data/leads.json
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
      existingLeads.unshift(contactRecord);
      fs.writeFileSync(leadsFile, JSON.stringify(existingLeads.slice(0, 500), null, 2));
    } catch (fsErr) {
      console.warn('Could not write contact to audit log:', fsErr);
    }

    // 2. Pre-filled WhatsApp link
    const waText = encodeURIComponent(
      `Hello YKP Supplies,\n*Inquiry from Website*\n` +
      `• Name: ${name}\n` +
      `• Company: ${company || 'N/A'}\n` +
      `• Email: ${email}\n` +
      `• Subject: ${subject || 'B2B Inquiry'}\n` +
      `• Message: ${message}`
    );
    const whatsappUrl = `https://wa.me/201002406013?text=${waText}`;

    // 3. Email dispatch if configured
    const emailUser = process.env.EMAIL_USER || process.env.GMAIL_USER;
    const emailPass = process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD;

    if (emailUser && emailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: emailUser, pass: emailPass }
        });

        await transporter.sendMail({
          from: `"YKP Supplies Website" <${emailUser}>`,
          to: 'sales@ykp-eg.com, ykpcommerchel@gmail.com',
          replyTo: email,
          subject: `🏭 New B2B Contact Inquiry: ${subject || 'Inquiry'} from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <h2>New Manufacturing & Sourcing Inquiry</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Company:</strong> ${company || 'N/A'}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
              <p><strong>Type:</strong> ${inquiryType || 'General'}</p>
              <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
              <div style="margin-top: 15px; padding: 15px; background: #f1f5f9; border-left: 4px solid #D4AF37;">
                ${message.replace(/\n/g, '<br/>')}
              </div>
            </div>
          `
        });
      } catch (mailErr) {
        console.error('Contact email dispatch failed:', mailErr);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Your inquiry has been received. Our team will respond within 24 hours.',
      contactId: contactRecord.contactId,
      whatsappUrl
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process inquiry. Please message us on WhatsApp (+20 100 240 6013).'
    });
  }
}