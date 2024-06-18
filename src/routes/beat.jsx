import {  ShoppingCartIcon, XMarkIcon, PlayIcon } from '@heroicons/react/24/outline'
import { HeartIcon } from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addBeat } from '../redux/slices/cart'
import { useEffect, useState } from 'react'
import { addLike } from '../services/userService'
import { getBeatToPlay } from '../services/beatServices'

function BeatPage ({user}) {
    const {token} = useSelector((state) => state.user)
    const beatId = useParams().id
    const [likeButton, setLikeButton] = useState(null)
    const [beat, setBeat] = useState(null)
    const {cart} = useSelector(state => state.cart)
    const dispatch = useDispatch()

    useEffect(() => {
        const getBeat = async () => {
            try {
                const Beat = await getBeatToPlay(beatId, user) 
                setLikeButton(Beat.isFavorite)
                setBeat(Beat)
            } catch (e) {
                console.error(e)
            }
        }

        getBeat()
    }, [])

    const addCartButton = () => {
        dispatch(addBeat({...beat, img: beat.img.url}))
    }

    const handleLike = async () => {
        try {
            await addLike(token, beatId)
            setLikeButton(prev => !prev)
            if (likeButton) {
                setBeat({...beat, nLikes: beat.nLikes-1})
            }else{
                setBeat({...beat, nLikes: beat.nLikes+1})
            }
        } catch (e) {
            console.error(e)
        }
    }

    if (!beat) {
       return (
       <div className="flex justify-center items-center bg-green-500 rounded-lg">
       <img className="animate-pusle" src="/logo.png" alt=""/>
       </div>)
    }

    return(
        <div className="duration-200 rounded-lg lg:mx-auto lg:w-4/5">
        
        <div className="p-2">
        
        <div className='md:flex justify-center'>

            <div className="flex md:block justify-center mb-4 md:m-0 md:mr-4 w-fit">
                <img src={beat.img.url} className="h-72 w-full rounded-md mr-4" alt="" />
            </div>

            <div className='w-full space-y-4'>
                <div className="flex justify-between items-center">
                    <p className="white mr-2 uppercase">{beat.genre}</p>
                    <p className="flex items-center tertiary text-white text-sm font-bold px-3 py-1 rounded-full">{beat.bpm} BPM</p>
                </div>
                <h4 className="text-white text-3xl font-semibold font-xl">{beat.name}</h4>
                <div className="flex items-center">
                    <img src={beat.artist.imgUrl} className='bg-black rounded-full w-6 mr-2'/>
                    <h2 className="text-white text-center text-lg text-green-500">{beat.artist.artistName}</h2>
                </div>

                <div className='flex justify-between items-center my-4 space-x-4'>
                    <div className="flex items-center space-x-4">
                        <button onClick={addCartButton} disabled={cart.some(obj => obj._id === beat._id)} 
                        className={`h-12 flex items-center rounded-3xl px-2 lg:px-3 py-1 lg:py-2 duration-100
                        ${cart.some(obj => obj._id === beat._id) ? 'primary text-white' : 'bg-transparent border-2 white'}`}>
                            <ShoppingCartIcon className='h-5 w-5 mr-2'/>
                            <span className="text-xs lg:text-base">Añadir al carrito</span>
                        </button>

                        <button className={`h-12 flex items-center rounded-3xl px-2 lg:px-3 py-1 lg:py-2
                        ${likeButton ? 'bg-green-500' : 'bg-transparent border-2 white'}`} onClick={handleLike}>
                            <HeartIcon className='h-5 w-5'/>
                        </button>
                    </div>

                    <a target="_blanck" href={beat.artist.youtubeChannel} role="button" 
                    className='h-12 w-24 flex justify-center items-center bg-red-500 rounded-lg px-5 py-1'>
                        <PlayIcon className='fill-white h-5 w-5'/>
                    </a>
                </div>

                <div className='border border-gray-600 w-full rounded shadow-lg p-2'>
                <p className='text-sm font-semibold text-white'>Archivos</p>
                <p className='text-lg font-semibold text-gray-500'>
                    MP3+Masterizado+Mezclado
                </p>
                </div>
            </div>
        

        

        </div>

        <div className='bg-red-500 w-full rounded shadow-lg p-2 my-2 animate-pulse'>
            <p className='text-sm font-semibold text-white'>Aviso</p>
            <p className='font-light text-white'>
            Al realizar el pago por este beat, no adquieres los derechos ni la propiedad del mismo, 
            sino que estás contribuyendo al respaldo continuo de nuestra plataforma.
            </p>
        </div>
     </div>
    </div>
    )
}

export default BeatPage