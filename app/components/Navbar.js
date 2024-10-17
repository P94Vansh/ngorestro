'use client'
import React,{useState,useEffect} from 'react'
import { RxAvatar } from "react-icons/rx";
import jwt from 'jsonwebtoken';
import Link from 'next/link'
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
    const [isOpen,setIsOpen] = useState(false);
    const [dashboardHref,setDashboardHref] = useState('/signUp');
    const [listingsHref, setListingsHref] = useState('/signUp');
    const [token, setToken] = useState(null);
    const [login,setLogin]=useState(false);
    const [userName,setUserName] = useState({organisationType:'',organisationName:'',phoneNumber:''});
    useEffect(() => {
      // Function to update state from localStorage
      const updateTokenFromLocalStorage = () => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
        if (storedToken) {
          const decoded = jwt.decode(storedToken);
          setListingsHref(`/RestaurantList/${decoded.userId}`);
          setDashboardHref(`/dashboard/${decoded.userId}`);
          setLogin(true);
        } else {
          setListingsHref('/signUp');
          setDashboardHref('/signUp')
          setLogin(false);
        }
      };
  
      // Initial check
      updateTokenFromLocalStorage();
  
      // Listen for storage changes
      const handleStorageChange = () => {
        updateTokenFromLocalStorage();
      };
      window.addEventListener('storage', handleStorageChange);
  
      // Cleanup listener on unmount
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }, [login])
    // useEffect(()=>{
    //   location.reload();
    // },[forceUpdate])
    const handleLogout=()=>{
      if(confirm("Are you sure you want to logout?")){
      localStorage.removeItem('token');
      window.location.href="/"
      }

    }
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
    useEffect(()=>{
      try{
      const token = localStorage.getItem('token');
      const userId = jwt.decode(token).userId;
      const fetchUserName = async () => {
        const response = await fetch(`/api/signUp?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setUserName(data);
      } 
      fetchUserName();
    }catch(error){
      console.log("error",error.message)
    }
    },[])
  return (
    <div>
      

<nav className="bg-black">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <span className="self-center text-2xl font-semibold bg-black whitespace-nowrap bg-gradient-to-r from-white to-green-400 text-transparent bg-clip-text">MealBridge</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded={isOpen}
    onClick={toggleMenu}>
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border md:flex-row md:justify-between md:items-center md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
        <li>
          <a href="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 hover:font-bold md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page">Home</a>
        </li>
        {userName.organisationType==="NGO" &&
        <li>
          <Link href={listingsHref} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 hover:font-bold md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Listings</Link>
        </li>
        }
        {userName.organisationType==="Restaurant" &&
        <li>
          <a href={dashboardHref} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 hover:font-bold md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Dashboard</a>
        </li>
        }
        <li>
          <a href="/ContactUs" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 hover:font-bold md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact Us</a>
        </li>
        {login ? (
        <li>
         <RxAvatar onClick={handleLogout} className='text-white text-3xl ml-3 md:ml-0 cursor-pointer hover:text-green-500'/>
        </li>
        ) : (
          <li>
            <a href="/signUp" className="block py-2 px-3 text-green-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white hover:font-bold md:p-0 dark:text-green-500 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login/Signup</a>
          </li>
        )}
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
