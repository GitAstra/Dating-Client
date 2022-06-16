import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const loginUser = async()=>{
        try{
                const request = await fetch(`http://localhost:5000/api/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify({email, password}),
                    headers:{          
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      }
                });
                const response = await request.json();
                console.log(response)
                if(response.success === true){
                     navigate('/')       
                     localStorage.setItem('dater', JSON.stringify(response));
                }
                else{
                    setError('Invalid Credentials');
                }
                console.log(response)
        }   
        catch(err){
            console.log(err);
        }

    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        loginUser();
    }



  return (
    <div id="authentication-modal" tabindex="-1" aria-hidden="true" className="flex justify-center items-center h-screen bg-gray-900 bg-opacity-70 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow text-black">

        <Link to="/" className="flex gap-2 p-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                Go Home
                </Link>
                
            <div className="py-6 px-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 ">Sign in to our platform</h3>
                <form onSubmit={handleSubmit} className="space-y-6" action="#">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                        <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                        <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    {error && <small className='text-red-500 py-0 my-0'>{error}</small>}
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <Link to="/register" className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div> 
  )
}

export default Login