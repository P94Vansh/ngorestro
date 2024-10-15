import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faGoogle, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className='bg-black text-white text-center py-10'>
      <div className='flex justify-center space-x-4 my-2 mb-8'>
        <FontAwesomeIcon className='md:w-10 md:h-10 w-7' icon={faFacebookF} />
        <FontAwesomeIcon className='md:w-10 md:h-10 w-7' icon={faInstagram} />
        <FontAwesomeIcon className='md:w-10 md:h-10 w-7' icon={faTwitter} />
        <FontAwesomeIcon className='md:w-10 md:h-10 w-7' icon={faGoogle} />
        <FontAwesomeIcon className='md:w-10 md:h-10 w-7' icon={faYoutube} />
      </div>
      <div className='flex justify-center space-x-6'>
        <Link href="/">
        <span className="text-xs md:text-xl">Home</span>
        </Link>
        <Link href={"/feedbackData"}>
        <span className="text-xs md:text-xl">Feedbacks</span>
        </Link>
        <Link href="/AboutUs">
        <span className="text-xs md:text-xl">About</span>
        </Link>
        <Link href="/ContactUs">
        <span className="text-xs md:text-xl">Contact Us</span>
        </Link>
      </div>
    </div>
  );
}

export default Footer;