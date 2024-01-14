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
import {Pagination} from 'swiper';

//icon 
import {BsArrowBarRight} from 'react-icons/bs'
import Image from 'next/image';

const WorkSlider = () => {
  return <Swiper 
  spaceBetween={10}
  pagination={{
    clickable:true,
  }}
  modules={[Pagination]}
  className='w-full md:w-[75%] sm:w-[50%] min-w-full md:min-w-0'
  >
   {
    workSlides.slides.map((slide,index)=>{
      return (
        <SwiperSlide key={index}>
          <div className='grid grid-cols-2 grid-rows-2 gap-4 cursor-pointer'>
            {slide.images.map((image,index)=>{
               return (
                <div key={index} className='relative rounded-lg overflow-hidden flex 
                              items-center jusify-center group'>
                  <div className='flex items-center justify-center relative overflow-hidden group'>
                    {/* image */}
                    <Image src={image.path} width={500} height={300} alt=''/>
                    {/* overlay gradient */}
                    <div className='absolute inset-0 bg-gradient-to-l
                    from-transparent via-[#ffb500] to-[#ffb700] opacity-0
                    group-hover:opacity-80 transition-all duration-700'>
                    {/* titel */}
                    <div className='absolute bottom-0 translate-y-full
                    group-hover:-translate-y-10 group-hover:xl:-translate-y-20
                    transition-all duration-300'>
                      <div className='flex item-center gap-x-2 text-[13px] tracking-[0.2]'>
                        {/* title part 1 */}
                        <div className='delay-100' > Raly</div>
                        {/* title part 1 */}
                        <div className='translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-150'> Prodect</div>
                          {/* title part 1 */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
               );
            })}
          </div>
        </SwiperSlide>
      )
    })
   }
    </Swiper>;
};

export default WorkSlider;
