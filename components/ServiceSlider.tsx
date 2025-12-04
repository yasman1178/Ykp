import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { RxCrop, RxDesktop, RxRocket, RxArrowTopLeft } from "react-icons/rx"; // Import icons

import 'swiper/css';
import 'swiper/css/pagination';

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ServiceSliderProps {
  features: {
    authentic: { title: string; description: string };
    comfort: { title: string; description: string };
    global: { title: string; description: string };
  };
}

const ServiceSlider: React.FC<ServiceSliderProps> = ({ features }) => {
  const serviceData: ServiceItem[] = [
    {
      icon: <RxRocket />, // Changed icon for Authentic Heritage
      title: features.authentic.title,
      description: features.authentic.description,
    },
    {
      icon: <RxCrop />, // Changed icon for Superior Comfort
      title: features.comfort.title,
      description: features.comfort.description,
    },
    {
      icon: <RxDesktop />, // Changed icon for Global Distribution
      title: features.global.title,
      description: features.global.description,
    },
  ];

  return (
    <Swiper
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 15
        },
        640: {
          slidesPerView: 2, // Show 2 slides on larger screens
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3, // Show 3 slides on even larger screens
          spaceBetween: 30
        }
      }}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      className='h-[300px] sm:h-[380px] md:h-[400px] lg:h-[420px] xl:h-[450px] max-w-7xl mx-auto'
    >
      {serviceData.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <div className='bg-white h-full rounded-lg px-6 py-8 flex flex-col justify-center items-center gap-x-6 sm:gap-x-0 group cursor-pointer hover:bg-amber-50 transition-all duration-300 shadow-lg border border-gray-100'>
              {/* icon */}
              <div className='text-4xl text-amber-600 mb-4'>{item.icon}</div>
              {/* title & desc */}
              <div className='text-center'>
                <div className='mb-2 text-xl font-bold text-blue-900'>{item.title}</div>
                <p className='max-w-[350px] leading-normal text-gray-700'>{item.description}</p>
              </div>
              {/* arrow */}
              <div className='text-3xl mt-4'>
                <RxArrowTopLeft className='group-hover:rotate-45 group-hover:text-blue-600 transition-all duration-300' />
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ServiceSlider;
