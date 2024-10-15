'use client'
import * as dotenv from 'dotenv';
dotenv.config();
import Link from "next/link";
import jwt from "jsonwebtoken";
import { useState,useEffect } from "react";
export default function Home() {
  const [login,setLogin]=useState(false);
  const [linkHref, setLinkHref] = useState("/signUp");
  const [getRequests,setGetRequests]=useState("/signUp");
  const [userName, setUserName] = useState({organisationType:'',organisationName:'',phoneNumber:''});

  useEffect(() => {
    try{
    const token = localStorage.getItem("token");
    if (token) {
      setLinkHref(`/donationForm/${token}`);
      setLogin(true);
    }
  }
  catch(error){
    console.log(error)
  }
  }, []);

  useEffect(() => {
    try{  
    const token = localStorage.getItem("token");
    const decodedToken = jwt.decode(token,process.env.JWT_SECRET);
    console.log(decodedToken)
    const userId = decodedToken.userId;
    if (token) {
      setGetRequests(`/notification/${userId}`);
    }
  }
  catch(error){
    console.log(error)
  }
  }, []);

  useEffect(()=>{
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwt.decode(token,process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        console.log(userId)
        if (userId) {
          const response = await fetch(`/api/signUp?userId=${userId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });


          const data = await response.json();
          console.log(data.organisationType)
          setUserName(data);
        }
      } catch (error) {
        console.error('Error fetching userName:', error.message);
      }
    };

    fetchUserName();
  }, []);
  return (
    <div className="overflow-hidden">
      <div style={{ position: 'relative', width: '100vw', height: '70vh' }}>
        <div
          style={{
            backgroundImage: `url('/firstPage.jpg')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
            filter: 'brightness(50%)', // Keep this for the background
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,

          }}
        />
        <div className="flex  flex-col items-center justify-center h-full">
          <div style={{ color: 'white', position: 'relative', zIndex: 2 }} className='text-4xl font-bold'>FIGHT HUNGER, SAVE FOOD,</div>
          <div style={{ color: 'white', position: 'relative', zIndex: 2 }} className='text-4xl font-bold'>SHARE A MEAL</div>
          <Link href="/signUp"> <button className="relative inline-block text-lg group mt-4">
          {!login && <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-4 py-2 rounded-lg bg-green-400"></span>
              <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
             <span className="relative">Get Started</span>
            </span>
            }
            <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center py-10 bg-green-800">
        <div className="flex gap-6">
          {/* Card 1 */}
          {userName.organisationType==="Restaurant" &&
          <div className="bg-black bg-opacity-50 rounded-lg p-6 text-white max-w-xs shadow-md shadow-black hover:bg-green-500 ">
            <h2 className="text-xl font-bold mb-2">DONATE NOW</h2>
            <p className="mb-4">
              Donate your surplus food to help those in need and promote sustainability. Every contribution counts—whether you&apos;re a restaurant, grocery store, or individual.
            </p>
            <Link href={linkHref}>
            <button className="bg-green-800 text-black font-bold py-2 px-4 rounded hover:bg-green-500">
              DONATE
            </button>
            </Link>
          </div>
          }
          {/* Card 2 */}
        
          <div className="bg-black bg-opacity-50 rounded-lg p-6 text-white max-w-xs shadow-md shadow-black hover:bg-green-500">
            <h2 className="text-xl font-bold mb-2">TOP 3 DONORS</h2>
            <p className="mb-4">
            Get top 3 restaurants who donated the most food.
            </p>
            <Link href={'/dataanalysis'}>
            <button className="bg-green-400 text-black font-bold py-2 px-4 rounded hover:bg-green-800">
              GET
            </button>
            </Link>
          </div>
          {userName.organisationType==="NGO" &&
          <div className="bg-black bg-opacity-50 rounded-lg p-6 text-white max-w-xs shadow-md shadow-black hover:bg-green-500">
            <h2 className="text-xl font-bold mb-2">GET YOUR REQUESTS</h2>
            <p className="mb-4">
              Get your requests from the Restaurants .
            </p>
            <Link href={getRequests}>
            <button className="bg-green-400 text-black font-bold py-2 px-4 rounded hover:bg-green-800">
              GET
            </button>
            </Link>
          </div>
}
          {userName.organisationType==="NGO" &&
          <div className="bg-black bg-opacity-50 rounded-lg p-6 text-white max-w-xs shadow-md shadow-black hover:bg-green-500">
            <h2 className="text-xl font-bold mb-2">FEEDBACK</h2>
            <p className="mb-4">
              Give your feedback about the Restaurant.
            </p>
            <Link href={'/feedback/'+userName.organisationName}>
            <button className="bg-green-400 text-black font-bold py-2 px-4 rounded hover:bg-green-800">
              GIVE
            </button>
            </Link>
          </div>
}
        </div>
      </div>
    </div>
  );
}
