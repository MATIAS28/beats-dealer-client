import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';

import { useDispatch, useSelector } from 'react-redux';
import { playBeat } from '../../redux/slices/beatPlayer';

import { Beat } from './beatPopUp';
import { getBeatToPlay, getDownloadLink } from '../../services/beatServices';
import { ArrowDownTrayIcon, PlayIcon } from '@heroicons/react/24/outline';


export const Card = ({beat, purchased}) => {
    const {user, token} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const {artist, img, genre, bpm, name, _id, file, unit_price} = beat
    
    const getDownloadBeatLink = async () => {
        try {
            const beatLink = await getDownloadLink(token, _id)

            const link = document.createElement('a');
            link.href = beatLink;
            link.setAttribute('download', name+'.mp3'); 
            document.body.appendChild(link);
            link.click();
      
            document.body.removeChild(link);
        } catch (e) {
            console.error(e);
        }
    }
    
    const handlePlayer = async () => {
        try {
            const beatToPlay = await getBeatToPlay(_id, user)
            dispatch(playBeat(beatToPlay)) 
        } catch (e) {
            console.error(e)
        }
        
    }

    return(
        <article className="bg-black shadow-lg p-3 w-full rounded-lg duration-200">
            <button id='play-buttom' className='flex justify-center items-center p-0 m-0 w-full duration-100' onClick={handlePlayer}>
                <img className="duration-100 rounded-xl h-64 w-full shadow-xl hover:blur-[1.5px]" src={img.url || img}/>
                <PlayIcon id='play-icon' className='duration-100 absolute h-48 w-48 transparent'/>
            </button>
            
            <div className="flex justify-between items-center my-2">
                <p className="text-slate-400 font-sm mr-2">{genre}</p>
                <p className="flex items-center bg-blue-700 text-white text-xs font-bold px-2 rounded-full">{bpm} BPM</p>
            </div>

            <div className='cursor-pointer h-12 my-2'>
            <Popup trigger={<p className="text-white text-start text-base font-semibold hover:text-green-500">{name}</p>} modal>
                {close => ( <Beat beatId={beat._id} close={close} user={user} token={token} /> )}
            </Popup>
            </div>

            <div className="flex justify-between items-center">
                <p className="text-green-400 font-semibold">{artist.artistName}</p>
                {purchased ? 
                    <a href='#' rel="noopener noreferrer" download={name+'.mp3'} onClick={getDownloadBeatLink}
                    className='flex justify-center bg-green-500/75 w-full duration-100 hover:bg-green-500 rounded-b-lg py-1 cursor-pointer'>
                        <ArrowDownTrayIcon className='white w-6 h-6'/>
                    </a>
                    :
                    <p className="text-white font-sm font-bold">${unit_price}</p>
                }
            </div>

        <style jsx="true">
        {`
            .popup-content{
              padding: 0px;
              border: none;
              border-radius: 0.5rem; 
              background-color: #000;
            }

            #play-buttom:hover img{
                filter: blur(2px);
            }

            #play-buttom:hover svg{
                color: white;
            }

            @media (max-width: 900px) {
                .popup-content{
                    width: 100%;
                    height: 100%;
                    border-radius: 0px; 
                }
            }
        `}
        </style>

        </article>
    )
}