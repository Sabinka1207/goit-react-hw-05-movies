import { useEffect,  } from "react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router"

function MovieList({ list, clearList }) {
    const location = useLocation()

    useEffect(() => {
        return () => {
            clearList([])
        }
    }, [clearList])

    return (
        <ul>
            {list.map(oneMovie => (
                <li key={oneMovie.id}>
                    <Link to={{
                        pathname: `/movies/${oneMovie.id}`,
                        state: { from: location },
                  }}>{oneMovie.title}</Link>
                </li>
            ))}
        </ul>
    )

}

export default MovieList