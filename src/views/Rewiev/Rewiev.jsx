import { useEffect, useState } from "react"
import movieAPI from "../../utils/API"
import css from "./Rewiev.module.css"
import Loader from "react-loader-spinner";

function Rewiev({ id }) {
    const [rewievs, setRewievs] = useState([])
    const [status, setStatus] = useState(null)    
    
    useEffect(() => {
    const getRewievs = async () => {
        const response = (await movieAPI.rewiev(id)).results
        setRewievs(response)
        setStatus(null)
        }
    setStatus("idle")
    getRewievs()
    }, [id])

    return (
            status ? <Loader
        type="ThreeDots"
        color="#cdcdcd"
        height={100}
            width={100} /> : rewievs.length > 0 ? <ul>
            {rewievs.map(rewiev =>
                (<li key={rewiev.id}>
                    <p className={css.rewievHeading}>Author: {rewiev.author}</p>
                    <p>{rewiev.content}</p>
                </li>
            ))}
        </ul> : <p className={css.noRewiev}>No rewievs</p>
    )
}

export default Rewiev