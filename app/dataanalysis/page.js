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
                setRestaurants(data.restaurants); // Assuming the response has a 'restaurants' field
            } catch (error) {
                setError(error.message);
            }
        };

        fetchTopRestaurants();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Top Restaurants</h1>
            <ul>
                {restaurants.map((restaurant, index) => (
                    <li key={index}>
                        <h2>{restaurant.organisationName}</h2>
                        <p>Rating: {restaurant.location}</p>
                        <p>Address: {restaurant.NoofDonations}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopRestaurants;