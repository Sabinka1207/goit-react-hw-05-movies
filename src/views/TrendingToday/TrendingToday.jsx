import { useEffect, useState } from "react"
import movieAPI from "../../utils/API"
import MovieList from '../../Components/MovieList/MovieList'
import css from "./TrendingToday.module.css"
import Loader from "react-loader-spinner";

function TrendingToday() {
    const [trendigs, setTrendigs] = useState([])
    const shouldShowResult = Boolean(trendigs.length)

    useEffect(() => {
        if (shouldShowResult) {
            return;
        }
        
        async function getTrendings () {
            const response = (await movieAPI.trendingToday()).results
            setTrendigs(response)
        }

        getTrendings()
    },[shouldShowResult])

    return (
        <>
            <p className={css.heading}>Trending today</p>
            {shouldShowResult && <MovieList list={trendigs} clearList={setTrendigs} />}
            {!shouldShowResult && <Loader type="ThreeDots" color="#cdcdcd" height={100} width={100}/>}
        </>
    )
}

export default TrendingToday