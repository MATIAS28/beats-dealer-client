import { Link, useLocation } from 'react-router-dom'
import '../../assets/css/navbar.css'
import { MagnifyingGlassIcon, UserIcon, ShoppingCartIcon, HomeIcon, HeartIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { useSelector, useDispatch} from 'react-redux'
import { logOut } from "../../redux/slices/user"


function Navbar({setSearch, setExpand}){
    const params = useLocation().pathname
    const {user} = useSelector((state) => state.user)
    const {cart} = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    console.log(params)

    return(
        <nav className="hidden md:flex flex-col h-screen bottom-0 bg-black w-24 p-2 tertiary z-30">
           <div className='flex flex-col mx-auto w-4/5 space-y-9 h-full'>

            <div className="flex justify-center items-center h-20">
                <Link className='flex justify-center drop-shadow-lg primary rounded' to='/'>
                <img src="/logo.png" className="w-12 h-12" alt="" />
                </Link>
            </div>

            <div className='flex justify-center items-center h-3/5'>

            <div className="space-y-9 h-2/4">
                <Link to='/' className="flex items-center">
                    <HomeIcon className={`h-6 w-6
                    ${params == '/' ? 'primaryColor' : 'white'}`}/>
                </Link>

                <Link to='/user/favorites' className="flex items-center">
                    <HeartIcon className={`h-6 w-6
                    ${params == '/user/favorites' ? 'primaryColor' : 'white'}`}/>
                </Link>

                <Link to='/user/bought' className="flex items-center">
                    <ShoppingCartIcon className={`h-6 w-6
                    ${params == '/user/bought' ? 'primaryColor' : 'white'}`}/>
                </Link>
            </div>

            {/*buscador
                <div id='searchbar' className='flex items-center bg-white p-2 rounded-xl w-full'>
                    <MagnifyingGlassIcon style={{color: 'gray'}} className='w-5 h-5 mx-2'/>
                    <input  onChange={(e) => setSearch(e.target.value)} className="focus:outline-none bg-white w-full" type="text" placeholder="Search..."/>
                </div>
            
                <div className='flex flex-col'>

                    <button onClick={() => setExpand(prev => !prev)} className={ cart.length > 0 ?
                      'duration-300 bg-black coursor-pointer hover:shadow-lg flex items-center text-white px-2 py-1 rounded-3xl'
                      :
                      'duration-300 flex items-center coursor-pointer text-white px-2 rounded-3xl'
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
                */}

            </div>

            <button onClick={() => dispatch(logOut())}
            className="duration-200 flex justify-center">
                <ArrowLeftStartOnRectangleIcon className='white w-6 h-6'/>
            </button>

         </div>
        </nav>
    )
}


export default Navbar