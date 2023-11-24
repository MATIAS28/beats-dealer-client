import { Link } from 'react-router-dom'
import '../../assets/css/navbar.css'
import {MagnifyingGlassIcon, UserIcon, ShoppingCartIcon} from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'

function Navbar({setSearch, setExpand}){
    const {user} = useSelector((state) => state.user)
    const {cart} = useSelector((state) => state.cart)

    return(
        <nav className="fixed top-0 w-full bg-green-500 z-30 p-0 md:p-2">
           <div className='flex items-center'>
           <div className="rounded-full m-2 md:m-0">
                <Link className='drop-shadow-lg' to='/'>
                <img src="/logo.png" id='logo' alt="" />
                </Link>
           </div> 

            <div className='w-full flex justify-between m-0 md:mx-4'>
                <div id='searchbar' className='flex items-center bg-white p-2 rounded-xl w-full'>
                    <MagnifyingGlassIcon style={{color: 'gray'}} className='w-5 h-5 mx-2'/>
                    <input  onChange={(e) => setSearch(e.target.value)} className="focus:outline-none bg-white w-full" type="text" placeholder="Search..."/>
                </div>

                {/*User buttons*/}
                <div className='flex items-center'>
                
                  <div className='flex items-center'>

                    <button onClick={() => setExpand(prev => !prev)} className={ cart.length > 0 ?
                      'duration-300 bg-black coursor-pointer hover:shadow-lg flex items-center mx-2 text-white px-2 py-1 rounded-3xl'
                      :
                      'duration-300 flex items-center coursor-pointer mx-2 text-white px-2 rounded-3xl'
                    }>
                    
                    {cart.length > 0 && 
                    <span className='text-lg px-1 cartNumber'> {cart.length} </span>
                    }
                    
                    
                    <ShoppingCartIcon className='white w-7 h-7'/>
                    

                    </button>

                    {user ?

                    <Link to='/user'>
                    <UserIcon className='white duration-150 hover:scale-105 w-7 h-7 mx-2'/>
                    </Link>

                    :

                    <Link to='/login' id='login-button' className='bg-black text-xs md:text-sm text-white rounded-lg mx-1 p-2 font-bold'>
                    Iniciar Sesión
                    </Link>

                    }
                    
                  </div>
          
                </div>
            </div>
           </div>
        </nav>
    )
}


export default Navbar