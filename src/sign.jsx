import axios from "axios";
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Outlet, Link, Navigate,redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import anime from 'animejs/lib/anime.es.js';
var path = anime.path('.motion-path-demo path');
function Sign(){
  let navigate = useNavigate();
  const [y ,sety] =useState()

  async function submit(){
    document.getElementById("loading").style.display = "block"
      anime({
        targets: '.loading',
        translateX: [-100, 100],
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });
    await axios.post('https://note-back-mode2-teri.vercel.app/log/auth', {
      Username:document.getElementById("user").value,
      Password:document.getElementById("Mypassword").value
    })
    .then(function (response) {
      if(response.data.Message=="logged in"){navigate('/try', { replace: true })};console.log(response.data);
      sety(response.data)
      localStorage.setItem("key", response.data.key);
      document.getElementById("loading").style.display = "none"
      //console.log(localStorage)
      if(response.data.Message!=="logged in"){passt()}
    })
    .catch(function (error) {
      console.log(error)
      checker(error)
      document.getElementById("loading").style.display = "none"
    })
   
  
  }
  function hider() {
    
    const x = document.getElementById("Mypassword");
    if (x.type == "password"){
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  function checker(responde){
    if(responde){
      document.getElementById("state").textContent = "wrong username or password";
    }
   }
  function passt(){
    document.getElementById("state").textContent = "wrong username or password";
    }
  return(
    <div className="min-h-screen min-w-screen bg-slate-800 flex flex-col justify-center">
        <div className='flex flex-col mx-2 loading place-self-center my-2 hidden' id='loading'><div className=' w-5 h-5 rounded-3xl bg-red-700'></div></div>
        <div className=" bg-gray-500 place-self-center sign flex flex-col place-items-start border-4 border-black">
        <div className="text-lg md:text-xl lg:text-2xl my-2 mx-2">username: <input type="text" className="h-8 w-40 lg:h-10 lg:w-48 border-2 border-black rounded-md" id="user"></input></div>
        <div className="text-lg md:text-xl lg:text-2xl my-2 mx-2">password: <input type="password" className="h-8 w-40 lg:h-10 lg:w-48 border-2 border-black rounded-md" id="Mypassword"></input><input className="size-4 mx-1" type="checkbox" onChange={()=>hider()}/></div>
        
        <div className="flex flex-row ">
        <button className="w-20 h-8 mx-2 bg-white rounded-md hover:bg-blue-500 hover:shadow-md hover:shadow-black duration-150" onClick={()=>submit()}>submit</button>
        <div id="state" className="">enter your login data</div>
        </div>
        <br/>
        <div className="place-self-center text-lg md:text-xl lg:text-2xl">Don't have an account? <button className=" text-red-700" onClick={()=>navigate('/addUser', { replace: true })}>Register</button></div>
        


        </div>
        



    </div>
  )  
}
export default Sign