import Image from "next/image";

import ParticlesContaniner from '../components/ParticlesContainer';
import ProjectsBtn from '../components/ProjectsBtn';
import Avatar from '../components/Avatar';

//framer motion
import {motion} from 'framer-motion';

//variants
import {fadeIn} from '../variants'

const Home = () => {
  return( 
  <div className="bg-promary/60 h-full">

    <div className="w-full h-full bg-gradient-to-r from-primary/8 via-black/15
                    to-black/10">
    {/* image */}
    <div className="w-[1200px]  h-full absolute right-0 bottum-0 ">
      {/* bg img mt-20*/}
        <div className="bg-none xl:bg-explosion mt-10  xl:bg-contain 
              xl:bg-right xl:bg-no-repeat w-full h-full absolute 
              mix-blend-color-dodge translate-z-0"
              >
        </div>
      {/* particles */}
      <ParticlesContaniner/>
       {/* avater img */}
       <motion.div className="w-full h-full max-w-[700px] max-h-[700px] absolute -bottom-32 origin-center
                      lg:bottom-0 lg:right-[10%] pt-32 animate-pulse"
                      variants={fadeIn('up',0.5)}
                      initial='hidden'
                      animate='show'
                      exit='hidden'
                      transition={{duration:1,ease:'easeInOut'}}>
        <Avatar/>
       </motion.div>
      </div>                
      <div className="text-center justify-center flex flex-col xl:pt-40 xl:text-left pt-14
                      h-full container mx-auto sm:pt-6">
        {/* title */}
        <motion.h1 
        variants={fadeIn('down',0.2)}
        initial='hidden'
        animate='show'
        exit='hidden'
         className="h1 italic font-mono">
          Company   <br/>  {' '} 
          <span className="text-[#ffb500] italic font-mono">New Cairo </span>
        </motion.h1>
        <motion.p 
          variants={fadeIn('down',0.3)}
          initial='hidden'
          animate='show'
          exit='hidden'
        className="max-w-sm lx:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16">
        Our pillow manufacturing company was established in 2023. We offer high-quality and extremely 
        comfortable pillows. We use the best materials in the production of our pillows,
        including natural fibers, and we strive to provide products that meet the needs of our customers. 
        You can check out our range of products on our
        </motion.p>
        {/* btn */}
        <div className="flex justify-center xl:hidden relative">
            <ProjectsBtn/>
        </div>
        <motion.div 
          variants={fadeIn('down',0.4)}
          initial='hidden'
          animate='show'
          exit='hidden'
          className='hidden xl:flex'
          >
            <ProjectsBtn/>
        </motion.div>
      </div>


    </div>
  </div>
  );
};

export default Home;
