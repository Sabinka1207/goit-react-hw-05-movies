import { useEffect } from "react"
import { Link } from "react-router-dom"

function MovieList({ list, clearList }) {
    useEffect(() => {
        return () => {
            clearList([])
        }
    }, [clearList])

    return (
        <ul>
            {list.map(oneMovie => (
                <li key={oneMovie.id}>
                    <Link to={`/movies/${oneMovie.id}`}>{oneMovie.title}</Link>
                </li>
            ))}
        </ul>
    )

}

export default MovieList