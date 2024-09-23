import { useNavigate } from 'react-router-dom';
function Circle(){
    let navigate = useNavigate();
    return(
        <div className='text-3xl lg:text-5xl hover:cursor-pointer hover:translate-x-1 hover:translate-y-1 duration-100 active:text-3xl lg:active:text-5xl'
            onClick={()=>navigate('/profile')} >🪪</div>
    )
}
export default Circle