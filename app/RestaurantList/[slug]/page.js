"use client";

import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";

const RestaurantList = ({ params }) => {

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/donate");
      const dataoutput = await response.json();
      console.log(dataoutput.donations);
      setData(dataoutput.donations);
      for (const restaurant of dataoutput.donations) {
        const userResponse = await fetch(`/api/signUp?userId=${restaurant.userName}`);
        const userData = await userResponse.json();
        console.log(userData);
        setData(prevData => prevData.map(item => item._id === restaurant._id ? { ...item, restroname: userData.username } : item));
      }
    }
    fetchData();
  }, []);
  const handleSendRequest = async (donationId) => {
    try {
      const postRequest = fetch('/api/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ donationId, NGOId: `${params.slug}` }),
      });

      const putRequest = fetch('/api/donate', { // Replace with your actual endpoint
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ donationId, status: "selected" }),
      });

      // Execute both requests simultaneously
      const [postResponse, putResponse] = await Promise.all([postRequest, putRequest]);

      if (!postResponse.ok || !putResponse.ok) {
        throw new Error('Failed to complete requests');
      }

      const postResult = await postResponse.json();
      const putResult = await putResponse.json();

      console.log('POST result:', postResult.message);
      console.log('PUT result:', putResult.message);

      alert("Requests completed successfully");
      // Optionally, update the UI or state based on the responses
    } catch (error) {
      alert("An error occurred while processing the requests. Please try again.");
      console.error('Error:', error.message);
    }
  };
 // ... existing code ...
return (
  <div>
    <div className="bg-gray-900 min-h-screen p-8">
      <div className="flex justify-center mb-8 relative mx-auto w-[450px]">
        <input
          type="text"
          placeholder="Search for Nearby Restaurant"
          className="p-2 w-full max-w-md bg-gray-100 placeholder:text-black rounded-full px-3"
        />
        <CiSearch className='absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl text-black cursor-pointer' />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map(({ donationId, restroname, donationType, quantity, expirationTime, phoneNumber, address, status }, index) => (
          status !== "accepted" && (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 m-4 max-w-xs">
              <h3 className="bg-black text-white text-center p-2 rounded mb-4">{restroname}</h3>
              <p><strong>Type:</strong> {donationType}</p>
              <p><strong>Quantity:</strong> {quantity}</p>
              <p><strong>Expiry Date:</strong> {expirationTime}</p>
              <p><strong>Mobile NO:</strong> {phoneNumber}</p>
              <p><strong>Address:</strong> {address}</p>
              <div className='flex justify-center gap-4'>
                <button
                  className="bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600 w-full"
                  onClick={() => handleSendRequest(donationId)}
                >
                  SEND REQUEST
                </button>
                <button className="bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600 w-full">
                  Donate Now
                </button>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  </div>
);
// ... existing code ...
// ... existing code ...
}

export default RestaurantList
