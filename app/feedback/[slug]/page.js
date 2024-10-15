'use client'
import React,{useState,useEffect} from 'react'

const Feedback = ({params}) => {
    const [Restaurantname,setRestaurantname]=useState('');
    const [Rating,setRating]=useState('');
        const [Address,setAddress]=useState('');
        const handleSubmit=async(e)=>{
            e.preventDefault();
            if(Rating>5){
                alert("Rating must be less than 5");
                return;
            }
            const res=await fetch('/api/feedback',{
                method:'POST',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({NGOname:params.slug,Restaurantname,Rating,Address}),
            });
                const data=await res.json();
                console.log(data);
                if(data.success){
                    alert("Feedback Submitted Successfully");
                    window.location.href = "/";
                }else{
                    alert(data.error);
                }
        }
  return (
    <div>
        <h1>Feedback Form</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Restaurant Name" value={Restaurantname} onChange={(e)=>setRestaurantname(e.target.value)}/>
            <input type="number" placeholder="Rating(Out of 5)" value={Rating} onChange={(e)=>setRating(e.target.value)}/>
            <input type="text" placeholder="Address" value={Address} onChange={(e)=>setAddress(e.target.value)}/>
            <button type="submit">Submit</button>
            </form>
    </div>
  )
}

export default Feedback