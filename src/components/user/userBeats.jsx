import { useEffect, useState } from "react"
import { Loader } from "../loader"
import { Card } from "../beat/beatCard"
import { getFavoriteBeats, getPurchasedBeats } from "../../services/beatServices"
import { NotFound } from "../notFound"


function UserBeats ({token, selectButton}){
    const [userBeats, setUserBeats] = useState(null)
    const [error, setError] = useState()
    
    const getUserFavoriteBeats = async () => {
            setUserBeats()

            try {
                const beats = await getFavoriteBeats(token)
                setUserBeats(beats)
            } catch (e) {
                console.error(e)
            }
    }

    const getUserPurchasedBeats = async () => {
        setUserBeats()
        
        try {
            const beats = await getPurchasedBeats(token) 
            setUserBeats(beats)
        } catch (e) {
            console.error(e)
            setError(e)
        }
    }   

    useEffect(() => {
        switch (selectButton) {
            case 0:
                getUserFavoriteBeats()
            break;
        
            case 1:
                getUserPurchasedBeats()
            break;

            default:
                getUserFavoriteBeats()
            break;
        }
    }, [selectButton])

    if (userBeats?.length == 0) {
        return <NotFound name={'beats'}/>
    }

    return(

        <div>

            <div className="mx-auto grid max-w-8xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            
            {userBeats && !error ? 
                userBeats.map((beat, i) => {
                return <Card key={i}  beat={beat} purchased={selectButton == 1}/>
                })
                

                :

                <Loader/>
            }
  
            </div>

        </div>
    )
}

export default UserBeats
