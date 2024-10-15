'use client'
import React, { useEffect, useState } from 'react';

const TopRestaurants = () => {
    const [topRestaurants, setTopRestaurants] = useState([]);

    useEffect(() => {
        const fetchTopRestaurants = async () => {
            try {
                const response = await fetch('/api/gettoprestro');
                const data = await response.json();

                if (response.ok) {
                    setTopRestaurants(data.data);
                } else {
                    console.error("Error fetching top restaurants:", data.error);
                }
            } catch (error) {
                console.error("Error making request:", error);
            }
        };

        fetchTopRestaurants();
    }, []);

    return (
        <div className="container">
            <h1 className="title">Top 3 Restaurants by Donations</h1>
            <ul className="restaurant-list">
                {topRestaurants.map((restaurant) => (
                    <li key={restaurant._id} className="restaurant-item">
                        <h2 className="restaurant-name">{restaurant.organisationName}</h2>
                        <p className="donation-count">No of Donations: {restaurant.NoofDonations}</p>
                        <p className="donation-count">UPI ID: {restaurant.upiId}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopRestaurants;