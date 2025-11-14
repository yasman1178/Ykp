//links
import Link from "next/link";
//icons
import {RiFacebookBoxLine} from 'react-icons/ri'

const Socials = () => {
  return (
    <div className="flex item-center items-center	 gap-x-5 text-lg">
      <Link href={'https://www.facebook.com/new.cairo.893792'} target="_blank" rel="noopener noreferrer" className="hover:text-center transition-all duration-300">
        <RiFacebookBoxLine/>
      </Link>
    </div>
    );
};

export default Socials;
