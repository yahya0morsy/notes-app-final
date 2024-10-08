import axios from 'axios';
import { useState,useEffect } from 'react'
import Passreset from './passreser';
import { useNavigate } from 'react-router-dom';

function Profile(){
    let navigate = useNavigate();
    const [user,setuser] = useState({})
    update()
    function update(){
        useEffect(()=>{
          getuser()
          // Example Code
      }, [] )
       }
      
    async function getuser(){ 
        await axios.post("https://note-back-mode2-teri.vercel.app/notes/user", {  key:localStorage.getItem("key") }).then(function(res){ setuser(res.data)}) 
        }
    


    return(
        <div className="min-h-screen min-w-screen bg-slate-800 flex flex-col justify-center relative place-items-center">
            <button className="text-3xl absolute top-2 left-4 hover:shadow-md hover:shadow-white hover:-translate-x-2" onClick={()=>navigate('/try')}>⬅️</button>
            <div className="border-4 border-black relative rounded-md profile flex flex-col ">
                <div className="text-base md:text-xl lg:text-2xl flex flex-row my-5 mx-2">username: {user.Username}</div>
                <div className="text-base md:text-xl lg:text-2xl flex flex-row my-5 mx-2">name: {user.DisplayedName}</div>
                <p className='place-self-center text-red-800 hover:cursor-pointer' onClick={()=>document.getElementById("passreset").style.display = "block"} >change password</p>

                <div className='hidden' id='passreset'><Passreset/></div>
                <button className='text-lg md:text-2xl lg:text-3xl text-red-600 absolute bottom-2 right-2 mx-1' onClick={()=>{localStorage.clear("id"),navigate('/', { replace: true })}}>sign out</button>

            </div>








        </div>




    )
}
export default Profile