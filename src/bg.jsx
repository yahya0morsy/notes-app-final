import { useState } from 'react'

import axios from 'axios';
function Bgg() {
    const [y ,sety] =useState()
    const [x ,setx] =useState()
    const [z ,setz] =useState(["1","2","3"])
  
  axios.get("http://localhost:8000/session").then((res)=>{sety(res.data)})
  function submit(){axios.post('http://localhost:8000/log/auth', {
    username:document.getElementById("user").value,
    password:document.getElementById("pass").value
  }, { withCredentials: true })
  .then(function (response) {
    setx(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });}
  
  function show(){ axios.get("http://localhost:8000/notes/show", { withCredentials: true }).then(function(res){ setz(res.data) ,console.log(res.data)})

  }
 
  return(
    <div className='w-screen h-screen text-3xl bg-gradient-to-r from-slate-300 to-slate-600 '>
    <div className=" text-blue-600 my-2 ">username<input type='text' id="user" className='w-96 bg-slate-600 border-2 border-black'></input></div>
    <div>password<input type='text' id="pass" className='w-96 my-2 bg-slate-600 border-2 border-black'></input></div>
    <button onClick={()=>show()}>ss</button>
    <button onClick={()=>submit()}>submit</button>
    
   <div>{y},{x}</div>
   <div className='flex flex-row'>
    {z.map(function(item){
      return(
      <div className="flex flex-col bg-yellow-600 border-2 border-black items-start mx-2 shadow-lg shadow-white">
      <div className="text-2xl font-semibold">{item.title}</div>
      <div className='text-4xl'>{item.data}</div>
      </div>

      )
    })}
  
    </div>
    </div>
  )
}
export default Bgg