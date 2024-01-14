// testimonial data
const testimonialData = [
  {
    image: '/t-avt-1.png',
    name: 'Anne Smith',
    position: 'Customer',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum expedita odit beatae, cupiditate saepe quam officia aut placeat quas neque!',
  },
  {
    image: '/t-avt-2.png',
    name: 'Jane Doe',
    position: 'Customer',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum expedita odit beatae, cupiditate saepe quam officia aut placeat quas neque!',
  },
  {
    image: '/t-avt-3.png',
    name: 'Jhon Doe',
    position: 'Customer',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum expedita odit beatae, cupiditate saepe quam officia aut placeat quas neque!',
  },
];

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

const TestimonialSlider = () => {
  return <Swiper 
  spaceBetween={10}
  pagination={{
    clickable:true,
  }}
  modules={[Pagination]}
  className='w-full md:w-[75%] sm:w-[50%] min-w-full md:min-w-0'
  >
   {
    testimonialData.map((person,index)=>{
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

export default TestimonialSlider;
