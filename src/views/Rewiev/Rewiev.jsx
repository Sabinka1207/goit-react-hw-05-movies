import { useEffect, useState } from "react"
import movieAPI from "../../utils/API"
import css from "./Rewiev.module.css"

function Rewiev({ id }) {
    const [rewievs, setRewievs] = useState([])
    const shouldShowRewievs = Boolean(rewievs.length)
    
    useEffect(() => {
    const getRewievs = async () => {
        const response = (await movieAPI.rewiev(id)).results
        setRewievs(response)
    }
    getRewievs()
    }, [id])

    return (
        { shouldShowRewievs && 
        (<ul>
            {rewievs.map(rewiev =>
                (<li key={rewiev.id}>
                    <p className={css.rewievHeading}>Author: {rewiev.author}</p>
                    <p>{rewiev.content}</p>
                </li>
            ))}
        </ul>)
        }
    )
}

export default Rewiev