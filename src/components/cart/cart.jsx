import '../../assets/css/cart.css'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { useSelector } from "react-redux"
import { BeatCart } from './beatCart';
import { Link } from 'react-router-dom';


const Cart = ({setExpand, expand}) => {
    const {cart, total} = useSelector((state) => state.cart)
    const {user} = useSelector((state) => state.user)

    return(
        <aside id={expand ? 'slide-in' : 'slide-out'} className="fixed p-2 z-20 cart top-16 flex jutify-center bg-black rounded-b-xl">
            
            <div className="w-full mt-1">

                <div className="w-full">

                    <ul className={cart.length > 2 ? 'flex flex-col overflow-y-scroll h-[12rem] space-y-7 my-4' : 'flex flex-col space-y-7 my-4'}>
                    {cart.length > 0 ?
                        cart.map((beat, i) => {
                            return(
                                <BeatCart key={i} beat={beat}/>
                            )
                        })
                        
                        :

                        <div className='flex justify-center items-center h-20'>
                            <div className='flex items-center justify-center p-1 bg-gray-200 rounded-3xl'>
                                <ExclamationCircleIcon className='w-6 mr-2' style={{color: 'black'}}/>
                                <h2 className='mr-2 text-sm text-black text-center'>El carrito está vacío</h2>
                            </div>
                        </div>
                    }
                    </ul>

                    <div className='flex justify-between w-full my-2'>
                        <p className='text-white'>Cantidad: {cart.length}</p>
                        <p className='text-white'>Total: ${total}</p>
                    </div>

                    <Link onClick={() => setExpand(false)} to={user ? "/checkout" :"/login"} className="bg-green-500 bottom-0 w-full flex justify-center items-center rounded-b-xl py-2">
                        <p className="text-white font-semibold text-xl">comprar</p>
                    </Link>
                </div>

            </div>
        </aside>
    )
}

export default Cart