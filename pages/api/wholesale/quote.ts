// Wholesale Quote API - Calculate wholesale pricing
import type { NextApiRequest, NextApiResponse } from 'next';
import { productService } from '@/lib/product-service';

interface QuoteRequest {
  productId: string;
  quantity: number;
  customerInfo?: {
    companyName: string;
    contactName: string;
    email: string;
    country: string;
  };
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { productId, quantity, customerInfo }: QuoteRequest = req.body;
    
    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        error: 'Product ID and quantity are required'
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        error: 'Quantity must be at least 1'
      });
    }

    const product = productService.getProductById(productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    // Check minimum order quantity
    if (quantity < product.wholesaleInfo.minimumOrderQuantity) {
      return res.status(400).json({
        success: false,
        error: `Minimum order quantity is ${product.wholesaleInfo.minimumOrderQuantity} units`
      });
    }

    const pricing = productService.calculateWholesalePrice(productId, quantity);
    
    if (!pricing) {
      return res.status(500).json({
        success: false,
        error: 'Unable to calculate pricing'
      });
    }

    // Calculate shipping estimate (simplified)
    const shippingEstimate = quantity > 100 ? 0 : Math.min(quantity * 2, 50);
    const totalWithShipping = pricing.totalPrice + shippingEstimate;

    // Generate quote ID
    const quoteId = `PH-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const quote = {
      quoteId,
      product: {
        id: product.id,
        name: product.name,
        collection: product.collection,
        sku: product.sku
      },
      quantity,
      pricing: {
        retailPrice: product.pricing.retail.min,
        wholesaleUnitPrice: pricing.unitPrice,
        subtotal: pricing.totalPrice,
        discount: pricing.discount,
        savings: pricing.savings,
        tier: pricing.tier,
        shipping: shippingEstimate,
        total: totalWithShipping,
        currency: 'USD'
      },
      terms: {
        leadTime: product.wholesaleInfo.leadTime.standard,
        paymentTerms: product.wholesaleInfo.paymentTerms.standard,
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
      },
      customerInfo,
      createdAt: new Date().toISOString()
    };

    // In a real application, you would save this quote to a database
    // and potentially send an email to the customer

    res.status(200).json({
      success: true,
      data: quote
    });
  } catch (error) {
    console.error('Wholesale quote API error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}