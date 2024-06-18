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

           <div className='w-full quaternary my-4 rounded-lg duration-200 shadow-sm h-40 animate-pulse'>
            <div className="flex justify-between items-center p-4 border-b">
                <div className="md:flex justify-between items-center">
                    
                    <div className="bg-gray-200 animate-pulse w-1/4 h-5">
                    </div>

                    <div className="bg-gray-200 animate-pulse w-1/4 h-5">
                    </div>

                    <div className="bg-gray-200 animate-pulse w-1/4 h-5">
                    </div>

                    <div className="bg-gray-200 animate-pulse w-1/4 h-5">
                    
                    </div>

                </div>
            </div>
        </div>
        }
        </div>
    )
}