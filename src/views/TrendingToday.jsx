import { useEffect, useState } from "react"
import movieAPI from "../utils/API"
import MovieList from '../Components/MovieList/MovieList'

function TrendingToday() {
    const [trendigs, setTrendigs] = useState([])

    useEffect(() => {
        movieAPI.trendingToday().then( r => setTrendigs(r.results))
    }, [])

    return (
        <>
            <p>Trending today</p>
            <MovieList list={trendigs} clearList={setTrendigs}/>
        </>
    )
}

export default TrendingToday