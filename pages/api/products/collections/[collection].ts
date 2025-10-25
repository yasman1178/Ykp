// Collection Products API - Get products by collection
import type { NextApiRequest, NextApiResponse } from 'next';
import { productService } from '@/lib/product-service';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { collection } = req.query;
    
    if (!collection || typeof collection !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Collection ID is required'
      });
    }

    // Validate collection ID
    if (!['b123', 't', 'tb'].includes(collection)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid collection ID. Must be b123, t, or tb'
      });
    }

    const products = productService.getProductsByCollection(collection as 'b123' | 't' | 'tb');
    const collectionInfo = productService.getCollection(collection);
    
    if (!collectionInfo) {
      return res.status(404).json({
        success: false,
        error: 'Collection not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        collection: collectionInfo,
        products,
        totalCount: products.length
      }
    });
  } catch (error) {
    console.error('Collection API error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}