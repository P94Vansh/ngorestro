'use client'
import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('/api/Contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      // New code to send email
      const emailResponse = await fetch('/api/send-mails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (emailResponse.ok) {
        console.log('Message and email sent successfully');
        setFormData({name:'', email:'', message:''});
      } else {
        console.error('Error sending email',);
      }
    } else {
      console.error('Error sending message');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};
  return (
    <div>
    <section className="bg-green-500 py-10">
      <div className="max-w-[60vw] mx-auto bg-white shadow-md p-6 flex gap-6">
        
        <div>
        <h3 className="text-3xl font-bold mb-4">Contact Us</h3>
        <p className="mb-6">We are all ears and are available 24/7</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Your Name"
            className="w-full p-2 border rounded-md"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Enter Your Email"
            className="w-full p-2 border rounded-md"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            placeholder="Message us and we'll help you out"
            className="w-full p-2 border rounded-md"
            rows="4"
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded-md"
          >
            Submit
          </button>
        </form>
      
      </div>
      <div>
      <img src="contactus.jpg" alt="Contact Us" className='w-[30vw] h-[20vw] object-cover'/>
      <div className="mt-6 space-y-2">
          <div className="flex items-center">
            <span className="mr-2">📍</span> India
          </div>
          <div className="flex items-center">
            <span className="mr-2">📞</span> +91 9985775643
          </div>
          <div className="flex items-center">
            <span className="mr-2">✉️</span> info@mealbridge.com
          </div>
        </div>
      </div>
      </div>
    </section>
    </div>
  );
}