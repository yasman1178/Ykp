import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  inquiryType: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, subject, inquiryType, message }: ContactFormData = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all required fields' 
      });
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email credentials missing:', {
        EMAIL_USER: !!process.env.EMAIL_USER,
        EMAIL_PASS: !!process.env.EMAIL_PASS
      });
      return res.status(500).json({ 
        success: false, 
        message: 'Email service not configured. Please contact us directly at ykp.supplies@gmail.com or call +20 100 240 6013'
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🏭 New Manufacturing Inquiry</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">YKP Supplies Factory Contact Form</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Details</h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #667eea;">👤 Name:</strong> ${name}
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #667eea;">📧 Email:</strong> 
            <a href="mailto:${email}" style="color: #764ba2; text-decoration: none;">${email}</a>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #667eea;">📋 Subject:</strong> ${subject}
          </div>
          
          ${inquiryType ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #667eea;">🏷️ Inquiry Type:</strong> 
            <span style="background: #667eea; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px;">${inquiryType}</span>
          </div>
          ` : ''}
          
          <div style="margin-top: 25px;">
            <h3 style="color: #333; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 8px;">💬 Message:</h3>
            <div style="background: #f8f9ff; padding: 20px; border-radius: 10px; border-left: 4px solid #667eea; line-height: 1.6;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background: #f0f4ff; border-radius: 10px; border: 1px solid #e0e7ff;">
            <h4 style="color: #667eea; margin: 0 0 10px 0;">📞 Quick Response Options:</h4>
            <p style="margin: 5px 0; color: #555;">
              <strong>Reply to:</strong> <a href="mailto:${email}" style="color: #764ba2;">${email}</a>
            </p>
            <p style="margin: 5px 0; color: #555;">
              <strong>Call direct:</strong> +20 100 240 6013
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
          <p>This message was sent from the YKP Supplies website contact form</p>
          <p>Received on: ${new Date().toLocaleString('en-US', { 
            timeZone: 'Africa/Cairo',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
          })}</p>
        </div>
      </div>
    `;

    // Send email to company
    await transporter.sendMail({
      from: `"YKP Supplies Website" <${process.env.EMAIL_USER}>`,
      to: 'ykp.supplies@gmail.com', // Company email
      subject: `🏭 New Manufacturing Inquiry: ${subject}`,
      html: emailContent,
      replyTo: email, // Set reply-to as the customer's email
    });

    // Send confirmation email to customer
    const confirmationEmail = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">✅ Message Received!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Thank you for contacting YKP Supplies</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px;">Dear ${name},</h2>
          
          <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
            Thank you for your inquiry about our Egyptian travel pillows manufacturing services. 
            We have received your message and our team will review it carefully.
          </p>
          
          <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; border-left: 4px solid #10b981; margin: 20px 0;">
            <h3 style="color: #059669; margin: 0 0 10px 0;">📋 Your Inquiry Summary:</h3>
            <p style="margin: 5px 0; color: #374151;"><strong>Subject:</strong> ${subject}</p>
            ${inquiryType ? `<p style="margin: 5px 0; color: #374151;"><strong>Type:</strong> ${inquiryType}</p>` : ''}
            <p style="margin: 5px 0; color: #374151;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <h3 style="color: #333; margin: 25px 0 15px 0;">⏰ What happens next?</h3>
          <ul style="color: #555; line-height: 1.8; padding-left: 20px;">
            <li>Our manufacturing team will review your inquiry within 24 hours</li>
            <li>We'll prepare a detailed response with pricing and specifications</li>
            <li>You'll receive a personalized quote directly from our factory</li>
            <li>Our team will be available for any follow-up questions</li>
          </ul>
          
          <div style="background: #eff6ff; padding: 20px; border-radius: 10px; margin: 25px 0;">
            <h4 style="color: #1d4ed8; margin: 0 0 15px 0;">📞 Need immediate assistance?</h4>
            <p style="margin: 5px 0; color: #374151;">
              <strong>Call us directly:</strong> +20 100 240 6013
            </p>
            <p style="margin: 5px 0; color: #374151;">
              <strong>Email:</strong> ykp.supplies@gmail.com
            </p>
            <p style="margin: 5px 0; color: #374151;">
              <strong>Business Hours:</strong> Sunday - Thursday, 9 AM - 6 PM (Cairo Time)
            </p>
          </div>
          
          <p style="color: #555; line-height: 1.6; margin-top: 25px;">
            We appreciate your interest in YKP Supplies and look forward to the opportunity 
            to serve your Egyptian travel pillow manufacturing needs.
          </p>
          
          <p style="color: #555; margin-top: 20px;">
            Best regards,<br>
            <strong style="color: #1d4ed8;">YKP Supplies Manufacturing Team</strong><br>
            Cairo, Egypt
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
          <p>This is an automated confirmation from YKP Supplies</p>
          <p>Please do not reply to this email. For questions, contact us at ykp.supplies@gmail.com</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"YKP Supplies" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '✅ Your Manufacturing Inquiry - YKP Supplies',
      html: confirmationEmail,
    });

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully! Check your email for confirmation.' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again or contact us directly at ykp.supplies@gmail.com',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}