"use client";
import React, { useEffect, useState } from "react";

function Notifications({ params }) {
  const [data, setData] = useState([]);
  const [userData,setUserData]=useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Starting fetch for dashboard data...");
        const response = await fetch(`http://localhost:3000/api/dashboard?NGOId=${params.slug}`);
        if (!response.ok) {
          console.error(`Dashboard fetch error: ${response.status} - ${response.statusText}`);
          return;
        }
        const dataResponse = await response.json();
        console.log("Fetched dashboard data:", dataResponse);

        if (!dataResponse.dashboard || !Array.isArray(dataResponse.dashboard)) {
          console.error("Dashboard data is not an array or is undefined.");
          return;
        }

        // Fetch donation data for each item and update state incrementally
        const fetchDonationData = async (item) => {
          const ngoId = item.NGOId;
          console.log(`Fetching donation data for NGO ID: ${ngoId}`);

          try {
            const donationResponse = await fetch(`http://localhost:3000/api/donate?NGOId=${ngoId}`);
            if (!donationResponse.ok) {
              console.error(`Donation fetch error: ${donationResponse.status} - ${donationResponse.statusText}`);
              return null;
            }
            const donationsData = await donationResponse.json();
            console.log("Donations Data:", donationsData);

            // Merge the current item with donationsData into a single object
            return { ...item, ...donationsData };
          } catch (error) {
            console.error("Error fetching donation data:", error);
            return null;
          }
        };

        // Use Promise.all to fetch all donation data concurrently
        const combinedDataArray = await Promise.all(
          dataResponse.dashboard.map(fetchDonationData)
        );

        // Filter out any null values in case of fetch errors
        const validData = combinedDataArray.filter(item => item !== null);
        console.log("Final combined data array:", validData);
        console.log(validData[0].donations[0].status)
        setData(validData); // Update state with the combined data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.slug]); // Ensure the effect runs when params.slug changes
  useEffect(()=>{
    const fetchUserData=async()=>{
    for(let i=0;i<data.length;i++){
      const userId=data[i].donations[0].userName
      console.log(userId)
      const response=await fetch(`http://localhost:3000/api/signUp?userId=${userId}`)
      const userData=await response.json()
      console.log("userData",userData)
      setUserData(userData)
    }
  }
  fetchUserData()
  },[data])
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-gray-800 min-h-screen text-white">
      <h1 className="text-2xl font-bold text-center">View Your Requests</h1>
      <div className="flex justify-between mx-10 my-5 font-semibold text-2xl">
        {data.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-4 mx-4">
            <h2 className="text-xl font-bold mb-2 text-black text-center">Restaurant Name: {userData.organisationName}</h2>
            {Array.isArray(item.donations) && item.donations.length > 0 ? (
              item.donations.map((donation, idx) => (
                <div key={idx} className="border-t border-gray-200 pt-4 mt-4">
                  <div className="text-lg font-semibold">Donation Details</div>
                  <div className="mt-2">
                    <div className="text-gray-700">Donation Type: {donation.donationType}</div>
                    <div className="text-gray-700">Donation Amount: {donation.quantity}</div>
                    <div className="text-gray-700">Address: {donation.address}</div>
                    <div className="text-gray-700">Expiration Time: {donation.expirationTime}</div>
                    <div className="text-gray-700">Mobile Number: {donation.phoneNumber}</div>
                    <div className="text-gray-700">Status: {donation.status || "Status not available"}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No donations available</div>
              )}
            </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;
