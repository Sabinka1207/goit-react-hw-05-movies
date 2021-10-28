import { useEffect, useState } from "react"
import movieAPI from "../../utils/API" 
import ActorsList from "../../Components/ActorsList/ActorsList"

function Cast({ id }) {
    const [actors, setActors] = useState([])
    const shouldShowActors = Boolean(actors.length)

    useEffect(() => {
        const getCast = async () => {
            const cast = (await movieAPI.cast(id)).cast
            setActors(cast)
        }
        getCast()
    }, [id])

    return (
        <>
            {shouldShowActors && <ActorsList actors={actors} />}
        </> 
    )
}

export default Cast
