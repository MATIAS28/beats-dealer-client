import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { logOut } from "../redux/slices/user"

import { getUser } from "../services/userService"
import UserBeats from "../components/user/userBeats"

import { UserOrders } from "../components/user/userOrders"

import { UserIcon, ShoppingCartIcon, HeartIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'


function UserPage(){
    const dispatch = useDispatch()
    const params = useParams().section
    const {token} = useSelector((state) => state.user)
    const navigate = useNavigate()
    const [user, setUser] = useState()
    const [selectButton, setSelectButton] = useState(0)
    
    const getUserData = async () => {
        try {
            const User = await getUser(token)
            setUser(User)
        } catch (e) {
            console.error(e)
            if (e.response.status == 401) {
                dispatch(logOut())
            }
        }
    }

    const handleLogOut = () => {
        dispatch(logOut())
        navigate('/')
    }

    useEffect(() => {

        if (!token) {
            navigate('/login')
        }else{
            getUserData()
        }

        console.log(params)
        
    }, [token])
    
    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <img className="w-52 bg-green-500 rounded-md animate-bounce" src="/logo.png" alt=""/>
            </div>
        )
    }
    
    return(
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <UserIcon className="white w-12 h-12 mr-2"/>
                    <div className="">
                    <h1 className="text-white text-lg  font-bold">{user.firstName+' '+user.lastName}</h1>
                    <h2 className="text-gray-200/50">{'@'+user.nickName}</h2>
                    </div>
                </div>

                <button className="md:hidden" onClick={handleLogOut}>
                    <ArrowLeftStartOnRectangleIcon className="white w-7 h-7"/>
                </button>

            </div>

            <div className="flex md:hidden items-center space-x-4">
                <Link className={`flex items-center px-3 py-2 rounded-3xl
                ${params == 'favorites' ? 'quaternary' : ''}`} to='/user/favorites'>
                    <HeartIcon className='white w-5 h-5 mr-2'/>
                    <span className="text-lg md:font-semibold text-white">Favoritos</span>
                </Link>

                <Link className={`flex items-center px-3 py-2 rounded-3xl
                ${params == 'bought' ? 'quaternary' : ''}`} to='/user/bought'>
                    <ShoppingCartIcon className='white w-5 h-5 mr-2'/>
                    <span className="text-lg md:font-semibold text-white">Comprados</span>
                </Link>
            </div>

            {params == "favorites" &&
            <UserBeats token={token} selectButton={selectButton} />
            }

            {params == "bought" &&
            <UserOrders token={token}/>
            }


        </div>
    )
}

export default UserPage