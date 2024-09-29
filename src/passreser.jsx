import axios from 'axios';
function Passreset(){
    const currentpass = document.getElementById("pass0")
    const newpass1 = document.getElementById("pass1")
    const newpass2 = document.getElementById("pass2")


    function terminal(thing){
         document.getElementById("mess").style.display="block"
            document.getElementById("mess").textContent = thing
  
    }
    
   async function changepassword(){
    if(newpass1.value.length <6){
        terminal("password should be more than 5 characters");
      }
    else if(newpass1.value!==newpass2.value){
           terminal("passwords did not match")
        }
    else{
            
            await axios.patch('https://note-back-mode2-teri.vercel.app/notes/user/changepass', {
                currentPassword:currentpass.value,
                newPassword:newpass2.value,
                key:localStorage.getItem("key")
              })
              .then(function (response) {
               console.log(response.data)
               terminal(response.data)
              })
              .catch(function (error) {
                console.log(error)
              })
        }
     
    }
    return(
         <div className="flex flex-col">
            <div className="flex flex-col my-2 mx-2" ><p>current password:</p><input id='pass0' className="bg-slate-300 w-52" ></input></div>
            <div className="flex flex-col my-2  mx-2" ><p>new password:</p><input id='pass1' className="bg-slate-300 w-52"></input></div>
            <div className="flex flex-col my-2  mx-2"><p>confirm new password:</p><input  id='pass2' className="bg-slate-300 w-52 "></input></div>
            <button  className="bg-slate-500 border-2 border-black rounded-lg w-fit place-self-center hover:bg-blue-600 active:bg-blue-600" onClick={()=>changepassword()}>change</button>
            <div id='mess' className='hidden place-self-center'></div>




         </div>


    )
}
export default Passreset