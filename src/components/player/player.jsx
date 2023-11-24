import { useEffect, useRef, useState } from "react"
import {PauseIcon, PlayIcon} from '@heroicons/react/24/outline'


function Player({currentBeat}){
    const [beat, setBeat] = useState()
    const [button, setButton] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [time, setTime] = useState()
    const audioRef = useRef(null)
    
    useEffect(() => {
        if (button) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
          
    }, [button])

    if (!beat || beat._id !== currentBeat._id) {
        setBeat(currentBeat)
        setButton(false)
        setCurrentTime(0)
    }

    const handleProgressBar = (e) => {
        const newTime = parseInt(e.target.value)
        audioRef.current.currentTime = newTime
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    
    return(

        <div className='player'>
                    
        <audio 
            id='player' 
            src={currentBeat.file?.url}
            ref={audioRef} 
            onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
            onLoadedMetadata={(e) => setTime(e.target.duration)}
        />

        <div className='flex items-center w-full'>
            <button onClick={() => setButton(prev => !prev)}> 
            {button ? 
                <PauseIcon className='white w-7 h-7'/>
                : 
                <PlayIcon className='white w-7 h-7'/>
            }
            </button>
            
            <div className='flex w-full'>

                <input className='w-full appearance-none bg-transparent rounded-full' 
                 type="range" min={0} max={time} value={currentTime} onChange={handleProgressBar}/>
                
                <div className='flex justify-between'>
                <p className='text-white text-xs'>{formatTime(currentTime)+'/'}</p>
                <p className='text-white text-xs'>{formatTime(time)}</p>
                </div>
            </div>
        </div>

        </div>
    )
}

export default Player