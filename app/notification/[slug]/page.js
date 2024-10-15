"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
const StyledWrapper = styled.div`
  padding: 16px;
  margin: 8px;
  border-radius: 8px;
  background-color: #f9f9f9;
`;


function Notifications({ params }) {
  const [data, setData] = useState([]);
  const [userData,setUserData]=useState([])
  const [loading, setLoading] = useState(true);
  const StyledWrapper = styled.div`
  .card-title {
  color: #262626;
  font-size: 1.5em;
  line-height: normal;
  font-weight: 700;
  margin-bottom: 0.5em;
}

.small-desc {
  font-size: 1em;
  font-weight: 400;
  line-height: 1.5em;
  color: #452c2c;
}

.small-desc {
  font-size: 1em;
}

.go-corner {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 2em;
  height: 2em;
  overflow: hidden;
  top: 0;
  right: 0;
  background: linear-gradient(135deg, #6293c8, #384c6c);
  border-radius: 0 4px 0 32px;
}

.go-arrow {
  margin-top: -4px;
  margin-right: -4px;
  color: white;
  font-family: courier, sans;
}

.card {
  display: block;
  position: relative;
  max-width: 400px;
  max-height: 800px;
  background-color: #f2f8f9;
  border-radius: 10px;
  padding: 2em 1.2em;
  margin: 12px;
  text-decoration: none;
  z-index: 0;
  overflow: hidden;
  background: linear-gradient(to bottom, #c3e6ec, #a7d1d9);
  font-family: Arial, Helvetica, sans-serif;
}

.card:before {
  content: '';
  position: absolute;
  z-index: -1;
  top: -16px;
  right: -16px;
  background: linear-gradient(135deg, #364a60, #384c6c);
  height: 32px;
  width: 32px;
  border-radius: 32px;
  transform: scale(1);
  transform-origin: 50% 50%;
  transition: transform 0.35s ease-out;
}

.card:hover:before {
  transform: scale(28);
}

.card:hover .small-desc {
  transition: all 0.5s ease-out;
  color: rgba(255, 255, 255, 0.8);
}

.card:hover .card-title {
  transition: all 0.5s ease-out;
  color: #ffffff;
}

`;

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
    <div className=" bg-white min-h-screen text-white p-6 mb-4 mx-4 flex flex-col items-center justify-center">
        
    <h1 className="text-2xl text-black font-bold text-center">View Your Requests</h1>
    
      <div className=" mx-10 my-5 font-semibold text-2xl">
        {data.map((item, index) => (
        <StyledWrapper key={index}>
          <div className="card bg-white shadow-md rounded-lg p-6 mb-4 mx-4">
            <p className="card-title text-xl font-bold mb-2 text-black text-center">
              Restaurant Name: {userData.organisationName}
            </p>
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
                    <div className="go-corner">
                      <div className="go-arrow">&rarr;</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No donations available</div>
            )}
          </div>
        </StyledWrapper>
      ))}
      {/* Add the Card component here */}
      
    </div>
  </div>
  );
}

export default Notifications;
