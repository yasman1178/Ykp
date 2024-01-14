//links
import Link from "next/link";
//icons
import {RiInstagramLine,RiFacebookBoxLine} from 'react-icons/ri'

const Socials = () => {
  return (
    <div className="flex item-center items-center	 gap-x-5 text-lg">
      <Link href={''} className="hover:text-center transition-all duration-300">
        <RiInstagramLine/>
      </Link>
      <Link href={''} className="hover:text-center transition-all duration-300">
        <RiFacebookBoxLine/>
      </Link>
    </div>
    );
};

export default Socials;
