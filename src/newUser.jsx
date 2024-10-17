import axios from "axios";
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Outlet, Link, Navigate,redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

import anime from 'animejs/lib/anime.es.js';
var path = anime.path('.motion-path-demo path');
function SignNew(){
  let navigate = useNavigate();
  const [x ,setx] =useState()
  

  async function submit(){
    document.getElementById("loading").style.display = "block"
      anime({
        targets: '.loading',
        translateX: [-100, 100],
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });
  const username = document.getElementById("user")
  const displayedname = document.getElementById("disName")
  const password = document.getElementById("pass")
    if(password.value.length <6){
      document.getElementById("state").textContent = "password should be more than 5 characters";
      document.getElementById("loading").style.display = "none"
    }
   else{ await axios.post('https://note-back-mode2-teri.vercel.app/log', {
      Username:username.value,
      DisplayedName:displayedname.value,
      Password:password.value
      
    })
    .then(function (response) {
      console.log(response.data),
      setx(response.data)
      checker(response.data)
      if(response.data=="user is added"){navigate('/', { replace: true })}
      document.getElementById("loading").style.display = "none"
    })
    .catch(function (error) {
      console.log(error);
      document.getElementById("loading").style.display = "none"
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
    <div className="min-h-screen min-w-screen relative bg-gradient-to-r from-amber-800 to-amber-950 flex flex-col justify-center">
       <div className='flex flex-col mx-2 loading place-self-center my-2 hidden' id='loading'><div className=' w-5 h-5 rounded-3xl bg-red-700'></div></div>
         <button className="text-3xl absolute top-2 left-4 hover:shadow-md hover:shadow-white hover:-translate-x-2" onClick={()=>navigate('/')}>⬅️</button>
        <div className="sign bg-gray-500 place-self-center  flex flex-col place-items-start shadow-lg shadow-white">
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