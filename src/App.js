import { Route, useHistory, useLocation, Switch, Redirect } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react"
import Navigation from "./Components/Navigation/Navigation";
import Loader from "react-loader-spinner";
import movieAPI from "./utils/API"

// import TrendingToday from "./views/TrendingToday/TrendingToday"
// import SearchMovie from "./views/SearchMovie/SearchMovie";
// import DetailedMovieInfo from './views/DetailedMovieInfo/DetailedMovieInfo'

// import MovieList from './Components/MovieList/MovieList'
// import Container from "./utils/Container/Container"

const TrendingToday = lazy( () => import("./views/TrendingToday/TrendingToday") )
const SearchMovie = lazy( () => import("./views/SearchMovie/SearchMovie") )
const DetailedMovieInfo = lazy( () => import('./views/DetailedMovieInfo/DetailedMovieInfo') )
const MovieList = lazy(() => import('./Components/MovieList/MovieList'))
const Container = lazy(() => import("./utils/Container/Container"))

function App() {
  const [searchResult, setSearchResult] = useState([])
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
    //   setLoadingStatus(null)
    }
    // setLoadingStatus("Idle")
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

        <Suspense fallback={<Loader
        type="ThreeDots"
        color="#cdcdcd"
        height={100}
            width={100} />}>
            
            <Switch>
                <Route path="/" exact>
                    <Container>
                        <TrendingToday/>
                    </Container>
                </Route>
                
                <Route path="/movies" exact>
                    <Container>
                        <SearchMovie onClick={submitHandler} />
                        <MovieList list={searchResult} clearList={ setSearchResult}/>
                    </Container>
                </Route>

                <Route path="/movies/:movieId">
                    <DetailedMovieInfo/>
                </Route>

                <Redirect to="/"/>
            </Switch>
            
        </Suspense>
    </div>
  );
}

export default App;
