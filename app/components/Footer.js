import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faGoogle, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className='bg-black text-white text-center py-10'>
      <div className='flex justify-center space-x-4 my-2 mb-8'>
        <FontAwesomeIcon className='w-10 h-10' icon={faFacebookF} />
        <FontAwesomeIcon className='w-10 h-10' icon={faInstagram} />
        <FontAwesomeIcon className='w-10 h-10' icon={faTwitter} />
        <FontAwesomeIcon className='w-10 h-10' icon={faGoogle} />
        <FontAwesomeIcon className='w-10 h-10' icon={faYoutube} />
      </div>
      <div className='flex justify-center space-x-6'>
        <Link href="/">
        <span>Home</span>
        </Link>
        <span>News</span>
        <Link href="/AboutUs">
        <span>About</span>
        </Link>
        <Link href="/ContactUs">
        <span>Contact Us</span>
        </Link>
        <span>Our Team</span>
      </div>
    </div>
  );
}

export default Footer;