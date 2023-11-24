import { useSelector } from "react-redux"
import { BeatCart } from "../components/cart/beatCart"
import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import '../assets/css/paypage.css'
import { getPayLink } from "../services/userService"
import toast, { Toaster } from 'react-hot-toast';

function PayPage(){
    const {cart, total} = useSelector((state) => state.cart)
    const {token} = useSelector((state) => state.user)
    const [check, setCheck] = useState(false)
    const [payLink, setPayLink] = useState()
    const navigate = useNavigate()

    useEffect(() => {
     if(payLink){
        window.location.href = payLink
     }

     if(!token){
        navigate('/')
     }

     if(cart.length === 0 || !token){
        setTimeout(() => {
            navigate('/')
        }, 3000);
     }

    }, [cart, payLink])
    

    const handleGetPayLink = async () => {
        toast.loading('Waiting...', {
            position: 'bottom-center'})

        try {
            const link = await getPayLink(token, cart, total)
            setPayLink(link.data.paymentLink)
        } catch (e) {
            toast.dismiss()
            toast.error("Hubo un error al generar el link de pago", {
                duration: 1800,
                position: 'bottom-center'})
            console.error(e)
        }
    }

    if (cart.length === 0) {
        return(
            <div className="flex justify-center items-center min-h-screen ">
                <div className="bg-gray-300">
                <h1 className="text-3xl rounded p-2">No tienes beats en el carrito</h1>
                <p className="text-xl rounded font-semibold p-2">Seras redirigido a la pagina principal</p>
                </div>
            </div>
        )
    }

    return(
        <div className="bg-green-500 flex justify-center p-0 m-0 min-h-screen shadow-xl">

        <Toaster/>

         <div id="paypage-container" className="bg-black rounded-lg mb-12">

         <div className="relative top-7 flex justify-center flex-wrap-reverse">
                <img className="absolute w-20 h-20 bg-green-500 rounded-full" src="/logo.png" alt="" />
         </div>

            <div className="data">
                <div className="h-[16rem]">
                    <div className="flex justify-between items-center">
                    <h1 className="text-white text-2xl font-semibold">Resumen del carrito</h1>
                    <p className="text-green-500 text-xl font-semibold">Beats({cart.length})</p>
                    </div>

                    <ul className={cart.length > 2 ? 'flex flex-col overflow-y-scroll h-[12rem] my-4' : 'flex flex-col my-4'}>
                        {cart && cart.map((beat, i) => {
                            return(
                                <BeatCart key={i} beat={beat}/>
                            )
                        })}
                    </ul>
                </div>

                <div className="my-2">
                    <div className="flex justify-between shadow-lg p-2 rounded-lg items-center">
                    <p className="text-white text-lg font-semibold">Total</p>
                    <p className="text-white text-lg font-semibold">${total}</p>
                    </div>
                </div>

                <div className='bg-red-500 w-full rounded shadow-lg p-2 my-2 animate-pulse'>
                    <p className='text-lg md:text-xl font-semibold text-white'>Aviso</p>
                    <p className='text-sm font-semibold text-white'>
                    Al realizar el pago por este beat, no adquieres los derechos ni la propiedad del mismo, 
                    sino que estás contribuyendo al respaldo continuo de nuestra plataforma.
                    </p>
                </div>

                <div className="flex items-start my-3 p-2">
                    <input defaultChecked={check} onChange={() => setCheck(prev => !prev)} type="checkbox" className="cursor-pointer w-6 h-6"/>
                    <label className="ml-2 text-sm font-medium text-white">
                        Usted al presionar el botón de compra acepta que, está brindando su apoyo a nuestra 
                        plataforma, y no adquirirá ningún derecho ni autorización para utilizar el beat.
                    </label>
                </div>

                <button disabled={!check} onClick={handleGetPayLink} 
                className="bg-blue-700 disabled:bg-blue-700/50 text-white p-2 w-full rounded-lg font-semibold">
                    Comprar
                </button>
            </div>
         </div>
        </div>
    )
}

export default PayPage