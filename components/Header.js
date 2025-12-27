//next image
import Image from "next/image";
//next link
import Link from "next/link";
//component
import Socials from '../components/Socials'

const Header = () => {
  return (
    <header className="fixed z-50 w-full transition-all duration-300 xl:h-[100px] flex items-center">
      <div className="container mx-auto px-4 xl:px-0">
        <div className="flex justify-between items-center py-4 glass-panel rounded-full px-8 mt-4">
          {/* logo */}
          <Link href={'/'} className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-pharaonic-gold/20 to-deep-blue/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <Image
              src={'/logo.png'}
              width={180}
              height={40}
              alt='YKP Supplies - Egyptian Travel Pillows'
              priority={true}
              className="relative"
            />
          </Link>
          {/* socials */}
          <div className="hidden md:flex">
            <Socials />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
