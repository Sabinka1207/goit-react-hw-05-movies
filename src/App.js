import { Route } from "react-router-dom";
import { useState } from "react"
import Navigation from "./Components/Navigation/Navigation";
import TrendingToday from "./views/TrendingToday"
import SearchMovie from "./views/SearchMovie";
import movieAPI from "./utils/API"
import MovieList from './Components/MovieList/MovieList'
import DetailedMovieInfo from './views/DetailedMovieInfo'
import Container from "./utils/Container/Container"

function App() {
  const [searchResult, setSearchResult] = useState([])
  const shouldShowResult = Boolean(searchResult.length)

  const submitHandler = async (request) => {
    const result = (await movieAPI.searchMovie(request)).results;
    setSearchResult(result)
  };

  return (
    <div>
      <Navigation />

      <Route path="/" exact>
        <Container>
          <TrendingToday/>
        </Container>
        
      </Route>

      <Route path="/movies" exact>
        <Container>
          <SearchMovie onClick={submitHandler} />
          {shouldShowResult && <MovieList list={searchResult} clearList={ setSearchResult}/>}
        </Container>

      </Route>

      <Route path="/movies/:movieId">
        <DetailedMovieInfo/>
      </Route>
    </div>
  );
}

export default App;
