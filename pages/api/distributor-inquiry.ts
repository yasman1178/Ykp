import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface DistributorInquiry {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  experience: string;
  currentBrands: string;
  salesChannels: string;
  estimatedSales: string;
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
    const inquiryData: DistributorInquiry = req.body;

    // Validate required fields
    const requiredFields = ['companyName', 'contactName', 'email', 'phone', 'country', 'city', 'experience', 'message'];
    for (const field of requiredFields) {
      if (!inquiryData[field as keyof DistributorInquiry]) {
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
          <h1 style="color: white; margin: 0; font-size: 28px;">🚚 طلب انضمام لبرنامج الموزعين</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">New Distributor Program Application</p>
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
                <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold; background-color: #D4AF37; color: white;">المدينة / City</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">${inquiryData.city}</td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold; background-color: #D4AF37; color: white;">سنوات الخبرة / Experience</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">${inquiryData.experience}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold; background-color: #D4AF37; color: white;">المبيعات المتوقعة / Expected Sales</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">${inquiryData.estimatedSales || 'غير محدد / Not specified'}</td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold; background-color: #D4AF37; color: white;">العلامات التجارية الحالية / Current Brands</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">${inquiryData.currentBrands || 'غير محدد / Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold; background-color: #D4AF37; color: white;">قنوات التوزيع / Sales Channels</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">${inquiryData.salesChannels || 'غير محدد / Not specified'}</td>
              </tr>
            </table>
          </div>

          <h3 style="color: #1E3A8A; margin-top: 30px;">خطة التوزيع والتسويق / Distribution & Marketing Plan</h3>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 4px solid #D4AF37;">
            <p style="margin: 0; line-height: 1.6;">${inquiryData.message}</p>
          </div>

          <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #D4AF37, #1E3A8A); border-radius: 10px; text-align: center;">
            <p style="color: white; margin: 0; font-weight: bold;">يرجى الرد على هذا الطلب خلال 72 ساعة</p>
            <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">Please respond to this inquiry within 72 hours</p>
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
      subject: `🚚 طلب انضمام لبرنامج الموزعين من ${inquiryData.companyName} - New Distributor Application`,
      html: factoryEmailContent,
      replyTo: inquiryData.email,
    });

    // Confirmation email to customer
    const customerEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background: linear-gradient(135deg, #D4AF37, #1E3A8A); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🚚 شكراً لطلب الانضمام</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Thank You for Your Application</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #1E3A8A;">مرحباً ${inquiryData.contactName}</h2>
          
          <p style="line-height: 1.6; color: #333;">
            شكراً لك على اهتمامك بالانضمام لبرنامج الموزعين المعتمدين للوسائد الفرعونية. لقد تم استلام طلبك وإرساله مباشرة إلى فريق إدارة الموزعين في المصنع.
          </p>
          
          <p style="line-height: 1.6; color: #333;">
            Thank you for your interest in joining our authorized distributor program for Pharaonic Pillows. We have received your application and forwarded it directly to our distributor management team at the factory.
          </p>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 4px solid #D4AF37; margin: 20px 0;">
            <h3 style="color: #1E3A8A; margin-top: 0;">عملية التقييم / Evaluation Process:</h3>
            <ul style="color: #333; line-height: 1.6;">
              <li>سيقوم فريقنا بمراجعة طلبك خلال 72 ساعة</li>
              <li>Our team will review your application within 72 hours</li>
              <li>تقييم شامل لخبرتك وخطة التوزيع</li>
              <li>Comprehensive evaluation of your experience and distribution plan</li>
              <li>ستحصل على رد مفصل مع الخطوات التالية</li>
              <li>You'll receive a detailed response with next steps</li>
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
      subject: '🚚 تأكيد استلام طلب الانضمام لبرنامج الموزعين - Distributor Application Confirmation',
      html: customerEmailContent,
    });

    res.status(200).json({ 
      success: true, 
      message: 'Distributor inquiry sent successfully' 
    });

  } catch (error) {
    console.error('Error sending distributor inquiry:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send distributor inquiry' 
    });
  }
}