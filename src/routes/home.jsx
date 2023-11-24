import { useEffect, useState } from "react"
import { Card } from "../components/beat/beatCard"
import { getBeats } from "../services/beatServices"
import { Loader } from "../components/loader"

function HomePage(){
  const [beats, setBeats] = useState([])
  const [error, setError] = useState()

  useEffect(() => {
    const request = async () => {
      try {
        const Beats = await getBeats()
        setBeats(Beats)
      } catch (e) {
        setError(e)
      }
    } 
    request()
  }, [])
    
  return(
      <div>
        <img className='w-full p-0 m-0 duration-150' src="/banner.png" alt=""/>
        
        <div className="mx-auto grid max-w-8xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
       
        {beats.length > 0 && !error ? 

        beats.map((beat, i) => {
          return <Card key={i}  beat={beat}/>
        })

        :

        <Loader/> 
      
        }
        </div>

      </div>
    )
}

export default HomePage