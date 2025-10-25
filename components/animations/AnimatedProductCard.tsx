/**
 * Animated Product Card with Egyptian-themed animations
 * Features crystal effects, hover animations, and micro-interactions
 */

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { 
  PolygonHover, 
  InteractiveHover, 
  FloatingCard, 
  GoldenButton,
  CardEntrance 
} from './EgyptianAnimations';

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  price?: string;
  description: string;
  pharaonicSymbols?: string[];
}

interface AnimatedProductCardProps {
  product: Product;
  index?: number;
  className?: string;
}

export const AnimatedProductCard: React.FC<AnimatedProductCardProps> = ({ 
  product, 
  index = 0,
  className = "" 
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <CardEntrance
      className={`animated-product-card ${className}`}
      style={{ 
        animationDelay: `${index * 0.1}s` 
      }}
    >
      <FloatingCard className="product-card-container">
        <div className="product-image-section">
          <PolygonHover className="product-image-wrapper">
            <div className="product-image-container">
              <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ 
                  opacity: isImageLoaded ? 1 : 0, 
                  scale: isImageLoaded ? 1 : 1.1 
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="product-image"
                  onLoad={() => setIsImageLoaded(true)}
                  style={{
                    objectFit: 'cover',
                    borderRadius: '12px'
                  }}
                />
              </motion.div>
              
              {/* Egyptian-themed overlay */}
              <motion.div 
                className="product-image-overlay"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Pharaonic symbols indicator */}
              {product.pharaonicSymbols && product.pharaonicSymbols.length > 0 && (
                <motion.div 
                  className="pharaonic-symbols-badge"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <span className="symbols-count">
                    {product.pharaonicSymbols.length} رموز فرعونية
                  </span>
                </motion.div>
              )}
            </div>
          </PolygonHover>
        </div>

        <div className="product-content">
          <motion.h3 
            className="product-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {product.name}
          </motion.h3>

          <motion.p 
            className="product-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {product.description}
          </motion.p>

          <motion.div 
            className="product-category"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <span className="category-badge">{product.category}</span>
          </motion.div>

          {product.price && (
            <motion.div 
              className="product-price"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <span className="price-text">{product.price}</span>
            </motion.div>
          )}

          <motion.div 
            className="product-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link href={`/products/${product.id}`} passHref>
              <GoldenButton className="view-product-btn">
                عرض التفاصيل
              </GoldenButton>
            </Link>
            
            <InteractiveHover>
              <button className="quick-inquiry-btn">
                استفسار سريع
              </button>
            </InteractiveHover>
          </motion.div>
        </div>
      </FloatingCard>
    </CardEntrance>
  );
};

// Product grid with staggered animations
export const AnimatedProductGrid: React.FC<{
  products: Product[];
  className?: string;
}> = ({ products, className = "" }) => {
  return (
    <motion.div
      className={`animated-product-grid ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        staggerChildren: 0.1,
        delayChildren: 0.2
      }}
    >
      {products.map((product, index) => (
        <AnimatedProductCard
          key={product.id}
          product={product}
          index={index}
        />
      ))}
    </motion.div>
  );
};