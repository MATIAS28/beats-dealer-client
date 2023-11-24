import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getUser } from "../services/userService"
import UserBeats from "../components/user/userBeats"

import { logOut } from "../redux/slices/user"
import { useNavigate } from "react-router-dom"
import { UserOrders } from "../components/user/userOrders"


function UserPage(){
    const dispatch = useDispatch()
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

    useEffect(() => {

        if (!token) {
            navigate('/login')
        }else{
            getUserData()
        }
        
    }, [token])
    
    if (!user) {
        return (
            <div className="flex justify-center items-center bg-green-500 min-h-screen">
                <img className="animate-bounce" src="/logo.png" alt=""/>
            </div>
        )
    }

    const handleLogOut = () => {
        dispatch(logOut())
        navigate('/')
    }
    
    return(
        <div className="">
            <div className="bg-black flex justify-between items-center p-3">
                <div className="">
                    <h1 className="text-white text-3xl  font-bold">{user.firstName+' '+user.lastName}</h1>
                    <h2 className="text-gray-200/50 text-lg md:text-2xl">{'@'+user.nickName}</h2>
                </div>

                <button onClick={handleLogOut}
                className="bg-black text-xs md:text-sm duration-200 text-white p-2 rounded-lg shadow shadow-red-500/50 hover:shadow-red-600">
                    Cerrar sesión
                </button>

            </div>

            <div className="flex bg-black pt-3 px-2">

                <button id={selectButton == 0 ? 'bg' : ''} onClick={() => setSelectButton(0)}
                className="p-2 rounded-t text-sm md:text-xl font-semibold text-green-400 mr-2">
                    Favoritos
                </button>

                <button id={selectButton == 1 ? 'bg' : ''} onClick={() => setSelectButton(1)}
                className="p-2 rounded-t text-sm md:text-xl font-semibold text-green-400">
                    Comprados
                </button>

                <button id={selectButton == 2 ? 'bg' : ''} onClick={() => setSelectButton(2)}
                className="p-2 rounded-t text-sm md:text-xl font-semibold text-green-400">
                    Recibos
                </button>

            </div>

            {selectButton == 0 || selectButton == 1 ?
            <UserBeats token={token} selectButton={selectButton} />
            :
            <UserOrders token={token}/>
            }

        </div>
    )
}

export default UserPage