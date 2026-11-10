// Wholesale Quote API - Handles both direct quotes and formal B2B inquiries
import type { NextApiRequest, NextApiResponse } from 'next';
import { productService } from '@/lib/product-service';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};

    // 1. Check if this is the comprehensive wholesale inquiry from /wholesale form
    if (body.companyName && (body.email || body.phone)) {
      const quoteId = `YKP-WS-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

      const inquiryRecord = {
        quoteId,
        companyName: body.companyName,
        contactName: body.contactName || '',
        email: body.email,
        phone: body.phone,
        country: body.country || 'Egypt',
        businessType: body.businessType || 'General Wholesale',
        product: body.product || 'Pharaonic Travel Pillows',
        quantity: Number(body.quantity) || 200,
        unitPrice: body.unitPrice || 12,
        totalEstimate: body.totalEstimate || 2400,
        branding: body.branding || 'Standard',
        deliveryDestination: body.deliveryDestination || 'Egypt',
        deliveryTerm: body.deliveryTerm || (body.deliveryDestination === 'egypt' ? 'Free Doorstep Delivery in Egypt' : 'FOB Cairo / Alexandria'),
        notes: body.customNotes || '',
        createdAt: new Date().toISOString(),
        validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString() // 15 days validity
      };

      // Log for sales fulfillment
      console.log('✅ [YKP B2B Inquiry Received]:', inquiryRecord);

      return res.status(200).json({
        success: true,
        message: 'Inquiry received successfully. Our sales team at sales@ykp-eg.com will prepare your written pro-forma.',
        data: inquiryRecord
      });
    }

    // 2. Legacy / Direct Product Quote handling
    const { productId, quantity, customerInfo } = body;
    
    if (productId && quantity) {
      const product = productService.getProductById(productId);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'Product not found'
        });
      }

      const pricing = productService.calculateWholesalePrice(productId, Number(quantity));
      const quoteId = `YKP-DIR-${Date.now()}`;

      return res.status(200).json({
        success: true,
        data: {
          quoteId,
          product: {
            id: product.id,
            name: product.name,
            sku: product.sku
          },
          quantity,
          pricing,
          customerInfo,
          createdAt: new Date().toISOString()
        }
      });
    }

    return res.status(400).json({
      success: false,
      error: 'Invalid request payload. Company name and contact details or product ID and quantity are required.'
    });

  } catch (error) {
    console.error('Wholesale quote API error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}