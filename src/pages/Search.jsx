import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'

import '../styles/pages/moviegrid.sass'

const searchURL = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

const Search = () => {
  const [searchParams] = useSearchParams()

  const [movies, setMovies] = useState([])
  const query = searchParams.get('q')

  const getSearchedMovies = async (url) => {
    const response = await fetch(url)
    const data = await response.json()

    setMovies(data.results)
    console.log(data.results)
  }

  useEffect(() => {
    const searchWithQueryUrl = `${searchURL}?${apiKey}&query=${query}`
    getSearchedMovies(searchWithQueryUrl)
  }, [query])

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies.length === 0 && <p>Carregando...</p>}
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
      </div>
    </div>
  )
}

export default Search
