import React from 'react';
import type { Product } from '@/types/product';

interface ProductSchemaProps {
    product: Product;
    baseUrl?: string;
}

const ProductSchema: React.FC<ProductSchemaProps> = ({
    product,
    baseUrl = 'https://www.ykp-eg.com'
}) => {
    const schema = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        'name': product.name,
        'image': product.images?.map(img => img.url.startsWith('http') ? img.url : `${baseUrl}${img.url}`) || [`${baseUrl}/prodect/${product.collection}/${product.id.split('-').pop()}.webp`],
        'description': product.description,
        'brand': {
            '@type': 'Brand',
            'name': 'Pharaonic Pillows'
        },
        'offers': {
            '@type': 'AggregateOffer',
            'url': `${baseUrl}/products/${product.collection}/${product.id}`,
            'priceCurrency': 'USD',
            'lowPrice': product.pricing.retail.min,
            'highPrice': product.pricing.retail.max,
            'offerCount': '1',
            'availability': 'https://schema.org/InStock'
        },
        'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': '4.9',
            'reviewCount': '85'
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export default ProductSchema;
