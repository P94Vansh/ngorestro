"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
const Page = () => {
    const router = useRouter();
    const [formData,setFormData]=useState({
        email: '',
        password: '',
        organisationType: 'default',
        fullName: '',
        username: '',
        phoneNumber: '',
        organisationName: ''
    })
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.organisationType==="default"){
            alert("Please select an organisation type");
            return;
        }
        try {
            const response = await fetch(`/api/signUp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            // Handle success or error based on response
            if(data.success===true){
                alert("Signup Successful!");
                setFormData({
                    email: '',
                    password: '',
                    organisationType: 'default',
                    fullName: '',
                    username: '',
                    phoneNumber: '',
                    organisationName: ''
                })
                localStorage.setItem("token",data.token);
                router.push("/login");
            }
            else{
                alert(data.error);
            }
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <div className='overflow-hidden'>
            <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
                <div
                    style={{
                        backgroundImage: `url('/signuplogin.jpeg')`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        width: "100%",
                        height: "100%",
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1,

                    }}
                />

                <div style={{ position: 'relative', zIndex: 2 }} className="flex flex-col items-center justify-center h-full">
                    <div>
                        <div className='rounded-lg bg-green-700'>
                            <div className='text-2xl text-center font-bold py-2 text-white'>CREATE ACCOUNT</div>
                        </div>
                        <form className="max-w-md mx-auto bg-white p-4 rounded-lg" onSubmit={handleSubmit}>
                            <div className='text-center text-black font-semibold text-xl pb-3'>Join us to reduce food waste and promote health! Sign up now.</div>

                            <div className="relative z-0 w-full mb-5 group">
                                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                            </div>
                            <select
                                className="bg-transparent text-black cursor-pointer border-b-2 border-black my-3 w-full"
                                name="organisationType"
                                id="organisationType"
                                required
                                value={formData.organisationType}
                                onChange={handleChange}
                            >
                                <option value="default" disabled>
                                    Organisation Type
                                </option>
                                <option className="text-black" value="Restaurant">
                                    Restaurant
                                </option>
                                <option className="text-black" value="NGO">
                                    NGO
                                </option>
                            </select>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                    <label htmlFor="fullName" className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full Name</label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                    <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User Name</label>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="number" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                    <label htmlFor="phoneNumber" className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="text" name="organisationName" id="organisationName" value={formData.organisationName} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                    <label htmlFor="organisationName" className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Organisation Name</label>
                                </div>
                            </div>
                            <button type="submit" className="relative inline-block group">
                                <span className="relative z-10 block px-4 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                                    <span className="absolute inset-0 w-full h-full px-4 py-2 rounded-lg bg-green-400"></span>
                                    <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                    <span className="relative">Submit</span>
                                </span>
                                <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                            </button>
                            <div className='text-center text-black font-semibold text-lg pt-3'>Already have an account? <Link href="/login" className='underline underline-offset-4 decoration-green-600'>Login</Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
