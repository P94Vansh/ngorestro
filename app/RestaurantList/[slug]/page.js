"use client";

import React, { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";

const RestaurantList = ({ params }) => {
  const [data, setData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [maxDistance, setMaxDistance] = useState(50); // Maximum distance in kilometers
  const [searchQuery, setSearchQuery] = useState(''); // New state for search term

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/donate");
      const dataoutput = await response.json();

      const updatedData = await Promise.all(dataoutput.donations.map(async (restaurant) => {
        const userResponse = await fetch(`/api/signUp?userId=${restaurant.userName}`);
        const userData = await userResponse.json();

        return {
          ...restaurant,
          restroname: userData.organisationName,
          location: userData.location, // Assuming location is part of the user data
        };
      }));
      setData(updatedData);
    };

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
          },
          (error) => {
            console.error("Error getting location:", error);
            alert("Unable to retrieve your location");
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    getUserLocation();
    fetchData();
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  const handleSendRequest = async (donationId) => {
    try {
      const postRequest = fetch('/api/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ donationId, NGOId: `${params.slug}` }),
      });

      const putRequest = fetch('/api/donate', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ donationId, status: "selected" }),
      });

      const [postResponse, putResponse] = await Promise.all([postRequest, putRequest]);

      if (!postResponse.ok || !putResponse.ok) {
        throw new Error('Failed to complete requests');
      }

      const postResult = await postResponse.json();
      const putResult = await putResponse.json();


      alert("Requests completed successfully");
    } catch (error) {
      alert("An error occurred while processing the requests. Please try again.");
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <div className="bg-gray-900 min-h-screen p-8">
        <div className="flex justify-center mb-8 relative mx-auto md:w-[450px] w-[300px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for Nearby Restaurant"
            className="p-2 w-full max-w-md bg-gray-100 placeholder:text-black rounded-full px-3"
          />
          <CiSearch className='absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl text-black cursor-pointer' />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data
            .filter(({ location,restroname }) => {
              if (!userLocation || !location) return false;
              const distance = calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                location.coordinates[1], // Assuming location is stored as [longitude, latitude]
                location.coordinates[0]
              );
              return distance <= maxDistance && restroname.toLowerCase().includes(searchQuery.toLowerCase());
            })
            .map(({ donationId, restroname, donationType, quantity, expirationTime, phoneNumber, address, location, status }, index) => (
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
                  </div>
                </div>
              )
            ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantList;