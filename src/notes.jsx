import { useState } from 'react'

import axios from 'axios';
function Notes(){
    const [z ,setz] =useState([])
    const [del ,setd] =useState()
     async function Addnote(){
            await axios.post('https://note-back-nine.vercel.app/save', {
              title:document.getElementById("title").value,
              data:document.getElementById("text").value
            }, { withCredentials: true })
            .then(function (response) {
             console.log(response.data)
              
            })
            .catch(function (error) {
              console.log(error)
            })
    }
    function show(){ 
        axios.get("https://note-back-nine.vercel.app/notes/show", { withCredentials: true }).then(function(res){ setz(res.data) ,console.log(res.data)})

  } 
    function sure(x){
        document.getElementById("sure").textContent = "are you sure you want to delete this?"
        document.getElementById("yes").textContent = "yes" 
        document.getElementById("No").textContent = "No"
        setd(x)

    }
   function deleteNote(){
        axios.post('https://note-back-nine.vercel.app/delete',{
            title:del 
          }, { withCredentials: true })
          .then(function (response) {
           console.log(response.data)
            
          })
          .catch(function (error) {
            console.log(error)
          })
          document.getElementById("sure").textContent = ""
          document.getElementById("yes").textContent = "" 
          document.getElementById("No").textContent = ""

    }
    function redo(){
        document.getElementById("sure").textContent = ""
          document.getElementById("yes").textContent = "" 
          document.getElementById("No").textContent = ""
    }



    return(
        <div className="min-h-screen min-w-screen bg-gradient-to-r from-amber-800 to-amber-950 flex flex-col">
            <div className='flex flex-row justify-start place-items-center'>
            <div className='mx-10 my-5 flex flex-col'>
            <p className='text-2xl'>Add note</p>
            <input type='text' id='title' className='w-48'></input>
            <textarea id='text' className='border-2 w-48 border-black bg-slate-400'></textarea>
            <button className='w-10 h-8 bg-white hover:bg-slate-500 hover:shadow-md hover:shadow-slate-950 rounded-md border-2 border-black' onClick={()=>Addnote()}>add</button>
            </div>
            <div className='my-5'><div className='bg-white' id='sure'></div>
            <button id='yes' className='bg-white border-2 border-black h-fir w-fir my-2 mx-2 rounded-md' onClick={()=>deleteNote()}></button>
            <button id='No' className='bg-white border-2 border-black h-fir w-fir rounded-md my-2' onClick={()=>redo()}></button>
            </div>


            </div>
            
            <div><button className='w-fir h-fit bg-white' onClick={()=>show()}>refresh my notes</button></div>
            <div className='flex flex-row flex-wrap'>
           {z.map(function(item ,index){
            return(
                <div className="flex flex-col w-fit bg-yellow-200 border-2 border-black items-start mx-2 my-2" key={index}>
                <div className="text-base font-semibold">{item.title}</div>
                <div className='text-2xl'>{item.data}</div>
                <button className='w-fit h-fit mx-1 my-1  hover:bg-slate-500 hover:shadow-md hover:shadow-slate-950 rounded-md border-2 border-black text-sm bg-white' onClick={()=>sure(item.title)}>delete</button>
                </div>

      )
    })}
  
    </div>
            


        </div>

    )
}
export default Notes