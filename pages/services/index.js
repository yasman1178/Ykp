//components 
import ServiceSlider from '../../components/ServiceSlider';
import Bulb from '../../components/Bulb';
import Circles from '../../components/Circles';

// fromer motion 
import {motion} from 'framer-motion'
import {fadeIn} from '../../variants'

const Services = () => {
  return (
    // Corrected item-center, adjusted padding py-20 default, py-36 on md+, used min-h-full
    <div className='min-h-full bg-primary/30 py-20 md:py-36 flex items-center'> 
      <Circles/>
      <div className='container mx-auto'>
        <div className='flex flex-col xl:flex-row gap-x-8'>
          {/* text */}
           {/* Corrected xl:w-[30vm] to xl:w-[30vw] assuming viewport width was intended */}
          <div className='text-center flex xl:w-[30vw] flex-col lg:text-left mb-4 xl:mb-0'>
            <motion.h2 variants={fadeIn('up',0.2)} initial="hidden"
            animate='show' exit='hidden'  className='h2 xl:mt-8'> Our services <span className='text-accent'>.</span></motion.h2>
            <motion.p variants={fadeIn('up',0.2)} initial="hidden"
            animate='show' exit='hidden' className='mb-4 max-w-[400px] mx-auto lg:mx-0'>
            All our products are characterized by emphasizing the Egyptian identity,
            which suits the taste of the tourist looking for high-quality products in 
            addition to distinctive gifts.
            </motion.p>
          </div>
          <div className='w-full xl:max-w-[65%]'>
            {/* Slider */}
            <ServiceSlider/>
          </div>
        </div>
      </div>
      <Bulb/>
    </div>
  );
};

export default Services;
