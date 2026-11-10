import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface WholesaleInquiry {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  businessType: string;
  estimatedQuantity: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const inquiryData: WholesaleInquiry = req.body;

    // Validate required fields
    const requiredFields = ['companyName', 'contactName', 'email', 'phone', 'country'];
    for (const field of requiredFields) {
      if (!inquiryData[field as keyof WholesaleInquiry]) {
        return res.status(400).json({ 
          success: false, 
          message: `Missing required field: ${field}` 
        });
      }
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email credentials missing:', {
        EMAIL_USER: !!process.env.EMAIL_USER,
        EMAIL_PASS: !!process.env.EMAIL_PASS
      });
      return res.status(500).json({ 
        success: false, 
        message: 'Email service not configured. Please contact us directly at sales@ykp-eg.com or call +20 100 240 6013'
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

    // Email to factory
    const factoryEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background: linear-gradient(135deg, #D4AF37, #1E3A8A); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🏺 طلب عرض سعر جملة جديد</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">New Wholesale Price Quote Request</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #1E3A8A; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">معلومات الشركة / Company Information</h2>
          
          <div style="margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold; background-color: #D4AF37; color: white;">اسم الشركة / Company Name</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">${inquiryData.companyName}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold; background-color: #D4AF37; color: white;">الشخص المسؤول / Contact Person</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">${inquiryData.contactName}</td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold; background-color: #D4AF37; color: white;">البريد الإلكتروني / Email</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;"><a href="mailto:${inquiryData.email}" style="color: #1E3A8A;">${inquiryData.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold; background-color: #D4AF37; color: white;">الهاتف / Phone</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;"><a href="tel:${inquiryData.phone}" style="color: #1E3A8A;">${inquiryData.phone}</a></td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold; background-color: #D4AF37; color: white;">البلد / Country</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">${inquiryData.country}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold; background-color: #D4AF37; color: white;">نوع النشاط / Business Type</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">${inquiryData.businessType || 'غير محدد / Not specified'}</td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold; background-color: #D4AF37; color: white;">الكمية المتوقعة / Expected Quantity</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">${inquiryData.estimatedQuantity || 'غير محدد / Not specified'}</td>
              </tr>
            </table>
          </div>

          ${inquiryData.message ? `
            <h3 style="color: #1E3A8A; margin-top: 30px;">الرسالة الإضافية / Additional Message</h3>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 4px solid #D4AF37;">
              <p style="margin: 0; line-height: 1.6;">${inquiryData.message}</p>
            </div>
          ` : ''}

          <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #D4AF37, #1E3A8A); border-radius: 10px; text-align: center;">
            <p style="color: white; margin: 0; font-weight: bold;">يرجى الرد على هذا الطلب خلال 24 ساعة</p>
            <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">Please respond to this inquiry within 24 hours</p>
          </div>
        </div>

        <div style="text-align: center; margin-top: 20px; color: #666;">
          <p>تم إرسال هذا الطلب من موقع Pharaonic Pillows</p>
          <p>This request was sent from Pharaonic Pillows website</p>
        </div>
      </div>
    `;

    // Send email to factory
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'sales@ykp-eg.com', // Factory email
      subject: `🏺 طلب عرض سعر جملة جديد من ${inquiryData.companyName} - New Wholesale Quote Request`,
      html: factoryEmailContent,
      replyTo: inquiryData.email,
    });

    // Confirmation email to customer
    const customerEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background: linear-gradient(135deg, #D4AF37, #1E3A8A); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🏺 شكراً لطلبك</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Thank You for Your Inquiry</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #1E3A8A;">مرحباً ${inquiryData.contactName}</h2>
          
          <p style="line-height: 1.6; color: #333;">
            شكراً لك على اهتمامك بمنتجات الوسائد الفرعونية. لقد تم استلام طلب عرض السعر الخاص بك وإرساله مباشرة إلى فريق المصنع.
          </p>
          
          <p style="line-height: 1.6; color: #333;">
            Thank you for your interest in Pharaonic Pillows products. We have received your wholesale quote request and forwarded it directly to our manufacturing team.
          </p>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 4px solid #D4AF37; margin: 20px 0;">
            <h3 style="color: #1E3A8A; margin-top: 0;">ما يحدث بعد ذلك / What Happens Next:</h3>
            <ul style="color: #333; line-height: 1.6;">
              <li>سيقوم فريقنا بمراجعة طلبك خلال 24 ساعة</li>
              <li>Our team will review your request within 24 hours</li>
              <li>ستحصل على عرض سعر مخصص مع تفاصيل الشحن</li>
              <li>You'll receive a customized quote with shipping details</li>
              <li>يمكنك التواصل معنا مباشرة للاستفسارات العاجلة</li>
              <li>Contact us directly for urgent inquiries</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <h3 style="color: #1E3A8A;">تواصل معنا مباشرة / Contact Us Directly</h3>
            <div style="display: inline-block; margin: 10px; padding: 15px; background-color: #f8f9fa; border-radius: 10px;">
              <p style="margin: 0; color: #333;"><strong>📧 Email:</strong> <a href="mailto:sales@ykp-eg.com" style="color: #1E3A8A;">sales@ykp-eg.com</a></p>
            </div>
            <div style="display: inline-block; margin: 10px; padding: 15px; background-color: #f8f9fa; border-radius: 10px;">
              <p style="margin: 0; color: #333;"><strong>📞 Phone:</strong> <a href="tel:+201002406013" style="color: #1E3A8A;">+20 100 240 6013</a></p>
            </div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 20px; color: #666;">
          <p>YKP Supplies - Egyptian Travel Pillows Manufacturing</p>
          <p>Cairo, Egypt</p>
        </div>
      </div>
    `;

    // Send confirmation email to customer
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: inquiryData.email,
      subject: '🏺 تأكيد استلام طلب عرض السعر - Wholesale Quote Request Confirmation',
      html: customerEmailContent,
    });

    res.status(200).json({ 
      success: true, 
      message: 'Wholesale inquiry sent successfully' 
    });

  } catch (error) {
    console.error('Error sending wholesale inquiry:', error);
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send wholesale inquiry. Please try again or contact us directly at sales@ykp-eg.com',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}