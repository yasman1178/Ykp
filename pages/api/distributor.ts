import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const data = req.body;
    const {
      fullName,
      companyName,
      country,
      city,
      email,
      phone,
      website,
      businessType,
      yearsInBusiness,
      salesChannels,
      estimatedOrderQuantity,
      message
    } = data;

    if (!fullName || !companyName || !email || !country) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: fullName, companyName, email, and country are required.'
      });
    }

    const applicationRecord = {
      ...data,
      applicationId: `DIST-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    // 1. Audit log
    try {
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const distFile = path.join(dataDir, 'distributors.json');
      let records: any[] = [];
      if (fs.existsSync(distFile)) {
        try {
          records = JSON.parse(fs.readFileSync(distFile, 'utf8'));
        } catch (e) {
          records = [];
        }
      }
      records.unshift(applicationRecord);
      fs.writeFileSync(distFile, JSON.stringify(records.slice(0, 500), null, 2));
    } catch (fsErr) {
      console.warn('Could not write distributor record to local audit log:', fsErr);
    }

    // 2. Build WhatsApp text
    const waText = encodeURIComponent(
      `Hello YKP Supplies,\n*Distributor Application*\n` +
      `• Name: ${fullName}\n` +
      `• Company: ${companyName} (${country})\n` +
      `• Email: ${email}\n` +
      `• Channels: ${salesChannels || 'Retail/Wholesale'}\n` +
      `• Est. Order Vol: ${estimatedOrderQuantity || 'TBD'}\n` +
      `• Message: ${message || 'Applying for authorized distribution'}`
    );
    const whatsappUrl = `https://wa.me/201002406013?text=${waText}`;

    // 3. Dispatch Email if available
    const emailUser = process.env.EMAIL_USER || process.env.GMAIL_USER;
    const emailPass = process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD;

    if (emailUser && emailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: emailUser, pass: emailPass }
        });

        await transporter.sendMail({
          from: emailUser,
          to: 'sales@ykp-eg.com, ykpcommerchel@gmail.com',
          replyTo: email,
          subject: `🚚 [New Distributor Application] ${companyName} (${country})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #0B132B;">New Authorized Distributor Application</h2>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr><td style="padding: 8px; font-weight: bold;">Company:</td><td>${companyName}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Contact Name:</td><td>${fullName}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Country / City:</td><td>${country} ${city ? `(${city})` : ''}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td>${email}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Phone / WhatsApp:</td><td>${phone || 'N/A'}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Website:</td><td>${website || 'N/A'}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Business Type:</td><td>${businessType || 'N/A'}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Years in Business:</td><td>${yearsInBusiness || 'N/A'}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Sales Channels:</td><td>${salesChannels || 'N/A'}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Est. Order Volume:</td><td>${estimatedOrderQuantity || 'N/A'}</td></tr>
              </table>
              ${message ? `<p><strong>Business Plan / Notes:</strong><br/>${message}</p>` : ''}
            </div>
          `
        });
      } catch (err) {
        console.error('Distributor email dispatch error:', err);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Your distributor application has been submitted successfully.',
      applicationId: applicationRecord.applicationId,
      whatsappUrl
    });
  } catch (error) {
    console.error('Distributor handler error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process distributor application'
    });
  }
}
