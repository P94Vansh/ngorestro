'use client';
import React, { useEffect, useState } from 'react';

const FeedbackData = () => {
    const [feedback, setFeedback] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchFeedback = async () => {
            const res = await fetch('/api/feedback');
            const data = await res.json();
            setFeedback(data.feedback);
            console.log(data);
        };
        fetchFeedback();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredFeedback = feedback.filter(item =>
        item.Restaurantname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className='text-3xl font-bold mb-4'>Feedback Data</h1>
            <form className="mb-6">
                <input
                    type="text"
                    placeholder='Search by Restaurant Name'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-2 border border-gray-300 rounded-md mr-2"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Search</button>
            </form>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">NGO Name</th>
                            <th className="py-3 px-6 text-left">Restaurant Name</th>
                            <th className="py-3 px-6 text-left">Rating</th>
                            <th className="py-3 px-6 text-left">Address</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm font-light">
                        {filteredFeedback.map((item) => (
                            <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{item.NGOname}</td>
                                <td className="py-3 px-6 text-left">{item.Restaurantname}</td>
                                <td className="py-3 px-6 text-left">{item.Rating}(Out of 5)</td>
                                <td className="py-3 px-6 text-left">{item.Address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeedbackData;