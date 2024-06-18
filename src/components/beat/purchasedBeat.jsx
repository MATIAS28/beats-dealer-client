
export const PurchasedBeat = ({beat}) => {
    const {name, artist, unit_price, img} = beat
    return(
        <div className="flex justify-between items-center my-2 p-2 duration-200">
            <div className="flex items-center">
                <div>
                    <img src={img.url || img} className="w-9 h-9 rounded-md mr-2" />
                </div>

                <div>
                    <p className="font-light text-white">{name}</p>
                    <p className="text-xs font-semibold text-gray-200">#{artist}</p>
                </div>
            </div>

            <div>
                <p className="text-xs md:text-sm font-semibold text-white">${unit_price}</p>
            </div>

        </div>
    )
}
