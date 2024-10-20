import "./notes"
import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import anime from 'animejs/lib/anime.es.js';
var path = anime.path('.motion-path-demo path');
function Adddata(){
  const location = useLocation();
  let navigate = useNavigate();

  
  async function Addnote(){
    document.getElementById("loading").style.display = "block"
      anime({
        targets: '.loading',
        translateX: [-100, 100],
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });
    await axios.post('https://note-back-mode2-teri.vercel.app/notes/save', {
      title:document.getElementById("title").value,
      data:document.getElementById("text").value,
      key:localStorage.getItem("key")
    })
    .then(function (response) {
    // console.log(response.data)
     if(response.data=="note saved")
     {navigate('/try'), document.getElementById("loading").style.display = "none"}
     terminal(response.data)
      document.getElementById("loading").style.display = "none"
    })
    .catch(function (error) {
      console.log(error)
       document.getElementById("loading").style.display = "none"
    })
}
function terminal(mess){
  document.getElementById("terminal").style.display = 'block'
   document.getElementById("terminal").textContent = mess
}

    return(
        <div className="min-h-screen min-w-screen relative bg-slate-800 flex flex-col justify-center place-items-center">
            <div className='flex flex-col mx-2 loading place-self-center my-2 hidden' id='loading'><div className=' w-5 h-5 rounded-3xl bg-red-700'></div></div>
            <div id="terminal" className="absolute top-5 text-base p-2 rounded-lg hidden bg-white"></div>
            <div className="bg-white border-2 relative border-black show overflow-scroll rounded-md p-10 w-3/4 h-96">
            <button className=' top-0 right-1 absolute overflow-visible hover:shadow-md hover:shadow-slate-950 hover:bg-white text-2xl' onClick={()=>navigate('/try')}>X</button>
            <input className="text-sm md:text-base lg:text-lg w-48 h-12" id="title" placeholder="title..." defaultValue={location.state.title}/>
            <br/><br/>
            <textarea className="text-base md:text-lg lg:text-xl box h-52 resize-none whitespace-pre" id="text" placeholder="type anything..." defaultValue={location.state.data}/>
            <button className='w-10 h-8 bg-white absolute hover:bg-slate-500 hover:shadow-md hover:shadow-slate-950 rounded-md border-2 border-black right-1 bottom-1' onClick={()=>Addnote()}>Add</button>
            </div>
            

            
            </div>
    )
}
export default Adddata