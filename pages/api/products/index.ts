// Products API - Main endpoint for product queries
import type { NextApiRequest, NextApiResponse } from 'next';
import { productService } from '@/lib/product-service';
import type { ProductFilterOptions, ProductSortBy } from '@/types/product';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      q: query,
      collection,
      minPrice,
      maxPrice,
      symbols,
      firmness,
      inStock,
      featured,
      bestseller,
      sortBy = 'name',
      page = '1',
      limit = '20'
    } = req.query;

    // Parse filters
    const filters: ProductFilterOptions = {};
    
    if (collection) {
      filters.collection = Array.isArray(collection) ? collection as any : [collection as any];
    }
    
    if (minPrice || maxPrice) {
      filters.priceRange = {
        min: minPrice ? parseInt(minPrice as string) : 0,
        max: maxPrice ? parseInt(maxPrice as string) : 999
      };
    }
    
    if (symbols) {
      filters.symbols = Array.isArray(symbols) ? symbols as string[] : [symbols as string];
    }
    
    if (firmness) {
      filters.firmness = Array.isArray(firmness) ? firmness as any : [firmness as any];
    }
    
    if (inStock !== undefined) {
      filters.inStock = inStock === 'true';
    }
    
    if (featured !== undefined) {
      filters.featured = featured === 'true';
    }
    
    if (bestseller !== undefined) {
      filters.bestseller = bestseller === 'true';
    }

    // Execute search
    const result = productService.searchProducts(
      query as string,
      filters,
      sortBy as ProductSortBy,
      parseInt(page as string),
      parseInt(limit as string)
    );

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total: result.totalCount,
        pages: Math.ceil(result.totalCount / parseInt(limit as string))
      }
    });
  } catch (error) {
    console.error('Products API error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}