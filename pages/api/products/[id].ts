// Single Product API - Get product by ID with related products
import type { NextApiRequest, NextApiResponse } from 'next';
import { productService } from '@/lib/product-service';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    
    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Product ID is required'
      });
    }

    const product = productService.getProductById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    // Get related products
    const relatedProducts = productService.getRelatedProducts(id, 4);
    
    // Get collection info
    const collection = productService.getCollection(product.collection);

    res.status(200).json({
      success: true,
      data: {
        product,
        relatedProducts,
        collection
      }
    });
  } catch (error) {
    console.error('Product API error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}