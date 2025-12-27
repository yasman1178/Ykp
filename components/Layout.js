//font
import { Sora } from "next/font/google"

// font setting 
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800']
})

//components
import Nav from '../components/Nav'
import Header from '../components/Header'
import TopLeftImg from '../components/TopLeftImg'
import Footer from '../components/layout/Footer'

const Layout = ({ children }) => {
  // Increased bottom padding to pb-32 on mobile, xl:pb-0 removes it on larger screens
  // Switched to backticks for className to correctly interpolate sora.variable
  return (<div className={`page bg-site text-white bg-cover bg-no-repeat ${sora.variable} font-sora relative pb-32 xl:pb-0 min-h-screen flex flex-col`}
  >
    {/* Added flex flex-col and min-h-screen to ensure layout takes full height */}
    <Nav />
    <Header />
    <TopLeftImg />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
  );
};
export default Layout;
