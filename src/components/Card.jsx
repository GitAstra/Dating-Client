import React from 'react'
import { useNavigate } from "react-router-dom";

const Card = ({data}) => {

    const {email, name, image, _id} = data;
    const navigate = useNavigate();

    const userExists = localStorage.getItem('dater');

    const likeUser = async()=> {
        if(userExists === null){
            navigate('/login')
        }
        else{
            const request = await fetch(`http://localhost:5000/api/auth/like/${_id}`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'date-tkn': JSON.parse(userExists).authToken
                }
            });
            const response = await request.json()
            console.log(response)
        }
    }

  return (
    
    <div className="max-w-sm w-full mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
    <img className="object-cover object-center w-full h-56" src={image && image} alt="avatar"/>
    
    <div className="flex items-center px-6 py-3 bg-gray-900">
        {/* <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17 21C15.8954 21 15 20.1046 15 19V15C15 13.8954 15.8954 13 17 13H19V12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12V13H7C8.10457 13 9 13.8954 9 15V19C9 20.1046 8.10457 21 7 21H3V12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12V21H17ZM19 15H17V19H19V15ZM7 15H5V19H7V15Z"/>
        </svg> */}

        <h1 className="text-lg font-semibold text-white capitalize">{name}</h1>
    </div>

    <div className="px-6 py-4 flex gap-2">
        
            
    <button onClick={()=> likeUser()} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200">
  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0 text-md">
        Like
  </span>
</button>
    
<button  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200">
  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0 text-md">
  Super Like
  </span>
</button>

        
        {/* <div className="flex items-center mt-4 text-gray-700">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 11H10V13H14V11Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z"/>
            </svg>

            <h1 className="px-2 text-sm">Meraki UI</h1>
        </div> */}
    </div>
</div>

  )
}

export default Card