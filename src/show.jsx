import "./notes"
import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Showing(){
     let navigate = useNavigate();
     
    const [del ,setd] =useState()
    const location = useLocation();
    function terminal(mess){
        document.getElementById("terminal").style.display = 'block'
         document.getElementById("terminal").textContent = mess
    }
    async function Editnote(){
        await axios.patch('https://note-back-mode2-teri.vercel.app/notes/edit', {
          title:location.state.title,
          Ntitle:document.getElementById("title").textContent,
          data:document.getElementById("text").textContent,
          id:localStorage.getItem("id")
        })
        .then(function (response) {
         console.log(response.data)
         terminal(response.data)
        })
        .catch(function (error) {
          console.log(error)
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
        axios.post('https://note-back-mode2-teri.vercel.app/notes/delete',{
            title:del ,
            id:localStorage.getItem("id")
          })
          .then(function (response) {
          
           terminal(response.data)
          })
          .catch(function (error) {
            console.log(error)
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

          <div id="terminal" className="absolute top-5 text-base p-2 rounded-lg hidden bg-white"></div>
          <button className="text-3xl absolute top-2 left-4 hover:shadow-md hover:shadow-white hover:-translate-x-2" onClick={()=>navigate('/try')}>⬅️</button>
          <div className='my-5 hidden z-10 absolute top-5 bg-slate-500 p-2 rounded-md' id="ask">
            
            <div className='bg-white rounded-md p-1' id='sure'></div>

            <button id='yes' className='bg-white border-2 border-black h-fit w-fit my-2 mx-2 rounded-md' onClick={()=>deleteNote()}></button>
            <button id='No' className='bg-white border-2 border-black h-fit w-fit rounded-md my-2' onClick={()=>redo()}></button>
          
          </div>

          <div className="bg-white border-2 relative show border-black rounded-md p-10">
            
            <button className=' top-1 right-1 absolute overflow-visible bg-white border-2 border-black hover:shadow-md hover:shadow-slate-950 hover:bg-slate-500 text-base' onClick={()=>sure(location.state.title)}>delete</button>
            <div className="text-3xl w-fit h-fit whitespace-pre" id="title" contentEditable="true">{location.state.title}</div>
            <br/><br/>
            <div className="text-4xl w-fit h-fit whitespace-pre inline-block" id="text" contentEditable="true">{location.state.data}</div>
            <button className='w-10 h-8 bg-white absolute hover:bg-slate-500 hover:shadow-md hover:shadow-slate-950 rounded-md border-2 border-black right-1 bottom-1' onClick={()=>Editnote()}>edit</button>
          
          </div>
            

            
        </div>
    )
}
export default Showing