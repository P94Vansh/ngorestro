'use client'
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const LoginPage = () => {
    const router = useRouter();
    const handleLogin = async (event) => {
        event.preventDefault();

        const username = event.target.floating_username.value;
        const password = event.target.floating_password.value;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                localStorage.setItem("token",data.token);
                const event = new Event('storage');
                window.dispatchEvent(event);
                event.target.floating_username.value='';
                event.target.floating_password.value='';
                window.location.href="/"
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='overflow-hidden'>
            <div style={{ position: 'relative', width: '100vw', height: '80vh' }}>
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
                    <div className='w-full'>
                        <div className='rounded-lg md:mx-auto bg-green-700 max-w-md mx-4'>
                            <div className='text-2xl text-center font-bold py-2 text-white'>SignIn</div>
                        </div>
                        <form onSubmit={handleLogin} className="max-w-md md:mx-auto mx-4 bg-white p-4 rounded-lg">
                            <div className='pb-4'>
                                <div className='text-center text-black font-semibold text-3xl '>LogIn to Start</div>
                                <div className='text-center text-black font-semibold text-3xl'>Making a Difference</div>
                            </div>

                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" name="floating_username" id="floating_username" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                <label htmlFor="floating_username" className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                            </div>
                            <button className="relative inline-block group">
                                <span className="relative z-10 block px-4 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                                    <span className="absolute inset-0 w-full h-full px-4 py-2 rounded-lg bg-green-400"></span>
                                    <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                    <span className="relative">Login</span>
                                </span>
                                <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                            </button>
                            <div className='text-center text-black font-semibold text-lg pt-3'>Don&apos;t have an account? <Link href="/signUp" className='underline underline-offset-4 decoration-green-600'>Sign Up</Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;