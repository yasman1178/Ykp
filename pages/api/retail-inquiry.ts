import type { NextApiRequest, NextApiResponse } from 'next';

interface RetailInquiryPayload {
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  country?: string;
  selectedProduct: string;
  quantity: number;
  notes?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { customerName, phone, email, address, city, country, selectedProduct, quantity, notes }: RetailInquiryPayload = req.body;

    if (!customerName || !phone || !address || !selectedProduct) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: customerName, phone, address, and selectedProduct are required.'
      });
    }

    // In a real production deployment, this can log to Firestore or send email via nodemailer
    console.log('[Retail Order Received]:', {
      timestamp: new Date().toISOString(),
      customerName,
      phone,
      email,
      address,
      city,
      country: country || 'Egypt',
      selectedProduct,
      quantity: quantity || 1,
      notes
    });

    return res.status(200).json({
      success: true,
      message: 'Retail order inquiry submitted successfully. Our team will contact you promptly to confirm dispatch.',
      orderId: `RET-${Date.now().toString().slice(-6)}`
    });
  } catch (error: any) {
    console.error('Retail inquiry error:', error);
    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error processing retail inquiry'
    });
  }
}
