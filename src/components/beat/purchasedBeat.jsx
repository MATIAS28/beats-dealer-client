
export const PurchasedBeat = ({beat}) => {
    const {name, artist, unit_price, img} = beat
    return(
        <div className="flex justify-between items-center my-2 p-2 duration-200">
            <div className="flex items-center">
                <div>
                    <img src={img.url} className="w-9 h-9 rounded-full mr-2" />
                </div>

                <div>
                    <p className="text-sm md:text-lg">{name}</p>
                    <p className="text-sm font-semibold text-green-500">{artist}</p>
                </div>
            </div>

            <div>
                <p className="text-xs md:text-sm font-semibold">${unit_price}</p>
            </div>

        </div>
    )
}