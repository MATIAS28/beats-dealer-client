import {HeartIcon, ShoppingCartIcon, XMarkIcon, PlayIcon} from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import { addBeat } from '../../redux/slices/cart'
import { useEffect, useState } from 'react'
import { addLike } from '../../services/userService'
import { getBeatToPlay } from '../../services/beatServices'

export const Beat = ({beatId, close, user, token}) => {
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
        <div className="duration-200 rounded-lg w-full">
            
        <div className="relative z-10 flex justify-end items-center">
            <button className="close m-2 absolute top-0" onClick={close}>
            <XMarkIcon className='w-7 h-7' style={{color: 'rgb(220 38 38)'}}/>
            </button>
        </div>
        
        <div className="content p-2">
        
        <div className=''>

            <div className='relative w-full flex justify-center my-3'>
                <img src={beat.img.url} className="h-64 md:h-72 w-full rounded-t-lg" alt="" />
                <img src={beat.artist.imgUrl} className='bg-black p-2 absolute bottom-[-2.2rem] rounded-full w-24'/>
            </div>

            <div className='mt-7 p-2'>
                <h2 className="text-white text-center text-xl text-green-500">{beat.artist.artistName}</h2>
                <h4 className="text-white text-xl font-semibold text-center font-xl">{beat.name}</h4>
            </div>
        </div>

        <div className="flex justify-center items-center my-1">
                <p className="text-slate-300 font-sm mr-2">{beat.genre}</p>
                <p className="flex items-center bg-blue-700 text-white text-xs font-bold px-2 rounded-full">{beat.bpm} BPM</p>
        </div>

        <div className='flex justify-center items-center my-4'>
            <button className='flex items-center mr-2 p-2 rounded-full text-white' onClick={handleLike}>
                <HeartIcon className='h-7 w-7 mx-2' style={{color: likeButton ? 'rgb(239 68 68)' : 'white'}}/> {beat.nLikes}
            </button>

            <button onClick={addCartButton} disabled={cart.some(obj => obj._id === beat._id)} className='flex items-center mr-2 p-2 rounded-full'>
                <ShoppingCartIcon style={{color: cart.some(obj => obj._id === beat._id) ? 'rgb(34 197 94)' : 'white'}} className='h-7 w-7'/>
            </button>

            <a target="_blanck" href={beat.artist.youtubeChannel} role="button" 
            className='flex justify-center bg-red-500 w-14 rounded-lg p-1'>
                <PlayIcon style={{color: 'white'}} className='h-6 w-6'/>
            </a>
        </div>

        <div className="flex-col justify-center w-full overflow-y-scroll h-24 p-2">
        <div className='bg-red-500 w-full rounded shadow-lg p-2 my-2 animate-pulse'>
                <p className='text-lg md:text-xl font-semibold text-white'>Aviso</p>
                <p className='text-sm font-semibold text-white'>
                Al realizar el pago por este beat, no adquieres los derechos ni la propiedad del mismo, 
                sino que estás contribuyendo al respaldo continuo de nuestra plataforma.
                </p>
        </div>

            <div className='border border-gray-600 w-full rounded shadow-lg p-2'>
                <p className='text-sm font-semibold text-white'>Archivos</p>
                <p className='text-lg font-semibold text-gray-500'>
                    MP3+Masterizado+Mezclado
                </p>
            </div>
        </div>
     </div>
    </div>
    )
}