import { useState } from 'react'
import CountryFlag from 'react-country-flag'



function App() {
  const [movies, setMovies] = useState([])
  const [movieTitle, setMovieTitle] = useState("")


  function searchMovie() {

    const url = `https://api.themoviedb.org/3/search/multi?api_key=${import.meta.env.VITE_API_KEY}&query=${movieTitle}`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setMovies(data.results)
      })
  }



  function handleSubmit(e) {
    e.preventDefault()
    searchMovie()
  }


  function languageFlags(language) {
    const flags = {
      en: "GB",
      it: "IT",
      fr: "FR",
      es: "ES",
      de: "DE",
    }
    return flags[language] || null;
  }

  return (
    <>
      <header>
        <div className="container text-center">
          <h1>Boolflix</h1>
        </div>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <div className="container mt-4 d-flex">
            <input
              className="form-control"
              type="text"
              placeholder='Search title'
              value={movieTitle}
              onChange={(e) => setMovieTitle(e.target.value)} />
            <button className="btn btn-primary mx-3">Search</button>
          </div>
        </form>

        <div className="container my-3">
          <ul>
            {movies.map((movie) => {
              const countryCode = languageFlags(movie.original_language);
              return (
                <li key={movie.id} className="mb-3">
                  Title: {movie.title || movie.name} <br />
                  Original Title: {movie.original_title || movie.original_name} <br />
                  Language:{' '}
                  {countryCode && (
                    <CountryFlag
                      countryCode={countryCode}
                      svg
                      style={{ width: '1.5em', height: '1.5em', marginRight: '0.3em' }}
                    />
                  )}
                  ({movie.original_language}) <br />
                  <strong>Vote:</strong> {movie.vote_average}
                </li>
              )
            })}
          </ul>
        </div>
      </main>
    </>
  )
}

export default App
