import React, { useEffect, useRef, useState } from 'react';
import Card from './Card';
import Login from '../Pages/Login';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Main = () => {

    const userExists = localStorage.getItem('dater');
    const [users, setUsers] = useState([]);
    const [drop, setDrop] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const fetchUsers = async()=>{
        setLoading(true);
        try{
            const request = await fetch(`http://localhost:5000/api/auth/find`);
            const response = await request.json();
            console.log(response)
            setUsers(response);
            console.log(response);
            setLoading(false);
        }
        catch{
            console.log("Error")
        }
    }

    async function fetchLoggedUser(){
        try{
            const request = await fetch(`http://localhost:5000/api/auth/findAll`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'date-tkn': JSON.parse(userExists).authToken
                }
            });
            const response = await request.json();
            console.log(response)
            setUsers(response.data);
            console.log(response);
            setLoading(false);
        }
        catch(err){
            console.log(err)
        }
    }

    const logoutUser = ()=>{
        localStorage.removeItem('dater');
        window.location.reload()
    }

    useEffect(()=>{
        if(userExists === null){
            fetchUsers();
        }
        else{
            fetchLoggedUser()
        }
    }, [])


    const userInfo = userExists && JSON.parse(localStorage.getItem('dater'));

  return (
    <div className="border flex justify-center items-center w-full">
        <div className="max-w-2xl border w-full h-full flex items-center flex-col  min-h-screen">


        <div className="p-5 border-b mb-5 w-full flex justify-between items-center">


                    <p className='text-lg'>Dating</p>


                {
                    userExists ? 
                    <div className="flex gap-5 items-center relative">
                        <div className=" flex gap-4 items-center" onClick={()=> setDrop(prev=> !prev)}>
                        <p>{userInfo && userInfo.userInfo.name}</p>
                        <img  className="w-14 h-14 rounded-full shadow-lg object-cover" src={userInfo && userInfo.userInfo.image} alt="user"/>
                        </div>
                    <div className={`${drop === true ? "opacity-100 -translate-y-0": "opacity-0 pointer-events-none -translate-y-2"} transition-all duration-200 ease absolute top-[110%] min-w-full h-max p-2 bg-white border-2 border-blue-400 rounded-md flex flex-col gap-2`}>

                        <Link to={'/profile'} className="border-b py-2">Profile</Link>
                        <a onClick={()=> logoutUser()}>Logout</a>
                    </div>
                    </div>
                    :
                    <div className="">
                    <Link to='/login' className="relative inline-flex items-center justify-center p-0.5  mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-cyan-200 ">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                        Login
                    </span>
                    </Link>
                    <Link to='/register' className="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-cyan-200 ">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                        Sign Up
                    </span>
                    </Link>
                    </div>

                }         


                </div>


<div className="flex flex-col gap-8 w-full">
{
    users ? 
    users.map(user=>{
        return <Card data={user} key={user._id}/>
    })   
    :
    <p>No Users Found</p> 
}

{loading && 
<div className="text-center">
<svg role="status" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
</svg>
</div>
}


</div>
               
        </div>


      


    </div>
  )
}

export default Main