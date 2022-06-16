import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const Register = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [step, setStep] = useState(0);
    const navigate = useNavigate();
    const [upload, setUpload] = useState(false)

    const upload_preset = "cgvyxe2a"; 
    const cloud_name = 'dknupld0a';

    const [images, setImages] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');


    const registerUser = async(e)=>{
        e.preventDefault();
        try{
                const request = await fetch(`http://localhost:5000/api/auth/register`, {
                    method: 'POST',
                    body: JSON.stringify({email, password, name, image: images}),
                    headers:{          
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      }
                });
                const response = await request.json();
                if(response.success === true){
                    navigate('/')
                }
                console.log(response)
        }   
        catch(err){
            console.log(err);
        }

    }

    const uploadImage = async(e)=>{
        setUpload(true);
        const {files}  = e.target;
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", upload_preset);
        const options = {
        method: "POST",
        body: formData,
        };


        const request = await fetch(`https://api.Cloudinary.com/v1_1/${cloud_name}/image/upload`, options);
        const response = await request.json();
        setImages(response.secure_url);
        setUpload(false);
    }



  return (
    <div id="authentication-modal" tabindex="-1" aria-hidden="true" className="flex justify-center items-center h-screen bg-gray-900 bg-opacity-70 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow text-black">

                <Link to={'/'} className="flex gap-2 p-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                Go Home
                </Link>

            <div className="py-6 px-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 ">Sign in to our platform</h3>
                <form className="space-y-6" onSubmit={registerUser}>
                   {step === 0 &&
                   <>
                   <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Name</label>
                        <input value={name} onChange={(e)=> setName(e.target.value)} type="text" name="name" id="name" placeholder="Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                        <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                        <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    
                    
                    <button onClick={()=> setStep(prev=> prev + 1)} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next</button>
                   </>
                   }
                   {
                    step === 1 &&
                    <div className='text-center flex justify-center flex-col gap-8'>
                        <div className="my-4 flex items-center flex-col gap-5">
                        <img  className="w-32 h-32 rounded-full shadow-lg object-cover object-top" src={images} alt="user"/>
                        <label htmlFor='img' className='py-2 px-3 rounded-md text-white hover:bg-white hover:text-black border-2 bg-gray-500 '>Choose Image</label>
                        <input onChange={uploadImage} className='hidden' type="file" name="" id="img" />

                        {upload && <small className='text-green-500'>Uploading Image</small>}

                        </div>
                        <div className="grid grid-cols-2 gap-2">
                        <button onClick={()=> setStep(prev=> prev - 1)} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Prev</button>
                        <button type='submit' className="disabled:opacity-50 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
                        </div>

                    </div>
                   }

                    <div to={'/login'} className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Already Registered? <Link to="/login" className="text-blue-700 hover:underline dark:text-blue-500">Login</Link>
                    </div>
                    

                </form>
            </div>
        </div>
    </div>
</div> 
  )
}

export default Register