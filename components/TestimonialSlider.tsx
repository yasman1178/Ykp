import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { TESTIMONIALS } from '@/data/testimonials';

import 'swiper/css';
import 'swiper/css/pagination';

const TestimonialSlider: React.FC = () => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}

      className="h-[400px] sm:h-[350px] md:h-[300px] lg:h-[280px] xl:h-[250px] w-full max-w-4xl"
    >
      {TESTIMONIALS.map((testimonial) => (
        <SwiperSlide key={testimonial.id}>
          <div className="flex flex-col items-center gap-6 p-8 bg-gradient-to-br from-amber-50 to-blue-50 rounded-3xl shadow-lg h-full">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-20 h-20 relative rounded-full overflow-hidden border-2 border-amber-500">
                <Image
                  src={testimonial.imageUrl || '/public/avatar.png'} // Fallback image
                  alt={testimonial.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="text-center md:text-left">
                <div className="font-bold text-lg text-blue-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.location}</div>
                <div className="flex justify-center md:justify-start mt-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating ? 'text-amber-500' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-center flex-grow">
              &ldquo;{testimonial.review}&rdquo;
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialSlider;
