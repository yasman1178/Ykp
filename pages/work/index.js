//components 
import WorkSlider from '../../components/WorkSlider';
import Bulb from '../../components/Bulb';
import Circles from '../../components/Circles';

// fromer motion 
import {motion} from 'framer-motion'
import {fadeIn} from '../../variants'

const Work = () => {
  return (
    // Corrected item-center, adjusted padding py-20 default, py-36 on md+, used min-h-full
    <div className='min-h-full bg-primary/30 py-20 md:py-36 flex items-center'> 
      <Circles/>
      <div className='container mx-auto'>
        <div className='flex flex-col xl:flex-row gap-x-8'>
          {/* text */}
          {/* Corrected xl:w-[30vm] to xl:w-[30vw] assuming viewport width was intended */}
          <div className='text-center flex xl:w-[30vw] flex-col lg:text-left mb-2 xl:mb-0'>
            {/* Re-Ensuring typo "Prodect" is "Product" */}
            <motion.h2 variants={fadeIn('up',0.2)} initial="hidden"
            animate='show' exit='hidden'  className='h2 xl:mt-6'> My Product <span className='text-accent'>.</span></motion.h2>
            <motion.p variants={fadeIn('up',0.2)} initial="hidden"
            animate='show' exit='hidden' className='mb-4 max-w-[400px] mx-auto lg:mx-0'>
            Some of our products are produced with the highest quality in 
            terms of memory foam material or type of fabric, in addition 
            to packing materials that preserve the luster of the product.
            </motion.p>
          </div>
          <div className='w-full xl:max-w-[75%]'>
            {/* Slider */}
            <WorkSlider/>
          </div>
        </div>
      </div>
      <Bulb/>
    </div>
  );
};

export default Work;
