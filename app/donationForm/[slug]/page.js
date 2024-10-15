"use client"
   import React, {useState,useEffect} from 'react';
   import jwt from "jsonwebtoken";
   import { v4 as uuidv4 } from 'uuid';

   const DonationForm = ({params}) => {
    const [formData, setFormData] = useState({
      donationId:uuidv4(),
      userName:'',
      donationType: 'default',
      quantity: '',
      address: '',
      expirationTime: '',
      phoneNumber: '',
      foodDescription: '',
    });
    useEffect(()=>{
      try {
        const decodedToken = jwt.decode(params.slug,process.env.JWT_SECRET);
        if (decodedToken && decodedToken.userId) {
          setFormData((prevData) => ({ ...prevData, userName: decodedToken.userId }));
        }
      } catch (error) {
        console.error('Error decoding JWT:', error.message);
      }
    },[params.slug]);
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      if(formData.donationType==='default'){
        alert('Please select a donation type');
        return;
      }
      try{
        const response=await fetch('/api/donate',{
          method:'POST',
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(formData),
        });
        const res=await fetch('/api/signUp',{
          method:'PUT',
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({userId:formData.userName}),
        });
        const data=await res.json();

        if(response.ok){
          setFormData({ donationId:uuidv4(),userName:formData.userName,donationType:'default',quantity:'',address:'',expirationTime:'',phoneNumber:'',foodDescription:''});
        }
        else{
          console.error('Error donating',response.statusText);
        }
      }catch(error){
        console.error('Error donating',error.message);
      }
    };
     return (
       <div className="flex justify-center items-center h-screen bg-cover bg-center bg-black bg-opacity-30" style={{ backgroundImage: "url('/don_back.jpg')" }}>
         <div className="flex  text-white p-8 rounded-lg  "  style={{backgroundImage:"url('/don_front.png')"}}>
           <div className="max-w-xs p-4 " >
             <h1 className="text-2xl font-bold mb-4 md:text-center">“Help Us Reduce Food Waste and Feed Those in Need”</h1>
           </div>
           <div className="bg-white text-black p-6 rounded-lg max-w-xs w-screen">
             <h2 className="bg-green-500 text-white text-center p-2 rounded mb-4">DONATION FORM</h2>
             <form onSubmit={handleSubmit} className="flex flex-col " method='Post'>
               <select className="mb-3 p-2 border rounded" name="donationType" value={formData.donationType} onChange={handleChange}>
                 <option value="default" disabled>Select Donation Type</option>
                 <option value="lunch">Lunch</option>
                 <option value="snacks">Snacks</option>
                 <option value="meals">Meals</option>
               </select>
               <input name="quantity" value={formData.quantity} onChange={handleChange} type="number" placeholder="Quantity" className="mb-3 p-2 border rounded" required />
               <input name="address" value={formData.address} onChange={handleChange} type="text" placeholder="Pickup Location" className="mb-3 p-2 border rounded" required />
               <input name="expirationTime" value={formData.expirationTime} onChange={handleChange} type="datetime-local" className="mb-3 p-2 border rounded" required />
               <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} type="number" placeholder="Phone Number" className="mb-3 p-2 border rounded" required />
               <textarea name="foodDescription" value={formData.foodDescription} onChange={handleChange} placeholder="Food Description" rows="3" className="mb-3 p-2 border rounded" required></textarea>
               <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">Donate</button>
             </form>
           </div>
         </div>
       </div>
     );
   };

   export default DonationForm;