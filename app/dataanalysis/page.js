'use client';
import React, { useEffect, useState } from 'react';

const FeedbackData = () => {
    const [feedback, setFeedback] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const res = await fetch('/api/feedback');
                const data = await res.json();
                setFeedback(data.feedback);
                console.log(data);
            } catch (error) {
                console.error("Error fetching feedback:", error);
            }
        };
        fetchFeedback();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page
    };

    const filteredFeedback = feedback.filter(item =>
        item.Restaurantname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 bg-gray-100 min-h-screen bg-[url('/data_analysis.jfif   ')] bg-cover bg-center">
            <h1 className='text-4xl font-extrabold text-green-600 mb-6 text-center'>
                Feedback Data
            </h1>

            <form className="mb-6 flex items-center justify-center" onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    placeholder='Search by Restaurant Name'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-3 border border-gray-300 rounded-md mr-4 focus:ring-2 focus:ring-green-500 transition-all duration-200"
                />
                <button 
                    type="submit" 
                    className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-md text-sm px-6 py-2.5 transition-transform transform hover:scale-105"
                >
                    Search
                </button>
            </form>

            <div className=" cursor-pointer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {filteredFeedback.map((item) => (
                    <div 
                        key={item._id} 
                        className="bg-white shadow-lg rounded-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-xl"
                    >
                        <h2 className="text-2xl font-bold text-green-700 mb-2">{item.Restaurantname}</h2>
                        <p className="text-gray-700"><strong>NGO Name:</strong> {item.NGOname}</p>
                        <p className="text-gray-700"><strong>Rating:</strong> {item.Rating} (Out of 5)</p>
                        <p className="text-gray-700"><strong>Address:</strong> {item.Address}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeedbackData