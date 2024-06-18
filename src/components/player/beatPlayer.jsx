import '../../assets/css/player.css'
import {HeartIcon, ShoppingCartIcon} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

import { useDispatch, useSelector } from 'react-redux'
import { addBeat } from '../../redux/slices/cart'
import { addLike } from '../../services/userService'

import Player from './player'
import { addOrDeleteLike } from '../../redux/slices/beatPlayer'


function BeatPlayer(){
    const currentBeat = useSelector((state) => state.beatPlayer)
    const navigate = useNavigate()

    const {token} = useSelector((state) =>  state.user)
    const {cart} = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    
    const [addCartButton, setAddCartButton] = useState()
    const {artist, img, genre, bpm, name, isFavorite} = currentBeat

    useEffect(() => {
        if (cart.some(obj => obj._id === currentBeat._id)) {
            setAddCartButton(true)
        }else{
            setAddCartButton(false)
        }
    }, [currentBeat, cart])

    const addBeatToCart = () => {
        dispatch(addBeat(currentBeat))
        setAddCartButton(true)
    }

    const handleLike = async () => {

        if(!token){
            navigate('/login')
        }

        try {
            await addLike(token, currentBeat._id)
            dispatch(addOrDeleteLike())
        } catch (e) {
            console.error(e)
        }
    }

    return(
        <div className='w-full h-fit md:h-20' style={{display: name ? 'flex' : 'none'}}>
            <div className='flex bg-black p-2 md:p-2 w-full'>
                
                <div className='md:flex justify-around items-center w-full'>

                <div className='hidden md:flex items-center w-full md:w-2/5'>
                <img src={img} className='h-14 w-16 rounded-lg border mr-2' alt=""/>
                    <div className=''>
                        <h4 className='text-green-500 text-sm font-semibold'>{artist?.artistName}</h4>
                        <h3 className='text-white text-xs font-light'>{name}</h3>
                    </div>
                </div>

                <div className="flex items-center justify-around h-16 md:h-fit w-full ">
                    <Player currentBeat={currentBeat}/>

                    <div className="w-1/4 flex items-center justify-end">
                    <button onClick={handleLike}>
                    <HeartIcon id='button' style={{color: isFavorite ? 'rgb(239 68 68)' : 'white'}} className='white w-6 h-6 mr-2' />
                    </button>

                    <button disabled={addCartButton} onClick={addBeatToCart}>
                    <ShoppingCartIcon id='button' style={{color: addCartButton ? 'rgb(34 197 94)' : 'white'}} className='w-6 h-6' />
                    </button>
                </div>
                </div>

                <div className='flex md:hidden flex items-center w-full md:w-1/4'>
                <img src={img} className='h-14 w-16 rounded-lg border mr-2' alt=""/>
                    <div className=''>
                        <h4 className='text-green-500 text-sm font-semibold'>{artist?.artistName}</h4>
                        <h3 className='text-white text-xs font-light'>{name}</h3>
                    </div>
                </div>

                </div>
            </div>
        </div>
    )
}

export default BeatPlayer