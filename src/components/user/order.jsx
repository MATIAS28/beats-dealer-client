import { useState } from "react"
import { PurchasedBeat } from "../beat/purchasedBeat";

export const Order = ({order}) => {
    const {_id, createAt, totalPrice, products} = order
    const [showPurchasedProducts, setShowPurchasedProducts] = useState(false)

    return(
        <div className='w-full quaternary my-4 rounded-lg duration-200 shadow-sm'>
            <div className="flex justify-between items-center p-4 border-b">
                <div className="md:flex justify-between items-center">
                    <div className="">
                        <h4 className="text-sm font-semibold text-white">Numero de orden</h4>
                        <p className="text-indigo-200 text-xs md:text-sm font-semibold">#{_id}</p>
                    </div>

                    <div className="my-2 md:my-0 md:mx-4">
                        <h4 className="text-sm font-semibold text-white">Fecha de compra</h4>
                        <p className="text-gray-200 text-xs md:text-sm font-semibold">{createAt}</p>
                    </div>

                    <div className="my-2 md:my-0 md:mx-4">
                        <h4 className="text-sm font-semibold text-white">Total</h4>
                        <p className="text-gray-200 text-xs md:text-sm font-semibold md:text-center">{totalPrice}</p>
                    </div>

                    <div className="my-2 md:my-0 md:mx-4">
                        <h4 className="text-sm font-semibold text-white">Beats</h4>
                        <p className="text-gray-200 text-xs md:text-sm font-semibold md:text-center">{products.length}</p>
                    </div>

                </div>
            </div>

            <div className="flex-col p-2">
            {products.map((beat, i) => {
                return <PurchasedBeat beat={beat} key={i}/>
                })
            }
            </div>
        </div>
)
}



