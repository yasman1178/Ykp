import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface PartnershipInquiry {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  partnershipType: string;
  companySize: string;
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
    const inquiryData: PartnershipInquiry = req.body;

    // Validate required fields
    const requiredFields = ['companyName', 'contactName', 'email', 'phone', 'partnershipType', 'message'];
    for (const field of requiredFields) {
      if (!inquiryData[field as keyof PartnershipInquiry]) {
        return res.status(400).json({ 
          success: false, 
          message: `Missing required field: ${field}` 
        });
      }
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
          <h1 style="color: white; margin: 0; font-size: 28px;">🤝 طلب شراكة استراتيجية جديد</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">New Strategic Partnership Request</p>
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
                <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold; background-color: #D4AF37; color: white;">الموقع الإلكتروني / Website</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">${inquiryData.website || 'غير محدد / Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold; background-color: #D4AF37; color: white;">نوع الشراكة / Partnership Type</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">${inquiryData.partnershipType}</td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold; background-color: #D4AF37; color: white;">حجم الشركة / Company Size</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">${inquiryData.companySize || 'غير محدد / Not specified'}</td>
              </tr>
            </table>
          </div>

          <h3 style="color: #1E3A8A; margin-top: 30px;">تفاصيل الشراكة المقترحة / Partnership Details</h3>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 4px solid #D4AF37;">
            <p style="margin: 0; line-height: 1.6;">${inquiryData.message}</p>
          </div>

          <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #D4AF37, #1E3A8A); border-radius: 10px; text-align: center;">
            <p style="color: white; margin: 0; font-weight: bold;">يرجى الرد على هذا الطلب خلال 48 ساعة</p>
            <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">Please respond to this inquiry within 48 hours</p>
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
      to: 'sales@ykp-eg.com',
      subject: `🤝 طلب شراكة استراتيجية جديد من ${inquiryData.companyName} - New Partnership Request`,
      html: factoryEmailContent,
      replyTo: inquiryData.email,
    });

    // Confirmation email to customer
    const customerEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background: linear-gradient(135deg, #D4AF37, #1E3A8A); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🤝 شكراً لاهتمامك بالشراكة</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Thank You for Your Partnership Interest</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #1E3A8A;">مرحباً ${inquiryData.contactName}</h2>
          
          <p style="line-height: 1.6; color: #333;">
            شكراً لك على اهتمامك بالشراكة الاستراتيجية مع الوسائد الفرعونية. لقد تم استلام طلبك وإرساله مباشرة إلى فريق الشراكات في المصنع.
          </p>
          
          <p style="line-height: 1.6; color: #333;">
            Thank you for your interest in strategic partnership with Pharaonic Pillows. We have received your request and forwarded it directly to our partnerships team at the factory.
          </p>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 4px solid #D4AF37; margin: 20px 0;">
            <h3 style="color: #1E3A8A; margin-top: 0;">الخطوات التالية / Next Steps:</h3>
            <ul style="color: #333; line-height: 1.6;">
              <li>سيقوم فريق الشراكات بمراجعة طلبك خلال 48 ساعة</li>
              <li>Our partnerships team will review your request within 48 hours</li>
              <li>ستحصل على رد مفصل مع إمكانيات التعاون</li>
              <li>You'll receive a detailed response with collaboration possibilities</li>
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
      subject: '🤝 تأكيد استلام طلب الشراكة - Partnership Request Confirmation',
      html: customerEmailContent,
    });

    res.status(200).json({ 
      success: true, 
      message: 'Partnership inquiry sent successfully' 
    });

  } catch (error) {
    console.error('Error sending partnership inquiry:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send partnership inquiry' 
    });
  }
}