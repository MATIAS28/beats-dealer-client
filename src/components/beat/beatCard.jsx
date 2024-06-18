import 'reactjs-popup/dist/index.css';
import { Link, useParams } from 'react-router-dom'
import Popup from 'reactjs-popup';

import { useDispatch, useSelector } from 'react-redux';
import { playBeat } from '../../redux/slices/beatPlayer';

import { Beat } from './beatPopUp';
import { getBeatToPlay, getDownloadLink } from '../../services/beatServices';
import { ArrowDownTrayIcon, PlayIcon, EyeIcon, UserIcon } from '@heroicons/react/24/solid';


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
            <button id='play-buttom' className='relative flex justify-center items-center p-0 m-0 w-full duration-100' onClick={handlePlayer}>
                <img className="duration-100 rounded-xl h-64 w-full shadow-xl hover:blur-[1.5px]" src={img.url || img}/>
                <PlayIcon id='play-icon' className='duration-100 absolute h-48 w-48 transparent'/>
                <p className="absolute top-0 right-0 flex items-center bg-blue-700 text-white font-semibold text-xs px-2 py-1 rounded-full">{bpm} BPM</p>
            </button>
            
            <div className="flex justify-between items-center text-white text-gray-400 text-sm my-4">
                <div className="flex items-center rounded-md px-2 py-1 tertiary">
                    <UserIcon className="w-4 h-4 mr-1"/>
                    <p className="font-semibold">{artist.artistName}</p>
                </div>
                <p className="font-light">{genre}</p>
            </div>

            <div className='h-16 my-2'>
            <p className="text-white text-start text-sm font-light">{name}</p>
            </div>

            <div className="flex justify-between items-center">
                {purchased ? 
                    <a href='#' rel="noopener noreferrer" download={name+'.mp3'} onClick={getDownloadBeatLink}
                    className='flex justify-center bg-green-500/75 w-full duration-100 hover:bg-green-500 rounded-b-lg py-1 cursor-pointer'>
                        <ArrowDownTrayIcon className='white w-6 h-6'/>
                    </a>
                    :
                    <p className="text-white text-xs font-light">${unit_price}</p>
                }

                <Link to={'/beat/'+beat._id} 
                className="flex items-center font-semibold text-xs rounded-3xl px-2 py-1 bg-white">
                <EyeIcon className="w-4 h-4 mr-2"/>
                <span className="">ver más</span>
                </Link>
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