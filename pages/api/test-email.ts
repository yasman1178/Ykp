import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { getEmailConfig } from '../../lib/email-config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get email configuration
    let emailConfig;
    try {
      emailConfig = getEmailConfig();
    } catch (configError) {
      return res.status(500).json({ 
        message: 'Email configuration error: ' + (configError as Error).message,
        success: false
      });
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailConfig.gmailUser,
        pass: emailConfig.gmailAppPassword,
      },
    });

    // Verify transporter configuration
    await transporter.verify();

    res.status(200).json({ 
      message: 'Email configuration is valid and working',
      success: true,
      contactEmail: emailConfig.contactEmail
    });

  } catch (error) {
    console.error('Email test error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Email configuration test failed';
    if (error instanceof Error) {
      if (error.message.includes('Invalid login') || error.message.includes('EAUTH')) {
        errorMessage = 'Email authentication failed. Please check your Gmail credentials and ensure you are using an App Password, not your regular password. See docs/email-setup.md for detailed instructions.';
      } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
        errorMessage = 'Could not connect to email server. Please check your network connection.';
      } else {
        errorMessage = error.message;
      }
    }
    
    res.status(500).json({ 
      message: errorMessage,
      success: false,
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error'
    });
  }
}