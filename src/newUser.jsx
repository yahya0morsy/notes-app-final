import axios from "axios";
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Outlet, Link, Navigate,redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
function SignNew(){
  let navigate = useNavigate();
  const [x ,setx] =useState()
  

  async function submit(){
  const username = document.getElementById("user")
  const displayedname = document.getElementById("disName")
  const password = document.getElementById("pass")
    if(password.value.length <6){
      document.getElementById("state").textContent = "password should be more than 5 characters";
    }
   else{ await axios.post('http://localhost:8000/log', {
      Username:username.value,
      DisplayedName:displayedname.value,
      Password:password.value
    }, { withCredentials: true })
    .then(function (response) {
      console.log(response.data),
      setx(response.data)
      checker(response.data)
      
    })
    .catch(function (error) {
      console.log(error);
    })
  }}
  function checker(responde){
    if(responde=="username exist"){
      document.getElementById("state").textContent = "username exist";
    }
    else if(responde =="user is added"){
      document.getElementById("state").textContent = "user is added"
    }
   }
  function passt(){
    document.getElementById("state").textContent = "username exist";
    }
  return(
    <div className="min-h-screen min-w-screen bg-gradient-to-r from-amber-800 to-amber-950 flex flex-col justify-center">

        <div className="w-96 h-96 bg-gray-500 place-self-center  flex flex-col place-items-start shadow-lg shadow-white">
          <div className="sm:text-lg md:text-xl lg:text-2xl  mx-2 flex flex-col">username: <input type="text" className="h-10 w-48 border-2 border-black rounded-md" id="user"></input></div>
          <div className="sm:text-lg md:text-xl lg:text-2xl  mx-2 flex flex-col">name: <input type="text" className="h-10 w-48 border-2 border-black rounded-md" id="disName"></input></div>
          <div className="sm:text-lg md:text-xl lg:text-2xl  mx-2 flex flex-col">password: <input type="text" className="h-10 w-48 border-2 border-black rounded-md" id="pass"></input></div>
          <div className="flex flex-row my-2">
            <button className="w-20 h-8 mx-2 bg-white rounded-md hover:bg-blue-500 hover:shadow-md hover:shadow-black duration-150" onClick={()=>submit()}>submit</button>
             <div id="state">add a unique username and password</div>
          </div>
        
        


        </div>
        



    </div>
  )  
}
export default SignNew