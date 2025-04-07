//component 
import Circles from "../../components/Circles";
// send email
import React, { useRef,useState } from 'react';
import emailjs from '@emailjs/browser';
//icon
import {BsArrowRight} from 'react-icons/bs'

//framer 
import {motion} from 'framer-motion'

// variants
import {fadeIn} from '../../variants'

const Contact = () => {
  const [showModal,setShowModal] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_rbzem49', 'template_4tnp8hm', form.current, 'a0PL4DwtXZPFuxT3y')
      .then((result) => {
          console.log(result.text);
          window.location.replace('/');
          setShowModal(true);
      }, (error) => {
          console.log(error.text);
      });
  };

  // Changed h-full to min-h-full, adjusted py padding
  return <div className="min-h-full bg-primary/30">
    <div className="container mx-auto py-20 md:py-32 text-center xl:text-left flex
                     items-center justify-center min-h-full"> {/* Changed h-full to min-h-full */}
      {/* text & form*/}
      <div className="flex flex-col w-full max-w-[700px] ">
      {/* text */}
      <h2 className="h2 text-center mb-12">
        Let s <span className="text-accent">connect.</span>
      </h2>
      {/* form */}
      <form className="flex-1 flex flex-col gap-6 w-full mx-auto" ref={form} onSubmit={sendEmail}>
        {/* input */}
        <div className="flex gap-x-6 w-full">
          <input type="text" placeholder="name" name="user_name"  className="input"/>
          <input type="text" placeholder="email" name="user_email"  className="input"/>
        </div>
        <input type="text" name="from_name" placeholder="subject" className="input"/>
        <textarea type="text" name="message" placeholder="message" className="textarea"></textarea>
        {/* Corrected item-center */}
        <button className="btn rounded-full border border-white/50 max-w-[170px]
          px-8 transition-all duration-300 flex items-center justify-center 
          overflow-hidden hover:border-accent group " value="send" type="submit">
          <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 {/* Adjusted translate direction */}
          transition-all duration-500 mt-2">
            Lets talk
            </span>
          <BsArrowRight className="-translate-y-[120%] opacity-0 group-hover:flex
          group-hover:translate-y-0 group-hover:opacity-100 transition-all mt-4
          duration-300 absolute text-[22px]"/>
        </button>
      </form>
      {showModal && (
        <div id="popup-modal" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                    
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="p-4 md:p-5 text-center">
                    
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Thank you, your message has been received successfully</h3>
                    <button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                       Ok
                    </button>
                </div>
            </div>
        </div>
    </div>
        )}
      </div>
    </div>
    
  </div>;
};

export default Contact;
