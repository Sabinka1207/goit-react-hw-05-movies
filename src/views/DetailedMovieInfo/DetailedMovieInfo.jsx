import { useState, useEffect, lazy, Suspense } from "react"
import { useParams, useRouteMatch, useLocation } from "react-router"
import { Route, useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Loader from "react-loader-spinner";
import movieAPI from "../../utils/API"
import css from "./DetailedMovieInfo.module.css"

// import Container from "../../utils/Container/Container";
// import Cast from "../Cast/Cast"
// import Rewiev from "../Rewiev/Rewiev"

const Container = lazy( () => import("../../utils/Container/Container") )
const Cast = lazy( () => import("../Cast/Cast") )
const Rewiev = lazy(() => import("../Rewiev/Rewiev"))

function DetailedMovieInfo() {
    const [movieInfo, setMovieInfo] = useState({})
    const { movieId } = useParams()
    const { url } = useRouteMatch()
    const history = useHistory()
    const location = useLocation()

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
    }, [movieId])
    

    const { poster_path, original_title, release_date, vote_average, overview, genres } = movieInfo

    return (
        <>
            <div className={css.container}>
                <button type="button" onClick={() => history.push(location.state.from)}> ⮪ Go back</button>
                <div className={css.mainInfo}>
                    {poster_path && <img className={css.poster} src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt={original_title}></img>}
                    <div className={css.description}>
                        <h2>{original_title} ({release_date})</h2>
                        <p className={css.rating}>User rating: {vote_average}</p>
                        <h3 className={css.indent}>Overview</h3>
                        <p>{overview}</p>
                        <h4 className={css.indent}>Genres</h4>
                        <p>{genres}</p>
                    </div>
                </div>
            </div>
            <div className={`${css.additionalInfo} ${css.container}`}>
                <p className={css.additionalInfoTitle}>Additional information</p>
                <ul>
                    <li><NavLink to={{
                        pathname: `${url}/cast`,
                        state: { from: location.state.from },
                  }}>Cast</NavLink></li>
                    <li><NavLink to={{
                        pathname: `${url}/rewievs`,
                        state: { from: location.state.from },
                  }}>Rewievs</NavLink></li>
                </ul>
            </div>

            <Suspense fallback={<Loader
                type="ThreeDots"
                color="#cdcdcd"
                height={100}
                width={100} />}>
                
                <Route path="/movies/:movieId/cast">
                    <Container>
                        <Cast id={movieId}/>
                    </Container>
                </Route>
                
                <Route path="/movies/:movieId/rewievs">
                    <Container>
                        <Rewiev id={movieId} />
                    </Container>
                </Route>   
            </Suspense>
    </>
    )
}

export default DetailedMovieInfo