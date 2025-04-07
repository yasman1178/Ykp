// data
const workSlides = {
  slides: [
    {
      images: [
        {
          title: 'title',
          path: '/t1.jpg',
        },
        {
          title: 'title',
          path: '/t2.jpg',
        },
        {
          title: 'title',
          path: '/t3.jpg',
        },
        {
          title: 'title',
          path: '/t4.jpg',
        },
      ],
    },
    {
      images: [
        {
          title: 'title',
          path: '/t5.jpg',
        },
        {
          title: 'title',
          path: '/t6.jpg',
        },
        {
          title: 'title',
          path: '/t7.jpg',
        },
        {
          title: 'title',
          path: '/t8.jpg',
        },
      ],
    },
    {
      images: [
        {
          title: 'title',
          path: '/t33.jpg',
        },
        {
          title: 'title',
          path: '/t10.jpg',
        },
        {
          title: 'title',
          path: '/t11.jpg',
        },
        {
          title: 'title',
          path: '/t12.jpg',
        },
      ],
    },
    {
      images: [
        {
          title: 'title',
          path: '/t13.jpg',
        },
        {
          title: 'title',
          path: '/t14.jpg',
        },
        {
          title: 'title',
          path: '/t15.jpg',
        },
        {
          title: 'title',
          path: '/t16.jpg',
        },
      ],
    },
    {
      images: [
        {
          title: 'title',
          path: '/t17.jpg',
        },
        {
          title: 'title',
          path: '/t18.jpg',
        },
        {
          title: 'title',
          path: '/t19.jpg',
        },
        {
          title: 'title',
          path: '/t20.jpg',
        },
      ],
    },
    {
      images: [
        {
          title: 'title',
          path: '/t21.jpg',
        },
        {
          title: 'title',
          path: '/t22.jpg',
        },
        {
          title: 'title',
          path: '/t23.jpg',
        },
        {
          title: 'title',
          path: '/t24.jpg',
        },
      ],
    },
    {
      images: [
        {
          title: 'title',
          path: '/t25.jpg',
        },
        {
          title: 'title',
          path: '/t26.jpg',
        },
        {
          title: 'title',
          path: '/t27.jpg',
        },
        {
          title: 'title',
          path: '/t28.jpg',
        },
      ],
    },
    {
      images: [
        {
          title: 'title',
          path: '/t29.jpg',
        },
        {
          title: 'title',
          path: '/t30.jpg',
        },
        {
          title: 'title',
          path: '/t31.jpg',
        },
        {
          title: 'title',
          path: '/t32.jpg',
        },
      ],
    },
  ],
};

// import swiper react components
import {Swiper,SwiperSlide} from 'swiper/react'

// import swiper styles 
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

//import required modles
//import required modles
import { Pagination } from 'swiper'; // Reverted import path for older Swiper versions
import { useState } from 'react';

// Lightbox
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";


//icon 
import {BsArrowRight} from 'react-icons/bs' // Corrected icon name
import Image from 'next/image';

// Flatten images for lightbox
const allImagesFlat = workSlides.slides.flatMap(slide => slide.images);
const lightboxSlides = allImagesFlat.map(image => ({ src: image.path }));

const WorkSlider = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openLightbox = (slideIndex, imageIndex) => {
    // Calculate the flat index based on slide and image index within the slide
    const flatIndex = slideIndex * 4 + imageIndex; // Assuming 4 images per slide grid
    setIndex(flatIndex);
    setOpen(true);
  };


  return (
  <> {/* Added Fragment wrapper */}
    <Swiper 
      spaceBetween={10}
  pagination={{
    clickable:true,
  }}
  modules={[Pagination]}
  // Removed responsive width classes, let container handle sizing
  className='h-[340px] sm:h-[480px]' // Added height for swiper container
  >
   {
    workSlides.slides.map((slide, slideIndex)=>{ // Use slideIndex to avoid conflict
      return (
        <SwiperSlide key={slideIndex}>
          <div className='grid grid-cols-2 grid-rows-2 gap-4 cursor-pointer h-full'>
            {slide.images.map((image, imageIndex)=>{ // Use imageIndex
               const uniqueKey = `${slideIndex}-${imageIndex}`;
               return (
                 // Added onClick to open lightbox
                <div key={uniqueKey} 
                     className='relative rounded-lg overflow-hidden flex items-center justify-center group' // Corrected jusify-center
                     onClick={() => openLightbox(slideIndex, imageIndex)}
                     >
                  <div className='flex items-center justify-center relative overflow-hidden group w-full h-full'>
                    {/* image - Reduced size to ~75% */}
                    <Image src={image.path} width={375} height={225} alt={image.title || 'Product Image'} className="block object-cover w-full h-full"/>
                    {/* overlay gradient */}
                    <div className='absolute inset-0 bg-gradient-to-l
                    from-transparent via-[#ffb500] to-[#ffb700] opacity-0
                    group-hover:opacity-80 transition-all duration-700'>
                    {/* titel */}
                    <div className='absolute bottom-0 translate-y-full
                    group-hover:-translate-y-10 group-hover:xl:-translate-y-20
                    transition-all duration-300 px-2 py-1'> {/* Added padding */}
                      {/* Corrected item-center */}
                      <div className='flex items-center gap-x-2 text-[13px] tracking-[0.2]'>
                        {/* title part 1 - Assuming 'Really' was intended? */}
                        <div className='delay-100' > Really</div> 
                        {/* title part 2 - Corrected 'Prodect' */}
                        <div className='translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-150'> Product</div>
                         {/* icon */}
                         <div className='text-xl translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-200'><BsArrowRight/></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
               );
            })}
          </div>
        </SwiperSlide>
      );
    })
   }
    </Swiper>

    <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={lightboxSlides}
        index={index}
      />
  </> // Correct closing fragment
  ); // Correct closing parenthesis and semicolon
};

export default WorkSlider;
