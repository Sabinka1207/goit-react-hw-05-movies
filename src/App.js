import { Route, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react"
import Navigation from "./Components/Navigation/Navigation";
import TrendingToday from "./views/TrendingToday/TrendingToday"
import SearchMovie from "./views/SearchMovie/SearchMovie";
import movieAPI from "./utils/API"
import MovieList from './Components/MovieList/MovieList'
import DetailedMovieInfo from './views/DetailedMovieInfo/DetailedMovieInfo'
import Container from "./utils/Container/Container"
import Loader from "react-loader-spinner";

function App() {
  const [searchResult, setSearchResult] = useState([])
  const [loadingStatus, setLoadingStatus] = useState(null)
  const shouldShowResult = Boolean(searchResult.length)
  const history = useHistory()
  const location = useLocation()
  
  useEffect(() => {
    if (location.search === '') {
      return;
    } 
    
    const searchParams = new URLSearchParams(location.search).get("query")

    async function getSearch(searchParams) {
      const response = (await movieAPI.searchMovie(searchParams)).results
      setSearchResult(response)
      setLoadingStatus(null)
    }
    
    setLoadingStatus("Idle")
    getSearch(searchParams)

  },[location.search])

  const submitHandler = (request) => {
    history.push({
      ...location,
      search: `query=${request}`
    })
  };

  return (
    <div>
      <Navigation />

      <Route path="/" exact>
        <Container>
          { loadingStatus && <Loader type="ThreeDots" color="#cdcdcd" height={100} width={100}/>}
          { !loadingStatus && <TrendingToday/>}
        </Container>
        
      </Route>

      <Route path="/movies" exact>
        <Container>
          <SearchMovie onClick={submitHandler} />
          { loadingStatus && <Loader type="ThreeDots" color="#cdcdcd" height={100} width={100}/>}
          {!loadingStatus && shouldShowResult && <MovieList list={searchResult} clearList={ setSearchResult}/>}
        </Container>

      </Route>

      <Route path="/movies/:movieId">
        <DetailedMovieInfo/>
      </Route>

      {/* <Loader
        type="ThreeDots"
        color="#cdcdcd"
        height={100}
        width={100}/> */}
    </div>
  );
}

export default App;
