 
import { useState } from "react";
import { GiPillow,GiLoincloth,GiArtificialIntelligence  } from "react-icons/gi";
import { FaMattressPillow } from "react-icons/fa6";
import { SiYourtraveldottv } from "react-icons/si";



// icons
import {

  FaCut ,
  FaCottonBureau ,
} from "react-icons/fa";


//  data
const aboutData = [
  {
    title: 'Company',
    info: [
      {
        title: 'New Cairo Company is an Egyptian startup company',
        icons: [
          // eslint-disable-next-line react/jsx-key
          <GiPillow />,
                   // eslint-disable-next-line react/jsx-key
          <FaMattressPillow />,
                    // eslint-disable-next-line react/jsx-key
          <GiLoincloth  />,
        ],
      },
      {
        title: 'Design',
        // eslint-disable-next-line react/jsx-key
        icons: [<GiArtificialIntelligence  />, <FaCottonBureau  />, <FaCut  />],
      },
    ],
  },
  {
    title: 'activity',
    info: [
      {
        title: 'Design and development of travel products',
        icons: [
                    // eslint-disable-next-line react/jsx-key
          <SiYourtraveldottv />,
        ],
      },
      {
        title: 'Manufacturing high quality travel pillows',
        icons: [
                    // eslint-disable-next-line react/jsx-key
          <FaMattressPillow />,
        ],
       
      },
    ],
  },
  {
    title: 'Products',
    info: [
      {
        title: 'Memory foam travel pillows are not printed',
        stage: '7 - 23 Products',
      },
      {
        title: 'Memory foam travel pillows in different shapes',
        stage: '10 - 31 Products',
      },
      {
        title: 'Memory foam travel pillows with hieroglyphic coding',
        stage: '8 - 22 Products',
      },
    ],
  },
  {
    title: 'credentials',
    info: [
      {
        title: 'The company is officially licensed and registered in the Arab Republic of Egypt',
        stage: '2023',
      },
      
    ],
  },
];

//component
import Avatar from "../../components/Avatar";
import Circles from "../../components/Circles";
//frame motion
import {motion} from 'framer-motion';
import {fadeIn} from '../../variants';

import CountUp from "react-countup";

const About = () => {
  const [index,setIndex] = useState(0);
  console.log(index);
  return (
  <div className='h-full bg-primary/30 py-36  right-0 text-center xl:text-left'>
    <Circles/>
    {/* avater img */}
    <motion.div 
    variants={fadeIn('right',0.2)}
    initial='hidden'
    animate='show'
    exit='hidden'
    className='hidden xl:flex absolute bottum-0 -left-[370px]'
    >

      <Avatar/>
    </motion.div>
      <div className='container mx-auto h-full  flex flex-col item-center xl:flex-row
                      gap-x-6'>
        {/* text */}

        <div className="flex-1 flex flex-col jusify-center">
          <motion.h2 
          variants={fadeIn('right',0.2)}
          initial='hidden'
          animate='show'
          exit='hidden' 
          className="h2">Our vision is to work to provide a  high-quality <span className="text-accent">Egyptian</span> product</motion.h2>
           <motion.p 
           variants={fadeIn('right',0.4)}
           initial='hidden'
           animate='show'
           exit='hidden' 
           className="max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0">that contributes to spreading the Egyptian identity of Egypt’s Pharaonic history well </motion.p>   
          {/* counters */}
          <div className=" md:flex md:max-w-xl xl:max-w-none max-auto xl:mx-0 mb-8">
            <div className="flex flex-1 xl:gap-x-6">
              {/* experience */}
              <div className="relative flex-1 after:w-[1px] after:h-full 
              after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={5} and={2} duration={2} />+
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">Years of experience</div>
              </div>
              {/* client */}
              <div className="relative flex-1 after:w-[1px] after:h-full 
              after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={4} and={27} duration={3} />+
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">client</div>
              </div>
               {/* Prodect */}
               <div className="relative flex-1 after:w-[1px] after:h-full 
              after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={3} and={27} duration={2} />+
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">Prodect</div>
              </div>
            </div>
          </div>
          </div>
           {/* info */}
        <div className="flex flex-col w-full xl:max-w-[48%] h-[480px]">
          <div className='flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4'>
            {aboutData.map((item,itemIndex)=>{
              return(
                    <div
                    key={itemIndex}
                    className={"${index === itemIndex && 'text-accent after after:w-[100%] after:bg-accent after:transition-all after:duration-300'}  cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-[2px] after:bg-white after:absolute after:bottom-1 after:left-0"} 
                    onClick={() => setIndex(itemIndex)}
                    >
                      {item.title}
                    </div>
              );
            })}

          </div>
          <div className="py-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-6
          item-center xl:items-start">
            {aboutData[index].info.map((item, itemIndex)=>{
              return(
                  <div key={itemIndex} className="flex-1 flex flex-col md:flex-row max-w-max gap-x-2
                  items-center text-white/60">
                    {/* title */}
                    <div className="font-light mb-2 md:mb-0">{item.title}</div>
                    <div className="hidden md:flex">-</div>
                    <div>{item.stage}</div>
                      <div className="flex gap-x-4">
                      {/* icons */}
                      {item.icons?.map((icon,itemIndex)=>{
                        return (<div key={itemIndex} className="text-2xl text-white">{icon}</div>);
                      })}
                      </div>
                  </div>
                  
              );
            })}
          </div>
        </div>                
      </div>
    </div>
    )
   
};

export default About;
