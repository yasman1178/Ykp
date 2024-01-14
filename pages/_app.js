import '../styles/globals.css';

//component
import Layout from '../components/Layout';
import Transition from '../components/Transition'
//route
import { useRouter } from 'next/router';

//famer motion

import {AnimatePresence,motion} from 'framer-motion';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
  <Layout>
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={router.route} className='h-full'>
        <Transition/>
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  </Layout>
  ) 
}

export default MyApp;
