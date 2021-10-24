import { useState, useEffect } from "react"
import { useParams, useRouteMatch } from "react-router"
import { Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import movieAPI from "../utils/API"
import css from "./DetailedMovieInfo.module.css"
import Cast from "./Cast"
import Rewiev from "./Rewiev"

function DetailedMovieInfo() {
    const [movieInfo, setMovieInfo] = useState({})
    const { movieId } = useParams()
    const { url } = useRouteMatch()

    useEffect(() => {
        async function getMovie(id) {
            const response = await movieAPI.detailedMovie(id)
            const genresArr = []
            response.genres.forEach(genre => genresArr.push(genre.name))
            const info = {
                ...response,
                genres: genresArr.join(", "),
                release_date: response.release_date.slice(0,4)
            }
            setMovieInfo(info)
        }
        getMovie(movieId)
    },[movieId])

    const { poster_path, original_title, release_date, vote_average, overview, genres } = movieInfo

    return (
        <>
            <div className={`${css.mainInfo} ${css.container}`}>
                <img className={css.poster} src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt={original_title}></img>
                <div>
                    <h2>{original_title} ({release_date})</h2>
                    <p>User rating: {vote_average}</p>
                    <h3>Overview</h3>
                    <p>{overview}</p>
                    <h4>Genres</h4>
                    <p>{genres}</p>
                </div>
            </div>
            <div className={`${css.additionalInfo} ${css.container}`}>
                <p>Additional information</p>
                <ul>
                    <li><NavLink to={`${url}/cast`}>Cast</NavLink></li>
                    <li><NavLink to={`${url}/rewievs`}>Rewievs</NavLink></li>
                </ul>
            </div>
            <Route path="/movies/:movieId/cast">
                <Cast id={movieId}/>
            </Route>
            
            <Route path="/movies/:movieId/rewievs">
                <Rewiev id={movieId}/>
            </Route>   
        </>
    )
}

export default DetailedMovieInfo