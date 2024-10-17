import "./notes"
import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import anime from 'animejs/lib/anime.es.js';
var path = anime.path('.motion-path-demo path');
function Showing(){
     let navigate = useNavigate();
     
    const [del ,setd] =useState()
    const location = useLocation();
    function terminal(mess){
        document.getElementById("terminal").style.display = 'block'
         document.getElementById("terminal").textContent = mess
    }
    function loader(){
      document.getElementById("loading").style.display = "block"
      anime({
        targets: '.loading',
        translateX: [-100, 100],
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });
    }
  
    async function Editnote(){
      loader()
        await axios.patch('https://note-back-mode2-teri.vercel.app/notes/edit', {
          title:location.state.title,
          Ntitle:document.getElementById("title").textContent,
          data:document.getElementById("text").textContent,
          key:localStorage.getItem("key")
        })
        .then(function (response) {
         console.log(response.data)
         terminal(response.data)
         document.getElementById("loading").style.display = "none"
        })
        .catch(function (error) {
          console.log(error)
          document.getElementById("loading").style.display = "none"
        })
    }
    function sure(x){
        document.getElementById("ask").style.display = "block"
        document.getElementById("sure").textContent = "are you sure you want to delete this?"
        document.getElementById("yes").textContent = "yes" 
        document.getElementById("No").textContent = "No"
        setd(x)
    }
    function deleteNote(){
      loader()
        axios.post('https://note-back-mode2-teri.vercel.app/notes/delete',{
            title:del ,
            key:localStorage.getItem("key")
          })
          .then(function (response) {
          
           terminal(response.data)
           document.getElementById("loading").style.display = "none"
          })
          .catch(function (error) {
            console.log(error)
            document.getElementById("loading").style.display = "none"
          }).finally(()=>navigate('/try', { replace: true }))
          document.getElementById("sure").textContent = ""
          document.getElementById("yes").textContent = "" 
          document.getElementById("No").textContent = ""
          document.getElementById("ask").style.display = "none"
    }
    function redo(){
        document.getElementById("sure").textContent = ""
          document.getElementById("yes").textContent = "" 
          document.getElementById("No").textContent = ""
          document.getElementById("ask").style.display = "none"
    }

    

    return(
        <div className="min-h-screen min-w-screen relative bg-slate-800 flex flex-col justify-center place-items-center">
          <div className='flex flex-col mx-2 loading place-self-center my-2 hidden' id='loading'><div className=' w-5 h-5 rounded-3xl bg-red-700'></div></div>
          <div id="terminal" className="absolute top-5 text-base p-2 rounded-lg hidden bg-white"></div>
          <button className="text-3xl absolute top-2 left-4 hover:shadow-md hover:shadow-white hover:-translate-x-2" onClick={()=>navigate('/try')}>⬅️</button>
          <div className='my-5 hidden z-10 absolute top-5 bg-slate-500 p-2 rounded-md' id="ask">
            
            <div className='bg-white rounded-md p-1' id='sure'></div>

            <button id='yes' className='bg-white border-2 border-black h-fit w-fit my-2 mx-2 rounded-md' onClick={()=>deleteNote()}></button>
            <button id='No' className='bg-white border-2 border-black h-fit w-fit rounded-md my-2' onClick={()=>redo()}></button>
          
          </div>

          <div className="bg-white border-2 relative show overflow-scroll border-black rounded-md p-10">
            
            <button className=' top-1 right-1 absolute overflow-visible bg-white border-2 border-black hover:shadow-md hover:shadow-slate-950 hover:bg-slate-500 text-base' onClick={()=>sure(location.state.title)}>delete</button>
            <div className="text-sm md:text-base lg:text-lg w-fit h-fit whitespace-pre" id="title" contentEditable="true">{location.state.title}</div>
            <br/><br/>
            <div className="text-base md:text-lg lg:text-xl  w-fit h-fit whitespace-pre inline-block" id="text" contentEditable="true">{location.state.data}</div>
            <button className='w-10 h-8 bg-white absolute hover:bg-slate-500 hover:shadow-md hover:shadow-slate-950 rounded-md border-2 border-black right-1 bottom-1' onClick={()=>Editnote()}>edit</button>
          
          </div>
            

            
        </div>
    )
}
export default Showing