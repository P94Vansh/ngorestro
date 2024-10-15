'use client'
import React, { useState, useEffect } from 'react';

const MyComponent = ({ params }) => {
  const [donations, setDonations] = useState([]);
  const [ngoDetails, setNgoDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      // First request to get donations
      const donationsResponse = await fetch(`/api/getSelectedreq/${params.slug}`);
      if (!donationsResponse.ok) {
        throw new Error('Failed to fetch donations');
      }
      const donationsData = await donationsResponse.json();
      setDonations(donationsData.donations);

      // Fetch all NGO details and store them in a map
      const ngoDetailsMap = {};
      await Promise.all(donationsData.donations.map(async (donation) => {
        const donationId=donation.donationId
        const response=await fetch(`/api/getngoname?donationId=${donationId}`)
        const data=await response.json()
        const ngoResponse = await fetch(`/api/signUp?userId=${data.dashboard[0].NGOId}`);
        if (!ngoResponse.ok) {
          throw new Error('Failed to fetch NGO details');
        }
        const ngoData = await ngoResponse.json();
        ngoDetailsMap[donation.userName] = ngoData;
      }));

      // Merge donations with their corresponding NGO details
      const mergedData = donationsData.donations.map(donation => ({
        ...donation,
        ngoDetails: ngoDetailsMap[donation.userName]
      }));

      setDonations(mergedData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [params.slug]); // Removed params.userName as it's not used directly

// ... existing code ...
const acceptDonation = async (donationId) => {
  try {
    const response = await fetch(`/api/donate`, {
      method: 'PUT',
      body: JSON.stringify({ status: 'accepted',donationId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to accept donation');
    }
    setDonations((prevDonations) =>
      prevDonations.map((donation) =>
        donation.donationId === donationId
          ? { ...donation, status: 'accepted' }
          : donation
      )
    );
  } catch (error) {
    console.error('Error accepting donation:', error);
  }
};
// ... existing code ...
const rejectDonation = async (donationId) => {
  try {
    // First request to update the donation status
    const response = await fetch(`/api/donate`, {
      method: 'PUT',
      body: JSON.stringify({ status: 'pending', donationId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to reject donation');
    }

    // Second request to delete the donation
    const deleteResponse = await fetch(`/api/dashboard`, {
      method: 'DELETE',
      body: JSON.stringify({ donationId,NGOId:params.slug }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!deleteResponse.ok) {
      throw new Error('Failed to delete donation');
    }

    setDonations((prevDonations) =>
      prevDonations.map((donation) =>
        donation.donationId === donationId
          ? { ...donation, status: 'pending' }
          : donation
      )
    );
  } catch (error) {
    console.error('Error rejecting donation:', error);
  }
  window.location.reload();
};
// ... existing code ...
const deleteDonation = async (donationId) => {
  try {
    // First DELETE request to /api/donate
    const response = await fetch(`/api/donate`, {
      method: 'DELETE',
      body: JSON.stringify({ donationId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete donation from donate API');
    }

    // Second DELETE request to /api/dashboard
    const dashboardResponse = await fetch(`/api/dashboard`, {
      method: 'DELETE',
      body: JSON.stringify({ donationId,NGOId:params.slug }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!dashboardResponse.ok) {
      throw new Error('Failed to delete donation from dashboard API');
    }

    setDonations((prevDonations) =>
      prevDonations.filter((donation) => donation.donationId !== donationId)
    );
  } catch (error) {
    console.error('Error deleting donation:', error);
  }
};
return (
  <div className='bg-gray-900 min-h-screen p-8'>
    <h1 className='text-6xl font-bold text-center text-white'>Donations</h1>
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">

      {donations.map((donation, index) => (
        donation.status!=="pending"&&(
        <li className='bg-white rounded-lg shadow-md p-4 m-4 max-w-xs' key={index}>
          <div className='bg-black text-white text-2xl font-bold text-center'>Product Details</div>
           <div className=' text-black text-lg font-semibold text-center'>{donation.foodDescription}</div>
           <div className=' text-black text-lg font-semibold text-center'>{donation.donationType}</div>
           <div className=' text-black text-lg font-semibold text-center'>{donation.quantity}</div>
          {donation.ngoDetails && (
            <div>
              <h3 className='bg-black text-white text-2xl font-bold text-center'>NGO Details</h3>
              <p><strong>Organisation Name:</strong> {donation.ngoDetails.organisationName}</p>
              <p><strong>Phone Number:</strong> {donation.ngoDetails.phoneNumber}</p>
            </div>
          )}
          <div className='flex justify-center gap-8 mb-5'>
         {donation.status==="selected" && <button onClick={()=>acceptDonation(donation.donationId)} className='bg-green-500 text-white p-2 rounded-lg text-lg font-bold text-center'>Accept</button>}
         {donation.status==="accepted" && <div className='bg-green-500 text-white p-2 rounded-lg text-lg font-bold text-center'>Accepted</div>}
          <button onClick={()=>rejectDonation(donation.donationId)} className='bg-red-500 text-white p-2 rounded-lg text-lg font-bold text-center'>Reject</button>
          </div>
          <div className='flex justify-center'>
          <button onClick={()=>deleteDonation(donation.donationId)} className='bg-green-500 text-white p-2 rounded-lg text-lg font-bold text-center'>Donation Complete</button>
          </div>
        </li>
        )
      ))}
    </ul>
  </div>
);

// ... existing code ...
};

export default MyComponent;