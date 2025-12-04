import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Link from 'next/link';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import { getFeaturedProducts } from '@/data/products';
import { Product } from '@/types/product';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; // Assuming navigation might be desired later

const WorkSlider: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  const [open, setOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Map collection codes to URL-friendly names
  const getCollectionPath = (collection: string): string => {
    const collectionMap: Record<string, string> = {
      'b123': 'premium',
      't': 'classic',
      'tb': 'heritage',
      'print': 'print'
    };
    return collectionMap[collection] || collection;
  };

  const lightboxSlides = featuredProducts.map(product => ({
    src: product.images[0]?.url || `/prodect/${product.collection}/${product.id.split('-').pop()}.webp`,
    alt: product.name,
    title: product.name,
  }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setOpen(true);
  };

  return (
    <>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        pagination={{ clickable: true }}

        className="h-[400px] md:h-[500px] lg:h-[550px] xl:h-[600px] w-full max-w-7xl mx-auto"
      >
        {featuredProducts.map((product: Product, index: number) => (
          <SwiperSlide key={product.id}>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer h-full flex flex-col">
              <div
                className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-gradient-to-br from-amber-50 to-blue-50 flex items-center justify-center overflow-hidden"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={product.images[0]?.url || `/prodect/${product.collection}/${product.id.split('-').pop()}.webp`}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-lg font-semibold">View Details</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-amber-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-700 text-sm mb-4 flex-grow line-clamp-3">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-amber-600 font-bold text-lg">
                    ${product.pricing.retail.min} - ${product.pricing.retail.max}
                  </span>
                  <Link href={`/products/${getCollectionPath(product.collection)}/${product.id}`} passHref>
                    <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full text-sm font-semibold hover:from-amber-600 hover:to-amber-700 transition-all">
                      Explore
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={lightboxSlides}
        index={lightboxIndex}
      />
    </>
  );
};

export default WorkSlider;
