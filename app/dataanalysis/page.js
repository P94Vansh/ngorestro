'use client'
import React, { useEffect, useState } from 'react';

const TopRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopRestaurants = async () => {
            try {
                const response = await fetch('/api/gettoprestro');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data.data);
                setRestaurants(data.data); // Assuming the response has a 'data' field
            } catch (error) {
                setError(error.message);
            }
        };

        fetchTopRestaurants();
    }, []);

    if (error) {
        return <div className="text-red-500 text-center mt-5">{`Error: ${error}`}</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/data_analysis.jfif)' }}>
            <h1 className="text-4xl font-bold text-white bg-black p-2 rounded-lg mb-8 text-shadow-lg">Top Restaurants</h1>
            <ul className=" w-[100%] md:w-[80%] flex flex-wrap items-center justify-center gap-10">
                {restaurants.map((restaurant, index) => (
                    <li key={index} className="bg-white min-w-[300px] rounded-lg p-5 mb-4 shadow-lg hover:shadow-xl hover:bg-gray-100 transition duration-300">
                        <h2 className="text-2xl font-semibold mb-2">{restaurant.organisationName}</h2>
                        <p className="text-lg">UPI: {restaurant.upiId}</p>
                        <p className="text-lg">No of Donations: {restaurant.NoofDonations}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopRestaurants;