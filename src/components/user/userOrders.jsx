import { useEffect, useState } from "react";
import { getOrders } from "../../services/userService";
import { NotFound } from "../notFound";
import { Order } from "./order";



export const UserOrders = ({token}) => {
    const [userOrders, setUserOrders] = useState(null)

    const getUserOrders = async () => {
    
        try {
            const orders = await getOrders(token)
            setUserOrders(orders)
        } catch (e) {
            console.error(e);
        }
    }  

    useEffect(() => {
        getUserOrders()
    }, [])

    if (userOrders?.length == 0) {
        return <NotFound name={'ordenes'}/>
    }

    return(
        <div className="flex justify-center">

        {userOrders && userOrders.length > 0  ?

            <div className="w-full p-2">

                 {userOrders.map((order, i) => {
                    return <Order key={i} order={order}/>
                })}

                

            </div>

            :

            <div className="flex justify-center items-center min-h-screen">
                <img className="animate-bounce" src="/logo.png" alt=""/>
            </div>
        }
        </div>
    )
}