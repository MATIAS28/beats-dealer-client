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
        <div className='justify-center' style={{display: name ? 'flex' : 'none'}}>
            <div id='player-conatiner' className='flex justify-between bg-black py-2 px-1 md:p-2 rounded-xl shadow-lg border border-2 border-green-500'>
                
                <Player currentBeat={currentBeat}/>

                <div id='beat-info' className='flex  items-center mx-2 w-full'>
                <div className='mr-2'>
                <img src={img} className='h-12 w-16 rounded-lg' alt=""/>
                </div>

                <div className='w-full'>
                    <h3 className='text-white text-sm'>{name}</h3>
                    <h4 className='text-green-500 text-sm font-semibold'>{artist?.artistName}</h4>
                </div>

                <button onClick={handleLike}>
                <HeartIcon id='button' style={{color: isFavorite ? 'rgb(239 68 68)' : 'white'}} className='white w-6 h-6 mr-2' />
                </button>

                <button disabled={addCartButton} onClick={addBeatToCart}>
                <ShoppingCartIcon id='button' style={{color: addCartButton ? 'rgb(34 197 94)' : 'white'}} className='w-6 h-6' />
                </button>

                </div>
            </div>
        </div>
    )
}

export default BeatPlayer