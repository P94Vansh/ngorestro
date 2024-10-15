'use client'
import React, { useState } from 'react';

const Feedback = ({ params }) => {
    const [Restaurantname, setRestaurantname] = useState('');
    const [Rating, setRating] = useState('');
    const [Address, setAddress] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Rating > 5) {
            alert("Rating must be less than 5");
            return;
        }
        const res = await fetch('/api/feedback', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ NGOname: params.slug, Restaurantname, Rating, Address }),
        });
        const data = await res.json();
        if (data.success) {
            alert("Feedback Submitted Successfully");
            window.location.href = "/";
        } else {
            alert(data.error);
        }
    };

    return (
        <div style={styles.container}>
            <h1 className='text-4xl font-extrabold text-black mb-6 text-center'>Feedback Form</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Restaurant Name"
                    value={Restaurantname}
                    onChange={(e) => setRestaurantname(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="number"
                    placeholder="Rating (Out of 5)"
                    value={Rating}
                    onChange={(e) => setRating(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={Address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Submit</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #32a852, #a8e063)', // Updated to green gradient

        padding: '20px',
    },
    heading: {
        color: '#fff',
        marginBottom: '20px',
    },
    form: {
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '300px',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
    },
    button: {
        width: '100%',
        padding: '10px',
        background: '#32a852',
        marginTop: '10px',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s',
    },
    buttonHover: {
        background: '#d05',
    },
};

export default Feedback;