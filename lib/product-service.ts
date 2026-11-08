// Product Service - Business logic for product operations
// Handles product queries, filtering, search, and wholesale calculations

import { GENERATED_PRODUCTS, PRODUCT_COLLECTIONS } from './product-generator';
import { ALL_PRODUCTS, COLLECTION_SUMMARIES } from '@/data/products';
import type { 
  Product, 
  ProductCollection, 
  ProductFilterOptions, 
  ProductSearchResult, 
  ProductSortBy 
} from '@/types/product';

export class ProductService {
  private products: Product[] = ALL_PRODUCTS;
  private collections: Record<string, any> = { ...PRODUCT_COLLECTIONS, ...COLLECTION_SUMMARIES };

  // Get all products
  getAllProducts(): Product[] {
    return this.products;
  }

  // Get products by collection
  getProductsByCollection(collectionId: string): Product[] {
    const map: Record<string, string> = {
      royal: 'b123',
      sacred: 't',
      heritage: 'tb',
      custom: 'print',
      'heritage-souvenirs': 'souvenirs'
    };
    const key = map[collectionId.toLowerCase()] || collectionId.toLowerCase();
    return this.products.filter(product => product.collection === key);
  }

  // Get single product by ID
  getProductById(id: string): Product | null {
    return this.products.find(product => product.id === id) || null;
  }

  // Get collection information
  getCollection(collectionId: string): ProductCollection | null {
    const map: Record<string, string> = {
      royal: 'b123',
      sacred: 't',
      heritage: 'tb',
      custom: 'print',
      'heritage-souvenirs': 'souvenirs'
    };
    const key = map[collectionId.toLowerCase()] || collectionId.toLowerCase();
    return this.collections[key] || null;
  }

  // Get all collections
  getAllCollections(): ProductCollection[] {
    return Object.values(this.collections);
  }

  // Search products with filters and sorting
  searchProducts(
    query?: string,
    filters?: ProductFilterOptions,
    sortBy: ProductSortBy = 'name',
    page: number = 1,
    limit: number = 20
  ): ProductSearchResult {
    let filteredProducts = [...this.products];

    // Apply text search
    if (query && query.trim()) {
      const searchTerm = query.toLowerCase().trim();
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm)) ||
        (product.seo?.primaryKeywords?.english || []).some((keyword: string) => 
          keyword.toLowerCase().includes(searchTerm)
        ) ||
        (product.seo?.primaryKeywords?.arabic || []).some((keyword: string) => 
          keyword.includes(searchTerm)
        )
      );
    }

    // Apply filters
    if (filters) {
      if (filters.collection && filters.collection.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
          filters.collection!.includes(product.collection)
        );
      }

      if (filters.priceRange) {
        filteredProducts = filteredProducts.filter(product =>
          product.pricing.retail.min >= filters.priceRange!.min &&
          product.pricing.retail.max <= filters.priceRange!.max
        );
      }

      if (filters.symbols && filters.symbols.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
          filters.symbols!.some(symbol =>
            (product.pharaonicDesign?.primarySymbols || []).some((s: any) => 
              (s?.name || '').toLowerCase().includes(symbol.toLowerCase())
            ) ||
            (product.pharaonicDesign?.secondarySymbols || []).some((s: any) =>
              String(s).toLowerCase().includes(symbol.toLowerCase())
            )
          )
        );
      }

      if (filters.firmness && filters.firmness.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
          filters.firmness!.includes(product.specifications.firmness)
        );
      }

      if (filters.inStock !== undefined) {
        filteredProducts = filteredProducts.filter(product =>
          product.availability.inStock === filters.inStock
        );
      }

      if (filters.featured !== undefined) {
        filteredProducts = filteredProducts.filter(product =>
          product.featured === filters.featured
        );
      }

      if (filters.bestseller !== undefined) {
        filteredProducts = filteredProducts.filter(product =>
          product.bestseller === filters.bestseller
        );
      }
    }

    // Apply sorting
    filteredProducts.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low-high':
          return a.pricing.retail.min - b.pricing.retail.min;
        case 'price-high-low':
          return b.pricing.retail.max - a.pricing.retail.max;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'bestseller':
          return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0);
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default:
          return 0;
      }
    });

    // Calculate pagination
    const totalCount = filteredProducts.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // Generate facets for filtering UI
    const facets = this.generateFacets(this.products);

    return {
      products: paginatedProducts,
      totalCount,
      facets
    };
  }

  // Get featured products
  getFeaturedProducts(limit: number = 8): Product[] {
    return this.products
      .filter(product => product.featured)
      .slice(0, limit);
  }

  // Get bestselling products
  getBestsellingProducts(limit: number = 8): Product[] {
    return this.products
      .filter(product => product.bestseller)
      .slice(0, limit);
  }

  // Get new arrivals
  getNewArrivals(limit: number = 8): Product[] {
    return this.products
      .filter(product => product.newArrival)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  // Get related products
  getRelatedProducts(productId: string, limit: number = 4): Product[] {
    const product = this.getProductById(productId);
    if (!product) return [];

    // Get products from same collection first
    let related = this.products
      .filter(p => p.id !== productId && p.collection === product.collection)
      .slice(0, limit);

    // If we need more, add products with similar symbols
    if (related.length < limit) {
      const productSymbols = product.pharaonicDesign.primarySymbols.map(s => s.name.toLowerCase());
      const similarProducts = this.products
        .filter(p => 
          p.id !== productId && 
          p.collection !== product.collection &&
          p.pharaonicDesign.primarySymbols.some(s => 
            productSymbols.includes(s.name.toLowerCase())
          )
        )
        .slice(0, limit - related.length);
      
      related = [...related, ...similarProducts];
    }

    // If still need more, add random products from other collections
    if (related.length < limit) {
      const remaining = this.products
        .filter(p => p.id !== productId && !related.some(r => r.id === p.id))
        .slice(0, limit - related.length);
      
      related = [...related, ...remaining];
    }

    return related;
  }

  // Calculate wholesale pricing
  calculateWholesalePrice(productId: string, quantity: number): {
    unitPrice: number;
    totalPrice: number;
    discount: number;
    savings: number;
    tier: string;
  } | null {
    const product = this.getProductById(productId);
    if (!product) return null;

    const retailPrice = product.pricing.retail.min;
    let bestTier = product.pricing.wholesale[0];
    
    // Find the best applicable tier
    for (const tier of product.pricing.wholesale) {
      if (quantity >= tier.minQuantity && 
          (!tier.maxQuantity || quantity <= tier.maxQuantity)) {
        bestTier = tier;
      }
    }

    const unitPrice = bestTier.unitPrice;
    const totalPrice = unitPrice * quantity;
    const discount = bestTier.discount;
    const savings = (retailPrice - unitPrice) * quantity;
    const tierName = `${bestTier.minQuantity}${bestTier.maxQuantity ? `-${bestTier.maxQuantity}` : '+'} units`;

    return {
      unitPrice,
      totalPrice,
      discount,
      savings,
      tier: tierName
    };
  }

  // Generate search facets
  private generateFacets(products: Product[]) {
    const collections = new Map<string, number>();
    const priceRanges = new Map<string, number>();
    const symbols = new Map<string, number>();
    const firmness = new Map<string, number>();

    products.forEach(product => {
      // Collection facets
      const collectionName = this.collections[product.collection]?.name || product.collection;
      collections.set(product.collection, (collections.get(product.collection) || 0) + 1);

      // Price range facets
      const price = product.pricing.retail.min;
      let priceRange = '';
      if (price < 30) priceRange = '0-30';
      else if (price < 50) priceRange = '30-50';
      else if (price < 70) priceRange = '50-70';
      else priceRange = '70+';
      priceRanges.set(priceRange, (priceRanges.get(priceRange) || 0) + 1);

      // Symbol facets
      product.pharaonicDesign.primarySymbols.forEach(symbol => {
        symbols.set(symbol.name, (symbols.get(symbol.name) || 0) + 1);
      });

      // Firmness facets
      firmness.set(product.specifications.firmness, (firmness.get(product.specifications.firmness) || 0) + 1);
    });

    return {
      collections: Array.from(collections.entries()).map(([id, count]) => ({
        id,
        name: this.collections[id]?.name || id,
        count
      })),
      priceRanges: Array.from(priceRanges.entries()).map(([range, count]) => {
        const [min, max] = range.split('-').map(p => p === '+' ? 999 : parseInt(p));
        return { min, max: max || 999, count };
      }),
      symbols: Array.from(symbols.entries()).map(([name, count]) => ({ name, count })),
      firmness: Array.from(firmness.entries()).map(([level, count]) => ({ level, count }))
    };
  }

  // Get product statistics
  getProductStats() {
    const total = this.products.length;
    const byCollection = {
      b123: this.products.filter(p => p.collection === 'b123').length,
      t: this.products.filter(p => p.collection === 't').length,
      tb: this.products.filter(p => p.collection === 'tb').length
    };
    const featured = this.products.filter(p => p.featured).length;
    const bestsellers = this.products.filter(p => p.bestseller).length;
    const inStock = this.products.filter(p => p.availability.inStock).length;

    const priceRange = {
      min: Math.min(...this.products.map(p => p.pricing.retail.min)),
      max: Math.max(...this.products.map(p => p.pricing.retail.max))
    };

    return {
      total,
      byCollection,
      featured,
      bestsellers,
      inStock,
      priceRange
    };
  }
}

// Create singleton instance
export const productService = new ProductService();

// Export convenience functions
export const getAllProducts = () => productService.getAllProducts();
export const getProductsByCollection = (collection: 'b123' | 't' | 'tb') => 
  productService.getProductsByCollection(collection);
export const getProductById = (id: string) => productService.getProductById(id);
export const searchProducts = (
  query?: string,
  filters?: ProductFilterOptions,
  sortBy?: ProductSortBy,
  page?: number,
  limit?: number
) => productService.searchProducts(query, filters, sortBy, page, limit);
export const getFeaturedProducts = (limit?: number) => productService.getFeaturedProducts(limit);
export const getRelatedProducts = (productId: string, limit?: number) => 
  productService.getRelatedProducts(productId, limit);
export const calculateWholesalePrice = (productId: string, quantity: number) =>
  productService.calculateWholesalePrice(productId, quantity);

export default productService;