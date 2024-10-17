"use client";
import React, { useEffect, useState } from "react";

function Notifications({ params }) {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/dashboard?NGOId=${params.slug}`);
        if (!response.ok) {
          console.error(`Dashboard fetch error: ${response.status} - ${response.statusText}`);
          return;
        }
        const dataResponse = await response.json();

        if (!dataResponse.dashboard || !Array.isArray(dataResponse.dashboard)) {
          console.error("Dashboard data is not an array or is undefined.");
          return;
        }

        const fetchDonationData = async (item) => {
          const ngoId = item.NGOId;

          try {
            const donationResponse = await fetch(`/api/donate?NGOId=${ngoId}`);
            if (!donationResponse.ok) {
              console.error(`Donation fetch error: ${donationResponse.status} - ${donationResponse.statusText}`);
              return null;
            }
            const donationsData = await donationResponse.json();
            return { ...item, ...donationsData };
          } catch (error) {
            console.error("Error fetching donation data:", error);
            return null;
          }
        };

        const combinedDataArray = await Promise.all(
          dataResponse.dashboard.map(fetchDonationData)
        );

        const validData = combinedDataArray.filter(item => item !== null);
        setData(validData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.slug]);

  useEffect(() => {
    const fetchUserData = async () => {
      for (let i = 0; i < data.length; i++) {
        const userId = data[i].donations[0].userName;
        const response = await fetch(`/api/signUp?userId=${userId}`);
        const userData = await response.json();
        setUserData(userData);
      }
    };
    fetchUserData();
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen text-black p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center mb-8">View Your Requests</h1>
      <div className="w-full max-w-4xl mx-auto space-y-6">
        {data.map((item, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 max-h-96 overflow-y-auto">
            <h2 className="text-2xl font-bold text-center mb-4">{userData.organisationName}</h2>
            {Array.isArray(item.donations) && item.donations.length > 0 ? (
              item.donations.map((donation, idx) => (
                <div key={idx} className="border-t border-gray-200 pt-4 mt-4 text-sm">
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