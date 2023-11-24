import { useEffect, useState } from "react"
import { getBeatFound } from "../../services/beatServices"
import { Loader } from "../loader"
import { Card } from "../beat/beatCard"
import { NotFound } from "../notFound"

export const Search = ({search}) => {
    const [beatsFound, setBeatsFound] = useState()
    const [error, setError] = useState()
    const [beatsNotFound, setBeatsNotFound] = useState(false)

    useEffect(() => {
       const searchBeat = async () => {
            try {
                const beats = await getBeatFound(search)

                setBeatsFound(beats.data)
            } catch (e) {
                setError(e)
            }
        }

        searchBeat()
    }, [search])

    if (beatsFound?.length == 0) {
        return <NotFound name={'beats'}/>
    }

    return(
        <div className="mx-auto grid max-w-8xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
       
        {beatsFound?.length > 0 && !error ? 

        beatsFound.map((beat, i) => {
          return <Card key={i}  beat={beat}/>
        })

        :

        <Loader/> 
      
        }
        </div>
    )
}