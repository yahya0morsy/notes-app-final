import { useState,useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Outlet, Link, Navigate,redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Showing from './show';
import Circle from './circle.jsx'

function Notes(){
    const [z ,setz] =useState([])
    const [del ,setd] =useState()
    let navigate = useNavigate();
    function passing(thing){
      navigate('/display', {state:{title:thing.title,data:thing.data}})
    }
    update()
   function update(){
    useEffect(()=>{
      show()
      // Example Code
  }, [] )
   }

    
     async function Addnote(){
            await axios.post('https://note-back-mode2-teri.vercel.app/notes/save', {
              title:document.getElementById("title").value,
              data:document.getElementById("text").value,
              id:localStorage.getItem("id")
            })
            .then(function (response) {
             //console.log(response.data)
             terminal(response.data)
              
            })
            .catch(function (error) {
             // console.log(error),
              terminal(error.response.data)
            }).finally(()=>show())
    }
    async function show(){ 
        await axios.post("https://note-back-mode2-teri.vercel.app/notes/show",{id:localStorage.getItem("id") }).then(function(res){ setz(res.data) ,
          console.log(localStorage.getItem("id"))
          document.getElementById("user").textContent=res.data[0].owner}).catch(function (error) {
          console.log(error)
          terminal(error.response.data)
        })
    

  } 
  //https://note-back-nine.vercel.app
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
           //console.log(response.data)
           terminal(response.data)
          })
          .catch(function (error) {
            console.log(error)
          }).finally(()=>show())
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
        setd("")
    }
    function terminal(mass){
      document.getElementById("terminal").textContent =mass
    }



    return(
        <div className="min-h-screen min-w-screen relative bg-slate-800 flex flex-col">

           
          <div className='text-base absolute top-2 right-5 place-items-center flex flex-col z-10 text-white' ><p className='' id='user'> </p><Circle/></div>
           
          <div className='flex flex-row relative justify-start place-items-end'>

            <div className='mx-2 my-5 flex flex-col'>

              <div className='flex flex-row relative'>

                <button className='w-8 lg:w-10 h-6 lg:h-8 bg-slate-300 absolute bottom-0 right-0 hover:bg-slate-500 hover:shadow-md hover:shadow-slate-950 rounded-md border-2 border-black text-sm lg:text-base' onClick={                                                                                                                                                                                                            ()=>navigate('/adding', {state:{title:document.getElementById("title").value,data:document.getElementById("text").value}})}>👀</button>
                <p className='text-base md:text-lg lg:text-2xl text-white'>Add a note</p>

              </div>
            
              <div className='flex flex-col border-4 border-black w-48 md:w-52 lg:w-56 h-32 lg:h-36 rounded-lg'>

                <input type='text' id='title' className='w-40 md:w-44 lg:w-48 bg-slate-800 h-8 border-2 border-black mx-1 my-1 text-white rounded-lg' placeholder='title...'></input>
                <textarea id='text' className='border-2 w-40 md:w-44 lg:w-48 border-black bg-slate-800 text-white my-1 mx-1 resize-none rounded-lg' placeholder='type anything...'></textarea>
                <div className='flex flex-row relative mx-1 my-1'>

                  <div className='bg-white w-28 lg:w-32 h-6 lg:h-7  rounded-xl overflow-hidden text-xs lg:text-sm text-center' id='terminal'></div>
                  <button className='w-8 lg:w-10 h-6 lg:h-8 bg-white absolute bottom-0 right-0 hover:bg-slate-500 hover:shadow-md hover:shadow-slate-950 rounded-md border-2 border-black text-sm lg:text-base' onClick={()=>Addnote()}>add</button>
            
                </div>

              </div>
            </div>
            <div className='my-5 mx-2 hidden' id='ask'>
              <div className='bg-white rounded-lg p-2 text-xs md:text-base lg:text-base' id='sure'></div>
              <button id='yes' className='bg-white border-2 p-1 border-black h-fit w-fit my-2 mx-2 rounded-lg hover:bg-slate-500  text-xs md:text-base lg:text-base' onClick={()=>deleteNote()}></button>
              <button id='No' className='bg-white border-2 p-1 border-black h-fit w-fit rounded-lg my-2 hover:bg-slate-500  text-xs md:text-base lg:text-base' onClick={()=>redo()}></button>
            </div>
            


          </div>
            
            <div><button className='w-fit h-fit bg-white rounded-lg border-2 border-black mx-2 hover:bg-slate-500' onClick={()=>show()}>refresh my notes</button></div>
            <div className='flex flex-row flex-wrap'>
           {z.map(function(item ,index){
            return(
                <div className="flex flex-col relative w-40 h-24 md:w-52 md:h-32 lg:w-60 lg:h-36 overflow-hidden bg-slate-600 hover:bg-slate-400 hover:cursor-pointer  text-white border-4 rounded-lg border-black items-start mx-2 my-2" key={index}  >
                <div onClick={()=>passing(item)}>
                <div className="text-sm md:text-base lg:text-lg font-semibold mx-2 whitespace-pre">{item.title}</div>
                <div className='text-base md:text-lg lg:text-xl mx-2 whitespace-pre'>{item.data}</div>
                </div>
                <button className=' top-0 right-1 text-black absolute overflow-visible hover:shadow-md hover:shadow-slate-950 active:text-2xl hover:bg-white text-lg ' onClick={()=>sure(item.title)}>X</button>
                </div>

      )
    })}
  
    </div>
            


        </div>

    )
}
export default Notes
//var textarea = document.getElementById('text');
    //var modifiedText = textarea.value.replace(/\\n/g, String.fromCharCode(13, 10) )