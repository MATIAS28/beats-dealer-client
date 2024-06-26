import { useDispatch } from "react-redux"
import { removeBeat } from "../../redux/slices/cart"
import { XMarkIcon } from "@heroicons/react/24/outline"


export const BeatCart = ({beat}) => {
    const {img, name, artist, unit_price} = beat
    const dispatch = useDispatch()

    const handleRemoveBeat = () => {
        dispatch(removeBeat(beat))
    }
    return(
        <li className="flex items-center justify-between">
            <div className="flex items-center w-4/5">
                <img className="w-12 h-12 rounded-full mr-3" src={img.url || img } alt="" />
                <div>
                <h2 className="text-sm text-white font-light">{name}</h2>
                <p className="text-sm md:text-base text-green-500">{artist?.artistName}</p>
                </div>
            </div>

            <div className="flex items-center">
                <p className="text-white text-sm">${unit_price}</p>
                <button onClick={handleRemoveBeat}>
                    <XMarkIcon className="white w-7 h-7 ml-2"/>
                </button>
            </div>
        </li>
    )
}