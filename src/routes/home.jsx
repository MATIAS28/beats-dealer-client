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
      <div className="">

        <h1 className="text-3xl text-white font-semibold">
          Nuestros Beats
        </h1>

        
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-4">
       
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